/** Calcolatore break-even digitale — carico fisso mensile vs contributo per conversione. */

export type BreakEvenDigitaleInputs = {
  upfrontCostEUR: number;
  monthlyOperatingEUR: number;
  horizonMonths: number;
  monthlySessions: number;
  conversionPercent: number;
  valuePerConversionEUR: number;
};

export type BreakEvenDigitaleResult = {
  monthlyUpfrontAllocationEUR: number;
  monthlyFixedBurdenEUR: number;
  breakEvenConversionsPerMonth: number;
  breakEvenSessionsPerMonth: number | null;
  estimatedMonthlyConversions: number;
  surplusConversionsPerMonth: number;
  /** Sopra soglia break-even (conversioni stimate ≥ soglia). */
  isAboveBreakEven: boolean;
  /** CVR nullo ma serve un numero positivo di conversioni → traffico teorico illimitato. */
  needsTrafficButCvrZero: boolean;
};

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

function roundConv(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function validateBreakEvenDigitaleInput(input: BreakEvenDigitaleInputs): string | null {
  if (
    !Number.isFinite(input.upfrontCostEUR) ||
    !Number.isFinite(input.monthlyOperatingEUR) ||
    !Number.isFinite(input.horizonMonths) ||
    !Number.isFinite(input.monthlySessions) ||
    !Number.isFinite(input.conversionPercent) ||
    !Number.isFinite(input.valuePerConversionEUR)
  ) {
    return "Inserisci solo numeri validi nei campi.";
  }
  if (input.upfrontCostEUR < 0 || input.monthlyOperatingEUR < 0) {
    return "Investimento e costi mensili non possono essere negativi.";
  }
  if (input.monthlySessions < 0) {
    return "Le sessioni mensili stimate non possono essere negative.";
  }
  if (input.horizonMonths < 1 || input.horizonMonths > 120) {
    return "Usa un orizzonte tra 1 e 120 mesi (riparto dell'investimento iniziale).";
  }
  if (input.conversionPercent < 0 || input.conversionPercent > 100) {
    return "Il tasso di conversione deve essere tra 0 e 100.";
  }
  if (input.valuePerConversionEUR <= 0) {
    return "Il valore (contributo) per conversione deve essere maggiore di zero per calcolare il break-even.";
  }
  return null;
}

export function computeBreakEvenDigitale(input: BreakEvenDigitaleInputs): BreakEvenDigitaleResult {
  const horizon = Math.max(1, Math.floor(input.horizonMonths));
  const monthlyUpfrontAllocation = input.upfrontCostEUR / horizon;
  const monthlyFixedBurden = roundMoney(input.monthlyOperatingEUR + monthlyUpfrontAllocation);
  const conv = input.conversionPercent / 100;

  const breakEvenConversionsPerMonth = roundConv(monthlyFixedBurden / input.valuePerConversionEUR);
  const estimatedMonthlyConversions = roundConv(input.monthlySessions * conv);

  const breakEvenSessionsPerMonth =
    conv > 0 && breakEvenConversionsPerMonth >= 0
      ? roundMoney(breakEvenConversionsPerMonth / conv)
      : null;

  const surplusConversionsPerMonth = roundConv(estimatedMonthlyConversions - breakEvenConversionsPerMonth);
  const needsTrafficButCvrZero = conv === 0 && breakEvenConversionsPerMonth > 0;

  const isAboveBreakEven =
    !needsTrafficButCvrZero && estimatedMonthlyConversions + 1e-9 >= breakEvenConversionsPerMonth;

  return {
    monthlyUpfrontAllocationEUR: roundMoney(monthlyUpfrontAllocation),
    monthlyFixedBurdenEUR: monthlyFixedBurden,
    breakEvenConversionsPerMonth,
    breakEvenSessionsPerMonth,
    estimatedMonthlyConversions,
    surplusConversionsPerMonth,
    isAboveBreakEven,
    needsTrafficButCvrZero,
  };
}

export function formatBreakEvenDigitaleReport(
  input: BreakEvenDigitaleInputs,
  result: BreakEvenDigitaleResult,
): string {
  const it = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
  const lines = [
    "Calcolatore break-even digitale — riepilogo",
    `Orizzonte riparto investimento iniziale: ${input.horizonMonths} mesi`,
    "",
    `Investimento iniziale (una tantum): ${it.format(input.upfrontCostEUR)}`,
    `Quota mensile dell'investimento sul periodo: ${it.format(result.monthlyUpfrontAllocationEUR)}`,
    `Costo operativo mensile: ${it.format(input.monthlyOperatingEUR)}`,
    `Carico fisso mensile totale (operatività + quota investimento): ${it.format(result.monthlyFixedBurdenEUR)}`,
    "",
    `Valore contributivo per conversione: ${it.format(input.valuePerConversionEUR)}`,
    `Conversion rate ipotizzato: ${input.conversionPercent}%`,
    `Sessioni mensili stimate: ${input.monthlySessions}`,
    "",
    `Conversioni mensili minime (break-even): ${result.breakEvenConversionsPerMonth}`,
    result.breakEvenSessionsPerMonth !== null
      ? `Sessioni mensili minime alla CVR impostata: ${result.breakEvenSessionsPerMonth}`
      : "Sessioni minime: non calcolabili con CVR 0% (servirebbe traffico illimitato se servono conversioni > 0).",
    `Conversioni mensili stimate allo scenario attuale: ${result.estimatedMonthlyConversions}`,
    `Delta vs break-even (conversioni/mese): ${result.surplusConversionsPerMonth >= 0 ? "+" : ""}${result.surplusConversionsPerMonth}`,
    "",
    result.needsTrafficButCvrZero
      ? "Stato: scenario incoerente — CVR 0% con costi positivi richiede revisione ipotesi."
      : result.isAboveBreakEven
        ? "Stato: allo scenario attuale sei al di sopra o in linea con il break-even sul carico fisso mensile modellato."
        : "Stato: allo scenario attuale sei sotto la soglia di break-even sul carico fisso mensile modellato.",
    "",
    "Nota: il valore per conversione va inteso come contributo medio (ricavo netto o margine) attribuibile a ogni conversione. È un modello semplificato per scenari nel browser.",
  ];
  return lines.join("\n");
}
