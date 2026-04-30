"use client";

import { useCallback, useMemo, useState } from "react";
import {
  generateBrandPalette,
  type AccentStrategy,
  type BrandMood,
  validateBrandPaletteInput,
} from "@/lib/palette-generator-brand";
import { flattenOnWhite, parseColorInput } from "@/lib/color-contrast-checker";

const SAMPLE_SEED = "#6366F1";

function hexForPicker(raw: string, fallback: string) {
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
  return `#${r}${g}${b}`.toUpperCase();
}

export function ToolPaletteGeneratorBrand() {
  const [seed, setSeed] = useState(SAMPLE_SEED);
  const [mood, setMood] = useState<BrandMood>("vibrant");
  const [accentStrategy, setAccentStrategy] = useState<AccentStrategy>("complementary");
  const [cssPrefix, setCssPrefix] = useState("brand");
  const [copyFlash, setCopyFlash] = useState<string | null>(null);

  const result = useMemo(() => {
    const err = validateBrandPaletteInput({ seedColor: seed, mood, accentStrategy, cssPrefix });
    if (err) return { kind: "error" as const, message: err };
    const data = generateBrandPalette({ seedColor: seed, mood, accentStrategy, cssPrefix });
    if ("error" in data) return { kind: "error" as const, message: data.error };
    return { kind: "ok" as const, data };
  }, [seed, mood, accentStrategy, cssPrefix]);

  const pickerHex = useMemo(() => hexForPicker(seed, SAMPLE_SEED), [seed]);

  const flash = useCallback((key: string) => {
    setCopyFlash(key);
    window.setTimeout(() => setCopyFlash(null), 1200);
  }, []);

  const copyText = useCallback(
    async (key: string, text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        flash(key);
      } catch {
        /* ignore */
      }
    },
    [flash],
  );

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Palette da colore brand</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          A partire da un <strong className="text-zinc-900">colore seme</strong> costruisci una scala primaria (50–900), accenti
          armonici, neutri leggermente tintati e colori semantici di base. Calcolo interamente nel browser: puoi incollare{" "}
          <span className="font-mono text-xs text-rose-900">#RRGGBB</span> o usare i formati supportati dal checker contrasto (
          <span className="font-mono text-xs">rgb</span>, <span className="font-mono text-xs">hsl</span>). Esporta variabili CSS
          pronte per design system e temi.
        </p>
      </div>

      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 md:grid-cols-2 md:p-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Colore seme</span>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="color"
              value={pickerHex}
              onChange={(e) => setSeed(e.target.value.toUpperCase())}
              className="h-11 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white"
              aria-label="Selettore colore seme"
            />
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="#2563EB o hsl(...)"
              className="min-w-[12rem] flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-rose-300 focus:ring-2"
              spellCheck={false}
            />
          </div>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Mood</span>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value as BrandMood)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-rose-300 focus:ring-2"
            >
              <option value="vibrant">Vibrante</option>
              <option value="soft">Soft / pastello</option>
              <option value="deep">Deep / intenso</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Accento</span>
            <select
              value={accentStrategy}
              onChange={(e) => setAccentStrategy(e.target.value as AccentStrategy)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-rose-300 focus:ring-2"
            >
              <option value="complementary">Complementare (+180°)</option>
              <option value="analogous">Analogo (+34°)</option>
              <option value="split">Split (+162°)</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Prefisso variabili CSS</span>
          <input
            type="text"
            value={cssPrefix}
            onChange={(e) => setCssPrefix(e.target.value)}
            placeholder="brand"
            className="w-full max-w-xs rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-rose-300 focus:ring-2"
            spellCheck={false}
          />
        </label>
      </div>

      {result.kind === "error" ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          {result.message}
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyText("css", result.data.cssBlock)}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700"
            >
              {copyFlash === "css" ? "Copiato!" : "Copia blocco CSS"}
            </button>
            <button
              type="button"
              onClick={() => void copyText("report", result.data.reportText)}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
            >
              {copyFlash === "report" ? "Copiato!" : "Copia report testuale"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSeed(SAMPLE_SEED);
                setMood("vibrant");
                setAccentStrategy("complementary");
                setCssPrefix("brand");
              }}
              className="rounded-lg border border-dashed border-zinc-300 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
            >
              Ripristina esempio
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Scala primaria</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-10">
                {result.data.swatches
                  .filter((s) => s.token.startsWith("primary-"))
                  .map((s) => (
                    <button
                      key={s.token}
                      type="button"
                      onClick={() => void copyText(`sw-${s.token}`, s.hex)}
                      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 text-left shadow-sm transition hover:ring-2 hover:ring-rose-400"
                      title={`Copia ${s.hex}`}
                    >
                      <span className="h-14 w-full" style={{ backgroundColor: s.hex }} />
                      <span className="border-t border-zinc-100 bg-white px-2 py-1.5">
                        <span className="block text-[10px] font-medium uppercase text-zinc-500">{s.token.replace("primary-", "")}</span>
                        <span className="font-mono text-xs text-zinc-900">{s.hex}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Accento, secondario e neutri</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.data.swatches
                  .filter((s) => ["accent", "secondary"].includes(s.token) || s.token.startsWith("neutral-"))
                  .map((s) => (
                    <button
                      key={s.token}
                      type="button"
                      onClick={() => void copyText(`sw-${s.token}`, s.hex)}
                      className="flex min-w-[7.5rem] flex-1 flex-col overflow-hidden rounded-lg border border-zinc-200 text-left shadow-sm transition hover:ring-2 hover:ring-rose-400 sm:max-w-[9rem]"
                    >
                      <span className="h-12 w-full" style={{ backgroundColor: s.hex }} />
                      <span className="border-t border-zinc-100 bg-white px-2 py-1">
                        <span className="block truncate text-[10px] font-medium text-zinc-600">{s.label}</span>
                        <span className="font-mono text-[11px] text-zinc-900">{s.hex}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Semantica (base)</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.data.swatches
                  .filter((s) => ["success", "warning", "danger", "info"].includes(s.token))
                  .map((s) => (
                    <button
                      key={s.token}
                      type="button"
                      onClick={() => void copyText(`sw-${s.token}`, s.hex)}
                      className="flex min-w-[7rem] flex-1 flex-col overflow-hidden rounded-lg border border-zinc-200 text-left shadow-sm transition hover:ring-2 hover:ring-rose-400 sm:max-w-[8rem]"
                    >
                      <span className="h-11 w-full" style={{ backgroundColor: s.hex }} />
                      <span className="border-t border-zinc-100 bg-white px-2 py-1">
                        <span className="block text-[10px] font-medium text-zinc-600">{s.label}</span>
                        <span className="font-mono text-[11px] text-zinc-900">{s.hex}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <summary className="cursor-pointer text-sm font-medium text-zinc-800">Anteprima CSS</summary>
              <pre className="mt-3 max-h-64 overflow-auto rounded-md border border-zinc-200 bg-white p-3 font-mono text-xs text-zinc-800">
                {result.data.cssBlock}
              </pre>
            </details>
          </div>
        </>
      )}
    </section>
  );
}
