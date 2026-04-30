export type AccessibilitySeverity = "error" | "warning" | "info";

export type AccessibilityFinding = {
  severity: AccessibilitySeverity;
  message: string;
};

export type AccessibilityAnalysis = {
  findings: AccessibilityFinding[];
  hasErrors: boolean;
  hasWarnings: boolean;
  reportText: string;
};

function escapeCssIdent(id: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(id);
  }
  return id.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function visibleAccessibleName(el: HTMLElement, doc: Document): string {
  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return aria;
  const labelledby = el.getAttribute("aria-labelledby")?.trim();
  if (labelledby) {
    const chunks: string[] = [];
    for (const rawId of labelledby.split(/\s+/)) {
      const node = doc.getElementById(rawId);
      const t = node?.textContent?.replace(/\s+/g, " ").trim();
      if (t) chunks.push(t);
    }
    if (chunks.length) return chunks.join(" ");
  }
  const imgs = el.querySelectorAll("img[alt]");
  let fromImg = "";
  imgs.forEach((img) => {
    fromImg += `${img.getAttribute("alt") ?? ""} `;
  });
  const imgPart = fromImg.replace(/\s+/g, " ").trim();
  if (imgPart) return imgPart;
  return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

function controlHasAccessibleName(el: HTMLElement): boolean {
  return Boolean(
    el.getAttribute("aria-label")?.trim() ||
      el.getAttribute("aria-labelledby")?.trim() ||
      el.getAttribute("title")?.trim(),
  );
}

function inputHasLabel(input: HTMLInputElement, doc: Document): boolean {
  if (controlHasAccessibleName(input)) return true;
  const id = input.id;
  if (id && doc.querySelector(`label[for="${escapeCssIdent(id)}"]`)) return true;
  if (input.closest("label")) return true;
  const fieldset = input.closest("fieldset");
  if (fieldset?.querySelector("legend")) return true;
  return false;
}

function selectHasLabel(sel: HTMLSelectElement, doc: Document): boolean {
  if (controlHasAccessibleName(sel)) return true;
  const id = sel.id;
  if (id && doc.querySelector(`label[for="${escapeCssIdent(id)}"]`)) return true;
  if (sel.closest("label")) return true;
  const fieldset = sel.closest("fieldset");
  if (fieldset?.querySelector("legend")) return true;
  return false;
}

function textareaHasLabel(ta: HTMLTextAreaElement, doc: Document): boolean {
  if (controlHasAccessibleName(ta)) return true;
  const id = ta.id;
  if (id && doc.querySelector(`label[for="${escapeCssIdent(id)}"]`)) return true;
  if (ta.closest("label")) return true;
  const fieldset = ta.closest("fieldset");
  if (fieldset?.querySelector("legend")) return true;
  return false;
}

/**
 * Controlli base accessibilità su markup HTML (DOMParser nel browser).
 * Euristiche locali: non sostituiscono audit WCAG completi né test con utenti.
 */
export function analyzeAccessibilityDocument(doc: Document): AccessibilityAnalysis {
  const findings: AccessibilityFinding[] = [];

  const html = doc.documentElement;
  const lang = html?.getAttribute("lang")?.trim();
  if (!lang) {
    findings.push({
      severity: "warning",
      message: 'Elemento <html> senza attributo lang (o vuoto): indica la lingua principale della pagina.',
    });
  }

  const titleText = doc.querySelector("title")?.textContent?.replace(/\s+/g, " ").trim();
  if (!titleText) {
    findings.push({
      severity: "warning",
      message: "<title> assente o vuoto nel documento.",
    });
  }

  const viewport = doc.querySelector('meta[name="viewport"]');
  if (!viewport) {
    findings.push({
      severity: "info",
      message: 'Meta viewport non trovato: su pagine responsive è consigliato <meta name="viewport" content="width=device-width, initial-scale=1">.',
    });
  }

  const idCounts = new Map<string, number>();
  doc.querySelectorAll("[id]").forEach((el) => {
    const id = el.getAttribute("id")?.trim();
    if (!id) return;
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
  });
  idCounts.forEach((count, id) => {
    if (count > 1) {
      findings.push({
        severity: "error",
        message: `ID duplicato "${id}" (${count} occorrenze): gli ID devono essere univoci per aria-labelledby e associazioni label.`,
      });
    }
  });

  const mains = doc.querySelectorAll("main");
  if (mains.length > 1) {
    findings.push({
      severity: "warning",
      message: `Trovati ${mains.length} elementi <main>: di norma una pagina espone un solo landmark principale.`,
    });
  }

  doc.querySelectorAll("img").forEach((img, idx) => {
    const n = idx + 1;
    if (!img.hasAttribute("alt")) {
      findings.push({
        severity: "error",
        message: `Immagine #${n}: attributo alt assente — richiesto da WCAG per contenuti non puramente decorativi.`,
      });
      return;
    }
    const alt = img.getAttribute("alt") ?? "";
    const likelyDecorative =
      img.getAttribute("role") === "presentation" ||
      img.getAttribute("role") === "none" ||
      img.closest('[aria-hidden="true"]');
    if (!alt.trim() && !likelyDecorative) {
      findings.push({
        severity: "info",
        message: `Immagine #${n}: alt vuoto — va bene solo per immagini decorative; se trasmette informazioni aggiungi una descrizione concisa.`,
      });
    }
  });

  doc.querySelectorAll("a[href]").forEach((a, idx) => {
    const el = a as HTMLElement;
    const href = el.getAttribute("href")?.trim() ?? "";
    if (!href || href === "#") return;
    const name = visibleAccessibleName(el, doc);
    if (!name) {
      findings.push({
        severity: "error",
        message: `Link #${idx + 1}: nome accessibile vuoto (testo, aria-label o immagine con alt) — WCAG 2.x richiede uno scopo determinabile dal nome.`,
      });
    }
  });

  doc.querySelectorAll("button").forEach((btn, idx) => {
    const el = btn as HTMLButtonElement;
    const name = visibleAccessibleName(el, doc);
    if (!name && !controlHasAccessibleName(el)) {
      findings.push({
        severity: "error",
        message: `Button #${idx + 1}: senza nome accessibile visibile — usa testo, aria-label o contenuto alternativo.`,
      });
    }
  });

  doc.querySelectorAll('input[type="submit"], input[type="reset"], input[type="button"]').forEach((inp, idx) => {
    const el = inp as HTMLInputElement;
    const val = el.getAttribute("value")?.trim();
    if (!val && !controlHasAccessibleName(el)) {
      findings.push({
        severity: "warning",
        message: `Input ${el.type} #${idx + 1}: senza attributo value né aria-label/title — lo screen reader può ricevere solo il tipo di controllo.`,
      });
    }
  });

  doc.querySelectorAll('input[type="image"]').forEach((inp, idx) => {
    const el = inp as HTMLInputElement;
    const alt = el.getAttribute("alt")?.trim();
    if (!alt && !controlHasAccessibleName(el)) {
      findings.push({
        severity: "error",
        message: `Input image #${idx + 1}: servono alt sul pulsante immagine o aria-label.`,
      });
    }
  });

  doc.querySelectorAll("input").forEach((inp) => {
    const el = inp as HTMLInputElement;
    const t = (el.type || "text").toLowerCase();
    if (["hidden", "submit", "reset", "button", "image"].includes(t)) return;
    if (!inputHasLabel(el, doc)) {
      findings.push({
        severity: "warning",
        message: `Campo input (${t}${el.id ? ` id="${el.id}"` : ""}) senza etichetta associata (<label for>, label contenitore, legend in fieldset o aria-label).`,
      });
    }
  });

  doc.querySelectorAll("select").forEach((sel, idx) => {
    if (!selectHasLabel(sel as HTMLSelectElement, doc)) {
      findings.push({
        severity: "warning",
        message: `Select #${idx + 1}${sel.id ? ` (id="${sel.id}")` : ""}: senza etichetta associata o nome accessibile.`,
      });
    }
  });

  doc.querySelectorAll("textarea").forEach((ta, idx) => {
    if (!textareaHasLabel(ta as HTMLTextAreaElement, doc)) {
      findings.push({
        severity: "warning",
        message: `Textarea #${idx + 1}${ta.id ? ` (id="${ta.id}")` : ""}: senza etichetta associata o nome accessibile.`,
      });
    }
  });

  doc.querySelectorAll("iframe").forEach((frame, idx) => {
    const title = frame.getAttribute("title")?.trim();
    const aria = frame.getAttribute("aria-label")?.trim();
    if (!title && !aria) {
      findings.push({
        severity: "warning",
        message: `iframe #${idx + 1}: attributo title (o aria-label) consigliato per descrivere il contenuto incorporato.`,
      });
    }
  });

  doc.querySelectorAll("table").forEach((table, idx) => {
    const hasCaption = Boolean(table.querySelector("caption"));
    const headers = table.querySelectorAll("th").length;
    if (!hasCaption && headers === 0) {
      findings.push({
        severity: "info",
        message: `Tabella #${idx + 1}: nessuna caption né celle <th> — verifica che dati tabulari abbiano intestazioni o riepilogo comprensibile.`,
      });
    }
  });

  const h1list = doc.querySelectorAll("h1");
  if (h1list.length > 1) {
    findings.push({
      severity: "warning",
      message: `Più di un H1 (${h1list.length}): spesso si preferisce un solo titolo principale per pagina (coerenza anche con audit heading).`,
    });
  }

  const hasErrors = findings.some((f) => f.severity === "error");
  const hasWarnings = findings.some((f) => f.severity === "warning");

  const lines = [
    "Report accessibilità base (euristiche DOM)",
    `Esito: ${hasErrors ? "errori presenti" : hasWarnings ? "solo avvisi/info" : "nessun problema grave rilevato"}`,
    "",
    ...findings.map((f) => `[${f.severity.toUpperCase()}] ${f.message}`),
  ];
  const reportText = lines.join("\n");

  return { findings, hasErrors, hasWarnings, reportText };
}
