/**
 * Genera una palette armonica per brand da un colore seme (HSL su sRGB).
 * Tutto in locale — nessun invio di colori a server.
 */

import { flattenOnWhite, parseColorInput, relativeLuminance } from "@/lib/color-contrast-checker";

export type BrandMood = "vibrant" | "soft" | "deep";
export type AccentStrategy = "complementary" | "analogous" | "split";

export type BrandPaletteInput = {
  seedColor: string;
  mood: BrandMood;
  accentStrategy: AccentStrategy;
  /** Prefisso variabili CSS senza spazi (es. brand) */
  cssPrefix: string;
};

export type BrandSwatch = {
  token: string;
  label: string;
  hex: string;
};

export type BrandPaletteResult = {
  seedResolved: string;
  swatches: BrandSwatch[];
  cssBlock: string;
  reportText: string;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
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

function hslToRgb(h: number, s: number, l: number) {
  if (s === 0) {
    const v = clamp01(l);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hn = ((((h % 360) + 360) % 360) / 360);
  return {
    r: clamp01(hue2rgb(p, q, hn + 1 / 3)),
    g: clamp01(hue2rgb(p, q, hn)),
    b: clamp01(hue2rgb(p, q, hn - 1 / 3)),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d > 1e-8) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s, l };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (x: number) => Math.round(clamp01(x) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

function normHue(h: number) {
  return ((h % 360) + 360) % 360;
}

function suggestOnColor(bgR: number, bgG: number, bgB: number): "#FFFFFF" | "#0F172A" {
  const lum = relativeLuminance({ r: bgR, g: bgG, b: bgB, a: 1 });
  return lum > 0.45 ? "#0F172A" : "#FFFFFF";
}

function moodSatFactor(mood: BrandMood, baseS: number) {
  if (mood === "soft") return Math.min(0.5, Math.max(0.08, baseS * 0.75));
  if (mood === "vibrant") return Math.min(0.95, Math.max(0.2, baseS * 1.08 + 0.06));
  return Math.min(0.85, Math.max(0.12, baseS * 0.92));
}

function accentHue(baseH: number, strategy: AccentStrategy) {
  if (strategy === "complementary") return normHue(baseH + 180);
  if (strategy === "analogous") return normHue(baseH + 34);
  return normHue(baseH + 162);
}

function secondaryHue(baseH: number, strategy: AccentStrategy) {
  if (strategy === "analogous") return normHue(baseH - 34);
  return normHue(baseH + 52);
}

function sanitizeCssPrefix(raw: string) {
  const t = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  return t || "brand";
}

export function validateBrandPaletteInput(input: BrandPaletteInput): string | null {
  const c = parseColorInput(input.seedColor);
  if (!c.ok) return c.error;
  return null;
}

export function generateBrandPalette(input: BrandPaletteInput): BrandPaletteResult | { error: string } {
  const err = validateBrandPaletteInput(input);
  if (err) return { error: err };

  const parsed = parseColorInput(input.seedColor);
  if (!parsed.ok) return { error: parsed.error };

  const flat = flattenOnWhite(parsed.rgba);
  const { h: h0, s: s0, l: l0 } = rgbToHsl(flat.r, flat.g, flat.b);
  const seedHex = rgbToHex(flat.r, flat.g, flat.b);

  const satCore = moodSatFactor(input.mood, s0);
  const lightShift = input.mood === "deep" ? -0.04 : input.mood === "soft" ? 0.03 : 0;

  const primaryLabels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;
  const satLadder = [0.14, 0.22, 0.34, 0.52, 0.72, 1, 0.92, 0.85, 0.78, 0.7].map((m) =>
    clamp01(satCore * m * (input.mood === "soft" ? 0.85 : 1)),
  );
  satLadder[5] = satCore;

  const Lmid = clamp01(l0 + lightShift);
  const lightnessLadder = [0.97, 0.93, 0.86, 0.76, 0.66, Lmid, 0.36, 0.28, 0.2, 0.12];
  for (let i = 1; i < lightnessLadder.length; i++) {
    if (lightnessLadder[i]! >= lightnessLadder[i - 1]!) {
      lightnessLadder[i] = clamp01(lightnessLadder[i - 1]! - 0.03);
    }
  }

  const swatches: BrandSwatch[] = [];

  for (let i = 0; i < primaryLabels.length; i++) {
    const L = clamp01(lightnessLadder[i]!);
    const S = satLadder[i]!;
    const { r, g, b } = hslToRgb(h0, S, L);
    const hex = i === 5 ? seedHex : rgbToHex(r, g, b);
    swatches.push({
      token: `primary-${primaryLabels[i]}`,
      label: `Primario ${primaryLabels[i]}`,
      hex,
    });
  }

  const ah = accentHue(h0, input.accentStrategy);
  const sh = secondaryHue(h0, input.accentStrategy);
  const accentS = clamp01(satCore * 0.95);
  {
    const { r, g, b } = hslToRgb(ah, accentS, 0.52);
    swatches.push({ token: "accent", label: "Accento", hex: rgbToHex(r, g, b) });
  }
  {
    const { r, g, b } = hslToRgb(sh, clamp01(satCore * 0.88), 0.48);
    swatches.push({ token: "secondary", label: "Secondario", hex: rgbToHex(r, g, b) });
  }

  const neutralLs = [0.96, 0.88, 0.74, 0.58, 0.42, 0.28, 0.16];
  const neutralS = clamp01(satCore * 0.07 + 0.02);
  for (let i = 0; i < neutralLs.length; i++) {
    const Ln = neutralLs[i]!;
    const { r, g, b } = hslToRgb(h0, neutralS, Ln);
    swatches.push({
      token: `neutral-${(i + 1) * 100}`,
      label: `Neutro ${(i + 1) * 100}`,
      hex: rgbToHex(r, g, b),
    });
  }

  const semantic = [
    { token: "success", label: "Successo", h: 145 },
    { token: "warning", label: "Attenzione", h: 38 },
    { token: "danger", label: "Errore", h: 355 },
    { token: "info", label: "Info", h: 210 },
  ] as const;

  for (const row of semantic) {
    const sEm = 0.58;
    const lEm = 0.46;
    const { r, g, b } = hslToRgb(row.h, sEm, lEm);
    swatches.push({
      token: row.token,
      label: row.label,
      hex: rgbToHex(r, g, b),
    });
  }

  const prefix = sanitizeCssPrefix(input.cssPrefix);
  const cssLines = [":root {", ...swatches.map((s) => `  --${prefix}-${s.token}: ${s.hex};`), "}"];
  const cssBlock = cssLines.join("\n");

  const primary500 = swatches.find((s) => s.token === "primary-500")!;
  const onPrimary = suggestOnColor(flat.r, flat.g, flat.b);

  const lines = [
    "Generatore palette brand — riepilogo",
    "",
    `Colore seme (normalizzato): ${seedHex}`,
    `Mood: ${input.mood} · Accento: ${input.accentStrategy}`,
    "",
    "Suggerimento testo su primario 500:",
    `  Usa ${onPrimary} come primo piano su ${primary500.hex} (controllo euristico luminanza).`,
    "",
    "Swatch (token → HEX):",
    ...swatches.map((s) => `  ${s.token}: ${s.hex}`),
    "",
    "Blocco CSS:",
    cssBlock,
  ];

  return {
    seedResolved: seedHex,
    swatches,
    cssBlock,
    reportText: lines.join("\n"),
  };
}
