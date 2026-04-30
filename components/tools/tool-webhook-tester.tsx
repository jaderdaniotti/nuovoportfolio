"use client";

import { useCallback, useState } from "react";
import {
  WEBHOOK_TEST_ALLOWED_METHODS,
  WEBHOOK_TEST_MAX_BODY_CHARS,
  formatWebhookReport,
  normalizeWebhookUrl,
  parseWebhookHeadersFromText,
  validateWebhookBodyLength,
  type WebhookTestApiResponse,
  type WebhookTestApiSuccess,
  type WebhookTestMethod,
} from "@/lib/webhook-tester";

const SAMPLE_URL = "https://httpbin.org/post";
const SAMPLE_HEADERS = ["Content-Type: application/json"].join("\n");
const SAMPLE_BODY = `{
  "source": "webhook-tester-demo",
  "event": "test",
  "note": "Risposta di httpbin.org eco del payload"
}`;

export function ToolWebhookTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<WebhookTestMethod>("POST");
  const [headersText, setHeadersText] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<WebhookTestApiSuccess | null>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async () => {
    const href = normalizeWebhookUrl(url);
    if (!href) {
      setRemoteError("Inserisci un URL http o https valido.");
      setResult(null);
      return;
    }
    const bodyErr = validateWebhookBodyLength(body);
    if (bodyErr) {
      setRemoteError(bodyErr);
      setResult(null);
      return;
    }
    const parsed = parseWebhookHeadersFromText(headersText);
    if ("error" in parsed) {
      setRemoteError(parsed.error);
      setResult(null);
      return;
    }

    setLoading(true);
    setRemoteError(null);
    setResult(null);

    try {
      const payload: Record<string, unknown> = {
        url: href,
        method,
        headers: parsed.headers,
      };
      if (body.length > 0) {
        payload.body = body;
      }

      const res = await fetch("/api/tools/test-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as WebhookTestApiResponse;
      if (!data.ok) {
        setRemoteError(data.error ?? `Errore HTTP ${res.status}`);
        return;
      }
      setResult(data);
    } catch {
      setRemoteError("Richiesta fallita (rete o timeout).");
    } finally {
      setLoading(false);
    }
  }, [url, method, headersText, body]);

  const loadSample = useCallback(() => {
    setUrl(SAMPLE_URL);
    setMethod("POST");
    setHeadersText(SAMPLE_HEADERS);
    setBody(SAMPLE_BODY);
    setResult(null);
    setRemoteError(null);
  }, []);

  const clearAll = useCallback(() => {
    setUrl("");
    setMethod("POST");
    setHeadersText("");
    setBody("");
    setResult(null);
    setRemoteError(null);
  }, []);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatWebhookReport(result));
    } catch {
      // ignore
    }
  }, [result]);

  const statusTone =
    result ?
      result.status >= 200 && result.status < 300 ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : result.status >= 300 && result.status < 400 ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-rose-200 bg-rose-50 text-rose-900"
    : "";

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-violet-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Webhook tester</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Invia richieste HTTP verso endpoint pubblici (Zapier, Make, Stripe test, Slack incoming, ecc.) dal server
              con URL controllati: niente localhost né IP privati. Utile per verificare status, header di risposta e
              corpo dell&apos;eco. I redirect sono mostrati come risposte 3xx senza inseguimento automatico. Timeout
              lato server ~25s; massimo circa {WEBHOOK_TEST_MAX_BODY_CHARS.toLocaleString("it-IT")} caratteri nel corpo inviato;
              download risposta fino a ~512 KB, poi anteprima troncata.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Carica esempio httpbin
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Svuota
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">URL endpoint</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              autoComplete="url"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Metodo HTTP</span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as WebhookTestMethod)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
            >
              {WEBHOOK_TEST_ALLOWED_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <div className="hidden md:block" aria-hidden />

          <label className="block md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Header richiesta (opzionale, una riga <code className="text-zinc-600">Nome: valore</code>)
            </span>
            <textarea
              value={headersText}
              onChange={(e) => setHeadersText(e.target.value)}
              spellCheck={false}
              rows={4}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 font-mono text-xs text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
              placeholder={`Content-Type: application/json\nX-Custom: demo`}
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Corpo (opzionale, max {WEBHOOK_TEST_MAX_BODY_CHARS.toLocaleString("it-IT")} caratteri; ignorato per GET/HEAD)
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              spellCheck={false}
              rows={10}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 font-mono text-xs text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
              placeholder='{"event":"signup"}'
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={send}
            disabled={loading}
            className="rounded-full border border-violet-600 bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Invio…" : "Invia richiesta"}
          </button>
          {result ? (
            <button
              type="button"
              onClick={copyReport}
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Copia report
            </button>
          ) : null}
        </div>
      </div>

      {remoteError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{remoteError}</div>
      ) : null}

      {result ? (
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
          <div className={`rounded-xl border px-4 py-3 text-sm font-medium ${statusTone}`}>
            {result.status} {result.statusText || ""} · {result.ms} ms · {result.bodyBytes.toLocaleString("it-IT")} byte in
            risposta
            {result.bodyTruncated ? " (anteprima troncata)" : ""}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Response headers</h3>
            <ul className="mt-2 max-h-48 overflow-auto rounded-lg border border-zinc-100 bg-zinc-50 p-3 font-mono text-xs text-zinc-800">
              {result.responseHeaders.map((h, i) => (
                <li key={`${i}-${h.name}`}>
                  <span className="text-violet-700">{h.name}</span>: {h.value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Body (preview)</h3>
            <pre className="mt-2 max-h-[min(60vh,28rem)] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-zinc-100 bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
              {result.bodyPreview || "— vuoto —"}
            </pre>
          </div>
        </div>
      ) : null}
    </section>
  );
}
