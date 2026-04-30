/**
 * WCAG 2.x contrast (relative luminance sRGB).
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

export type Rgba = { r: number; g: number; b: number; a: number };

export type ParseColorResult =
  | { ok: true; rgba: Rgba; hadAlpha: boolean }
  | { ok: false; error: string };

export type ContrastLevelKey = "aaNormal" | "aaLarge" | "aaaNormal" | "aaaLarge";

export type ContrastAnalysis = {
  ratio: number;
  /** Lighter and darker relative luminance (opaque, 0–1). */
  lumLight: number;
  lumDark: number;
  /** Colors used after flattening alpha on white (for display & luminance). */
  fgOpaque: Rgba;
  bgOpaque: Rgba;
  flattenedNote: boolean;
  passes: Record<ContrastLevelKey, boolean>;
  reportText: string;
};

const NAMED_COLORS: Record<string, string> = {
  transparent: "#00000000",
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  gray: "#808080",
  grey: "#808080",
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function expandHex3(h: string) {
  if (h.length === 3) {
    return `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  if (h.length === 4) {
    return `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  }
  return h;
}

function parseHexChannel(raw: string): ParseColorResult {
  const t = raw.trim();
  if (!t.startsWith("#")) {
    return { ok: false, error: 'Formato hex atteso: inizia con "#".' };
  }
  const body = t.slice(1);
  if (!/^(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(body)) {
    return { ok: false, error: "Hex non valido (usa #RGB, #RRGGBB o #RRGGBBAA)." };
  }
  const exp = expandHex3(body.toLowerCase());
  const r = Number.parseInt(exp.slice(0, 2), 16) / 255;
  const g = Number.parseInt(exp.slice(2, 4), 16) / 255;
  const b = Number.parseInt(exp.slice(4, 6), 16) / 255;
  const a = exp.length >= 8 ? Number.parseInt(exp.slice(6, 8), 16) / 255 : 1;
  if ([r, g, b, a].some((x) => Number.isNaN(x))) {
    return { ok: false, error: "Hex non valido." };
  }
  return { ok: true, rgba: { r, g, b, a: clamp01(a) }, hadAlpha: a < 1 };
}

function parsePercentOrUnit(token: string, max = 255) {
  const s = token.trim();
  if (s.endsWith("%")) {
    const n = Number.parseFloat(s.slice(0, -1));
    if (Number.isNaN(n)) return null;
    return clamp01(n / 100);
  }
  const n = Number.parseFloat(s);
  if (Number.isNaN(n)) return null;
  return max === 1 ? clamp01(n) : clamp01(n / max);
}

/** rgb()/rgba() con virgole o spazi, alpha opzionale con / o quarta virgola. */
function parseRgbFunction(inner: string): ParseColorResult {
  const norm = inner.replace(/\s+/g, " ").trim();
  const partsSlash = norm.split(/\s*\/\s*/);
  const main = partsSlash[0] ?? "";
  const alphaPart = partsSlash[1]?.trim();

  let tokens: string[];
  if (main.includes(",")) {
    tokens = main.split(",").map((x) => x.trim());
  } else {
    tokens = main.split(" ").filter(Boolean);
  }

  if (tokens.length < 3) {
    return { ok: false, error: "rgb(): servono almeno tre componenti." };
  }

  const r = parsePercentOrUnit(tokens[0]!, 255);
  const g = parsePercentOrUnit(tokens[1]!, 255);
  const b = parsePercentOrUnit(tokens[2]!, 255);
  if (r === null || g === null || b === null) {
    return { ok: false, error: "rgb(): valori numerici non validi." };
  }

  let a = 1;
  if (alphaPart !== undefined) {
    const ap = parsePercentOrUnit(alphaPart, 1);
    if (ap === null) return { ok: false, error: "rgb(): alpha non valido." };
    a = ap;
  } else if (tokens.length >= 4) {
    const ap = parsePercentOrUnit(tokens[3]!, 1);
    if (ap === null) return { ok: false, error: "rgb(): alpha non valido." };
    a = ap;
  }

  return { ok: true, rgba: { r, g, b, a: clamp01(a) }, hadAlpha: a < 1 };
}

function hue2rgb(p: number, q: number, t: number) {
  let tt = t;
  if (tt < 0) tt += 1;
  if (tt > 1) tt -= 1;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  if (s === 0) {
    const v = clamp01(l);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hn = ((h % 360) + 360) % 360 / 360;
  return {
    r: clamp01(hue2rgb(p, q, hn + 1 / 3)),
    g: clamp01(hue2rgb(p, q, hn)),
    b: clamp01(hue2rgb(p, q, hn - 1 / 3)),
  };
}

function parseHslFunction(inner: string): ParseColorResult {
  const norm = inner.replace(/\s+/g, " ").trim();
  const partsSlash = norm.split(/\s*\/\s*/);
  const main = partsSlash[0] ?? "";
  const alphaPart = partsSlash[1]?.trim();

  let tokens: string[];
  if (main.includes(",")) {
    tokens = main.split(",").map((x) => x.trim());
  } else {
    tokens = main.split(" ").filter(Boolean);
  }

  if (tokens.length < 3) {
    return { ok: false, error: "hsl(): servono almeno tre componenti." };
  }

  const hRaw = Number.parseFloat(tokens[0]!.replace("deg", "").trim());
  const sTok = tokens[1]!.trim();
  const lTok = tokens[2]!.trim();
  if (Number.isNaN(hRaw)) {
    return { ok: false, error: "hsl(): hue non valido." };
  }
  const parseHslSl = (tok: string) => {
    if (tok.endsWith("%")) return parsePercentOrUnit(tok, 1);
    const n = Number.parseFloat(tok);
    if (Number.isNaN(n)) return null;
    return clamp01(n / 100);
  };
  const s = parseHslSl(sTok);
  const l = parseHslSl(lTok);
  if (s === null || l === null) {
    return { ok: false, error: "hsl(): saturazione o luminosità non valide." };
  }

  let a = 1;
  if (alphaPart !== undefined) {
    const ap = parsePercentOrUnit(alphaPart, 1);
    if (ap === null) return { ok: false, error: "hsl(): alpha non valido." };
    a = ap;
  } else if (tokens.length >= 4) {
    const ap = parsePercentOrUnit(tokens[3]!, 1);
    if (ap === null) return { ok: false, error: "hsl(): alpha non valido." };
    a = ap;
  }

  const { r, g, b } = hslToRgb(hRaw, s, l);
  return { ok: true, rgba: { r, g, b, a: clamp01(a) }, hadAlpha: a < 1 };
}

export function parseColorInput(raw: string): ParseColorResult {
  const s = raw.trim();
  if (!s) {
    return { ok: false, error: "Colore vuoto." };
  }

  const lower = s.toLowerCase();
  if (NAMED_COLORS[lower]) {
    return parseHexChannel(NAMED_COLORS[lower]!);
  }

  if (lower.startsWith("#")) {
    return parseHexChannel(lower);
  }

  const mRgb = /^rgba?\(\s*(.+)\)$/i.exec(s);
  if (mRgb) {
    return parseRgbFunction(mRgb[1]!);
  }

  const mHsl = /^hsla?\(\s*(.+)\)$/i.exec(s);
  if (mHsl) {
    return parseHslFunction(mHsl[1]!);
  }

  return {
    ok: false,
    error: 'Formato non riconosciuto. Usa #RRGGBB, rgb(), rgba(), hsl() o hsla().',
  };
}

/** Composita canale sRGB su bianco (background sotto colore semi-trasparente). */
export function flattenOnWhite(c: Rgba): Rgba {
  const a = clamp01(c.a);
  return {
    r: clamp01(c.r * a + (1 - a)),
    g: clamp01(c.g * a + (1 - a)),
    b: clamp01(c.b * a + (1 - a)),
    a: 1,
  };
}

function linearizeChannel(u: number) {
  return u <= 0.03928 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(c: Rgba): number {
  const r = linearizeChannel(clamp01(c.r));
  const g = linearizeChannel(clamp01(c.g));
  const b = linearizeChannel(clamp01(c.b));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(l1: number, l2: number): number {
  const a = Math.max(l1, l2);
  const b = Math.min(l1, l2);
  return (a + 0.05) / (b + 0.05);
}

const THRESHOLDS: Record<ContrastLevelKey, number> = {
  aaNormal: 4.5,
  aaLarge: 3,
  aaaNormal: 7,
  aaaLarge: 4.5,
};

export function analyzeContrastPair(fgRaw: string, bgRaw: string): ContrastAnalysis | { error: string } {
  const fgP = parseColorInput(fgRaw);
  const bgP = parseColorInput(bgRaw);
  if (!fgP.ok) return { error: `Primo colore (testo): ${fgP.error}` };
  if (!bgP.ok) return { error: `Secondo colore (sfondo): ${bgP.error}` };

  const flattenedNote = fgP.hadAlpha || bgP.hadAlpha;
  const fgOpaque = flattenOnWhite(fgP.rgba);
  const bgOpaque = flattenOnWhite(bgP.rgba);

  const lumFg = relativeLuminance(fgOpaque);
  const lumBg = relativeLuminance(bgOpaque);
  const ratio = contrastRatio(lumFg, lumBg);
  const lumLight = Math.max(lumFg, lumBg);
  const lumDark = Math.min(lumFg, lumBg);

  const passes = {
    aaNormal: ratio >= THRESHOLDS.aaNormal,
    aaLarge: ratio >= THRESHOLDS.aaLarge,
    aaaNormal: ratio >= THRESHOLDS.aaaNormal,
    aaaLarge: ratio >= THRESHOLDS.aaaLarge,
  };

  const lines = [
    "Color contrast checker — riepilogo WCAG 2.x",
    "",
    `Rapporto di contrasto: ${ratio.toFixed(2)}:1`,
    flattenedNote
      ? "Nota: almeno un colore aveva alpha < 1 — valori compositi su bianco per la stima."
      : null,
    "",
    "Soglie:",
    `  AA testo normale (≥4.5:1): ${passes.aaNormal ? "OK" : "NO"}`,
    `  AA testo grande/grassetto (≥3:1): ${passes.aaLarge ? "OK" : "NO"}`,
    `  AAA testo normale (≥7:1): ${passes.aaaNormal ? "OK" : "NO"}`,
    `  AAA testo grande (≥4.5:1): ${passes.aaaLarge ? "OK" : "NO"}`,
    "",
    "Luminanze relative (post flatten):",
    `  Primo colore (testo): ${lumFg.toFixed(4)}`,
    `  Secondo colore (sfondo): ${lumBg.toFixed(4)}`,
  ].filter(Boolean) as string[];

  return {
    ratio,
    lumLight,
    lumDark,
    fgOpaque,
    bgOpaque,
    flattenedNote,
    passes,
    reportText: lines.join("\n"),
  };
}

export function rgbaToCss(rgba: Rgba) {
  const r = Math.round(clamp01(rgba.r) * 255);
  const g = Math.round(clamp01(rgba.g) * 255);
  const b = Math.round(clamp01(rgba.b) * 255);
  const a = clamp01(rgba.a);
  return a >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}
