/** Calcolatore CPC vs SEO — confronto costo per acquisizione e contributo netto mensile stimato. */

export type CpcVsSeoInputs = {
  /** Budget annunci/ricerca pagata mensile (€). */
  monthlyAdSpendEUR: number;
  /** Costo per click medio (€). Serve se il budget pubblicitario è > 0. */
  cpcEUR: number;
  /** Costo mensile SEO (interno o agenzia), €. */
  seoMonthlyCostEUR: number;
  /** Click da ricerca organica stimati per mese. */
  monthlyOrganicClicks: number;
  /** Tasso di conversione condiviso (landing / lead), % sul click. */
  conversionPercent: number;
  /** Margine contributivo medio per conversione (€). */
  valuePerConversionEUR: number;
};

export type CpcVsSeoResult = {
  cvrFraction: number;
  paidClicksPerMonth: number;
  paidConversionsPerMonth: number;
  organicConversionsPerMonth: number;
  paidGrossContributionEUR: number;
  seoGrossContributionEUR: number;
  paidNetContributionEUR: number;
  seoNetContributionEUR: number;
  combinedNetContributionEUR: number;
  /** CPA reale mensile pubblicità = budget / conversioni quando conv > 0. */
  cpaPaidEUR: number | null;
  /** CPA SEO mensile = costo SEO / conversioni organiche quando conv > 0. */
  cpaOrganicEUR: number | null;
  /** CPA marginale teorico paid: CPC × 100 / CVR — utile a confrontare con CPC di listino. */
  marginalPaidCpaEUR: number | null;
  verdict:
    | "paid-cheaper-lead"
    | "organic-cheaper-lead"
    | "tie"
    | "no-paid"
    | "no-organic"
    | "incomparable-no-conversions";
};

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

