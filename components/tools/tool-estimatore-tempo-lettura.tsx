"use client";

import { useCallback, useMemo, useState } from "react";
import {
  READING_TIME_WPM_DEFAULT,
  READING_TIME_WPM_MAX,
  READING_TIME_WPM_MIN,
  SAMPLE_READING_TIME_TEXT,
  analyzeReadingTime,
  clampWordsPerMinute,
  formatReadingTimeReport,
  validateReadingTimeEstimatorInput,
  type ReadingTimeResult,
} from "@/lib/reading-time-estimator";

export function ToolEstimatoreTempoLettura() {
  const [text, setText] = useState(SAMPLE_READING_TIME_TEXT);
  const [stripHtml, setStripHtml] = useState(true);
  const [wpmInput, setWpmInput] = useState(READING_TIME_WPM_DEFAULT);

  const validation = useMemo(() => validateReadingTimeEstimatorInput(text), [text]);
  const wpm = clampWordsPerMinute(wpmInput);

  const result: ReadingTimeResult | null = useMemo(() => {
    if (!validation.ok) return null;
    return analyzeReadingTime(text, { stripHtml, wordsPerMinute: wpm });
  }, [validation.ok, text, stripHtml, wpm]);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatReadingTimeReport(result));
    } catch {
      /* ignore */
    }
  }, [result]);

  const fieldNumberCls =
    "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200";

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-teal-200/90 bg-linear-to-br from-teal-50/90 via-white to-emerald-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Tempo di lettura stimato</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              Conta le <strong className="font-medium text-zinc-900">parole</strong> nel browser (token Unicode come negli altri tool editoriali) e divide per una velocità di lettura impostabile, tipica per l’italiano su schermo tra ~180 e 220 parole al minuto. Utile per
              card articoli, newsletter e microcopy &quot;X min di lettura&quot;.
            </p>
            <p className="mt-2 text-xs text-teal-900/80">
              Nessun invio al server: incolla testo o HTML, regola WPM e scegli se ignorare i tag prima del conteggio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setText(SAMPLE_READING_TIME_TEXT)}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-teal-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-zinc-800">
          Testo o HTML
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Incolla articolo, bozza o frammento HTML…"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Parole al minuto (WPM)
            <input
              type="number"
              min={READING_TIME_WPM_MIN}
              max={READING_TIME_WPM_MAX}
              step={5}
              value={wpmInput}
              onChange={(e) => setWpmInput(Number(e.target.value))}
              className={fieldNumberCls}
            />
            <span className="mt-1 block text-xs text-zinc-500">
              Consigliato 180–220 per italiano su desktop; valori fuori range vengono riportati tra {READING_TIME_WPM_MIN} e {READING_TIME_WPM_MAX}.
            </span>
          </label>
          <label className="mt-7 flex cursor-pointer items-start gap-2 text-sm text-zinc-800 sm:mt-11">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="mt-0.5 size-4 rounded border-zinc-300 text-teal-600 accent-teal-600"
            />
            <span>Rimuovi tag HTML (e blocchi script/style) prima di contare le parole</span>
          </label>
        </div>
      </div>

      {!validation.ok ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{validation.message}</p>
      ) : !result ? (
        <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          Nessuna parola riconosciuta dopo le opzioni scelte. Aggiungi testo visibile o disattiva la rimozione HTML se stai incollando markup senza parole nel body.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Risultato</p>
            <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-zinc-900">{result.labelCompact}</p>
            <p className="mt-1 text-sm text-zinc-600">{result.labelMinutesRoundedUp}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Dettaglio</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <span className="text-zinc-500">Parole:</span> {result.wordCount.toLocaleString("it-IT")}
              </li>
              <li>
                <span className="text-zinc-500">WPM usata:</span> {result.wordsPerMinute}
              </li>
              <li>
                <span className="text-zinc-500">Secondi totali (ceil):</span> {result.totalSeconds.toLocaleString("it-IT")}
              </li>
            </ul>
            <button
              type="button"
              onClick={copyReport}
              className="mt-4 rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-teal-400 hover:bg-teal-50/80"
            >
              Copia report
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
