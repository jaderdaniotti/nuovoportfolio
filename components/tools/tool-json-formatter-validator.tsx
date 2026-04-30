"use client";

import { useCallback, useMemo, useState } from "react";
import { analyzeJson } from "@/lib/json-formatter-validator";

const SAMPLE_JSON = `{"tool":"json-formatter","ok":true,"items":["api","config"],"meta":{"version":1}}`;

type OutputMode = "pretty2" | "pretty4" | "minify";

export function ToolJsonFormatterValidator() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [mode, setMode] = useState<OutputMode>("pretty2");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => analyzeJson(input), [input]);

  const output =
    result.status === "valid"
      ? mode === "pretty2"
        ? result.pretty2
        : mode === "pretty4"
          ? result.pretty4
          : result.minified
      : "";

  const copyOutput = useCallback(async () => {
    if (result.status !== "valid" || output === "") return;
    try {
      await navigator.clipboard.writeText(output.trimEnd());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [output, result.status]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">JSON: valida e formatta</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Incolla <strong>JSON</strong> valido per ottenere una versione <strong>indentata</strong> (2 o 4 spazi) o{" "}
          <strong>minificata</strong> su una riga. Gli errori di sintassi restano nel messaggio nativo di{" "}
          <code className="rounded bg-emerald-100/80 px-1 text-xs">JSON.parse</code> — utile prima di incollare
          risposte API, variabili d’ambiente o file di config. Nessun invio al server: tutto nel browser.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            result.status === "valid"
              ? "border-emerald-300 bg-emerald-100 text-emerald-900"
              : result.status === "invalid"
                ? "border-amber-300 bg-amber-100 text-amber-950"
                : "border-zinc-200 bg-white text-zinc-600"
          }`}
        >
          {result.status === "valid"
            ? "JSON valido"
            : result.status === "invalid"
              ? "Errore di sintassi"
              : "In attesa di input"}
        </span>

        {result.status === "valid" ? (
          <>
            <span className="text-xs font-medium text-zinc-600">Output</span>
            <div className="inline-flex rounded-full border border-zinc-300 bg-white p-0.5 shadow-sm">
              {(
                [
                  ["pretty2", "Pretty 2"],
                  ["pretty4", "Pretty 4"],
                  ["minify", "Minify"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    mode === key
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : null}

        <button
          type="button"
          onClick={loadSample}
          className="ml-auto rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-900"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Svuota
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">Input JSON</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            className="min-h-[240px] w-full resize-y rounded-xl border border-zinc-300 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 shadow-inner outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            placeholder='Incolla JSON, es. {"a":1} o [true, null]…'
          />
          <span className="text-xs text-zinc-500">{input.length} caratteri</span>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">
            {result.status === "invalid" ? "Messaggio errore" : "Output"}
          </span>
          <textarea
            readOnly
            value={
              result.status === "valid"
                ? output
                : result.status === "invalid"
                  ? result.message
                  : "Incolla JSON nel pannello a sinistra per validare e formattare."
            }
            rows={16}
            className={`min-h-[240px] w-full resize-y rounded-xl border p-4 font-mono text-sm leading-relaxed shadow-inner outline-none ${
              result.status === "invalid"
                ? "border-amber-400 bg-amber-50 text-amber-950"
                : result.status === "valid"
                  ? "border-zinc-200 bg-zinc-50 text-zinc-900"
                  : "border-dashed border-zinc-300 bg-zinc-50/80 text-zinc-500"
            }`}
            aria-live="polite"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={copyOutput}
              disabled={result.status !== "valid" || output === ""}
              className="rounded-full border border-emerald-800 bg-emerald-800 px-4 py-2 text-sm text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copiato" : "Copia output"}
            </button>
            {result.status === "valid" ? (
              <span className="text-xs text-zinc-500">{output.trim().length} caratteri (output)</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
