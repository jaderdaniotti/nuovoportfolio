export type CanonicalSeverity = "error" | "warning" | "info";

export type CanonicalFinding = {
  severity: CanonicalSeverity;
  message: string;
};

export type CanonicalEntry = {
  index: number;
  hrefRaw: string;
  /** Risoluzione con base opzionale (URL pagina) */
  resolved: string | null;
};

export type CanonicalAnalysis = {
  entries: CanonicalEntry[];
  uniqueResolved: string[];
  findings: CanonicalFinding[];
  hasErrors: boolean;
  hasWarnings: boolean;
};

function relIsCanonical(relAttr: string | null): boolean {
  if (!relAttr?.trim()) return false;
  return relAttr
    .trim()
    .split(/\s+/)
    .some((t) => t.toLowerCase() === "canonical");
}

export function normalizeResolvedHref(hrefRaw: string, baseUrl?: string): string | null {
  const h = hrefRaw.trim();
  if (!h) return null;
  try {
    if (baseUrl?.trim()) {
      return new URL(h, baseUrl.trim()).href;
    }
    return new URL(h).href;
  } catch {
    return null;
  }
}

/** Analisi su un documento HTML già parsato (browser / DOMParser). */
export function analyzeCanonicalDocument(doc: Document, pagePublicUrl?: string): CanonicalAnalysis {
  const findings: CanonicalFinding[] = [];
  const entries: CanonicalEntry[] = [];

  let i = 0;
  for (const el of doc.querySelectorAll("link")) {
    if (!(el instanceof HTMLLinkElement)) continue;
    if (!relIsCanonical(el.getAttribute("rel"))) continue;
    const hrefRaw = el.getAttribute("href") ?? "";
    const resolved = normalizeResolvedHref(hrefRaw, pagePublicUrl);
    entries.push({ index: ++i, hrefRaw, resolved });
  }

  const resolvedList = entries.map((e) => e.resolved).filter((u): u is string => Boolean(u));
  const uniqueResolved = [...new Set(resolvedList)];

  if (entries.length === 0) {
    findings.push({
      severity: "error",
      message: "Nessun tag <link rel=\"canonical\"> trovato nell’HTML incollato.",
    });
  }

  for (const e of entries) {
    if (!e.hrefRaw.trim()) {
      findings.push({
        severity: "error",
        message: `Tag canonical #${e.index}: attributo href assente o vuoto.`,
      });
      continue;
    }
    if (!e.resolved) {
      const hint =
        !pagePublicUrl?.trim() && !/^https?:\/\//i.test(e.hrefRaw.trim())
          ? " Usa un href assoluto (https://…) oppure compila l’URL pubblica della pagina per risolvere path relativi."
          : "";
      findings.push({
        severity: "error",
        message: `Tag canonical #${e.index}: href non risolvibile (“${truncate(e.hrefRaw, 80)}”).${hint}`,
      });
    }
  }

  if (uniqueResolved.length > 1) {
    findings.push({
      severity: "error",
      message: `Trovati ${uniqueResolved.length} canonical diversi dopo normalizzazione: rischio di segnali contraddittori per i motori di ricerca.`,
    });
  }

  const duplicateSameUrl =
    resolvedList.length > 1 &&
    uniqueResolved.length === 1 &&
    entries.filter((e) => e.resolved).length > 1;
  if (duplicateSameUrl) {
    findings.push({
      severity: "warning",
      message: "Più tag <link rel=\"canonical\"> ripetono lo stesso URL: meglio un solo tag in <head>.",
    });
  }

  if (pagePublicUrl?.trim() && uniqueResolved.length === 1) {
    const pageNorm = normalizeResolvedHref(pagePublicUrl.trim());
    const canon = uniqueResolved[0];
    if (pageNorm && canon && pageNorm !== canon) {
      findings.push({
        severity: "warning",
        message: `L’URL pubblica inserita (“${truncate(pageNorm, 64)}”) non coincide con il canonical dichiarato (“${truncate(canon, 64)}”).`,
      });
    }
  }

  const hasErrors = findings.some((f) => f.severity === "error");
  const hasWarnings = findings.some((f) => f.severity === "warning");

  if (!hasErrors && !hasWarnings && entries.length === 1 && uniqueResolved.length === 1) {
    findings.push({
      severity: "info",
      message: "Un canonical unico e valido: configurazione ordinaria per la maggior parte dei casi.",
    });
  }

  return {
    entries,
    uniqueResolved,
    findings,
    hasErrors,
    hasWarnings,
  };
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}
