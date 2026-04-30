export type FaviconFitMode = "cover" | "contain";

export type FaviconSizePreset = {
  label: string;
  size: number;
  /** File name without extension, e.g. favicon-32x32 */
  fileKey: string;
};

export const FAVICON_SIZE_PRESETS: FaviconSizePreset[] = [
  { label: "16×16", size: 16, fileKey: "favicon-16x16" },
  { label: "32×32", size: 32, fileKey: "favicon-32x32" },
  { label: "48×48", size: 48, fileKey: "favicon-48x48" },
  { label: "180×180 Apple", size: 180, fileKey: "apple-touch-icon" },
  { label: "192×192 Android", size: 192, fileKey: "android-chrome-192x192" },
  { label: "512×512 PWA", size: 512, fileKey: "android-chrome-512x512" },
];

export async function renderFaviconPng(
  source: ImageBitmap,
  size: number,
  mode: FaviconFitMode,
  containBackground: string | null,
): Promise<Blob> {
  if (!size || !Number.isFinite(size) || size < 1) {
    throw new Error("Dimensione non valida.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Impossibile usare il canvas in questo browser.");
  }

  const sw = source.width;
  const sh = source.height;
  if (sw < 1 || sh < 1) {
    throw new Error("Immagine sorgente non valida.");
  }

  if (mode === "contain") {
    if (containBackground) {
      ctx.fillStyle = containBackground;
      ctx.fillRect(0, 0, size, size);
    }
    const scale = Math.min(size / sw, size / sh);
    const dw = Math.round(sw * scale);
    const dh = Math.round(sh * scale);
    const dx = Math.round((size - dw) / 2);
    const dy = Math.round((size - dh) / 2);
    ctx.drawImage(source, 0, 0, sw, sh, dx, dy, dw, dh);
  } else {
    const scale = Math.max(size / sw, size / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (size - dw) / 2;
    const dy = (size - dh) / 2;
    ctx.drawImage(source, 0, 0, sw, sh, dx, dy, dw, dh);
  }

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png");
  });
  if (!blob) {
    throw new Error("Export PNG non riuscito.");
  }
  return blob;
}

export async function renderFaviconPngFromFile(
  file: File,
  size: number,
  mode: FaviconFitMode,
  containBackground: string | null,
): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  try {
    return await renderFaviconPng(bmp, size, mode, containBackground);
  } finally {
    bmp.close();
  }
}

export function buildFaviconHtmlSnippet(base: string): string {
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/^-+|-+$/g, "") || "favicon";
  const lines = [
    `<link rel="icon" type="image/png" sizes="32x32" href="/${safe}-favicon-32x32.png" />`,
    `<link rel="icon" type="image/png" sizes="16x16" href="/${safe}-favicon-16x16.png" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/${safe}-apple-touch-icon.png" />`,
    `<link rel="icon" type="image/png" sizes="192x192" href="/${safe}-android-chrome-192x192.png" />`,
  ];
  return `${lines.join("\n")}\n`;
}
