"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  baseNameFromFileName,
  compressImageBlob,
  extensionForImageFormat,
  formatUsesQuality,
  IMAGE_CONVERTER_FORMAT_OPTIONS,
  reductionPercent,
  suggestCompressionFormat,
  type CompressionOutputFormat,
} from "@/lib/image-compressor";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function ToolImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<CompressionOutputFormat>("webp");
  const [quality, setQuality] = useState(0.78);
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
    if (!file) return "compresso";
    return `${baseNameFromFileName(file.name)}.${extensionForImageFormat(format)}`;
  }, [file, format]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    if (!next || !next.type.startsWith("image/")) {
      setFile(null);
      if (next && !next.type.startsWith("image/")) {
        setError("Seleziona un file immagine (es. JPG, PNG, WebP).");
      }
      return;
    }
    setFile(next);
    setFormat(suggestCompressionFormat(next.type));
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

  const compress = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResultBlob(null);
    setResultMeta(null);
    try {
      const out = await compressImageBlob(file, format, quality);
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

  const savedPct = useMemo(() => {
    if (!file || !resultBlob) return null;
    return reductionPercent(file.size, resultBlob.size);
  }, [file, resultBlob]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-violet-50/55 via-white to-fuchsia-50/35 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Riduci il peso del file</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              L&apos;immagine viene decompressa e ricodificata solo nel tuo browser: nessun upload su server esterni.
              Scegli il formato finale e la qualità: confrontiamo peso prima/dopo così ottimizzi LCP e banda mobile.
              JPEG applica uno sfondo bianco se serve (canale alpha).
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-violet-400 hover:text-violet-950"
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
          className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white/70 px-4 py-10 text-center transition hover:border-violet-400/80 hover:bg-white"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-sm font-medium text-zinc-800">Trascina un&apos;immagine o clicca per selezionarla</p>
          <p className="mt-2 text-xs text-zinc-500">Formati supportati in lettura: quelli che il browser sa decodificare.</p>
        </div>

        {file && previewUrl ? (
          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Originale</p>
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
              <div className="rounded-xl border border-violet-200/70 bg-white/90 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-violet-800">Confronto dimensioni</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Prima: </span>
                    <span className="font-semibold tabular-nums text-zinc-900">{formatBytes(file.size)}</span>
                  </div>
                  {resultBlob ? (
                    <div>
                      <span className="text-zinc-500">Dopo: </span>
                      <span className="font-semibold tabular-nums text-zinc-900">{formatBytes(resultBlob.size)}</span>
                      {savedPct !== null ? (
                        <span
                          className={`ml-2 font-medium tabular-nums ${savedPct > 0 ? "text-emerald-700" : savedPct < 0 ? "text-amber-700" : "text-zinc-600"}`}
                        >
                          ({savedPct > 0 ? "−" : savedPct < 0 ? "+" : ""}
                          {Math.abs(savedPct)}%)
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">Clicca &quot;Comprimi&quot; per vedere il peso dopo la ricodifica.</p>
                  )}
                </div>
                {resultBlob && savedPct !== null && savedPct < 0 ? (
                  <p className="mt-2 text-xs text-amber-800">
                    Il nuovo file è più pesante (qualità alta o PNG lossless possono aumentare KB). Abbassa il cursore qualità o
                    prova WebP/JPEG per foto.
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Formato dopo compressione</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {IMAGE_CONVERTER_FORMAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormat(opt.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        format === opt.id
                          ? "border-violet-600 bg-violet-50 text-violet-950"
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
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Qualità (compressione)</span>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={0.05}
                      max={1}
                      step={0.01}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="min-w-0 flex-1 accent-violet-600"
                    />
                    <span className="w-12 text-right text-sm tabular-nums text-zinc-700">{Math.round(quality * 100)}%</span>
                  </div>
                </label>
              ) : (
                <p className="text-xs text-zinc-500">PNG è senza perdita: il peso dipende dal contenuto; per file molto grandi prova WebP.</p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={(e) => {
                    e.stopPropagation();
                    void compress();
                  }}
                  className="rounded-full border border-violet-700 bg-violet-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-800 disabled:opacity-50"
                >
                  {busy ? "Compressione…" : "Comprimi"}
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
