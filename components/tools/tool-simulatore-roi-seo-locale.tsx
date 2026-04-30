"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeLocalSeoRoi,
  formatLocalSeoRoiReport,
  validateLocalSeoRoiInput,
  type LocalSeoRoiInputs,
} from "@/lib/local-seo-roi-simulator";

const SAMPLE: LocalSeoRoiInputs = {
  upfrontLocalSeoEUR: 3200,
  monthlySeoFeeEUR: 450,
  horizonMonths: 18,
  monthlyLocalImpressions: 12500,
  ctrToSitePercent: 4.2,
  clickToLeadPercent: 6.5,
  valuePerLeadEUR: 120,
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

export function ToolSimulatoreRoiSeoLocale() {
  const [upfrontLocalSeoEUR, setUpfrontLocalSeoEUR] = useState(String(SAMPLE.upfrontLocalSeoEUR));
  const [monthlySeoFeeEUR, setMonthlySeoFeeEUR] = useState(String(SAMPLE.monthlySeoFeeEUR));
  const [horizonMonths, setHorizonMonths] = useState(String(SAMPLE.horizonMonths));
  const [monthlyLocalImpressions, setMonthlyLocalImpressions] = useState(String(SAMPLE.monthlyLocalImpressions));
  const [ctrToSitePercent, setCtrToSitePercent] = useState(String(SAMPLE.ctrToSitePercent));
  const [clickToLeadPercent, setClickToLeadPercent] = useState(String(SAMPLE.clickToLeadPercent));
  const [valuePerLeadEUR, setValuePerLeadEUR] = useState(String(SAMPLE.valuePerLeadEUR));

  const parsed: LocalSeoRoiInputs = useMemo(
    () => ({
      upfrontLocalSeoEUR: clampNum(upfrontLocalSeoEUR, 0),
      monthlySeoFeeEUR: clampNum(monthlySeoFeeEUR, 0),
      horizonMonths: Math.round(clampNum(horizonMonths, 12)),
      monthlyLocalImpressions: Math.round(clampNum(monthlyLocalImpressions, 0)),
      ctrToSitePercent: clampNum(ctrToSitePercent, 0),
      clickToLeadPercent: clampNum(clickToLeadPercent, 0),
      valuePerLeadEUR: clampNum(valuePerLeadEUR, 0),
    }),
    [
      upfrontLocalSeoEUR,
      monthlySeoFeeEUR,
      horizonMonths,
      monthlyLocalImpressions,
      ctrToSitePercent,
      clickToLeadPercent,
      valuePerLeadEUR,
    ],
  );

  const validationError = useMemo(() => validateLocalSeoRoiInput(parsed), [parsed]);
  const result = useMemo(
    () => (validationError ? null : computeLocalSeoRoi(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatLocalSeoRoiReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-sky-200/90 bg-linear-to-br from-sky-50/95 via-white to-indigo-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Funnel SEO locale</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Stima lead e margini partendo da volumi tipici della ricerca locale (impressioni Search Console,
              stime keyword map pack o GBP), dal CTR verso il sito o la scheda, e dalla conversione dei click in
              contatti qualificati. Include setup o progetto locale e canone ricorrente. Tutto calcolato nel browser;
              usa i numeri come scenario, non come garanzia di risultato.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setUpfrontLocalSeoEUR(String(SAMPLE.upfrontLocalSeoEUR));
              setMonthlySeoFeeEUR(String(SAMPLE.monthlySeoFeeEUR));
              setHorizonMonths(String(SAMPLE.horizonMonths));
              setMonthlyLocalImpressions(String(SAMPLE.monthlyLocalImpressions));
              setCtrToSitePercent(String(SAMPLE.ctrToSitePercent));
              setClickToLeadPercent(String(SAMPLE.clickToLeadPercent));
              setValuePerLeadEUR(String(SAMPLE.valuePerLeadEUR));
            }}
            className="shrink-0 rounded-full border border-sky-400/80 bg-white px-4 py-2 text-sm text-sky-950/90 transition hover:border-sky-600 hover:text-sky-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Setup / progetto SEO locale (€, una tantum)
            <input
              inputMode="decimal"
              value={upfrontLocalSeoEUR}
              onChange={(e) => setUpfrontLocalSeoEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Canone SEO locale mensile (€)
            <input
              inputMode="decimal"
              value={monthlySeoFeeEUR}
              onChange={(e) => setMonthlySeoFeeEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Orizzonte analisi (mesi)
            <input
              inputMode="numeric"
              value={horizonMonths}
              onChange={(e) => setHorizonMonths(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Impressioni / ricerche locali mensili stimate
            <input
              inputMode="numeric"
              value={monthlyLocalImpressions}
              onChange={(e) => setMonthlyLocalImpressions(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            CTR stimato verso sito o scheda (%)
            <input
              inputMode="decimal"
              value={ctrToSitePercent}
              onChange={(e) => setCtrToSitePercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Click → lead / prenotazione (%)
            <input
              inputMode="decimal"
              value={clickToLeadPercent}
              onChange={(e) => setClickToLeadPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800 sm:col-span-2">
            Valore medio per lead (€)
            <input
              inputMode="decimal"
              value={valuePerLeadEUR}
              onChange={(e) => setValuePerLeadEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
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
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 px-4 py-3 text-sm text-indigo-950 md:px-5">
            <p className="font-medium">Percorso sintetico</p>
            <p className="mt-1 font-mono text-xs text-indigo-900/85 md:text-sm">
              {parsed.monthlyLocalImpressions.toLocaleString("it-IT")} impr. × {parsed.ctrToSitePercent}% CTR → ~{" "}
              {result.estimatedMonthlyClicks} click → {parsed.clickToLeadPercent}% CVR → {result.monthlyLeads} lead
              / mese
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Utile sul periodo</p>
              <p
                className={`mt-2 text-2xl font-semibold tracking-tight ${
                  result.netProfitEUR >= 0 ? "text-sky-800" : "text-rose-700"
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
                {result.roiOnTotalInvestmentPercent !== null ? `${result.roiOnTotalInvestmentPercent}%` : "—"}
              </p>
              <p className="mt-2 text-xs text-zinc-500">Su setup + canoni nell&apos;orizzonte scelto</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Payback setup*</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {result.paybackMonths !== null && result.paybackMonths > 0
                  ? `~${result.paybackMonths} mesi`
                  : result.paybackMonths === 0
                    ? "N/D"
                    : "—"}
              </p>
              <p className="mt-2 text-xs text-zinc-500">Solo sulla quota una tantum, netto mensile medio stabile</p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <p className="text-sm font-medium text-zinc-900">Medie mensili (ipotesi stabile)</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Click stimati</dt>
                <dd className="font-medium tabular-nums text-zinc-900">{result.estimatedMonthlyClicks}</dd>
              </div>
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Lead stimati</dt>
                <dd className="font-medium tabular-nums text-zinc-900">{result.monthlyLeads}</dd>
              </div>
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2 sm:col-span-2">
                <dt className="text-zinc-600">Margine dopo canone SEO</dt>
                <dd
                  className={`font-medium tabular-nums ${
                    result.monthlyNetEUR >= 0 ? "text-sky-800" : "text-rose-700"
                  }`}
                >
                  {eur.format(result.monthlyNetEUR)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              *Se il netto mensile è negativo o nullo, il payback sul setup non è calcolabile in questo modello.
              Vari stagioni e competitor influiscono su CTR e lead reali.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void copyReport()}
            className="rounded-full border border-sky-800 bg-sky-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-900"
          >
            Copia report testuale
          </button>
        </div>
      ) : null}
    </section>
  );
}
