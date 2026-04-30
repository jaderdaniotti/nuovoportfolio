/** Calcolatore conversion rate obiettivo — CVR richiesto per raggiungere un target di lead con traffico noto. */

export type ConversionRateObiettivoInputs = {
  /** Sessioni o click mensili disponibili sul funnel (es. landing organiche o ads). */
  monthlySessionsOrClicks: number;
  /** Lead (o conversioni macro-obiettivo) desiderati al mese. */
  targetLeadsPerMonth: number;
  /** CVR attuale stimato (%), opzionale per gap e traffico teorico necessario. */
  currentConversionPercent: number | null;
};

export type ConversionRateObiettivoFeasibility = "ok" | "over-100";

export type ConversionRateObiettivoResult = {
  /** CVR richiesto sul traffico indicato (%). */
  requiredConversionPercent: number;
  requiredConversionFraction: number;
  feasibility: ConversionRateObiettivoFeasibility;
  /** Differenza punti percentuali vs CVR attuale (solo se current valorizzato). */
  gapVersusCurrentPercent: number | null;
  /** Sessioni mensili necessarie allo CVR attuale per coprire il target (null se CVR attuale ≤ 0 o non impostato). */
  sessionsNeededAtCurrentCvr: number | null;
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function validateConversionRateObiettivoInput(input: ConversionRateObiettivoInputs): string | null {
  if (
    !Number.isFinite(input.monthlySessionsOrClicks) ||
    !Number.isFinite(input.targetLeadsPerMonth)
  ) {
    return "Inserisci solo numeri validi.";
  }
  if (input.monthlySessionsOrClicks <= 0) {
    return "Sessioni o click mensili devono essere maggiori di zero.";
  }
  if (input.targetLeadsPerMonth < 0) {
    return "Il target lead non può essere negativo.";
  }
  if (input.currentConversionPercent !== null) {
    if (!Number.isFinite(input.currentConversionPercent)) {
      return "Il CVR attuale deve essere un numero valido.";
    }
    if (input.currentConversionPercent < 0 || input.currentConversionPercent > 100) {
      return "Il CVR attuale deve essere tra 0 e 100.";
    }
  }
  return null;
}

export function computeConversionRateObiettivo(
  input: ConversionRateObiettivoInputs,
): ConversionRateObiettivoResult {
  const sessions = input.monthlySessionsOrClicks;
  const target = input.targetLeadsPerMonth;
  const frac = sessions > 0 ? target / sessions : 0;
  const requiredPercent = round3(frac * 100);
  const feasibility: ConversionRateObiettivoFeasibility = requiredPercent > 100 ? "over-100" : "ok";

  let gapVersusCurrentPercent: number | null = null;
  let sessionsNeededAtCurrentCvr: number | null = null;

  if (input.currentConversionPercent !== null && input.currentConversionPercent > 0 && target > 0) {
    gapVersusCurrentPercent = round2(requiredPercent - input.currentConversionPercent);
    sessionsNeededAtCurrentCvr = round2(target / (input.currentConversionPercent / 100));
  } else if (input.currentConversionPercent !== null && input.currentConversionPercent === 0 && target > 0) {
    gapVersusCurrentPercent = round2(requiredPercent);
    sessionsNeededAtCurrentCvr = null;
  }

  return {
    requiredConversionPercent: requiredPercent,
    requiredConversionFraction: frac,
    feasibility,
    gapVersusCurrentPercent,
    sessionsNeededAtCurrentCvr,
  };
}

export function formatConversionRateObiettivoReport(
  input: ConversionRateObiettivoInputs,
  result: ConversionRateObiettivoResult,
): string {
  const lines = [
    "Calcolatore conversion rate obiettivo — riepilogo",
    "",
    `Sessioni o click mensili (base funnel): ${input.monthlySessionsOrClicks}`,
    `Target lead / conversioni macro al mese: ${input.targetLeadsPerMonth}`,
    "",
    `CVR richiesto sul traffico indicato: ${result.requiredConversionPercent}%`,
    result.feasibility === "over-100"
      ? "Attenzione: CVR teorico > 100% — il target supera il traffico base se al massimo una conversione per sessione/click."
      : "Scenario numericamente coerente con al più una conversione per sessione.",
    "",
    input.currentConversionPercent !== null
      ? `CVR attuale stimato: ${input.currentConversionPercent}%`
      : "CVR attuale: non indicato.",
    result.gapVersusCurrentPercent !== null
      ? `Gap vs CVR attuale (pt. %): ${result.gapVersusCurrentPercent >= 0 ? "+" : ""}${result.gapVersusCurrentPercent}`
      : "",
    result.sessionsNeededAtCurrentCvr !== null
      ? `Sessioni mensili necessarie allo CVR attuale per il target: ${result.sessionsNeededAtCurrentCvr}`
      : "",
    "",
    "Disclaimer: modello a una conversione per sessione/click; funnel multi-step e attribuzione non sono modellati.",
  ].filter((line) => line !== "");
  return lines.join("\n");
}
