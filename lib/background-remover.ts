/** Max longest edge (px) passed to the segmentation model to reduce memory use on mobile. */
export const BACKGROUND_REMOVER_MAX_INPUT_EDGE = 2048;

export type RescaleForRemovalResult =
  | {
      ok: true;
      blob: Blob;
      sourceWidth: number;
      sourceHeight: number;
      modelWidth: number;
      modelHeight: number;
      rescaled: boolean;
    }
  | { ok: false; message: string };

/**
 * Downscales large images before ML inference. Runs only in the browser.
 */
export async function rescaleImageBlobForRemoval(
  file: Blob,
  maxEdge: number = BACKGROUND_REMOVER_MAX_INPUT_EDGE,
): Promise<RescaleForRemovalResult> {
  if (typeof document === "undefined") {
    return { ok: false, message: "Elaborazione disponibile solo nel browser." };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { ok: false, message: "Formato immagine non supportato o file corrotto." };
  }

  const sourceWidth = bitmap.width;
  const sourceHeight = bitmap.height;
  if (!sourceWidth || !sourceHeight) {
    bitmap.close();
    return { ok: false, message: "Dimensioni immagine non valide." };
  }

  const longest = Math.max(sourceWidth, sourceHeight);
  if (longest <= maxEdge) {
    bitmap.close();
    return {
      ok: true,
      blob: file,
      sourceWidth,
      sourceHeight,
      modelWidth: sourceWidth,
      modelHeight: sourceHeight,
      rescaled: false,
    };
  }

  const scale = maxEdge / longest;
  const modelWidth = Math.max(1, Math.round(sourceWidth * scale));
  const modelHeight = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = modelWidth;
  canvas.height = modelHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { ok: false, message: "Impossibile creare il canvas di lavoro." };
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, modelWidth, modelHeight);
  bitmap.close();

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve({ ok: false, message: "Esportazione PNG non riuscita." });
          return;
        }
        resolve({
          ok: true,
          blob,
          sourceWidth,
          sourceHeight,
          modelWidth,
          modelHeight,
          rescaled: true,
        });
      },
      "image/png",
      1,
    );
  });
}
