"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { BACKGROUND_REMOVER_MAX_INPUT_EDGE, rescaleImageBlobForRemoval } from "@/lib/background-remover";
import { baseNameFromFileName } from "@/lib/image-converter";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

type ModelChoice = "fast" | "quality";

const checkerboardStyle: CSSProperties = {
  backgroundColor: "#fafafa",
  backgroundImage: `linear-gradient(45deg, #e4e4e7 25%, transparent 25%),
    linear-gradient(-45deg, #e4e4e7 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e4e4e7 75%),
    linear-gradient(-45deg, transparent 75%, #e4e4e7 75%)`,
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
};

export function ToolBackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<ModelChoice>("fast");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [prepareHint, setPrepareHint] = useState<string | null>(null);
  const [assetProgress, setAssetProgress] = useState<{ pct: number; label: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (!resultUrl) return;
    return () => URL.revokeObjectURL(resultUrl);
  }, [resultUrl]);

  const derivedName = useMemo(() => {
    if (!file) return "senza-sfondo";
    return `${baseNameFromFileName(file.name)}-no-bg.png`;
  }, [file]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResultBlob(null);
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setPrepareHint(null);
    setAssetProgress(null);
    if (!next || !next.type.startsWith("image/")) {
      setFile(null);
      if (next && !next.type.startsWith("image/")) {
        setError("Seleziona un file immagine (es. JPG, PNG, WebP).");
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

  const removeBackground = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setAssetProgress(null);
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultBlob(null);
    setPrepareHint(null);

    try {
      const prepared = await rescaleImageBlobForRemoval(file, BACKGROUND_REMOVER_MAX_INPUT_EDGE);
      if (!prepared.ok) {
        setError(prepared.message);
        return;
      }
      if (prepared.rescaled) {
        setPrepareHint(
          `Immagine ridimensionata a ${prepared.modelWidth}×${prepared.modelHeight} px (max lato ${BACKGROUND_REMOVER_MAX_INPUT_EDGE} px) per velocità e stabilità; l’output mantiene queste dimensioni.`,
        );
      }

      const { removeBackground: runRemoval } = await import("@imgly/background-removal");
      const out = await runRemoval(prepared.blob, {
        model: model === "fast" ? "isnet_quint8" : "isnet_fp16",
        proxyToWorker: false,
        device: "cpu",
        output: { format: "image/png", quality: 1 },
        progress: (key, current, total) => {
          if (total > 0) {
            setAssetProgress({ label: key, pct: Math.min(100, Math.round((current / total) * 100)) });
          }
        },
      });

      setResultBlob(out);
      setResultUrl(URL.createObjectURL(out));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Elaborazione non riuscita.";
      setError(
        msg.includes("wasm") || msg.includes("WebAssembly")
          ? `${msg} · Se usi un’estensione che blocca script o WASM, prova a disattivarla per questa pagina.`
          : msg,
      );
    } finally {
      setBusy(false);
      setAssetProgress(null);
    }
  }, [file, model]);

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
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-sky-50/50 via-white to-emerald-50/35 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Rimuovi lo sfondo in locale</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Segmentazione neurale nel browser (ONNX + WebAssembly): la foto non viene caricata su un server del sito.
              Al primo utilizzo vengono scaricati modello e runtime (decine di MB, poi in cache). Per stabilità su mobile
              limitiamo il lato lungo in ingresso a {BACKGROUND_REMOVER_MAX_INPUT_EDGE} px.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-500 hover:text-sky-950"
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
          className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white/70 px-4 py-10 text-center transition hover:border-sky-400/80 hover:bg-white"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-sm font-medium text-zinc-800">Trascina un&apos;immagine o clicca per selezionarla</p>
          <p className="mt-2 text-xs text-zinc-500">Serve un browser recente con supporto WebAssembly.</p>
        </div>

        {file && previewUrl ? (
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Modello</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModel("fast");
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    model === "fast"
                      ? "border-sky-700 bg-sky-50 text-sky-950"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  Veloce (quantizzato)
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModel("quality");
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    model === "quality"
                      ? "border-sky-700 bg-sky-50 text-sky-950"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  Qualità (fp16)
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Veloce scarica un modello più leggero; Qualità tende a bordi più puliti su soggetti complessi.
              </p>
            </div>

            {assetProgress ? (
              <div className="rounded-lg border border-sky-200 bg-sky-50/80 px-3 py-3 text-sm text-sky-950">
                <p className="font-medium">Scaricamento asset… {assetProgress.pct}%</p>
                <p className="mt-1 text-xs text-sky-900/80">{assetProgress.label}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-200">
                  <div
                    className="h-full rounded-full bg-sky-600 transition-all"
                    style={{ width: `${assetProgress.pct}%` }}
                  />
                </div>
              </div>
            ) : null}

            {busy && !assetProgress ? (
              <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                Elaborazione in corso… la prima esecuzione può richiedere un minuto durante il download del modello.
              </p>
            ) : null}

            {prepareHint ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2 text-xs text-amber-950">{prepareHint}</p>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Originale</p>
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="" className="max-h-72 w-full object-contain" />
                </div>
                <p className="text-xs text-zinc-600">
                  <span className="font-medium text-zinc-800">{file.name}</span>
                  <span className="text-zinc-400"> · </span>
                  {formatBytes(file.size)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Senza sfondo (PNG)</p>
                <div className="overflow-hidden rounded-xl border border-zinc-200" style={checkerboardStyle}>
                  {resultUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={resultUrl} alt="Anteprima soggetto con canale alpha" className="max-h-72 w-full object-contain" />
                  ) : (
                    <div className="flex min-h-48 items-center justify-center px-4 py-8 text-center text-sm text-zinc-500">
                      Clicca &quot;Rimuovi sfondo&quot; per generare l&apos;anteprima.
                    </div>
                  )}
                </div>
                {resultBlob ? (
                  <p className="text-xs text-emerald-900">
                    Output PNG · {formatBytes(resultBlob.size)}
                    {resultUrl ? " · Trasparenza visibile sullo scacchiere" : null}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={(e) => {
                  e.stopPropagation();
                  void removeBackground();
                }}
                className="rounded-full border border-sky-700 bg-sky-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-800 disabled:opacity-50"
              >
                {busy ? "Elaborazione…" : "Rimuovi sfondo"}
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

            {error ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">{error}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
