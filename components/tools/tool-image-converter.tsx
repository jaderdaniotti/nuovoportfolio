"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  baseNameFromFileName,
  convertImageBlob,
  extensionForImageFormat,
  formatUsesQuality,
  IMAGE_CONVERTER_FORMAT_OPTIONS,
  type ImageConverterOutputFormat,
} from "@/lib/image-converter";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function ToolImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImageConverterOutputFormat>("webp");
  const [quality, setQuality] = useState(0.92);
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
    if (!file) return "convertito";
    return `${baseNameFromFileName(file.name)}.${extensionForImageFormat(format)}`;
  }, [file, format]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    if (!next || !next.type.startsWith("image/")) {
      setFile(null);
      if (next && !next.type.startsWith("image/")) {
        setError("Seleziona un file immagine (es. JPG, PNG, WebP, GIF).");
      }
      return;
    }
    setFile(next);
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

  const convert = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    try {
      const out = await convertImageBlob(file, format, quality);
      if (!out.ok) {
        setError(out.message);
        return;
      }
      setResultBlob(out.blob);
      setResultMeta({ w: out.width, h: out.height, mime: out.mime });
    } finally {
      setBusy(false);
    }
  }, [file, format, quality]);

  const download = useCallback(() => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = derivedName;
    a.click();
    URL.revokeObjectURL(url);
  }, [derivedName, resultBlob]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-cyan-50/50 via-white to-amber-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Converti formato immagine</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Carica un&apos;immagine: la decodifica e la riconversione avvengono nel tuo browser (nessun upload al
              server). Scegli JPEG, PNG, WebP o AVIF, regola la qualità per i formati lossy e scarica il file
              risultante. JPEG applica uno sfondo bianco se l&apos;originale ha trasparenza.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Scegli file…
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onInputChange}
        />

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
          className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white/70 px-4 py-10 text-center transition hover:border-teal-400/70 hover:bg-white"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-sm font-medium text-zinc-800">Trascina qui un&apos;immagine o clicca per aprire</p>
          <p className="mt-2 text-xs text-zinc-500">Supportati i formati che il browser sa leggere (inclusi GIF e SVG raster).</p>
        </div>

        {file && previewUrl ? (
          <div
            className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start"
          >
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Anteprima sorgente</p>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="" className="max-h-64 w-full object-contain" />
              </div>
              <p className="text-xs text-zinc-600">
                <span className="font-medium text-zinc-800">{file.name}</span>
                <span className="text-zinc-400"> · </span>
                {formatBytes(file.size)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Formato di uscita</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {IMAGE_CONVERTER_FORMAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormat(opt.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        format === opt.id
                          ? "border-teal-600 bg-teal-50 text-teal-950"
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
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Qualità (lossy)</span>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={0.05}
                      max={1}
                      step={0.01}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="min-w-0 flex-1 accent-teal-600"
                    />
                    <span className="w-12 text-right text-sm tabular-nums text-zinc-700">{Math.round(quality * 100)}%</span>
                  </div>
                </label>
              ) : (
                <p className="text-xs text-zinc-500">PNG è senza perdita: qualità non applicabile.</p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={(e) => {
                    e.stopPropagation();
                    void convert();
                  }}
                  className="rounded-full border border-teal-700 bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50"
                >
                  {busy ? "Conversione…" : "Converti"}
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
                <p className="text-xs text-emerald-800">
                  Output: {resultMeta.w}×{resultMeta.h} px · {resultMeta.mime} · {formatBytes(resultBlob.size)}
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
