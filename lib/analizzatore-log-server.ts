/** Analisi access log stile Apache/Nginx combined e righe JSON comuni (es. export strutturato). Tutto lato client. */

export const SERVER_LOG_ANALYZER_MAX_CHARS = 500_000;

export type ParsedAccessLine = {
  ip: string;
  method: string;
  path: string;
  status: number;
};

export type ServerLogAnalysisResult = {
  totalLines: number;
  nonemptyLines: number;
  matchedLines: number;
  unmatchedLines: number;
  parseRatePercent: number;
  byStatus: Map<number, number>;
  topPaths: [string, number][];
  topIps: [string, number][];
  topUserAgents: [string, number][];
  methods: Map<string, number>;
  band2xx: number;
  band3xx: number;
  band4xx: number;
  band5xx: number;
};

const REQ_STATUS_RE = /"([A-Z]+)\s+(\S+)\s+HTTP\/[^"]*"\s+(\d{3})\b/;

function firstTokenIpvish(line: string): string | null {
  const t = line.trimStart().split(/\s+/)[0];
  if (!t) return null;
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(t)) return t;
  if (/^\[[0-9a-fA-F:.]+\]$/.test(t)) return t.slice(1, -1);
  return null;
}

function normalizePath(raw: string, stripQuery: boolean): string {
  let p = raw;
  try {
    p = decodeURIComponent(p);
  } catch {
    // keep raw
  }
  if (stripQuery) {
    const q = p.indexOf("?");
    if (q >= 0) p = p.slice(0, q);
  }
  if (p.length > 2048) p = `${p.slice(0, 2045)}…`;
  return p || "/";
}

function extractQuotedUserAgent(line: string): string | null {
  const m = line.match(/\s+"([^"]*)"\s*$/);
  const inner = m?.[1]?.trim();
  return inner && inner !== "-" ? inner : null;
}

function tryParseJsonAccessLine(line: string): ParsedAccessLine | null {
  const s = line.trim();
  if (!s.startsWith("{") || !s.endsWith("}")) return null;
  let j: Record<string, unknown>;
  try {
    j = JSON.parse(s) as Record<string, unknown>;
  } catch {
    return null;
  }

  let method: string | null = null;
  let path: string | null = null;
  let status: number | null = null;

  const sc =
    typeof j.status === "number"
      ? j.status
      : typeof j.status === "string"
        ? Number.parseInt(j.status, 10)
        : typeof j.statusCode === "number"
          ? j.statusCode
          : typeof j.response_status === "number"
            ? j.response_status
            : null;

  if (typeof sc === "number" && Number.isFinite(sc)) status = Math.trunc(sc);

  const reqStr =
    typeof j.request === "string"
      ? j.request
      : typeof j.httpRequest === "object" &&
          j.httpRequest !== null &&
          typeof (j.httpRequest as { requestUri?: unknown }).requestUri === "string"
        ? `${(j.httpRequest as { requestMethod?: string }).requestMethod ?? "GET"} ${(j.httpRequest as { requestUri: string }).requestUri} HTTP/1.1`
        : null;

  if (reqStr) {
    const m = reqStr.match(/^([A-Z]+)\s+(\S+)/);
    if (m) {
      method = m[1];
      path = m[2];
    }
  }

  if (!path) {
    const uris = ["uri", "path", "url", "request_uri"] as const;
    for (const k of uris) {
      const v = j[k];
      if (typeof v === "string" && v.trim()) {
        path = v;
        break;
      }
    }
  }

  if (!method) {
    const mm =
      typeof j.method === "string"
        ? j.method
        : typeof j.httpMethod === "string"
          ? j.httpMethod
          : typeof j.verb === "string"
            ? j.verb
            : null;
    if (mm) method = mm.toUpperCase();
  }

  let ip: string | null = null;
  const ipKeys = ["remote_addr", "client_ip", "clientIp", "ip", "host"] as const;
  for (const k of ipKeys) {
    const v = j[k];
    if (typeof v === "string" && v.trim()) {
      ip = v.trim();
      break;
    }
  }

  if (!method || !path || status === null || status < 100 || status > 599) return null;
  return {
    ip: ip ?? "—",
    method,
    path,
    status,
  };
}

export function parseAccessLogLine(line: string): ParsedAccessLine | null {
  const jsonHit = tryParseJsonAccessLine(line);
  if (jsonHit) return jsonHit;

  const m = line.match(REQ_STATUS_RE);
  if (!m?.[1] || !m[2] || !m[3]) return null;

  const status = Number.parseInt(m[3], 10);
  if (!Number.isFinite(status) || status < 100 || status > 599) return null;

  const ip = firstTokenIpvish(line) ?? "—";
  return {
    ip,
    method: m[1],
    path: m[2],
    status,
  };
}

export function validateServerLogInput(raw: string): { ok: true } | { ok: false; error: string } {
  const t = raw.trim();
  if (!t) {
    return { ok: false, error: "Incolla almeno una riga di access log o carica un file di testo." };
  }
  if (raw.length > SERVER_LOG_ANALYZER_MAX_CHARS) {
    return {
      ok: false,
      error: `Il testo supera ${SERVER_LOG_ANALYZER_MAX_CHARS.toLocaleString("it-IT")} caratteri. Incolla un campione più piccolo o filtra le righe in anticipo.`,
    };
  }
  return { ok: true };
}

