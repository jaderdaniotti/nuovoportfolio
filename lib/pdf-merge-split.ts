import { PDFDocument } from "pdf-lib";

function uint8ToPdfBlob(bytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

export const PDF_MERGE_SPLIT_LIMITS = {
  maxMergeFiles: 32,
  /** Limite totale pagine accettate nei merge (somma file). */
  maxTotalPagesMerge: 500,
  /** Massimo pagine in un singolo file per split/export. */
  maxPagesPerFile: 500,
} as const;

function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/** Indici 0-based, pagine uniche in ordine per un singolo gruppo. */
function expandRangeToken(token: string, pageCount: number): number[] | { error: string } {
  const t = token.trim();
  if (!t) return [];
  const dash = t.indexOf("-");
  if (dash === -1) {
    const n = Number.parseInt(t, 10);
    if (!Number.isFinite(n) || n < 1 || n > pageCount) {
      return { error: `Numero di pagina fuori intervallo (1–${pageCount}): ${t}` };
    }
    return [n - 1];
  }
  const a = Number.parseInt(t.slice(0, dash).trim(), 10);
  const b = Number.parseInt(t.slice(dash + 1).trim(), 10);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { error: `Intervallo non valido: ${t}` };
  }
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  if (lo < 1 || hi > pageCount) {
    return { error: `Intervallo fuori intervallo (1–${pageCount}): ${t}` };
  }
  const out: number[] = [];
  for (let p = lo; p <= hi; p++) out.push(p - 1);
  return out;
}

/**
 * Parse tipo "1-3, 5, 10-12" → gruppi di indici 0-based senza duplicati per gruppo (ordine preservato).
 */
export function parsePageGroupsSpec(
  spec: string,
  pageCount: number,
):
  | { ok: true; groups: number[][] }
  | { ok: false; error: string } {
  const normalized = normalizeWhitespace(spec);
  if (!normalized) {
    return { ok: false, error: "Inserisci almeno un intervallo (es. 1-3 oppure 2, 5, 7-9)." };
  }
  if (pageCount < 1) {
    return { ok: false, error: "Il PDF non ha pagine elaborabili." };
  }
  const parts = normalized.split(",").map((p) => p.trim()).filter(Boolean);
  const groups: number[][] = [];
  const seenGlobal = new Set<number>();
  for (const part of parts) {
    const expanded = expandRangeToken(part, pageCount);
    if ("error" in expanded && typeof expanded.error === "string") {
      return { ok: false, error: expanded.error };
    }
    const idxs = expanded as number[];
    if (idxs.length === 0) continue;
    const ordered: number[] = [];
    for (const ix of idxs) {
      if (seenGlobal.has(ix)) {
        return { ok: false, error: `La pagina ${ix + 1} compare in più gruppi: ogni pagina può apparire una sola volta.` };
      }
      seenGlobal.add(ix);
      ordered.push(ix);
    }
    groups.push(ordered);
  }
  if (groups.length === 0) {
    return { ok: false, error: "Nessun intervallo valido." };
  }
  return { ok: true, groups };
}

export type MergePdfsResult =
  | { ok: true; blob: Blob; pageCount: number; fileCount: number }
  | { ok: false; error: string };

export async function mergePdfBuffers(buffers: ArrayBuffer[]): Promise<MergePdfsResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "Funzione disponibile solo nel browser." };
  }
  if (buffers.length === 0) {
    return { ok: false, error: "Aggiungi almeno un PDF da unire." };
  }
  if (buffers.length > PDF_MERGE_SPLIT_LIMITS.maxMergeFiles) {
    return {
      ok: false,
      error: `Troppi file: massimo ${PDF_MERGE_SPLIT_LIMITS.maxMergeFiles} PDF per unione.`,
    };
  }

  const merged = await PDFDocument.create();
  let totalPages = 0;

  for (let i = 0; i < buffers.length; i++) {
    try {
      const doc = await PDFDocument.load(buffers[i]);
      const n = doc.getPageCount();
      if (n < 1) {
        return { ok: false, error: `Il file ${i + 1} non contiene pagine valid.` };
      }
      totalPages += n;
      if (totalPages > PDF_MERGE_SPLIT_LIMITS.maxTotalPagesMerge) {
        return {
          ok: false,
          error: `Limite pagine superato: massimo ${PDF_MERGE_SPLIT_LIMITS.maxTotalPagesMerge} pagine totali tra i file.`,
        };
      }
      const indices = doc.getPageIndices();
      const copied = await merged.copyPages(doc, indices);
      copied.forEach((p) => merged.addPage(p));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const lower = msg.toLowerCase();
      const hint =
        lower.includes("encrypt") || lower.includes("password")
          ? " PDF protetto da password: rimuovi la protezione e riprova."
          : "";
      return {
        ok: false,
        error: `Impossibile leggere il file ${i + 1}: ${msg}.${hint}`,
      };
    }
  }

  const bytes = await merged.save();
  return {
    ok: true,
    blob: uint8ToPdfBlob(bytes),
    pageCount: merged.getPageCount(),
    fileCount: buffers.length,
  };
}

