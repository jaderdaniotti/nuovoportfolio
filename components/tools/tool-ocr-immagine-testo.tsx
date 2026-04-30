"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Copy, ScanText } from "lucide-react";
import {
  isSupportedImageForOcr,
  OCR_MAX_SIDE_PX,
  runOcrOnImage,
  type OcrLog,
} from "@/lib/ocr-image-text";

const LANG_OPTIONS = [
  { value: "ita+eng", label: "Italiano + English" },
  { value: "ita", label: "Solo italiano" },
  { value: "eng", label: "Solo english" },
] as const;

function formatPercent(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${Math.round(Math.min(100, Math.max(0, n)))}%`;
}

export function ToolOcrImmagineTesto() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [langs, setLangs] = useState<string>("ita+eng");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [scaledNote, setScaledNote] = useState(false);
  const [log, setLog] = useState<OcrLog | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const revokePreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  const applyFile = useCallback(
    (next: File | null) => {
      setError(null);
      setText("");
      setConfidence(null);
      setScaledNote(false);
      setLog(null);
      revokePreview();
      if (!next) {
        setFile(null);
        return;
      }
      if (!isSupportedImageForOcr(next)) {
        setFile(null);
        setError(
          "Carica un’immagine raster (PNG, JPEG, WebP, GIF, BMP, TIFF). Gli SVG non sono supportati per l’OCR.",
        );
        return;
      }
      setFile(next);
      setPreviewUrl(URL.createObjectURL(next));
    },
    [revokePreview],
  );

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

  const runOcr = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setText("");
    setConfidence(null);
    setScaledNote(false);
    setLog(null);
    setCopied(false);

    const res = await runOcrOnImage(file, {
      langs,
      maxSide: OCR_MAX_SIDE_PX,
      onLog: (m) => setLog(m),
    });

    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setText(res.text);
    setConfidence(res.confidence);
    setScaledNote(res.scaledDown);
    if (!res.text) {
      setError(
        "Nessun testo rilevato. Prova un’immagine più nitida, contrasto più alto o un’altra lingua.",
      );
    }
  }, [file, langs]);

  const doCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Impossibile copiare negli appunti dal browser.");
    }
  }, [text]);

  const progressLabel = useMemo(() => {
    if (!log) return "";
    const human = log.status.replace(/_/g, " ");
    const pct = Math.round((log.progress || 0) * 100);
    return `${human} ${pct}%`.trim();
  }, [log]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-indigo-50/90 to-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <ScanText className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">OCR nel browser</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              Estrai testo da screenshot, foto o scansioni usando Tesseract.js: elaborazione interamente in
              locale. Al primo utilizzo con una lingua nuova vengono scaricati i modelli (traineddata); poi
              restano in cache. Immagini molto grandi vengono ridimensionate fino al lato lungo di{" "}
              {OCR_MAX_SIDE_PX}px per limitare tempi e memoria.
            </p>
          </div>
        </div>
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
        className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/bmp,image/tiff,.tif,.tiff"
          className="hidden"
          onChange={onInputChange}
        />
        <p className="text-sm font-medium text-zinc-800">
          Trascina un’immagine qui oppure clicca per selezionare
        </p>
        <p className="mt-2 text-xs text-zinc-500">Un file alla volta · niente SVG · privacy first</p>
      </div>

      {file ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {previewUrl ? (
            <div className="shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Anteprima file caricato"
                className="max-h-48 max-w-full object-contain"
              />
            </div>
          ) : null}
          <p className="text-sm text-zinc-700">
            <strong className="text-zinc-900">File:</strong> {file.name}
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Lingua OCR</span>
          <select
            value={langs}
            disabled={busy}
            onChange={(e) => setLangs(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
          >
            {LANG_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-zinc-500">
            Scegli la lingua principale del testo nell’immagine. Italiano + inglese copre la maggior parte dei
            contenuti misti.
          </span>
        </label>
        <div className="flex flex-col justify-end gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Azioni</span>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!file || busy}
              onClick={runOcr}
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Riconoscimento…" : "Estrai testo"}
            </button>
            <button
              type="button"
              disabled={!text || busy}
              onClick={doCopy}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Copy className="h-4 w-4" aria-hidden />
              {copied ? "Copiato" : "Copia testo"}
            </button>
          </div>
        </div>
      </div>

      {busy && log ? (
        <div className="space-y-2 rounded-xl border border-indigo-100 bg-indigo-50/50 px-4 py-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100">
            <div
              className="h-full rounded-full bg-indigo-500 transition-[width] duration-300"
              style={{ width: `${Math.round((log.progress || 0) * 100)}%` }}
            />
          </div>
          <p className="font-mono text-xs text-indigo-900">{progressLabel}</p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div>
      ) : null}

      {text ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {confidence !== null ? (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
                Confidenza media OCR: {formatPercent(confidence)}
              </span>
            ) : null}
            {scaledNote ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900">
                Immagine ridimensionata per velocità (max lato {OCR_MAX_SIDE_PX}px)
              </span>
            ) : null}
          </div>
          <textarea
            readOnly
            value={text}
            className="min-h-[200px] w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 font-mono text-sm leading-relaxed text-zinc-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            spellCheck={false}
          />
        </div>
      ) : null}
    </section>
  );
}
