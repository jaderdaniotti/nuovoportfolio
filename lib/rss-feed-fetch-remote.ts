import { siteConfig } from "@/lib/site-config";
import { assertSafeRemoteUrl } from "@/lib/broken-link-checker-remote";

export const RSS_FETCH_MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 5;
const FETCH_TIMEOUT_MS = 15_000;
const UA = `jaderweb-tools/rss-validator/1.0 (+${siteConfig.url}/tools/validatore-feed-rss)`;

async function timedFetch(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, redirect: "manual", signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function readBodyCapped(res: Response, maxBytes: number): Promise<ArrayBuffer> {
  const len = res.headers.get("content-length");
  if (len && Number(len) > maxBytes) {
    throw new Error(`Risposta troppo grande (${len} byte).`);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    const ab = await res.arrayBuffer();
    if (ab.byteLength > maxBytes) throw new Error("Corpo della risposta troppo grande.");
    return ab;
  }

  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) throw new Error("Feed troppo grande durante lo scarico.");
    chunks.push(value);
  }

  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.byteLength;
  }
  return out.buffer;
}

export type FetchFeedXmlOutcome = {
  xml: string;
  finalUrl: string;
  contentType: string | null;
};

/**
 * Scarica un feed da URL pubblico http/https seguendo redirect con controlli anti-SSRF
 * coerenti con il checker dei link rotti (assertSafeRemoteUrl).
 */
export async function fetchFeedXmlFromRemote(startUrl: string): Promise<FetchFeedXmlOutcome> {
  let current = startUrl;
  const accept =
    "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, text/plain;q=0.5, */*;q=0.1";

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertSafeRemoteUrl(current);

    const res = await timedFetch(current, {
      method: "GET",
      headers: {
        "User-Agent": UA,
        Accept: accept,
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new Error("Redirect senza intestazione Location.");
      current = new URL(loc, current).href.split("#")[0]!;
      continue;
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} durante il download del feed.`);
    }

    const buf = await readBodyCapped(res, RSS_FETCH_MAX_BYTES);
    const ct = res.headers.get("content-type");
    let xml = new TextDecoder("utf-8", { fatal: false }).decode(buf);

    const m = xml.match(/^<\?xml\b[^?]*encoding\s*=\s*["']([^"']+)["']/i);
    const enc = m?.[1]?.toLowerCase();
    if (
      enc &&
      enc !== "utf-8" &&
      enc !== "utf8" &&
      enc !== "us-ascii" &&
      typeof TextDecoder !== "undefined"
    ) {
      try {
        xml = new TextDecoder(enc, { fatal: false }).decode(buf);
      } catch {
        /* keep utf-8 */
      }
    }

    return { xml, finalUrl: current, contentType: ct };
  }

  throw new Error(`Troppi redirect (${MAX_REDIRECTS}).`);
}
