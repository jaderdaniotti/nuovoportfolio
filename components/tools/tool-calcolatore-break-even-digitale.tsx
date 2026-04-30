"use client";

import { useCallback, useMemo, useState } from "react";
import {
  computeBreakEvenDigitale,
  formatBreakEvenDigitaleReport,
  validateBreakEvenDigitaleInput,
  type BreakEvenDigitaleInputs,
} from "@/lib/break-even-digitale";

const SAMPLE: BreakEvenDigitaleInputs = {
  upfrontCostEUR: 7200,
  monthlyOperatingEUR: 220,
  horizonMonths: 24,
  monthlySessions: 3800,
  conversionPercent: 1.8,
  valuePerConversionEUR: 95,
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

export function ToolCalcolatoreBreakEvenDigitale() {
  const [upfrontCostEUR, setUpfrontCostEUR] = useState(String(SAMPLE.upfrontCostEUR));
  const [monthlyOperatingEUR, setMonthlyOperatingEUR] = useState(String(SAMPLE.monthlyOperatingEUR));
  const [horizonMonths, setHorizonMonths] = useState(String(SAMPLE.horizonMonths));
  const [monthlySessions, setMonthlySessions] = useState(String(SAMPLE.monthlySessions));
  const [conversionPercent, setConversionPercent] = useState(String(SAMPLE.conversionPercent));
  const [valuePerConversionEUR, setValuePerConversionEUR] = useState(String(SAMPLE.valuePerConversionEUR));

  const parsed: BreakEvenDigitaleInputs = useMemo(
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

  const validationError = useMemo(() => validateBreakEvenDigitaleInput(parsed), [parsed]);
  const result = useMemo(
    () => (validationError ? null : computeBreakEvenDigitale(parsed)),
    [parsed, validationError],
  );

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatBreakEvenDigitaleReport(parsed, result));
    } catch {
      // ignore
    }
  }, [parsed, result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-indigo-200/90 bg-linear-to-br from-indigo-50/90 via-white to-violet-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Soglia minima di conversioni</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Il modello somma i costi operativi mensili a una quota dell&apos;investimento iniziale ripartita
              sull&apos;orizzonte (es. 24 mesi). Dividendo per il valore economico medio che attribuisci a ogni
              conversione (contributo o margine), ottieni quante conversioni servono al mese per coprire quel carico
              fisso. Il confronto con sessioni e CVR stimati mostra se lo scenario è sopra o sotto la soglia.
              Nessun dato lascia il browser.
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
            className="shrink-0 rounded-full border border-indigo-300 bg-white px-4 py-2 text-sm text-indigo-950/85 transition hover:border-indigo-500 hover:text-indigo-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800">
            Investimento progetto digitale (€, una tantum)
            <input
              inputMode="decimal"
              value={upfrontCostEUR}
              onChange={(e) => setUpfrontCostEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Costo operativo mensile (€)
            <input
              inputMode="decimal"
              value={monthlyOperatingEUR}
              onChange={(e) => setMonthlyOperatingEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Mesi per ripartire l&apos;investimento iniziale
            <input
              inputMode="numeric"
              value={horizonMonths}
              onChange={(e) => setHorizonMonths(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Sessioni / visite mensili stimate
            <input
              inputMode="numeric"
              value={monthlySessions}
              onChange={(e) => setMonthlySessions(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Conversion rate medio (%)
            <input
              inputMode="decimal"
              value={conversionPercent}
              onChange={(e) => setConversionPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-800">
            Valore contributivo per conversione (€)
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              Margine o ricavo netto medio che conti per lead / acquisto principale
            </span>
            <input
              inputMode="decimal"
              value={valuePerConversionEUR}
              onChange={(e) => setValuePerConversionEUR(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
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
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              result.needsTrafficButCvrZero
                ? "border-amber-200 bg-amber-50/95 text-amber-950"
                : result.isAboveBreakEven
                  ? "border-emerald-200 bg-emerald-50/90 text-emerald-950"
                  : "border-rose-200 bg-rose-50/90 text-rose-950"
            }`}
          >
            {result.needsTrafficButCvrZero ? (
              <p>
                Con CVR 0% le conversioni stimate sono zero: se il break-even richiede conversioni positive, serve
                una CVR &gt; 0 o rivedere i costi / il valore per conversione.
              </p>
            ) : result.isAboveBreakEven ? (
              <p>
                Con le ipotesi attuali sei <strong>in linea o sopra</strong> il break-even mensile sul carico fisso
                modellato (conversioni stimate {result.estimatedMonthlyConversions} vs soglia{" "}
                {result.breakEvenConversionsPerMonth}).
              </p>
            ) : (
              <p className="text-rose-950">
                Con le ipotesi attuali sei <strong>sotto</strong> il break-even: servono almeno circa{" "}
                {result.breakEvenConversionsPerMonth} conversioni/mese; ne stai stimando{" "}
                {result.estimatedMonthlyConversions} (delta {result.surplusConversionsPerMonth >= 0 ? "+" : ""}
                {result.surplusConversionsPerMonth}).
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Carico fisso mensile</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {eur.format(result.monthlyFixedBurdenEUR)}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Operatività + quota investimento ({eur.format(result.monthlyUpfrontAllocationEUR)}/mese)
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Break-even conversioni</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-indigo-900">
                {result.breakEvenConversionsPerMonth}
                <span className="text-base font-normal text-zinc-600"> /mese</span>
              </p>
              <p className="mt-2 text-xs text-zinc-500">Al valore contributivo impostato</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Sessioni minime (alla CVR)</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                {result.breakEvenSessionsPerMonth !== null ? result.breakEvenSessionsPerMonth : "—"}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                {result.breakEvenSessionsPerMonth !== null
                  ? "Ipotesi: CVR stabile sul traffico"
                  : "Non calcolabile con CVR 0%"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <p className="text-sm font-medium text-zinc-900">Scenario corrente vs soglia</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Conversioni stimate / mese</dt>
                <dd className="font-medium tabular-nums text-zinc-900">{result.estimatedMonthlyConversions}</dd>
              </div>
              <div className="flex justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <dt className="text-zinc-600">Delta vs break-even</dt>
                <dd
                  className={`font-medium tabular-nums ${
                    result.surplusConversionsPerMonth >= 0 ? "text-emerald-800" : "text-rose-700"
                  }`}
                >
                  {result.surplusConversionsPerMonth >= 0 ? "+" : ""}
                  {result.surplusConversionsPerMonth}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-zinc-500">
              Il break-even è calcolato sul contributo medio per conversione, non sul fatturato lordo se non lo
              includi già nel valore unitario.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void copyReport()}
            className="rounded-full border border-indigo-800 bg-indigo-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-900"
          >
            Copia report testuale
          </button>
        </div>
      ) : null}
    </section>
  );
}
