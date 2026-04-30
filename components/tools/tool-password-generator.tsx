"use client";

import { useCallback, useMemo, useState } from "react";
import {
  analyzePasswordStrength,
  generatePassword,
  minimumLengthFor,
  type GeneratorOptions,
} from "@/lib/password-generator";

const DEFAULT_OPTS: GeneratorOptions = {
  length: 20,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: true,
};

const STRENGTH_ACTIVE: Record<number, string> = {
  0: "bg-rose-400",
  1: "bg-rose-300",
  2: "bg-amber-400",
  3: "bg-emerald-500",
  4: "bg-emerald-600",
};

export function ToolPasswordGenerator() {
  const [opts, setOpts] = useState<GeneratorOptions>(DEFAULT_OPTS);
  const [password, setPassword] = useState("");
  const [checkText, setCheckText] = useState("");
  const [showPlain, setShowPlain] = useState(true);
  const [copiedPw, setCopiedPw] = useState(false);
  const [copiedHints, setCopiedHints] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const mb = useMemo(() => minimumLengthFor(opts), [opts]);

  const strengthPwd = checkText.trim() ? checkText : password;
  const strength = useMemo(() => analyzePasswordStrength(strengthPwd), [strengthPwd]);

  const doGenerate = useCallback(() => {
    setGenError(null);
    const r = generatePassword(opts);
    if (!r.ok) {
      setGenError(r.error);
      return;
    }
    setPassword(r.password);
    setCheckText(r.password);
  }, [opts]);

  const restoreDefaults = useCallback(() => {
    setOpts(DEFAULT_OPTS);
    setPassword("");
    setCheckText("");
    setGenError(null);
  }, []);

  const copyPassword = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopiedPw(true);
      window.setTimeout(() => setCopiedPw(false), 2000);
    } catch {
      /* ignore */
    }
  }, [password]);

  const copyReport = useCallback(async () => {
    try {
      const lines = [
        `Score: ${strength.score}/4 (${strength.label})`,
        `Entropia stimata: ~${String(strength.entropyBits)} bit`,
        ...strength.hints.map((h) => `• ${h}`),
      ];
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopiedHints(true);
      window.setTimeout(() => setCopiedHints(false), 2000);
    } catch {
      /* ignore */
    }
  }, [strength]);

  const setLength = (n: number) => setOpts((o) => ({ ...o, length: n }));

  const toggle =
    <K extends keyof GeneratorOptions>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setOpts((o) => ({ ...o, [key]: e.target.checked } as GeneratorOptions));

  return (
    <section className="mt-8 space-y-10">
      <div className="rounded-xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Password sicura nel browser</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Generazione con{" "}
          <code className="rounded bg-emerald-100/90 px-1 text-xs">crypto.getRandomValues</code> (
          CPRNG del browser): niente invio verso il server e nessuna persistenza oltre a questa pagina — copia nel
          modulo o nel gestore password dove ti serve e cancella dall&apos;appunti dopo l&apos;uso. La valutazione è un{" "}
          <strong>orientamento heuristico</strong>, non uno scan di fughe pubbliche come Have I Been Pwned.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-5">
          <h3 className="text-base font-semibold text-zinc-900">Generator</h3>
          <label className="block text-sm font-medium text-zinc-700">
            Lunghezza: {opts.length}{" "}
            <span className="font-normal text-zinc-500">(minimo {mb} come richiesto dalle categorie)</span>
            <input
              type="range"
              min={mb}
              max={64}
              value={Math.max(mb, opts.length)}
              className="mt-2 block w-full accent-emerald-600"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>

          <div className="grid gap-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-zinc-300 accent-emerald-600"
                checked={opts.lowercase}
                onChange={toggle("lowercase")}
              />
              Minuscole (a-z)
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-zinc-300 accent-emerald-600"
                checked={opts.uppercase}
                onChange={toggle("uppercase")}
              />
              Maiuscole (A-Z)
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-zinc-300 accent-emerald-600"
                checked={opts.digits}
                onChange={toggle("digits")}
              />
              Cifre (0-9)
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-zinc-300 accent-emerald-600"
                checked={opts.symbols}
                onChange={toggle("symbols")}
              />
              Simboli ASCII
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-zinc-300 accent-emerald-600"
                checked={opts.excludeAmbiguous}
                onChange={toggle("excludeAmbiguous")}
              />
              Escludi ambigui (0, O, 1, l, I…)
            </label>
          </div>

          {genError ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">{genError}</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void doGenerate()}
              className="rounded-full border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Genera
            </button>
            <button
              type="button"
              onClick={() => restoreDefaults()}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
            >
              Reimposta opzioni
            </button>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-zinc-900">Output</h3>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600">
              <input
                type="checkbox"
                className="rounded border-zinc-300"
                checked={showPlain}
                onChange={(e) => setShowPlain(e.target.checked)}
              />
              Mostra in chiaro
            </label>
          </div>
          <div
            className="min-h-[3rem] rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm break-all text-zinc-900 md:text-base"
            translate="no"
          >
            {password ? (
              showPlain ? (
                password
              ) : (
                <span className="select-none tracking-widest" aria-hidden>
                  {"●".repeat(password.length)}
                </span>
              )
            ) : (
              <span className="text-zinc-400">&nbsp;Premi «Genera» per creare una password.</span>
            )}
          </div>
          <button
            type="button"
            disabled={!password}
            onClick={() => void copyPassword()}
            className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-200 disabled:text-zinc-500"
          >
            {copiedPw ? "Copiato" : "Copia password"}
          </button>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-violet-200/90 bg-gradient-to-b from-violet-50/60 to-white p-5">
        <h3 className="text-base font-semibold text-zinc-900">Valutazione robustezza</h3>
        <p className="text-sm text-zinc-600">
          Incolla una password per analizzarla, oppure genera sopra: il campo seguente si aggiorna dopo ogni
          generazione; puoi modificarlo per testare varianti.
        </p>
        <textarea
          value={checkText}
          onChange={(e) => setCheckText(e.target.value)}
          rows={3}
          placeholder="Password da valutare…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-inner focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
          spellCheck={false}
          autoComplete="off"
        />

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
              strength.score >= 3
                ? "border-emerald-300 bg-emerald-100 text-emerald-950"
                : strength.score >= 2
                  ? "border-amber-200 bg-amber-50 text-amber-950"
                  : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {strength.label}
          </span>
          <span className="text-sm text-zinc-600">
            ~{strength.entropyBits} bit (stima entropia)
          </span>
        </div>

        <div className="flex gap-1" role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={strength.score}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= strength.score ? STRENGTH_ACTIVE[strength.score] ?? "bg-emerald-500" : "bg-zinc-200"
              }`}
            />
          ))}
        </div>

        <ul className="list-inside list-disc space-y-1 text-sm text-zinc-700">
          {strength.hints.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => void copyReport()}
          className="rounded-full border border-violet-400 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-950 transition hover:bg-violet-100"
        >
          {copiedHints ? "Report copiato" : "Copia report valutazione"}
        </button>
      </div>
    </section>
  );
}
