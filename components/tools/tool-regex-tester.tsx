"use client";

import { useCallback, useMemo, useState } from "react";
import { collectMatches, compileRegex, segmentsForHighlight } from "@/lib/regex-tester";

const SAMPLE_PATTERN = String.raw`\b\d{3}-\d{4}\b|\b(foo|bar)\d+\b`;

const SAMPLE_TEXT = `Numeri: 123-4567 e 999-8888.\nParole: foo1, bar2, qux3.`;

type FlagKey = "g" | "i" | "m" | "s" | "u" | "y" | "d" | "v";

const FLAG_OPTIONS: { key: FlagKey; label: string; hint: string }[] = [
  { key: "g", label: "g", hint: "globale, tutti i match" },
  { key: "i", label: "i", hint: "ignore case" },
  { key: "m", label: "m", hint: "^ e $ per riga" },
  { key: "s", label: "s", hint: "dotAll, . include newline" },
  { key: "u", label: "u", hint: "unicode" },
  { key: "y", label: "y", hint: "sticky da lastIndex" },
  { key: "d", label: "d", hint: "indici nei match" },
  { key: "v", label: "v", hint: "unicodeSets (Unicode modi avanzati)" },
];

function flagsObjectToString(sel: Record<FlagKey, boolean>): string {
  return FLAG_OPTIONS.map(({ key }) => (sel[key] ? key : "")).join("");
}

