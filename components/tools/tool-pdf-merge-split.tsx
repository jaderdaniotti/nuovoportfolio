"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  PDF_MERGE_SPLIT_LIMITS,
  mergePdfBuffers,
  parsePageGroupsSpec,
  splitPdfByGroups,
  splitPdfEveryPage,
} from "@/lib/pdf-merge-split";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type Panel = "merge" | "split";

export function ToolPdfMergeSplit() {
  const [panel, setPanel] = useState<Panel>("merge");

  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [mergeBusy, setMergeBusy] = useState(false);
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [mergeResult, setMergeResult] = useState<{ blob: Blob; pageCount: number; fileCount: number } | null>(
    null,
  );
  const mergeInputRef = useRef<HTMLInputElement>(null);

  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<"every" | "groups">("every");
  const [groupsSpec, setGroupsSpec] = useState<string>("1-3, 5, 7-8");
  const [splitBusy, setSplitBusy] = useState(false);
  const [splitError, setSplitError] = useState<string | null>(null);
  const [splitParts, setSplitParts] = useState<{ name: string; blob: Blob }[] | null>(null);
  const splitInputRef = useRef<HTMLInputElement>(null);

  const mergeDerivedName = useMemo(() => {
    if (mergeFiles.length === 0) return "unito.pdf";
    const first = mergeFiles[0]?.name.replace(/\.pdf$/i, "") ?? "documento";
    return `${first}-unito.pdf`;
  }, [mergeFiles]);

  const addMergeFiles = useCallback((list: FileList | File[] | null) => {
    if (!list || list.length === 0) return;
    const next: File[] = [];
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      if (!isPdfFile(f)) continue;
      next.push(f);
    }
    if (next.length === 0) {
      setMergeError("Seleziona solo file PDF (.pdf).");
      return;
    }
    setMergeError(null);
    setMergeResult(null);
    setMergeFiles((prev) => {
      const combined = [...prev, ...next];
      return combined.slice(0, PDF_MERGE_SPLIT_LIMITS.maxMergeFiles);
    });
  }, []);

  const onMergeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addMergeFiles(e.target.files);
      e.target.value = "";
    },
    [addMergeFiles],
  );

  const removeMergeAt = useCallback((idx: number) => {
    setMergeFiles((prev) => prev.filter((_, i) => i !== idx));
    setMergeResult(null);
    setMergeError(null);
  }, []);

  const moveMerge = useCallback((idx: number, dir: -1 | 1) => {
    setMergeFiles((prev) => {
      const j = idx + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      const tmp = copy[idx]!;
      copy[idx] = copy[j]!;
      copy[j] = tmp;
      return copy;
    });
    setMergeResult(null);
  }, []);

  const runMerge = useCallback(async () => {
    if (mergeFiles.length < 2) {
      setMergeError("Per unire servono almeno due PDF. Aggiungi i file nell’ordine desiderato.");
      return;
    }
    setMergeBusy(true);
    setMergeError(null);
    setMergeResult(null);
    try {
      const buffers = await Promise.all(mergeFiles.map((f) => f.arrayBuffer()));
      const out = await mergePdfBuffers(buffers);
      if (!out.ok) {
        setMergeError(out.error);
        return;
      }
      setMergeResult({ blob: out.blob, pageCount: out.pageCount, fileCount: out.fileCount });
    } finally {
      setMergeBusy(false);
    }
  }, [mergeFiles]);

  const downloadMerge = useCallback(() => {
    if (!mergeResult) return;
    downloadBlob(mergeResult.blob, mergeDerivedName);
  }, [mergeResult, mergeDerivedName]);

  const applySplitFile = useCallback((f: File | null) => {
    setSplitError(null);
    setSplitParts(null);
    if (!f) {
      setSplitFile(null);
      return;
    }
    if (!isPdfFile(f)) {
      setSplitFile(null);
      setSplitError("Carica un file PDF (.pdf).");
      return;
    }
    setSplitFile(f);
  }, []);

  const onSplitInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      applySplitFile(e.target.files?.[0] ?? null);
      e.target.value = "";
    },
    [applySplitFile],
  );

  const onSplitDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      applySplitFile(e.dataTransfer.files?.[0] ?? null);
    },
    [applySplitFile],
  );

  const runSplit = useCallback(async () => {
    if (!splitFile) {
      setSplitError("Carica un PDF da dividere.");
      return;
    }
    setSplitBusy(true);
    setSplitError(null);
    setSplitParts(null);
    try {
      const buf = await splitFile.arrayBuffer();
      if (splitMode === "every") {
        const out = await splitPdfEveryPage(buf, splitFile.name);
        if (!out.ok) {
          setSplitError(out.error);
          return;
        }
        setSplitParts(out.parts);
        return;
      }

      const { PDFDocument } = await import("pdf-lib");
      let pageCount: number;
      try {
        const doc = await PDFDocument.load(buf);
        pageCount = doc.getPageCount();
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setSplitError(
          msg.toLowerCase().includes("password") || msg.toLowerCase().includes("encrypt")
            ? "PDF protetto da password: rimuovi la protezione e riprova."
            : `Impossibile leggere il PDF: ${msg}`,
        );
        return;
      }

      const parsed = parsePageGroupsSpec(groupsSpec, pageCount);
      if (!parsed.ok) {
        setSplitError(parsed.error);
        return;
      }

      const out = await splitPdfByGroups(buf, parsed.groups, splitFile.name);
      if (!out.ok) {
        setSplitError(out.error);
        return;
      }
      setSplitParts(out.parts);
    } finally {
      setSplitBusy(false);
    }
  }, [splitFile, splitMode, groupsSpec]);

  const downloadAllSplit = useCallback(() => {
    if (!splitParts || splitParts.length === 0) return;
    splitParts.forEach((part, i) => {
      window.setTimeout(() => downloadBlob(part.blob, part.name), i * 350);
    });
  }, [splitParts]);

  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-violet-50/80 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Unisci o separa pagine PDF nel browser</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          <strong>Unisci</strong> più PDF in un solo file mantenendo testo e vettoriale dove possibile (nessuna
          rasterizzazione). <strong>Dividi</strong> un documento in più file: una pagina per file oppure gruppi
          indicati con intervalli (es. <code className="rounded bg-violet-100 px-1 py-0.5 text-xs">1-3, 5, 9-12</code>
          ). Tutto avviene in locale nel browser, senza caricare i file su server esterni.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-zinc-50/80 p-2">
        <button
          type="button"
          onClick={() => setPanel("merge")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            panel === "merge"
              ? "bg-violet-700 text-white shadow-sm"
              : "text-zinc-700 hover:bg-white"
          }`}
        >
          Unisci PDF
        </button>
        <button
          type="button"
          onClick={() => setPanel("split")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            panel === "split"
              ? "bg-violet-700 text-white shadow-sm"
              : "text-zinc-700 hover:bg-white"
          }`}
        >
          Dividi PDF
        </button>
      </div>

      {panel === "merge" ? (
        <div className="space-y-5">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                mergeInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addMergeFiles(e.dataTransfer.files);
            }}
            onClick={() => mergeInputRef.current?.click()}
            className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center transition hover:border-violet-400 hover:bg-violet-50/40"
          >
            <input
              ref={mergeInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={onMergeInput}
            />
            <p className="text-sm font-medium text-zinc-800">Trascina i PDF qui oppure clicca per aggiungerne</p>
            <p className="mt-2 text-xs text-zinc-500">
              Ordine = ordine nel file unito · max {PDF_MERGE_SPLIT_LIMITS.maxMergeFiles} file /{" "}
              {PDF_MERGE_SPLIT_LIMITS.maxTotalPagesMerge} pagine totali
            </p>
          </div>

          {mergeFiles.length > 0 ? (
            <ul className="space-y-2 rounded-xl border border-zinc-200 bg-white p-3">
              {mergeFiles.map((f, idx) => (
                <li
                  key={`${f.name}-${idx}`}
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50/60 px-3 py-2 text-sm"
                >
                  <span className="min-w-0 flex-1 truncate font-medium text-zinc-900">
                    {idx + 1}. {f.name}
                  </span>
                  <span className="text-xs text-zinc-500">{formatBytes(f.size)}</span>
                  <div className="ml-auto flex flex-wrap gap-1">
                    <button
                      type="button"
                      className="rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 hover:border-zinc-400 disabled:opacity-40"
                      disabled={idx === 0}
                      onClick={() => moveMerge(idx, -1)}
                    >
                      Su
                    </button>
                    <button
                      type="button"
                      className="rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 hover:border-zinc-400 disabled:opacity-40"
                      disabled={idx === mergeFiles.length - 1}
                      onClick={() => moveMerge(idx, 1)}
                    >
                      Giù
                    </button>
                    <button
                      type="button"
                      className="rounded border border-red-200 bg-white px-2 py-1 text-xs text-red-700 hover:border-red-300"
                      onClick={() => removeMergeAt(idx)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-600">Aggiungi almeno due PDF per creare il file unito.</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={mergeFiles.length < 2 || mergeBusy}
              onClick={runMerge}
              className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mergeBusy ? "Unione…" : "Unisci in un PDF"}
            </button>
            <button
              type="button"
              disabled={!mergeResult || mergeBusy}
              onClick={downloadMerge}
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Scarica PDF unito
            </button>
          </div>

          {mergeError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{mergeError}</div>
          ) : null}

          {mergeResult ? (
            <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-4 text-sm text-emerald-950">
              <p>
                Uniti <strong>{mergeResult.fileCount}</strong> file · <strong>{mergeResult.pageCount}</strong> pagine in
                totale · pronto da scaricare come <strong>{mergeDerivedName}</strong>
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-5">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                splitInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={onSplitDrop}
            onClick={() => splitInputRef.current?.click()}
            className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center transition hover:border-violet-400 hover:bg-violet-50/40"
          >
            <input
              ref={splitInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={onSplitInput}
            />
            <p className="text-sm font-medium text-zinc-800">Trascina un PDF qui oppure clicca per selezionare</p>
            <p className="mt-2 text-xs text-zinc-500">
              Una pagina per file oppure più PDF da intervalli · max ~{PDF_MERGE_SPLIT_LIMITS.maxPagesPerFile} pagine
            </p>
          </div>

          {splitFile ? (
            <p className="text-sm text-zinc-700">
              <strong className="text-zinc-900">File:</strong> {splitFile.name}{" "}
              <span className="text-zinc-500">({formatBytes(splitFile.size)})</span>
            </p>
          ) : (
            <p className="text-sm text-zinc-600">Carica un PDF per attivare le opzioni di divisione.</p>
          )}

          <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 transition hover:bg-zinc-50">
              <input
                type="radio"
                name="split-mode"
                className="mt-1 accent-violet-600"
                checked={splitMode === "every"}
                onChange={() => setSplitMode("every")}
              />
              <span>
                <span className="font-medium text-zinc-900">Un file per pagina</span>
                <span className="mt-1 block text-sm text-zinc-600">
                  Genera un PDF per ogni pagina (nome file con suffisso <code className="text-xs">-pag001</code>, …).
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 transition hover:bg-zinc-50">
              <input
                type="radio"
                name="split-mode"
                className="mt-1 accent-violet-600"
                checked={splitMode === "groups"}
                onChange={() => setSplitMode("groups")}
              />
              <span>
                <span className="font-medium text-zinc-900">Gruppi con intervalli</span>
                <span className="mt-1 block text-sm text-zinc-600">
                  Separatori con virgola tra gruppi. Esempi:{" "}
                  <code className="text-xs">1-5</code> è un solo PDF da pag. 1 a 5; <code className="text-xs">3, 8-9</code> sono
                  due file.
                </span>
              </span>
            </label>
          </div>

          {splitMode === "groups" ? (
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Intervalli di pagina (base 1)</span>
              <textarea
                value={groupsSpec}
                onChange={(e) => setGroupsSpec(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                placeholder="es. 1-3, 5, 7-12"
              />
              <span className="text-xs text-zinc-500">
                Ogni pagina può comparire solo in un gruppo. Intervalli chiusi e inclusivi (1 = prima pagina).
              </span>
            </label>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!splitFile || splitBusy}
              onClick={runSplit}
              className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {splitBusy ? "Elaborazione…" : splitMode === "every" ? "Dividi in PDF separati" : "Genera PDF per gruppi"}
            </button>
            <button
              type="button"
              disabled={!splitParts?.length || splitBusy}
              onClick={downloadAllSplit}
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Scarica tutti (azioni multiple)
            </button>
          </div>

          {splitError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{splitError}</div>
          ) : null}

          {splitParts && splitParts.length > 0 ? (
            <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-4 text-sm text-emerald-950">
              <p>
                Generati <strong>{splitParts.length}</strong> file. Alcuni browser chiedono il permesso per più download
                in sequenza — se manca qualcosa, scarica dai singoli link.
              </p>
              <ul className="max-h-52 space-y-1 overflow-y-auto text-sm">
                {splitParts.map((p, i) => (
                  <li key={`${p.name}-${i}`} className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="text-left text-violet-900 underline underline-offset-2 hover:text-violet-950"
                      onClick={() => downloadBlob(p.blob, p.name)}
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
