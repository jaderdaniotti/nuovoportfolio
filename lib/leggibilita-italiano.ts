/**
 * Indice Gulpease (lingua italiana, Lucisano-Piemontese 1988).
 * Formula: G = 89 + ((300 × frasi) − (10 × lettere)) / parole,
 * con lettere = caratteri alfabetici Unicode. Vedi https://it.wikipedia.org/wiki/Indice_Gulpease
 */

export type GulpeaseBand =
  | "molto-difficile"
  | "difficile-media"
  | "moderata"
  | "facile-elementare"
  | "molto-facile";

export type ItalianReadabilityResult = {
  gulpease: number;
  gulpeaseRounded: number;
  bandKey: GulpeaseBand;
  bandLabel: string;
  sentences: number;
  words: number;
  letters: number;
  avgWordsPerSentence: number;
  avgLettersPerWord: number;
  stripHtml: boolean;
  warningShortSample?: string;
};

const MIN_WORDS_RELIABLE = 14;

function stripHtmlBasic(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/giu, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ");
}

function normalizeWhitespace(s: string): string {
  return s.trim().replace(/\s+/gu, " ");
}

/** Parole Unicode allineate al keyword-density (apostrofi e trattino interni). */
function tokenizeWords(text: string): string[] {
  const m = text.match(/\p{L}[\p{L}\p{M}'’-]*|\p{N}+/gu);
  return m ?? [];
}

function countLetters(text: string): number {
  const m = text.match(/\p{L}/gu);
  return m ? m.length : 0;
}

/**
 * Spezza dopo . ! … ? (spazio obbligatorio dopo il segno, o fine testo).
 * Numeri decimali tipo 3,14 o 12.34 vengono mascherati per non creare frasi spurie.
 */
export function countSentencesRough(text: string): number {
  return splitSentencesRough(text).length;
}

export function splitSentencesRough(text: string): string[] {
  const t = normalizeWhitespace(text);
  if (!t) return [];

  const placeholders: string[] = [];
  const masked = t.replace(/(\d+[.,]\d+)/gu, (full) => {
    const idx = placeholders.length;
    placeholders.push(full);
    return `\uE000${idx}\uE001`;
  });

  const chunks = masked
    .split(/(?<=[.!?…])\s+/u)
    .map((chunk) => {
      let out = chunk.trim();
      for (let i = 0; i < placeholders.length; i++) {
        out = out.replace(`\uE000${i}\uE001`, placeholders[i]!);
      }
      return normalizeWhitespace(out);
    })
    .filter(Boolean);

  return chunks.length > 0 ? chunks : [t];
}

function gulpeaseBand(g: number): { key: GulpeaseBand; label: string } {
  if (g < 40) {
    return {
      key: "molto-difficile",
      label: "Molto difficile (tipico di testi specialistici o accademici)",
    };
  }
  if (g < 60) {
    return {
      key: "difficile-media",
      label: "Difficile per chi ha solo la licenza media",
    };
  }
  if (g < 80) {
    return {
      key: "moderata",
      label: "Moderata (adeguata a lettori con diploma)",
    };
  }
  if (g < 90) {
    return {
      key: "facile-elementare",
      label: "Abbastanza facile (comprensibile con licenza elementare)",
    };
  }
  return {
    key: "molto-facile",
    label: "Molto facile (testi brevi, parole comuni, frasi lineari)",
  };
}

export type ItalianReadabilityOptions = {
  stripHtml: boolean;
};

const DEFAULT_OPTIONS: ItalianReadabilityOptions = {
  stripHtml: true,
};

export function validateItalianReadabilityInput(text: string): { ok: true } | { ok: false; message: string } {
  const t = normalizeWhitespace(text);
  if (!t) {
    return { ok: false, message: "Incolla un testo con almeno una parola." };
  }
  return { ok: true };
}

export function analyzeItalianReadability(
  rawText: string,
  options?: Partial<ItalianReadabilityOptions>,
): ItalianReadabilityResult | null {
  const opt: ItalianReadabilityOptions = { ...DEFAULT_OPTIONS, ...options };
  let text = normalizeWhitespace(rawText);
  if (!text) return null;

  if (opt.stripHtml) {
    text = normalizeWhitespace(stripHtmlBasic(text));
  }
  if (!text) return null;

  const words = tokenizeWords(text);
  const wordCount = words.length;
  if (wordCount === 0) return null;

  const letters = countLetters(text);
  const sentences = Math.max(1, countSentencesRough(text));

  const num = 300 * sentences - 10 * letters;
  const gulpease = 89 + num / wordCount;
  const gulpeaseClamped = Math.min(100, Math.max(0, gulpease));
  const gulpeaseRounded = Math.round(gulpeaseClamped * 10) / 10;
  const band = gulpeaseBand(gulpeaseClamped);

  const warningShortSample =
    wordCount < MIN_WORDS_RELIABLE
      ? `Campione breve (meno di ${MIN_WORDS_RELIABLE} parole): l’indice è indicativo; usa almeno un paragrafo per una stima più stabile.`
      : undefined;

  return {
    gulpease: gulpeaseClamped,
    gulpeaseRounded,
    bandKey: band.key,
    bandLabel: band.label,
    sentences,
    words: wordCount,
    letters,
    avgWordsPerSentence: wordCount / sentences,
    avgLettersPerWord: letters / wordCount,
    stripHtml: opt.stripHtml,
    warningShortSample,
  };
}

export function formatItalianReadabilityReport(r: ItalianReadabilityResult): string {
  const lines = [
    `Indice Gulpease: ${r.gulpeaseRounded} / 100`,
    `Fascia: ${r.bandLabel}`,
    `Frasi (stima): ${r.sentences}; parole: ${r.words}; lettere (categoria Unicode Letter): ${r.letters}`,
    `Media parole/frase: ${r.avgWordsPerSentence.toFixed(1)}; media lettere/parola: ${r.avgLettersPerWord.toFixed(2)}`,
    `HTML rimosso: ${r.stripHtml ? "sì" : "no"}`,
  ];
  if (r.warningShortSample) lines.push(r.warningShortSample);
  return lines.join("\n");
}
