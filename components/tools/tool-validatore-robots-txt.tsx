"use client";

import { useCallback, useMemo, useState } from "react";
import {
  validateRobotsTxt,
  type RobotsIssue,
  type RobotsSeverity,
} from "@/lib/robots-txt-validator";

const SAMPLE_ROBOTS = `# Esempio robots.txt
User-agent: *
Disallow: /admin/
Allow: /admin/login

User-agent: Googlebot-Image
Disallow:

Sitemap: https://www.example.com/sitemap.xml
`;

function severityLabel(s: RobotsSeverity) {
  switch (s) {
    case "error":
      return "Errore";
    case "warning":
      return "Attenzione";
    default:
      return "Info";
  }
}

function severityStyles(s: RobotsSeverity) {
  switch (s) {
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950";
    default:
      return "border-sky-200 bg-sky-50 text-sky-950";
  }
}

function IssueRow({ issue }: { issue: RobotsIssue }) {
  return (
    <li
      className={`flex gap-3 rounded-lg border px-3 py-2 text-sm ${severityStyles(issue.severity)}`}
    >
      <span className="shrink-0 font-mono text-xs font-semibold opacity-80">L{issue.line}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
          {severityLabel(issue.severity)}
        </p>
        <p className="mt-0.5 leading-snug">{issue.message}</p>
      </div>
    </li>
  );
}

export function ToolValidatoreRobotsTxt() {
  const [source, setSource] = useState(SAMPLE_ROBOTS);
  const [filter, setFilter] = useState<"all" | RobotsSeverity>("all");

  const result = useMemo(() => validateRobotsTxt(source), [source]);

  const filteredIssues = useMemo(() => {
    if (filter === "all") return result.issues;
    return result.issues.filter((i) => i.severity === filter);
  }, [filter, result.issues]);

  const status = useMemo(() => {
    if (!source.trim()) {
      return {
        label: "In attesa di input",
        desc: "Incolla o scrivi un robots.txt per controllare sintassi e direttive comuni.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (result.hasErrors) {
      return {
        label: "Errori di sintassi o struttura",
        desc: "Correggi le righe evidenziate prima di pubblicare il file nella root del sito.",
        tone: "border-red-200 bg-red-50 text-red-900",
      };
    }
    if (result.hasWarnings) {
      return {
        label: "Validazione superata con avvisi",
        desc: "Il file è probabilmente interpretabile; rivedi i suggerimenti per evitare comportamenti imprevisti dei crawler.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    return {
      label: "Nessun problema rilevato",
      desc: "Sintassi coerente con le convenzioni più usate; verifica comunque su Search Console dopo il deploy.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [result.hasErrors, result.hasWarnings, source]);

  const copyReport = useCallback(async () => {
    const lines = [
      `Validatore robots.txt — riepilogo`,
      `Byte: ${result.byteLength}`,
      `User-agent: ${result.stats.userAgents}, Disallow: ${result.stats.disallow}, Allow: ${result.stats.allow}, Sitemap: ${result.stats.sitemap}`,
      ``,
      ...result.issues.map((i) => `[L${i.line}] ${i.severity.toUpperCase()}: ${i.message}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      /* ignore */
    }
  }, [result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Validatore robots.txt</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Analizza il file che istruisce i crawler: controlla il formato{" "}
          <span className="font-mono text-xs text-zinc-600">Direttiva: valore</span>, commenti con{" "}
          <span className="font-mono text-xs text-zinc-600">#</span>, gruppi{" "}
          <span className="font-mono text-xs text-zinc-600">User-agent</span> e URL{" "}
          <span className="font-mono text-xs text-zinc-600">Sitemap</span>. Il tool lavora in locale sul
          browser: nessun upload al server.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-1 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2">
          <span className="font-mono text-xs text-zinc-400">robots.txt</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSource(SAMPLE_ROBOTS)}
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
          rows={14}
          className="w-full resize-y bg-transparent px-3 py-3 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-600"
          placeholder="# User-agent: *&#10;Disallow: /private/"
        />
      </div>

      <div className={`rounded-xl border p-4 ${status.tone}`}>
        <p className="text-sm font-semibold">{status.label}</p>
        <p className="mt-1 text-sm opacity-90">{status.desc}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Dimensione</p>
          <p className="mt-1 font-mono text-xl font-semibold text-zinc-900">{result.byteLength} B</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Gruppi (~)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-zinc-900">{result.stats.approxGroups}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Regole path</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900">
            <span className="font-mono text-emerald-800">A {result.stats.allow}</span>
            <span className="mx-1 text-zinc-400">·</span>
            <span className="font-mono text-rose-800">D {result.stats.disallow}</span>
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Sitemap</p>
          <p className="mt-1 font-mono text-xl font-semibold text-zinc-900">{result.stats.sitemap}</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-zinc-900">Esito analisi</h3>
          <div className="flex flex-wrap gap-2">
            {(["all", "error", "warning", "info"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  filter === key
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {key === "all"
                  ? `Tutti (${result.issues.length})`
                  : `${severityLabel(key)} (${result.issues.filter((i) => i.severity === key).length})`}
              </button>
            ))}
            <button
              type="button"
              onClick={copyReport}
              disabled={!source.trim()}
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 disabled:opacity-40"
            >
              Copia report
            </button>
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-600">
            {filter === "all"
              ? "Nessun messaggio: il file è vuoto o non presenta problemi secondo queste regole."
              : "Nessun messaggio per questo filtro."}
          </p>
        ) : (
          <ul className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
            {filteredIssues.map((issue, idx) => (
              <IssueRow key={`${issue.line}-${issue.message}-${idx}`} issue={issue} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
