"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { suggestCompressionFormat, type CompressionOutputFormat } from "@/lib/image-compressor";
import {
  baseNameFromFileName,
  computeOutputDimensions,
  extensionForImageFormat,
  formatUsesQuality,
  IMAGE_CONVERTER_FORMAT_OPTIONS,
  resizeImageBlob,
} from "@/lib/image-resizer";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function parsePx(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function ToolImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [targetWInput, setTargetWInput] = useState("");
  const [targetHInput, setTargetHInput] = useState("");
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [format, setFormat] = useState<CompressionOutputFormat>("webp");
  const [quality, setQuality] = useState(0.9);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultMeta, setResultMeta] = useState<{ w: number; h: number; mime: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const derivedName = useMemo(() => {
    if (!file) return "ridimensionato";
    return `${baseNameFromFileName(file.name)}-resized.${extensionForImageFormat(format)}`;
  }, [file, format]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    setNaturalSize(null);
    if (!next || !next.type.startsWith("image/")) {
      setFile(null);
      if (next && !next.type.startsWith("image/")) {
        setError("Seleziona un file immagine (es. JPG, PNG, WebP).");
      }
      return;
    }
    setFile(next);
    setFormat(suggestCompressionFormat(next.type));
    void (async () => {
      try {
        const bmp = await createImageBitmap(next);
        setNaturalSize({ w: bmp.width, h: bmp.height });
        bmp.close();
        setTargetWInput(String(bmp.width));
        setTargetHInput(String(bmp.height));
      } catch {
        setNaturalSize(null);
      }
    })();
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      applyFile(f);
      e.target.value = "";
    },
    [applyFile],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const f = e.dataTransfer.files?.[0] ?? null;
      applyFile(f);
    },
    [applyFile],
  );

  const previewDims = useMemo(() => {
    if (!naturalSize) return null;
    const tw = parsePx(targetWInput);
    const th = parsePx(targetHInput);
    return computeOutputDimensions(naturalSize.w, naturalSize.h, {
      targetWidth: tw,
      targetHeight: th,
      preserveAspect,
    });
  }, [naturalSize, preserveAspect, targetHInput, targetWInput]);

  const runResize = useCallback(async () => {
    if (!file || !naturalSize) return;
    if (!previewDims || "error" in previewDims) {
      setError(
        previewDims && "error" in previewDims ? previewDims.error : "Imposta dimensioni di destinazione valide.",
      );
      return;
    }
    setBusy(true);
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    try {
      const out = await resizeImageBlob(file, format, quality, previewDims.width, previewDims.height);
      if (!out.ok) {
        setError(out.message);
        return;
      }
      setResultBlob(out.blob);
      setResultMeta({ w: out.width, h: out.height, mime: out.mime });
    } finally {
      setBusy(false);
    }
  }, [file, format, naturalSize, previewDims, quality]);

  const download = useCallback(() => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = derivedName;
    a.click();
    URL.revokeObjectURL(url);
  }, [derivedName, resultBlob]);

  const applyPresetMaxSide = useCallback((px: number) => {
    if (!naturalSize) return;
    const out = computeOutputDimensions(naturalSize.w, naturalSize.h, {
      targetWidth: px,
      targetHeight: px,
      preserveAspect: true,
    });
    if ("error" in out) return;
    setPreserveAspect(true);
    setTargetWInput(String(out.width));
    setTargetHInput(String(out.height));
  }, [naturalSize]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-emerald-50/50 via-white to-cyan-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Ridimensiona per web e social</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Imposta larghezza e/o altezza massime (con proporzioni) oppure dimensioni esatte. L&apos;elaborazione avviene solo nel
              browser: scegli anche il formato e la qualità per esportare.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-950"
          >
            Scegli file…
          </button>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={onInputChange} />

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={onDrop}
          className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white/70 px-4 py-10 text-center transition hover:border-emerald-400/80 hover:bg-white"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-sm font-medium text-zinc-800">Trascina un&apos;immagine o clicca per selezionarla</p>
          <p className="mt-2 text-xs text-zinc-500">Lettura: formati che il browser decodifica (inclusi HEIC se supportato).</p>
        </div>

        {file && previewUrl && naturalSize ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Originale</p>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="" className="max-h-56 w-full object-contain" />
              </div>
              <p className="text-xs text-zinc-600">
                <span className="font-medium text-zinc-800">{file.name}</span>
                <span className="text-zinc-400"> · </span>
                {formatBytes(file.size)}
                <span className="text-zinc-400"> · </span>
                {naturalSize.w}×{naturalSize.h} px
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Preset lato lungo</span>
                {[1920, 1200, 1080, 800, 640].map((px) => (
                  <button
                    key={px}
                    type="button"
                    onClick={() => applyPresetMaxSide(px)}
                    className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700 transition hover:border-emerald-400"
                  >
                    max {px}px
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={preserveAspect}
                  onChange={(e) => setPreserveAspect(e.target.checked)}
                  className="accent-emerald-600"
                />
                <span className="text-sm text-zinc-800">Mantieni proporzioni</span>
              </label>
              <p className="text-xs text-zinc-500">
                Con proporzioni: un solo lato (wh) scala l&apos;altro; due valori definiscono un riquadro massimo senza ritaglio.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Larghezza (px)</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={targetWInput}
                    onChange={(e) => setTargetWInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm tabular-nums text-zinc-900 outline-none ring-emerald-500/25 focus:border-emerald-500 focus:ring-2"
                    placeholder="es. 1200"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Altezza (px)</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={targetHInput}
                    onChange={(e) => setTargetHInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm tabular-nums text-zinc-900 outline-none ring-emerald-500/25 focus:border-emerald-500 focus:ring-2"
                    placeholder="es. 630"
                  />
                </label>
              </div>

              <div className="rounded-xl border border-emerald-200/70 bg-white/95 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-900">Anteprima output</p>
                {previewDims && "error" in previewDims ? (
                  <p className="mt-2 text-sm text-amber-800">{previewDims.error}</p>
                ) : previewDims && !("error" in previewDims) ? (
                  <p className="mt-2 text-sm text-zinc-800">
                    <span className="font-semibold tabular-nums">
                      {previewDims.width}×{previewDims.height}
                    </span>
                    <span className="text-zinc-500"> px</span>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">Calcolo dimensioni…</p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Formato export</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {IMAGE_CONVERTER_FORMAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormat(opt.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        format === opt.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {IMAGE_CONVERTER_FORMAT_OPTIONS.find((o) => o.id === format)?.description}
                </p>
              </div>

              {formatUsesQuality(format) ? (
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Qualità</span>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={0.05}
                      max={1}
                      step={0.01}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="min-w-0 flex-1 accent-emerald-600"
                    />
                    <span className="w-12 text-right text-sm tabular-nums text-zinc-700">{Math.round(quality * 100)}%</span>
                  </div>
                </label>
              ) : (
                <p className="text-xs text-zinc-500">PNG è senza perdita; per alleggerire prova WebP dopo il resize.</p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={(e) => {
                    e.stopPropagation();
                    void runResize();
                  }}
                  className="rounded-full border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-50"
                >
                  {busy ? "Elaborazione…" : "Ridimensiona ed esporta"}
                </button>
                <button
                  type="button"
                  disabled={!resultBlob}
                  onClick={(e) => {
                    e.stopPropagation();
                    download();
                  }}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400 disabled:opacity-50"
                >
                  Scarica {derivedName}
                </button>
              </div>

              {resultMeta && resultBlob ? (
                <p className="text-xs text-emerald-900">
                  File generato: {resultMeta.w}×{resultMeta.h} px · {resultMeta.mime} · {formatBytes(resultBlob.size)}
                </p>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">{error}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
