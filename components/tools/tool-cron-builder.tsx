"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CRON_PRESETS,
  cronFieldsToBulletsIt,
  describeCronItalian,
  formatCronExpression,
  parseCronExpression,
} from "@/lib/cron-builder";

type CronFields = [string, string, string, string, string];

const DEFAULT_FIELDS: CronFields = ["0", "*", "*", "*", "*"];

const MINUTE_VALUES = [
  "*",
  "*/5",
  "*/10",
  "*/15",
  "*/20",
  "*/30",
  ...Array.from({ length: 60 }, (_, i) => String(i)),
];

const HOUR_VALUES = ["*", ...Array.from({ length: 24 }, (_, i) => String(i))];

const DOM_VALUES = ["*", ...Array.from({ length: 31 }, (_, i) => String(i + 1))];

const MONTH_VALUES = ["*", ...Array.from({ length: 12 }, (_, i) => String(i + 1))];

const DOW_VALUES = ["*", "0", "1", "2", "3", "4", "5", "6"];

const DOW_LABEL: Record<string, string> = {
  "*": "Qualsiasi",
  "0": "Domenica (0)",
  "1": "Lunedì (1)",
  "2": "Martedì (2)",
  "3": "Mercoledì (3)",
  "4": "Giovedì (4)",
  "5": "Venerdì (5)",
  "6": "Sabato (6)",
};

function optionsWithCurrent(allowed: string[], current: string): string[] {
  if (allowed.includes(current)) return allowed;
  return [current, ...allowed];
}

function setField(fs: CronFields, idx: number, value: string): CronFields {
  const next = [...fs] as CronFields;
  next[idx] = value;
  return next;
}

