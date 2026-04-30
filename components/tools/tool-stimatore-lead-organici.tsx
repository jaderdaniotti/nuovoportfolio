"use client";

import { useCallback, useMemo, useState } from "react";
import {
  clicksFromImpressions,
  computeOrganicLeads,
  formatOrganicLeadReport,
  validateImpressionsCtr,
  validateOrganicLeadEstimatorInput,
  type OrganicLeadEstimatorInputs,
} from "@/lib/organic-lead-estimator";

const SAMPLE_DIRECT = {
  monthlyOrganicClicks: "8400",
  clickToLeadPercent: "2.8",
  valuePerLeadEUR: "95",
};

const SAMPLE_IMPRESSIONS = {
  monthlyImpressions: "185000",
  ctrPercent: "4.5",
  clickToLeadPercent: "2.8",
  valuePerLeadEUR: "95",
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

export function ToolStimatoreLeadOrganici() {
  const [mode, setMode] = useState<"direct" | "impressions">("direct");
  const [monthlyOrganicClicks, setMonthlyOrganicClicks] = useState(SAMPLE_DIRECT.monthlyOrganicClicks);
  const [monthlyImpressions, setMonthlyImpressions] = useState(SAMPLE_IMPRESSIONS.monthlyImpressions);
  const [ctrPercent, setCtrPercent] = useState(SAMPLE_IMPRESSIONS.ctrPercent);
  const [clickToLeadPercent, setClickToLeadPercent] = useState(SAMPLE_DIRECT.clickToLeadPercent);
  const [valuePerLeadEUR, setValuePerLeadEUR] = useState(SAMPLE_DIRECT.valuePerLeadEUR);

  const impressionErr = useMemo(() => {
    if (mode !== "impressions") return null;
    return validateImpressionsCtr(
      Math.round(clampNum(monthlyImpressions, 0)),
      clampNum(ctrPercent, 0),
    );
  }, [mode, monthlyImpressions, ctrPercent]);

  const effectiveClicks = useMemo(() => {
    if (mode === "direct") {
      return clampNum(monthlyOrganicClicks, 0);
    }
    if (impressionErr) return 0;
    return clicksFromImpressions(
      Math.round(clampNum(monthlyImpressions, 0)),
      clampNum(ctrPercent, 0),
    );
  }, [mode, monthlyOrganicClicks, monthlyImpressions, ctrPercent, impressionErr]);

  const parsed: OrganicLeadEstimatorInputs = useMemo(
    () => ({
      monthlyOrganicClicks: mode === "direct" ? clampNum(monthlyOrganicClicks, 0) : effectiveClicks,
      clickToLeadPercent: clampNum(clickToLeadPercent, 0),
      valuePerLeadEUR: clampNum(valuePerLeadEUR, 0),
    }),
    [
      mode,
      monthlyOrganicClicks,
      effectiveClicks,
      clickToLeadPercent,
      valuePerLeadEUR,
    ],
  );

  const validationError = useMemo(() => {
    if (mode === "impressions" && impressionErr) return impressionErr;
    return validateOrganicLeadEstimatorInput(parsed);
  }, [mode, impressionErr, parsed]);

  const result = useMemo(
    () => (validationError ? null : computeOrganicLeads(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    const note =
      mode === "impressions" && !impressionErr
        ? {
            impressions: Math.round(clampNum(monthlyImpressions, 0)),
            ctrPercent: clampNum(ctrPercent, 0),
          }
        : undefined;
    try {
      await navigator.clipboard.writeText(formatOrganicLeadReport(parsed, result, note));
    } catch {
      // ignore
    }
  }, [impressionErr, mode, monthlyImpressions, ctrPercent, parsed, result]);

  const loadExample = () => {
    if (mode === "direct") {
      setMonthlyOrganicClicks(SAMPLE_DIRECT.monthlyOrganicClicks);
      setClickToLeadPercent(SAMPLE_DIRECT.clickToLeadPercent);
      setValuePerLeadEUR(SAMPLE_DIRECT.valuePerLeadEUR);
    } else {
      setMonthlyImpressions(SAMPLE_IMPRESSIONS.monthlyImpressions);
      setCtrPercent(SAMPLE_IMPRESSIONS.ctrPercent);
      setClickToLeadPercent(SAMPLE_IMPRESSIONS.clickToLeadPercent);
      setValuePerLeadEUR(SAMPLE_IMPRESSIONS.valuePerLeadEUR);
    }
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-violet-200/90 bg-linear-to-br from-violet-50/95 via-white to-fuchsia-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Da traffico organico a lead</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Inserisci sessioni o click organici mensili (es. da Analytics) oppure impressioni Search Console con CTR
              medio per stimare i click, poi il tasso di conversione click → lead (modulo moduli, call, trial). Opzionale:
              valore medio lead per una pipeline mensile indicativa. Calcolo locale; numeri da trattare come scenario, non
              previsione.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex rounded-full border border-violet-300/80 bg-white p-1 text-xs">
              <button
                type="button"
                onClick={() => setMode("direct")}
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  mode === "direct"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Ho i click
              </button>
              <button
                type="button"
                onClick={() => setMode("impressions")}
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  mode === "impressions"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Da impressioni
              </button>
            </div>
            <button
              type="button"
              onClick={loadExample}
              className="rounded-full border border-violet-400/80 bg-white px-4 py-2 text-sm text-violet-950/90 transition hover:border-violet-600 hover:text-violet-950"
            >
              Carica esempio
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {mode === "direct" ? (
            <label className="block text-sm font-medium text-zinc-800 sm:col-span-2">
              Sessioni o click organici mensili
              <input
                inputMode="decimal"
                value={monthlyOrganicClicks}
                onChange={(e) => setMonthlyOrganicClicks(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
                placeholder="es. 8400"
              />
            </label>
          ) : (
            <>
              <label className="block text-sm font-medium text-zinc-800">
                Impressioni organiche mensili (es. GSC)
                <input
                  inputMode="numeric"
                  value={monthlyImpressions}
                  onChange={(e) => setMonthlyImpressions(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
                />
              </label>
              <label className="block text-sm font-medium text-zinc-800">
                CTR organico medio (%)
                <input
                  inputMode="decimal"
                  value={ctrPercent}
                  onChange={(e) => setCtrPercent(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
                />
              </label>
              {impressionErr ? (
                <p className="sm:col-span-2 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
                  {impressionErr}
                </p>
              ) : mode === "impressions" ? (
                <p className="sm:col-span-2 text-sm text-zinc-600">
                  Click stimati:{" "}
                  <span className="font-semibold text-violet-900 tabular-nums">
                    {effectiveClicks.toLocaleString("it-IT", { maximumFractionDigits: 2 })}
                  </span>
                </p>
              ) : null}
            </>
          )}

          <label className="block text-sm font-medium text-zinc-800">
            Conversione click → lead (%)
            <input
              inputMode="decimal"
              value={clickToLeadPercent}
              onChange={(e) => setClickToLeadPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Valore medio lead (€, 0 = ignora)
            <input
              inputMode="decimal"
              value={valuePerLeadEUR}
              onChange={(e) => setValuePerLeadEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
            />
          </label>
        </div>

        {validationError && !impressionErr && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            {validationError}
          </p>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-violet-200/80 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-violet-700">Lead / mese</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {result.monthlyLeads}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Fascia CVR ±20%: {result.monthlyLeadsPessimistic} — {result.monthlyLeadsOptimistic}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Lead / settimana</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">{result.weeklyLeads}</p>
              </div>
              <div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Lead / giorno (media)</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">{result.dailyLeads}</p>
              </div>
            </div>
            {result.estimatedMonthlyValueEUR !== null && (
              <div className="rounded-xl border border-fuchsia-200/80 bg-fuchsia-50/50 px-4 py-3 text-sm text-fuchsia-950">
                Pipeline mensile stimata:{" "}
                <strong className="tabular-nums">{eur.format(result.estimatedMonthlyValueEUR)}</strong>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-full border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
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
