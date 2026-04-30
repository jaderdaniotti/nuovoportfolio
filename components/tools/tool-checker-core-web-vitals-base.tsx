"use client";

import { useCallback, useMemo, useState } from "react";
import {
  analyzeCoreWebVitalsBase,
  hasCoreWebVitalsNumbers,
  tryParseLighthouseJson,
  type CwvRating,
  validateCoreWebVitalsInput,
} from "@/lib/core-web-vitals-base";

const SAMPLE_GOOD = { lcp: "1.8", inp: "120", cls: "0.04" };
const SAMPLE_MIXED = { lcp: "3.2", inp: "280", cls: "0.18" };

function ratingSurface(r: CwvRating): string {
  if (r === "good") return "border-emerald-200 bg-emerald-50 text-emerald-950";
  if (r === "needs-improvement") return "border-amber-200 bg-amber-50 text-amber-950";
  return "border-red-200 bg-red-50 text-red-950";
}

function ratingDot(r: CwvRating): string {
  if (r === "good") return "bg-emerald-500";
  if (r === "needs-improvement") return "bg-amber-500";
  return "bg-red-500";
}

function parseOptionalFloat(raw: string): number | null {
  const t = raw.trim().replace(",", ".");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function ToolCheckerCoreWebVitalsBase() {
  const [lcpRaw, setLcpRaw] = useState("");
  const [inpRaw, setInpRaw] = useState("");
  const [clsRaw, setClsRaw] = useState("");
  const [interactionIsFid, setInteractionIsFid] = useState(false);
  const [lighthousePaste, setLighthousePaste] = useState("");
  const [lighthouseMessage, setLighthouseMessage] = useState<string | null>(null);

  const input = useMemo(() => {
    return {
      lcpSeconds: parseOptionalFloat(lcpRaw),
      inpMs: parseOptionalFloat(inpRaw),
      cls: parseOptionalFloat(clsRaw),
      interactionIsFid,
    };
  }, [lcpRaw, inpRaw, clsRaw, interactionIsFid]);

  const typedAny = lcpRaw.trim() !== "" || inpRaw.trim() !== "" || clsRaw.trim() !== "";
  const hasNumbers = useMemo(() => hasCoreWebVitalsNumbers(input), [input]);
  const validationError = useMemo(() => validateCoreWebVitalsInput(input), [input]);
  const analysis = useMemo(
    () => (hasNumbers && !validationError ? analyzeCoreWebVitalsBase(input) : null),
    [input, hasNumbers, validationError],
  );

  const idle = !typedAny;
  const invalidNumbers = typedAny && !hasNumbers;

  const applyLighthouse = useCallback(() => {
    const res = tryParseLighthouseJson(lighthousePaste);
    if (!res.ok) {
      setLighthouseMessage(res.error);
      return;
    }
    const d = res.data;
    if (d.lcpSeconds != null) setLcpRaw(String(d.lcpSeconds));
    if (d.inpMs != null) setInpRaw(String(d.inpMs));
    if (d.cls != null) setClsRaw(String(d.cls));
    if (d.interactionIsFid != null) setInteractionIsFid(d.interactionIsFid);
    setLighthouseMessage("Campi aggiornati dal JSON Lighthouse.");
  }, [lighthousePaste]);

  const copyReport = useCallback(async () => {
    if (!analysis) return;
    try {
      await navigator.clipboard.writeText(analysis.summaryLines.join("\n"));
    } catch {
      // ignore
    }
  }, [analysis]);

  const loadSample = useCallback((kind: "good" | "mixed") => {
    const s = kind === "good" ? SAMPLE_GOOD : SAMPLE_MIXED;
    setLcpRaw(s.lcp);
    setInpRaw(s.inp);
    setClsRaw(s.cls);
    setInteractionIsFid(false);
    setLighthouseMessage(null);
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-indigo-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Checker Core Web Vitals (base)</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Incolla i valori misurati (secondi per LCP, millisecondi per INP o FID legacy, punteggio CLS) oppure
              estrai automaticamente da un export JSON di Lighthouse. Il confronto usa le soglie ufficiali Google
              good / needs improvement / poor — nessuna chiamata di rete al tuo sito.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadSample("good")}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Esempio good
            </button>
            <button
              type="button"
              onClick={() => loadSample("mixed")}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Esempio misto
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium text-zinc-800">
            LCP (secondi)
            <input
              type="text"
              inputMode="decimal"
              value={lcpRaw}
              onChange={(e) => setLcpRaw(e.target.value)}
              placeholder="es. 2,4"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            INP o FID (ms)
            <input
              type="text"
              inputMode="numeric"
              value={inpRaw}
              onChange={(e) => setInpRaw(e.target.value)}
              placeholder="es. 180"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            CLS
            <input
              type="text"
              inputMode="decimal"
              value={clsRaw}
              onChange={(e) => setClsRaw(e.target.value)}
              placeholder="es. 0,08"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={interactionIsFid}
            onChange={(e) => setInteractionIsFid(e.target.checked)}
            className="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-200"
          />
          Il valore in ms è FID (Lighthouse legacy), non INP — usa le soglie FID nella valutazione
        </label>

        <div className="mt-6 rounded-xl border border-dashed border-indigo-200 bg-white/80 p-4">
          <p className="text-sm font-medium text-zinc-900">Import da Lighthouse (opzionale)</p>
          <p className="mt-1 text-xs text-zinc-600">
            Incolla il JSON completo del report (menu ⋮ → Save as JSON). Clic &quot;Estrai metriche&quot; per
            compilare i campi sopra.
          </p>
          <textarea
            rows={3}
            value={lighthousePaste}
            onChange={(e) => {
              setLighthousePaste(e.target.value);
              setLighthouseMessage(null);
            }}
            placeholder='{"lighthouseVersion":"...", "audits":{ "largest-contentful-paint": {...} } }'
            className="mt-3 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 outline-none ring-zinc-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="button"
            onClick={applyLighthouse}
            className="mt-3 rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-900 transition hover:border-indigo-400 hover:bg-indigo-100"
          >
            Estrai metriche da JSON
          </button>
          {lighthouseMessage ? (
            <p
              className={`mt-2 text-sm ${
                lighthouseMessage.startsWith("Campi") ? "text-emerald-800" : "text-amber-800"
              }`}
            >
              {lighthouseMessage}
            </p>
          ) : null}
        </div>
      </div>

      {idle ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
          Inserisci almeno una metrica (LCP in secondi, INP/FID in ms o CLS), usa un esempio oppure estrai i valori da
          un JSON Lighthouse.
        </div>
      ) : invalidNumbers ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          Nessun valore numerico riconosciuto: controlla decimali con punto o virgola e che INP/FID siano in millisecondi.
        </div>
      ) : validationError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">{validationError}</div>
      ) : analysis ? (
        <div className="space-y-5">
          <div
            className={`rounded-2xl border p-5 md:p-6 ${
              analysis.metrics.every((m) => m.rating === "good")
                ? "border-emerald-200 bg-emerald-50/80"
                : analysis.metrics.some((m) => m.rating === "poor")
                  ? "border-red-200 bg-red-50/80"
                  : "border-amber-200 bg-amber-50/80"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Sintesi</p>
            <p className="mt-2 text-base font-medium text-zinc-900">{analysis.overallLabelIt}</p>
          </div>

          <ul className="space-y-3">
            {analysis.metrics.map((m) => (
              <li
                key={m.key}
                className={`rounded-2xl border p-4 md:flex md:items-start md:justify-between md:gap-4 ${ratingSurface(m.rating)}`}
              >
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${ratingDot(m.rating)}`} aria-hidden />
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900">{m.label}</p>
                    <p className="mt-1 text-sm text-zinc-800">
                      Valore: <span className="font-mono">{m.valueLabel}</span> — {m.ratingLabelIt}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600">{m.thresholdsHint}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyReport}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Copia report testuale
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
