export type ContentTypeHint =
  | "guida-approfondita"
  | "lista-numerata"
  | "confronto"
  | "how-to"
  | "trend-news"
  | "faq-page";

export type FunnelStage = "awareness" | "consideration" | "conversion";

export type NichePreset = "content-blog" | "ecommerce" | "local-services" | "saas-b2b";

export type EditorialSlot = {
  weekIndex: number;
  slotInWeek: number;
  globalIndex: number;
  titleSuggestion: string;
  primaryKeywordOrTopic: string;
  contentHint: ContentTypeHint;
  funnel: FunnelStage;
  checklist: string[];
};

export type EditorialPlanInput = {
  theme: string;
  weeks: number;
  postsPerWeek: number;
  niche: NichePreset;
  keywordLines: string[];
};

export type EditorialPlanResult = {
  theme: string;
  niche: NichePreset;
  weeksTotal: number;
  postsPerWeek: number;
  totalSlots: number;
  slots: EditorialSlot[];
  disclaimer: string;
};

const CONTENT_ROTATION: ContentTypeHint[] = [
  "guida-approfondita",
  "lista-numerata",
  "how-to",
  "confronto",
  "faq-page",
  "trend-news",
];

const TYPE_LABELS: Record<ContentTypeHint, string> = {
  "guida-approfondita": "Guida / pillar",
  "lista-numerata": "Lista / checklist",
  "how-to": "How-to orientato azione",
  confronto: "Confronto o alternative",
  "faq-page": "FAQ / contenuto basato domande",
  "trend-news": "Trend o aggiornamento",
};

const FUNNEL_LABELS: Record<FunnelStage, string> = {
  awareness: "Consapevolezza",
  consideration: "Valutazione",
  conversion: "Conversione / decisione",
};

export function funnelLabel(stage: FunnelStage): string {
  return FUNNEL_LABELS[stage];
}

export function contentHintLabel(hint: ContentTypeHint): string {
  return TYPE_LABELS[hint];
}

/** Righe univoche trim, vuote escluse, ordine conservato */
export function parseUniqueKeywordLines(raw: string): string[] {
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

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.floor(n)));
}

function pickFunnel(totalSlots: number, globalZeroBased: number): FunnelStage {
  if (totalSlots <= 0) return "awareness";
  const ratio = globalZeroBased / Math.max(totalSlots - 1, 1);
  if (ratio < 0.35) return "awareness";
  if (ratio < 0.75) return "consideration";
  return "conversion";
}

function primaryTopic(keywords: string[], theme: string, globalIndex: number): string {
  if (keywords.length > 0) {
    return keywords[globalIndex % keywords.length];
  }
  const t = theme.trim();
  return t.slice(0, 80) + (t.length > 80 ? "…" : "");
}

function checklistsFor(content: ContentTypeHint, funnel: FunnelStage): string[] {
  const base: string[] = [
    "H1 univoco coerente con intento SERP.",
    `Meta description (circa 145–158 caratteri) con incentivo al click.`,
    `Struttura con sottotitoli (H2/H3) scansionabile.`,
  ];
  if (content === "guida-approfondita") {
    base.push("Sommario o anchor in cima per lunghe pagine.");
  }
  if (content === "faq-page") {
    base.push("Schema FAQPage solo se blocchi Domanda/Risposta reali sulla pagina.");
  }
  if (funnel === "conversion") {
    base.push("CTA chiara contestuale — evitare call generiche isolate in fondo.");
  }
  return base;
}

