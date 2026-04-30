/** Client-safe password generation & strength heuristic (entropy + pattern penalties). */

const LOWER_ALL = "abcdefghijklmnopqrstuvwxyz";
const UPPER_ALL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS_ALL = "0123456789";
/** Printable ASCII punctuation common in passwords (no space). */
const SYMBOLS_ALL = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

/** Chars often confused (0/O, 1/l/I, etc.). */
const AMBIGUOUS = new Set("0OoilI1!");

export type GeneratorOptions = {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
};

export type GenerateResult =
  | { ok: true; password: string }
  | { ok: false; error: string };

function stripAmbiguous(chars: string): string {
  return [...chars].filter((c) => !AMBIGUOUS.has(c)).join("");
}

function charsetFor(kind: "lower" | "upper" | "digits" | "symbols", excludeAmbiguous: boolean): string {
  const sets = {
    lower: excludeAmbiguous ? stripAmbiguous(LOWER_ALL) : LOWER_ALL,
    upper: excludeAmbiguous ? stripAmbiguous(UPPER_ALL) : UPPER_ALL,
    digits: excludeAmbiguous ? stripAmbiguous(DIGITS_ALL) : DIGITS_ALL,
    symbols: excludeAmbiguous ? stripAmbiguous(SYMBOLS_ALL) : SYMBOLS_ALL,
  };
  return sets[kind];
}

function randomIndex(maxExclusive: number): number {
  if (maxExclusive <= 0) throw new RangeError("maxExclusive must be positive");
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x1_0000_0000 / maxExclusive) * maxExclusive;
  // Rejection sampling: uniform index in [0, maxExclusive)
  for (;;) {
    crypto.getRandomValues(buf);
    const x = buf[0];
    if (x < limit) return x % maxExclusive;
  }
}

function pickChar(pool: string): string {
  if (!pool.length) throw new RangeError("empty charset");
  const i = randomIndex(pool.length);
  const ch = pool[i];
  if (ch === undefined) throw new RangeError("bad index");
  return ch;
}

/** Minimum length needed so each enabled class can appear at least once. */
export function minimumLengthFor(opts: GeneratorOptions): number {
  let n = 0;
  if (opts.lowercase) n++;
  if (opts.uppercase) n++;
  if (opts.digits) n++;
  if (opts.symbols) n++;
  return Math.max(4, n);
}

type BucketPack = { buckets: string[]; pooled: string };

/** Build pooled charset array for generator. Returns error if selection empty. */
function buildBuckets(opts: GeneratorOptions): GenerateResult | BucketPack {
  const ex = opts.excludeAmbiguous;
  const buckets: string[] = [];
  if (opts.lowercase) {
    const s = charsetFor("lower", ex);
    if (s.length) buckets.push(s);
  }
  if (opts.uppercase) {
    const s = charsetFor("upper", ex);
    if (s.length) buckets.push(s);
  }
  if (opts.digits) {
    const s = charsetFor("digits", ex);
    if (s.length) buckets.push(s);
  }
  if (opts.symbols) {
    const s = charsetFor("symbols", ex);
    if (s.length) buckets.push(s);
  }
  if (buckets.length === 0) {
    return { ok: false, error: "Seleziona almeno una categoria di caratteri." };
  }
  const pooled = [...new Set(buckets.join(""))].join("");
  if (!pooled.length) {
    return { ok: false, error: "Con i filtri impostati non restano caratteri disponibili." };
  }
  return { buckets, pooled };
}

function shuffleChars(chars: string[]): void {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    const tmp = chars[i];
    const cur = chars[j];
    chars[i] = cur ?? "";
    chars[j] = tmp ?? "";
  }
}

