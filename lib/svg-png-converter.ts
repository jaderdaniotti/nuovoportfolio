/**
 * SVG ↔ PNG (e PNG/JPEG/WebP → SVG con immagine incorporata) nel browser.
 */

export const SVG_PNG_MAX_EDGE = 8192;

export type SvgToPngResult =
  | { ok: true; blob: Blob; width: number; height: number; mime: "image/png" }
  | { ok: false; message: string };

export type RasterToSvgResult =
  | { ok: true; svgText: string; width: number; height: number }
  | { ok: false; message: string };

function clampEdge(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(SVG_PNG_MAX_EDGE, Math.floor(n));
}

/**
 * Estrae dimensioni da markup SVG: viewBox ha priorità, poi width/height numerici.
 */
export function extractSvgDimensions(svgMarkup: string): { width: number; height: number } | null {
  const vb = svgMarkup.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (vb) {
    const parts = vb[1]
      .trim()
      .split(/[\s,]+/)
      .map((p) => parseFloat(p.replace(/[^\d.-]/g, "")));
    if (parts.length >= 4 && Number.isFinite(parts[2]) && Number.isFinite(parts[3]) && parts[2] > 0 && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }

  const wMatch = /<svg\b[^>]*\swidth\s*=\s*["']([\d.]+)/i.exec(svgMarkup);
  const hMatch = /<svg\b[^>]*\sheight\s*=\s*["']([\d.]+)/i.exec(svgMarkup);
  if (wMatch && hMatch) {
    const width = parseFloat(wMatch[1]);
    const height = parseFloat(hMatch[1]);
    if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
      return { width, height };
    }
  }

  return null;
}

function svgMarkupLooksValid(markup: string): boolean {
  const t = markup.trim();
  return t.length > 0 && /<\s*svg\b/i.test(t);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Immagine SVG non caricabile (file corrotto o non supportato)."));
    img.src = src;
  });
}

/**
 * Rasterizza markup SVG su canvas ed esporta PNG.
 */
export async function svgMarkupToPngBlob(
  svgMarkup: string,
  options?: { scale?: number },
): Promise<SvgToPngResult> {
  if (typeof document === "undefined") {
    return { ok: false, message: "Conversione disponibile solo nel browser." };
  }

  if (!svgMarkupLooksValid(svgMarkup)) {
    return { ok: false, message: "Il contenuto non sembra SVG valido (serve un tag radice svg)." };
  }

  const scale = Math.min(4, Math.max(0.25, options?.scale ?? 1));
  const parsed = extractSvgDimensions(svgMarkup);
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const img = await loadImage(url);
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    if ((!w || !h) && parsed) {
      w = parsed.width;
      h = parsed.height;
    }
    if (!w || !h) {
      return { ok: false, message: "Impossibile determinare le dimensioni SVG: aggiungi width/height o viewBox." };
    }

    const outW = clampEdge(w * scale);
    const outH = clampEdge(h * scale);
    if (!outW || !outH) {
      return { ok: false, message: "Dimensioni di output non valide." };
    }

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return { ok: false, message: "Impossibile creare il contesto canvas." };
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, outW, outH);
    ctx.drawImage(img, 0, 0, outW, outH);

    const outBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/png");
    });

    if (!outBlob || outBlob.size === 0) {
      return { ok: false, message: "Esportazione PNG non riuscita. Prova un altro browser o semplifica l’SVG." };
    }

    return { ok: true, blob: outBlob, width: outW, height: outH, mime: "image/png" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore durante la conversione SVG → PNG.";
    return { ok: false, message: msg };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Incorpora un’immagine raster in un file SVG (wrapper, non vettorializzazione).
 */
export async function rasterBlobToEmbeddedSvg(blob: Blob): Promise<RasterToSvgResult> {
  if (typeof document === "undefined") {
    return { ok: false, message: "Conversione disponibile solo nel browser." };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    return {
      ok: false,
      message: "Immagine non leggibile: usa PNG, JPEG, WebP o GIF (formato supportato dal browser).",
    };
  }

  const width = bitmap.width;
  const height = bitmap.height;
  if (!width || !height) {
    bitmap.close();
    return { ok: false, message: "Dimensioni immagine non valide." };
  }

  const buf = await blob.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(buf).reduce((acc, byte) => acc + String.fromCharCode(byte), ""),
  );
  const type = blob.type;
  const mime =
    type && type !== "application/octet-stream" && type.startsWith("image/") ? type : "image/png";
  const dataUrl = `data:${mime};base64,${base64}`;

  const svgText = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image width="${width}" height="${height}" xlink:href="${dataUrl}" href="${dataUrl}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  bitmap.close();
  return { ok: true, svgText, width, height };
}

export function baseNameFromFileName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "file";
  const dot = trimmed.lastIndexOf(".");
  if (dot <= 0) return trimmed;
  return trimmed.slice(0, dot);
}
