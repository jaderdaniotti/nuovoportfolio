"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeLeadValue,
  formatLeadValueReport,
  validateLeadValueCalculatorInput,
  type LeadValueCalculatorInputs,
} from "@/lib/lead-value-calculator";

const SAMPLE = {
  averageOrderValueEUR: 4800,
  leadToSalePercent: 12,
  grossMarginPercent: 35,
  costPerLeadEUR: 45,
} as const;

function clampNum(raw: string, fallback: number): number {
  const n = Number.parseFloat(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
}

function resolveOptionalNumber(
  raw: string,
): { kind: "empty" } | { kind: "invalid" } | { kind: "value"; value: number } {
  const t = raw.trim();
  if (t === "") return { kind: "empty" };
  const n = clampNum(raw, NaN);
  if (!Number.isFinite(n)) return { kind: "invalid" };
  return { kind: "value", value: n };
}

function formatEur(n: number): string {
  return n.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
}

export function ToolCalcolatoreValoreLead() {
  const [averageOrderValueEUR, setAverageOrderValueEUR] = useState(String(SAMPLE.averageOrderValueEUR));
  const [leadToSalePercent, setLeadToSalePercent] = useState(String(SAMPLE.leadToSalePercent));
  const [grossMarginPercentRaw, setGrossMarginPercentRaw] = useState(String(SAMPLE.grossMarginPercent));
  const [costPerLeadRaw, setCostPerLeadRaw] = useState(String(SAMPLE.costPerLeadEUR));

  const optionalMargin = useMemo(() => resolveOptionalNumber(grossMarginPercentRaw), [grossMarginPercentRaw]);
  const optionalCpl = useMemo(() => resolveOptionalNumber(costPerLeadRaw), [costPerLeadRaw]);

  const parsed: LeadValueCalculatorInputs = useMemo(
    () => ({
      averageOrderValueEUR: clampNum(averageOrderValueEUR, 0),
      leadToSalePercent: clampNum(leadToSalePercent, 0),
      grossMarginPercent: optionalMargin.kind === "value" ? optionalMargin.value : null,
      costPerLeadEUR: optionalCpl.kind === "value" ? optionalCpl.value : null,
    }),
    [averageOrderValueEUR, leadToSalePercent, optionalMargin, optionalCpl],
  );

  const validationError = useMemo(() => {
    if (optionalMargin.kind === "invalid") {
      return "Il margine lordo deve essere un numero valido.";
    }
    if (optionalCpl.kind === "invalid") {
      return "Il costo per lead deve essere un numero valido.";
    }
    return validateLeadValueCalculatorInput(parsed);
  }, [optionalMargin, optionalCpl, parsed]);

  const result = useMemo(
    () => (validationError ? null : computeLeadValue(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatLeadValueReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  const loadExample = () => {
    setAverageOrderValueEUR(String(SAMPLE.averageOrderValueEUR));
    setLeadToSalePercent(String(SAMPLE.leadToSalePercent));
    setGrossMarginPercentRaw(String(SAMPLE.grossMarginPercent));
    setCostPerLeadRaw(String(SAMPLE.costPerLeadEUR));
  };

  const clearOptional = () => {
    setGrossMarginPercentRaw("");
    setCostPerLeadRaw("");
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-violet-200/90 bg-linear-to-br from-violet-50/95 via-white to-fuchsia-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Quanto vale un lead in media?</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Combina <strong>ticket medio</strong> (ordine o contratto vinto) e <strong>tasso di chiusura</strong> lead →
              cliente per ottenere il valore atteso di fatturato per lead. Aggiungi opzionalmente{" "}
              <strong>margine lordo</strong> (contributo) e <strong>CPL</strong> per stimare utilità netta rispetto al
              costo di acquisizione. Calcolo locale nel browser.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadExample}
              className="rounded-full border border-violet-400/80 bg-white px-4 py-2 text-sm text-violet-950/90 transition hover:border-violet-600 hover:text-violet-950"
            >
              Carica esempio
            </button>
            <button
              type="button"
              onClick={clearOptional}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400"
            >
              Togli margine / CPL
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Valore medio ordine o contratto vinto (€)
            <input
              inputMode="decimal"
              value={averageOrderValueEUR}
              onChange={(e) => setAverageOrderValueEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
              placeholder="es. 4800"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Tasso chiusura lead → cliente (%)
            <input
              inputMode="decimal"
              value={leadToSalePercent}
              onChange={(e) => setLeadToSalePercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
              placeholder="es. 12"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Margine lordo sul fatturato (%, opzionale)
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              Lascia vuoto per mostrare solo fatturato atteso per lead.
            </span>
            <input
              inputMode="decimal"
              value={grossMarginPercentRaw}
              onChange={(e) => setGrossMarginPercentRaw(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
              placeholder="es. 35"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Costo medio per lead — CPL (€, opzionale)
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              Quanto spendi in media per generare un lead qualificato.
            </span>
            <input
              inputMode="decimal"
              value={costPerLeadRaw}
              onChange={(e) => setCostPerLeadRaw(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
              placeholder="es. 45"
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
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-violet-200/90 bg-white/95 p-4 shadow-sm sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-violet-800">
                  Valore atteso fatturato / lead
                </p>
                <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {formatEur(result.expectedRevenuePerLeadEUR)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Formula: ticket medio × (tasso chiusura ÷ 100).
                </p>
              </div>

              {result.expectedContributionPerLeadEUR !== null && (
                <div className="rounded-xl border border-fuchsia-200/80 bg-white/95 p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-fuchsia-900">Contributo atteso / lead</p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900">
                    {formatEur(result.expectedContributionPerLeadEUR)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">Ticket × margine × tasso chiusura.</p>
                </div>
              )}

              {result.netRevenuePerLeadEUR !== null && (
                <div className="rounded-xl border border-zinc-200/90 bg-white/95 p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Netto su fatturato (dopo CPL)</p>
                  <p
                    className={`mt-2 text-2xl font-semibold tabular-nums ${
                      result.netRevenuePerLeadEUR < 0 ? "text-red-700" : "text-zinc-900"
                    }`}
                  >
                    {formatEur(result.netRevenuePerLeadEUR)}
                  </p>
                  {result.netRevenuePerLeadEUR < 0 ? (
                    <p className="mt-1 text-xs text-red-700">Il CPL supera il fatturato atteso per lead.</p>
                  ) : (
                    <p className="mt-1 text-xs text-zinc-600">Fatturato atteso − CPL.</p>
                  )}
                </div>
              )}

              {result.netContributionPerLeadEUR !== null && (
                <div className="rounded-xl border border-zinc-200/90 bg-white/95 p-4 shadow-sm sm:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Contributo netto (dopo CPL)</p>
                  <p
                    className={`mt-2 text-2xl font-semibold tabular-nums ${
                      result.netContributionPerLeadEUR < 0 ? "text-red-700" : "text-zinc-900"
                    }`}
                  >
                    {formatEur(result.netContributionPerLeadEUR)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">Contributo marginale atteso − CPL.</p>
                </div>
              )}
            </div>

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
