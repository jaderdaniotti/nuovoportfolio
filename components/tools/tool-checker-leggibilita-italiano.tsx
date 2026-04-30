"use client";

import { useCallback, useMemo, useState } from "react";
import {
  analyzeItalianReadability,
  formatItalianReadabilityReport,
  validateItalianReadabilityInput,
  type ItalianReadabilityResult,
} from "@/lib/leggibilita-italiano";

const SAMPLE_TEXT = `Il servizio clienti online risponde alle domande più comuni senza far attendere il visitatore.

Messaggi brevi e frasi dirette riducono l’effort cognitivo e migliorano la soddisfazione. Usa elenchi quando possibile e un tono coerente con il brand.

Se devi spiegare procedure, suddividile in passi numerati: il lettore capisce subito dove si trova nel percorso e cosa fare dopo.`;

function gulpeaseBarClass(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-teal-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-rose-400";
}

export function ToolCheckerLeggibilitaItaliano() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [stripHtml, setStripHtml] = useState(true);

  const validation = useMemo(() => validateItalianReadabilityInput(text), [text]);

  const result: ItalianReadabilityResult | null = useMemo(() => {
    if (!validation.ok) return null;
    return analyzeItalianReadability(text, { stripHtml });
  }, [validation.ok, text, stripHtml]);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatItalianReadabilityReport(result));
    } catch {
      // ignore
    }
  }, [result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-indigo-50/50 to-sky-50/60 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Indice Gulpease e statistiche di base
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Calcola nel browser l’indice di leggibilità Gulpease tarato sull’italiano: bilancia lunghezza delle parole e
              delle frasi senza inviare copy a server esterni. La stima delle frasi usa la punteggiatura (con protezione
              semplice per numeri decimali).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setText(SAMPLE_TEXT)}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <label className="mt-5 block text-sm font-medium text-zinc-800">
          Testo da analizzare
          <textarea
            rows={14}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Incolla articolo, newsletter o testo di landing…"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={stripHtml}
            onChange={(e) => setStripHtml(e.target.checked)}
            className="size-4 rounded border-zinc-300 text-indigo-600 accent-indigo-600"
          />
          Rimuovi tag HTML prima del calcolo
        </label>
      </div>

      {!validation.ok ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{validation.message}</p>
      ) : !result ? (
        <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          Nessuna parola riconosciuta dopo le opzioni scelte. Aggiungi testo visibile o disattiva la rimozione HTML se vuoi
          analizzare markup.
        </p>
      ) : (
        <div className="space-y-5">
          {result.warningShortSample ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {result.warningShortSample}
            </p>
          ) : null}

          <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Gulpease</p>
                <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {result.gulpeaseRounded}
                  <span className="ml-2 text-xl font-normal text-zinc-500">/ 100</span>
                </p>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-700">{result.bandLabel}</p>
              </div>
              <button
                type="button"
                onClick={copyReport}
                className="rounded-full border border-indigo-700 bg-indigo-700 px-4 py-2 text-sm text-white transition hover:bg-indigo-800"
              >
                Copia report
              </button>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-100">
              <div
                className={`h-full rounded-full transition-all ${gulpeaseBarClass(result.gulpease)}`}
                style={{ width: `${Math.min(100, result.gulpease)}%` }}
                title={`Indice Gulpease ${result.gulpeaseRounded}`}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Scala 0–100: valori più alti indicano copy più lineare sulla base della formula pubblicata (Licenza
              elementare &lt; 80 è la soglia spesso citata nei manuali italiani — indicativa).
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Struttura (stima)</p>
              <p className="mt-2 text-sm text-zinc-800">
                <span className="font-semibold tabular-nums text-zinc-900">{result.sentences}</span> frasi ·{" "}
                <span className="font-semibold tabular-nums text-zinc-900">{result.words}</span> parole
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Media parole/frase: <span className="tabular-nums font-medium">{result.avgWordsPerSentence.toFixed(1)}</span>
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Complessità parole</p>
              <p className="mt-2 text-sm text-zinc-800">
                <span className="font-semibold tabular-nums text-zinc-900">{result.letters}</span> lettere (Unicode Letter)
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Media lettere/parola: <span className="tabular-nums font-medium">{result.avgLettersPerWord.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
