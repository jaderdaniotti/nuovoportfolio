/**
 * Stima tempo di lettura da conteggio parole e WPM (parole al minuto).
 * Token parole allineato a leggibilità/densità keyword: Unicode lettere, apostrofi e trattino interno.
 */

export const READING_TIME_ESTIMATOR_MAX_CHARS = 500_000;

export const READING_TIME_WPM_MIN = 120;
export const READING_TIME_WPM_MAX = 350;
export const READING_TIME_WPM_DEFAULT = 200;

export type ReadingTimeValidation =
  | { ok: true }
  | { ok: false; message: string };

export type ReadingTimeResult = {
  wordCount: number;
  wordsPerMinute: number;
  totalSeconds: number;
  minutesFloor: number;
  secondsRemainder: number;
  labelCompact: string;
  labelMinutesRoundedUp: string;
  stripHtml: boolean;
};

function stripHtmlBasic(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/giu, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ");
}

function normalizeWhitespace(s: string): string {
  return s.trim().replace(/\s+/gu, " ");
}

function tokenizeWords(text: string): string[] {
  const m = text.match(/\p{L}[\p{L}\p{M}'’-]*|\p{N}+/gu);
  return m ?? [];
}

export function validateReadingTimeEstimatorInput(raw: string): ReadingTimeValidation {
  const t = raw.trim();
  if (!t) {
    return { ok: false, message: "Incolla un articolo o un testo: il campo è vuoto." };
  }
  if (raw.length > READING_TIME_ESTIMATOR_MAX_CHARS) {
    return {
      ok: false,
      message: `Il testo supera ${READING_TIME_ESTIMATOR_MAX_CHARS.toLocaleString("it-IT")} caratteri. Usa un estratto o dividi in più passaggi.`,
    };
  }
  return { ok: true };
}

export function clampWordsPerMinute(wpm: number): number {
  if (!Number.isFinite(wpm)) return READING_TIME_WPM_DEFAULT;
  return Math.min(READING_TIME_WPM_MAX, Math.max(READING_TIME_WPM_MIN, Math.round(wpm)));
}

export function analyzeReadingTime(
  raw: string,
  options: { stripHtml: boolean; wordsPerMinute: number },
): ReadingTimeResult | null {
  const v = validateReadingTimeEstimatorInput(raw);
  if (!v.ok) return null;

  let text = raw;
  if (options.stripHtml) {
    text = stripHtmlBasic(raw);
  }
  text = normalizeWhitespace(text);
  const words = tokenizeWords(text);
  if (words.length === 0) {
    return null;
  }

  const wpm = clampWordsPerMinute(options.wordsPerMinute);
  const totalSeconds = Math.max(1, Math.ceil((words.length / wpm) * 60));
  const minutesFloor = Math.floor(totalSeconds / 60);
  const secondsRemainder = totalSeconds % 60;

  let labelCompact: string;
  if (totalSeconds < 60) {
    labelCompact = `${totalSeconds} s`;
  } else if (secondsRemainder === 0) {
    labelCompact = `${minutesFloor} min`;
  } else {
    labelCompact = `${minutesFloor} min ${secondsRemainder} s`;
  }

  const minutesRoundedUp = Math.max(1, Math.ceil(words.length / wpm));
  const labelMinutesRoundedUp =
    minutesRoundedUp === 1 ? "~1 min di lettura" : `~${minutesRoundedUp} min di lettura`;

  return {
    wordCount: words.length,
    wordsPerMinute: wpm,
    totalSeconds,
    minutesFloor,
    secondsRemainder,
    labelCompact,
    labelMinutesRoundedUp,
    stripHtml: options.stripHtml,
  };
}

export function formatReadingTimeReport(result: ReadingTimeResult): string {
  const lines = [
    "Stima tempo di lettura",
    `Parole conteggiate: ${result.wordCount.toLocaleString("it-IT")}`,
    `Velocità assunta: ${result.wordsPerMinute} parole/min`,
    `Durata (arrotondata al secondo): ${result.labelCompact}`,
    `Etichetta blog (minuti interi, sempre ≥1): ${result.labelMinutesRoundedUp}`,
    `Tag HTML rimossi prima del conteggio: ${result.stripHtml ? "sì" : "no"}`,
  ];
  return lines.join("\n");
}

export const SAMPLE_READING_TIME_TEXT = `La misura del tempo di lettura è utile in editorial marketing e UX: aiuta a impostare aspettative sulle lunghe guide, sulle newsletter e sulle pagine pillar senza promettere tempi irrealistici.

In italiano, le stime più usate partono da circa 180–220 parole al minuto per testi informativi su schermo; copy più tecnici o densi possono scendere verso i 160. Per headline e paragrafi brevi, il lettore scorre più in fretta, ma conviene restare conservativi e arrotondare per eccesso.

Quando incolli HTML, conviene rimuovere markup e script prima di contare le parole, così menu, attributi e widget non gonfiano artificialmente il totale. Per articoli misti con molti elenchi, il conteggio token resta una buona approssimazione rispetto al tempo effettivo.

Infine, accoppia sempre la stima con un indice di leggibilità o una revisione umana: il tempo di lettura è una metrica di supporto, non un sostituto della chiarezza del messaggio.`;
