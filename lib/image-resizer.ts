import {
  IMAGE_CONVERTER_FORMAT_OPTIONS,
  type ConvertImageResult,
  type ImageConverterOutputFormat,
} from "./image-converter";

export {
  baseNameFromFileName,
  extensionForImageFormat,
  formatUsesQuality,
  IMAGE_CONVERTER_FORMAT_OPTIONS,
  type ImageConverterOutputFormat,
} from "./image-converter";

export type ResizeDimensionInput = {
  /** Larghezza richiesta (px); null per auto se mantieni proporzioni */
  targetWidth: number | null;
  /** Altezza richiesta (px); null per auto se mantieni proporzioni */
  targetHeight: number | null;
  /** Se true, nessuno stiramento: contenimento nel box o scala da un solo lato */
  preserveAspect: boolean;
};

const MAX_SIDE = 8192;

function clampDimension(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_SIDE, Math.max(1, Math.round(n)));
}

/**
 * Calcola larghezza e altezza di output da misure richieste e proporzioni originali.
 */
export function computeOutputDimensions(
  naturalW: number,
  naturalH: number,
  input: ResizeDimensionInput,
): { width: number; height: number } | { error: string } {
  if (naturalW < 1 || naturalH < 1) {
    return { error: "Dimensioni immagine non valide." };
  }

  const tw = input.targetWidth;
  const th = input.targetHeight;
  const hasW = tw != null && tw > 0;
  const hasH = th != null && th > 0;

  if (input.preserveAspect) {
    if (hasW && !hasH) {
      const w = clampDimension(tw!);
      const h = clampDimension((naturalH * w) / naturalW);
      return { width: w, height: h };
    }
    if (hasH && !hasW) {
      const h = clampDimension(th!);
      const w = clampDimension((naturalW * h) / naturalH);
      return { width: w, height: h };
    }
    if (hasW && hasH) {
      const maxW = clampDimension(tw!);
      const maxH = clampDimension(th!);
      const scale = Math.min(maxW / naturalW, maxH / naturalH);
      return {
        width: clampDimension(naturalW * scale),
        height: clampDimension(naturalH * scale),
      };
    }
    return { error: "Inserisci almeno larghezza o altezza di destinazione (px)." };
  }

  if (!hasW || !hasH) {
    return { error: "Senza proporzioni servono sia larghezza sia altezza (px)." };
  }
  return { width: clampDimension(tw!), height: clampDimension(th!) };
}

function mimeForFormat(format: ImageConverterOutputFormat): string {
  const row = IMAGE_CONVERTER_FORMAT_OPTIONS.find((o) => o.id === format);
  return row?.mime ?? "image/png";
}

/**
 * Ridimensiona nel browser tramite canvas e ricodifica nel formato richiesto.
 */
export async function resizeImageBlob(
  file: Blob,
  format: ImageConverterOutputFormat,
  quality: number,
  outW: number,
  outH: number,
): Promise<ConvertImageResult> {
  if (typeof document === "undefined") {
    return { ok: false, message: "Ridimensionamento disponibile solo nel browser." };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { ok: false, message: "Formato immagine non supportato o file corrotto." };
  }

  const ow = clampDimension(outW);
  const oh = clampDimension(outH);
  if (!ow || !oh) {
    bitmap.close();
    return { ok: false, message: "Dimensioni di output non valide." };
  }

  const canvas = document.createElement("canvas");
  canvas.width = ow;
  canvas.height = oh;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { ok: false, message: "Impossibile creare il contesto canvas." };
  }

  const mime = mimeForFormat(format);

  if (format === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ow, oh);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, ow, oh);
  bitmap.close();

  const q = Math.min(1, Math.max(0.05, quality));

  const blob = await new Promise<Blob | null>((resolve) => {
    if (format === "png") {
      canvas.toBlob((b) => resolve(b), "image/png");
    } else {
      canvas.toBlob((b) => resolve(b), mime, q);
    }
  });

  if (!blob || blob.size === 0) {
    const avifHint =
      format === "avif"
        ? " L’encoding AVIF da canvas non è supportato in questo browser: prova WebP o JPEG."
        : "";
    return {
      ok: false,
      message: `Esportazione non riuscita.${avifHint} Prova un altro formato.`,
    };
  }

  return { ok: true, blob, mime, width: ow, height: oh };
}
