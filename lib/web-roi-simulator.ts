/** Simulatore ROI progetti web — calcolo locale nel browser. */

export type WebRoiInputs = {
  upfrontCostEUR: number;
  monthlyOperatingEUR: number;
  horizonMonths: number;
  monthlySessions: number;
  conversionPercent: number;
  valuePerConversionEUR: number;
};

export type WebRoiResult = {
  totalCostEUR: number;
  totalRevenueEUR: number;
  netProfitEUR: number;
  roiOnTotalInvestmentPercent: number | null;
  monthlyGrossEUR: number;
  monthlyNetEUR: number;
  monthlyLeads: number;
  paybackMonths: number | null;
};

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Messaggio errore UX o null se OK. */
export function validateWebRoiInput(input: WebRoiInputs): string | null {
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
    return "Le sessioni mensili stimare non possono essere negative.";
  }
  if (input.horizonMonths < 1 || input.horizonMonths > 120) {
    return "Usa un orizzonte tra 1 e 120 mesi (10 anni).";
  }
  if (input.conversionPercent < 0 || input.conversionPercent > 100) {
    return "Il tasso di conversione deve essere tra 0 e 100.";
  }
  if (input.valuePerConversionEUR < 0) {
    return "Il valore medio per conversione non può essere negativo.";
  }
  return null;
}

export function computeWebRoi(input: WebRoiInputs): WebRoiResult {
  const horizon = Math.floor(input.horizonMonths);
  const conv = input.conversionPercent / 100;
  const monthlyLeads = input.monthlySessions * conv;
  const monthlyGross = monthlyLeads * input.valuePerConversionEUR;
  const monthlyNet = monthlyGross - input.monthlyOperatingEUR;

  const totalCost =
    roundMoney(input.upfrontCostEUR + input.monthlyOperatingEUR * horizon);
  const totalRevenue = roundMoney(monthlyGross * horizon);
  const netProfit = roundMoney(totalRevenue - totalCost);

  const roiOnTotalInvestmentPercent =
    totalCost > 0 ? roundMoney((netProfit / totalCost) * 100) : null;

  let paybackMonths: number | null = null;
  if (monthlyNet > 0 && input.upfrontCostEUR > 0) {
    paybackMonths = roundMoney(input.upfrontCostEUR / monthlyNet);
  } else if (input.upfrontCostEUR <= 0) {
    paybackMonths = 0;
  }

  return {
    totalCostEUR: totalCost,
    totalRevenueEUR: totalRevenue,
    netProfitEUR: netProfit,
    roiOnTotalInvestmentPercent,
    monthlyGrossEUR: roundMoney(monthlyGross),
    monthlyNetEUR: roundMoney(monthlyNet),
    monthlyLeads: roundMoney(monthlyLeads * 1000) / 1000,
    paybackMonths,
  };
}

export function formatWebRoiReport(input: WebRoiInputs, result: WebRoiResult): string {
  const it = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
  const lines = [
    "Simulatore ROI sito web — riepilogo",
    `Orizzonte: ${input.horizonMonths} mesi`,
    "",
    `Investimento iniziale: ${it.format(input.upfrontCostEUR)}`,
    `Costo operativo mensile: ${it.format(input.monthlyOperatingEUR)}`,
    `Totale costi (upfront + operatività): ${it.format(result.totalCostEUR)}`,
    "",
    `Sessioni mensili ipotizzate: ${input.monthlySessions}`,
    `Conversion rate: ${input.conversionPercent}%`,
    `Valore medio per conversione: ${it.format(input.valuePerConversionEUR)}`,
    `Lead mensili stimati: ${result.monthlyLeads}`,
    "",
    `Ricavi totali sul periodo: ${it.format(result.totalRevenueEUR)}`,
    `Utile netto stimato: ${it.format(result.netProfitEUR)}`,
    result.roiOnTotalInvestmentPercent !== null
      ? `ROI su investimento totale: ${result.roiOnTotalInvestmentPercent}%`
      : "ROI: n/d (costo totale nullo)",
    result.paybackMonths !== null && result.paybackMonths > 0
      ? `Rientro stimato dell’investimento iniziale: ~${result.paybackMonths} mesi (con netto mensile costante)`
      : result.paybackMonths === 0
        ? "Niente investimento iniziale dichiarato."
        : "Payback sul costo upfront: non stimabile (margine mensile insufficiente).",
    "",
    "Disclaimer: è una proiezione semplificata; volumi di traffico e CVR sono variabili.",
  ];
  return lines.join("\n");
}
