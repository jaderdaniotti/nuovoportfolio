/** Riferimento CSS: 1in = 96px, 1in = 2.54cm, 1pt = 1/72in. */

export const CSS_PX_PER_INCH = 96;

export type CssConvertUnit =
  | "px"
  | "pt"
  | "pc"
  | "in"
  | "cm"
  | "mm"
  | "rem"
  | "em"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "%";

export type CssConvertContext = {
  /** Font-size radice per `rem` (tipico 16). */
  rootFontSizePx: number;
  /** Font-size elemento genitore per `em` e riferimento tipografico. */
  parentFontSizePx: number;
  /** Larghezza viewport per `vw`/`vmin`/`vmax` (px). */
  viewportWidthPx: number;
  /** Altezza viewport per `vh`/`vmin`/`vmax` (px). */
  viewportHeightPx: number;
  /** Lunghezza del contenitore per conversioni `%` (es. larghezza box genitore in px). */
  percentReferencePx: number;
};

const PX_PER_PT = CSS_PX_PER_INCH / 72;
const PX_PER_PC = 12 * PX_PER_PT;
const PX_PER_CM = CSS_PX_PER_INCH / 2.54;
const PX_PER_MM = CSS_PX_PER_INCH / 25.4;

export function parseCssNumericInput(raw: string): { ok: true; value: number } | { ok: false; error: string } {
  const trimmed = raw.trim().replace(",", ".");
  if (trimmed === "") {
    return { ok: false, error: "Inserisci un numero (es. 16 o 1,5)." };
  }
  const n = Number(trimmed);
  if (!Number.isFinite(n)) {
    return { ok: false, error: "Il valore non è un numero valido." };
  }
  return { ok: true, value: n };
}

/** Converte una lunghezza nota in pixel CSS secondo l’unità di partenza. */
export function cssLengthToPx(value: number, unit: CssConvertUnit, ctx: CssConvertContext): number {
  switch (unit) {
    case "px":
      return value;
    case "pt":
      return value * PX_PER_PT;
    case "pc":
      return value * PX_PER_PC;
    case "in":
      return value * CSS_PX_PER_INCH;
    case "cm":
      return value * PX_PER_CM;
    case "mm":
      return value * PX_PER_MM;
    case "rem":
      return value * ctx.rootFontSizePx;
    case "em":
      return value * ctx.parentFontSizePx;
    case "vw":
      return (value / 100) * ctx.viewportWidthPx;
    case "vh":
      return (value / 100) * ctx.viewportHeightPx;
    case "vmin": {
      const min = Math.min(ctx.viewportWidthPx, ctx.viewportHeightPx);
      return (value / 100) * min;
    }
    case "vmax": {
      const max = Math.max(ctx.viewportWidthPx, ctx.viewportHeightPx);
      return (value / 100) * max;
    }
    case "%":
      return (value / 100) * ctx.percentReferencePx;
    default: {
      const _exhaustive: never = unit;
      return _exhaustive;
    }
  }
}

/** Converte pixel CSS nell’unità richiesta. */
export function pxToCssLength(px: number, unit: CssConvertUnit, ctx: CssConvertContext): number {
  switch (unit) {
    case "px":
      return px;
    case "pt":
      return px / PX_PER_PT;
    case "pc":
      return px / PX_PER_PC;
    case "in":
      return px / CSS_PX_PER_INCH;
    case "cm":
      return px / PX_PER_CM;
    case "mm":
      return px / PX_PER_MM;
    case "rem":
      return px / ctx.rootFontSizePx;
    case "em":
      return px / ctx.parentFontSizePx;
    case "vw":
      return ctx.viewportWidthPx > 0 ? (px / ctx.viewportWidthPx) * 100 : 0;
    case "vh":
      return ctx.viewportHeightPx > 0 ? (px / ctx.viewportHeightPx) * 100 : 0;
    case "vmin": {
      const min = Math.min(ctx.viewportWidthPx, ctx.viewportHeightPx);
      return min > 0 ? (px / min) * 100 : 0;
    }
    case "vmax": {
      const max = Math.max(ctx.viewportWidthPx, ctx.viewportHeightPx);
      return max > 0 ? (px / max) * 100 : 0;
    }
    case "%":
      return ctx.percentReferencePx > 0 ? (px / ctx.percentReferencePx) * 100 : 0;
    default: {
      const _exhaustive: never = unit;
      return _exhaustive;
    }
  }
}

export function convertCssLength(
  value: number,
  from: CssConvertUnit,
  to: CssConvertUnit,
  ctx: CssConvertContext,
): number | null {
  if (ctx.rootFontSizePx <= 0 && (from === "rem" || to === "rem")) return null;
  if (ctx.parentFontSizePx <= 0 && (from === "em" || to === "em")) return null;
  if ((from === "vw" || to === "vw") && ctx.viewportWidthPx <= 0) return null;
  if ((from === "vh" || to === "vh") && ctx.viewportHeightPx <= 0) return null;
  if (
    (from === "vmin" || from === "vmax" || to === "vmin" || to === "vmax") &&
    (ctx.viewportWidthPx <= 0 || ctx.viewportHeightPx <= 0)
  ) {
    return null;
  }
  if (ctx.percentReferencePx <= 0 && (from === "%" || to === "%")) return null;

  const px = cssLengthToPx(value, from, ctx);
  return pxToCssLength(px, to, ctx);
}

export function formatCssNumber(n: number, maxDecimals = 6): string {
  if (!Number.isFinite(n)) return "";
  const rounded = Number(n.toPrecision(12));
  const s = rounded.toFixed(maxDecimals).replace(/\.?0+$/, "");
  return s === "-0" ? "0" : s;
}
