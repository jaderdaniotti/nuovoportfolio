/** Calcolatore valore lead — valore atteso fatturato e contributivo da ticket medio e tasso di chiusura. */

export type LeadValueCalculatorInputs = {
  /** Valore medio ordine / contratto vinto (€). */
  averageOrderValueEUR: number;
  /** Percentuale lead che diventano clienti (0–100). */
  leadToSalePercent: number;
  /** Margine lordo sul fatturato (0–100), opzionale per contributo medio per lead. */
  grossMarginPercent: number | null;
  /** Costo medio per acquisire un lead — CPL/CPA lato marketing (€), opzionale. */
  costPerLeadEUR: number | null;
};

export type LeadValueCalculatorResult = {
  /** Valore atteso fatturato per lead (€). */
  expectedRevenuePerLeadEUR: number;
  /** Contributo marginale atteso per lead (€), se margine indicato. */
  expectedContributionPerLeadEUR: number | null;
  /** Valore netto dopo CPL sul fatturato atteso (€), se CPL indicato. */
  netRevenuePerLeadEUR: number | null;
  /** Contributo netto dopo CPL (€), se margine e CPL indicati. */
  netContributionPerLeadEUR: number | null;
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function validateLeadValueCalculatorInput(input: LeadValueCalculatorInputs): string | null {
  if (!Number.isFinite(input.averageOrderValueEUR) || !Number.isFinite(input.leadToSalePercent)) {
    return "Inserisci solo numeri validi.";
  }
  if (input.averageOrderValueEUR <= 0) {
    return "Il valore medio dell'ordine/contratto deve essere maggiore di zero.";
  }
  if (input.leadToSalePercent < 0 || input.leadToSalePercent > 100) {
    return "Il tasso lead → cliente deve essere tra 0 e 100.";
  }
  if (input.grossMarginPercent !== null) {
    if (!Number.isFinite(input.grossMarginPercent)) {
      return "Il margine lordo deve essere un numero valido.";
    }
    if (input.grossMarginPercent < 0 || input.grossMarginPercent > 100) {
      return "Il margine lordo deve essere tra 0 e 100.";
    }
  }
  if (input.costPerLeadEUR !== null) {
    if (!Number.isFinite(input.costPerLeadEUR)) {
      return "Il costo per lead deve essere un numero valido.";
    }
    if (input.costPerLeadEUR < 0) {
      return "Il costo per lead non può essere negativo.";
    }
  }
  return null;
}

export function computeLeadValue(input: LeadValueCalculatorInputs): LeadValueCalculatorResult {
  const win = input.leadToSalePercent / 100;
  const expectedRevenuePerLeadEUR = round2(input.averageOrderValueEUR * win);

  let expectedContributionPerLeadEUR: number | null = null;
  if (input.grossMarginPercent !== null) {
    expectedContributionPerLeadEUR = round2(
      input.averageOrderValueEUR * (input.grossMarginPercent / 100) * win,
    );
  }

  let netRevenuePerLeadEUR: number | null = null;
  let netContributionPerLeadEUR: number | null = null;
  if (input.costPerLeadEUR !== null) {
    netRevenuePerLeadEUR = round2(expectedRevenuePerLeadEUR - input.costPerLeadEUR);
    if (expectedContributionPerLeadEUR !== null) {
      netContributionPerLeadEUR = round2(expectedContributionPerLeadEUR - input.costPerLeadEUR);
    }
  }

  return {
    expectedRevenuePerLeadEUR,
    expectedContributionPerLeadEUR,
    netRevenuePerLeadEUR,
    netContributionPerLeadEUR,
  };
}

export function formatLeadValueReport(
  input: LeadValueCalculatorInputs,
  result: LeadValueCalculatorResult,
): string {
  const eur = (n: number) =>
    n.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });

  const lines = [
    "Calcolatore valore lead — riepilogo",
    "",
    `Valore medio ordine/contratto: ${eur(input.averageOrderValueEUR)}`,
    `Tasso chiusura lead → cliente: ${input.leadToSalePercent}%`,
    input.grossMarginPercent !== null ? `Margine lordo sul fatturato: ${input.grossMarginPercent}%` : "Margine lordo: non indicato.",
    input.costPerLeadEUR !== null ? `Costo medio per lead (CPL): ${eur(input.costPerLeadEUR)}` : "CPL: non indicato.",
    "",
    `Valore atteso fatturato per lead: ${eur(result.expectedRevenuePerLeadEUR)}`,
    result.expectedContributionPerLeadEUR !== null
      ? `Contributo marginale atteso per lead: ${eur(result.expectedContributionPerLeadEUR)}`
      : "",
    result.netRevenuePerLeadEUR !== null
      ? `Valore netto per lead (fatturato atteso − CPL): ${eur(result.netRevenuePerLeadEUR)}`
      : "",
    result.netContributionPerLeadEUR !== null
      ? `Contributo netto per lead (contributo − CPL): ${eur(result.netContributionPerLeadEUR)}`
      : "",
    "",
    "Disclaimer: modello semplificato (una vincita per lead chiuso); LTV, cicli di vendita e attribuzione multi-touch non sono modellati.",
  ].filter((line) => line !== "");
  return lines.join("\n");
}
