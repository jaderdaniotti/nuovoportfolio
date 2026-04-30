"use client";

import { useMemo, useState } from "react";

type AuditResult = {
  titleText: string;
  titleLength: number;
  metaDescription: string;
  metaLength: number;
  canonical: string;
  h1Count: number;
  headingCounts: Record<string, number>;
  hasViewport: boolean;
  hasLang: boolean;
  missingChecks: string[];
};

function analyzeHtml(html: string): AuditResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const titleText = (doc.querySelector("title")?.textContent ?? "").trim();
  const metaDescription = (
    doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? ""
  ).trim();
  const canonical = (doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "").trim();

  const headingCounts: Record<string, number> = {
    h1: doc.querySelectorAll("h1").length,
    h2: doc.querySelectorAll("h2").length,
    h3: doc.querySelectorAll("h3").length,
    h4: doc.querySelectorAll("h4").length,
    h5: doc.querySelectorAll("h5").length,
    h6: doc.querySelectorAll("h6").length,
  };

  const hasViewport = Boolean(doc.querySelector('meta[name="viewport"]'));
  const hasLang = Boolean(doc.documentElement.getAttribute("lang"));

  const missingChecks: string[] = [];
  if (!titleText) missingChecks.push("Manca il tag title");
  if (!metaDescription) missingChecks.push("Manca meta description");
  if (!canonical) missingChecks.push("Manca canonical URL");
  if (headingCounts.h1 !== 1) missingChecks.push("H1 dovrebbe essere unico");
  if (!hasViewport) missingChecks.push("Manca meta viewport");
  if (!hasLang) missingChecks.push("Manca attributo lang su <html>");

  return {
    titleText,
    titleLength: titleText.length,
    metaDescription,
    metaLength: metaDescription.length,
    canonical,
    h1Count: headingCounts.h1,
    headingCounts,
    hasViewport,
    hasLang,
    missingChecks,
  };
}

function scoreSeo(result: AuditResult) {
  let score = 100;
  if (!result.titleText) score -= 20;
  if (result.titleLength < 35 || result.titleLength > 65) score -= 10;
  if (!result.metaDescription) score -= 20;
  if (result.metaLength < 110 || result.metaLength > 170) score -= 10;
  if (!result.canonical) score -= 15;
  if (result.h1Count !== 1) score -= 15;
  if (!result.hasViewport) score -= 5;
  if (!result.hasLang) score -= 5;
  return Math.max(0, score);
}

export function ToolAuditSeoOnPage() {
  const [input, setInput] = useState("");
  const [touched, setTouched] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return analyzeHtml(input);
  }, [input]);

  const score = result ? scoreSeo(result) : null;

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Audit tool</h2>
      <p className="mt-2 text-sm text-zinc-700">
        Incolla l&apos;HTML completo della pagina e ottieni un controllo immediato dei principali segnali SEO
        on-page.
      </p>

      <label htmlFor="audit-html" className="mt-4 block text-sm font-medium text-zinc-700">
        HTML della pagina
      </label>
      <textarea
        id="audit-html"
        rows={10}
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setTouched(true);
        }}
        placeholder="Incolla qui il codice HTML..."
        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
      />

      {!result && touched ? (
        <p className="mt-3 text-sm text-amber-700">Inserisci un HTML valido per avviare l&apos;analisi.</p>
      ) : null}

      {result ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">SEO score</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-900">{score}/100</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <InfoBox
              label="Title"
              value={`${result.titleLength} caratteri`}
              help={result.titleText || "Assente"}
            />
            <InfoBox
              label="Meta description"
              value={`${result.metaLength} caratteri`}
              help={result.metaDescription || "Assente"}
            />
            <InfoBox label="Canonical" value={result.canonical ? "Presente" : "Assente"} help={result.canonical || "-"} />
            <InfoBox label="H1" value={`${result.h1Count}`} help="Consigliato: 1" />
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm font-medium text-zinc-900">Distribuzione heading</p>
            <p className="mt-1 text-sm text-zinc-600">
              H1 {result.headingCounts.h1} · H2 {result.headingCounts.h2} · H3 {result.headingCounts.h3} · H4{" "}
              {result.headingCounts.h4} · H5 {result.headingCounts.h5} · H6 {result.headingCounts.h6}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm font-medium text-zinc-900">Fix prioritari</p>
            {result.missingChecks.length === 0 ? (
              <p className="mt-2 text-sm text-emerald-700">Nessun blocco principale rilevato.</p>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {result.missingChecks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function InfoBox({ label, value, help }: { label: string; value: string; help: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-zinc-900">{value}</p>
      <p className="mt-1 text-xs text-zinc-600 line-clamp-2">{help}</p>
    </div>
  );
}
