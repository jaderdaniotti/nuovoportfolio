export type DnsRecordType = "A" | "AAAA" | "MX" | "TXT" | "NS" | "CNAME" | "SOA" | "CAA";

export const DNS_LOOKUP_DEFAULT_TYPES: DnsRecordType[] = ["A", "AAAA", "MX", "TXT", "NS"];

export const ALL_DNS_RECORD_TYPES: readonly DnsRecordType[] = [
  "A",
  "AAAA",
  "MX",
  "TXT",
  "NS",
  "CNAME",
  "SOA",
  "CAA",
] as const;

const ALLOWED_TYPES = new Set<string>(ALL_DNS_RECORD_TYPES);

export type DnsLookupSection =
  | { type: DnsRecordType; ok: true; records: unknown[] }
  | { type: DnsRecordType; ok: false; code?: string; error: string };

export type DnsLookupOk = {
  ok: true;
  hostname: string;
  ms: number;
  sections: DnsLookupSection[];
};

export type DnsLookupApiResponse = DnsLookupOk | { ok: false; error: string };

export function normalizeDnsHostname(raw: string): string | null {
  let s = raw.trim().replace(/\.+$/, "");
  if (!s) return null;

  try {
    let hostname = "";
    if (/^https?:\/\//i.test(s) || s.startsWith("//")) {
      hostname = new URL(s.startsWith("//") ? `https:${s}` : s).hostname;
    } else {
      const head = (s.split("/")[0] ?? s).trim();
      const hostPort =
        head.includes(":") && !head.startsWith("[") ? (head.split(":")[0] ?? head).trim() : head;
      hostname = new URL(`http://${hostPort}`).hostname;
    }
    hostname = hostname.replace(/\.+$/, "").toLowerCase();
    if (!hostname || hostname.length > 253) return null;
    return hostname;
  } catch {
    return null;
  }
}

export function parseDnsTypesFromBody(types: unknown): DnsRecordType[] | { error: string } {
  if (types === undefined || types === null) {
    return [...DNS_LOOKUP_DEFAULT_TYPES];
  }
  if (!Array.isArray(types)) return { error: 'Il campo "types" deve essere un array di stringhe.' };
  const out: DnsRecordType[] = [];
  for (const x of types) {
    if (typeof x !== "string") return { error: "Ogni tipo deve essere una stringa." };
    const u = x.trim().toUpperCase();
    if (!ALLOWED_TYPES.has(u)) return { error: `Tipo DNS non supportato: ${x.trim()}` };
    const t = u as DnsRecordType;
    if (!out.includes(t)) out.push(t);
    if (out.length > 8) return { error: "Massimo 8 tipi di record per richiesta." };
  }
  if (out.length === 0) return { error: "Seleziona almeno un tipo di record." };
  return out;
}

function stringifyRecord(rec: unknown): string {
  if (typeof rec === "string") return rec;
  try {
    return JSON.stringify(rec);
  } catch {
    return String(rec);
  }
}

export function formatDnsLookupReport(result: DnsLookupOk): string {
  const lines: string[] = [`DNS lookup · ${result.hostname}`, `Tempo totale (parallelo): ${result.ms} ms`, ""];
  for (const sec of result.sections) {
    lines.push(`## ${sec.type}`);
    if (!sec.ok) {
      lines.push(`Errore: ${sec.error}${sec.code ? ` (${sec.code})` : ""}`, "");
      continue;
    }
    if (sec.records.length === 0) {
      lines.push("(nessun record)", "");
      continue;
    }
    for (const r of sec.records) {
      lines.push(stringifyRecord(r));
    }
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}
