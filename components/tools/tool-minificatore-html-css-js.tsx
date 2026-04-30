"use client";

import { useCallback, useMemo, useState } from "react";
import {
  minifyCss,
  minifyHtml,
  minifyJsSync,
  minifyStats,
  type MinifierMode,
} from "@/lib/html-css-js-minifier";

const SAMPLE_HTML = `<section   class="hero" >
  <!-- intro -->
  <h1>  Titolo pagina  </h1>
  <p>
    Paragrafo con    spazi extra.
  </p>
</section>`;

const SAMPLE_CSS = `/* tema principale */
:root {
  --gap:   16px ;
}

.card {
  padding:   var(--gap) ;
  border-radius:   8px ;
}`;

const SAMPLE_JS = `// esempio
const items = [ 1 , 2 , 3 ];

function sum( arr ) {
  /* totale */
  return arr.reduce( ( a , b ) => a + b , 0 );
}

console.log( sum( items ) , "ok" );
`;

export function ToolMinificatoreHtmlCssJs() {
  const [mode, setMode] = useState<MinifierMode>("html");
  const [input, setInput] = useState(SAMPLE_HTML);
  const [copied, setCopied] = useState(false);

  const syncResult = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { kind: "idle" as const };
    }
    if (mode === "html") {
      const output = minifyHtml(input);
      return { kind: "ok" as const, output, stats: minifyStats(input.length, output.length) };
    }
    if (mode === "css") {
      const output = minifyCss(input);
      return { kind: "ok" as const, output, stats: minifyStats(input.length, output.length) };
    }
    const js = minifyJsSync(input);
    if (!js.ok) {
      return { kind: "err" as const, message: js.message };
    }
    return {
      kind: "ok" as const,
      output: js.output,
      stats: minifyStats(input.length, js.output.length),
    };
  }, [input, mode]);

  const loadSample = useCallback(() => {
    setInput(mode === "html" ? SAMPLE_HTML : mode === "css" ? SAMPLE_CSS : SAMPLE_JS);
  }, [mode]);

  const clearAll = useCallback(() => {
    setInput("");
  }, []);

  const copyOutput = useCallback(async () => {
    if (syncResult.kind !== "ok") return;
    try {
      await navigator.clipboard.writeText(syncResult.output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [syncResult]);

  const modeHint =
    mode === "html"
      ? "HTML: rimuove commenti <!-- --> e comprime solo gli spazi tra tag adiacenti (non altera il testo dentro agli elementi)."
      : mode === "css"
        ? "CSS: rimuove commenti /* */ e riduce gli spazi ripetuti su una riga logica."
        : "JavaScript: rimuove commenti // e /* */ tenendo conto di stringhe, template literals e regex letterali; comprime tab/spazi extra pur mantenendo i newline dove utili (non è un bundler come Terser).";

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-violet-200/90 bg-gradient-to-b from-violet-50/95 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Minificatore HTML, CSS e JavaScript</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Riduci peso e rumore del codice incollato: tutto viene elaborato <strong>nel browser</strong>, senza caricare file su server esterni.
          Scegli la modalità corrispondente al tipo di sorgente. {modeHint}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <span className="text-xs font-medium text-zinc-600">Tipo</span>
        <div className="inline-flex rounded-full border border-zinc-300 bg-white p-0.5 shadow-sm">
          {(["html", "css", "js"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setMode(key);
                setInput(key === "html" ? SAMPLE_HTML : key === "css" ? SAMPLE_CSS : SAMPLE_JS);
              }}
              className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition ${
                mode === key ? "bg-violet-700 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {key === "html" ? "HTML" : key === "css" ? "CSS" : "JS"}
            </button>
          ))}
        </div>

        {syncResult.kind === "ok" ? (
          <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
            {syncResult.stats.savedPct >= 0
              ? `Risparmio ~${syncResult.stats.savedPct}% (${syncResult.stats.before} → ${syncResult.stats.after} car.)`
              : `Output più lungo (+${Math.abs(syncResult.stats.savedPct)}% vs orig.)`}
          </span>
        ) : syncResult.kind === "err" ? (
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-950">
            Attenzione output JS
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
            In attesa di input
          </span>
        )}

        <button
          type="button"
          onClick={loadSample}
          className="ml-auto rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-violet-300 hover:text-violet-900"
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
          <span className="text-sm font-medium text-zinc-800">Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            className="min-h-[240px] w-full resize-y rounded-xl border border-zinc-300 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 shadow-inner outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            placeholder={
              mode === "html"
                ? "Incolla markup HTML…"
                : mode === "css"
                  ? "Incolla foglio di stile…"
                  : "Incolla JavaScript…"
            }
          />
          <span className="text-xs text-zinc-500">{input.length} caratteri</span>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">
            {syncResult.kind === "err" ? "Messaggio" : "Output compatto"}
          </span>
          <textarea
            readOnly
            value={
              syncResult.kind === "ok"
                ? syncResult.output
                : syncResult.kind === "err"
                  ? syncResult.message
                  : "Incolla codice a sinistra oppure usa «Carica esempio»."
            }
            rows={16}
            className={`min-h-[240px] w-full resize-y rounded-xl border p-4 font-mono text-sm leading-relaxed shadow-inner outline-none ${
              syncResult.kind === "err"
                ? "border-amber-400 bg-amber-50 text-amber-950"
                : syncResult.kind === "ok"
                  ? "border-zinc-200 bg-zinc-50 text-zinc-900"
                  : "border-dashed border-zinc-300 bg-zinc-50/80 text-zinc-500"
            }`}
            aria-live="polite"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={copyOutput}
              disabled={syncResult.kind !== "ok" || syncResult.output === ""}
              className="rounded-full border border-violet-800 bg-violet-800 px-4 py-2 text-sm text-white transition hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copiato" : "Copia output"}
            </button>
            {syncResult.kind === "ok" ? (
              <span className="text-xs text-zinc-500">{syncResult.output.length} caratteri (output)</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
