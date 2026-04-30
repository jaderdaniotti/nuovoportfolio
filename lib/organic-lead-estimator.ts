/** Stimatore lead da traffico organico — click/sessioni (o impressioni × CTR) e CVR, calcolo nel browser. */

export type OrganicLeadEstimatorInputs = {
  monthlyOrganicClicks: number;
  clickToLeadPercent: number;
  valuePerLeadEUR: number;
};

export type OrganicLeadEstimatorResult = {
  monthlyClicksUsed: number;
  monthlyLeads: number;
  weeklyLeads: number;
  dailyLeads: number;
  estimatedMonthlyValueEUR: number | null;
  monthlyLeadsPessimistic: number;
  monthlyLeadsOptimistic: number;
};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function validateOrganicLeadEstimatorInput(input: OrganicLeadEstimatorInputs): string | null {
  if (
    !Number.isFinite(input.monthlyOrganicClicks) ||
    !Number.isFinite(input.clickToLeadPercent) ||
    !Number.isFinite(input.valuePerLeadEUR)
  ) {
    return "Inserisci solo numeri validi.";
  }
  if (input.monthlyOrganicClicks < 0) {
    return "Click o sessioni organiche non possono essere negative.";
  }
  if (input.clickToLeadPercent < 0 || input.clickToLeadPercent > 100) {
    return "Il tasso di conversione verso lead deve essere tra 0 e 100.";
  }
  if (input.valuePerLeadEUR < 0) {
    return "Il valore medio per lead non può essere negativo.";
  }
  return null;
}

export function computeOrganicLeads(input: OrganicLeadEstimatorInputs): OrganicLeadEstimatorResult {
  const clicks = input.monthlyOrganicClicks;
  const cvr = input.clickToLeadPercent / 100;
  const monthlyLeads = clicks * cvr;
  const pessimisticCvr = Math.max(0, input.clickToLeadPercent * 0.8) / 100;
  const optimisticCvr = Math.min(100, input.clickToLeadPercent * 1.2) / 100;

  const value =
    input.valuePerLeadEUR > 0 ? monthlyLeads * input.valuePerLeadEUR : null;

  return {
    monthlyClicksUsed: round2(clicks),
    monthlyLeads: round1(monthlyLeads),
    weeklyLeads: round1(monthlyLeads / (52 / 12)),
    dailyLeads: round2(monthlyLeads / 30),
    estimatedMonthlyValueEUR: value !== null ? round2(value) : null,
    monthlyLeadsPessimistic: round1(clicks * pessimisticCvr),
    monthlyLeadsOptimistic: round1(clicks * optimisticCvr),
  };
}

export function clicksFromImpressions(impressions: number, ctrPercent: number): number {
  if (!Number.isFinite(impressions) || !Number.isFinite(ctrPercent)) return 0;
  const clampedCtr = Math.max(0, Math.min(100, ctrPercent));
  return (impressions * clampedCtr) / 100;
}

export function validateImpressionsCtr(impressions: number, ctrPercent: number): string | null {
  if (!Number.isFinite(impressions) || !Number.isFinite(ctrPercent)) {
    return "Impressioni e CTR devono essere numeri validi.";
  }
  if (impressions < 0) {
    return "Le impressioni non possono essere negative.";
  }
  if (ctrPercent < 0 || ctrPercent > 100) {
    return "Il CTR deve essere tra 0 e 100.";
  }
  return null;
}

export function formatOrganicLeadReport(
  input: OrganicLeadEstimatorInputs,
  result: OrganicLeadEstimatorResult,
  note?: { impressions?: number; ctrPercent?: number },
): string {
  const it = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
  const lines = [
    "Stimatore lead organici — riepilogo",
    "",
    note?.impressions !== undefined && note?.ctrPercent !== undefined
      ? `Stima click: ${result.monthlyClicksUsed} (da ${note.impressions} impressioni × ${note.ctrPercent}% CTR)`
      : `Click o sessioni organiche mensili usate: ${result.monthlyClicksUsed}`,
    `Conversione click → lead: ${input.clickToLeadPercent}%`,
    "",
    `Lead mensili stimati: ${result.monthlyLeads}`,
    `Fascia prudenziale (−20% / +20% CVR): ${result.monthlyLeadsPessimistic} — ${result.monthlyLeadsOptimistic}`,
    `Lead settimanali (media): ${result.weeklyLeads}`,
    `Lead giornalieri (media 30 gg): ${result.dailyLeads}`,
    "",
    input.valuePerLeadEUR > 0
      ? `Valore pipeline mensile stimato (lead × valore): ${it.format(result.estimatedMonthlyValueEUR ?? 0)}`
      : "Valore pipeline: non calcolato (valore per lead = 0).",
    "",
    "Disclaimer: modello semplificato su dati statici. Stagionalità, campioni ridotti e attribuzione multi-touch non sono modellati.",
  ];
  return lines.join("\n");
}
