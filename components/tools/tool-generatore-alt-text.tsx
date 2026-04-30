"use client";

import { useCallback, useMemo, useState } from "react";
import {
  altImageRoleOptions,
  buildAltTextResult,
  formatAltTextReport,
  normalizeAltSubject,
  validateAltTextInput,
  type AltImageRole,
} from "@/lib/alt-text-generator";

function charBand(n: number) {
  if (n === 0) return { label: "—", tone: "text-zinc-500 bg-zinc-50 border-zinc-200" };
  if (n < 15) return { label: "Molto breve", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  if (n > 160) return { label: "Molto lunga", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  if (n >= 15 && n <= 140) return { label: "Range consigliato", tone: "text-emerald-900 bg-emerald-50 border-emerald-200" };
  return { label: "Accettabile", tone: "text-sky-900 bg-sky-50 border-sky-200" };
}

const SAMPLE_SUBJECT = "Tecnico con casco giallo che installa pannelli solari sul tetto di un edificio residenziale";
const SAMPLE_PAGE = "Guida all’impianto fotovoltaico domestico: costi, permessi e manutenzione";
const SAMPLE_FILE = "installazione-fotovoltaico-tetto-2026.jpg";

export function ToolGeneratoreAltText() {
  const [subject, setSubject] = useState(SAMPLE_SUBJECT);
  const [pageContext, setPageContext] = useState(SAMPLE_PAGE);
  const [filenameHint, setFilenameHint] = useState(SAMPLE_FILE);
  const [imageRole, setImageRole] = useState<AltImageRole>("hero");
  const [maxLength, setMaxLength] = useState(125);

  const validationError = useMemo(() => validateAltTextInput(subject, maxLength, imageRole), [subject, maxLength, imageRole]);

  const result = useMemo(() => {
    if (validationError) return null;
    if (imageRole === "decorative") {
      return buildAltTextResult({
        subject: normalizeAltSubject(subject) || "elemento decorativo",
        pageContext: "",
        imageRole: "decorative",
        filenameHint: "",
        maxLength,
      });
    }
    return buildAltTextResult({
      subject,
      pageContext,
      imageRole,
      filenameHint,
      maxLength,
    });
  }, [validationError, subject, pageContext, filenameHint, imageRole, maxLength]);

  const copyText = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  }, []);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatAltTextReport(result, subject));
    } catch {
      // ignore
    }
  }, [result, subject]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-violet-50/50 to-fuchsia-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">ALT text per immagini (accessibilità e SEO)</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Ottieni varianti di testo alternativo descrittivo partendo dal contenuto visivo che indichi, dal contesto di
              pagina e dal ruolo dell’immagine (hero, prodotto, grafico…). Tutto calcolato nel browser — adatto a chi
              pubblica articoli, cataloghi o landing e vuole restare allineato a WCAG senza keyword stuffing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubject(SAMPLE_SUBJECT);
              setPageContext(SAMPLE_PAGE);
              setFilenameHint(SAMPLE_FILE);
              setImageRole("hero");
              setMaxLength(125);
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-violet-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Cosa mostra l’immagine (soggetto + azione o dettaglio utile)
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              rows={3}
              placeholder="Es. Barista che versa latte art in tazza ceramica bianca sul bancone"
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Contesto pagina o articolo (opzionale)
            <input
              type="text"
              value={pageContext}
              onChange={(e) => setPageContext(e.target.value)}
              disabled={imageRole === "decorative"}
              placeholder="Es. Scheda prodotto scarpe trail waterproof"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Ruolo dell’immagine
            <select
              value={imageRole}
              onChange={(e) => setImageRole(e.target.value as AltImageRole)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              {altImageRoleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Lunghezza massima (caratteri)
            <input
              type="number"
              min={40}
              max={300}
              value={maxLength}
              disabled={imageRole === "decorative"}
              onChange={(e) => setMaxLength(Number(e.target.value) || 125)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Nome file o slug (opzionale, suggerisce lessico)
            <input
              type="text"
              value={filenameHint}
              onChange={(e) => setFilenameHint(e.target.value)}
              disabled={imageRole === "decorative"}
              placeholder="Es. trail-shoes-mud-hero.webp"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
            />
          </label>
        </div>
      </div>

      {validationError ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{validationError}</p>
      ) : null}

      {result && imageRole !== "decorative" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-zinc-900">Varianti di ALT text</h3>
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-violet-300 bg-white px-4 py-2 text-sm text-violet-900 transition hover:border-violet-400"
            >
              Copia report completo
            </button>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {result.variants.map((v) => {
              const band = charBand(v.text.length);
              return (
                <li
                  key={v.id}
                  className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-violet-700">{v.label}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${band.tone}`}>
                      {v.text.length} car. · {band.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-800">{v.text}</p>
                  <button
                    type="button"
                    onClick={() => void copyText(v.text)}
                    className="mt-3 self-start rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 transition hover:border-violet-400 hover:text-zinc-900"
                  >
                    Copia testo
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Snippet HTML</p>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
              {result.htmlExample}
            </pre>
            <button
              type="button"
              onClick={() => void copyText(result.htmlExample)}
              className="mt-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 transition hover:border-violet-400"
            >
              Copia markup test
            </button>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">Suggerimenti rapidi</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-emerald-950">
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {result && imageRole === "decorative" ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-violet-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-900">Immagine decorativa</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{result.decorativeGuidance}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-600">
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
              {result.htmlExample}
            </pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void copyText(result.htmlExample)}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-violet-400"
              >
                Copia markup
              </button>
              <button
                type="button"
                onClick={() => void copyReport()}
                className="rounded-full border border-violet-300 bg-violet-50 px-4 py-2 text-sm text-violet-900 transition hover:border-violet-400"
              >
                Copia report
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {result ? (
        <p className="text-xs leading-relaxed text-zinc-500">{result.disclaimer}</p>
      ) : null}
    </section>
  );
}
