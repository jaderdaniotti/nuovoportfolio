"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  convertCssLength,
  formatCssNumber,
  parseCssNumericInput,
  type CssConvertContext,
  type CssConvertUnit,
} from "@/lib/convertitore-unita-css";

const UNITS: { value: CssConvertUnit; label: string }[] = [
  { value: "px", label: "px — pixel" },
  { value: "pt", label: "pt — punti (1/72 in)" },
  { value: "pc", label: "pc — pica (12 pt)" },
  { value: "in", label: "in — pollici" },
  { value: "cm", label: "cm — centimetri" },
  { value: "mm", label: "mm — millimetri" },
  { value: "rem", label: "rem — relativo a :root" },
  { value: "em", label: "em — relativo al genitore" },
  { value: "vw", label: "vw — 1% larghezza viewport" },
  { value: "vh", label: "vh — 1% altezza viewport" },
  { value: "vmin", label: "vmin — 1% lato minore viewport" },
  { value: "vmax", label: "vmax — 1% lato maggiore viewport" },
  { value: "%", label: "% — del riferimento sotto" },
];

function readViewport() {
  if (typeof window === "undefined") return { w: 0, h: 0 };
  return { w: window.innerWidth, h: window.innerHeight };
}

export function ToolConvertitoreUnitaCss() {
  const [rawValue, setRawValue] = useState("16");
  const [fromUnit, setFromUnit] = useState<CssConvertUnit>("px");
  const [toUnit, setToUnit] = useState<CssConvertUnit>("rem");
  const [rootPx, setRootPx] = useState("16");
  const [parentPx, setParentPx] = useState("16");
  const [percentRefPx, setPercentRefPx] = useState("375");
  const [copied, setCopied] = useState(false);
  const [vp, setVp] = useState(readViewport);

  useEffect(() => {
    setVp(readViewport());
    const onResize = () => setVp(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rootNum = parseCssNumericInput(rootPx);
  const parentNum = parseCssNumericInput(parentPx);
  const pctNum = parseCssNumericInput(percentRefPx);

  const ctx: CssConvertContext | null = useMemo(() => {
    if (!rootNum.ok || !parentNum.ok || !pctNum.ok) return null;
    return {
      rootFontSizePx: rootNum.value,
      parentFontSizePx: parentNum.value,
      viewportWidthPx: vp.w,
      viewportHeightPx: vp.h,
      percentReferencePx: Math.max(0, pctNum.value),
    };
  }, [rootNum, parentNum, pctNum, vp.w, vp.h]);

  const parsedValue = parseCssNumericInput(rawValue);

  const result = useMemo(() => {
    if (!ctx || !parsedValue.ok) return { text: "", error: null as string | null };
    const out = convertCssLength(parsedValue.value, fromUnit, toUnit, ctx);
    if (out === null) {
      return {
        text: "",
        error:
          "Controlla i riferimenti: per rem/em serve font-size > 0; per viewport, apri lo strumento da un layout visibile (finestra > 0); per % serve lunghezza di riferimento > 0.",
      };
    }
    return { text: formatCssNumber(out), error: null as string | null };
  }, [ctx, parsedValue, fromUnit, toUnit]);

  const copyOutput = useCallback(async () => {
    if (!result.text || result.error) return;
    const withUnit = `${result.text}${toUnit}`;
    try {
      await navigator.clipboard.writeText(withUnit);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [result.error, result.text, toUnit]);

  const swapUnits = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  const loadExample = useCallback(() => {
    setRawValue("1");
    setFromUnit("rem");
    setToUnit("px");
    setRootPx("16");
    setParentPx("16");
    setPercentRefPx("1200");
  }, []);

  const ctxIssue =
    !rootNum.ok || !parentNum.ok || !pctNum.ok
      ? "Imposta numeri validi per root, genitore e riferimento %."
      : null;

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-violet-50/80 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Come funziona</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Converte tra unità CSS di lunghezza usate in <code className="rounded bg-zinc-100 px-1 text-xs">font-size</code>
          , <code className="rounded bg-zinc-100 px-1 text-xs">width</code>,{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">margin</code> ecc. Le unità assolute (
          <strong>px</strong>, <strong>pt</strong>, <strong>pc</strong>, <strong>in</strong>, <strong>cm</strong>,{" "}
          <strong>mm</strong>) seguono il modello di riferimento <strong>96px = 1in</strong>.{" "}
          <strong>rem</strong> moltiplica il font-size di <code className="rounded bg-zinc-100 px-1 text-xs">:root</code>
          ; <strong>em</strong> quello dell’elemento genitore (qui configurabile).{" "}
          <strong>vw</strong>/<strong>vh</strong>/<strong>vmin</strong>/<strong>vmax</strong> usano la finestra del
          browser corrente. Per <strong>%</strong> indica la lunghezza di riferimento (es. larghezza contenitore in px).
          Tutto è calcolato nel browser.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Viewport rilevato: {vp.w}×{vp.h}px
          {vp.w === 0 ? " — ridimensiona o attendi il layout se vedi zeri." : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600">
          Font-size :root (px)
          <input
            type="text"
            inputMode="decimal"
            value={rootPx}
            onChange={(e) => setRootPx(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600">
          Font-size genitore / em (px)
          <input
            type="text"
            inputMode="decimal"
            value={parentPx}
            onChange={(e) => setParentPx(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600">
          Riferimento per % (px)
          <input
            type="text"
            inputMode="decimal"
            value={percentRefPx}
            onChange={(e) => setPercentRefPx(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-medium text-zinc-600">
          Valore
          <input
            type="text"
            inputMode="decimal"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            placeholder="es. 16 o 1,25"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          />
        </label>
        <label className="flex min-w-[160px] flex-col gap-1 text-xs font-medium text-zinc-600">
          Da
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as CssConvertUnit)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={swapUnits}
          className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400"
          aria-label="Scambia unità da e a"
        >
          ⇄
        </button>
        <label className="flex min-w-[160px] flex-col gap-1 text-xs font-medium text-zinc-600">
          A
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as CssConvertUnit)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={loadExample}
          className="ml-auto rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Esempio 1rem→px
        </button>
      </div>

      {ctxIssue ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{ctxIssue}</p>
      ) : !parsedValue.ok ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {parsedValue.error}
        </p>
      ) : result.error ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {result.error}
        </p>
      ) : (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">Risultato</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-emerald-950">
            {result.text}
            <span className="text-lg font-sans font-medium text-emerald-900">{toUnit}</span>
          </p>
          <p className="mt-1 text-sm text-emerald-900/90">
            {formatCssNumber(parsedValue.value)}
            {fromUnit} equivalenti a {result.text}
            {toUnit}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full border border-emerald-600 bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              {copied ? "Copiato" : `Copia valore (${result.text}${toUnit})`}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
