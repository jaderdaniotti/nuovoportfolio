/**
 * Soglie allineate alle linee guida Google su Core Web Vitals (LCP, INP, CLS).
 * Fonte di riferimento pubblica: web.dev / Search Central — valori per classificazione good / needs improvement / poor.
 */

export type CwvRating = "good" | "needs-improvement" | "poor";

export type CoreWebVitalsInput = {
  lcpSeconds: number | null;
  inpMs: number | null;
  cls: number | null;
  /** Se true, inpMs proviene da First Input Delay (Lighthouse legacy) invece che INP */
  interactionIsFid?: boolean;
};

export type MetricAnalysis = {
  key: "lcp" | "interaction" | "cls";
  label: string;
  valueLabel: string;
  rating: CwvRating;
  ratingLabelIt: string;
  thresholdsHint: string;
};

export type CoreWebVitalsAnalysisResult = {
  metrics: MetricAnalysis[];
  overallLabelIt: string;
  summaryLines: string[];
};

const RATING_LABEL: Record<CwvRating, string> = {
  good: "Buono (good)",
  "needs-improvement": "Da migliorare",
  poor: "Scarso (poor)",
};

export function rateLcp(seconds: number): CwvRating {
  if (seconds <= 2.5) return "good";
  if (seconds <= 4) return "needs-improvement";
  return "poor";
}

export function rateInp(ms: number): CwvRating {
  if (ms <= 200) return "good";
  if (ms <= 500) return "needs-improvement";
  return "poor";
}

/** FID — metrica legacy sostituita da INP nelle valutazioni attuali */
export function rateFid(ms: number): CwvRating {
  if (ms <= 100) return "good";
  if (ms <= 300) return "needs-improvement";
  return "poor";
}

export function rateCls(value: number): CwvRating {
  if (value <= 0.1) return "good";
  if (value <= 0.25) return "needs-improvement";
  return "poor";
}

/** True se almeno una metrica numerica è presente e validabile */
export function hasCoreWebVitalsNumbers(input: CoreWebVitalsInput): boolean {
  return (
    input.lcpSeconds != null ||
    input.inpMs != null ||
    input.cls != null
  );
}

export function validateCoreWebVitalsInput(input: CoreWebVitalsInput): string | null {
  const has = hasCoreWebVitalsNumbers(input);

  if (!has) {
    return null;
  }

  if (input.lcpSeconds != null) {
    if (!Number.isFinite(input.lcpSeconds) || input.lcpSeconds < 0) {
      return "LCP deve essere un numero di secondi maggiore o uguale a 0.";
    }
  }

  if (input.inpMs != null) {
    if (!Number.isFinite(input.inpMs) || input.inpMs < 0) {
      return "INP/FID deve essere un numero di millisecondi maggiore o uguale a 0.";
    }
  }

  if (input.cls != null) {
    if (!Number.isFinite(input.cls) || input.cls < 0) {
      return "CLS deve essere un numero maggiore o uguale a 0.";
    }
  }

  return null;
}

function overallFromRatings(ratings: CwvRating[]): string {
  if (ratings.length === 0) return "Nessuna metrica valutata.";
  if (ratings.every((r) => r === "good")) return "Tutte le metriche inserite risultano nella fascia “good”.";
  if (ratings.some((r) => r === "poor")) return "Almeno una metrica è in fascia “poor”: priorità alta su UX e ranking potenziale.";
  return "Alcune metriche sono “da migliorare”: interventi mirati possono spostarle in “good”.";
}

