"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildEditorialPlan,
  contentHintLabel,
  formatEditorialPlanReport,
  funnelLabel,
  parseUniqueKeywordLines,
  validateEditorialPlanInput,
  type NichePreset,
} from "@/lib/editorial-plan-generator";

const SAMPLE_KEYWORDS = `mutuo prima casa giovani
guida alla surroga mutuo
risparmio energetico detrazioni 2026
checklist passive house
bonus ristrutturazione bagno`;

export function ToolGeneratorePianoEditoriale() {
  const [theme, setTheme] = useState("Finance blog — mutui e casa");
  const [weeks, setWeeks] = useState(6);
  const [postsPerWeek, setPostsPerWeek] = useState(3);
  const [niche, setNiche] = useState<NichePreset>("content-blog");
  const [keywordRaw, setKeywordRaw] = useState(SAMPLE_KEYWORDS);

  const validationError = useMemo(
    () => validateEditorialPlanInput(theme, weeks, postsPerWeek),
    [theme, weeks, postsPerWeek],
  );

  const keywordLines = useMemo(() => parseUniqueKeywordLines(keywordRaw), [keywordRaw]);

  const plan = useMemo(() => {
    if (validationError) return null;
    return buildEditorialPlan({
      theme,
      weeks,
      postsPerWeek,
      niche,
      keywordLines,
    });
  }, [validationError, theme, weeks, postsPerWeek, niche, keywordLines]);

  const copyReport = useCallback(async () => {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(formatEditorialPlanReport(plan));
    } catch {
      // ignore
    }
  }, [plan]);

  const idleTheme = !theme.trim();

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/25 to-zinc-50/80 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Roadmap contenuti multi-settimana</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Imposta tema, durata e ritmo di pubblicazione. Opzionalmente incolla keyword o topic (una per riga) da
              alternare come focus: il tool costruisce titoli suggeriti, tipo di contenuto, fase funnel e una mini
              checklist SEO — tutto nel browser, senza chiamate esterne.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setKeywordRaw(SAMPLE_KEYWORDS);
              setTheme("Finance blog — mutui e casa");
              setWeeks(6);
              setPostsPerWeek(3);
              setNiche("content-blog");
            }}
            className="shrink-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Tema della rubrica / brand editoriale
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Es. Blog aziendale su efficienza energetica residenziale"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Numero settimane (2–24)
            <input
              type="number"
              min={2}
              max={24}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Contenuti per settimana (1–7)
            <input
              type="number"
              min={1}
              max={7}
              value={postsPerWeek}
              onChange={(e) => setPostsPerWeek(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Preset di nicchia (adatta lingua titoli & angolazioni)
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value as NichePreset)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="content-blog">Blog / magazine contenuti</option>
              <option value="ecommerce">E-commerce / cataloghi</option>
              <option value="local-services">Servizi locali</option>
              <option value="saas-b2b">SaaS B2B / product content</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Keyword / topic focali (opzionale, una per riga)
            <textarea
              rows={6}
              value={keywordRaw}
              onChange={(e) => setKeywordRaw(e.target.value)}
              placeholder="Ogni riga = possibile angolo prioritario nella roadmap…"
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </label>
        </div>
      </div>

      {idleTheme ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
          Inserisci un tema principale per generare il piano editoriale.
        </div>
      ) : validationError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">{validationError}</div>
      ) : !plan ? null : (
        <>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
            <span className="font-medium text-zinc-900">
              {plan.totalSlots} contenuti · {plan.weeksTotal} settimane · {plan.postsPerWeek}/settimana
            </span>
            {keywordLines.length > 0 ? (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-900">
                {keywordLines.length} focus unici in rotazione
              </span>
            ) : (
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700">
                Focus sul tema (nessuna riga keyword)
              </span>
            )}
            <button
              type="button"
              onClick={copyReport}
              className="ml-auto rounded-full border border-emerald-300 bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
            >
              Copia report
            </button>
          </div>

          <p className="text-xs leading-relaxed text-zinc-500">{plan.disclaimer}</p>

          <div className="space-y-8">
            {Array.from({ length: plan.weeksTotal }, (_, i) => i + 1).map((weekNum) => {
              const weekSlots = plan.slots.filter((s) => s.weekIndex === weekNum);
              return (
                <div key={weekNum}>
                  <h3 className="border-b border-zinc-200 pb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                    Settimana {weekNum}
                  </h3>
                  <ul className="mt-4 grid gap-4 md:grid-cols-1">
                    {weekSlots.map((slot) => (
                      <li
                        key={slot.globalIndex}
                        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-zinc-500">
                            Contenuto #{slot.globalIndex} · slot {slot.slotInWeek}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-950">
                              {contentHintLabel(slot.contentHint)}
                            </span>
                            <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-950">
                              {funnelLabel(slot.funnel)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-medium leading-snug text-zinc-900">{slot.titleSuggestion}</p>
                        <p className="mt-2 text-xs text-zinc-600">
                          <span className="font-medium text-zinc-800">Focus:</span> {slot.primaryKeywordOrTopic}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-xs text-zinc-600">
                          {slot.checklist.map((c, idx) => (
                            <li key={`${slot.globalIndex}-${idx}`} className="flex gap-2">
                              <span className="text-emerald-600">✓</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
