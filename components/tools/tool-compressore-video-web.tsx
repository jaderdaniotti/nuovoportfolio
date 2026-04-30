"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import {
  formatVideoBytes,
  outputVideoFileName,
  pickInputVirtualName,
  validateVideoWebFile,
  type VideoWebContainer,
} from "@/lib/video-web-compressor";

const FFMPEG_CORE_VER = "0.12.10";
const CORE_BASE = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VER}/dist/esm`;

async function createLoadedFFmpeg(onLogLine: (line: string) => void): Promise<FFmpeg> {
  const { FFmpeg: FFmpegCtor } = await import("@ffmpeg/ffmpeg");
  const { toBlobURL } = await import("@ffmpeg/util");
  const ffmpeg = new FFmpegCtor();
  ffmpeg.on("log", ({ message }) => {
    onLogLine(message);
  });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
  });
  return ffmpeg;
}

export function ToolCompressoreVideoWeb() {
  const [file, setFile] = useState<File | null>(null);
  const [container, setContainer] = useState<VideoWebContainer>("mp4");
  const [crf, setCrf] = useState(26);
  const [capWidth, setCapWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading-engine" | "encoding">("idle");
  const [error, setError] = useState<string | null>(null);
  const [logTail, setLogTail] = useState<string[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadPromiseRef = useRef<Promise<FFmpeg> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const resultPreviewUrl = useMemo(
    () => (resultBlob ? URL.createObjectURL(resultBlob) : null),
    [resultBlob],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (!resultPreviewUrl) return;
    return () => URL.revokeObjectURL(resultPreviewUrl);
  }, [resultPreviewUrl]);

  const derivedName = useMemo(() => {
    if (!file) return "video-compresso.mp4";
    return outputVideoFileName(file.name, container);
  }, [file, container]);

  const pushLog = useCallback((line: string) => {
    setLogTail((prev) => [...prev.slice(-12), line]);
  }, []);

  const ensureFfmpeg = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    if (!loadPromiseRef.current) {
      loadPromiseRef.current = createLoadedFFmpeg(pushLog).then((ff) => {
        ffmpegRef.current = ff;
        return ff;
      });
    }
    return loadPromiseRef.current;
  }, [pushLog]);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setResultBlob(null);
    setProgress(null);
    setLogTail([]);
    const v = validateVideoWebFile(next);
    if (!v.ok) {
      setFile(null);
      if (next) setError(v.message);
      return;
    }
    setFile(next!);
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

  const runCompress = useCallback(async () => {
    if (!file) return;
    const v = validateVideoWebFile(file);
    if (!v.ok) {
      setError(v.message);
      return;
    }

    setBusy(true);
    setError(null);
    setResultBlob(null);
    setProgress(null);
    setLogTail([]);

    const vin = pickInputVirtualName(file.name);
    const vout = container === "mp4" ? "output.mp4" : "output.webm";

    try {
      setPhase("loading-engine");
      const ffmpeg = await ensureFfmpeg();

      setPhase("encoding");
      await ffmpeg.deleteFile(vin).catch(() => {});
      await ffmpeg.deleteFile(vout).catch(() => {});

      const { fetchFile } = await import("@ffmpeg/util");
      await ffmpeg.writeFile(vin, await fetchFile(file));

      const scale =
        capWidth && maxWidth >= 320
          ? [`-vf`, `scale='min(${maxWidth},iw)':-2,format=yuv420p`]
          : [`-vf`, `format=yuv420p`];

      const args =
        container === "mp4"
          ? [
              "-i",
              vin,
              ...scale,
              "-c:v",
              "libx264",
              "-crf",
              String(crf),
              "-preset",
              "medium",
              "-c:a",
              "aac",
              "-b:a",
              "96k",
              "-movflags",
              "+faststart",
              vout,
            ]
          : [
              "-i",
              vin,
              ...scale,
              "-c:v",
              "libvpx-vp9",
              "-crf",
              String(Math.min(45, crf + 6)),
              "-b:v",
              "0",
              "-c:a",
              "libopus",
              "-b:a",
              "96k",
              vout,
            ];

      const onFfmpegProgress = ({ progress: p }: { progress: number }) => {
        if (typeof p === "number" && !Number.isNaN(p)) {
          setProgress(Math.round(p * 100));
        }
      };
      ffmpeg.on("progress", onFfmpegProgress);

      try {
        try {
          await ffmpeg.exec(args);
        } catch {
          if (container === "mp4") {
            const fallback = [
              "-i",
              vin,
              ...scale,
              "-c:v",
              "libx264",
              "-crf",
              String(crf),
              "-preset",
              "medium",
              "-an",
              "-movflags",
              "+faststart",
              vout,
            ];
            await ffmpeg.exec(fallback);
          } else {
            throw new Error(
              "Ricodifica non riuscita. Prova MP4, abbassa la risoluzione massima o il CRF.",
            );
          }
        }

        const data = await ffmpeg.readFile(vout);
        if (typeof data === "string") {
          throw new Error("Output non valido generato da FFmpeg.");
        }
        const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
        const outputBytes = new Uint8Array(bytes.byteLength);
        outputBytes.set(bytes);
        const mime = container === "mp4" ? "video/mp4" : "video/webm";
        const blob = new Blob([outputBytes.buffer], { type: mime });
        setResultBlob(blob);

        await ffmpeg.deleteFile(vin).catch(() => {});
        await ffmpeg.deleteFile(vout).catch(() => {});
      } finally {
        const emitter = ffmpeg as {
          off?: (event: string, listener: typeof onFfmpegProgress) => void;
        };
        emitter.off?.("progress", onFfmpegProgress);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || "Errore durante la compressione.");
    } finally {
      setBusy(false);
      setPhase("idle");
      setProgress(null);
    }
  }, [capWidth, container, crf, ensureFfmpeg, file, maxWidth]);

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
    if (file.size <= 0) return null;
    const pct = Math.round((1 - resultBlob.size / file.size) * 100);
    return pct;
  }, [file, resultBlob]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-sky-50/50 via-white to-indigo-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Comprimi video nel browser
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              FFmpeg.wasm ricodifica il file sul tuo dispositivo (nessun upload al server). Al primo utilizzo
              scarichiamo il motore da CDN; poi puoi scegliere MP4 (H.264 + AAC) o WebM (VP9 + Opus), qualità CRF
              e limite opzionale alla larghezza per alleggerire il file per il web.
            </p>
          </div>
          <div className="rounded-xl border border-sky-100 bg-white/80 px-4 py-3 text-xs text-zinc-600 shadow-inner">
            <p className="font-medium text-zinc-800">Suggerimenti</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>CRF più alto = file più piccolo, qualità minore (H.264 tipico 18–28).</li>
              <li>Video senza traccia audio: esportiamo solo video (fallback automatico).</li>
              <li>Clip molto lunghe o 4K possono richiedere parecchia RAM.</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 transition hover:border-zinc-400"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.m4v"
          className="hidden"
          onChange={onInputChange}
        />
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900">Carica un video</p>
            <p className="mt-1 text-xs text-zinc-600">
              Trascina qui oppure scegli dal disco — max circa{" "}
              {Math.round((320 * 1024 * 1024) / (1024 * 1024))} MB.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
            onClick={() => inputRef.current?.click()}
          >
            Sfoglia file
          </button>
        </div>

        {file ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Anteprima sorgente</p>
              <video
                src={previewUrl ?? undefined}
                controls
                className="max-h-56 w-full rounded-lg border border-zinc-200 bg-black object-contain"
              />
              <p className="text-xs text-zinc-600">
                {file.name} — {formatVideoBytes(file.size)}
              </p>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-800">
                Contenitore di output
                <select
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
                  value={container}
                  disabled={busy}
                  onChange={(e) => setContainer(e.target.value as VideoWebContainer)}
                >
                  <option value="mp4">MP4 (H.264 + AAC)</option>
                  <option value="webm">WebM (VP9 + Opus)</option>
                </select>
              </label>

              <div>
                <div className="flex items-center justify-between text-sm font-medium text-zinc-800">
                  <span>CRF (qualità / peso)</span>
                  <span className="tabular-nums text-zinc-600">{crf}</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={35}
                  step={1}
                  value={crf}
                  disabled={busy}
                  onChange={(e) => setCrf(Number(e.target.value))}
                  className="mt-2 w-full accent-sky-600"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={capWidth}
                  disabled={busy}
                  onChange={(e) => setCapWidth(e.target.checked)}
                  className="rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
                />
                Ridimensiona se supera la larghezza massima
              </label>

              {capWidth ? (
                <label className="block text-sm font-medium text-zinc-800">
                  Larghezza massima (px)
                  <input
                    type="number"
                    min={320}
                    max={3840}
                    step={10}
                    value={maxWidth}
                    disabled={busy}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
                  />
                </label>
              ) : null}

              <button
                type="button"
                disabled={busy}
                onClick={runCompress}
                className="w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy
                  ? phase === "loading-engine"
                    ? "Carico FFmpeg…"
                    : `Comprimi…${progress != null ? ` ${progress}%` : ""}`
                  : "Comprimi video"}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {error}
        </div>
      ) : null}

      {resultBlob && file ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-emerald-950">Risultato</h3>
          <p className="mt-2 text-sm text-emerald-900">
            Da {formatVideoBytes(file.size)} a {formatVideoBytes(resultBlob.size)}
            {savedPct != null ? (
              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">
                {savedPct >= 0
                  ? `Risparmio indicativo ~${savedPct}%`
                  : `Output ~${Math.abs(savedPct)}% più pesante`}
              </span>
            ) : null}
          </p>
          <video
            src={resultPreviewUrl ?? undefined}
            controls
            className="mt-4 max-h-56 w-full rounded-lg border border-emerald-100 bg-black object-contain"
          />
          <button
            type="button"
            onClick={download}
            className="mt-4 rounded-full border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Scarica {derivedName}
          </button>
        </div>
      ) : null}

      {logTail.length > 0 ? (
        <details className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-700">
          <summary className="cursor-pointer font-medium text-zinc-900">Log FFmpeg (ultime righe)</summary>
          <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-mono">{logTail.join("\n")}</pre>
        </details>
      ) : null}
    </section>
  );
}