function bumpMap(m: Map<string, number>, key: string, n = 1) {
  m.set(key, (m.get(key) ?? 0) + n);
}

function bumpNumMap(m: Map<number, number>, key: number, n = 1) {
  m.set(key, (m.get(key) ?? 0) + n);
}

function topNFromMap(m: Map<string, number>, n: number): [string, number][] {
  return [...m.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n);
}

export function analyzeServerAccessLog(
  raw: string,
  options: { stripQuery: boolean; topN: number },
): ServerLogAnalysisResult {
  const lines = raw.split(/\r?\n/);
  let nonempty = 0;
  let matched = 0;
  const byStatus = new Map<number, number>();
  const pathCounts = new Map<string, number>();
  const ipCounts = new Map<string, number>();
  const uaCounts = new Map<string, number>();
  const methods = new Map<string, number>();
  let band2xx = 0;
  let band3xx = 0;
  let band4xx = 0;
  let band5xx = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    nonempty += 1;
    const p = parseAccessLogLine(line);
    if (!p) continue;
    matched += 1;
    const pathKey = normalizePath(p.path, options.stripQuery);

    bumpNumMap(byStatus, p.status, 1);
    bumpMap(pathCounts, pathKey, 1);
    bumpMap(ipCounts, p.ip, 1);
    bumpMap(methods, p.method || "?", 1);

    if (p.status >= 200 && p.status < 300) band2xx += 1;
    else if (p.status >= 300 && p.status < 400) band3xx += 1;
    else if (p.status >= 400 && p.status < 500) band4xx += 1;
    else if (p.status >= 500) band5xx += 1;

    const ua = extractQuotedUserAgent(line);
    if (ua) bumpMap(uaCounts, ua, 1);
  }

  const unmatched = nonempty - matched;
  const parseRatePercent = nonempty > 0 ? Math.round((matched * 1000) / nonempty) / 10 : 0;

  return {
    totalLines: lines.length,
    nonemptyLines: nonempty,
    matchedLines: matched,
    unmatchedLines: unmatched,
    parseRatePercent,
    byStatus,
    topPaths: topNFromMap(pathCounts, options.topN),
    topIps: topNFromMap(ipCounts, options.topN),
    topUserAgents: topNFromMap(uaCounts, Math.min(options.topN, 10)),
    methods,
    band2xx,
    band3xx,
    band4xx,
    band5xx,
  };
}

export function formatServerLogReport(result: ServerLogAnalysisResult): string {
  const lines: string[] = [
    "--- Analisi access log ---",
    `Righe totali nel file (inclusi vuoti): ${result.totalLines}`,
    `Righe non vuote: ${result.nonemptyLines}`,
    `Riconosciute: ${result.matchedLines} (${result.parseRatePercent}% del campione non vuoto)`,
    `Non interpretate (formato sconosciuto): ${result.unmatchedLines}`,
    "",
    "--- Bande di stato ---",
    `2xx: ${result.band2xx}`,
    `3xx: ${result.band3xx}`,
    `4xx: ${result.band4xx}`,
    `5xx: ${result.band5xx}`,
    "",
    "--- Codici HTTP ---",
    ...[...result.byStatus.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]).map(([s, n]) => `  ${s}: ${n}`),
    "",
    "--- Top percorsi ---",
    ...result.topPaths.map(([path, n]) => `  ${n}\t${path}`),
    "",
    "--- Top IP ---",
    ...result.topIps.map(([ip, n]) => `  ${n}\t${ip}`),
    "",
    "--- Metodi ---",
    ...[...result.methods.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([m, n]) => `  ${m}: ${n}`),
    "",
    "--- Top User-Agent ---",
    ...result.topUserAgents.map(([ua, n]) => `  ${n}\t${ua.slice(0, 200)}${ua.length > 200 ? "…" : ""}`),
  ];
  return lines.join("\n");
}

export const SAMPLE_COMBINED_LOG = [
  '203.0.113.42 - - [30/Apr/2026:10:01:03 +0200] "GET / HTTP/1.1" 200 4521 "-" "Mozilla/5.0 (compatible; AuditorBot/1.0)"',
  '203.0.113.42 - - [30/Apr/2026:10:01:04 +0200] "GET /servizi?utm=news HTTP/1.1" 200 8123 "https://example.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) Safari/605.1.15"',
  '198.51.100.10 - - [30/Apr/2026:10:01:10 +0200] "POST /api/lead HTTP/1.1" 201 88 "-" "curl/8.7.1"',
  '198.51.100.99 - - [30/Apr/2026:10:01:12 +0200] "GET /robots.txt HTTP/1.1" 404 156 "-" "Googlebot/2.1"',
  '198.51.100.99 - - [30/Apr/2026:10:02:01 +0200] "GET /.env HTTP/1.1" 403 312 "-" "-"',
  '[2001:db8::1] - - [30/Apr/2026:10:03:44 +0200] "GET /pricing HTTP/1.1" 301 162 "-" "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X)"',
  '{"method":"GET","path":"/dashboard","status":200,"remote_addr":"192.0.2.5","request":"GET /dashboard HTTP/1.1"}',
].join("\n");
