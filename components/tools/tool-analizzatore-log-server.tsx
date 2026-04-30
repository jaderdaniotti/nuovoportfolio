"use client";

import { useCallback, useMemo, useState } from "react";
import {
  SAMPLE_COMBINED_LOG,
  analyzeServerAccessLog,
  formatServerLogReport,
  validateServerLogInput,
  type ServerLogAnalysisResult,
} from "@/lib/analizzatore-log-server";

const TOP_N_OPTIONS = [8, 12, 20] as const;

export function ToolAnalizzatoreLogServer() {
  const [text, setText] = useState("");
  const [stripQuery, setStripQuery] = useState(true);
  const [topN, setTopN] = useState<(typeof TOP_N_OPTIONS)[number]>(12);
  const [hint, setHint] = useState<string | null>(null);
  const [result, setResult] = useState<ServerLogAnalysisResult | null>(null);

  const runAnalyze = useCallback(() => {
    const v = validateServerLogInput(text);
    if (!v.ok) {
      setHint(v.error);
      setResult(null);
      return;
    }
    setHint(null);
    setResult(analyzeServerAccessLog(text, { stripQuery, topN }));
  }, [stripQuery, text, topN]);

  const loadSample = useCallback(() => {
    setText(SAMPLE_COMBINED_LOG);
    setStripQuery(true);
    setTopN(12);
    setHint(null);
    setResult(analyzeServerAccessLog(SAMPLE_COMBINED_LOG, { stripQuery: true, topN: 12 }));
  }, []);

  const clearAll = useCallback(() => {
    setText("");
    setHint(null);
    setResult(null);
  }, []);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatServerLogReport(result));
    } catch {
      // ignore
    }
  }, [result]);

  const pct4xx = useMemo(() => {
    if (!result || result.matchedLines === 0) return 0;
    return Math.round((result.band4xx * 1000) / result.matchedLines) / 10;
  }, [result]);

  const pct5xx = useMemo(() => {
    if (!result || result.matchedLines === 0) return 0;
    return Math.round((result.band5xx * 1000) / result.matchedLines) / 10;
  }, [result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-amber-50/35 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Analizzatore access log server</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Incolla righe dal log di accesso (formato combinato tipo Apache/Nginx o JSON con campi chiave tipo{" "}
              <code className="text-xs text-zinc-700">method</code>/<code className="text-xs text-zinc-700">path</code>/
              <code className="text-xs text-zinc-700">status</code>): calcolo distribuzione stato HTTP, top percorsi, IP,
              metodi e un campione dei User-Agent dalla riga testuale. L&apos;analisi rimane nel browser: non carichiamo
              file né log sul server dell&apos;applicazione.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-medium text-amber-900 shadow-sm hover:bg-amber-50"
            >
              Carica esempio
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
            >
              Svuota
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
          <div>
            <label htmlFor="log-text" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Righe log
            </label>
            <textarea
              id="log-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              placeholder='Esempio: 203.0.113.42 - - [date] &quot;GET /pagina HTTP/1.1&quot; 200 1234 &quot;-&quot; &quot;Mozilla...&quot;'
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner placeholder:text-zinc-400 md:text-sm"
            />
          </div>
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold text-zinc-800">Opzioni</p>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={stripQuery}
                onChange={(e) => setStripQuery(e.target.checked)}
                className="mt-1"
              />
              <span>Raggruppa percorsi senza query string (<code>?foo=…</code>)</span>
            </label>
            <div>
              <p className="text-xs font-medium text-zinc-600">Profondità classifiche</p>
              <select
                value={topN}
                onChange={(e) =>
                  setTopN(Number.parseInt(e.target.value, 10) as (typeof TOP_N_OPTIONS)[number])
                }
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-900"
              >
                {TOP_N_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    Top {n}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={runAnalyze}
              className="w-full rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
            >
              Analizza
            </button>
          </div>
        </div>

        {hint ? (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950" role="status">
            {hint}
          </p>
        ) : null}

        {!hint && text.trim() === "" ? (
          <p className="mt-4 text-sm text-zinc-500">
            Nessun log incollato: usa &quot;Carica esempio&quot; oppure incolla un estratto dalla console host / CDN /
            proxy.
          </p>
        ) : null}

        {!hint && text.trim() !== "" && !result ? (
          <p className="mt-4 text-sm text-zinc-500">Premi &quot;Analizza&quot; per aggiornare il riepilogo statistico.</p>
        ) : null}
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Campione non vuoto" value={String(result.nonemptyLines)} />
            <MetricCard title="Parsing riuscito" value={`${result.matchedLines} (${result.parseRatePercent}%)`} />
            <MetricCard title="4xx sul match" sub={`≈ ${pct4xx}% traffico errore cliente`} value={String(result.band4xx)} />
            <MetricCard title="5xx sul match" sub={`≈ ${pct5xx}% errore server`} value={String(result.band5xx)} tone="risk" />
          </div>

          {result.parseRatePercent < 40 ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              Poche righe sono state interpretate dal parser: verifica formato (combined Apache/Nginx) o prova righe JSON
              con <code className="text-xs">method</code>, <code className="text-xs">path</code> e{" "}
              <code className="text-xs">status</code>.
            </p>
          ) : null}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-900">Distribuzione stato</h3>
              <span className="text-xs text-zinc-500">
                2xx {result.band2xx} · 3xx {result.band3xx} · 4xx {result.band4xx} · 5xx {result.band5xx}
              </span>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[...result.byStatus.entries()]
                .sort((a, b) => b[1] - a[1] || a[0] - b[0])
                .slice(0, 12)
                .map(([code, n]) => (
                  <li
                    key={code}
                    className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-800"
                  >
                    <span className="font-mono font-semibold">{code}</span>
                    <span>{n}</span>
                  </li>
                ))}
            </ul>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Percorsi</h4>
                <ol className="mt-2 space-y-1.5 font-mono text-xs text-zinc-800">
                  {result.topPaths.map(([p, n], i) => (
                    <li key={`${p}-${i}`} className="flex justify-between gap-2 border-b border-zinc-100 pb-1.5">
                      <span className="min-w-0 truncate">{p}</span>
                      <span className="shrink-0 text-zinc-500">{n}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Client IP</h4>
                <ol className="mt-2 space-y-1.5 font-mono text-xs text-zinc-800">
                  {result.topIps.map(([ip, n], i) => (
                    <li key={`${ip}-${i}`} className="flex justify-between gap-2 border-b border-zinc-100 pb-1.5">
                      <span className="min-w-0 truncate">{ip}</span>
                      <span className="shrink-0 text-zinc-500">{n}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Metodi</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {[...result.methods.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .map(([m, n]) => (
                      <li key={m} className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-800">
                        {m}&nbsp;<span className="text-zinc-500">{n}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">User-Agent (testo quoted)</h4>
                <ol className="mt-2 space-y-1.5 text-xs leading-snug text-zinc-700">
                  {result.topUserAgents.length === 0 ? (
                    <li className="text-zinc-500">— (nessuna riga textual con UA finale ricavabile)</li>
                  ) : (
                    result.topUserAgents.map(([ua, n], i) => (
                      <li key={`${ua.slice(0, 48)}-${i}`} className="border-b border-zinc-100 pb-2">
                        <span className="font-mono text-[11px] text-zinc-600">{truncate(ua, 160)}</span>
                        <span className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600">{n}</span>
                      </li>
                    ))
                  )}
                </ol>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-xl border border-zinc-900 bg-transparent px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Copia report testuale
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function MetricCard(props: {
  title: string;
  value: string;
  sub?: string;
  tone?: "risk" | "default";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        props.tone === "risk"
          ? "border-rose-200 bg-rose-50/70"
          : "border-zinc-200 bg-zinc-50/80"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-600">{props.title}</p>
      <p className={`mt-1 text-2xl font-semibold ${props.tone === "risk" ? "text-rose-950" : "text-zinc-900"}`}>
        {props.value}
      </p>
      {props.sub ? <p className="mt-1 text-xs text-zinc-500">{props.sub}</p> : null}
    </div>
  );
}
