"use client";

import { useCallback, useMemo, useState } from "react";
import {
  BRIEF_INTENT_LABEL,
  buildContentBrief,
  formatContentBriefReport,
  parseUniqueSecondaryLines,
  validateContentBriefInput,
  briefIntentOptions,
  briefPageTypeOptions,
  type BriefPageType,
  type BriefSearchIntent,
} from "@/lib/content-brief-generator";

const SAMPLE_SECONDARY = `guida pillar impianto fotovoltaico
detrazioni 2026 fotovoltaico
manutenzione pannelli domestici`;

export function ToolContentBriefGenerator() {
  const [primaryKeyword, setPrimaryKeyword] = useState("fotovoltaico residenziale");
  const [pageType, setPageType] = useState<BriefPageType>("blog-article");
  const [intent, setIntent] = useState<BriefSearchIntent>("informational");
  const [audienceHint, setAudienceHint] = useState(
    "Proprietari di ville e villette in fascia energivora (fino a zona climatica E)",
  );
  const [brandOrProject, setBrandOrProject] = useState("Blog green energy");
  const [secondaryRaw, setSecondaryRaw] = useState(SAMPLE_SECONDARY);

  const secondaryLines = useMemo(() => parseUniqueSecondaryLines(secondaryRaw), [secondaryRaw]);

  const validationError = useMemo(() => validateContentBriefInput(primaryKeyword), [primaryKeyword]);

  const brief = useMemo(() => {
    if (validationError) return null;
    return buildContentBrief({
      primaryKeyword,
      pageType,
      intent,
      audienceHint,
      brandOrProject,
      secondaryLines,
    });
  }, [validationError, primaryKeyword, pageType, intent, audienceHint, brandOrProject, secondaryLines]);

  const copyReport = useCallback(async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(formatContentBriefReport(brief));
    } catch {
      // ignore
    }
  }, [brief]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-sky-50/40 to-indigo-50/50 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Brief contenuto SEO (singola pagina)</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Genera uno schema operativo: titoli, meta, outline H2/H3, domande da coprire, idee di linking interno e
              checklist on-page — interamente nel browser sulla keyword primaria che indichi. Utile prima di buttare giù il
              testo o briefing un copywriter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPrimaryKeyword("fotovoltaico residenziale");
              setSecondaryRaw(SAMPLE_SECONDARY);
              setPageType("blog-article");
              setIntent("informational");
              setAudienceHint(
                "Proprietari di ville e villette in fascia energivora (fino a zona climatica E)",
              );
              setBrandOrProject("Blog green energy");
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Keyword primaria (o tema obbligatorio)
            <input
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              placeholder="Es. migliori scarpe trail running waterproof"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Tipo di pagina
            <select
              value={pageType}
              onChange={(e) => setPageType(e.target.value as BriefPageType)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              {briefPageTypeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Intent SERP stimato
            <select
              value={intent}
              onChange={(e) => setIntent(e.target.value as BriefSearchIntent)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              {briefIntentOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Pubblico / persona (hint operativo)
            <input
              type="text"
              value={audienceHint}
              onChange={(e) => setAudienceHint(e.target.value)}
              placeholder="Es. PMI di servizio con canale inbound maturo ma poco contenuto tecnico."
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Brand / progetto editoriale (opzionale, appeso ai titoli)
            <input
              type="text"
              value={brandOrProject}
              onChange={(e) => setBrandOrProject(e.target.value)}
              placeholder="Nome blog, sito o prodotto"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Keyword secondarie / cluster (una per riga, opzionale)
            <textarea
              rows={5}
              value={secondaryRaw}
              onChange={(e) => setSecondaryRaw(e.target.value)}
              placeholder="Collegate semanticamente alla primaria: servono outline e suggerimenti di link."
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </label>
        </div>
      </div>

      {validationError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">{validationError}</div>
      ) : !brief ? null : (
        <>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
            <span className="font-medium text-zinc-900">
              Fascia suggerita: {brief.wordCountBand}
            </span>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-950">
              {secondaryLines.length} secondarie elaborate
            </span>
            <button
              type="button"
              onClick={copyReport}
              className="ml-auto rounded-full border border-indigo-300 bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
            >
              Copia brief completo
            </button>
          </div>

          <p className="text-xs leading-relaxed text-zinc-500">{brief.disclaimer}</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-800">Titoli proposti</h3>
              <ul className="mt-3 space-y-2 text-sm leading-snug text-zinc-800">
                {brief.suggestedTitles.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="tabular-nums text-xs text-zinc-400">{i + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-800">Meta &amp; H1</h3>
              <dl className="mt-3 space-y-4 text-sm text-zinc-800">
                <div>
                  <dt className="text-xs font-medium text-zinc-500">Title (≤60)</dt>
                  <dd className="mt-1 leading-snug">{brief.metaTitleSuggestion}</dd>
                  <span className="mt-1 inline-block text-[10px] text-zinc-400">
                    {brief.metaTitleSuggestion.length} caratteri
                  </span>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-500">Meta description (~145–158)</dt>
                  <dd className="mt-1 leading-snug">{brief.metaDescriptionSuggestion}</dd>
                  <span className="mt-1 inline-block text-[10px] text-zinc-400">
                    {brief.metaDescriptionSuggestion.length} caratteri
                  </span>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-500">H1</dt>
                  <dd className="mt-1 font-medium leading-snug text-zinc-900">{brief.h1Suggestion}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-800">Outline</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {brief.outline.map((b, idx) =>
                b.level === "h2" ? (
                  <li key={idx} className="border-l-2 border-indigo-200 pl-4">
                    <p className="font-semibold text-zinc-900">{b.title}</p>
                    {b.notes ? <p className="mt-1 text-xs italic text-zinc-600">{b.notes}</p> : null}
                  </li>
                ) : (
                  <li key={idx} className="border-l border-dashed border-zinc-300 pl-6">
                    <p className="text-zinc-800">
                      <span className="text-[10px] font-semibold uppercase text-zinc-400">h3 · </span>
                      {b.title}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-800">Domande da coprire</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                {brief.questionsToAnswer.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-800">Angolo differenziazione</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">{brief.differentiationAngle}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-800">Idee linking interno</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {brief.internalLinkIdeas.map((x, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500">↗</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-sky-100 bg-sky-50/80 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-900">Checklist SEO ({BRIEF_INTENT_LABEL[brief.intent]})</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-sky-950">
              {brief.seoChecklist.map((c, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-medium text-sky-700">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
