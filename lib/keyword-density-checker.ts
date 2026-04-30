function foldToken(token: string): string {
  return token.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

/** Token più stopword usate per opzione “solo parole di contenuto” (it + en, sottoinsieme comune). */
const STOPWORDS = new Set(
  [
    "a",
    "abbia",
    "ad",
    "agli",
    "ai",
    "al",
    "all",
    "alla",
    "allo",
    "anche",
    "and",
    "are",
    "as",
    "at",
    "avete",
    "aveva",
    "avevano",
    "avrebbe",
    "avrei",
    "che",
    "chi",
    "ci",
    "coi",
    "col",
    "come",
    "con",
    "cosa",
    "cui",
    "da",
    "dagli",
    "dai",
    "dal",
    "dall",
    "dalla",
    "dalle",
    "dallo",
    "dei",
    "del",
    "dell",
    "della",
    "delle",
    "dello",
    "di",
    "do",
    "does",
    "doing",
    "done",
    "dove",
    "due",
    "e",
    "è",
    "ed",
    "egli",
    "ella",
    "elli",
    "ello",
    "era",
    "erano",
    "essere",
    "farti",
    "fosse",
    "fui",
    "fuori",
    "gli",
    "ha",
    "hai",
    "hanno",
    "having",
    "ho",
    "how",
    "i",
    "il",
    "in",
    "io",
    "is",
    "it",
    "its",
    "l",
    "la",
    "le",
    "lei",
    "li",
    "lo",
    "loro",
    "lui",
    "ma",
    "me",
    "mi",
    "mia",
    "mie",
    "miei",
    "mio",
    "ne",
    "nei",
    "nel",
    "nell",
    "nella",
    "nelle",
    "nello",
    "no",
    "noi",
    "non",
    "nor",
    "not",
    "nostra",
    "nostre",
    "nostri",
    "nostro",
    "of",
    "off",
    "on",
    "or",
    "other",
    "out",
    "over",
    "per",
    "perché",
    "perchè",
    "però",
    "più",
    "poi",
    "può",
    "qua",
    "qual",
    "quale",
    "quali",
    "quanta",
    "quante",
    "quanti",
    "quanto",
    "quasi",
    "quegli",
    "quel",
    "quella",
    "quelle",
    "quelli",
    "quello",
    "quest",
    "questa",
    "queste",
    "questi",
    "questo",
    "qui",
    "quindi",
    "re",
    "s",
    "se",
    "sei",
    "si",
    "sia",
    "siamo",
    "siete",
    "sono",
    "sta",
    "stare",
    "stati",
    "stato",
    "sto",
    "su",
    "sua",
    "sub",
    "such",
    "sue",
    "sugli",
    "sui",
    "sul",
    "sull",
    "sulla",
    "sulle",
    "sullo",
    "suo",
    "suoi",
    "te",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "ti",
    "to",
    "too",
    "tra",
    "tre",
    "tu",
    "tua",
    "tue",
    "tuo",
    "tuoi",
    "tutti",
    "tutto",
    "un",
    "una",
    "uno",
    "up",
    "usa",
    "use",
    "used",
    "using",
    "va",
    "vai",
    "var",
    "ve",
    "vi",
    "voi",
    "volta",
    "volte",
    "vorrei",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "will",
    "with",
    "you",
    "your",
  ].map((w) => foldToken(w)),
);

export type KeywordDensityOptions = {
  /** Rimuove script/style e tag HTML prima dell’analisi. */
  stripHtml: boolean;
  /** Confronto token ignorando segni diacritici (à → a). */
  foldDiacritics: boolean;
  /** Denominatore = solo token non-stopword (più aderente a “densità su lessico significativo”). */
  contentWordsOnly: boolean;
};

const DEFAULT_OPTIONS: KeywordDensityOptions = {
  stripHtml: true,
  foldDiacritics: true,
  contentWordsOnly: false,
};

/** Estrae sequenze alfanumeriche / Unicode come parole (apostrofo e trattino interni consentiti). */
export function tokenizeWords(text: string): string[] {
  const m = text.match(/\p{L}[\p{L}\p{M}'’-]*|\p{N}+/gu);
  return m ?? [];
}

function stripHtmlBasic(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/giu, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ");
}

function normalizeWhitespace(s: string): string {
  return s.trim().replace(/\s+/gu, " ");
}

export function parseKeywordLines(block: string): string[] {
  const lines = block.split(/\r?\n/);
  const out: string[] = [];
  for (const line of lines) {
    const t = normalizeWhitespace(line);
    if (t) out.push(t);
  }
  return out;
}

export function countPhraseOccurrences(
  tokens: string[],
  phraseTokens: string[],
  foldDiacritics: boolean,
): number {
  if (phraseTokens.length === 0) return 0;
  const mapTok = (t: string) => (foldDiacritics ? foldToken(t) : t.toLowerCase());
  const doc = tokens.map(mapTok);
  const phrase = phraseTokens.map(mapTok);
  if (phrase.some((p) => !p)) return 0;

  let count = 0;
  const n = phrase.length;
  outer: for (let i = 0; i <= doc.length - n; i++) {
    for (let j = 0; j < n; j++) {
      if (doc[i + j] !== phrase[j]) continue outer;
    }
    count++;
  }
  return count;
}

export type KeywordDensityRow = {
  keyword: string;
  phraseTokenCount: number;
  occurrences: number;
  densityPercent: number;
};

export type KeywordDensityResult = {
  sourceWordCount: number;
  denominatorWordCount: number;
  stripHtml: boolean;
  foldDiacritics: boolean;
  contentWordsOnly: boolean;
  rows: KeywordDensityRow[];
};

export function analyzeKeywordDensity(
  rawText: string,
  keywordLines: string[],
  options?: Partial<KeywordDensityOptions>,
): KeywordDensityResult | null {
  const opt: KeywordDensityOptions = { ...DEFAULT_OPTIONS, ...options };
  let text = normalizeWhitespace(rawText);
  if (!text) return null;

  if (opt.stripHtml) {
    text = normalizeWhitespace(stripHtmlBasic(text));
  }

  const tokens = tokenizeWords(text);
  const sourceWordCount = tokens.length;
  if (sourceWordCount === 0) return null;

  const foldedForStop = tokens.map((t) => foldToken(t));
  const denominatorWordCount = opt.contentWordsOnly
    ? foldedForStop.filter((t) => !STOPWORDS.has(t)).length || 1
    : sourceWordCount;

  const keywords = keywordLines.filter((k) => normalizeWhitespace(k));
  if (keywords.length === 0) return null;

  const rows: KeywordDensityRow[] = [];
  for (const keyword of keywords) {
    const phraseTokens = tokenizeWords(normalizeWhitespace(keyword));
    const o = countPhraseOccurrences(tokens, phraseTokens, opt.foldDiacritics);
    const densityPercent = (o / denominatorWordCount) * 100;
    rows.push({
      keyword: normalizeWhitespace(keyword),
      phraseTokenCount: phraseTokens.length,
      occurrences: o,
      densityPercent,
    });
  }

  return {
    sourceWordCount,
    denominatorWordCount,
    stripHtml: opt.stripHtml,
    foldDiacritics: opt.foldDiacritics,
    contentWordsOnly: opt.contentWordsOnly,
    rows,
  };
}

export type ValidateKeywordDensityInput =
  | { ok: true }
  | { ok: false; message: string };

export function validateKeywordDensityInput(rawText: string, keywordBlock: string): ValidateKeywordDensityInput {
  const text = normalizeWhitespace(rawText);
  if (!text) {
    return { ok: false, message: "Incolla o scrivi un testo da analizzare." };
  }
  const kws = parseKeywordLines(keywordBlock);
  if (kws.length === 0) {
    return { ok: false, message: "Indica almeno una keyword o frase (una per riga)." };
  }
  return { ok: true };
}

export function formatKeywordDensityReport(result: KeywordDensityResult): string {
  const lines: string[] = [
    "Keyword density (browser, stima locale)",
    `Parole nel testo (token): ${result.sourceWordCount}`,
    `Denominatore usato: ${result.contentWordsOnly ? "solo parole di contenuto (no stopword comuni)" : "tutte le parole"} → ${result.denominatorWordCount}`,
    `HTML rimosso: ${result.stripHtml ? "sì" : "no"}; match ignora diacritici: ${result.foldDiacritics ? "sì" : "no"}`,
    "",
  ];
  for (const row of result.rows) {
    lines.push(
      `• “${row.keyword}” → occorrenze: ${row.occurrences}, token nella frase: ${row.phraseTokenCount}, densità ≈ ${row.densityPercent.toFixed(2)}%`,
    );
  }
  lines.push(
    "",
    "Nota: la densità non determina da sola il ranking; usala come controllo qualità, non come obiettivo numerico fisso.",
  );
  return lines.join("\n");
}