export function ToolCronBuilder() {
  const [fields, setFields] = useState<CronFields>(DEFAULT_FIELDS);
  const [paste, setPaste] = useState("");
  const [copied, setCopied] = useState(false);

  const expression = useMemo(() => formatCronExpression(fields), [fields]);

  const parsed = useMemo(() => parseCronExpression(expression), [expression]);

  const descriptionLine =
    parsed.ok ? describeCronItalian(parsed.fields) : "Aggiusta i campi per una descrizione in italiano.";

  const bullets = parsed.ok ? cronFieldsToBulletsIt(parsed.fields) : [];

  const applyPreset = useCallback((expr: string) => {
    const r = parseCronExpression(expr);
    if (r.ok) setFields(r.fields);
  }, []);

  const minuteOpts = useMemo(() => optionsWithCurrent(MINUTE_VALUES, fields[0]), [fields[0]]);
  const hourOpts = useMemo(() => optionsWithCurrent(HOUR_VALUES, fields[1]), [fields[1]]);
  const domOpts = useMemo(() => optionsWithCurrent(DOM_VALUES, fields[2]), [fields[2]]);
  const monthOpts = useMemo(() => optionsWithCurrent(MONTH_VALUES, fields[3]), [fields[3]]);
  const dowOpts = useMemo(() => optionsWithCurrent(DOW_VALUES, fields[4]), [fields[4]]);

  const pasteParse = useMemo(() => {
    const t = paste.trim();
    return t === "" ? null : parseCronExpression(paste);
  }, [paste]);

  const applyPaste = useCallback(() => {
    const r = parseCronExpression(paste);
    if (r.ok) {
      setFields(r.fields);
    }
  }, [paste]);

  const copyExpr = useCallback(async () => {
    if (!parsed.ok) return;
    try {
      await navigator.clipboard.writeText(expression);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [expression, parsed.ok]);

  const resetBuilder = useCallback(() => {
    setFields(DEFAULT_FIELDS);
    setPaste("");
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-violet-200/90 bg-gradient-to-b from-violet-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Cron a 5 campi (stile crontab)</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Costruisci un’espressione <strong>cron</strong> per pianificare job (Linux, macOS, molti scheduler cloud): ordine{" "}
          <code className="rounded bg-violet-100/90 px-1 text-xs">minuto ora giorno_mese mese giorno_settimana</code>
          . Il giorno della settimana usa spesso <strong>0 = domenica</strong> e <strong>6 = sabato</strong> (come Vixie cron).
          Tutto viene calcolato nel browser: puoi copiare la stringa e incollarla in crontab, Kubernetes CronJob o GitHub
          Actions (<code className="rounded bg-violet-100/90 px-1 text-xs">schedule</code> usa sintassi simile ma non identica — verifica la documentazione del provider).
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Espressione</p>
          <p className="mt-1 break-all font-mono text-base font-semibold text-zinc-900">{expression}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyExpr}
            disabled={!parsed.ok}
            className="rounded-full border border-violet-300 bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copiato" : "Copia espressione"}
          </button>
          <button
            type="button"
            onClick={resetBuilder}
            className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-900">Preset rapidi</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CRON_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              title={p.description}
              onClick={() => applyPreset(p.expression)}
              className={`rounded-full border px-3 py-1.5 text-left text-xs font-medium transition ${
                expression === p.expression
                  ? "border-violet-500 bg-violet-100 text-violet-950"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-300 hover:text-violet-900"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Minuto
          <select
            value={fields[0]}
            onChange={(e) => setFields((f) => setField(f, 0, e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 shadow-sm"
          >
            {minuteOpts.map((v) => (
              <option key={v} value={v}>
                {v === "*" ? "Ogni minuto (*)" : v.startsWith("*/") ? `Ogni ${v.slice(2)} min` : v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Ora
          <select
            value={fields[1]}
            onChange={(e) => setFields((f) => setField(f, 1, e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 shadow-sm"
          >
            {hourOpts.map((v) => (
              <option key={v} value={v}>
                {v === "*" ? "Ogni ora (*)" : `Ore ${v}`}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Giorno del mese
          <select
            value={fields[2]}
            onChange={(e) => setFields((f) => setField(f, 2, e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 shadow-sm"
          >
            {domOpts.map((v) => (
              <option key={v} value={v}>
                {v === "*" ? "Qualsiasi (*)" : `Giorno ${v}`}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Mese
          <select
            value={fields[3]}
            onChange={(e) => setFields((f) => setField(f, 3, e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 shadow-sm"
          >
            {monthOpts.map((v) => (
              <option key={v} value={v}>
                {v === "*" ? "Qualsiasi (*)" : `Mese ${v}`}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800 sm:col-span-2 lg:col-span-2">
          Giorno della settimana
          <select
            value={fields[4]}
            onChange={(e) => setFields((f) => setField(f, 4, e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 shadow-sm"
          >
            {dowOpts.map((v) => (
              <option key={v} value={v}>
                {DOW_LABEL[v] ?? v}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className={`rounded-xl border p-4 ${
          parsed.ok ? "border-emerald-200 bg-emerald-50/60" : "border-amber-200 bg-amber-50/70"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Sintesi in italiano</p>
        <p className="mt-2 text-sm text-zinc-800">{descriptionLine}</p>
        {parsed.ok ? (
          <ul className="mt-3 list-inside list-disc text-sm text-zinc-700">
            {bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-900">Incolla espressione esistente</h3>
        <p className="mt-1 text-xs text-zinc-600">
          Incolla una riga cron (5 campi). Esempio valido: <code className="rounded bg-zinc-100 px-1">30 14 1 * *</code>{" "}
          (il primo del mese alle 14:30).
        </p>
        <textarea
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          rows={2}
          placeholder="0 * * * *"
          className="mt-3 w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50/50 px-3 py-2 font-mono text-sm text-zinc-900"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={applyPaste}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 transition hover:border-violet-400 hover:text-violet-900"
          >
            Applica al costruttore
          </button>
          {pasteParse ? (
            <span
              className={`text-xs font-medium ${
                pasteParse.ok ? "text-emerald-800" : "text-amber-800"
              }`}
            >
              {pasteParse.ok ? "Sintassi accettata." : pasteParse.error}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
