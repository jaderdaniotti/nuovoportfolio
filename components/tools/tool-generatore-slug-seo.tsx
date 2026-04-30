"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildSeoSlug,
  formatSeoSlugReport,
  validateSlugSource,
} from "@/lib/seo-slug-generator";

const SAMPLE_TITLE = `Guida pratica all'indicizzazione veloce (FAQ + checklist 2026)`;

export function ToolGeneratoreSlugSeo() {
  const [raw, setRaw] = useState(SAMPLE_TITLE);
  const [maxLength, setMaxLength] = useState(72);
  const [pathPrefix, setPathPrefix] = useState("/blog");
  const [copied, setCopied] = useState(false);

  const sourceError = useMemo(() => validateSlugSource(raw), [raw]);

  const result = useMemo(() => {
    if (sourceError) return null;
    return buildSeoSlug(raw, { maxLength });
  }, [raw, maxLength, sourceError]);

  const copySlug = useCallback(async () => {
    if (!result?.slug) return;
    try {
      await navigator.clipboard.writeText(result.slug);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [result?.slug]);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        formatSeoSlugReport(result.normalizedSource, result.slug, pathPrefix || undefined),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [pathPrefix, result]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-violet-50/40 to-fuchsia-50/35 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Slug SEO-friendly</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Trasforma titoli H1, headline o breadcrumb testuali in segmenti URL puliti: minuscolo, trattini al posto
              degli spazi, accenti rimossi, caratteri speciali eliminati. Puoi impostare un limite di lunghezza e
              vedere un percorso esempio per blog o wiki — tutto calcolato nel browser.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRaw(SAMPLE_TITLE);
              setMaxLength(72);
              setPathPrefix("/blog");
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Titolo o frase sorgente
            <textarea
              rows={3}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="Es. Come scegliere l'hosting WordPress per e‑commerce B2B?"
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Lunghezza massima slug
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={32}
                max={120}
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-violet-600"
              />
              <span className="w-10 tabular-nums text-sm font-medium text-zinc-800">{maxLength}</span>
            </div>
            <span className="mt-1 block text-xs text-zinc-500">Utile per evitare URL troppo lunghi in SERP e CMS.</span>
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Prefisso percorso (opzionale)
            <input
              type="text"
              value={pathPrefix}
              onChange={(e) => setPathPrefix(e.target.value)}
              placeholder="/blog, /guide, /docs"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>
        </div>
      </div>

      {sourceError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{sourceError}</div>
      ) : result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Slug generato</p>
                <p className="mt-2 break-all font-mono text-lg text-zinc-900">{result.slug || "—"}</p>
                {result.slug ? (
                  <p className="mt-2 text-sm text-zinc-600">
                    <span className="font-medium text-zinc-800">{result.slug.length}</span> caratteri
                    {pathPrefix.trim() && result.slug ? (
                      <>
                        {" · "}
                        <span className="font-mono text-violet-900">
                          {(pathPrefix.trim().replace(/\/+$/, "") || "") + "/" + result.slug}
                        </span>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!result.slug}
                  onClick={copySlug}
                  className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-900 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? "Copiato" : "Copia slug"}
                </button>
                <button
                  type="button"
                  disabled={!result.slug}
                  onClick={copyReport}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copia report
                </button>
              </div>
            </div>
          </div>

          {result.warnings.length > 0 ? (
            <ul className="space-y-2 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm text-amber-950">
              {result.warnings.map((w) => (
                <li key={w.code}>{w.message}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-600">
              Nessun avviso strutturale: verifica sempre duplicati nel CMS e coerenza con il piano URL del sito.
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
