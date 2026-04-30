"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  formatLaunchChecklistReport,
  getLaunchChecklistProgress,
  launchChecklistSections,
  launchChecklistStorageKey,
} from "@/lib/website-launch-checklist";

function loadCheckedFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(launchChecklistStorageKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function persistChecked(next: Set<string>) {
  try {
    localStorage.setItem(launchChecklistStorageKey, JSON.stringify([...next]));
  } catch {
    // ignore quota / private mode
  }
}

export function ToolWebsiteLaunchChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChecked(loadCheckedFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistChecked(checked);
  }, [checked, hydrated]);

  const progress = useMemo(() => getLaunchChecklistProgress(checked), [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const markSection = useCallback((sectionId: string, value: boolean) => {
    const section = launchChecklistSections.find((s) => s.id === sectionId);
    if (!section) return;
    setChecked((prev) => {
      const next = new Set(prev);
      for (const item of section.items) {
        if (value) next.add(item.id);
        else next.delete(item.id);
      }
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setChecked(new Set()), []);

  const loadExampleProgress = useCallback(() => {
    const next = new Set<string>();
    for (const section of launchChecklistSections) {
      for (let i = 0; i < section.items.length; i += 2) {
        next.add(section.items[i].id);
      }
    }
    setChecked(next);
  }, []);

  const copyReport = useCallback(async () => {
    const text = formatLaunchChecklistReport(checked);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  }, [checked]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-indigo-50/40 via-white to-violet-50/30 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Checklist pre go-live</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Spunta ogni voce prima del lancio in produzione. Gli stati restano salvati nel browser (localStorage)
              così puoi chiudere la scheda e riprendere. Esporta il report per condividerlo con il team o allegarlo a
              un ticket di rilascio.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadExampleProgress}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Carica esempio (50%)
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-rose-200 hover:text-rose-800"
            >
              Azzera tutto
            </button>
            <button
              type="button"
              onClick={copyReport}
              className="rounded-full border border-indigo-300 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Copia report
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-indigo-100 bg-white/80 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-800/80">Avanzamento</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">
              {progress.done}
              <span className="text-lg font-normal text-zinc-500"> / {progress.total}</span>
            </p>
            <p className="text-sm text-zinc-600">
              {progress.percent === 100
                ? "Tutti i punti segnati: ultimo controllo manuale consigliato prima del deploy finale."
                : progress.percent >= 75
                  ? "Ottimo livello di copertura: rimangono pochi punti critici."
                  : progress.percent >= 40
                    ? "Progresso intermedio: priorità a SEO, form e privacy."
                    : "Inizia da SEO/tecnico e privacy prima di aprire al pubblico."}
            </p>
          </div>
          <div className="min-w-[200px] flex-1 md:max-w-sm">
            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 ease-out"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs tabular-nums text-zinc-500">{progress.percent}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {launchChecklistSections.map((section) => {
          const sectionDone = section.items.filter((i) => checked.has(i.id)).length;

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                <div>
                  <h3 className="font-semibold text-zinc-900">{section.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{section.description}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {sectionDone}/{section.items.length} completati
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => markSection(section.id, true)}
                    className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-emerald-300 hover:text-emerald-900"
                  >
                    Segna sezione
                  </button>
                  <button
                    type="button"
                    onClick={() => markSection(section.id, false)}
                    disabled={sectionDone === 0}
                    className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Deseleziona
                  </button>
                </div>
              </div>
              <ul className="divide-y divide-zinc-100">
                {section.items.map((item) => {
                  const isOn = checked.has(item.id);
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer gap-3 px-4 py-3 transition hover:bg-zinc-50/90 md:px-5 md:py-3.5">
                        <input
                          type="checkbox"
                          checked={isOn}
                          onChange={() => toggle(item.id)}
                          className="mt-1 size-4 shrink-0 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="min-w-0">
                          <span
                            className={`block text-sm font-medium leading-snug ${
                              isOn ? "text-zinc-500 line-through decoration-zinc-400" : "text-zinc-900"
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.hint ? (
                            <span className="mt-1 block text-xs text-zinc-500">{item.hint}</span>
                          ) : null}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {!hydrated ? (
        <p className="text-center text-xs text-zinc-400">Caricamento stato salvato…</p>
      ) : null}
    </section>
  );
}
