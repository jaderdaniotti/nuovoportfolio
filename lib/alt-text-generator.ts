export type AltImageRole =
  | "hero"
  | "content"
  | "product"
  | "team"
  | "logo"
  | "chart"
  | "decorative";

export type AltTextInput = {
  /** Cosa mostra visivamente l’immagine (oggetto, azione, contesto). */
  subject: string;
  /** Tema della pagina o sezione (opzionale, arricchisce il testo). */
  pageContext: string;
  imageRole: AltImageRole;
  /** Nome file o slug SEO (opzionale, hint lessicale). */
  filenameHint: string;
  /** Lunghezza massima consigliata (caratteri). */
  maxLength: number;
};

export type AltTextVariant = {
  id: string;
  label: string;
  text: string;
};

export type AltTextResult = {
  variants: AltTextVariant[];
  htmlExample: string;
  decorativeGuidance: string | null;
  tips: string[];
  disclaimer: string;
};

const ROLE_LABEL: Record<AltImageRole, string> = {
  hero: "Hero / above the fold",
  content: "Illustrazione nel corpo pagina",
  product: "Prodotto / ecommerce",
  team: "Team / ritratti",
  logo: "Logo / marchio",
  chart: "Grafico / infographic",
  decorative: "Solo decorativa",
};

export const altImageRoleOptions: { value: AltImageRole; label: string }[] = (
  Object.entries(ROLE_LABEL) as [AltImageRole, string][]
).map(([value, label]) => ({ value, label }));

