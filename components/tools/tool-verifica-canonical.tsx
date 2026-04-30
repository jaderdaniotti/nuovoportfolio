"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  analyzeCanonicalDocument,
  type CanonicalAnalysis,
  type CanonicalFinding,
  type CanonicalSeverity,
} from "@/lib/canonical-verifier";

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <title>Esempio prodotto</title>
  <link rel="canonical" href="https://www.example.com/prodotto/widget" />
</head>
<body>
  <main><h1>Widget</h1></main>
</body>
</html>
`;

function severityLabel(s: CanonicalSeverity) {
  switch (s) {
    case "error":
      return "Errore";
    case "warning":
      return "Attenzione";
    default:
      return "Info";
  }
}

function severityStyles(s: CanonicalSeverity) {
  switch (s) {
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950";
    default:
      return "border-sky-200 bg-sky-50 text-sky-950";
  }
}

function FindingRow({ finding }: { finding: CanonicalFinding }) {
  return (
    <li className={`rounded-lg border px-3 py-2 text-sm leading-snug ${severityStyles(finding.severity)}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{severityLabel(finding.severity)}</p>
      <p className="mt-0.5">{finding.message}</p>
    </li>
  );
}

export function ToolVerificaCanonical() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [pageUrl, setPageUrl] = useState("https://www.example.com/prodotto/widget");
  const [analysis, setAnalysis] = useState<CanonicalAnalysis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof DOMParser === "undefined") {
      return;
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    setAnalysis(analyzeCanonicalDocument(doc, pageUrl.trim() || undefined));
  }, [html, pageUrl]);

  const status = useMemo(() => {
    if (!html.trim()) {
      return {
        label: "In attesa di HTML",
        desc: "Incolla il sorgente della pagina (o almeno il <head>) per elencare i tag canonical e verificarne coerenza.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (!analysis) {
      return {
        label: "Analisi…",
        desc: "Prepara il report in locale nel browser.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (analysis.hasErrors) {
      return {
        label: "Da correggere",
        desc: "Ci sono errori su canonical mancanti, in conflitto o non validi.",
        tone: "border-red-200 bg-red-50 text-red-900",
      };
    }
    if (analysis.hasWarnings) {
      return {
        label: "Revisione consigliata",
        desc: "Canonical presente ma con avvisi (duplicati, confronto con URL pubblica, ecc.).",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    return {
      label: "Scenario coerente",
      desc: "Nessun problema bloccante rilevato sull’insieme dei canonical.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [analysis, html]);

  const copyReport = useCallback(async () => {
    if (!analysis) return;
    const lines = [
      `Verifica canonical — riepilogo`,
      analysis.entries.length
        ? analysis.entries.map((e) => `  #${e.index} href=${e.hrefRaw} → ${e.resolved ?? "(non risolto)"}`).join("\n")
        : "  Nessun tag canonical",
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
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Verifica canonical URL</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Incolla l&apos;HTML della pagina: il tool trova tutti i{" "}
          <span className="font-mono text-xs text-zinc-600">link[rel~=canonical]</span> in{" "}
          <span className="font-mono text-xs text-zinc-600">&lt;head&gt;</span> o nel documento, normalizza gli
          URL e segnala canonical mancanti, duplicati direttivi o href non validi. Opzionale: confronta con
          l&apos;URL pubblica reale della pagina.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_minmax(0,260px)] md:items-start">
        <div className="space-y-2">
          <label htmlFor="canonical-html" className="text-sm font-medium text-zinc-800">
            HTML (sorgente o frammento head)
          </label>
          <textarea
            id="canonical-html"
            rows={14}
            spellCheck={false}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="min-h-[200px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner outline-none ring-offset-2 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setHtml(SAMPLE_HTML)}
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
            >
              Ripristina esempio
            </button>
            <button
              type="button"
              onClick={() => {
                setHtml("");
                setPageUrl("");
              }}
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
            >
              Svuota campi
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="canonical-page-url" className="text-sm font-medium text-zinc-800">
            URL pubblica della pagina <span className="font-normal text-zinc-500">(opzionale)</span>
          </label>
          <input
            id="canonical-page-url"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://www.example.com/…"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-offset-2 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300"
          />
          <p className="text-xs text-zinc-600">
            Serve a risolvere href relativi e a confrontare canonical dichiarato vs URL effettivo nella barra
            degli indirizzi.
          </p>
        </div>
      </div>

      <div className={`rounded-xl border px-4 py-3 text-sm ${status.tone}`}>
        <p className="font-semibold">{status.label}</p>
        <p className="mt-1 text-xs opacity-90">{status.desc}</p>
      </div>

      {analysis && analysis.entries.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">href nel markup</th>
                <th className="px-3 py-2 font-medium">Normalizzato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {analysis.entries.map((e) => (
                <tr key={`${e.index}-${e.hrefRaw}`}>
                  <td className="px-3 py-2 font-mono text-xs">{e.index}</td>
                  <td className="max-w-[1px] break-all px-3 py-2 font-mono text-xs text-zinc-800">{e.hrefRaw || "—"}</td>
                  <td className="max-w-[1px] break-all px-3 py-2 font-mono text-xs text-emerald-900">
                    {e.resolved ?? (
                      <span className="text-red-700">non risolvibile</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {analysis && analysis.findings.length > 0 ? (
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Esito analisi</h3>
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
            >
              Copia report
            </button>
          </div>
          <ul className="space-y-2">
            {analysis.findings.map((f, idx) => (
              <FindingRow key={`${idx}-${f.message.slice(0, 32)}`} finding={f} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
