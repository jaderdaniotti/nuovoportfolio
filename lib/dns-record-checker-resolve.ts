import dns from "node:dns/promises";
import type { DnsLookupSection, DnsRecordType } from "@/lib/dns-record-checker";

const PER_QUERY_MS = 9_000;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let id: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, rej) => {
    id = setTimeout(() => rej(Object.assign(new Error("Timeout resolver DNS"), { code: "ETIMEOUT" })), ms);
  });
  return Promise.race([p, timeout]).finally(() => clearTimeout(id));
}

function errnoCode(e: unknown): string | undefined {
  return e && typeof e === "object" && "code" in e ? String((e as NodeJS.ErrnoException).code) : undefined;
}

async function resolveOne(hostname: string, type: DnsRecordType): Promise<DnsLookupSection> {
  try {
    switch (type) {
      case "A": {
        const addresses = await withTimeout(dns.resolve4(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: addresses.map((address) => ({ type: "A", address })),
        };
      }
      case "AAAA": {
        const addresses = await withTimeout(dns.resolve6(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: addresses.map((address) => ({ type: "AAAA", address })),
        };
      }
      case "MX": {
        const rows = await withTimeout(dns.resolveMx(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: rows.map((r) => ({ type: "MX", priority: r.priority, exchange: r.exchange })),
        };
      }
      case "TXT": {
        const chunks = await withTimeout(dns.resolveTxt(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: chunks.map((parts) => ({
            type: "TXT",
            text: parts.join(""),
            parts,
          })),
        };
      }
      case "NS": {
        const names = await withTimeout(dns.resolveNs(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: names.map((nsdname) => ({ type: "NS", nsdname })),
        };
      }
      case "CNAME": {
        const value = await withTimeout(dns.resolveCname(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: value.map((target) => ({ type: "CNAME", target })),
        };
      }
      case "SOA": {
        const soa = await withTimeout(dns.resolveSoa(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: [
            {
              type: "SOA",
              nsname: soa.nsname,
              hostmaster: soa.hostmaster,
              serial: soa.serial,
              refresh: soa.refresh,
              retry: soa.retry,
              expire: soa.expire,
              minttl: soa.minttl,
            },
          ],
        };
      }
      case "CAA": {
        const caa = await withTimeout(dns.resolveCaa(hostname), PER_QUERY_MS);
        return {
          type,
          ok: true,
          records: caa.map((r) => ({
            type: "CAA",
            critical: r.critical,
            ...(r.issue !== undefined ? { issue: r.issue } : {}),
            ...(r.issuewild !== undefined ? { issuewild: r.issuewild } : {}),
            ...(r.iodef !== undefined ? { iodef: r.iodef } : {}),
          })),
        };
      }
    }
  } catch (e) {
    const code = errnoCode(e);
    let msg =
      code === "ENOTFOUND" || code === "ENODATA" ?
        "Nessun record per questo tipo."
      : e instanceof Error ? e.message
      : "Errore durante la risoluzione.";
    if (code === "ETIMEOUT") msg = "Timeout durante la risoluzione.";
    return { type, ok: false, code, error: msg };
  }
}

export async function resolveDnsRecords(
  hostname: string,
  types: DnsRecordType[],
): Promise<{ sections: DnsLookupSection[]; ms: number }> {
  const t0 = performance.now();
  const sections = await Promise.all(types.map((t) => resolveOne(hostname, t)));
  const ms = Math.round(performance.now() - t0);
  return { sections, ms };
}
