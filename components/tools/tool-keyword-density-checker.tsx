"use client";

import { useCallback, useMemo, useState } from "react";
import {
  analyzeKeywordDensity,
  formatKeywordDensityReport,
  parseKeywordLines,
  validateKeywordDensityInput,
  type KeywordDensityResult,
} from "@/lib/keyword-density-checker";

const SAMPLE_TEXT = `La cura del verde in condominio è una delle responsabilità più discusse tra amministratori e condòmini.

Un buon regolamento e un piano di manutenzione del verde condominiale aiutano a evitare dispute e a mantenere spazi esterni curati per tutti.

Se cerchi idee per il verde condominiale, valuta irrigazione efficiente, scelta delle essenze e frequenza di potatura adatta al clima locale.`;

const SAMPLE_KEYWORDS = `verde condominiale
cura del verde
condominio`;

function densityBarTone(pct: number): string {
  if (pct <= 0) return "bg-zinc-200";
  if (pct < 0.8) return "bg-emerald-400";
  if (pct <= 2.0) return "bg-emerald-500";
  if (pct <= 4) return "bg-amber-400";
  return "bg-rose-400";
}

export function ToolKeywordDensityChecker() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [keywordBlock, setKeywordBlock] = useState(SAMPLE_KEYWORDS);
  const [stripHtml, setStripHtml] = useState(true);
  const [foldDiacritics, setFoldDiacritics] = useState(true);
  const [contentWordsOnly, setContentWordsOnly] = useState(false);

  const validation = useMemo(() => validateKeywordDensityInput(text, keywordBlock), [text, keywordBlock]);

  const result: KeywordDensityResult | null = useMemo(() => {
    if (!validation.ok) return null;
    const lines = parseKeywordLines(keywordBlock);
    return analyzeKeywordDensity(text, lines, { stripHtml, foldDiacritics, contentWordsOnly });
  }, [validation.ok, text, keywordBlock, stripHtml, foldDiacritics, contentWordsOnly]);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatKeywordDensityReport(result));
    } catch {
      // ignore
    }
  }, [result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/40 to-teal-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Densità keyword sul testo</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Incolla articolo, landing o HTML: il tool conta le parole (token Unicode), rileva occorrenze di frasi
              esatte token-per-token e calcola la percentuale sul totale o sulle sole parole di contenuto. Tutto in locale,
              senza invio al server.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setText(SAMPLE_TEXT);
              setKeywordBlock(SAMPLE_KEYWORDS);
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-zinc-800">
          Testo da analizzare
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Incolla qui il copy della pagina…"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-zinc-800">
          Keyword e varianti (una per riga)
          <textarea
            rows={4}
            value={keywordBlock}
            onChange={(e) => setKeywordBlock(e.target.value)}
            placeholder={"verde condominiale\ncura del verde"}
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>

        <fieldset className="mt-5 grid gap-3 rounded-xl border border-emerald-100 bg-white/70 p-4 sm:grid-cols-3">
          <legend className="sr-only">Opzioni di analisi</legend>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="size-4 rounded border-zinc-300 text-emerald-600 accent-emerald-600"
            />
            Rimuovi tag HTML
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={foldDiacritics}
              onChange={(e) => setFoldDiacritics(e.target.checked)}
              className="size-4 rounded border-zinc-300 text-emerald-600 accent-emerald-600"
            />
            Ignora accenti nel match
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={contentWordsOnly}
              onChange={(e) => setContentWordsOnly(e.target.checked)}
              className="size-4 rounded border-zinc-300 text-emerald-600 accent-emerald-600"
            />
            Denominatore: parole di contenuto
          </label>
        </fieldset>
      </div>

      {!validation.ok ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{validation.message}</p>
      ) : !result ? (
        <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          Dopo l’analisi non risultano token nel testo (es. solo markup). Aggiungi testo visibile o disattiva “Rimuovi tag
          HTML” se stai analizzando codice.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="text-sm text-zinc-600">
              <span className="font-medium text-zinc-900">{result.sourceWordCount}</span> parole nel testo
              {result.contentWordsOnly ? (
                <>
                  {" "}
                  · denominatore contenuto:{" "}
                  <span className="font-medium text-zinc-900">{result.denominatorWordCount}</span>
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={copyReport}
              className="rounded-full border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm text-white transition hover:bg-emerald-800"
            >
              Copia report
            </button>
          </div>

          <ul className="space-y-3">
            {result.rows.map((row) => {
              const pct = row.densityPercent;
              const barW = Math.min(100, pct * 8);
              return (
                <li
                  key={row.keyword}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-zinc-900">&ldquo;{row.keyword}&rdquo;</p>
                    <p className="text-sm tabular-nums text-zinc-600">
                      <span className="font-semibold text-zinc-900">{row.occurrences}</span> occorrenze ·{" "}
                      <span className="font-semibold text-emerald-800">{pct.toFixed(2)}%</span>
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{row.phraseTokenCount} token nella frase cercata</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full transition-all ${densityBarTone(pct)}`}
                      style={{ width: `${barW}%` }}
                      title={`Densità ${pct.toFixed(2)}% (scala visiva indicativa)`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="text-xs leading-relaxed text-zinc-500">
            Fascia colore barra (indicativa): sotto ~0,8% verde chiaro, fino ~2% verde, fino ~4% ambra, oltre rosa. Non è
            una regola SEO universale: Google valuta rilevanza e qualità, non una percentuale fissa.
          </p>
        </div>
      )}
    </section>
  );
}
