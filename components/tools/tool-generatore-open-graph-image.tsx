"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flattenOnWhite, parseColorInput, type Rgba } from "@/lib/color-contrast-checker";
import {
  buildOgImageMetaSnippet,
  OPEN_GRAPH_IMAGE_HEIGHT,
  OPEN_GRAPH_IMAGE_WIDTH,
  validateOgImageTextInput,
} from "@/lib/open-graph-image-generator";

const W = OPEN_GRAPH_IMAGE_WIDTH;
const H = OPEN_GRAPH_IMAGE_HEIGHT;

const SAMPLE_TITLE = "Guida pratica al posizionamento locale";
const SAMPLE_SUB = "Checklist SEO e Google Business Profile per attività in città.";
const SAMPLE_BRAND = "Il tuo brand";

function rgbaToCssRgb(flat: Rgba): string {
  const r = Math.round(flat.r * 255);
  const g = Math.round(flat.g * 255);
  const b = Math.round(flat.b * 255);
  return `rgb(${r},${g},${b})`;
}

function hexForNativePicker(raw: string, fallback: string) {
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
  return `#${r}${g}${b}`;
}

function parseToRgbCss(raw: string, fallback: string): string {
  const p = parseColorInput(raw);
  if (!p.ok) return fallback;
  return rgbaToCssRgb(flattenOnWhite(p.rgba));
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  const pushLine = (l: string) => {
    if (lines.length >= maxLines) return;
    lines.push(l);
  };

  const breakLongWord = (word: string): string[] => {
    const out: string[] = [];
    let chunk = "";
    for (const ch of word) {
      const test = chunk + ch;
      if (ctx.measureText(test).width <= maxWidth) {
        chunk = test;
      } else {
        if (chunk) out.push(chunk);
        chunk = ch;
      }
    }
    if (chunk) out.push(chunk);
    return out;
  };

  for (const word of words) {
    if (ctx.measureText(word).width > maxWidth) {
      if (line) {
        pushLine(line);
        line = "";
      }
      const parts = breakLongWord(word);
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]!;
        if (lines.length >= maxLines) return lines;
        if (i < parts.length - 1) pushLine(part);
        else line = part;
      }
      continue;
    }

    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      if (line) pushLine(line);
      line = word;
    }
    if (lines.length >= maxLines) return lines;
  }
  if (line && lines.length < maxLines) pushLine(line);
  return lines;
}

export function ToolGeneratoreOpenGraphImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const [title, setTitle] = useState(SAMPLE_TITLE);
  const [subtitle, setSubtitle] = useState(SAMPLE_SUB);
  const [brandLine, setBrandLine] = useState(SAMPLE_BRAND);
  const [colorTop, setColorTop] = useState("#0f172a");
  const [colorBottom, setColorBottom] = useState("#1e3a5f");
  const [textColor, setTextColor] = useState("#f8fafc");
  const [accentColor, setAccentColor] = useState("#38bdf8");
  const [imageUrlForMeta, setImageUrlForMeta] = useState("https://tuodominio.it/og/cover.png");
  const [copyFlash, setCopyFlash] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const textErr = useMemo(
    () => validateOgImageTextInput({ title, subtitle, brandLine }),
    [title, subtitle, brandLine],
  );

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

  const metaSnippet = useMemo(() => buildOgImageMetaSnippet(imageUrlForMeta), [imageUrlForMeta]);

  const loadExample = useCallback(() => {
    setTitle(SAMPLE_TITLE);
    setSubtitle(SAMPLE_SUB);
    setBrandLine(SAMPLE_BRAND);
    setColorTop("#0f172a");
    setColorBottom("#1e3a5f");
    setTextColor("#f8fafc");
    setAccentColor("#38bdf8");
    setLogoDataUrl(null);
    setLogoError(null);
    logoRef.current = null;
  }, []);

  const onLogoFile = useCallback((file: File | null) => {
    setLogoError(null);
    setLogoDataUrl(null);
    logoRef.current = null;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError("Carica un file immagine (PNG, JPEG, WebP, …).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;
      if (typeof res !== "string") return;
      const img = new Image();
      img.onload = () => {
        logoRef.current = img;
        setLogoDataUrl(res);
      };
      img.onerror = () => setLogoError("Impossibile leggere l’immagine.");
      img.src = res;
    };
    reader.onerror = () => setLogoError("Lettura file fallita.");
    reader.readAsDataURL(file);
  }, []);

  const clearLogo = useCallback(() => {
    setLogoDataUrl(null);
    setLogoError(null);
    logoRef.current = null;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    const top = parseToRgbCss(colorTop, "#0f172a");
    const bottom = parseToRgbCss(colorBottom, "#1e293b");
    const txt = parseToRgbCss(textColor, "#f8fafc");
    const acc = parseToRgbCss(accentColor, "#38bdf8");

    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = acc;
    ctx.fillRect(0, H - 12, W, 12);

    const padX = 72;
    let cursorY = 140;

    const brand = brandLine.trim();
    if (brand) {
      ctx.font = '600 28px ui-sans-serif, system-ui, "Segoe UI", sans-serif';
      ctx.fillStyle = acc;
      ctx.fillText(brand, padX, cursorY);
      cursorY += 56;
    }

    const titleText = title.trim();
    if (titleText && !textErr) {
      ctx.font = '700 64px ui-sans-serif, system-ui, "Segoe UI", sans-serif';
      ctx.fillStyle = txt;
      const titleLines = wrapLines(ctx, titleText, W - padX * 2, 3);
      for (const line of titleLines) {
        ctx.fillText(line, padX, cursorY);
        cursorY += 76;
      }
    }

    const sub = subtitle.trim();
    if (sub && !textErr) {
      ctx.font = '400 32px ui-sans-serif, system-ui, "Segoe UI", sans-serif';
      ctx.fillStyle = txt;
      ctx.globalAlpha = 0.9;
      const subLines = wrapLines(ctx, sub, W - padX * 2, 3);
      cursorY += 8;
      for (const line of subLines) {
        ctx.fillText(line, padX, cursorY);
        cursorY += 44;
      }
      ctx.globalAlpha = 1;
    }

    const logo = logoRef.current;
    if (logo && logo.complete && logo.naturalWidth > 0) {
      const maxLogoW = 220;
      const maxLogoH = 120;
      let lw = logo.naturalWidth;
      let lh = logo.naturalHeight;
      const scale = Math.min(maxLogoW / lw, maxLogoH / lh, 1);
      lw *= scale;
      lh *= scale;
      const lx = W - padX - lw;
      const ly = 72;
      ctx.drawImage(logo, lx, ly, lw, lh);
    }
  }, [accentColor, brandLine, colorBottom, colorTop, subtitle, textColor, title, textErr, logoDataUrl]);

  useEffect(() => {
    draw();
  }, [draw]);

  const downloadPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || textErr) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "open-graph-1200x630.png";
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  }, [textErr]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Immagine Open Graph 1200×630</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Crea nel browser un <strong className="text-zinc-900">PNG alle dimensioni consigliate</strong> per{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs text-sky-900">og:image</code> e anteprime su social e
          messenger. Personalizza titolo, sottotitolo, colori e logo opzionale; scarica il file, caricalo sul tuo hosting
          (URL assoluto HTTPS) e incolla i meta generati nel <code className="text-xs">&lt;head&gt;</code>.
        </p>
      </div>

      <div className="grid gap-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 md:grid-cols-2 md:p-5">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Titolo</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-sky-300 focus:ring-2"
            autoComplete="off"
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Sottotitolo (opzionale)</span>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-sky-300 focus:ring-2"
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Brand / dominio (opzionale)</span>
          <input
            type="text"
            value={brandLine}
            onChange={(e) => setBrandLine(e.target.value)}
            placeholder="es. esempio.it"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-sky-300 focus:ring-2"
            autoComplete="off"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="min-w-[5rem] text-xs font-semibold uppercase text-zinc-600">Gradiente A</span>
            <input
              type="color"
              value={hexForNativePicker(colorTop, "#0F172A")}
              onChange={(e) => setColorTop(e.target.value.toUpperCase())}
              className="h-10 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white"
              aria-label="Colore gradiente iniziale"
            />
            <input
              type="text"
              value={colorTop}
              onChange={(e) => setColorTop(e.target.value)}
              className="min-w-0 flex-1 rounded border border-zinc-200 bg-white px-2 py-1 font-mono text-xs"
              spellCheck={false}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="min-w-[5rem] text-xs font-semibold uppercase text-zinc-600">Gradiente B</span>
            <input
              type="color"
              value={hexForNativePicker(colorBottom, "#1E3A5F")}
              onChange={(e) => setColorBottom(e.target.value.toUpperCase())}
              className="h-10 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white"
              aria-label="Colore gradiente finale"
            />
            <input
              type="text"
              value={colorBottom}
              onChange={(e) => setColorBottom(e.target.value)}
              className="min-w-0 flex-1 rounded border border-zinc-200 bg-white px-2 py-1 font-mono text-xs"
              spellCheck={false}
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="min-w-[5rem] text-xs font-semibold uppercase text-zinc-600">Testo</span>
            <input
              type="color"
              value={hexForNativePicker(textColor, "#F8FAFC")}
              onChange={(e) => setTextColor(e.target.value.toUpperCase())}
              className="h-10 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white"
              aria-label="Colore testo"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="min-w-0 flex-1 rounded border border-zinc-200 bg-white px-2 py-1 font-mono text-xs"
              spellCheck={false}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="min-w-[5rem] text-xs font-semibold uppercase text-zinc-600">Accento</span>
            <input
              type="color"
              value={hexForNativePicker(accentColor, "#38BDF8")}
              onChange={(e) => setAccentColor(e.target.value.toUpperCase())}
              className="h-10 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white"
              aria-label="Colore accento"
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="min-w-0 flex-1 rounded border border-zinc-200 bg-white px-2 py-1 font-mono text-xs"
              spellCheck={false}
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Logo (opzionale)</span>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onLogoFile(e.target.files?.[0] ?? null)}
              className="text-sm text-zinc-700 file:mr-3 file:rounded-lg file:border file:border-zinc-300 file:bg-white file:px-3 file:py-1.5 file:text-sm"
            />
            {logoDataUrl ? (
              <button
                type="button"
                onClick={clearLogo}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Rimuovi logo
              </button>
            ) : null}
          </div>
          {logoError ? <p className="mt-2 text-sm text-amber-700">{logoError}</p> : null}
        </div>
      </div>

      {textErr ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{textErr}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={loadExample}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={downloadPng}
          disabled={!!textErr}
          className="rounded-full border border-sky-600 bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Scarica PNG {W}×{H}
        </button>
        <button
          type="button"
          onClick={() => copyText("meta", metaSnippet)}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
        >
          {copyFlash === "meta" ? "Copiato!" : "Copia snippet meta"}
        </button>
      </div>

      <div className="space-y-3">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
            URL pubblico del PNG (per i meta)
          </span>
          <input
            type="url"
            value={imageUrlForMeta}
            onChange={(e) => setImageUrlForMeta(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-300 focus:ring-2"
          />
        </label>
        <pre className="max-h-48 overflow-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-xs text-zinc-100">
          {metaSnippet}
        </pre>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Anteprima (scala)</p>
        <div className="mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 p-3">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="h-auto w-full max-w-full rounded-md shadow-md"
            style={{ aspectRatio: `${W} / ${H}` }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Rendering locale: nessun upload al server. Dopo il download verifica contrasto e leggibilità su mobile.
        </p>
      </div>
    </section>
  );
}
