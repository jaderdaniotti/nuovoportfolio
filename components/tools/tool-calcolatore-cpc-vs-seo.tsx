"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeCpcVsSeo,
  formatCpcVsSeoReport,
  validateCpcVsSeoInput,
  type CpcVsSeoInputs,
} from "@/lib/cpc-vs-seo";

const SAMPLE: CpcVsSeoInputs = {
  monthlyAdSpendEUR: 2400,
  cpcEUR: 1.2,
  seoMonthlyCostEUR: 1800,
  monthlyOrganicClicks: 6200,
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

function verdictCopy(v: NonNullable<
  ReturnType<typeof computeCpcVsSeo>
>["verdict"]) {
  switch (v) {
    case "paid-cheaper-lead":
      return {
        tone: "emerald",
        title: "CPA più basso sul paid search",
        body: "Alle ipotesi attuali ogni conversione acquistata costa meno del costo medio per conversione attribuito al traffico SEO (CPA SEO più alto del CPA paid).",
      };
    case "organic-cheaper-lead":
      return {
        tone: "cyan",
        title: "CPA più basso sull’organico",
        body: "Con questi volumi il costo per conversione organica (costo SEO / conversioni organiche) risulta inferiore o uguale al CPA paid mensile sul budget indicato.",
      };
    case "tie":
      return {
        tone: "zinc",
        title: "CPA allineati",
        body: "CPA paid e CPA SEO sono molto vicini allo scenario digitato: migliora i dati o affina CTR/CVR dedicati.",
      };
    case "no-paid":
      return {
        tone: "amber",
        title: "Solo SEO misurabile (CPA)",
        body: "Non hai conversioni simulate da ricerca pagata: confronta comunque CPA SEO oppure aumenta budget o CVR sul paid.",
      };
    case "no-organic":
      return {
        tone: "amber",
        title: "Solo paid con CPA affidabile",
        body: "Gli click organici sono a zero conversioni allo scenario: stimola traffico SEO o aumenta il CVR organico nel modello.",
      };
    default:
      return {
        tone: "zinc",
        title: "Confronto CPA non disponibile",
        body: "Servono conversioni simulate su almeno un canale (CVR × click > 0) per ottenere CPA mensili confrontabili.",
      };
  }
}

export function ToolCalcolatoreCpcVsSeo() {
  const [monthlyAdSpendEUR, setMonthlyAdSpendEUR] = useState(String(SAMPLE.monthlyAdSpendEUR));
  const [cpcEUR, setCpcEUR] = useState(String(SAMPLE.cpcEUR));
  const [seoMonthlyCostEUR, setSeoMonthlyCostEUR] = useState(String(SAMPLE.seoMonthlyCostEUR));
  const [monthlyOrganicClicks, setMonthlyOrganicClicks] = useState(String(SAMPLE.monthlyOrganicClicks));
  const [conversionPercent, setConversionPercent] = useState(String(SAMPLE.conversionPercent));
  const [valuePerConversionEUR, setValuePerConversionEUR] = useState(String(SAMPLE.valuePerConversionEUR));

  const parsed: CpcVsSeoInputs = useMemo(
    () => ({
      monthlyAdSpendEUR: clampNum(monthlyAdSpendEUR, 0),
      cpcEUR: clampNum(cpcEUR, 0),
      seoMonthlyCostEUR: clampNum(seoMonthlyCostEUR, 0),
      monthlyOrganicClicks: Math.round(clampNum(monthlyOrganicClicks, 0)),
      conversionPercent: clampNum(conversionPercent, 0),
      valuePerConversionEUR: clampNum(valuePerConversionEUR, 0),
    }),
    [
      monthlyAdSpendEUR,
      cpcEUR,
      seoMonthlyCostEUR,
      monthlyOrganicClicks,
      conversionPercent,
      valuePerConversionEUR,
    ],
  );

  const validationError = useMemo(() => validateCpcVsSeoInput(parsed), [parsed]);
  const result = useMemo(
    () => (validationError ? null : computeCpcVsSeo(parsed)),
    [parsed, validationError],
  );

  const verdict = result ? verdictCopy(result.verdict) : null;

  const bannerClass =
    verdict?.tone === "emerald"
      ? "border-emerald-200 bg-emerald-50/90 text-emerald-950"
      : verdict?.tone === "cyan"
        ? "border-cyan-200 bg-cyan-50/90 text-cyan-950"
        : verdict?.tone === "amber"
          ? "border-amber-200 bg-amber-50/95 text-amber-950"
          : "border-zinc-200 bg-zinc-50 text-zinc-900";

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatCpcVsSeoReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-cyan-200/90 bg-linear-to-br from-cyan-50/80 via-white to-teal-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Confronto budget e costo per lead</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Stima il <strong>CPA mensile</strong> del canale a pagamento (budget ÷ conversioni da click acquistati) e
              il <strong>CPA SEO</strong> (costo mensile SEO ÷ conversioni da traffico organico), con lo stesso
              conversion rate e lo stesso valore economico attribuito alla conversione. Utile per decidere come
              ripartire il mix o dove scalare dopo un test. Nessun dato esce dal browser.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMonthlyAdSpendEUR(String(SAMPLE.monthlyAdSpendEUR));
              setCpcEUR(String(SAMPLE.cpcEUR));
              setSeoMonthlyCostEUR(String(SAMPLE.seoMonthlyCostEUR));
              setMonthlyOrganicClicks(String(SAMPLE.monthlyOrganicClicks));
              setConversionPercent(String(SAMPLE.conversionPercent));
              setValuePerConversionEUR(String(SAMPLE.valuePerConversionEUR));
            }}
            className="shrink-0 rounded-full border border-cyan-400/80 bg-white px-4 py-2 text-sm text-cyan-950/90 transition hover:border-cyan-600 hover:text-cyan-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Budget annunci / paid search mensile (€)
            <input
              inputMode="decimal"
              value={monthlyAdSpendEUR}
              onChange={(e) => setMonthlyAdSpendEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            CPC medio stimato (€)
            <span className="mt-1 block text-xs font-normal text-zinc-500">Obbligatorio se il budget paid è &gt; 0</span>
            <input
              inputMode="decimal"
              value={cpcEUR}
              onChange={(e) => setCpcEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Costo mensile SEO (€)
            <input
              inputMode="decimal"
              value={seoMonthlyCostEUR}
              onChange={(e) => setSeoMonthlyCostEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Click organici stimati / mese
            <input
              inputMode="numeric"
              value={monthlyOrganicClicks}
              onChange={(e) => setMonthlyOrganicClicks(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Conversion rate (%, uguale per paid e organico)
            <input
              inputMode="decimal"
              value={conversionPercent}
              onChange={(e) => setConversionPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Valore contributivo per conversione (€)
            <span className="mt-1 block text-xs font-normal text-zinc-500">Margine o ricavo netto medio per conversione principale</span>
            <input
              inputMode="decimal"
              value={valuePerConversionEUR}
              onChange={(e) => setValuePerConversionEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
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
      ) : result && verdict ? (
        <div className="space-y-5">
          <div className={`rounded-xl border px-4 py-3 text-sm ${bannerClass}`}>
            <p className="font-semibold text-zinc-900">{verdict.title}</p>
            <p className="mt-2 text-zinc-800">{verdict.body}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-sky-100 bg-linear-to-br from-sky-50/90 to-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Paid search</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-600">Click stimati</dt>
                  <dd className="font-medium tabular-nums text-zinc-900">{result.paidClicksPerMonth}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-600">Conversioni / mese</dt>
                  <dd className="font-medium tabular-nums text-zinc-900">{result.paidConversionsPerMonth}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-sky-100 pt-2">
                  <dt className="text-zinc-600">CPA paid</dt>
                  <dd className="font-semibold tabular-nums text-sky-900">
                    {result.cpaPaidEUR !== null ? eur.format(result.cpaPaidEUR) : "—"}
                  </dd>
                </div>
                {result.marginalPaidCpaEUR !== null ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-xs text-zinc-500">Da CPC÷CVR (marginale)</dt>
                    <dd className="text-xs tabular-nums text-zinc-700">{eur.format(result.marginalPaidCpaEUR)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-600">Contributo netto</dt>
                  <dd
                    className={`font-medium tabular-nums ${
                      result.paidNetContributionEUR >= 0 ? "text-emerald-800" : "text-rose-700"
                    }`}
                  >
                    {eur.format(result.paidNetContributionEUR)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-linear-to-br from-teal-50/80 to-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-900">SEO (organico)</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-600">Conversioni organiche</dt>
                  <dd className="font-medium tabular-nums text-zinc-900">{result.organicConversionsPerMonth}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-teal-100 pt-2">
                  <dt className="text-zinc-600">CPA SEO</dt>
                  <dd className="font-semibold tabular-nums text-teal-900">
                    {result.cpaOrganicEUR !== null ? eur.format(result.cpaOrganicEUR) : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-600">Contributo netto</dt>
                  <dd
                    className={`font-medium tabular-nums ${
                      result.seoNetContributionEUR >= 0 ? "text-emerald-800" : "text-rose-700"
                    }`}
                  >
                    {eur.format(result.seoNetContributionEUR)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-zinc-900">Contributo netto combinato</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Somma dei due canali dopo costi pubblicitari e costo SEO (modello mensile ricorrente).
                </p>
              </div>
              <p
                className={`text-2xl font-semibold tabular-nums ${
                  result.combinedNetContributionEUR >= 0 ? "text-emerald-800" : "text-rose-700"
                }`}
              >
                {eur.format(result.combinedNetContributionEUR)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void copyReport()}
            className="rounded-full border border-teal-800 bg-teal-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-900"
          >
            Copia report testuale
          </button>
        </div>
      ) : null}
    </section>
  );
}
