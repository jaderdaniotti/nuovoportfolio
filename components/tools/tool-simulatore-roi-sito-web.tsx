"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeWebRoi,
  formatWebRoiReport,
  validateWebRoiInput,
  type WebRoiInputs,
} from "@/lib/web-roi-simulator";

const SAMPLE: WebRoiInputs = {
  upfrontCostEUR: 8500,
  monthlyOperatingEUR: 180,
  horizonMonths: 24,
  monthlySessions: 4200,
  conversionPercent: 2.4,
  valuePerConversionEUR: 85,
};

const eur = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

function clampNum(raw: string, fallback: number): number {
  const n = Number.parseFloat(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
}

export function ToolSimulatoreRoiSitoWeb() {
  const [upfrontCostEUR, setUpfrontCostEUR] = useState(String(SAMPLE.upfrontCostEUR));
  const [monthlyOperatingEUR, setMonthlyOperatingEUR] = useState(String(SAMPLE.monthlyOperatingEUR));
  const [horizonMonths, setHorizonMonths] = useState(String(SAMPLE.horizonMonths));
  const [monthlySessions, setMonthlySessions] = useState(String(SAMPLE.monthlySessions));
  const [conversionPercent, setConversionPercent] = useState(String(SAMPLE.conversionPercent));
  const [valuePerConversionEUR, setValuePerConversionEUR] = useState(String(SAMPLE.valuePerConversionEUR));

  const parsed: WebRoiInputs = useMemo(
    () => ({
      upfrontCostEUR: clampNum(upfrontCostEUR, 0),
      monthlyOperatingEUR: clampNum(monthlyOperatingEUR, 0),
      horizonMonths: Math.round(clampNum(horizonMonths, 12)),
      monthlySessions: Math.round(clampNum(monthlySessions, 0)),
      conversionPercent: clampNum(conversionPercent, 0),
      valuePerConversionEUR: clampNum(valuePerConversionEUR, 0),
    }),
    [
      upfrontCostEUR,
      monthlyOperatingEUR,
      horizonMonths,
      monthlySessions,
      conversionPercent,
      valuePerConversionEUR,
    ],
  );

  const validationError = useMemo(() => validateWebRoiInput(parsed), [parsed]);
  const result = useMemo(
    () => (validationError ? null : computeWebRoi(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatWebRoiReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-emerald-200/90 bg-linear-to-br from-emerald-50/90 via-stone-50 to-teal-50/35 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Modello ROI del sito</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Combina il costo del progetto (upfront), i costi operativi ricorrenti, traffico mensile stimato,
              conversion rate medio e il valore economico attribuito alla conversione principale (lead/acquisto).
              Il calcolo avviene solo nel tuo browser: utilizzalo come supporto alla decisione, non come previsione
              certa.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setUpfrontCostEUR(String(SAMPLE.upfrontCostEUR));
              setMonthlyOperatingEUR(String(SAMPLE.monthlyOperatingEUR));
              setHorizonMonths(String(SAMPLE.horizonMonths));
              setMonthlySessions(String(SAMPLE.monthlySessions));
              setConversionPercent(String(SAMPLE.conversionPercent));
              setValuePerConversionEUR(String(SAMPLE.valuePerConversionEUR));
            }}
            className="shrink-0 rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm text-emerald-950/85 transition hover:border-emerald-500 hover:text-emerald-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Investimento progetto sito (€, una tantum)
            <input
              inputMode="decimal"
              value={upfrontCostEUR}
              onChange={(e) => setUpfrontCostEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Costo operativo mensile (€)
            <input
              inputMode="decimal"
              value={monthlyOperatingEUR}
              onChange={(e) => setMonthlyOperatingEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Orizzonte analisi (mesi)
            <input
              inputMode="numeric"
              value={horizonMonths}
              onChange={(e) => setHorizonMonths(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Sessioni / visite mensili stimate
            <input
              inputMode="numeric"
              value={monthlySessions}
              onChange={(e) => setMonthlySessions(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Conversion rate medio (%)
            <input
              inputMode="decimal"
              value={conversionPercent}
              onChange={(e) => setConversionPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Valore medio per conversione (€)
            <input
              inputMode="decimal"
              value={valuePerConversionEUR}
              onChange={(e) => setValuePerConversionEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
        </div>
      </div>

      {validationError ? (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50/95 px-4 py-3 text-sm text-amber-950"
        >
          {validationError}
        </div>
      ) : result ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Utile sul periodo</p>
              <p
                className={`mt-2 text-2xl font-semibold tracking-tight ${
                  result.netProfitEUR >= 0 ? "text-emerald-800" : "text-rose-700"
                }`}
              >
                {eur.format(result.netProfitEUR)}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Ricavi {eur.format(result.totalRevenueEUR)} − costi {eur.format(result.totalCostEUR)}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">ROI su invest. tot.</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {result.roiOnTotalInvestmentPercent !== null
                  ? `${result.roiOnTotalInvestmentPercent}%`
                  : "—"}
              </p>
              <p className="mt-2 text-xs text-zinc-500">Su costo totale nel periodo (upfront + operatività)</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Payback progetto*</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {result.paybackMonths !== null && result.paybackMonths > 0
                  ? `~${result.paybackMonths} mesi`
                  : result.paybackMonths === 0
                    ? "N/D"
                    : "—"}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Stima sulla sola quota upfront con netto mensile medio costante*
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <p className="text-sm font-medium text-zinc-900">Andamento medio mensile (ipotesi stabile)</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Lead / conversioni stimate</dt>
                <dd className="font-medium tabular-nums text-zinc-900">{result.monthlyLeads}</dd>
              </div>
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Margine mensile dopo costi fissi</dt>
                <dd
                  className={`font-medium tabular-nums ${
                    result.monthlyNetEUR >= 0 ? "text-emerald-800" : "text-rose-700"
                  }`}
                >
                  {eur.format(result.monthlyNetEUR)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              *Payback sul costo upfront: mesi richiesti se il netto mensile resta circa costante dopo il launch.
              Se upfront è zero, si considera recupero immediato in termini di modello.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void copyReport()}
            className="rounded-full border border-emerald-800 bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-900"
          >
            Copia report testuale
          </button>
        </div>
      ) : null}
    </section>
  );
}