export function generatePassword(opts: GeneratorOptions): GenerateResult {
  const mb = minimumLengthFor(opts);
  if (opts.length < mb) {
    return {
      ok: false,
      error: `La lunghezza minima è ${mb} caratteri con le categorie selezionate.`,
    };
  }
  if (opts.length > 128) {
    return { ok: false, error: "Lunghezza massima 128 caratteri." };
  }

  const built = buildBuckets(opts);
  if ("ok" in built) return built;
  const { buckets, pooled } = built;

  const length = opts.length;
  const out: string[] = [];

  for (const b of buckets) {
    out.push(pickChar(b));
  }
  while (out.length < length) {
    out.push(pickChar(pooled));
  }
  shuffleChars(out);
  return { ok: true, password: out.join("") };
}

const COMMON_SUBSTRINGS = [
  "password",
  "qwerty",
  "asdf",
  "12345",
  "admin",
  "welcome",
  "letmein",
  "monkey",
  "dragon",
  "football",
  "iloveyou",
  "master",
  "sunshine",
  "princess",
  "passw",
  "abc123",
  "123456",
  "0000",
];

function poolSizeForPassword(pwd: string): number {
  let n = 0;
  if (/[a-z]/.test(pwd)) n += 26;
  if (/[A-Z]/.test(pwd)) n += 26;
  if (/[0-9]/.test(pwd)) n += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) n += 33;
  return n || 1;
}

function sequentialPenalty(pwd: string): number {
  let pen = 0;
  const lower = pwd.toLowerCase();
  for (const bad of COMMON_SUBSTRINGS) {
    if (lower.includes(bad)) pen += 18;
  }
  for (let i = 0; i < lower.length - 2; i++) {
    const a = lower.codePointAt(i);
    const b = lower.codePointAt(i + 1);
    const c = lower.codePointAt(i + 2);
    if (a === undefined || b === undefined || c === undefined) continue;
    if (b === a + 1 && c === b + 1) pen += 6;
    if (b === a - 1 && c === b - 1) pen += 6;
  }
  return Math.min(pen, 40);
}

export type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  entropyBits: number;
  hints: string[];
};

export function analyzePasswordStrength(password: string): StrengthResult {
  const pwd = password;
  if (!pwd.length) {
    return { score: 0, label: "Vuota", entropyBits: 0, hints: ["Inserisci una password per valutarla."] };
  }

  const pool = poolSizeForPassword(pwd);
  const rawEntropy = pwd.length * Math.log2(pool);

  const unique = new Set([...pwd]).size;
  const repeatRatio = 1 - unique / pwd.length;
  const repeatPenalty = repeatRatio > 0.35 ? repeatRatio * 28 : repeatRatio * 12;

  const seqPen = sequentialPenalty(pwd);
  let entropyBits = rawEntropy - repeatPenalty - seqPen;

  const improve: string[] = [];
  if (pwd.length < 10)
    improve.push("Allunga a almeno 12–16 caratteri per gli account sensibili.");
  if (!/[a-z]/.test(pwd)) improve.push("Aggiungi lettere minuscole.");
  if (!/[A-Z]/.test(pwd)) improve.push("Aggiungi lettere maiuscole.");
  if (!/[0-9]/.test(pwd)) improve.push("Aggiungi numeri.");
  if (!/[^a-zA-Z0-9]/.test(pwd)) improve.push("Aggiungi simboli o punteggiatura.");
  if (repeatRatio > 0.4) improve.push("Riduci caratteri ripetuti ravvicinati.");
  if (seqPen > 0) improve.push("Evita sequenze o parole banali (tipo “123”, “qwerty”).");

  entropyBits = Math.max(0, entropyBits);

  const hints =
    improve.length > 0
      ? improve.slice(0, 5)
      : ["Ottimo equilibrio tra lunghezza e varietà di simboli."];

  let score: 0 | 1 | 2 | 3 | 4 = 0;
  let label = "Molto debole";
  if (entropyBits < 28) {
    score = 0;
    label = "Molto debole";
  } else if (entropyBits < 38) {
    score = 1;
    label = "Debole";
  } else if (entropyBits < 55) {
    score = 2;
    label = "Media";
  } else if (entropyBits < 80) {
    score = 3;
    label = "Robusta";
  } else {
    score = 4;
    label = "Molto robusta";
  }

  return { score, label, entropyBits: Math.round(entropyBits * 10) / 10, hints };
}
