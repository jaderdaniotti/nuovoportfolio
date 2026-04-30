"use client";

import { useCallback, useMemo, useState } from "react";
import {
  BROKEN_LINK_MAX_URLS,
  extractHttpUrlsFromHtml,
  formatBrokenLinkReport,
  parseUrlsFromLines,
  validateUrlBatch,
  type BrokenLinkRemoteStatus,
} from "@/lib/broken-link-checker";

type Mode = "urls" | "html";

const SAMPLE_LINES = ["https://example.com", "https://example.com/404-test-path"];

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="it">
<body>
  <a href="/pricing">Prezzi relativi</a>
  <a href="https://example.com">Esempio OK</a>
  <img src="https://example.com/favicon.ico" alt="" />
</body>
</html>`;

export function ToolCheckerBrokenLink() {
  const [mode, setMode] = useState<Mode>("urls");
  const [linesText, setLinesText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://example.com/");
  const [results, setResults] = useState<BrokenLinkRemoteStatus[] | null>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const derivedUrls = useMemo(() => {
    if (mode === "urls") return parseUrlsFromLines(linesText);
    const base = baseUrl.trim() ? baseUrl.trim() : undefined;
    return extractHttpUrlsFromHtml(htmlText, base);
  }, [mode, linesText, htmlText, baseUrl]);

  const validationHint = useMemo(() => validateUrlBatch(derivedUrls), [derivedUrls]);

  const runCheck = useCallback(async () => {
    const err = validateUrlBatch(derivedUrls);
    if (err) {
      setRemoteError(err);
      setResults(null);
      return;
    }
    setLoading(true);
    setRemoteError(null);
    setResults(null);
    try {
      const res = await fetch("/api/tools/check-broken-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: derivedUrls }),
      });
      const data = (await res.json()) as { results?: BrokenLinkRemoteStatus[]; error?: string };
      if (!res.ok) {
        setRemoteError(data.error ?? `Errore HTTP ${res.status}`);
        return;
      }
      if (!data.results) {
        setRemoteError("Risposta API imprevista.");
        return;
      }
      setResults(data.results);
    } catch {
      setRemoteError("Richiesta fallita (rete o timeout).");
    } finally {
      setLoading(false);
    }
  }, [derivedUrls]);

  const copyReport = useCallback(async () => {
    if (!results?.length) return;
    try {
      await navigator.clipboard.writeText(formatBrokenLinkReport(results));
    } catch {
      // ignore
    }
  }, [results]);

  const loadSample = useCallback(() => {
    if (mode === "urls") {
      setLinesText(SAMPLE_LINES.join("\n"));
    } else {
      setHtmlText(SAMPLE_HTML);
      setBaseUrl("https://example.com/");
    }
    setResults(null);
    setRemoteError(null);
  }, [mode]);

  const brokenCount = results?.filter((r) => !r.ok).length ?? 0;

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-sky-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Checker link rotti</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Verifica risposte HTTP (HEAD con fallback GET leggero) su fino a {BROKEN_LINK_MAX_URLS} URL pubblici
              http/https. Puoi incollare un elenco di link oppure HTML: estraiamo{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">href</code> e{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">src</code> e risolviamo URL relativi se indichi
              l&apos;URL base della pagina. Le richieste partono dal server con limiti anti-abuso (no localhost / IP
              privati); alcuni siti possono rispondere 403 anche a pagine valide.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Carica esempio
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-white/80 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("urls");
              setResults(null);
              setRemoteError(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "urls" ? "bg-sky-600 text-white shadow-sm" : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            Elenco URL
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("html");
              setResults(null);
              setRemoteError(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "html" ? "bg-sky-600 text-white shadow-sm" : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            HTML + URL base
          </button>
        </div>

        {mode === "urls" ?
          <label className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Un URL per riga</span>
            <textarea
              value={linesText}
              onChange={(e) => setLinesText(e.target.value)}
              rows={8}
              spellCheck={false}
              placeholder={"https://example.com\nhttps://example.org/path"}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-sky-500/30 focus:border-sky-400 focus:ring-4"
            />
          </label>
        : <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                URL base (per risolvere link relativi)
              </span>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://www.miosito.it/blog/articolo/"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-500/30 focus:border-sky-400 focus:ring-4"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">HTML incollato</span>
              <textarea
                value={htmlText}
                onChange={(e) => setHtmlText(e.target.value)}
                rows={10}
                spellCheck={false}
                placeholder="<html>...</html>"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner outline-none ring-sky-500/30 focus:border-sky-400 focus:ring-4 md:text-sm"
              />
            </label>
          </div>
        }

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={loading || Boolean(validationHint)}
            onClick={() => void runCheck()}
            className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {loading ? "Verifica in corso…" : "Avvia verifica"}
          </button>
          {results && results.length > 0 ?
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Copia report (TSV)
            </button>
          : null}
          <span className="text-sm text-zinc-600">
            URL estratti: <strong className="text-zinc-900">{derivedUrls.length}</strong>
            {derivedUrls.length > BROKEN_LINK_MAX_URLS ?
              <span className="ml-2 text-amber-700">(superi il limite)</span>
            : null}
          </span>
        </div>

        {validationHint ?
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
            {validationHint}
          </p>
        : null}

        {remoteError ?
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-950">
            {remoteError}
          </p>
        : null}
      </div>

      {results && results.length > 0 ?
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 px-4 py-3">
            <p className="text-sm font-medium text-zinc-900">Risultati</p>
            <p className="text-xs text-zinc-600">
              Problemi: <span className="font-semibold text-zinc-900">{brokenCount}</span> / {results.length}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-100 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-2 font-medium">URL richiesto</th>
                  <th className="px-4 py-2 font-medium">HTTP</th>
                  <th className="px-4 py-2 font-medium">Esito</th>
                  <th className="px-4 py-2 font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {results.map((r) => (
                  <tr key={r.url} className={r.ok ? "bg-white" : "bg-red-50/40"}>
                    <td className="max-w-[280px] px-4 py-2 align-top">
                      <span className="break-all font-mono text-xs text-zinc-800">{r.url}</span>
                      {r.finalUrl !== r.url ?
                        <p className="mt-1 text-[11px] text-zinc-500">
                          Finale: <span className="break-all font-mono">{r.finalUrl}</span>
                        </p>
                      : null}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 align-top font-mono text-xs">
                      {r.httpStatus ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 align-top">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          r.ok ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900"
                        }`}
                      >
                        {r.ok ? "OK" : "Attenzione"}
                      </span>
                    </td>
                    <td className="px-4 py-2 align-top text-xs text-zinc-600">{r.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      : null}
    </section>
  );
}
