export const WEBHOOK_TEST_MAX_BODY_CHARS = 48_000;
export const WEBHOOK_TEST_MAX_RESPONSE_PREVIEW_CHARS = 80_000;
export const WEBHOOK_TEST_MAX_HEADER_LINES = 24;
export const WEBHOOK_TEST_ALLOWED_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const;

export type WebhookTestMethod = (typeof WEBHOOK_TEST_ALLOWED_METHODS)[number];

export type WebhookTestApiSuccess = {
  ok: true;
  url: string;
  method: string;
  status: number;
  statusText: string;
  ms: number;
  responseHeaders: Array<{ name: string; value: string }>;
  bodyPreview: string;
  bodyTruncated: boolean;
  bodyBytes: number;
};

export type WebhookTestApiError = {
  ok: false;
  error: string;
};

export type WebhookTestApiResponse = WebhookTestApiSuccess | WebhookTestApiError;

const HEADER_LINE_RE = /^[\t ]*([^:\s]+)\s*:\s*(.*)$/;

const BLOCKED_REQUEST_HEADER_NAMES = new Set(
  [
    "host",
    "connection",
    "content-length",
    "transfer-encoding",
    "upgrade",
    "keep-alive",
    "proxy-connection",
    "te",
    "trailer",
    "expect",
  ].map((s) => s.toLowerCase()),
);

function isValidHeaderToken(name: string): boolean {
  if (!name.length || name.length > 128) return false;
  return /^[!#$%&'*+.^`|~\w-]+$/.test(name);
}

export function parseWebhookHeadersFromText(text: string): { headers: Record<string, string> } | { error: string } {
  const lines = text.split(/\r?\n/);
  if (lines.length > WEBHOOK_TEST_MAX_HEADER_LINES) {
    return { error: `Massimo ${WEBHOOK_TEST_MAX_HEADER_LINES} righe di header.` };
  }
  const headers: Record<string, string> = {};
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]!.trim();
    if (!raw || raw.startsWith("#")) continue;
    const m = raw.match(HEADER_LINE_RE);
    if (!m) {
      return { error: `Riga header non valida (usa Nome: valore), riga ${i + 1}.` };
    }
    const name = m[1]!.trim();
    const value = m[2]!.trimEnd();
    if (!isValidHeaderToken(name)) {
      return { error: `Nome header non valido: "${name}".` };
    }
    const lower = name.toLowerCase();
    if (BLOCKED_REQUEST_HEADER_NAMES.has(lower)) {
      return {
        error: `Header "${name}" non consentito (gestito dal server).`,
      };
    }
    if (Object.keys(headers).some((k) => k.toLowerCase() === lower)) {
      return { error: `Header duplicato (case-insensitive): ${name}.` };
    }
    if (value.length > 8192) {
      return { error: `Valore header troppo lungo (${name}).` };
    }
    headers[name] = value;
  }
  return { headers };
}

export function validateWebhookBodyLength(body: string): string | null {
  if (body.length > WEBHOOK_TEST_MAX_BODY_CHARS) {
    return `Corpo richiesta troppo lungo (max ${WEBHOOK_TEST_MAX_BODY_CHARS} caratteri).`;
  }
  return null;
}

export function normalizeWebhookUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    const href = new URL(t.startsWith("//") ? `https:${t}` : t).href.split("#")[0]!;
    if (/^https?:\/\//i.test(href)) return href;
    return null;
  } catch {
    return null;
  }
}

export function formatWebhookReport(res: WebhookTestApiSuccess): string {
  const lines: string[] = [
    `URL: ${res.url}`,
    `Metodo: ${res.method}`,
    `HTTP ${res.status} ${res.statusText}`,
    `Tempo: ${res.ms} ms`,
    `Body risposta: ${res.bodyBytes} byte${res.bodyTruncated ? " (anteprima troncata)" : ""}`,
    "",
    "--- Response headers ---",
    ...res.responseHeaders.map((h) => `${h.name}: ${h.value}`),
    "",
    "--- Response body ---",
    res.bodyPreview,
  ];
  return lines.join("\n");
}