function roundConv(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function validateCpcVsSeoInput(input: CpcVsSeoInputs): string | null {
  if (
    !Number.isFinite(input.monthlyAdSpendEUR) ||
    !Number.isFinite(input.cpcEUR) ||
    !Number.isFinite(input.seoMonthlyCostEUR) ||
    !Number.isFinite(input.monthlyOrganicClicks) ||
    !Number.isFinite(input.conversionPercent) ||
    !Number.isFinite(input.valuePerConversionEUR)
  ) {
    return "Inserisci solo numeri validi nei campi.";
  }
  if (input.monthlyAdSpendEUR < 0 || input.seoMonthlyCostEUR < 0 || input.monthlyOrganicClicks < 0) {
    return "Budget, costo SEO e click organici non possono essere negativi.";
  }
  if (input.cpcEUR < 0) {
    return "Il CPC non può essere negativo.";
  }
  if (input.monthlyAdSpendEUR > 0 && input.cpcEUR <= 0) {
    return "Con budget pubblicitario > 0 serve un CPC medio maggiore di zero.";
  }
  if (input.conversionPercent < 0 || input.conversionPercent > 100) {
    return "Il conversion rate deve essere tra 0 e 100.";
  }
  if (input.valuePerConversionEUR <= 0) {
    return "Il valore contributivo per conversione deve essere maggiore di zero.";
  }
  return null;
}

export function computeCpcVsSeo(input: CpcVsSeoInputs): CpcVsSeoResult {
  const cvr = input.conversionPercent / 100;
  const paidClicksPerMonth =
    input.monthlyAdSpendEUR > 0 && input.cpcEUR > 0
      ? roundMoney(input.monthlyAdSpendEUR / input.cpcEUR)
      : 0;

  const paidConversionsPerMonth = roundConv(paidClicksPerMonth * cvr);
  const organicConversionsPerMonth = roundConv(input.monthlyOrganicClicks * cvr);

  const paidGrossContributionEUR = roundMoney(paidConversionsPerMonth * input.valuePerConversionEUR);
  const seoGrossContributionEUR = roundMoney(organicConversionsPerMonth * input.valuePerConversionEUR);

  const paidNetContributionEUR = roundMoney(paidGrossContributionEUR - input.monthlyAdSpendEUR);
  const seoNetContributionEUR = roundMoney(seoGrossContributionEUR - input.seoMonthlyCostEUR);
  const combinedNetContributionEUR = roundMoney(paidNetContributionEUR + seoNetContributionEUR);

  const cpaPaidEUR =
    paidConversionsPerMonth > 0 ? roundMoney(input.monthlyAdSpendEUR / paidConversionsPerMonth) : null;
  const cpaOrganicEUR =
    organicConversionsPerMonth > 0 ? roundMoney(input.seoMonthlyCostEUR / organicConversionsPerMonth) : null;

  const marginalPaidCpaEUR =
    cvr > 0 && input.cpcEUR > 0 ? roundMoney((input.cpcEUR * 100) / input.conversionPercent) : null;

  let verdict: CpcVsSeoResult["verdict"] = "incomparable-no-conversions";
  if (cpaPaidEUR !== null && cpaOrganicEUR !== null) {
    if (Math.abs(cpaPaidEUR - cpaOrganicEUR) < 0.005) verdict = "tie";
    else verdict = cpaPaidEUR < cpaOrganicEUR ? "paid-cheaper-lead" : "organic-cheaper-lead";
  } else if (cpaPaidEUR !== null && cpaOrganicEUR === null) {
    verdict = "no-organic";
  } else if (cpaPaidEUR === null && cpaOrganicEUR !== null) {
    verdict = "no-paid";
  } else if (cpaPaidEUR === null && cpaOrganicEUR === null) {
    verdict = "incomparable-no-conversions";
  }

  return {
    cvrFraction: cvr,
    paidClicksPerMonth,
    paidConversionsPerMonth,
    organicConversionsPerMonth,
    paidGrossContributionEUR,
    seoGrossContributionEUR,
    paidNetContributionEUR,
    seoNetContributionEUR,
    combinedNetContributionEUR,
    cpaPaidEUR,
    cpaOrganicEUR,
    marginalPaidCpaEUR,
    verdict,
  };
}

export function formatCpcVsSeoReport(input: CpcVsSeoInputs, result: CpcVsSeoResult): string {
  const it = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
  const lines = [
    "Calcolatore CPC vs SEO — riepilogo",
    "",
    "Ipotesi condivise",
    `Conversion rate (stesso per paid e organico): ${input.conversionPercent}%`,
    `Valore contributivo per conversione: ${it.format(input.valuePerConversionEUR)}`,
    "",
    "Canale paid search",
    `Budget mensile annunci: ${it.format(input.monthlyAdSpendEUR)}`,
    `CPC medio: ${it.format(input.cpcEUR)}`,
    `Click acquistati stimati / mese: ${result.paidClicksPerMonth}`,
    `Conversioni da paid / mese: ${result.paidConversionsPerMonth}`,
    `Contributo lordo stimato (paid): ${it.format(result.paidGrossContributionEUR)}`,
    `Contributo netto (lordo − budget): ${it.format(result.paidNetContributionEUR)}`,
    result.cpaPaidEUR !== null
      ? `CPA paid (budget / conversioni): ${it.format(result.cpaPaidEUR)}`
      : "CPA paid: non calcolabile (nessuna conversione da paid allo scenario).",
    result.marginalPaidCpaEUR !== null
      ? `CPA marginale teorico da CPC e CVR (CPC÷CVR): ${it.format(result.marginalPaidCpaEUR)}`
      : "",
    "",
    "Canale SEO (organico)",
    `Costo mensile SEO: ${it.format(input.seoMonthlyCostEUR)}`,
    `Click organici stimati / mese: ${input.monthlyOrganicClicks}`,
    `Conversioni da organico / mese: ${result.organicConversionsPerMonth}`,
    `Contributo lordo stimato (SEO): ${it.format(result.seoGrossContributionEUR)}`,
    `Contributo netto (lordo − costo SEO): ${it.format(result.seoNetContributionEUR)}`,
    result.cpaOrganicEUR !== null
      ? `CPA SEO (costo SEO / conversioni organiche): ${it.format(result.cpaOrganicEUR)}`
      : "CPA SEO: non calcolabile (nessuna conversione organica allo scenario).",
    "",
    `Contributo netto combinato (paid + SEO): ${it.format(result.combinedNetContributionEUR)}`,
    `Verdetto confronto CPA: ${result.verdict}`,
    "",
    "Nota: modello semplificato nello stesso browser; CVR unico su entrambi i canali. Adatta i click organici e il budget al tuo periodo di riferimento.",
  ];
  return lines.filter((l) => l !== "").join("\n");
}