export function analyzeCoreWebVitalsBase(input: CoreWebVitalsInput): CoreWebVitalsAnalysisResult {
  const metrics: MetricAnalysis[] = [];
  const ratings: CwvRating[] = [];

  if (input.lcpSeconds != null) {
    const r = rateLcp(input.lcpSeconds);
    ratings.push(r);
    metrics.push({
      key: "lcp",
      label: "LCP (Largest Contentful Paint)",
      valueLabel: `${input.lcpSeconds.toFixed(2)} s`,
      rating: r,
      ratingLabelIt: RATING_LABEL[r],
      thresholdsHint: "Good ≤ 2,5 s · Da migliorare ≤ 4 s · Scarso oltre 4 s",
    });
  }

  if (input.inpMs != null) {
    const useFid = input.interactionIsFid === true;
    const r = useFid ? rateFid(input.inpMs) : rateInp(input.inpMs);
    ratings.push(r);
    metrics.push({
      key: "interaction",
      label: useFid ? "FID (First Input Delay, legacy)" : "INP (Interaction to Next Paint)",
      valueLabel: `${Math.round(input.inpMs)} ms`,
      rating: r,
      ratingLabelIt: RATING_LABEL[r],
      thresholdsHint: useFid
        ? "FID: good ≤ 100 ms · da migliorare ≤ 300 ms · scarso oltre (metrica legacy)"
        : "INP: good ≤ 200 ms · da migliorare ≤ 500 ms · scarso oltre",
    });
  }

  if (input.cls != null) {
    const r = rateCls(input.cls);
    ratings.push(r);
    metrics.push({
      key: "cls",
      label: "CLS (Cumulative Layout Shift)",
      valueLabel: input.cls.toFixed(3),
      rating: r,
      ratingLabelIt: RATING_LABEL[r],
      thresholdsHint: "Good ≤ 0,10 · Da migliorare ≤ 0,25 · Scarso oltre",
    });
  }

  const overallLabelIt = overallFromRatings(ratings);

  const summaryLines = [
    "Core Web Vitals — valutazione soglie (laboratorio o field, a seconda della fonte dei numeri)",
    "",
    ...metrics.map(
      (m) =>
        `- ${m.label}: ${m.valueLabel} → ${m.ratingLabelIt}`,
    ),
    "",
    `Sintesi: ${overallLabelIt}`,
    "",
    "Nota: questo tool non esegue misure sul sito; confronta valori che copi da PageSpeed Insights, CrUX o Lighthouse.",
  ];

  return { metrics, overallLabelIt, summaryLines };
}

type LighthouseAudit = { numericValue?: number };

function auditMs(root: Record<string, unknown>, id: string): number | null {
  const audits = root["audits"] as Record<string, LighthouseAudit> | undefined;
  const v = audits?.[id]?.numericValue;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * Estrae LCP (s), INP o FID (ms), CLS da un oggetto report Lighthouse (JSON incollato).
 */
export function extractFromLighthouseRoot(parsed: unknown): Partial<CoreWebVitalsInput> & { source: string } {
  if (!parsed || typeof parsed !== "object") {
    return { source: "parse-error" };
  }

  const root = parsed as Record<string, unknown>;
  const out: Partial<CoreWebVitalsInput> & { source: string } = { source: "lighthouse" };

  const lcpMs = auditMs(root, "largest-contentful-paint");
  if (lcpMs != null) {
    out.lcpSeconds = lcpMs / 1000;
  }

  const cls = auditMs(root, "cumulative-layout-shift");
  if (cls != null) {
    out.cls = cls;
  }

  const inp =
    auditMs(root, "interaction-to-next-paint") ??
    auditMs(root, "experimental-interaction-to-next-paint");

  if (inp != null) {
    out.inpMs = inp;
    out.interactionIsFid = false;
  } else {
    const fid = auditMs(root, "max-potential-fid") ?? auditMs(root, "first-input-delay");
    if (fid != null) {
      out.inpMs = fid;
      out.interactionIsFid = true;
    }
  }

  return out;
}

export function tryParseLighthouseJson(
  text: string,
): { ok: true; data: Partial<CoreWebVitalsInput> } | { ok: false; error: string } {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, error: "JSON vuoto." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed) as unknown;
  } catch {
    return { ok: false, error: "JSON non valido: verifica parentesi e virgole." };
  }

  const extracted = extractFromLighthouseRoot(parsed);
  if (extracted.source === "parse-error") {
    return { ok: false, error: "Struttura report non riconosciuta." };
  }

  const merged: Partial<CoreWebVitalsInput> = {};
  if (extracted.lcpSeconds != null) merged.lcpSeconds = extracted.lcpSeconds;
  if (extracted.inpMs != null) merged.inpMs = extracted.inpMs;
  if (extracted.cls != null) merged.cls = extracted.cls;
  if (extracted.interactionIsFid != null) merged.interactionIsFid = extracted.interactionIsFid;

  if (
    merged.lcpSeconds == null &&
    merged.inpMs == null &&
    merged.cls == null
  ) {
    return {
      ok: false,
      error:
        "Nessuna metrica LCP/INP/CLS trovata negli audit Lighthouse. Usa l’export JSON completo del report.",
    };
  }

  return { ok: true, data: merged };
}
