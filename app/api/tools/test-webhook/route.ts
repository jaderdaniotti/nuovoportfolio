import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import {
  WEBHOOK_TEST_ALLOWED_METHODS,
  WEBHOOK_TEST_MAX_BODY_CHARS,
  WEBHOOK_TEST_MAX_RESPONSE_PREVIEW_CHARS,
  type WebhookTestApiResponse,
  type WebhookTestApiSuccess,
} from "@/lib/webhook-tester";
import { assertSafeRemoteUrl } from "@/lib/broken-link-checker-remote";

export const runtime = "nodejs";
export const maxDuration = 45;

const FETCH_TIMEOUT_MS = 25_000;
const MAX_RESPONSE_BYTES = 512_000;
const UA = `jaderweb-tools/webhook-tester/1.0 (+${siteConfig.url}/tools/webhook-tester)`;

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

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isValidMethod(m: string): m is (typeof WEBHOOK_TEST_ALLOWED_METHODS)[number] {
  return (WEBHOOK_TEST_ALLOWED_METHODS as readonly string[]).includes(m);
}

function sanitizeHeaders(raw: unknown): Record<string, string> | { error: string } {
  if (raw === undefined || raw === null) return {};
  if (!isPlainObject(raw)) return { error: 'Il campo "headers" deve essere un oggetto JSON.' };
  const out: Record<string, string> = {};
  let count = 0;
  for (const [k, v] of Object.entries(raw)) {
    if (count >= 24) return { error: "Massimo 24 header personalizzati." };
    if (typeof k !== "string" || !k.trim()) continue;
    if (typeof v !== "string") return { error: `Valore header non stringa per "${k}".` };
    const name = k.trim();
    if (name.length > 128) return { error: `Nome header troppo lungo.` };
    const lower = name.toLowerCase();
    if (BLOCKED_REQUEST_HEADER_NAMES.has(lower)) {
      return { error: `Header "${name}" non consentito.` };
    }
    if (/[^\x21-\x7E]/.test(name) || !/^[!#$%&'*+.^_`|~\w-]+$/.test(name)) {
      return { error: `Nome header non valido: "${name}".` };
    }
    if (Object.keys(out).some((exist) => exist.toLowerCase() === lower)) {
      return { error: `Duplicati case-insensitive: ${name}.` };
    }
    if (v.length > 8192) return { error: `Valore troppo lungo per ${name}.` };
    out[name] = v;
    count++;
  }
  return out;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON non valido." } satisfies WebhookTestApiResponse, {
      status: 400,
    });
  }

  if (!isPlainObject(body)) {
    return NextResponse.json({ ok: false, error: "Body deve essere un oggetto JSON." } satisfies WebhookTestApiResponse, {
      status: 400,
    });
  }

  const urlRaw = body.url;
  if (typeof urlRaw !== "string" || !urlRaw.trim()) {
    return NextResponse.json({ ok: false, error: 'Campo "url" obbligatorio (stringa http/https).' } satisfies WebhookTestApiResponse, {
      status: 400,
    });
  }

  let url: URL;
  try {
    url = new URL(urlRaw.startsWith("//") ? `https:${urlRaw}` : urlRaw.trim());
  } catch {
    return NextResponse.json({ ok: false, error: "URL non valido." } satisfies WebhookTestApiResponse, { status: 400 });
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return NextResponse.json({ ok: false, error: "Solo http/https." } satisfies WebhookTestApiResponse, { status: 400 });
  }
  const href = url.href.split("#")[0]!;

  try {
    await assertSafeRemoteUrl(href);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "URL non raggiungibile in sicurezza.";
    return NextResponse.json({ ok: false, error: msg } satisfies WebhookTestApiResponse, { status: 400 });
  }

  const methodRaw = typeof body.method === "string" ? body.method.trim().toUpperCase() : "POST";
  if (!isValidMethod(methodRaw)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Metodo non supportato. Consentiti: ${WEBHOOK_TEST_ALLOWED_METHODS.join(", ")}.`,
      } satisfies WebhookTestApiResponse,
      { status: 400 },
    );
  }

  const headersResult = sanitizeHeaders(body.headers);
  if ("error" in headersResult && headersResult.error) {
    return NextResponse.json({ ok: false, error: headersResult.error } satisfies WebhookTestApiResponse, { status: 400 });
  }

  let reqBody: string | undefined;
  if (body.body !== undefined && body.body !== null) {
    if (typeof body.body !== "string") {
      return NextResponse.json({ ok: false, error: 'Il campo "body" deve essere una stringa (o omesso).' } satisfies WebhookTestApiResponse, {
        status: 400,
      });
    }
    if (body.body.length > WEBHOOK_TEST_MAX_BODY_CHARS) {
      return NextResponse.json(
        { ok: false, error: `Corpo richiesta troppo lungo (max ${WEBHOOK_TEST_MAX_BODY_CHARS} caratteri).` } satisfies WebhookTestApiResponse,
        { status: 400 },
      );
    }
    reqBody = body.body;
  }

  const initHeaders: HeadersInit = {
    "User-Agent": UA,
    Accept: "*/*",
    ...headersResult,
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  const t0 = performance.now();

  try {
    const hasBody =
      reqBody !== undefined &&
      reqBody !== "" &&
      !["GET", "HEAD"].includes(methodRaw);

    const res = await fetch(href, {
      method: methodRaw,
      headers: hasBody ? { ...initHeaders, "Content-Length": String(new TextEncoder().encode(reqBody).length) } : initHeaders,
      body: hasBody ? reqBody : undefined,
      redirect: "manual",
      signal: ctrl.signal,
      cache: "no-store",
    });

    const ms = Math.round(performance.now() - t0);

    const responseHeaders: Array<{ name: string; value: string }> = [];
    res.headers.forEach((value, name) => {
      responseHeaders.push({ name, value });
    });

    const buf = await res.arrayBuffer();
    const clipped = buf.byteLength > MAX_RESPONSE_BYTES ? buf.slice(0, MAX_RESPONSE_BYTES) : buf;

    let bodyPreview = "";
    let truncated = clipped.byteLength >= MAX_RESPONSE_BYTES;
    try {
      bodyPreview = new TextDecoder("utf-8", { fatal: false }).decode(clipped);
    } catch {
      bodyPreview = "[Anteprima non UTF-8; usa gli strumenti di ispezione sulla risposta binaria]";
    }

    if (bodyPreview.length > WEBHOOK_TEST_MAX_RESPONSE_PREVIEW_CHARS) {
      bodyPreview = bodyPreview.slice(0, WEBHOOK_TEST_MAX_RESPONSE_PREVIEW_CHARS);
      truncated = true;
    }

    return NextResponse.json({
      ok: true,
      url: href,
      method: methodRaw,
      status: res.status,
      statusText: res.statusText || "",
      ms,
      responseHeaders,
      bodyPreview,
      bodyTruncated: truncated,
      bodyBytes: buf.byteLength,
    } satisfies WebhookTestApiSuccess);
  } catch (e) {
    const ms = Math.round(performance.now() - t0);
    const aborted = e instanceof Error && e.name === "AbortError";
    const msg =
      aborted ? `Timeout dopo ${FETCH_TIMEOUT_MS / 1000}s` : e instanceof Error ? e.message : "Richiesta fallita.";
    return NextResponse.json({
      ok: false,
      error: `${msg} (${ms} ms)`,
    } satisfies WebhookTestApiResponse);
  } finally {
    clearTimeout(timer);
  }
}
