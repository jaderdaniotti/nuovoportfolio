/** Limite soft: ricodifica FFmpeg.wasm nel browser è pesante su RAM. */
export const VIDEO_WEB_MAX_BYTES = 320 * 1024 * 1024;

export type VideoWebContainer = "mp4" | "webm";

export type ValidateVideoWebResult =
  | { ok: true }
  | { ok: false; message: string };

export function validateVideoWebFile(file: File | null): ValidateVideoWebResult {
  if (!file) return { ok: false, message: "Carica un file video." };
  if (file.size > VIDEO_WEB_MAX_BYTES) {
    const mb = Math.round(VIDEO_WEB_MAX_BYTES / (1024 * 1024));
    return {
      ok: false,
      message: `Il file supera il limite di ${mb} MB per l’elaborazione nel browser.`,
    };
  }
  const mime = file.type.toLowerCase();
  const extOk = /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
  if (!mime.startsWith("video/") && !extOk) {
    return {
      ok: false,
      message: "Formato non riconosciuto. Usa MP4, WebM, MOV, MKV o AVI.",
    };
  }
  return { ok: true };
}

export function outputVideoFileName(originalName: string, container: VideoWebContainer): string {
  const stem =
    originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9\-_]+/g, "_")
      .slice(0, 80) || "video";
  return `${stem}-compresso.${container}`;
}

export function formatVideoBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function pickInputVirtualName(fileName: string): string {
  const m = fileName.match(/(\.[a-zA-Z0-9]{1,8})$/);
  const ext = (m?.[1] ?? ".mp4").toLowerCase();
  return `input${ext}`;
}
