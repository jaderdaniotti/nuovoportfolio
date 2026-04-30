"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  analyzeHeadingDocument,
  type HeadingAnalysis,
  type HeadingFinding,
  type HeadingSeverity,
} from "@/lib/heading-structure-analyzer";

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <title>Guida SEO locale</title>
</head>
<body>
  <main>
    <h1>SEO per attività locali</h1>
    <p>Introduzione alla guida.</p>
    <h2>Google Business Profile</h2>
    <h3>Ottimizzazione schede</h3>
    <h2>Recensioni</h2>
    <h4>Come rispondere</h4>
  </main>
</body>
</html>
`;

function severityLabel(s: HeadingSeverity) {
  switch (s) {
    case "error":
      return "Errore";
    case "warning":
      return "Attenzione";
    default:
      return "Info";
  }
}

function severityStyles(s: HeadingSeverity) {
  switch (s) {
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950";
    default:
      return "border-sky-200 bg-sky-50 text-sky-950";
  }
}

function FindingRow({ finding }: { finding: HeadingFinding }) {
  return (
    <li className={`rounded-lg border px-3 py-2 text-sm leading-snug ${severityStyles(finding.severity)}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{severityLabel(finding.severity)}</p>
      <p className="mt-0.5">{finding.message}</p>
    </li>
  );
}

export function ToolAnalyzerStrutturaHeading() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [analysis, setAnalysis] = useState<HeadingAnalysis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof DOMParser === "undefined") {
      return;
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    setAnalysis(analyzeHeadingDocument(doc));
  }, [html]);

  const status = useMemo(() => {
    if (!html.trim()) {
      return {
        label: "In attesa di HTML",
        desc: "Incolla il sorgente o un frammento con body per estrarre la gerarchia H1–H6.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (!analysis) {
      return {
        label: "Analisi…",
        desc: "Elaborazione outline in locale nel browser.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (analysis.headings.length === 0) {
      return {
        label: "Nessun heading",
        desc: "Il markup non contiene tag h1–h6.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    if (analysis.hasErrors) {
      return {
        label: "Da correggere",
        desc: "Ci sono problemi bloccanti sulla struttura (es. mancanza di H1).",
        tone: "border-red-200 bg-red-50 text-red-900",
      };
    }
    if (analysis.hasWarnings) {
      return {
        label: "Revisione consigliata",
        desc: "Outline presente ma con avvisi su salti di livello, H1 multipli o heading vuoti.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    return {
      label: "Struttura ordinata",
      desc: "Nessun avviso grave sulla sequenza analizzata.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [analysis, html]);

  const copyOutline = useCallback(async () => {
    if (!analysis) return;
    try {
      await navigator.clipboard.writeText(analysis.outlineText);
    } catch {
      /* ignore */
    }
  }, [analysis]);

  const copyReport = useCallback(async () => {
    if (!analysis) return;
    const lines = [
      `Analyzer struttura heading — riepilogo`,
      ``,
      `Outline:`,
      analysis.outlineText,
      ``,
      ...analysis.findings.map((f) => `[${f.severity}] ${f.message}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      /* ignore */
    }
  }, [analysis]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-zinc-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Mappa gerarchia heading</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Incolla HTML completo o il contenuto di <span className="font-mono text-xs text-zinc-600">&lt;main&gt;</span>:
          il tool elenca tutti gli{" "}
          <span className="font-mono text-xs text-zinc-600">h1–h6</span> in ordine di apparizione, costruisce un
          outline indentato e segnala salti di livello, più di un H1, assenza di H1 e heading senza testo. Tutto avviene
          nel browser (nessun invio al server).
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="heading-html" className="text-sm font-medium text-zinc-800">
          HTML / frammento
        </label>
        <textarea
          id="heading-html"
          rows={14}
          spellCheck={false}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="min-h-[200px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner outline-none ring-offset-2 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHtml(SAMPLE_HTML)}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-violet-400 hover:text-zinc-900"
          >
            Ripristina esempio
          </button>
          <button
            type="button"
            onClick={() => setHtml("")}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-violet-400 hover:text-zinc-900"
          >
            Svuota
          </button>
        </div>
      </div>

      <div className={`rounded-xl border px-4 py-3 text-sm ${status.tone}`}>
        <p className="font-semibold">{status.label}</p>
        <p className="mt-1 text-xs opacity-90">{status.desc}</p>
      </div>

      {analysis && analysis.headings.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-start">
          <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Tag</th>
                  <th className="px-3 py-2 font-medium">Testo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {analysis.headings.map((h) => (
                  <tr key={h.index}>
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-zinc-600">{h.index}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <span className="rounded-md bg-violet-100 px-2 py-0.5 font-mono text-xs font-medium text-violet-900">
                        H{h.level}
                      </span>
                    </td>
                    <td className="max-w-[1px] px-3 py-2 text-zinc-800">{h.text || <span className="text-zinc-400">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-violet-100 bg-zinc-950 p-4 text-violet-50 shadow-inner">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-200">Outline</h3>
              <button
                type="button"
                onClick={() => void copyOutline()}
                className="rounded-full border border-violet-400/40 bg-violet-950/50 px-3 py-1 text-xs text-violet-100 transition hover:border-violet-300"
              >
                Copia outline
              </button>
            </div>
            <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-violet-100/95">
              {analysis.outlineText}
            </pre>
          </div>
        </div>
      ) : null}

      {analysis && analysis.findings.length > 0 ? (
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Segnalazioni</h3>
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
            >
              Copia report completo
            </button>
          </div>
          <ul className="space-y-2">
            {analysis.findings.map((f, idx) => (
              <FindingRow key={`${idx}-${f.message.slice(0, 40)}`} finding={f} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
