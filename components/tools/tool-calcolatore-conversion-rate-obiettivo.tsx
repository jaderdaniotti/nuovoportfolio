"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeConversionRateObiettivo,
  formatConversionRateObiettivoReport,
  validateConversionRateObiettivoInput,
  type ConversionRateObiettivoInputs,
} from "@/lib/conversion-rate-obiettivo";

const SAMPLE = {
  monthlySessionsOrClicks: 8400,
  targetLeadsPerMonth: 235,
} as const;

function clampNum(raw: string, fallback: number): number {
  const n = Number.parseFloat(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
}

function resolveOptionalPercent(raw: string): { kind: "empty" } | { kind: "invalid" } | { kind: "value"; value: number } {
  const t = raw.trim();
  if (t === "") return { kind: "empty" };
  const n = clampNum(raw, NaN);
  if (!Number.isFinite(n)) return { kind: "invalid" };
  return { kind: "value", value: n };
}

export function ToolCalcolatoreConversionRateObiettivo() {
  const [monthlySessionsOrClicks, setMonthlySessionsOrClicks] = useState(String(SAMPLE.monthlySessionsOrClicks));
  const [targetLeadsPerMonth, setTargetLeadsPerMonth] = useState(String(SAMPLE.targetLeadsPerMonth));
  const [currentConversionPercentRaw, setCurrentConversionPercentRaw] = useState("2,8");

  const optionalPercent = useMemo(
    () => resolveOptionalPercent(currentConversionPercentRaw),
    [currentConversionPercentRaw],
  );

  const parsed: ConversionRateObiettivoInputs = useMemo(
    () => ({
      monthlySessionsOrClicks: clampNum(monthlySessionsOrClicks, 0),
      targetLeadsPerMonth: clampNum(targetLeadsPerMonth, 0),
      currentConversionPercent: optionalPercent.kind === "value" ? optionalPercent.value : null,
    }),
    [monthlySessionsOrClicks, targetLeadsPerMonth, optionalPercent],
  );

  const validationError = useMemo(() => {
    if (optionalPercent.kind === "invalid") {
      return "Il CVR attuale deve essere un numero valido.";
    }
    return validateConversionRateObiettivoInput(parsed);
  }, [optionalPercent, parsed]);
  const result = useMemo(
    () => (validationError ? null : computeConversionRateObiettivo(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatConversionRateObiettivoReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  const loadExample = () => {
    setMonthlySessionsOrClicks(String(SAMPLE.monthlySessionsOrClicks));
    setTargetLeadsPerMonth(String(SAMPLE.targetLeadsPerMonth));
    setCurrentConversionPercentRaw("2,8");
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-emerald-200/90 bg-linear-to-br from-emerald-50/90 via-white to-teal-50/45 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Quale CVR serve per il target?</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Con traffico mensile noto (sessioni o click sulla landing / funnel) e un obiettivo di lead o conversioni
              macro, il tool calcola il <strong>tasso di conversione richiesto</strong>. Opzionale: inserisci il CVR
              attuale per vedere il gap in punti percentuali e quante sessioni servirebbero allo status quo per raggiungere
              il target. Calcolo locale nel browser.
            </p>
          </div>
          <button
            type="button"
            onClick={loadExample}
            className="shrink-0 rounded-full border border-emerald-400/80 bg-white px-4 py-2 text-sm text-emerald-950/90 transition hover:border-emerald-600 hover:text-emerald-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Sessioni o click mensili (base funnel)
            <input
              inputMode="decimal"
              value={monthlySessionsOrClicks}
              onChange={(e) => setMonthlySessionsOrClicks(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              placeholder="es. 8400"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Target lead / conversioni al mese
            <input
              inputMode="decimal"
              value={targetLeadsPerMonth}
              onChange={(e) => setTargetLeadsPerMonth(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              placeholder="es. 235"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800 sm:col-span-2">
            CVR attuale stimato (%, opzionale)
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              Lascia vuoto per calcolare solo il CVR obiettivo; utile per gap e traffico teorico necessario.
            </span>
            <input
              inputMode="decimal"
              value={currentConversionPercentRaw}
              onChange={(e) => setCurrentConversionPercentRaw(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              placeholder="es. 2,8"
            />
          </label>
        </div>

        {validationError && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            {validationError}
          </p>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            {result.feasibility === "over-100" && (
              <p className="rounded-xl border border-amber-300 bg-amber-50/95 px-4 py-3 text-sm text-amber-950">
                Il target supera il traffico mensile se si assume al massimo <strong>una</strong> conversione per
                sessione/click: il CVR teorico supera il 100%. Aumenta volumi (canali, SEO, paid), abbassa il target o
                rivedi il funnel (micro-conversioni, lead duplicati).
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/80 bg-white/90 p-4 shadow-sm sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">CVR richiesto</p>
                <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {result.requiredConversionPercent}%
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Formula: (target ÷ sessioni) × 100 — sul traffico base indicato.
                </p>
              </div>
              {parsed.currentConversionPercent !== null && (
                <>
                  <div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Gap vs CVR attuale</p>
                    <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">
                      {result.gapVersusCurrentPercent !== null
                        ? `${result.gapVersusCurrentPercent >= 0 ? "+" : ""}${result.gapVersusCurrentPercent} pt`
                        : "—"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Sessioni mensili allo CVR attuale
                    </p>
                    <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">
                      {result.sessionsNeededAtCurrentCvr !== null
                        ? result.sessionsNeededAtCurrentCvr.toLocaleString("it-IT", { maximumFractionDigits: 2 })
                        : parsed.currentConversionPercent === 0 && parsed.targetLeadsPerMonth > 0
                          ? "∞"
                          : "—"}
                    </p>
                    {parsed.currentConversionPercent === 0 && parsed.targetLeadsPerMonth > 0 ? (
                      <p className="mt-1 text-xs text-amber-800">
                        Con CVR attuale 0% non si stima traffico sufficiente: serve migliorare conversione o definire un
                        CVR minimo &gt; 0.
                      </p>
                    ) : null}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-full border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                Copia report
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
