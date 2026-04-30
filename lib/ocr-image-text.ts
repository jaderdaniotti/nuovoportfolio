export const OCR_MAX_SIDE_PX = 2560;

const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"];

export function isSupportedImageForOcr(file: File): boolean {
  const mime = (file.type || "").toLowerCase();
  if (mime === "image/svg+xml" || mime === "image/svg") return false;
  if (mime.startsWith("image/")) return true;
  const lower = file.name.toLowerCase();
  return IMAGE_EXT.some((ext) => lower.endsWith(ext));
}

export type OcrLog = { status: string; progress: number };

export type OcrSuccess = { ok: true; text: string; confidence: number; scaledDown: boolean };
export type OcrFailure = { ok: false; error: string };
export type OcrResult = OcrSuccess | OcrFailure;

export async function prepareImageForOcr(
  file: File,
  maxSide: number,
): Promise<{ source: File | Blob; scaledDown: boolean }> {
  if (typeof createImageBitmap === "undefined") {
    return { source: file, scaledDown: false };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { source: file, scaledDown: false };
  }

  const w = bitmap.width;
  const h = bitmap.height;
  const longest = Math.max(w, h);
  if (longest <= maxSide) {
    bitmap.close();
    return { source: file, scaledDown: false };
  }

  const scale = maxSide / longest;
  const nw = Math.max(1, Math.round(w * scale));
  const nh = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement("canvas");
  canvas.width = nw;
  canvas.height = nh;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { source: file, scaledDown: false };
  }
  ctx.drawImage(bitmap, 0, 0, nw, nh);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png"),
  );
  if (!blob) {
    return { source: file, scaledDown: false };
  }
  return { source: blob, scaledDown: true };
}

export async function runOcrOnImage(
  file: File,
  options: {
    langs: string;
    maxSide?: number;
    onLog?: (msg: OcrLog) => void;
  },
): Promise<OcrResult> {
  const maxSide = options.maxSide ?? OCR_MAX_SIDE_PX;
  try {
    const { createWorker } = await import("tesseract.js");
    const { source, scaledDown } = await prepareImageForOcr(file, maxSide);

    const worker = await createWorker(options.langs, undefined, {
      logger: (m) => {
        options.onLog?.({
          status: m.status,
          progress: typeof m.progress === "number" ? m.progress : 0,
        });
      },
    });

    try {
      const { data } = await worker.recognize(source);
      return {
        ok: true,
        text: data.text.trim(),
        confidence: data.confidence,
        scaledDown,
      };
    } finally {
      await worker.terminate();
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore durante l’OCR.";
    return { ok: false, error: msg };
  }
}
