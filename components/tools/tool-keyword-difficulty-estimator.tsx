"use client";

import { useCallback, useMemo, useState } from "react";
import {
  estimateKeywordDifficulty,
  type DifficultyBand,
  type KeywordDifficultyEstimate,
} from "@/lib/keyword-difficulty-estimator";

const SAMPLE = "mutuo prima casa online";

function bandMeterClass(band: DifficultyBand): string {
  switch (band) {
    case "molto-bassa":
      return "from-emerald-500 to-emerald-400";
    case "bassa":
      return "from-emerald-400 to-lime-400";
    case "media":
      return "from-amber-400 to-amber-500";
    case "alta":
      return "from-orange-500 to-orange-600";
    default:
      return "from-red-500 to-rose-600";
  }
}

function bandSurfaceClass(band: DifficultyBand): string {
  switch (band) {
    case "molto-bassa":
      return "border-emerald-200 bg-emerald-50 text-emerald-950";
    case "bassa":
      return "border-lime-200 bg-lime-50 text-lime-950";
    case "media":
      return "border-amber-200 bg-amber-50 text-amber-950";
    case "alta":
      return "border-orange-200 bg-orange-50 text-orange-950";
    default:
      return "border-red-200 bg-red-50 text-red-950";
  }
}

function factorChipClass(impact: KeywordDifficultyEstimate["factors"][0]["impact"]) {
  if (impact === "up") return "border-orange-200 bg-orange-50 text-orange-900";
  if (impact === "down") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  return "border-zinc-200 bg-zinc-50 text-zinc-800";
}

export function ToolKeywordDifficultyEstimator() {
  const [keyword, setKeyword] = useState(SAMPLE);

  const estimate = useMemo(() => estimateKeywordDifficulty(keyword), [keyword]);

  const copyReport = useCallback(async () => {
    if (!estimate) return;
    const lines = [
      `Keyword: ${estimate.normalizedKeyword}`,
      `Punteggio stimato (0–100): ${estimate.score}`,
      `${estimate.bandLabelIt}`,
      "",
      "Fattori:",
      ...estimate.factors.map((f) => `- ${f.label} (${f.points > 0 ? "+" : ""}${f.points}): ${f.detail}`),
      "",
      estimate.disclaimer,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      // ignore
    }
  }, [estimate]);

  const idle = !keyword.trim();

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50/80 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Stima competitività keyword</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Inserisci una query come la digiteresti su Google. Il tool calcola in locale un punteggio indicativo
              basato su lunghezza, head/long-tail e segnali di intento (informativo vs transazionale): non sostituisce
              metriche da SERP o database link.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setKeyword(SAMPLE)}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-zinc-800">
          Keyword o frase
          <textarea
            rows={2}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Es. corso seo per principianti, assicurazione viaggio confronto prezzi…"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>

      {idle ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
          Inserisci almeno una parola per vedere punteggio, fascia e i fattori che pesano sulla stima.
        </div>
      ) : !estimate ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          Testo non valido per l’analisi: servono lettere o numeri utili nella keyword.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
          <div className={`rounded-2xl border p-5 md:p-6 ${bandSurfaceClass(estimate.band)}`}>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Esito stimato</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{estimate.normalizedKeyword}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-90">{estimate.bandLabelIt}</p>
            <p className="mt-2 text-sm leading-relaxed opacity-90">{estimate.shortHintIt}</p>
            <p className="mt-4 text-xs opacity-75">
              {estimate.wordCount} {estimate.wordCount === 1 ? "parola" : "parole"} · analisi solo client-side
            </p>

            <div className="mt-6">
              <div className="flex h-3 overflow-hidden rounded-full bg-white/60 ring-1 ring-black/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${bandMeterClass(estimate.band)}`}
                  style={{ width: `${estimate.score}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs opacity-75">
                <span>0 — facile</span>
                <span className="font-mono font-semibold tabular-nums text-zinc-900">{estimate.score}/100</span>
                <span>100 — difficile</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-full border border-zinc-900/10 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white"
              >
                Copia report testuale
              </button>
            </div>
          </div>

          <aside className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-900">Fattori considerati</h3>
            <ul className="mt-3 space-y-2">
              {estimate.factors.map((f) => (
                <li
                  key={f.id}
                  className={`rounded-xl border px-3 py-2.5 text-sm ${factorChipClass(f.impact)}`}
                >
                  <p className="font-medium leading-snug">{f.label}</p>
                  <p className="mt-1 text-xs leading-relaxed opacity-90">{f.detail}</p>
                  <p className="mt-1 font-mono text-[11px] opacity-80">
                    effetto: {f.points > 0 ? "+" : ""}
                    {f.points} punti
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      <p className="text-xs leading-relaxed text-zinc-500">
        {estimate?.disclaimer ??
          "Il punteggio è un modello semplificato: per decisioni su budget SEO e priorità editoriali integra volumi, SERP reali e forza dei domini in classifica."}
      </p>
    </section>
  );
}
