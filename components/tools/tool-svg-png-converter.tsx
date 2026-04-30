"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  baseNameFromFileName,
  rasterBlobToEmbeddedSvg,
  svgMarkupToPngBlob,
} from "@/lib/svg-png-converter";

type Direction = "svg-to-png" | "png-to-svg";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const EXAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="240" height="120" rx="16" fill="url(#g)"/>
  <text x="120" y="68" font-family="system-ui,sans-serif" font-size="22" fill="white" text-anchor="middle">SVG → PNG</text>
</svg>`;

export function ToolSvgPngConverter() {
  const [direction, setDirection] = useState<Direction>("svg-to-png");
  const [svgText, setSvgText] = useState(EXAMPLE_SVG);
  const [loadedSvgFile, setLoadedSvgFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);
  const [pngMeta, setPngMeta] = useState<{ w: number; h: number } | null>(null);
  const [svgOut, setSvgOut] = useState<string | null>(null);
  const [svgOutMeta, setSvgOutMeta] = useState<{ w: number; h: number } | null>(null);
  const pngInputRef = useRef<HTMLInputElement>(null);
  const rasterInputRef = useRef<HTMLInputElement>(null);

  const pngPreviewUrl = useMemo(() => (pngBlob ? URL.createObjectURL(pngBlob) : null), [pngBlob]);
  useEffect(() => {
    if (!pngPreviewUrl) return () => {};
    return () => URL.revokeObjectURL(pngPreviewUrl);
  }, [pngPreviewUrl]);

  const svgSourceLabel = loadedSvgFile?.name ?? "incolla o carica uno SVG";

  const resetOutputs = useCallback(() => {
    setError(null);
    setPngBlob(null);
    setPngMeta(null);
    setSvgOut(null);
    setSvgOutMeta(null);
  }, []);

  const onSvgFile = useCallback(
    async (file: File | null) => {
      resetOutputs();
      if (!file) {
        setLoadedSvgFile(null);
        return;
      }
      const ok =
        file.type === "image/svg+xml" || /\.svg$/i.test(file.name) || file.name.toLowerCase().endsWith(".svg");
      if (!ok) {
        setLoadedSvgFile(null);
        setError("Seleziona un file .svg oppure usa il contenuto nell’editor.");
        return;
      }
      setLoadedSvgFile(file);
      try {
        const text = await file.text();
        setSvgText(text);
      } catch {
        setLoadedSvgFile(null);
        setError("Lettura file SVG non riuscita.");
      }
    },
    [resetOutputs],
  );

  const convertSvgToPng = useCallback(async () => {
    resetOutputs();
    setBusy(true);
    try {
      const out = await svgMarkupToPngBlob(svgText, { scale });
      if (!out.ok) {
        setError(out.message);
        return;
      }
      setPngBlob(out.blob);
      setPngMeta({ w: out.width, h: out.height });
    } finally {
      setBusy(false);
    }
  }, [svgText, scale, resetOutputs]);

  const downloadPng = useCallback(() => {
    if (!pngBlob) return;
    const url = URL.createObjectURL(pngBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      loadedSvgFile != null
        ? `${baseNameFromFileName(loadedSvgFile.name)}.png`
        : `convertito-${pngMeta?.w ?? "out"}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pngBlob, loadedSvgFile, pngMeta]);

  const onRasterPick = useCallback(
    async (file: File | null) => {
      resetOutputs();
      if (!file) return;
      const looksImage = file.type.startsWith("image/");
      if (!looksImage && !file.name.match(/\.(png|jpe?g|webp|gif)$/i)) {
        setError("Seleziona un’immagine PNG, JPEG, WebP o GIF.");
        return;
      }
      setBusy(true);
      try {
        const out = await rasterBlobToEmbeddedSvg(file);
        if (!out.ok) {
          setError(out.message);
          return;
        }
        setSvgOut(out.svgText);
        setSvgOutMeta({ w: out.width, h: out.height });
      } finally {
        setBusy(false);
      }
    },
    [resetOutputs],
  );

  const downloadSvg = useCallback(() => {
    if (!svgOut) return;
    const blob = new Blob([svgOut], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "immagine-incapsulata.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [svgOut]);

  const loadExample = useCallback(() => {
    resetOutputs();
    setSvgText(EXAMPLE_SVG);
    setLoadedSvgFile(null);
    if (pngInputRef.current) pngInputRef.current.value = "";
  }, [resetOutputs]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-indigo-50/60 via-white to-violet-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap gap-2 rounded-xl bg-zinc-100/90 p-1">
          <button
            type="button"
            onClick={() => {
              setDirection("svg-to-png");
              resetOutputs();
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              direction === "svg-to-png"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            SVG → PNG
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection("png-to-svg");
              resetOutputs();
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              direction === "png-to-svg"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            PNG ↔ SVG wrapper
          </button>
        </div>

        {direction === "svg-to-png" ? (
          <>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Rasterizza SVG in PNG</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Incolla markup SVG oppure carica un file .svg: la conversione è solo nel tuo browser. Utile per
                  esportare asset per slide, social o UI che richiedono pixel. Scala l’output se serve più
                  definizione (es. retina).
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => pngInputRef.current?.click()}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
                >
                  Carica .svg…
                </button>
                <button
                  type="button"
                  onClick={loadExample}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm text-indigo-900 transition hover:border-indigo-300"
                >
                  Carica esempio
                </button>
              </div>
              <input
                ref={pngInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  void onSvgFile(f);
                  e.target.value = "";
                }}
              />
            </div>

            <p className="mt-2 text-xs text-zinc-500">Sorgente: {svgSourceLabel}</p>

            <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-zinc-500">
              Markup SVG
              <textarea
                value={svgText}
                onChange={(e) => {
                  setSvgText(e.target.value);
                  resetOutputs();
                  setLoadedSvgFile(null);
                }}
                spellCheck={false}
                className="mt-2 h-48 w-full rounded-xl border border-zinc-200 bg-white/90 p-3 font-mono text-xs leading-relaxed text-zinc-800 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </label>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <label htmlFor="svg-scale" className="text-xs font-medium text-zinc-600">
                  Scala export ({scale.toFixed(2)}×)
                </label>
                <input
                  id="svg-scale"
                  type="range"
                  min={0.25}
                  max={3}
                  step={0.05}
                  value={scale}
                  onChange={(e) => {
                    setScale(Number.parseFloat(e.target.value));
                    resetOutputs();
                  }}
                  className="w-full max-w-xs accent-indigo-600"
                />
              </div>
              <button
                type="button"
                onClick={() => void convertSvgToPng()}
                disabled={busy || !svgText.trim()}
                className="rounded-full border border-indigo-600 bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? "Conversione…" : "Converti in PNG"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">PNG (o JPEG/WebP) in SVG</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Non è una vettorializzazione: crea un file .svg che incapsula l’immagine in base64, utile per flussi Figma/EPS o tooling che accetta solo SVG. Dimensioni pixel invariate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => rasterInputRef.current?.click()}
                className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Scegli immagine…
              </button>
              <input
                ref={rasterInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  void onRasterPick(f);
                  e.target.value = "";
                }}
              />
            </div>
          </>
        )}

        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
        ) : null}

        {direction === "svg-to-png" && pngBlob && pngMeta ? (
          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-zinc-900">Anteprima PNG</p>
                <p className="text-xs text-zinc-500">
                  {pngMeta.w}×{pngMeta.h} px · {formatBytes(pngBlob.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={downloadPng}
                className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
              >
                Scarica PNG
              </button>
            </div>
            {pngPreviewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- preview from object URL
              <img
                src={pngPreviewUrl}
                alt="Anteprima PNG generata dallo SVG"
                className="mt-4 max-h-64 w-auto rounded-lg border border-zinc-100 bg-zinc-50 object-contain"
              />
            ) : null}
          </div>
        ) : null}

        {direction === "png-to-svg" && svgOut && svgOutMeta ? (
          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-zinc-900">SVG generato</p>
                <p className="text-xs text-zinc-500">
                  Canvas {svgOutMeta.w}×{svgOutMeta.h} px · testo {formatBytes(new Blob([svgOut]).size)}
                </p>
              </div>
              <button
                type="button"
                onClick={downloadSvg}
                className="rounded-full border border-violet-700 bg-violet-700 px-4 py-2 text-sm text-white transition hover:bg-violet-800"
              >
                Scarica .svg
              </button>
            </div>
            <pre className="mt-4 max-h-40 overflow-auto rounded-lg border border-zinc-100 bg-zinc-50 p-3 font-mono text-[11px] text-zinc-700">
              {svgOut.slice(0, 800)}
              {svgOut.length > 800 ? "…" : ""}
            </pre>
          </div>
        ) : null}
      </div>
    </section>
  );
}