function collapseWs(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

/** Rimuove prefissi ridondanti tipici in italiano (meglio non iniziare con «immagine di»). */
export function normalizeAltSubject(raw: string): string {
  let t = collapseWs(raw);
  if (!t) return "";
  const lower = t.toLowerCase();
  const strip = [
    /^immagine\s+(di|del|della|dei|delle)\s+/i,
    /^foto(graphia)?\s+(di|del|della|dei|delle)\s+/i,
    /^screenshot\s+(di|del|della)\s+/i,
    /^grafico\s+(che\s+mostra|con|della|del)\s+/i,
  ];
  for (const re of strip) {
    t = t.replace(re, "").trim();
  }
  return collapseWs(t);
}

function filenameTokens(raw: string): string[] {
  const base = raw.replace(/^.*[/\\]/, "").replace(/\.[a-z0-9]{2,5}$/i, "");
  const parts = base
    .split(/[-_\s]+/g)
    .map((p) => p.trim())
    .filter((p) => p.length > 1 && !/^(img|dsc|photo|pic|shot|capture)\d*$/i.test(p));
  return [...new Set(parts.map((p) => p.toLowerCase()))].slice(0, 4);
}

function truncateAtWord(input: string, max: number): string {
  if (input.length <= max) return input;
  const ellipsis = "…";
  const budget = max - ellipsis.length;
  if (budget <= 0) return ellipsis;
  const cut = input.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > budget * 0.55 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}${ellipsis}`;
}

function hashSeed(parts: string[]): number {
  const s = parts.join("|").toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset) % arr.length];
}

export function validateAltTextInput(
  subject: string,
  maxLength: number,
  role?: AltImageRole,
): string | null {
  if (role === "decorative") {
    if (maxLength < 40 || maxLength > 300) return "Imposta un limite caratteri tra 40 e 300 (consiglio 100–140).";
    return null;
  }
  const s = normalizeAltSubject(subject);
  if (!s) return "Descrivi cosa mostra l’immagine: soggetto, azione o dato essenziale (es. «tecnico che installa pannello fotovoltaico»).";
  if (s.length < 4) return "La descrizione è troppo corta: aggiungi almeno qualche parola sul contenuto visivo.";
  if (maxLength < 40 || maxLength > 300) return "Imposta un limite caratteri tra 40 e 300 (consiglio 100–140).";
  return null;
}

export function buildAltTextResult(input: AltTextInput): AltTextResult {
  const subject = normalizeAltSubject(input.subject);
  const pageCtx = collapseWs(input.pageContext);
  const fileToks = filenameTokens(input.filenameHint);
  const max = Math.min(300, Math.max(40, input.maxLength));
  const seed = hashSeed([subject, pageCtx, input.imageRole, fileToks.join(",")]);

  const disclaim =
    "Bozze generate in locale: riviste sempre il testo nel contesto reale della pagina e con utenti che usano screen reader. Non inserire keyword forzate né testo fuorviante.";

  if (input.imageRole === "decorative") {
    return {
      variants: [],
      htmlExample:
        '<img src="/percorso/asset.svg" alt="" decoding="async" />\n<!-- Decorativa: valuta role="presentation" o aria-hidden sul wrapper ove applicabile. -->',
      decorativeGuidance:
        "Se l’immagine non trasferisce informazione (solo ornamento ripetuto, pattern, divisori), usa alt vuoto (alt=\"\") e assicurati che il significato sia già nel testo vicino. Evita descrizioni lunghe «a riempimento». Se è puramente stilistica ma l’articolo è identificato dall’immagine, rivaluta: potrebbe essere contenuto.",
      tips: [
        'SVG decorativi: spesso aria-hidden="true" sul wrapper se il titolo della sezione copre il senso.',
        "Non duplicare la stessa frase dell’H1 nell’alt di un’immagine puramente decorativa sotto l’H1.",
      ],
      disclaimer: disclaim,
    };
  }

  const ctxBit = pageCtx
    ? pick(
        [
          ` nel contesto «${truncateAtWord(pageCtx, 48)}»`,
          ` — contesto pagina: ${truncateAtWord(pageCtx, 44)}`,
          ` (${truncateAtWord(pageCtx, 40)})`,
        ],
        seed,
        0,
      )
    : "";

  const fileBit =
    fileToks.length && !subject.toLowerCase().includes(fileToks[0]!)
      ? ` — riferimento: ${fileToks.slice(0, 2).join(", ")}`
      : "";

  const openers: Record<AltImageRole, string[]> = {
    hero: ["In primo piano", "Vista principale", "Scena centrale"],
    content: ["Illustrazione:", "Dettaglio:", "Esempio visivo:"],
    product: ["Prodotto:", "Vista del prodotto", "Packaging e prodotto"],
    team: ["Ritratto di", "Il team:", "Professionista:"],
    logo: ["Logo", "Marchio", "Identità visiva"],
    chart: ["Grafico che mostra", "Andamento:", "Dati sintetizzati:"],
    decorative: [],
  };

  const closers: string[] = [
    subject,
    `${subject}${ctxBit}`,
    `${pick(openers[input.imageRole], seed, 1)} ${subject}${ctxBit}`,
    `${pick(openers[input.imageRole], seed, 2)} ${subject}${fileBit}`,
  ];

  const unique: string[] = [];
  const seen = new Set<string>();
  for (const c of closers) {
    const t = truncateAtWord(collapseWs(c), max);
    const k = t.toLowerCase();
    if (t.length >= 8 && !seen.has(k)) {
      seen.add(k);
      unique.push(t);
    }
  }

  while (unique.length < 4) {
    const extra = truncateAtWord(
      `${pick(openers[input.imageRole], seed, unique.length + 3)} ${subject}${ctxBit}${unique.length % 2 ? fileBit : ""}`,
      max,
    );
    const kk = extra.toLowerCase();
    if (!seen.has(kk) && extra.length >= 8) {
      seen.add(kk);
      unique.push(extra);
    } else break;
  }

  const variants: AltTextVariant[] = unique.slice(0, 4).map((text, i) => ({
    id: `v${i + 1}`,
    label: ["Concisa", "Con contesto pagina", "Variante descrittiva", "Alternativa breve"][i] ?? `Variante ${i + 1}`,
    text,
  }));

  const primary = variants[0]?.text ?? subject;
  const htmlExample = `<img src="/percorso/immagine.jpg" alt="${primary.replace(/"/g, "&quot;")}" width="1200" height="630" decoding="async" />`;

  const tips: string[] = [
    primary.length < 20
      ? "Il testo è molto corto: va bene solo se ogni parola è informativa; altrimenti aggiungi contesto (azione, relazione, dato chiave)."
      : primary.length > 140
        ? "Testo oltre ~140 caratteri: considera una versione più corta per equilibrio tra dettaglio e ascolto rapido."
        : "Lunghezza nel range usabile per alt testuali informativi.",
    "Evita «immagine di» all’inizio: lo screen reader già annuncia il ruolo.",
    input.imageRole === "logo"
      ? "Logo linked alla home: spesso alt con nome del sito; se è link, coerenza con il `title` del link."
      : input.imageRole === "chart"
        ? "Per grafici complessi: sintesi nell’alt + descrizione estesa in testo o `longdesc` / tabella dati accessibile dove serve."
        : "Se ci sono watermark o testo nell’immagine essenziale al senso, includilo sinteticamente nell’alt.",
  ];

  return {
    variants,
    htmlExample,
    decorativeGuidance: null,
    tips,
    disclaimer: disclaim,
  };
}

export function formatAltTextReport(result: AltTextResult, subjectRaw: string): string {
  const lines: string[] = ["=== Generatore ALT text ===", `Input soggetto: ${collapseWs(subjectRaw)}`, ""];
  if (result.decorativeGuidance) {
    lines.push("Immagine decorativa:", result.decorativeGuidance, "", "Suggerimenti:");
    for (const t of result.tips) lines.push(`• ${t}`);
    lines.push("", "Esempio markup:", result.htmlExample);
  } else {
    lines.push("Varianti proposte:");
    for (const v of result.variants) {
      lines.push(`- [${v.label}] ${v.text} (${v.text.length} car.)`);
    }
    lines.push("", "Esempio <img>:", result.htmlExample, "", "Suggerimenti:");
    for (const t of result.tips) lines.push(`• ${t}`);
  }
  lines.push("", result.disclaimer);
  return lines.join("\n");
}
