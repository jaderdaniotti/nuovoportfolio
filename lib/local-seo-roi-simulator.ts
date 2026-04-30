/** Simulatore ROI SEO locale — funnel ricerche/impressioni → click → lead, calcolo nel browser. */

import { computeWebRoi, type WebRoiInputs, type WebRoiResult } from "@/lib/web-roi-simulator";

export type LocalSeoRoiInputs = {
  upfrontLocalSeoEUR: number;
  monthlySeoFeeEUR: number;
  horizonMonths: number;
  monthlyLocalImpressions: number;
  ctrToSitePercent: number;
  clickToLeadPercent: number;
  valuePerLeadEUR: number;
};

export type LocalSeoRoiResult = WebRoiResult & {
  estimatedMonthlyClicks: number;
};

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

export function validateLocalSeoRoiInput(input: LocalSeoRoiInputs): string | null {
  if (
    !Number.isFinite(input.upfrontLocalSeoEUR) ||
    !Number.isFinite(input.monthlySeoFeeEUR) ||
    !Number.isFinite(input.horizonMonths) ||
    !Number.isFinite(input.monthlyLocalImpressions) ||
    !Number.isFinite(input.ctrToSitePercent) ||
    !Number.isFinite(input.clickToLeadPercent) ||
    !Number.isFinite(input.valuePerLeadEUR)
  ) {
    return "Inserisci solo numeri validi nei campi.";
  }
  if (input.upfrontLocalSeoEUR < 0 || input.monthlySeoFeeEUR < 0) {
    return "Setup e canone SEO mensile non possono essere negativi.";
  }
  if (input.monthlyLocalImpressions < 0) {
    return "Le impressioni/ricerche mensili stimate non possono essere negative.";
  }
  if (input.horizonMonths < 1 || input.horizonMonths > 120) {
    return "Usa un orizzonte tra 1 e 120 mesi (10 anni).";
  }
  if (input.ctrToSitePercent < 0 || input.ctrToSitePercent > 100) {
    return "Il CTR verso il sito o la scheda deve essere tra 0 e 100.";
  }
  if (input.clickToLeadPercent < 0 || input.clickToLeadPercent > 100) {
    return "Il tasso click → lead deve essere tra 0 e 100.";
  }
  if (input.valuePerLeadEUR < 0) {
    return "Il valore medio per lead non può essere negativo.";
  }
  return null;
}

function toWebRoiInputs(input: LocalSeoRoiInputs): WebRoiInputs {
  const monthlyClicks = input.monthlyLocalImpressions * (input.ctrToSitePercent / 100);
  return {
    upfrontCostEUR: input.upfrontLocalSeoEUR,
    monthlyOperatingEUR: input.monthlySeoFeeEUR,
    horizonMonths: input.horizonMonths,
    monthlySessions: roundMoney(monthlyClicks),
    conversionPercent: input.clickToLeadPercent,
    valuePerConversionEUR: input.valuePerLeadEUR,
  };
}

export function computeLocalSeoRoi(input: LocalSeoRoiInputs): LocalSeoRoiResult {
  const monthlyClicks = input.monthlyLocalImpressions * (input.ctrToSitePercent / 100);
  const base = computeWebRoi(toWebRoiInputs(input));
  return {
    ...base,
    estimatedMonthlyClicks: roundMoney(monthlyClicks * 1000) / 1000,
  };
}

export function formatLocalSeoRoiReport(input: LocalSeoRoiInputs, result: LocalSeoRoiResult): string {
  const it = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
  const lines = [
    "Simulatore ROI SEO locale — riepilogo",
    `Orizzonte: ${input.horizonMonths} mesi`,
    "",
    `Setup / consulenza SEO locale (una tantum): ${it.format(input.upfrontLocalSeoEUR)}`,
    `Canone SEO locale mensile: ${it.format(input.monthlySeoFeeEUR)}`,
    `Totale costi (setup + canoni): ${it.format(result.totalCostEUR)}`,
    "",
    `Impressioni o ricerche locali mensili stimate: ${input.monthlyLocalImpressions}`,
    `CTR stimato verso sito/scheda: ${input.ctrToSitePercent}%`,
    `Click mensili stimati: ${result.estimatedMonthlyClicks}`,
    `Conversione click → lead: ${input.clickToLeadPercent}%`,
    `Valore medio per lead: ${it.format(input.valuePerLeadEUR)}`,
    `Lead mensili stimati: ${result.monthlyLeads}`,
    "",
    `Ricavi totali sul periodo: ${it.format(result.totalRevenueEUR)}`,
    `Utile netto stimato: ${it.format(result.netProfitEUR)}`,
    result.roiOnTotalInvestmentPercent !== null
      ? `ROI su investimento totale: ${result.roiOnTotalInvestmentPercent}%`
      : "ROI: n/d (costo totale nullo)",
    result.paybackMonths !== null && result.paybackMonths > 0
      ? `Rientro stimato del setup: ~${result.paybackMonths} mesi (con netto mensile costante)`
      : result.paybackMonths === 0
        ? "Niente setup iniziale dichiarato."
        : "Payback sul setup: non stimabile (margine mensile insufficiente).",
    "",
    "Disclaimer: modello semplificato; volumi locali, posizioni in mappa e SERP e CVR cambiano nel tempo.",
  ];
  return lines.join("\n");
}
