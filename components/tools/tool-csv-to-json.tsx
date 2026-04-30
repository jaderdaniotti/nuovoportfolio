"use client";

import { useCallback, useMemo, useState } from "react";
import { csvTextToJson, type CsvDelimiter } from "@/lib/csv-to-json";

const SAMPLE = `nome,slug,attivo
Acme,spazio-acme,1
Beta,beta-shop,0
"Virgolette, dentro",slug-ok,1`;

const DELIM_LABEL: Record<CsvDelimiter | "auto", string> = {
  auto: "Rileva automaticamente",
  ",": "Virgola (,)",
  ";": "Punto e virgola (;)",
  "\t": "Tab",
  "|": "Pipe (|)",
};

export function ToolCsvToJson() {
  const [source, setSource] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState<CsvDelimiter | "auto">("auto");
  const [firstRowHeaders, setFirstRowHeaders] = useState(true);
  const [trimCells, setTrimCells] = useState(true);
  const [copied, setCopied] = useState(false);
  const [fileHint, setFileHint] = useState<string | null>(null);

  const result = useMemo(
    () =>
      csvTextToJson(source, {
        delimiter,
        firstRowHeaders,
        trimCells,
      }),
    [source, delimiter, firstRowHeaders, trimCells],
  );

  const copyJson = useCallback(async () => {
    if (!result.ok) return;
    try {
      await navigator.clipboard.writeText(result.pretty);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [result]);

  const downloadJson = useCallback(() => {
    if (!result.ok) return;
    const blob = new Blob([result.pretty], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const onFile = useCallback(async (file: File | null) => {
    setFileHint(null);
    if (!file) return;
    const ok = file.name.toLowerCase().endsWith(".csv") || file.type === "text/csv" || file.type === "text/plain";
    if (!ok) {
      setFileHint("Usa un file .csv o di testo; puoi anche incollare il contenuto.");
      return;
    }
    try {
      const t = await file.text();
      setSource(t);
    } catch {
      setFileHint("Lettura file non riuscita.");
    }
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-emerald-50/80 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">CSV → JSON</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Trasforma dati tabellari in JSON direttamente nel browser: supporto a virgolette, separatori comuni (virgola,
          punto e virgola, tab, pipe) e rilevamento automatico del delimitatore. Usa la prima riga come chiavi oppure
          esporta come array di array. Nessun upload su server esterno.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600">
          Separatore
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as CsvDelimiter | "auto")}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
          >
            {(Object.keys(DELIM_LABEL) as (keyof typeof DELIM_LABEL)[]).map((k) => (
              <option key={k} value={k}>
                {DELIM_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 self-end text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={firstRowHeaders}
            onChange={(e) => setFirstRowHeaders(e.target.checked)}
            className="rounded border-zinc-400"
          />
          Prima riga = intestazioni
        </label>
        <label className="flex cursor-pointer items-center gap-2 self-end text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={trimCells}
            onChange={(e) => setTrimCells(e.target.checked)}
            className="rounded border-zinc-400"
          />
          Trim celle
        </label>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-1 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2">
          <span className="font-mono text-xs text-zinc-400">input.csv</span>
          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-white">
              Carica .csv
              <input type="file" accept=".csv,text/csv,text/plain" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
            </label>
            <button
              type="button"
              onClick={() => setSource(SAMPLE)}
              className="rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Carica esempio
            </button>
            <button
              type="button"
              onClick={() => setSource("")}
              className="rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Svuota
            </button>
          </div>
        </div>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
          className="min-h-[220px] w-full resize-y bg-zinc-950 px-3 py-3 font-mono text-sm leading-relaxed text-emerald-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          placeholder="Incolla CSV (con o senza header)…"
        />
      </div>

      {fileHint ? (
        <p className="text-sm text-amber-800" role="status">
          {fileHint}
        </p>
      ) : null}

      {result.ok ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            result.meta.rows === 0 && firstRowHeaders
              ? "border-amber-200 bg-amber-50 text-amber-950"
              : "border-emerald-200 bg-emerald-50 text-emerald-950"
          }`}
        >
          <p className="font-semibold">{result.meta.mode === "objects" ? "Oggetti" : "Matrice righe/colonne"}</p>
          <p className="mt-1 text-xs opacity-90">
            Separatore rilevato/usa: <span className="font-mono">{JSON.stringify(result.meta.delimiter)}</span>
            {' · '}Righe dati: {result.meta.rows}
          </p>
        </div>
      ) : (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            source.trim() === ""
              ? "border-zinc-200 bg-zinc-100 text-zinc-700"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <p className="font-semibold">{source.trim() === "" ? "In attesa di input" : "Impossibile convertire"}</p>
          <p className="mt-1 text-xs">{result.ok ? "" : result.message}</p>
        </div>
      )}

      {result.ok ? (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyJson}
              className="rounded-full border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              {copied ? "Copiato" : "Copia JSON"}
            </button>
            <button
              type="button"
              onClick={downloadJson}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400"
            >
              Scarica data.json
            </button>
          </div>
          <pre className="max-h-[420px] overflow-auto rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-emerald-100">
            {result.pretty}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