function titleForPreset(
  niche: NichePreset,
  theme: string,
  topic: string,
  content: ContentTypeHint,
  weekIndex: number,
  slotInWeek: number,
): string {
  const safeTopic = topic.length > 90 ? `${topic.slice(0, 87)}…` : topic;

  switch (niche) {
    case "ecommerce":
      if (content === "how-to") {
        return `[Sett.${weekIndex} · post ${slotInWeek}] Come scegliere e pubblicare contenuti utili attorno a «${safeTopic}» (${theme})`;
      }
      if (content === "confronto") {
        return `[Sett.${weekIndex}] ${safeTopic}: confronto e differenze per guidare alla scelta — focus ${theme}`;
      }
      if (content === "lista-numerata") {
        return `[Sett.${weekIndex}] Lista: elementi indispensabili su «${safeTopic}» per il catalogo / scheda (${theme})`;
      }
      return `[Sett.${weekIndex}] Scheda contenuto: pillar su «${safeTopic}» con link interni — ${theme}`;
    case "local-services":
      if (content === "faq-page") {
        return `[Sett.${weekIndex}] FAQ locali per «${safeTopic}»: chi, dove, quando, cosa incluso (${theme})`;
      }
      if (content === "how-to") {
        return `[Sett.${weekIndex}] Come prepararsi a «${safeTopic}» — servizio ${theme}`;
      }
      return `[Sett.${weekIndex}] Pagina zonale/contenuto su «${safeTopic}» (${theme}), profilo cliente locale`;
    case "saas-b2b":
      if (content === "guida-approfondita") {
        return `[Sett.${weekIndex}] Guida tecnica / processo: «${safeTopic}» nel contesto ${theme}`;
      }
      if (content === "trend-news") {
        return `[Sett.${weekIndex}] Aggiornamento su «${safeTopic}»: metriche da monitorare (${theme})`;
      }
      return `[Sett.${weekIndex}] Contenuto funnel su «${safeTopic}»: next step per stakeholder (${theme})`;
    case "content-blog":
    default:
      if (content === "guida-approfondita") {
        return `[Sett.${weekIndex}] Guida pillar: tutto ciò che serve sapere su «${safeTopic}» — blog ${theme}`;
      }
      if (content === "lista-numerata") {
        return `[Sett.${weekIndex}] ${6 + ((weekIndex + slotInWeek) % 5)} punti chiave per «${safeTopic}» nel tema ${theme}`;
      }
      if (content === "faq-page") {
        return `[Sett.${weekIndex}] Rispondiamo alle domande più cercate su «${safeTopic}» (${theme})`;
      }
      return `[Sett.${weekIndex}] Titolo evergreen su «${safeTopic}»: angolazione SEO per ${theme}`;
  }
}

export function validateEditorialPlanInput(theme: string, weeks: number, postsPerWeek: number): string | null {
  const tr = theme.trim();
  if (!tr) return "Inserisci un tema principale della rubrica.";
  const w = Number(weeks);
  const p = Number(postsPerWeek);
  if (!Number.isFinite(w) || w < 2 || w > 24) return "Settimane: usa un numero tra 2 e 24.";
  if (!Number.isFinite(p) || p < 1 || p > 7) return "Articoli per settimana: da 1 a 7.";
  return null;
}

export function buildEditorialPlan(raw: Omit<EditorialPlanInput, "keywordLines"> & { keywordLines: string[] }): EditorialPlanResult {
  const theme = raw.theme.trim();
  const weeksTotal = clampInt(raw.weeks, 2, 24);
  const postsPerWeek = clampInt(raw.postsPerWeek, 1, 7);
  const keywords = raw.keywordLines;
  const totalSlots = weeksTotal * postsPerWeek;

  const slots: EditorialSlot[] = [];
  let g = 0;
  for (let w = 1; w <= weeksTotal; w += 1) {
    for (let s = 1; s <= postsPerWeek; s += 1) {
      const content = CONTENT_ROTATION[g % CONTENT_ROTATION.length];
      const funnel = pickFunnel(totalSlots, g);
      const topic = primaryTopic(keywords.length ? keywords : [theme], theme, g);
      const titleSuggestion = titleForPreset(raw.niche, theme, topic, content, w, s);
      slots.push({
        weekIndex: w,
        slotInWeek: s,
        globalIndex: g + 1,
        titleSuggestion,
        primaryKeywordOrTopic: topic,
        contentHint: content,
        funnel,
        checklist: checklistsFor(content, funnel),
      });
      g += 1;
    }
  }

  return {
    theme,
    niche: raw.niche,
    weeksTotal,
    postsPerWeek,
    totalSlots,
    slots,
    disclaimer:
      "Piano generato offline nel browser senza uso di SERP/API: distribuisce formato contenuto e funnel in modo deterministico sul tema e sulle eventual keyword. Prima di pubblicare, valida sempre volume e SERP sulle query reali e adatta tone of voice.",
  };
}

export function formatEditorialPlanReport(result: EditorialPlanResult): string {
  const lines: string[] = [
    `Piano editoriale — tema: ${result.theme}`,
    `Preset nicchia: ${result.niche}`,
    `Durata: ${result.weeksTotal} settimane × ${result.postsPerWeek} contenuti/settimana = ${result.totalSlots} contenuti.`,
    "",
    "---",
    "",
  ];

  let currentWeek = 0;
  for (const slot of result.slots) {
    if (slot.weekIndex !== currentWeek) {
      currentWeek = slot.weekIndex;
      lines.push(`## Settimana ${currentWeek}`, "");
    }
    lines.push(
      `### ${slot.globalIndex}. [Sett.${slot.weekIndex} — slot ${slot.slotInWeek}] ${contentHintLabel(slot.contentHint)} — ${FUNNEL_LABELS[slot.funnel]}`,
      `Titolo suggerito: ${slot.titleSuggestion}`,
      `Focus: ${slot.primaryKeywordOrTopic}`,
      "Check:",
      ...slot.checklist.map((c) => `  - ${c}`),
      "",
    );
  }

  lines.push("---", result.disclaimer);
  return lines.join("\n");
}
