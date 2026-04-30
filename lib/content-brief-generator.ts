export type BriefPageType = "blog-article" | "landing-pillar" | "product-page" | "service-local" | "comparison";

export type BriefSearchIntent = "informational" | "commercial" | "transactional" | "navigational";

export type ContentBriefInput = {
  primaryKeyword: string;
  pageType: BriefPageType;
  intent: BriefSearchIntent;
  audienceHint: string;
  brandOrProject: string;
  secondaryLines: string[];
};

export type OutlineBlock = {
  level: "h2" | "h3";
  title: string;
  notes?: string;
};

export type ContentBriefResult = {
  primaryKeyword: string;
  pageType: BriefPageType;
  intent: BriefSearchIntent;
  suggestedTitles: string[];
  metaTitleSuggestion: string;
  metaDescriptionSuggestion: string;
  h1Suggestion: string;
  outline: OutlineBlock[];
  questionsToAnswer: string[];
  internalLinkIdeas: string[];
  differentiationAngle: string;
  seoChecklist: string[];
  wordCountBand: string;
  disclaimer: string;
};

function hashSeed(parts: string[]): number {
  const s = parts.join("|").toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Righe univoche trim, vuote escluse */
export function parseUniqueSecondaryLines(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

export function validateContentBriefInput(keyword: string): string | null {
  const k = keyword.trim();
  if (!k) return "Inserisci la keyword primaria (o tema) attorno cui costruire il brief.";
  if (k.length < 2) return "La keyword deve avere almeno 2 caratteri.";
  return null;
}

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset) % arr.length];
}

export const BRIEF_PAGE_TYPE_LABEL: Record<BriefPageType, string> = {
  "blog-article": "Articolo blog / magazine",
  "landing-pillar": "Landing pillar / hub contenuti",
  "product-page": "Pagina prodotto / catalogo",
  "service-local": "Servizio locale / pagina zonale",
  comparison: "Pagina confronto / alternative",
};

export const BRIEF_INTENT_LABEL: Record<BriefSearchIntent, string> = {
  informational: "Informativo",
  commercial: "Commerciale (confronto)",
  transactional: "Transazionale",
  navigational: "Navigazionale / brand",
};

export const briefPageTypeOptions: { value: BriefPageType; label: string }[] = [
  { value: "blog-article", label: BRIEF_PAGE_TYPE_LABEL["blog-article"] },
  { value: "landing-pillar", label: BRIEF_PAGE_TYPE_LABEL["landing-pillar"] },
  { value: "product-page", label: BRIEF_PAGE_TYPE_LABEL["product-page"] },
  { value: "service-local", label: BRIEF_PAGE_TYPE_LABEL["service-local"] },
  { value: "comparison", label: BRIEF_PAGE_TYPE_LABEL.comparison },
];

export const briefIntentOptions: { value: BriefSearchIntent; label: string }[] = [
  { value: "informational", label: BRIEF_INTENT_LABEL.informational },
  { value: "commercial", label: BRIEF_INTENT_LABEL.commercial },
  { value: "transactional", label: BRIEF_INTENT_LABEL.transactional },
  { value: "navigational", label: BRIEF_INTENT_LABEL.navigational },
];

const INTENT_ADVICE: Record<BriefSearchIntent, string> = {
  informational: "L’utente cerca informazioni: privilegia chiarezza, definizioni passo‑passo ed esempi. Evita jargon non spiegato.",
  commercial: "L’utente confronta soluzioni: includi differenziatori oggettivi (prezzo dove sensato, SLA, compatibilità) e FAQ su scelta.",
  transactional: "L’utente è vicino alla conversione: CTA chiare, riduzione friction (prezzi dove possibile, tempi di consegna, garanzie).",
  navigational: "L’utente cerca marchio o destinazione precisa: marca in evidenza, dati aggiornati (indirizzo, aperture) se locale.",
};

function buildTitles(
  kw: string,
  pageType: BriefPageType,
  seed: number,
  brandOrProject: string,
): string[] {
  const b = brandOrProject.trim();
  const suffix = b ? ` — ${b}` : "";
  const templates: Record<BriefPageType, [string, string, string]> = {
    "blog-article": [
      `${kw}: guida pratica con esempi aggiornati${suffix}`,
      `Cosa sapere su «${kw}» prima di decidere${suffix}`,
      `${kw} spiegato bene: errori comuni e come evitarli${suffix}`,
    ],
    "landing-pillar": [
      `${kw}: tutto quello che serve in un solo hub${suffix}`,
      `${kw}: struttura, strumenti e prossimi passi${suffix}`,
      `${kw}: mappa contenuti e link verso funnel${suffix}`,
    ],
    "product-page": [
      `${kw}: caratteristiche, utilizzo ideale e per chi è adatto${suffix}`,
      `${kw} — scheda tecnica sintetica e domande frequenti${suffix}`,
      `Come ${kw.replace(/^come\s+/i, "")} migliora [beneficio chiave]${suffix}`,
    ],
    "service-local": [
      `${kw}: servizio in zona, tempi tipici e cosa è incluso${suffix}`,
      `${kw}: come funziona e cosa ti chiediamo al primo contatto${suffix}`,
      `${kw}: risposte alle domande più cercate sulla nostra zona${suffix}`,
    ],
    comparison: [
      `${kw}: confronto onesto e criteri di scelta chiari${suffix}`,
      `${kw} vs alternative: quando ha senso ciascuna opzione${suffix}`,
      `Tabella sintetica: ${kw}, pro/contro e prezzo medio di mercato${suffix}`,
    ],
  };
  const t = templates[pageType];
  return [pick(t, seed, 0), pick(t, seed, 1), pick(t, seed, 2)];
}

