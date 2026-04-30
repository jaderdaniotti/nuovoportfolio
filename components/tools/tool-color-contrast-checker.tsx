"use client";

import { useCallback, useMemo, useState } from "react";
import {
  analyzeContrastPair,
  type ContrastAnalysis,
  flattenOnWhite,
  parseColorInput,
  rgbaToCss,
  relativeLuminance,
} from "@/lib/color-contrast-checker";

const SAMPLE_FG = "#111827";
const SAMPLE_BG = "#f9fafb";
const SAMPLE_BAD_FG = "#9ca3af";
const SAMPLE_BAD_BG = "#f3f4f6";

function hexFromOpaqueForPicker(raw: string, fallback: string) {
  const p = parseColorInput(raw);
  if (!p.ok) return fallback;
  const flat = flattenOnWhite(p.rgba);
  const r = Math.round(flat.r * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(flat.g * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(flat.b * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

function PassBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        ok ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-zinc-200 bg-zinc-100 text-zinc-600"
      }`}
    >
      {label}: {ok ? "Superato" : "Sotto soglia"}
    </span>
  );
}

export function ToolColorContrastChecker() {
  const [fg, setFg] = useState(SAMPLE_FG);
  const [bg, setBg] = useState(SAMPLE_BG);

  const analysis = useMemo(() => {
    const tFg = fg.trim();
    const tBg = bg.trim();
    if (!tFg || !tBg) {
      return { kind: "empty" as const };
    }
    const r = analyzeContrastPair(tFg, tBg);
    if ("error" in r && r.error) {
      return { kind: "error" as const, message: r.error };
    }
    return { kind: "ok" as const, data: r as ContrastAnalysis };
  }, [fg, bg]);

  const pickerFg = useMemo(() => hexFromOpaqueForPicker(fg, "#111827"), [fg]);
  const pickerBg = useMemo(() => hexFromOpaqueForPicker(bg, "#ffffff"), [bg]);

  const copyReport = useCallback(async () => {
    if (analysis.kind !== "ok") return;
    try {
      await navigator.clipboard.writeText(analysis.data.reportText);
    } catch {
      /* ignore */
    }
  }, [analysis]);

  const swap = useCallback(() => {
    setFg(bg);
    setBg(fg);
  }, [fg, bg]);

  let previewFgCss = SAMPLE_FG;
  let previewBgCss = SAMPLE_BG;
  if (analysis.kind === "ok") {
    previewFgCss = rgbaToCss(analysis.data.fgOpaque);
    previewBgCss = rgbaToCss(analysis.data.bgOpaque);
  }

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Contrasto colori WCAG</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Calcola nel browser il{" "}
          <strong className="font-semibold text-zinc-900">rapporto di contrasto</strong> tra colore primo piano (tipicamente{" "}
          testo) e sfondo secondo la formula di luminanza relativa sRGB delle linee guida WCAG&nbsp;2.x. Supporta{" "}
          <span className="font-mono text-xs text-indigo-800">#RRGGBB</span>,{" "}
          <span className="font-mono text-xs text-indigo-800">rgb()</span>/<span className="font-mono text-xs text-indigo-800">rgba()</span>{" "}
          e{" "}
          <span className="font-mono text-xs text-indigo-800">hsl()</span>. Con alpha&nbsp;&lt;&nbsp;1 i colori sono{" "}
          <strong className="font-semibold text-zinc-900">compositi su bianco</strong> per stimare luminanza (come da nota nei
          risultati). Il testo grande in WCAG corrisponde a circa 14pt grassetto o 18pt regolare.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="cc-fg" className="text-sm font-medium text-zinc-800">
            Primo piano (testo / elemento)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="cc-fg-picker"
              type="color"
              value={pickerFg}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-zinc-300 bg-white p-1 shadow-sm"
              title="Selezione rapida hex opaco"
              aria-label="Color picker primo piano"
            />
            <input
              id="cc-fg"
              type="text"
              spellCheck={false}
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="min-w-[12rem] flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-offset-2 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="#111827 o rgb(17,24,39)"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="cc-bg" className="text-sm font-medium text-zinc-800">
            Sfondo
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="cc-bg-picker"
              type="color"
              value={pickerBg}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-zinc-300 bg-white p-1 shadow-sm"
              title="Selezione rapida hex opaco"
              aria-label="Color picker sfondo"
            />
            <input
              id="cc-bg"
              type="text"
              spellCheck={false}
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="min-w-[12rem] flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-offset-2 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="#f9fafb"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={swap}
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-indigo-400 hover:text-zinc-900"
        >
          Scambia primo piano ⇄ sfondo
        </button>
        <button
          type="button"
          onClick={() => {
            setFg(SAMPLE_FG);
            setBg(SAMPLE_BG);
          }}
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-indigo-400 hover:text-zinc-900"
        >
          Esempi leggibili
        </button>
        <button
          type="button"
          onClick={() => {
            setFg(SAMPLE_BAD_FG);
            setBg(SAMPLE_BAD_BG);
          }}
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-indigo-400 hover:text-zinc-900"
        >
          Esempio sotto AA
        </button>
      </div>

      <div
        className="rounded-xl border-2 border-dashed border-zinc-300 p-6 shadow-inner md:p-8"
        style={{ backgroundColor: previewBgCss, color: previewFgCss }}
      >
        <p className="text-balance text-lg font-semibold leading-snug md:text-xl" style={{ color: previewFgCss }}>
          Anteprima testo lungo sullo sfondo scelto
        </p>
        <p className="mt-3 max-w-prose text-sm leading-relaxed opacity-95 md:text-base" style={{ color: previewFgCss }}>
          Controllare il contrasto riduce attrito per utenti ipovedenti e in condizioni di luce forte. Preferisci combinazioni che
          superino 4.5:1 per corpi piccoli e 3:1 per titoli molto grandi o grassetto corpo aumentato.
        </p>
      </div>

      {analysis.kind === "empty" ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          Inserisci entrambi i colori per calcolare il rapporto WCAG.
        </div>
      ) : analysis.kind === "error" ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{analysis.message}</div>
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Rapporto di contrasto</p>
              <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-zinc-900">
                {analysis.data.ratio.toFixed(2)}
                <span className="text-lg font-semibold text-zinc-600"> :1</span>
              </p>
              {analysis.data.flattenedNote ? (
                <p className="mt-2 max-w-xl text-xs text-amber-800">
                  Alpha &lt; 1: luminanza stimata dopo composizione su bianco per entrambi i campioni.
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-medium text-zinc-800 transition hover:border-indigo-400 hover:text-zinc-950"
            >
              Copia report
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <PassBadge ok={analysis.data.passes.aaNormal} label="AA testo normale (4.5)" />
            <PassBadge ok={analysis.data.passes.aaLarge} label="AA testo grande (3)" />
            <PassBadge ok={analysis.data.passes.aaaNormal} label="AAA normale (7)" />
            <PassBadge ok={analysis.data.passes.aaaLarge} label="AAA grande (4.5)" />
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm text-zinc-700">
            <p className="font-semibold text-zinc-900">Luminanza relativa (dopo flatten)</p>
            <dl className="mt-2 grid gap-2 font-mono text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Primo piano</dt>
                <dd
                  className="flex flex-1 items-center gap-2 rounded border border-zinc-200 bg-white px-2 py-1"
                  title={rgbaToCss(analysis.data.fgOpaque)}
                >
                  <span
                    className="inline-block size-6 shrink-0 rounded border border-zinc-300"
                    style={{ backgroundColor: previewFgCss }}
                    aria-hidden
                  />
                  <span>
                    FG L = {relativeLuminance(analysis.data.fgOpaque).toFixed(4)}
                  </span>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Sfondo</dt>
                <dd
                  className="flex flex-1 items-center gap-2 rounded border border-zinc-200 bg-white px-2 py-1"
                  title={rgbaToCss(analysis.data.bgOpaque)}
                >
                  <span
                    className="inline-block size-6 shrink-0 rounded border border-zinc-300"
                    style={{ backgroundColor: previewBgCss }}
                    aria-hidden
                  />
                  <span>
                    BG L = {relativeLuminance(analysis.data.bgOpaque).toFixed(4)}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </section>
  );
}
