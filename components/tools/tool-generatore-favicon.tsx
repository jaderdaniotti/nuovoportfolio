"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { baseNameFromFileName } from "@/lib/image-converter";
import {
  buildFaviconHtmlSnippet,
  FAVICON_SIZE_PRESETS,
  type FaviconFitMode,
  renderFaviconPngFromFile,
} from "@/lib/favicon-generator";

export function ToolGeneratoreFavicon() {
  const [file, setFile] = useState<File | null>(null);
  const [fit, setFit] = useState<FaviconFitMode>("cover");
  const [bgHex, setBgHex] = useState("#ffffff");
  const [useBg, setUseBg] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const baseSlug = useMemo(() => {
    if (!file) return "favicon";
    return baseNameFromFileName(file.name).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "") || "favicon";
  }, [file]);

  const bgForRender = fit === "contain" && useBg ? bgHex : null;

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setCopied(null);
    if (!next || !next.type.startsWith("image/")) {
      setFile(null);
      if (next && !next.type.startsWith("image/")) {
        setError("Carica un file immagine (PNG, JPG, WebP, SVG raster, ecc.).");
      }
      return;
    }
    void (async () => {
      try {
        const bmp = await createImageBitmap(next);
        bmp.close();
        setFile(next);
      } catch {
        setFile(null);
        setError("Impossibile leggere l’immagine. Prova con un altro formato o file meno grande.");
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

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const runExportOne = useCallback(
    async (size: number, fileKey: string) => {
      if (!file) return;
      setBusy(true);
      setError(null);
      try {
        const blob = await renderFaviconPngFromFile(file, size, fit, bgForRender);
        downloadBlob(blob, `${baseSlug}-${fileKey}.png`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore durante l’export.");
      } finally {
        setBusy(false);
      }
    },
    [baseSlug, bgForRender, file, downloadBlob, fit],
  );

  const runExportAll = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      for (const preset of FAVICON_SIZE_PRESETS) {
        const blob = await renderFaviconPngFromFile(file, preset.size, fit, bgForRender);
        downloadBlob(blob, `${baseSlug}-${preset.fileKey}.png`);
        await new Promise((r) => setTimeout(r, 120));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante l’export multiplo.");
    } finally {
      setBusy(false);
    }
  }, [baseSlug, bgForRender, file, downloadBlob, fit]);

  const copySnippet = useCallback(async () => {
    const text = buildFaviconHtmlSnippet(baseSlug);
    try {
      await navigator.clipboard.writeText(text);
      setCopied("snippet");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Copia negli appunti non disponibile in questo contesto.");
    }
  }, [baseSlug]);

  return (
    <section className="mt-10 space-y-8">
      <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-white to-fuchsia-50/50 p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Genera i file favicon</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Carica logo o icona: produci PNG alle misure usate da browser, iOS e PWA. Tutto in locale nel browser —
          nessun upload su server. Per il ritaglio quadrato scegli se riempire il riquadro ritagliando i bordi
          (&quot;Copri&quot;) o ridurre l’immagine con margini (&quot;Contieni&quot;).
        </p>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-300/70 bg-white/70 px-6 py-12 text-center transition hover:border-violet-400 hover:bg-white"
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
          <span className="text-sm font-medium text-violet-900">Trascina un’immagine qui o clicca per scegliere</span>
          <span className="mt-1 text-xs text-zinc-500">PNG, JPEG, WebP consigliati · min. 64px per un risultato nitido</span>
        </div>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        {file ? (
          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Anteprima sorgente</p>
              <div className="mt-3 flex justify-center rounded-lg bg-[length:12px_12px] bg-[linear-gradient(45deg,#e4e4e7_25%,transparent_25%),linear-gradient(-45deg,#e4e4e7_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e4e4e7_75%),linear-gradient(-45deg,transparent_75%,#e4e4e7_75%)] bg-[0_0,0_6px,6px_-6px,-6px_0] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl ?? ""} alt="" className="max-h-40 max-w-full object-contain" />
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm">
              <fieldset className="space-y-2">
                <legend className="text-xs font-medium uppercase tracking-wide text-zinc-500">Adattamento</legend>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFit("cover")}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      fit === "cover"
                        ? "bg-violet-600 text-white shadow"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    Copri (ritaglio centro)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFit("contain")}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      fit === "contain"
                        ? "bg-violet-600 text-white shadow"
                        : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    Contieni (margini)
                  </button>
                </div>
              </fieldset>

              {fit === "contain" ? (
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={useBg}
                    onChange={(e) => setUseBg(e.target.checked)}
                    className="rounded border-zinc-300"
                  />
                  Sfondo sotto l’immagine
                  <input
                    type="color"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    disabled={!useBg}
                    className="ml-1 h-8 w-14 cursor-pointer rounded border border-zinc-200 disabled:opacity-40"
                    aria-label="Colore sfondo"
                  />
                </label>
              ) : null}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Anteprime misure</p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {[32, 180].map((sz) => (
                    <FaviconPreviewTile key={sz} file={file} size={sz} fit={fit} bg={bgForRender} label={`${sz}px`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {file ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-base font-semibold text-zinc-900">Download e snippet HTML</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Salva i PNG nella cartella pubblica del sito (es. <code className="rounded bg-zinc-100 px-1 text-xs">/public</code>) e incolla i tag nel <code className="rounded bg-zinc-100 px-1 text-xs">&lt;head&gt;</code>.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void runExportAll()}
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
            >
              {busy ? "Elaborazione…" : "Scarica tutti i PNG"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void copySnippet()}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400 disabled:opacity-50"
            >
              {copied === "snippet" ? "Copiato!" : "Copia tag &lt;link&gt;"}
            </button>
          </div>

          <ul className="mt-6 divide-y divide-zinc-100 rounded-xl border border-zinc-100">
            {FAVICON_SIZE_PRESETS.map((p) => (
              <li key={p.size} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{p.label}</p>
                  <p className="text-xs text-zinc-500">
                    {baseSlug}-{p.fileKey}.png
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void runExportOne(p.size, p.fileKey)}
                  className="shrink-0 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-900 transition hover:bg-violet-100 disabled:opacity-50"
                >
                  Scarica
                </button>
              </li>
            ))}
          </ul>

          <pre className="mt-4 max-h-40 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-800">
            {buildFaviconHtmlSnippet(baseSlug).trim()}
          </pre>
        </div>
      ) : null}
    </section>
  );
}

function FaviconPreviewTile({
  file,
  size,
  fit,
  bg,
  label,
}: {
  file: File;
  size: number;
  fit: FaviconFitMode;
  bg: string | null;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    let cancelled = false;
    void (async () => {
      try {
        const blob = await renderFaviconPngFromFile(file, size, fit, bg);
        const url = URL.createObjectURL(blob);
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        const img = new Image();
        img.onload = () => {
          const ctx = c.getContext("2d");
          if (!ctx) return;
          const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
          const display = 56;
          c.width = display * dpr;
          c.height = display * dpr;
          c.style.width = `${display}px`;
          c.style.height = `${display}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, display, display);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, display, display);
          URL.revokeObjectURL(url);
        };
        img.src = url;
      } catch {
        /* anteprima opzionale */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bg, file, fit, size]);

  return (
    <div className="text-center">
      <div
        className="mx-auto flex items-center justify-center rounded-lg bg-[length:8px_8px] bg-[linear-gradient(45deg,#e4e4e7_25%,transparent_25%),linear-gradient(-45deg,#e4e4e7_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e4e4e7_75%),linear-gradient(-45deg,transparent_75%,#e4e4e7_75%)] bg-[0_0,0_4px,4px_-4px,-4px_0] p-2"
        style={{ width: 72, height: 72 }}
      >
        <canvas ref={canvasRef} className="rounded shadow-sm" />
      </div>
      <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
  );
}