function buildOutline(
  kw: string,
  pageType: BriefPageType,
  intent: BriefSearchIntent,
  secondaries: string[],
  seed: number,
): OutlineBlock[] {
  const sec = (i: number) => secondaries[i] ?? kw;
  const blocks: OutlineBlock[] = [];

  blocks.push({
    level: "h2",
    title:
      intent === "transactional"
        ? `Come procedere su «${kw}» senza perdere tempo`
        : `Introduzione: perché «${kw}» conta per il lettore ora`,
    notes:
      intent === "informational"
        ? "Problema, promessa risultato entro prime righe."
        : "Contestualizza problema e pubblico ideale.",
  });

  blocks.push({
    level: "h2",
    title:
      pageType === "comparison"
        ? `Confronto diretto: ${sec(0)}, ${sec(1) || kw} ed elementi discriminanti`
        : `Concetti chiave su «${kw}» (${sec(0)})`,
    notes: "Un H2 forte con sottosezioni H3 quando serve leggibilità.",
  });

  blocks.push({
    level: "h3",
    title: pick(
      [`Checklist veloce: cosa preparare prima di ${kw}`, `Mini‑checklist leggibile (bullet) su ${kw}`],
      seed,
      1,
    ),
  });

  blocks.push({
    level: "h2",
    title:
      pageType === "service-local" || intent === "navigational"
        ? `FAQ pratiche (domande reali sulla nostra zona / servizio)`
        : `Domande frequenti e obiezioni comuni`,
    notes: "Schema FAQPage solo se risposte autentiche in pagina.",
  });

  blocks.push({
    level: "h2",
    title:
      intent === "transactional"
        ? `Passo successivo: CTA chiara`
        : `Conclusione: riepilogo e next step`,
    notes: "Un solo recap + un next step prioritario.",
  });

  return blocks;
}

function buildQuestions(kw: string, pageType: BriefPageType, seed: number): string[] {
  const base = [
    `Cos’è esattamente «${kw}» e quando serve davvero?`,
    pick(
      [`Quanto tempo serve in media per ${kw}?`, `Qual è il primo passo pratico su ${kw}?`],
      seed,
      0,
    ),
    pick(
      [
        pageType === "comparison"
          ? `Quali sono i criteri per scegliere tra alternative a ${kw}?`
          : `Quali sono gli errori più frequenti quando si affronta ${kw}?`,
        `Chi può essere escluso a priori (non cliente ideale) per ${kw}?`,
      ],
      seed,
      3,
    ),
    `Cos’è raccomandabile verificare con un esperto prima di decidere su ${kw}?`,
  ];
  return base;
}

function internalIdeas(prim: string, secondaries: string[]): string[] {
  const s = [...secondaries].slice(0, 5);
  if (s.length === 0)
    return [
      `Hub tematico collegato a «${prim}» (pillar → cluster).`,
      "Pagina contatti / zona servizi con breadcrumb chiaro.",
      `Pagina caso studio o progetto dove «${prim}» compare nel titolo e nel sommario.`,
    ];
  return s.slice(0, 4).map((q) => `Approfondimento dedicato a «${q}» con anchor semantico verso questo pezzo centrale «${prim}».`);
}

function checklistFor(intent: BriefSearchIntent): string[] {
  const base = [
    "Title tag unico (~50–60 caratteri) con keyword naturale vicino all’inizio.",
    "Meta description incentivante (~145–158 car.) con beneficio chiaro.",
    "Un solo H1 allineato a intent SERP.",
    "Struttura H2/H3 con anchor interni pertinenti dove utile.",
  ];
  if (intent === "transactional") {
    base.push("Prima piega: CTA o valore proporzionale al livello funnel.");
  }
  if (intent === "informational") {
    base.push("Definizioni o passi numerati: facilita Featured Snippet / People Also Ask.");
  }
  return base;
}