export function ToolRegexTester() {
  const [pattern, setPattern] = useState(SAMPLE_PATTERN);
  const [flagSel, setFlagSel] = useState<Record<FlagKey, boolean>>({
    g: true,
    i: true,
    m: false,
    s: false,
    u: false,
    y: false,
    d: false,
    v: false,
  });
  const [haystack, setHaystack] = useState(SAMPLE_TEXT);
  const [copiedList, setCopiedList] = useState(false);

  const flagsStr = useMemo(() => flagsObjectToString(flagSel), [flagSel]);

  const compiled = useMemo(() => compileRegex(pattern, flagsStr), [pattern, flagsStr]);

  const matches = useMemo(() => {
    if (!compiled.ok) return [];
    return collectMatches(compiled.regex, haystack);
  }, [compiled, haystack]);

  const segments = useMemo(() => {
    if (!compiled.ok) return [];
    return segmentsForHighlight(haystack, matches);
  }, [compiled.ok, haystack, matches]);

  const toggleFlag = useCallback((key: FlagKey) => {
    setFlagSel((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const loadSample = useCallback(() => {
    setPattern(SAMPLE_PATTERN);
    setFlagSel({
      g: true,
      i: true,
      m: false,
      s: false,
      u: false,
      y: false,
      d: false,
      v: false,
    });
    setHaystack(SAMPLE_TEXT);
  }, []);

  const clearAll = useCallback(() => {
    setPattern("");
    setHaystack("");
  }, []);

  const copyMatchList = useCallback(async () => {
    if (matches.length === 0) return;
    const lines = matches.map((m, i) => {
      const cap = m.captures.length ? ` | gruppi: ${m.captures.map((c) => JSON.stringify(c)).join(", ")}` : "";
      const named =
        m.namedGroups && Object.keys(m.namedGroups).length
          ? ` | named: ${JSON.stringify(m.namedGroups)}`
          : "";
      return `${i + 1}. @${m.index} ${JSON.stringify(m.match)}${cap}${named}`;
    });
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopiedList(true);
      window.setTimeout(() => setCopiedList(false), 2000);
    } catch {
      /* ignore */
    }
  }, [matches]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-sky-200/90 bg-gradient-to-b from-sky-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Regex live (motore JavaScript)</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Prova pattern e flag come in <strong>console o Node</strong>: sintassi{" "}
          <code className="rounded bg-sky-100/90 px-1 text-xs">new RegExp(pattern, flags)</code>. Vedi match
          numerati, gruppi catturati e gruppi nominati <code className="rounded bg-sky-100/90 px-1 text-xs">{`(?<nome>…)`}</code>
          . L&apos;evidenziazione usa solo match non sovrapposti (come lista è comunque completa). Tutto nel browser,
          senza invio al server.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            compiled.ok
              ? matches.length > 0
                ? "border-sky-300 bg-sky-100 text-sky-950"
                : "border-zinc-200 bg-white text-zinc-700"
              : "border-amber-300 bg-amber-100 text-amber-950"
          }`}
        >
          {!compiled.ok
            ? `Errore: ${compiled.message}`
            : matches.length > 0
              ? `OK — ${matches.length} match`
              : haystack.trim() === ""
                ? "In attesa di testo"
                : "Nessun match"}
        </span>

        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Svuota
        </button>
        {compiled.ok && matches.length > 0 ? (
          <button
            type="button"
            onClick={copyMatchList}
            className="rounded-full border border-sky-600 bg-sky-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-sky-800"
          >
            {copiedList ? "Copiato" : "Copia lista match"}
          </button>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Pattern</span>
            <textarea
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              spellCheck={false}
              rows={4}
              className="mt-1 w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-sky-500/40 focus:border-sky-400 focus:ring-2"
              placeholder={String.raw`\d+`}
            />
          </label>

          <fieldset className="rounded-xl border border-zinc-200 bg-white p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">Flag</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {FLAG_OPTIONS.map(({ key, label, hint }) => (
                <label
                  key={key}
                  title={hint}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800 hover:border-sky-300 hover:bg-sky-50/80"
                >
                  <input
                    type="checkbox"
                    checked={flagSel[key]}
                    onChange={() => toggleFlag(key)}
                    className="rounded border-zinc-400 text-sky-700 focus:ring-sky-500"
                  />
                  <span className="font-mono">{label}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Flag effettivi:{" "}
              <code className="rounded bg-zinc-100 px-1 font-mono">{flagsStr === "" ? "(nessuno)" : flagsStr}</code>
            </p>
          </fieldset>
        </div>

        <div>
          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Testo (haystack)</span>
            <textarea
              value={haystack}
              onChange={(e) => setHaystack(e.target.value)}
              spellCheck={false}
              rows={14}
              className="mt-1 w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-sky-500/40 focus:border-sky-400 focus:ring-2"
              placeholder="Incolla qui il testo da analizzare."
            />
          </label>
        </div>
      </div>

      {compiled.ok ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
          <h3 className="text-sm font-semibold text-zinc-900">Anteprima con evidenziazione</h3>
          <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-zinc-200 bg-white p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-zinc-900">
            {haystack === "" ? (
              <span className="text-zinc-500">Nessun testo da evidenziare.</span>
            ) : segments.length === 0 ? (
              haystack
            ) : (
              segments.map((seg, i) =>
                seg.kind === "match" ? (
                  <mark key={`${i}-${seg.text.slice(0, 16)}`} className="rounded bg-amber-200/95 px-0.5 text-zinc-900">
                    {seg.text}
                  </mark>
                ) : (
                  <span key={`${i}-t`}>{seg.text}</span>
                ),
              )
            )}
          </div>
        </div>
      ) : null}

      {compiled.ok && matches.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-zinc-800">#</th>
                <th className="px-3 py-2 text-left font-semibold text-zinc-800">index</th>
                <th className="px-3 py-2 text-left font-semibold text-zinc-800">match</th>
                <th className="px-3 py-2 text-left font-semibold text-zinc-800">Gruppi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white">
              {matches.map((m, idx) => (
                <tr key={`${m.index}-${idx}-${m.match.slice(0, 24)}`}>
                  <td className="px-3 py-2 font-mono text-zinc-600">{idx + 1}</td>
                  <td className="px-3 py-2 font-mono text-zinc-800">{m.index}</td>
                  <td className="max-w-[240px] px-3 py-2 font-mono text-xs text-zinc-900 break-all">{m.match}</td>
                  <td className="px-3 py-2 font-mono text-xs text-zinc-700 break-all">
                    {m.captures.length === 0 && (!m.namedGroups || !Object.keys(m.namedGroups).length)
                      ? "—"
                      : [
                          m.captures.length ? m.captures.map((c) => JSON.stringify(c)).join(", ") : null,
                          m.namedGroups && Object.keys(m.namedGroups).length
                            ? Object.entries(m.namedGroups)
                                .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                                .join("; ")
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" | ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
