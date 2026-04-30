import {
  convertImageBlob,
  type ImageConverterOutputFormat,
} from "./image-converter";

export type CompressionOutputFormat = ImageConverterOutputFormat;

export {
  baseNameFromFileName,
  extensionForImageFormat,
  formatUsesQuality,
  IMAGE_CONVERTER_FORMAT_OPTIONS,
} from "./image-converter";

/** Re-encode in browser; same pipeline as converter, wording differs in UI. */
export async function compressImageBlob(
  file: Blob,
  format: CompressionOutputFormat,
  quality: number,
) {
  return convertImageBlob(file, format, quality);
}

/**
 * Heuristic default: WebP often shrinks PNG/GIF; keep JPEG/WebP cycle for photos.
 */
export function suggestCompressionFormat(inputMime: string): CompressionOutputFormat {
  const m = inputMime.toLowerCase();
  if (m.includes("png") || m.includes("gif")) return "webp";
  if (m.includes("jpeg") || m.includes("jpg")) return "jpeg";
  if (m.includes("webp")) return "webp";
  if (m.includes("avif")) return "avif";
  return "webp";
}

export function reductionPercent(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0 || compressedBytes < 0) return 0;
  return Math.round((1 - compressedBytes / originalBytes) * 1000) / 10;
}