export function formatContentBriefReport(r: ContentBriefResult): string {
  const lines: string[] = [
    `Content brief SEO — keyword primaria: ${r.primaryKeyword}`,
    `Tipo pagina: ${BRIEF_PAGE_TYPE_LABEL[r.pageType]} · Intent: ${BRIEF_INTENT_LABEL[r.intent]}`,
    `Fascia parole suggerita: ${r.wordCountBand}`,
    "",
    "---",
    "",
    "## Titoli proposti (sceglierne uno)",
    ...r.suggestedTitles.map((t) => `- ${t}`),
    "",
    "## Meta",
    `Title (≤60 car. suggeriti): ${r.metaTitleSuggestion}`,
    "",
    `Description (≈145–158 car.): ${r.metaDescriptionSuggestion}`,
    "",
    "## H1",
    r.h1Suggestion,
    "",
    "## Outline suggerito",
    ...r.outline.flatMap((b) =>
      b.level === "h2"
        ? [`### ${b.title}`, ...(b.notes ? [`_${b.notes}_`, ""] : [""])]
        : [`  - (${b.level}) ${b.title}`],
    ),
    "",
    "## Domande da coprire (FAQ / contenuto)",
    ...r.questionsToAnswer.map((q) => `- ${q}`),
    "",
    "## Idee linking interno",
    ...r.internalLinkIdeas.map((x) => `- ${x}`),
    "",
    "## Angolo di differenziazione",
    r.differentiationAngle,
    "",
    "## Intent: note",
    INTENT_ADVICE[r.intent],
    "",
    "## Checklist SEO pagina",
    ...r.seoChecklist.map((c) => `- ${c}`),
    "",
    "---",
    r.disclaimer,
  ];
  return lines.join("\n");
}

export function buildContentBrief(raw: ContentBriefInput): ContentBriefResult {
  const primaryKeyword = raw.primaryKeyword.trim();
  const secondaries = raw.secondaryLines;
  const seed = hashSeed([
    primaryKeyword,
    raw.pageType,
    raw.intent,
    raw.brandOrProject.trim(),
    secondaries.join(","),
  ]);

  const suggestedTitles = buildTitles(primaryKeyword, raw.pageType, seed, raw.brandOrProject);
  const bestTitle = suggestedTitles[seed % suggestedTitles.length];
  const brand = raw.brandOrProject.trim();

  let metaTitle = bestTitle;
  if (metaTitle.length > 60) {
    metaTitle = `${metaTitle.slice(0, 57)}…`;
  }
  if (brand && metaTitle.length < 35) {
    const candidate = `${primaryKeyword} — ${brand}`;
    metaTitle = candidate.length > 60 ? `${candidate.slice(0, 57)}…` : candidate;
  }

  const metaDescTemplates = pick(
    [
      `Ti serve orientarti su «${primaryKeyword}»${brand ? `: focus ${brand}` : ""}. Struttura chiara, criteri pratici e next step.`,
      `${primaryKeyword}${brand ? ` (${brand})` : ""}: cosa leggere primo, checklist utile e risposte alle domande tipiche.`,
    ],
    seed,
    4,
  );
  const metaDescriptionSuggestion = metaDescTemplates.slice(0, 158);

  const h1Trim = bestTitle.replace(/\s*[—\-]\s*.*$/, "").trim();
  const h1Suggestion = h1Trim.length >= 6 ? h1Trim : bestTitle;

  const outline = buildOutline(primaryKeyword, raw.pageType, raw.intent, secondaries, seed);
  const questionsToAnswer = buildQuestions(primaryKeyword, raw.pageType, seed);
  const internalLinkIdeas = internalIdeas(primaryKeyword, secondaries);
  const seoChecklist = checklistFor(raw.intent);

  const differentiationAngle = `${INTENT_ADVICE[raw.intent]} Posiziona la pagina con un'esperienza più concreta del media SERP medio: definisci pubblico («${raw.audienceHint.trim() || "chi cerca questo tema"}»), prova dove possibile e un solo takeaway memorabile sulla keyword «${primaryKeyword}».`;

  const wordBands: Record<BriefPageType, string> = {
    "blog-article": "1 200–2 800 parole (aggiungi sotto-argomenti solo se aumentano qualità SERP)",
    "landing-pillar": "2 500–5 500 parole pillar (cluster linkati esterni al blocco fondamentale)",
    "product-page": "600–2 400 parole (+ scheda tecnica tabellare quando serve confronto diretto)",
    "service-local": "900–2 100 parole (+ NAP/coerenza locale se geografico)",
    comparison: "1 600–4 000 parole con tabella e criteri oggettivi",
  };

  return {
    primaryKeyword,
    pageType: raw.pageType,
    intent: raw.intent,
    suggestedTitles,
    metaTitleSuggestion: metaTitle,
    metaDescriptionSuggestion: metaDescriptionSuggestion,
    h1Suggestion,
    outline,
    questionsToAnswer,
    internalLinkIdeas,
    differentiationAngle,
    seoChecklist,
    wordCountBand: wordBands[raw.pageType],
    disclaimer:
      "Brief generato in locale nel browser senza scraping SERP o API: è un primo canovaccio deterministico sulla keyword e gli input. Prima di pubblicare, valida sempre volume, SERP reale e allineamento al brand.",
  };
}
