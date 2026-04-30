"use client";

import { useCallback, useMemo, useState } from "react";
import { parseUniqueSecondaryLines } from "@/lib/content-brief-generator";
import {
  BRIEF_INTENT_LABEL,
  briefIntentOptions,
  buildFaqSeo,
  formatFaqJsonLdString,
  formatFaqMarkdownReport,
  formatFaqPlainBlock,
  validateFaqSeoInput,
  type BriefSearchIntent,
} from "@/lib/faq-seo-generator";

const SAMPLE_SECONDARY = `quanto costa una consulenza SEO
tempi indicizzazione Google
differenza tra SEO tecnica e contenuti`;

export function ToolGeneratoreFaqSeo() {
  const [primaryTopic, setPrimaryTopic] = useState("consulenza SEO per e-commerce");
  const [intent, setIntent] = useState<BriefSearchIntent>("informational");
  const [audienceHint, setAudienceHint] = useState(
    "Responsabili e-commerce mid-market con cataloghi 2k+ SKU e margini compressi",
  );
  const [brandOrProject, setBrandOrProject] = useState("Studio SEO");
  const [secondaryRaw, setSecondaryRaw] = useState(SAMPLE_SECONDARY);
  const [pairCount, setPairCount] = useState(8);

  const secondaryLines = useMemo(() => parseUniqueSecondaryLines(secondaryRaw), [secondaryRaw]);

  const validationError = useMemo(() => validateFaqSeoInput(primaryTopic), [primaryTopic]);

  const result = useMemo(() => {
    if (validationError) return null;
    return buildFaqSeo({
      primaryTopic,
      intent,
      audienceHint,
      brandOrProject,
      secondaryLines,
      pairCount,
    });
  }, [validationError, primaryTopic, intent, audienceHint, brandOrProject, secondaryLines, pairCount]);

  const jsonLdPretty = useMemo(() => {
    if (!result) return "";
    return formatFaqJsonLdString(result.pairs, "https://example.com/faq", true);
  }, [result]);

  const copyMarkdown = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatFaqMarkdownReport(result));
    } catch {
      /* ignore */
    }
  }, [result]);

  const copyPlain = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatFaqPlainBlock(result));
    } catch {
      /* ignore */
    }
  }, [result]);

  const copyJsonLd = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(jsonLdPretty);
    } catch {
      /* ignore */
    }
  }, [result, jsonLdPretty]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/35 to-teal-50/45 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">FAQ SEO — bozze domanda/risposta</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Genera set di FAQ coerenti con l’intento di ricerca stimato (informativo, commerciale, transazionale,
              navigazionale). Utile per sezioni accordion, landing lunghe e markup{" "}
              <span className="font-mono text-xs text-teal-800">FAQPage</span> in JSON-LD — tutto elaborato nel browser,
              senza API esterne.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPrimaryTopic("consulenza SEO per e-commerce");
              setSecondaryRaw(SAMPLE_SECONDARY);
              setIntent("informational");
              setAudienceHint(
                "Responsabili e-commerce mid-market con cataloghi 2k+ SKU e margini compressi",
              );
              setBrandOrProject("Studio SEO");
              setPairCount(8);
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Tema / keyword principale
            <input
              type="text"
              value={primaryTopic}
              onChange={(e) => setPrimaryTopic(e.target.value)}
              placeholder="Es. certificazione energetica vendita casa"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Intent SERP (stima)
            <select
              value={intent}
              onChange={(e) => setIntent(e.target.value as BriefSearchIntent)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              {briefIntentOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Numero coppie FAQ
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={3}
                max={15}
                value={pairCount}
                onChange={(e) => setPairCount(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-teal-600"
              />
              <span className="w-8 tabular-nums text-sm font-medium text-zinc-800">{pairCount}</span>
            </div>
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Pubblico / persona (orienta tono e risposte)
            <input
              type="text"
              value={audienceHint}
              onChange={(e) => setAudienceHint(e.target.value)}
              placeholder="Es. PMI di servizi B2B che investono per la prima volta in content marketing."
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Brand / progetto (opzionale)
            <input
              type="text"
              value={brandOrProject}
              onChange={(e) => setBrandOrProject(e.target.value)}
              placeholder="Nome sito, blog o servizio"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Query long-tail o domande spin-off (una per riga, priorità in cima alla lista)
            <textarea
              rows={5}
              value={secondaryRaw}
              onChange={(e) => setSecondaryRaw(e.target.value)}
              placeholder="Incolla People Also Ask, Search Console o idee dal keyword research."
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>
        </div>
      </div>

      {validationError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">{validationError}</div>
      ) : !result ? null : (
        <>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-950">
              {BRIEF_INTENT_LABEL[result.intent]}
            </span>
            <span className="tabular-nums text-zinc-600">
              {result.pairs.length} coppie · {secondaryLines.length} long-tail in input
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyMarkdown}
                className="rounded-full border border-teal-300 bg-teal-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
              >
                Copia report Markdown
              </button>
              <button
                type="button"
                onClick={copyPlain}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400"
              >
                Copia D/R testo
              </button>
              <button
                type="button"
                onClick={copyJsonLd}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400"
              >
                Copia JSON-LD FAQPage
              </button>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-zinc-500">{result.disclaimer}</p>

          <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4 text-sm text-teal-950">
            <p className="font-medium text-teal-900">Suggerimento intento</p>
            <p className="mt-1 leading-relaxed">{result.intentNote}</p>
          </div>

          <ul className="space-y-4">
            {result.pairs.map((p, i) => (
              <li
                key={`${i}-${p.question.slice(0, 24)}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">Domanda {i + 1}</p>
                <p className="mt-2 font-medium leading-snug text-zinc-900">{p.question}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">{p.answer}</p>
              </li>
            ))}
          </ul>

          <details className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-800">Anteprima JSON-LD (FAQPage)</summary>
            <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-zinc-900 p-3 text-xs leading-relaxed text-emerald-100">
              {jsonLdPretty}
            </pre>
            <p className="mt-2 text-[11px] text-zinc-500">
              Sostituisci l’URL placeholder con la URL canonica della pagina prima del deploy.
            </p>
          </details>
        </>
      )}
    </section>
  );
}
