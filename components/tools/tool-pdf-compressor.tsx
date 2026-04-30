"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  compressPdfBytes,
  PDF_COMPRESS_DEFAULTS,
} from "@/lib/pdf-compressor";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function baseName(name: string) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}

export function ToolPdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [jpegQuality, setJpegQuality] = useState<number>(PDF_COMPRESS_DEFAULTS.jpegQuality);
  const [renderScale, setRenderScale] = useState<number>(PDF_COMPRESS_DEFAULTS.renderScale);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    originalBytes: number;
    compressedBytes: number;
    pageCount: number;
    largerThanOriginal: boolean;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const derivedName = useMemo(() => {
    if (!file) return "compresso.pdf";
    return `${baseName(file.name)}-compresso.pdf`;
  }, [file]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResult(null);
    if (!next) {
      setFile(null);
      return;
    }
    const ok =
      next.type === "application/pdf" || next.name.toLowerCase().endsWith(".pdf");
    if (!ok) {
      setFile(null);
      setError("Carica un file PDF (.pdf).");
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

  const compress = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const buf = await file.arrayBuffer();
      const out = await compressPdfBytes(buf, {
        jpegQuality,
        renderScale,
      });
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setResult({
        blob: out.blob,
        originalBytes: out.originalBytes,
        compressedBytes: out.compressedBytes,
        pageCount: out.pageCount,
        largerThanOriginal: out.largerThanOriginal,
      });
    } finally {
      setBusy(false);
    }
  }, [file, jpegQuality, renderScale]);

  const download = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = derivedName;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, derivedName]);

  const reduction =
    result && result.originalBytes > 0
      ? Math.round((1 - result.compressedBytes / result.originalBytes) * 100)
      : null;

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-rose-50/80 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Comprimi PDF nel browser</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Ogni pagina viene rasterizzata e ricodificata in JPEG con qualità regolabile: riduce spesso il peso di scansioni e PDF con immagini pesanti. Il testo non resta selezionabile come nell’originale
          vettoriale. File elaborati solo in locale, senza upload su server esterni.
        </p>
      </div>

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
          e.stopPropagation();
        }}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center transition hover:border-rose-400 hover:bg-rose-50/40"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={onInputChange}
        />
        <p className="text-sm font-medium text-zinc-800">
          Trascina un PDF qui oppure clicca per selezionare
        </p>
        <p className="mt-2 text-xs text-zinc-500">Un file alla volta · max consigliato &lt; 30 MB</p>
      </div>

      {file ? (
        <p className="text-sm text-zinc-700">
          <strong className="text-zinc-900">File:</strong> {file.name}{" "}
          <span className="text-zinc-500">({formatBytes(file.size)})</span>
        </p>
      ) : null}

      <div className="grid gap-6 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Qualità JPEG ({Math.round(jpegQuality * 100)}%)
          </span>
          <input
            type="range"
            min={45}
            max={98}
            step={1}
            value={Math.round(jpegQuality * 100)}
            onChange={(e) => setJpegQuality(Number(e.target.value) / 100)}
            className="w-full accent-rose-600"
          />
          <span className="text-xs text-zinc-500">Più bassa = file più leggero, più artefatti.</span>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Scala rendering ({renderScale.toFixed(2)}×)
          </span>
          <input
            type="range"
            min={60}
            max={240}
            step={5}
            value={Math.round(renderScale * 100)}
            onChange={(e) => setRenderScale(Number(e.target.value) / 100)}
            className="w-full accent-rose-600"
          />
          <span className="text-xs text-zinc-500">
            Risoluzione della rasterizzazione: più bassa = PDF più piccolo, meno nitidezza.
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!file || busy}
          onClick={compress}
          className="rounded-full bg-rose-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Compressione…" : "Comprimi PDF"}
        </button>
        <button
          type="button"
          disabled={!result || busy}
          onClick={download}
          className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Scarica risultato
        </button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div>
      ) : null}

      {result ? (
        <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-4 text-sm text-emerald-950">
          <p>
            <strong>{result.pageCount}</strong> pagine · prima <strong>{formatBytes(result.originalBytes)}</strong> → dopo{" "}
            <strong>{formatBytes(result.compressedBytes)}</strong>
            {reduction !== null && !result.largerThanOriginal ? (
              <span className="text-emerald-800"> (−{reduction}%)</span>
            ) : null}
          </p>
          {result.largerThanOriginal ? (
            <p className="text-amber-900">
              L’output è più pesante dell’originale: il PDF era già ottimizzato o molto testuale. Abbassa qualità o scala di rendering e riprova, oppure usa l’originale.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
