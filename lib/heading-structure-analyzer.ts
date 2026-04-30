export type HeadingSeverity = "error" | "warning" | "info";

export type HeadingEntry = {
  index: number;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export type HeadingFinding = {
  severity: HeadingSeverity;
  message: string;
};

export type HeadingAnalysis = {
  headings: HeadingEntry[];
  findings: HeadingFinding[];
  outlineText: string;
  hasErrors: boolean;
  hasWarnings: boolean;
};

function truncateLabel(s: string, max = 48): string {
  const t = s.trim();
  if (t.length <= max) return t || "(vuoto)";
  return `${t.slice(0, max - 1)}…`;
}

/**
 * Estrae H1–H6 in ordine documento e valuta salti di livello, H1 multipli e heading vuoti.
 * Pensato per essere eseguito nel browser su un Document da DOMParser.
 */
export function analyzeHeadingDocument(doc: Document): HeadingAnalysis {
  const nodes = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const headings: HeadingEntry[] = [];

  nodes.forEach((el, i) => {
    const tag = el.tagName.toLowerCase();
    const level = Number(tag.slice(1)) as HeadingEntry["level"];
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    headings.push({ index: i + 1, level, text });
  });

  const findings: HeadingFinding[] = [];

  if (headings.length === 0) {
    findings.push({
      severity: "warning",
      message: "Nessun heading H1–H6 trovato nel markup.",
    });
  }

  const h1Headings = headings.filter((h) => h.level === 1);

  if (headings.length > 0 && headings[0].level !== 1) {
    findings.push({
      severity: "warning",
      message: `Il primo heading è H${headings[0].level}: per convenzione il titolo principale dovrebbe essere un solo H1 all'inizio del contenuto.`,
    });
  }

  if (headings.length > 0 && h1Headings.length === 0) {
    findings.push({
      severity: "error",
      message: "Manca un H1: aggiungi un titolo principale esplicito per tema e accessibilità.",
    });
  }

  if (h1Headings.length > 1) {
    findings.push({
      severity: "warning",
      message: `Trovati ${h1Headings.length} tag H1: di norma conviene un solo H1 per pagina per chiarezza semantica e snippet.`,
    });
  }

  headings.forEach((h, idx) => {
    if (!h.text) {
      findings.push({
        severity: "warning",
        message: `Heading #${h.index} (H${h.level}) è vuoto o contiene solo spazi.`,
      });
    }
    if (idx > 0) {
      const prev = headings[idx - 1];
      if (h.level > prev.level + 1) {
        findings.push({
          severity: "warning",
          message: `Salto di livello: dopo H${prev.level} «${truncateLabel(prev.text)}» compare H${h.level} «${truncateLabel(h.text)}» senza livello intermedio (es. H${prev.level + 1}).`,
        });
      }
    }
  });

  const outlineText = buildHeadingOutline(headings);
  const hasErrors = findings.some((f) => f.severity === "error");
  const hasWarnings = findings.some((f) => f.severity === "warning");

  return { headings, findings, outlineText, hasErrors, hasWarnings };
}

export function buildHeadingOutline(headings: HeadingEntry[]): string {
  if (headings.length === 0) return "(nessun heading)";

  const lines: string[] = [];
  const stack: number[] = [];

  for (const h of headings) {
    while (stack.length > 0 && stack[stack.length - 1] >= h.level) {
      stack.pop();
    }
    const indent = stack.length;
    stack.push(h.level);
    const label = h.text ? truncateLabel(h.text, 72) : "(vuoto)";
    lines.push(`${"  ".repeat(indent)}H${h.level} ${label}`);
  }

  return lines.join("\n");
}
