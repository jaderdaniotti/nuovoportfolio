export type WireframeGoal = "lead" | "signup" | "sale" | "download" | "inform";

export type WireframeFunnelStage = "awareness" | "consideration" | "decision";

export type WireframeDensity = "minimal" | "balanced" | "rich";

export type WireframeBriefInput = {
  pageOrProjectName: string;
  goal: WireframeGoal;
  funnelStage: WireframeFunnelStage;
  density: WireframeDensity;
  personaHint: string;
  constraintsNote: string;
  customSectionsRaw: string;
};

export type WireframeSectionBrief = {
  order: number;
  label: string;
  priority: "P0" | "P1" | "P2";
  purpose: string;
  blocksInside: string[];
};

export type WireframeBriefResult = {
  pageOrProjectName: string;
  goal: WireframeGoal;
  funnelStage: WireframeFunnelStage;
  density: WireframeDensity;
  summaryOneLiner: string;
  heroBlock: string[];
  sections: WireframeSectionBrief[];
  navPattern: string;
  ctaMap: string[];
  formSketch: string[] | null;
  trustSignals: string[];
  mobileNotes: string[];
  qaForStakeholder: string[];
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

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset) % arr.length];
}

export function parseUniqueSectionLines(raw: string): string[] {
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

export function validateWireframeBriefInput(name: string): string | null {
  const k = name.trim();
  if (!k) return "Indica nome pagina o progetto (servirà da titolo del brief wireframe).";
  if (k.length < 2) return "Usa almeno 2 caratteri.";
  return null;
}

export const WIRE_GOAL_LABEL: Record<WireframeGoal, string> = {
  lead: "Generazione lead (contatto/demo)",
  signup: "Iscrizione / account",
  sale: "Vendita / checkout",
  download: "Download risorsa",
  inform: "Informazione pura",
};

export const WIRE_FUNNEL_LABEL: Record<WireframeFunnelStage, string> = {
  awareness: "Consapevolezza problema",
  consideration: "Confronto soluzioni",
  decision: "Scelta e conversione",
};

export const WIRE_DENSITY_LABEL: Record<WireframeDensity, string> = {
  minimal: "Wireframe rapido — solo blocchi essenziali",
  balanced: "Struttura completa uso produzione",
  rich: "Dettaglio componenti — handoff progettuale forte",
};

export const wireGoalOptions: { value: WireframeGoal; label: string }[] = [
  { value: "lead", label: WIRE_GOAL_LABEL.lead },
  { value: "signup", label: WIRE_GOAL_LABEL.signup },
  { value: "sale", label: WIRE_GOAL_LABEL.sale },
  { value: "download", label: WIRE_GOAL_LABEL.download },
  { value: "inform", label: WIRE_GOAL_LABEL.inform },
];

export const wireFunnelOptions: { value: WireframeFunnelStage; label: string }[] = [
  { value: "awareness", label: WIRE_FUNNEL_LABEL.awareness },
  { value: "consideration", label: WIRE_FUNNEL_LABEL.consideration },
  { value: "decision", label: WIRE_FUNNEL_LABEL.decision },
];

export const wireDensityOptions: { value: WireframeDensity; label: string }[] = [
  { value: "minimal", label: WIRE_DENSITY_LABEL.minimal },
  { value: "balanced", label: WIRE_DENSITY_LABEL.balanced },
  { value: "rich", label: WIRE_DENSITY_LABEL.rich },
];

function prioFor(seed: number, i: number, density: WireframeDensity): "P0" | "P1" | "P2" {
  if (density === "minimal") return i === 0 ? "P0" : "P1";
  if (density === "rich") {
    if (i < 2) return "P0";
    if ((seed + i) % 5 < 3) return "P1";
    return "P2";
  }
  if (i < 3) return "P0";
  return pick<"P1" | "P2">(["P1", "P1", "P2"], seed, i);
}

function buildHero(goal: WireframeGoal, funnel: WireframeFunnelStage, name: string, seed: number): string[] {
  const social = pick(
    [
      "Micro‑proof sopra titolo (logo clienti o rating), evitare caroselli ingombranti in hero.",
      "Headline H1 + sottotitolo di supporto; max 2 righe ciascuno in wireframe.",
    ],
    seed,
    0,
  );
  const cta =
    goal === "inform"
      ? "CTA secondaria “Approfondisci” + link testuale a sezione successiva (scroll)."
      : pick(
          [
            "CTA primaria sticky su mobile dopo 40% scroll (annotare su frame mobile).",
            "Doppia CTA: primaria desiderata + secondaria a basso impegno (es. brochure).",
          ],
          seed,
          2,
        );
  const trust =
    funnel === "decision"
      ? "Strip garanzie / tempo risposta / metodo di contatto visibile già in fold."
      : "Spazio per illustrazione o mock prodotto (placeholder rettangolo + ratio annotato).";

  return [
    `Contesto: schermata “${name.trim()}” — blocchi come rettangoli etichettati, non design finale.`,
    social,
    cta,
    trust,
  ];
}

function defaultSections(goal: WireframeGoal, funnel: WireframeFunnelStage, _seed: number): Omit<WireframeSectionBrief, "order">[] {
  const base: Omit<WireframeSectionBrief, "order">[] = [
    {
      label: "Social proof / metrica",
      priority: "P1",
      purpose: "Ridurre attrito subito dopo hero con numeri o testimonial sintetici.",
      blocksInside: ["Griglia 3 card quote corte", "Logo bar (monocromatico in wireframe)"],
    },
    {
      label: "Problema → promessa",
      priority: "P0",
      purpose: funnel === "awareness" ? "Chiarire dolore e urgenza prima del prodotto." : "Collegare esigenza a offerta in 2–3 bullet.",
      blocksInside: ["Two-column: testo | elenco bullet", "Icone placeholder circolari"],
    },
    {
      label: "Come funziona / processo",
      priority: "P1",
      purpose: "Passi numerati per utenti in considerazione.",
      blocksInside: ["Stepper orizzontale (3–4 step)", "Note interazione: hover non obbligatorio in V1"],
    },
    {
      label: "Dettaglio offerta",
      priority: "P0",
      purpose:
        goal === "sale"
          ? "Specifiche confrontabili con competitor (tabella semplificata)."
          : "Lista benefit con micro-heading.",
      blocksInside: ["Tabella comparativa o lista check", "Micro-CTA ripetuto inline"],
    },
    {
      label: "FAQ compatte",
      priority: "P1",
      purpose: "Coprire obiezioni senza scroll infinito: max 5 voci accordion.",
      blocksInside: ["Accordion (stato default: chiuso)", "Link a pagina FAQ estesa se serve"],
    },
    {
      label: "Chiusura / CTA ripetuta",
      priority: "P0",
      purpose: "Riassunto valore + un solo obiettivo di conversione.",
      blocksInside: ["Band full-width colorata in wireframe", "Form inline o bottone enorme secondo goal"],
    },
  ];

  if (goal === "lead" || goal === "signup") {
    base.splice(2, 0, {
      label: "Form lead / iscrizione",
      priority: "P0",
      purpose: "Campi ridotti al minimo: email + consenso; note privacy sotto.",
      blocksInside: ["Form 1 colonna desktop, full width mobile", "Checkbox GDPR + link policy"],
    });
  }

  if (funnel === "decision" && goal !== "inform") {
    base.push({
      label: "Urgenza legittima",
      priority: "P2",
      purpose: "Solo se verificabile: slot, posti, promo — evitare pattern ingannevoli.",
      blocksInside: ["Banner sottile sotto pricing o sopra footer"],
    });
  }

  return base;
}

function mergeCustomSections(
  defaults: Omit<WireframeSectionBrief, "order">[],
  custom: string[],
  density: WireframeDensity,
  seed: number,
): Omit<WireframeSectionBrief, "order">[] {
  if (custom.length === 0) return defaults;
  const inserted = custom.map((label, i) => ({
    label,
    priority: prioFor(seed, i + 2, density),
    purpose: `Sezione richiesta dallo stakeholder: definire copy e asset in iterazione dopo wireframe.`,
    blocksInside: ["Placeholder contenuto dinamico", "Annotare dipendenze (CMS / API)"],
  }));
  const cut = density === "minimal" ? 4 : density === "rich" ? defaults.length + inserted.length : 6;
  const merged = [...inserted.slice(0, 3), ...defaults];
  return merged.slice(0, Math.min(cut, merged.length));
}

export function formatWireframeBriefReport(r: WireframeBriefResult): string {
  const lines: string[] = [
    `Wireframe brief — ${r.pageOrProjectName}`,
    `Goal: ${WIRE_GOAL_LABEL[r.goal]} · Funnel: ${WIRE_FUNNEL_LABEL[r.funnelStage]} · Livello wireframe: ${WIRE_DENSITY_LABEL[r.density]}`,
    "",
    r.summaryOneLiner,
    "",
    "## Hero / above the fold",
    ...r.heroBlock.map((x) => `- ${x}`),
    "",
    "## Sezioni (ordine consigliato)",
    ...r.sections.flatMap((s) => [
      `${s.order}. [${s.priority}] ${s.label}`,
      `   · ${s.purpose}`,
      ...s.blocksInside.map((b) => `   · Blocco UI: ${b}`),
      "",
    ]),
    "## Navigazione",
    r.navPattern,
    "",
    "## Gerarchia CTA",
    ...r.ctaMap.map((c) => `- ${c}`),
    "",
    ...(r.formSketch
      ? ["## Bozza campi form (se applicabile)", ...r.formSketch.map((f) => `- ${f}`), ""]
      : []),
    "## Trust & proof",
    ...r.trustSignals.map((t) => `- ${t}`),
    "",
    "## Mobile-first",
    ...r.mobileNotes.map((m) => `- ${m}`),
    "",
    "## Domande da chiudere prima del design alto fedeltà",
    ...r.qaForStakeholder.map((q) => `- ${q}`),
    "",
    "---",
    r.disclaimer,
  ];
  return lines.join("\n");
}

export function buildWireframeBrief(raw: WireframeBriefInput): WireframeBriefResult {
  const pageOrProjectName = raw.pageOrProjectName.trim();
  const custom = parseUniqueSectionLines(raw.customSectionsRaw);
  const seed = hashSeed([
    pageOrProjectName,
    raw.goal,
    raw.funnelStage,
    raw.density,
    raw.personaHint.trim(),
    raw.constraintsNote.trim(),
    custom.join(","),
  ]);

  const summaryOneLiner = `${pageOrProjectName}: struttura a blocchi orientata a ${WIRE_GOAL_LABEL[raw.goal].toLowerCase()}, pubblico «${raw.personaHint.trim() || "non specificato"}». ${raw.constraintsNote.trim() ? `Vincoli: ${raw.constraintsNote.trim()}` : "Nessuna nota operativa extra."}`;

  const defs = mergeCustomSections(defaultSections(raw.goal, raw.funnelStage, seed), custom, raw.density, seed);
  const sections: WireframeSectionBrief[] = defs.map((s, i) => ({
    ...s,
    order: i + 1,
    priority: prioFor(seed, i, raw.density),
  }));

  const navPattern =
    raw.density === "minimal"
      ? "Header slim: logo + 2 link + CTA. Footer solo link legali e social."
      : pick(
          [
            "Header sticky: logo, 4 voci max, CTA primaria a destra; footer a 3 colonne + newsletter opzionale.",
            "Header trasparente su hero che diventa solido dopo scroll (annotare breakpoint).",
          ],
          seed,
          1,
        );

  const ctaMap = [
    `Primaria: ${raw.goal === "inform" ? "Continua lettura / iscrizione newsletter" : pick(["Richiedi demo", "Inizia ora", "Acquista ora", "Scarica"], seed, 0)} (un solo colore forte).`,
    "Secondaria: scopri/prezzi/catalogo outline (ghost button).",
    pick(
      [
        "Terziaria: link testuale nella hero verso FAQ o documentazione.",
        "Terziaria: chat/widget solo se disponibile davvero — altrimenti omettere dal wireframe.",
      ],
      seed,
      3,
    ),
  ];

  let formSketch: string[] | null =
    raw.goal === "lead" || raw.goal === "signup"
      ? [
          "Nome (opzionale se brand B2C forte)",
          "Email obbligatoria",
          raw.goal === "signup" ? "Password + conferma se account" : "Telefono solo se SLA lo richiede",
          "Checkbox comunicazioni marketing separata dalla privacy policy.",
        ]
      : null;

  if (raw.goal === "sale") {
    formSketch = ["Sommario ordine collapsabile", "Indirizzo fatturazione", "Pagamento tab interazioni solo placeholder"];
  }

  const trustSignals = [
    "Spazio per certificazioni / partner (loghi in scala di grigi).",
    pick(
      [
        "Sezione testimonial con foto placeholder e ruolo aziendale.",
        "Metrica singola ad alto impatto (es. clienti attivi) — evitare più KPI che competono.",
      ],
      seed,
      4,
    ),
  ];

  const mobileNotes = [
    "Single column: nessuna tabella larga in hero; spostare comparazioni sotto piega o in sheet.",
    "Touch target minimo 44px per CTA e link in area pollice.",
    pick(
      [
        "Form: campi full width, tastiera email su primo focus.",
        "Sticky bottom bar solo se non copre form (test su device corti).",
      ],
      seed,
      5,
    ),
  ];

  const qaForStakeholder = [
    `Copy definitivo per headline «${pageOrProjectName}» o ancora working title?`,
    raw.constraintsNote.trim()
      ? `Come gestiamo in produzione i vincoli dichiarati: "${raw.constraintsNote.trim()}"?`
      : "Quali asset reali (foto, video, numeri) saranno disponibili entro la prima iterazione UI?",
    "Esiste una pagina di destinazione post-conversione già definita / misurabile?",
  ];

  return {
    pageOrProjectName,
    goal: raw.goal,
    funnelStage: raw.funnelStage,
    density: raw.density,
    summaryOneLiner,
    heroBlock: buildHero(raw.goal, raw.funnelStage, pageOrProjectName, seed),
    sections,
    navPattern,
    ctaMap,
    formSketch,
    trustSignals,
    mobileNotes,
    qaForStakeholder,
    disclaimer:
      "Brief wireframe generato in locale nel browser: è un canovaccio strutturale deterministico. Valida sempre con ricerca utenti, vincoli di marca e analytics prima dell’alta fedeltà.",
  };
}