export type SplitEveryPageResult =
  | {
      ok: true;
      /** Un PDF per pagina, indice 1-based nel nome. */
      parts: { name: string; blob: Blob }[];
    }
  | { ok: false; error: string };

export async function splitPdfEveryPage(input: ArrayBuffer, baseName: string): Promise<SplitEveryPageResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "Funzione disponibile solo nel browser." };
  }
  let src: PDFDocument;
  try {
    src = await PDFDocument.load(input);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error: msg.toLowerCase().includes("password") || msg.toLowerCase().includes("encrypt")
        ? "PDF protetto da password: rimuovi la protezione e riprova."
        : `Impossibile leggere il PDF: ${msg}`,
    };
  }

  const pageCount = src.getPageCount();
  if (pageCount < 1) {
    return { ok: false, error: "Il PDF non ha pagine elaborabili." };
  }
  if (pageCount > PDF_MERGE_SPLIT_LIMITS.maxPagesPerFile) {
    return {
      ok: false,
      error: `Troppe pagine: massimo ${PDF_MERGE_SPLIT_LIMITS.maxPagesPerFile} pagine per questo strumento.`,
    };
  }

  const stem = baseName.replace(/\.pdf$/i, "") || "documento";
  const parts: { name: string; blob: Blob }[] = [];

  for (let i = 0; i < pageCount; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    const bytes = await out.save();
    parts.push({
      name: `${stem}-pag${String(i + 1).padStart(3, "0")}.pdf`,
      blob: uint8ToPdfBlob(bytes),
    });
  }

  return { ok: true, parts };
}

export type SplitByGroupsResult =
  | { ok: true; parts: { name: string; blob: Blob }[] }
  | { ok: false; error: string };

export async function splitPdfByGroups(
  input: ArrayBuffer,
  groups: number[][],
  baseName: string,
): Promise<SplitByGroupsResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "Funzione disponibile solo nel browser." };
  }
  if (groups.length === 0) {
    return { ok: false, error: "Definisci almeno un gruppo di pagine." };
  }

  let src: PDFDocument;
  try {
    src = await PDFDocument.load(input);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error: msg.toLowerCase().includes("password") || msg.toLowerCase().includes("encrypt")
        ? "PDF protetto da password: rimuovi la protezione e riprova."
        : `Impossibile leggere il PDF: ${msg}`,
    };
  }

  const pageCount = src.getPageCount();
  if (pageCount < 1) {
    return { ok: false, error: "Il PDF non ha pagine elaborabili." };
  }

  const stem = baseName.replace(/\.pdf$/i, "") || "documento";
  const parts: { name: string; blob: Blob }[] = [];

  for (let g = 0; g < groups.length; g++) {
    const indices = groups[g];
    if (indices.length === 0) continue;
    for (const ix of indices) {
      if (ix < 0 || ix >= pageCount) {
        return { ok: false, error: `Indice pagina non valido (${ix + 1}) per un PDF con ${pageCount} pagine.` };
      }
    }
    const out = await PDFDocument.create();
    const copied = await out.copyPages(src, indices);
    copied.forEach((p) => out.addPage(p));
    const bytes = await out.save();
    const from = indices[0] + 1;
    const to = indices[indices.length - 1] + 1;
    const label =
      indices.length === 1
        ? `${String(from).padStart(2, "0")}`
        : `${String(from).padStart(2, "0")}-${String(to).padStart(2, "0")}`;
    parts.push({
      name: `${stem}-parte-${label}.pdf`,
      blob: uint8ToPdfBlob(bytes),
    });
  }

  return { ok: true, parts };
}
