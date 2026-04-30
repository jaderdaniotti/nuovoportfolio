"use client";

import { useCallback, useMemo, useState } from "react";
import {
  clusterKeywords,
  formatClusteringReport,
  parseUniqueKeywordLines,
  type ClusterIntent,
  type KeywordClusteringResult,
} from "@/lib/keyword-clustering";

const SAMPLE = `mutuo prima casa tassi
mutuo giovani under 36
come funziona mutuo prima casa
guida mutuo fisso variabile
cessione del quinto pubblico impiego
cessione quinto dipendenti privati
finanziamento cessione quinto
assicurazione viaggio europa
polizza viaggio annuale
confronto prezzi assicurazione viaggio`;

function intentBadgeClass(intent: ClusterIntent): string {
  switch (intent) {
    case "informativo":
      return "border-sky-200 bg-sky-50 text-sky-950";
    case "transazionale":
      return "border-violet-200 bg-violet-50 text-violet-950";
    case "misto":
      return "border-amber-200 bg-amber-50 text-amber-950";
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-800";
  }
}

function intentLabel(intent: ClusterIntent): string {
  switch (intent) {
    case "informativo":
      return "Intento: informativo";
    case "transazionale":
      return "Intento: transazionale";
    case "misto":
      return "Intento: misto";
    default:
      return "Intento: non classificato";
  }
}

export function ToolKeywordClustering() {
  const [text, setText] = useState(SAMPLE);
  const [threshold, setThreshold] = useState(0.34);

  const { uniqueLines, duplicateDropped, result } = useMemo(() => {
    const { lines, duplicateDropped: dups } = parseUniqueKeywordLines(text);
    if (lines.length === 0) {
      return { uniqueLines: [] as string[], duplicateDropped: dups, result: null as KeywordClusteringResult | null };
    }
    const res = clusterKeywords(lines, { similarityThreshold: threshold });
    return { uniqueLines: lines, duplicateDropped: dups, result: res };
  }, [text, threshold]);

  const copyReport = useCallback(async () => {
    if (!result || uniqueLines.length === 0) return;
    try {
      await navigator.clipboard.writeText(formatClusteringReport(result, duplicateDropped));
    } catch {
      // ignore
    }
  }, [result, duplicateDropped, uniqueLines.length]);

  const idle = !text.trim();

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-violet-50/30 to-zinc-50/80 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Cluster keyword per topic</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Incolla un elenco di query (una per riga): il tool raggruppa in cluster usando similarità tra parole
              significative e sovrapposizione di frase, tutto nel browser. Utile per mappare contenuti su URL, pillar page
              e hub semantici prima di ricerche più costose.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setText(SAMPLE)}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-zinc-800">
          Elenco keyword
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="mutuo prima casa&#10;come richiedere mutuo&#10;…"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </label>

        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="text-sm font-medium text-zinc-800" htmlFor="cluster-threshold">
              Soglia di unione ({threshold.toFixed(2)})
            </label>
            <span className="text-xs text-zinc-500">Valori bassi = cluster più larghi; alti = gruppi più stretti.</span>
          </div>
          <input
            id="cluster-threshold"
            type="range"
            min={0.18}
            max={0.62}
            step={0.02}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer accent-violet-600"
          />
        </div>
      </div>

      {idle ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
          Incolla almeno una keyword per calcolare i cluster e vedere intento stimato e coesione interna.
        </div>
      ) : uniqueLines.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          Nessuna riga valida: controlla che ci sia testo non solo spazi o punteggiatura.
        </div>
      ) : !result ? null : (
        <>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
            <span className="font-medium text-zinc-900">
              {result.clusters.length} cluster · {result.totalUnique} keyword uniche
            </span>
            {duplicateDropped.length > 0 ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-900">
                {duplicateDropped.length} duplicate ignorati
              </span>
            ) : null}
            <button
              type="button"
              onClick={copyReport}
              className="ml-auto rounded-full border border-violet-300 bg-violet-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-violet-700"
            >
              Copia report
            </button>
          </div>

          {result.tokenlessKeywords.length > 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              Alcune righe non producono token confrontabili (stopword o simboli):{" "}
              <span className="font-mono text-xs">{result.tokenlessKeywords.join(", ")}</span>
            </div>
          ) : null}

          <p className="text-xs leading-relaxed text-zinc-500">{result.disclaimer}</p>

          <div className="grid gap-4 md:grid-cols-2">
            {result.clusters.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                      Cluster {c.id}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-zinc-900">{c.label}</h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${intentBadgeClass(c.suggestedIntent)}`}
                  >
                    {intentLabel(c.suggestedIntent)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Coesione media interna: ~{c.avgPairwiseSimilarity}</p>
                <ul className="mt-4 space-y-2">
                  {c.keywords.map((k) => (
                    <li
                      key={k}
                      className="rounded-lg border border-zinc-100 bg-zinc-50/80 px-3 py-2 text-sm text-zinc-800"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
