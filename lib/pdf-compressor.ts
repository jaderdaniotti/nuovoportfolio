import type { PDFDocumentProxy } from "pdfjs-dist";

export const PDF_COMPRESS_DEFAULTS = {
  jpegQuality: 0.72,
  /** Moltiplicatore sulla scala viewport PDF.js (più basso = file più piccolo, meno dettaglio). */
  renderScale: 1.25,
  maxPages: 150,
} as const;

export type CompressPdfOptions = {
  jpegQuality: number;
  renderScale: number;
  maxPages?: number;
};

export type CompressPdfResult =
  | {
      ok: true;
      blob: Blob;
      originalBytes: number;
      compressedBytes: number;
      pageCount: number;
      /** true se l’output JPEG raster è più pesante dell’originale (PDF già ottimizzato o molto testuale). */
      largerThanOriginal: boolean;
    }
  | { ok: false; error: string };

let workerReady = false;

async function ensurePdfWorker() {
  if (typeof window === "undefined") return;
  if (workerReady) return;
  const { GlobalWorkerOptions, version } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  workerReady = true;
}

export async function compressPdfBytes(
  input: ArrayBuffer,
  options: CompressPdfOptions,
): Promise<CompressPdfResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "La compressione PDF è disponibile solo nel browser." };
  }

  const originalBytes = input.byteLength;
  const maxPages = options.maxPages ?? PDF_COMPRESS_DEFAULTS.maxPages;
  const q = Math.min(1, Math.max(0.05, options.jpegQuality));
  const scale = Math.min(3, Math.max(0.35, options.renderScale));

  await ensurePdfWorker();

  const [{ getDocument }, { jsPDF }] = await Promise.all([
    import("pdfjs-dist"),
    import("jspdf"),
  ]);

  let pdfDoc: PDFDocumentProxy;

  try {
    const loadingTask = getDocument({ data: new Uint8Array(input) });
    pdfDoc = await loadingTask.promise;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error: msg.includes("password") || msg.includes("Password")
        ? "PDF protetto da password: rimuovi la protezione e riprova."
        : `Impossibile leggere il PDF: ${msg}`,
    };
  }

  const numPages = pdfDoc.numPages;
  if (numPages < 1) {
    return { ok: false, error: "Il PDF non contiene pagine utilizzabili." };
  }

  if (numPages > maxPages) {
    return {
      ok: false,
      error: `Troppe pagine (${numPages}). Riduci il documento (max ${maxPages} pagine per sessione).`,
    };
  }

  let doc: InstanceType<typeof jsPDF> | undefined;

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return { ok: false, error: "Canvas non disponibile in questo ambiente." };
    }
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await page.render({ canvas, canvasContext: ctx, viewport }).promise;

    const imgData = canvas.toDataURL("image/jpeg", q);
    const w = canvas.width;
    const h = canvas.height;

    if (!doc) {
      doc = new jsPDF({
        unit: "px",
        format: [w, h],
        orientation: w >= h ? "landscape" : "portrait",
        compress: true,
      });
    } else {
      doc.addPage([w, h], w >= h ? "l" : "p");
    }
    doc.addImage(imgData, "JPEG", 0, 0, w, h, undefined, "FAST");
  }

  if (!doc) {
    return { ok: false, error: "Nessuna pagina elaborata." };
  }

  const out = doc.output("arraybuffer") as ArrayBuffer;
  const compressedBytes = out.byteLength;
  const blob = new Blob([out], { type: "application/pdf" });
  const largerThanOriginal = compressedBytes > originalBytes;

  return {
    ok: true,
    blob,
    originalBytes,
    compressedBytes,
    pageCount: numPages,
    largerThanOriginal,
  };
}
