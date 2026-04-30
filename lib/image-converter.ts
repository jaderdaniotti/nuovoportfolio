export type ImageConverterOutputFormat = "jpeg" | "png" | "webp" | "avif";

export const IMAGE_CONVERTER_FORMAT_OPTIONS: {
  id: ImageConverterOutputFormat;
  label: string;
  mime: string;
  description: string;
}[] = [
  {
    id: "jpeg",
    label: "JPEG",
    mime: "image/jpeg",
    description: "Compatibile ovunque, ottimo per foto (senza trasparenza).",
  },
  {
    id: "png",
    label: "PNG",
    mime: "image/png",
    description: "Lossless, mantiene trasparenze e linee nette.",
  },
  {
    id: "webp",
    label: "WebP",
    mime: "image/webp",
    description: "Leggero per il web; supporta qualità e spesso la trasparenza.",
  },
  {
    id: "avif",
    label: "AVIF",
    mime: "image/avif",
    description: "Formato moderno molto compresso; dipende dal supporto del browser.",
  },
];

export function extensionForImageFormat(format: ImageConverterOutputFormat): string {
  return format === "jpeg" ? "jpg" : format;
}

export type ConvertImageResult =
  | { ok: true; blob: Blob; mime: string; width: number; height: number }
  | { ok: false; message: string };

function mimeForFormat(format: ImageConverterOutputFormat): string {
  const row = IMAGE_CONVERTER_FORMAT_OPTIONS.find((o) => o.id === format);
  return row?.mime ?? "image/png";
}

export function formatUsesQuality(format: ImageConverterOutputFormat): boolean {
  return format !== "png";
}

/**
 * Decodes an image blob in the browser, draws to canvas, re-encodes to the target MIME type.
 * JPEG flattens transparency on white. PNG keeps alpha. WebP/AVIF depend on browser encoders.
 */
export async function convertImageBlob(
  file: Blob,
  format: ImageConverterOutputFormat,
  quality: number,
): Promise<ConvertImageResult> {
  if (typeof document === "undefined") {
    return { ok: false, message: "Conversione disponibile solo nel browser." };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { ok: false, message: "Formato immagine non supportato o file corrotto." };
  }

  const width = bitmap.width;
  const height = bitmap.height;
  if (!width || !height) {
    bitmap.close();
    return { ok: false, message: "Dimensioni immagine non valide." };
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { ok: false, message: "Impossibile creare il contesto canvas." };
  }

  const mime = mimeForFormat(format);

  if (format === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(bitmap, 0, 0);
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
        ? " L’encoding AVIF da canvas non è supportato in questo browser: prova un browser aggiornato, oppure esporta in WebP o JPEG."
        : "";
    return {
      ok: false,
      message: `Esportazione non riuscita.${avifHint} Prova un altro formato di output.`,
    };
  }

  return { ok: true, blob, mime, width, height };
}

export function baseNameFromFileName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "immagine";
  const dot = trimmed.lastIndexOf(".");
  if (dot <= 0) return trimmed;
  return trimmed.slice(0, dot);
}
