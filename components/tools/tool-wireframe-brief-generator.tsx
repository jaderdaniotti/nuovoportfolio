"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildWireframeBrief,
  formatWireframeBriefReport,
  parseUniqueSectionLines,
  validateWireframeBriefInput,
  wireDensityOptions,
  wireFunnelOptions,
  wireGoalOptions,
  type WireframeDensity,
  type WireframeFunnelStage,
  type WireframeGoal,
} from "@/lib/wireframe-brief-generator";

const SAMPLE_CUSTOM = `Calcolatore ROI integrato
Carosello case study`;

export function ToolWireframeBriefGenerator() {
  const [pageOrProjectName, setPageOrProjectName] = useState("Landing acquisizione lead B2B SaaS");
  const [goal, setGoal] = useState<WireframeGoal>("lead");
  const [funnelStage, setFunnelStage] = useState<WireframeFunnelStage>("consideration");
  const [density, setDensity] = useState<WireframeDensity>("balanced");
  const [personaHint, setPersonaHint] = useState(
    "Responsabili marketing PMI (10–200 dip.) che valutano CRM con integrazione email",
  );
  const [constraintsNote, setConstraintsNote] = useState(
    "Deve rispettare brand guideline: niente pop-up interstitial al primo load",
  );
  const [customSectionsRaw, setCustomSectionsRaw] = useState(SAMPLE_CUSTOM);

  const customLines = useMemo(() => parseUniqueSectionLines(customSectionsRaw), [customSectionsRaw]);

  const validationError = useMemo(
    () => validateWireframeBriefInput(pageOrProjectName),
    [pageOrProjectName],
  );

  const brief = useMemo(() => {
    if (validationError) return null;
    return buildWireframeBrief({
      pageOrProjectName,
      goal,
      funnelStage,
      density,
      personaHint,
      constraintsNote,
      customSectionsRaw,
    });
  }, [validationError, pageOrProjectName, goal, funnelStage, density, personaHint, constraintsNote, customSectionsRaw]);

  const copyReport = useCallback(async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(formatWireframeBriefReport(brief));
    } catch {
      // ignore
    }
  }, [brief]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-amber-200/80 bg-linear-to-br from-amber-50/90 via-stone-50 to-orange-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Wireframe brief (struttura landing)</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Prima del mockup alto fedeltà: ordina blocchi, priorità P0/P1/P2, note hero/CTA/form e checklist mobile.
              Output pensato per UX, product e stakeholder — tutto calcolato nel browser, senza salvataggio remoto.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPageOrProjectName("Landing acquisizione lead B2B SaaS");
              setGoal("lead");
              setFunnelStage("consideration");
              setDensity("balanced");
              setPersonaHint(
                "Responsabili marketing PMI (10–200 dip.) che valutano CRM con integrazione email",
              );
              setConstraintsNote(
                "Deve rispettare brand guideline: niente pop-up interstitial al primo load",
              );
              setCustomSectionsRaw(SAMPLE_CUSTOM);
            }}
            className="shrink-0 rounded-full border border-amber-300/90 bg-white px-4 py-2 text-sm text-amber-950/80 transition hover:border-amber-400 hover:text-amber-950"
          >
            Carica esempio
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Nome pagina o progetto (compare nel brief)
            <input
              type="text"
              value={pageOrProjectName}
              onChange={(e) => setPageOrProjectName(e.target.value)}
              placeholder="Es. Landing promo estate 2026"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-300 transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Obiettivo conversione
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as WireframeGoal)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            >
              {wireGoalOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800">
            Funnel
            <select
              value={funnelStage}
              onChange={(e) => setFunnelStage(e.target.value as WireframeFunnelStage)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            >
              {wireFunnelOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Livello dettaglio wireframe
            <select
              value={density}
              onChange={(e) => setDensity(e.target.value as WireframeDensity)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            >
              {wireDensityOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Persona o pubblico (hint)
            <textarea
              value={personaHint}
              onChange={(e) => setPersonaHint(e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="Chi deve capire il valore nella prima skim?"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Vincoli operativi (brand, CMS, deadline…)
            <textarea
              value={constraintsNote}
              onChange={(e) => setConstraintsNote(e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="Opzionale: es. solo componenti dal design system v2"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-800 md:col-span-2">
            Sezioni custom (una per riga, si mescolano al template)
            <textarea
              value={customSectionsRaw}
              onChange={(e) => setCustomSectionsRaw(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-xs text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder={`Es.\nBlocchi pricing\nTabella competitor`}
            />
            <span className="mt-1 block text-xs text-zinc-500">
              Righe univoche dopo trim; duplicati ignorati ({customLines.length} attive).
            </span>
          </label>
        </div>
      </div>

      {validationError ? (
        <p className="rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {validationError}
        </p>
      ) : brief ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-zinc-700">{brief.summaryOneLiner}</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Hero / fold</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-800">
              {brief.heroBlock.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-amber-600" aria-hidden>
                    ◆
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Sezioni in ordine</h3>
            <div className="grid gap-4">
              {brief.sections.map((s) => (
                <div
                  key={`${s.order}-${s.label}`}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 font-mono text-xs text-stone-700">
                      #{s.order}
                    </span>
                    <span
                      className={
                        s.priority === "P0"
                          ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900"
                          : s.priority === "P1"
                            ? "rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-900"
                            : "rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800"
                      }
                    >
                      {s.priority}
                    </span>
                    <h4 className="text-base font-semibold text-zinc-900">{s.label}</h4>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">{s.purpose}</p>
                  <ul className="mt-3 space-y-1.5 border-t border-zinc-100 pt-3">
                    {s.blocksInside.map((b) => (
                      <li key={b} className="text-sm text-zinc-800">
                        <span className="text-zinc-400">· </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Navigazione</h3>
              <p className="mt-2 text-sm text-zinc-800">{brief.navPattern}</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gerarchia CTA</h3>
              <ul className="mt-2 space-y-2 text-sm text-zinc-800">
                {brief.ctaMap.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {brief.formSketch ? (
            <div className="rounded-xl border border-dashed border-amber-300/80 bg-amber-50/30 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">Bozza form</h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-800">
                {brief.formSketch.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Trust & mobile</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <ul className="space-y-2 text-sm text-zinc-800">
                {brief.trustSignals.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm text-zinc-800">
                {brief.mobileNotes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Domande per stakeholder</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-800">
              {brief.qaForStakeholder.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copyReport()}
              className="rounded-full border border-amber-800/20 bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
            >
              Copia report testuale
            </button>
            <p className="self-center text-xs text-zinc-500">{brief.disclaimer}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
