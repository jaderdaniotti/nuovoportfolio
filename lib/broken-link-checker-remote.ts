import dns from "node:dns/promises";
import type { BrokenLinkRemoteStatus } from "@/lib/broken-link-checker";
import { siteConfig } from "@/lib/site-config";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;
const UA = `jaderweb-tools/link-checker/1.0 (+${siteConfig.url}/tools/checker-broken-link)`;

function parseIpv4(ip: string): number | null {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function isBlockedIpv4(ip: string): boolean {
  const n = parseIpv4(ip);
  if (n === null) return true;
  if (n === 0) return true;
  const a = (n >>> 24) & 255;
  const b = (n >>> 16) & 255;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function isBlockedIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fe80:")) return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("ff")) return true;
  return false;
}

function isHostnameBlocked(name: string): boolean {
  const h = name.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h.endsWith(".local")) return true;
  return false;
}

/** Hostname consentito per lookup DNS (no fetch HTTP): blocca localhost, IP privati e IPv6 link-local/ULA. Non richiede record A/AAAA (utile per _dmarc, sottodomini solo MX/TXT). */
export function assertDnsProbeHostnameAllowed(hostname: string): void {
  const h = hostname.trim().toLowerCase();
  if (!h) throw new Error("Host mancante");
  if (isHostnameBlocked(h)) throw new Error("Host non consentito");

  if (parseIpv4(h) !== null) {
    if (isBlockedIpv4(h)) throw new Error("IP non pubblico");
    return;
  }

  let host = h;
  if (host.startsWith("[") && host.endsWith("]")) {
    host = host.slice(1, -1);
    if (isBlockedIpv6(host)) throw new Error("IPv6 non pubblico");
  }
}

async function assertResolvablePublic(hostname: string): Promise<void> {
  if (isHostnameBlocked(hostname)) throw new Error("Host non consentito");

  if (parseIpv4(hostname) !== null) {
    if (isBlockedIpv4(hostname)) throw new Error("IP non pubblico");
    return;
  }

  // IPv6 bracket form [::1]
  let host = hostname;
  if (host.startsWith("[") && host.endsWith("]")) {
    host = host.slice(1, -1);
    if (isBlockedIpv6(host)) throw new Error("IPv6 non pubblico");
    return;
  }

  const records = await dns.lookup(hostname, { all: true, verbatim: true });
  if (!records.length) throw new Error("DNS senza risultati");

  for (const r of records) {
    const addr = r.address;
    if (parseIpv4(addr) !== null) {
      if (isBlockedIpv4(addr)) throw new Error("DNS risolve su IP privato");
    } else if (isBlockedIpv6(addr)) {
      throw new Error("DNS risolve su IPv6 non pubblico");
    }
  }
}

export async function assertSafeRemoteUrl(href: string): Promise<void> {
  let u: URL;
  try {
    u = new URL(href);
  } catch {
    throw new Error("URL non valido");
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("Solo http/https");
  if (!u.hostname) throw new Error("Host mancante");
  await assertResolvablePublic(u.hostname);
}

async function timedFetch(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, redirect: "manual", signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchProbe(url: string): Promise<Response> {
  const baseHeaders = { "User-Agent": UA, Accept: "*/*" } as const;

  const headRes = await timedFetch(url, { method: "HEAD", headers: { ...baseHeaders } });

  if (headRes.status >= 300 && headRes.status < 400) return headRes;
  if (headRes.ok) return headRes;

  if (headRes.status === 405 || headRes.status === 501) {
    return timedFetch(url, {
      method: "GET",
      headers: { ...baseHeaders, Range: "bytes=0-0" },
    });
  }

  // Alcuni server rispondono 403/404 a HEAD ma servono GET (CDN, WAF).
  if (headRes.status === 403 || headRes.status === 404 || headRes.status >= 500) {
    const getRes = await timedFetch(url, {
      method: "GET",
      headers: { ...baseHeaders, Range: "bytes=0-0" },
    });
    if (getRes.status >= 300 && getRes.status < 400) return getRes;
    if (getRes.ok || getRes.status !== headRes.status) return getRes;
  }

  return headRes;
}

export async function checkRemoteBrokenSingle(startUrl: string): Promise<BrokenLinkRemoteStatus> {
  let current = startUrl;
  const chain: string[] = [];

  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      await assertSafeRemoteUrl(current);
      chain.push(current);

      const res = await fetchProbe(current);

      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) {
          return {
            url: startUrl,
            finalUrl: current,
            httpStatus: res.status,
            ok: false,
            note: "Redirect senza Location",
          };
        }
        current = new URL(loc, current).href;
        continue;
      }

      const ok = res.status >= 200 && res.status < 400;
      return {
        url: startUrl,
        finalUrl: current,
        httpStatus: res.status,
        ok,
        note:
          ok ?
            undefined
          : res.status === 403 ? "403 — il server può bloccare bot (verifica in browser)"
          : res.status === 429 ? "429 — rate limit"
          : undefined,
      };
    }

    return {
      url: startUrl,
      finalUrl: current,
      httpStatus: null,
      ok: false,
      note: `Troppi redirect (>${MAX_REDIRECTS})`,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore di rete";
    const aborted = e instanceof Error && e.name === "AbortError";
    return {
      url: startUrl,
      finalUrl: chain.at(-1) ?? startUrl,
      httpStatus: null,
      ok: false,
      note: aborted ? "Timeout" : msg,
    };
  }
}
