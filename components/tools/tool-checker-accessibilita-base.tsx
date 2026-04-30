"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  analyzeAccessibilityDocument,
  type AccessibilityAnalysis,
  type AccessibilityFinding,
  type AccessibilitySeverity,
} from "@/lib/accessibility-base-checker";

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Pagina demo accessibilità</title>
</head>
<body>
  <main>
    <h1>Contatti</h1>
    <p id="dup">Duplicato</p>
    <p id="dup">Stesso ID di sopra</p>
    <img src="/hero.jpg" />
    <a href="/home"><img src="/logo.svg" /></a>
    <a href="/privacy"></a>
    <button type="button"></button>
    <input type="text" name="email" placeholder="solo placeholder" />
    <iframe src="https://example.com/map"></iframe>
    <table><tr><td>A</td><td>B</td></tr></table>
  </main>
</body>
</html>
`;

function severityLabel(s: AccessibilitySeverity) {
  switch (s) {
    case "error":
      return "Errore";
    case "warning":
      return "Attenzione";
    default:
      return "Info";
  }
}

function severityStyles(s: AccessibilitySeverity) {
  switch (s) {
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950";
    default:
      return "border-sky-200 bg-sky-50 text-sky-950";
  }
}

function FindingRow({ finding }: { finding: AccessibilityFinding }) {
  return (
    <li className={`rounded-lg border px-3 py-2 text-sm leading-snug ${severityStyles(finding.severity)}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{severityLabel(finding.severity)}</p>
      <p className="mt-0.5">{finding.message}</p>
    </li>
  );
}

export function ToolCheckerAccessibilitaBase() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [analysis, setAnalysis] = useState<AccessibilityAnalysis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof DOMParser === "undefined") {
      return;
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    setAnalysis(analyzeAccessibilityDocument(doc));
  }, [html]);

  const status = useMemo(() => {
    if (!html.trim()) {
      return {
        label: "In attesa di HTML",
        desc: "Incolla un documento o frammento parsabile: il checker usa DOMParser nel browser (nessun upload).",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (!analysis) {
      return {
        label: "Analisi…",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
        desc: "Elaborazione euristica in corso.",
      };
    }
    if (analysis.hasErrors) {
      return {
        label: "Correzioni necessarie",
        desc: "Almeno un controllo WCAG-oriented è fallito (es. img senza alt, ID duplicati, link senza nome).",
        tone: "border-red-200 bg-red-50 text-red-900",
      };
    }
    if (analysis.hasWarnings) {
      return {
        label: "Da rivedere",
        desc: "Solo avvisi o note: lang, etichette form, iframe title, ecc.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    return {
      label: "Nessun problema grave rilevato",
      desc: "Le euristiche non hanno trovato errori critici sul markup analizzato.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [analysis, html]);

  const copyReport = useCallback(async () => {
    if (!analysis) return;
    try {
      await navigator.clipboard.writeText(analysis.reportText);
    } catch {
      /* ignore */
    }
  }, [analysis]);

  const grouped = useMemo(() => {
    if (!analysis) return { errors: 0, warnings: 0, infos: 0 };
    let errors = 0;
    let warnings = 0;
    let infos = 0;
    for (const f of analysis.findings) {
      if (f.severity === "error") errors += 1;
      else if (f.severity === "warning") warnings += 1;
      else infos += 1;
    }
    return { errors, warnings, infos };
  }, [analysis]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-zinc-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Controllo accessibilità base</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Audit rapido sul markup HTML in locale:{" "}
          <span className="font-mono text-xs text-zinc-600">lang</span>,{" "}
          <span className="font-mono text-xs text-zinc-600">title</span>, viewport, ID univoci,{" "}
          <span className="font-mono text-xs text-zinc-600">alt</span> sulle immagini, nomi accessibili di link e pulsanti,
          etichette per campi form, titoli sugli iframe e segnali minimi sulle tabelle. Non sostituisce test automatici
          completi né revisioni con assistive technologies.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="a11y-html" className="text-sm font-medium text-zinc-800">
          HTML documento o frammento
        </label>
        <textarea
          id="a11y-html"
          rows={14}
          spellCheck={false}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="min-h-[200px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner outline-none ring-offset-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHtml(SAMPLE_HTML)}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-teal-400 hover:text-zinc-900"
          >
            Ripristina esempio
          </button>
          <button
            type="button"
            onClick={() => setHtml("")}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-teal-400 hover:text-zinc-900"
          >
            Svuota
          </button>
        </div>
      </div>

      <div className={`rounded-xl border px-4 py-3 text-sm ${status.tone}`}>
        <p className="font-semibold">{status.label}</p>
        <p className="mt-1 text-xs opacity-90">{status.desc}</p>
        {analysis ? (
          <p className="mt-2 text-xs opacity-90">
            Conteggio:{" "}
            <span className="font-medium text-red-800">{grouped.errors} errori</span>,{" "}
            <span className="font-medium text-amber-900">{grouped.warnings} avvisi</span>,{" "}
            <span className="font-medium text-sky-900">{grouped.infos} info</span>
          </p>
        ) : null}
      </div>

      {analysis && analysis.findings.length > 0 ? (
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Segnalazioni</h3>
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
              <FindingRow key={`${idx}-${f.message.slice(0, 48)}`} finding={f} />
            ))}
          </ul>
        </div>
      ) : analysis && analysis.findings.length === 0 ? (
        <p className="text-sm text-zinc-600">Nessuna segnalazione sul markup corrente.</p>
      ) : null}
    </section>
  );
}
