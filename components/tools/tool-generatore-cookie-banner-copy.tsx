"use client";

import { useCallback, useMemo, useState } from "react";
import {
  SAMPLE_COOKIE_BANNER_COPY_INPUT,
  buildCookieBannerCopyBundle,
  formatCookieBannerCopyPlainReport,
  type CookieBannerCopyInput,
  type CookieBannerTone,
  validateCookieBannerCopyInput,
} from "@/lib/cookie-banner-copy-generator";

type CopyTab = "md" | "html" | "plain" | null;

const toneOptions: { value: CookieBannerTone; label: string }[] = [
  { value: "neutral", label: "Neutro / chiaro" },
  { value: "formal", label: "Formale / istituzionale" },
  { value: "friendly", label: "Cordiale / conversazionale" },
];

function checkboxRow(label: string, checked: boolean, onChange: (v: boolean) => void, hint?: string) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-zinc-800 shadow-sm transition hover:border-emerald-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
      />
      <span>
        <span className="font-medium">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-relaxed text-zinc-600">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ToolGeneratoreCookieBannerCopy() {
  const [input, setInput] = useState<CookieBannerCopyInput>({ ...SAMPLE_COOKIE_BANNER_COPY_INPUT });
  const [copied, setCopied] = useState<CopyTab>(null);

  const err = useMemo(() => validateCookieBannerCopyInput(input), [input]);

  const bundle = useMemo(() => {
    if (err) return null;
    return buildCookieBannerCopyBundle(input);
  }, [input, err]);

  const patch = useCallback((partial: Partial<CookieBannerCopyInput>) => {
    setInput((prev) => ({ ...prev, ...partial }));
  }, []);

  const loadSample = useCallback(() => setInput({ ...SAMPLE_COOKIE_BANNER_COPY_INPUT }), []);

  const copy = useCallback(
    async (kind: Exclude<CopyTab, null>) => {
      const text =
        kind === "md"
          ? (bundle?.markdownReport ?? "")
          : kind === "html"
            ? (bundle?.htmlSnippet ?? "")
            : bundle
              ? formatCookieBannerCopyPlainReport(bundle)
              : "";
      if (!text.trim()) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(kind);
        window.setTimeout(() => setCopied(null), 1800);
      } catch {
        /* ignore */
      }
    },
    [bundle],
  );

  const fieldCls =
    "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-emerald-500/0 transition focus:border-emerald-300 focus:ring-2";

  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/95 via-white to-slate-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Copy per cookie banner e CMP (Italiano)</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">
          Prepara <strong className="font-medium text-zinc-900">testi coerenti con GDPR/ePrivacy</strong> per il primo livello del banner: titolo, paragrafo
          principale, etichette pulsanti e link verso cookie policy / privacy. Tutto viene elaborato <strong>solo nel browser</strong> — utile prima di integrare
          il tuo consent management platform.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-900/85">
          Non è parere legale: il copy va adattato ai cookie effettivamente impiegati, alle informative pubblicate e alla configurazione tecnica (pre-check,
          blocchi script, registrazioni).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-300 hover:bg-emerald-50/80"
        >
          Carica esempio ACME
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">Identità e URL</legend>
          <div className="mt-4 space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Nome sito o brand</span>
              <input className={fieldCls} value={input.siteName} onChange={(e) => patch({ siteName: e.target.value })} placeholder="Es. ACME Blog" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Tono dei testi</span>
              <select
                className={`${fieldCls} cursor-pointer`}
                value={input.tone}
                onChange={(e) => patch({ tone: e.target.value as CookieBannerTone })}
              >
                {toneOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">URL cookie policy (obbligatorio)</span>
              <input
                className={fieldCls}
                value={input.cookiePolicyUrl}
                onChange={(e) => patch({ cookiePolicyUrl: e.target.value })}
                placeholder="https://…/cookie-policy"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">URL privacy policy (opzionale)</span>
              <input
                className={fieldCls}
                value={input.privacyPolicyUrl}
                onChange={(e) => patch({ privacyPolicyUrl: e.target.value })}
                placeholder="https://…/privacy-policy"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">Categorie e pulsanti</legend>
          <div className="mt-4 grid gap-2">
            {checkboxRow(
              "Menziona cookie analytics / misura audience",
              input.mentionAnalytics,
              (v) => patch({ mentionAnalytics: v }),
              "Attiva se il banner deve riferirsi anche a statistiche non strettamente necessarie.",
            )}
            {checkboxRow(
              "Menziona cookie marketing / profilazione",
              input.mentionMarketing,
              (v) => patch({ mentionMarketing: v }),
              "Per remarketing, ads, pixel o strumenti di profilazione.",
            )}
            {checkboxRow(
              "Includi pulsante “rifiuta i non necessari”",
              input.showRejectNonEssential,
              (v) => patch({ showRejectNonEssential: v }),
            )}
            {checkboxRow(
              "Includi pulsante “personalizza preferenze”",
              input.showCustomizePreferences,
              (v) => patch({ showCustomizePreferences: v }),
              "Second layer o pannello preferenze nel tuo CMP.",
            )}
          </div>
        </fieldset>
      </div>

      {err ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{err}</p>
      ) : bundle ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Anteprima testi (primo livello)</h3>
            <p className="mt-3 text-base font-semibold text-zinc-900">{bundle.headline}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{bundle.body}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-600">
              {bundle.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {bundle.buttons.map((b) => (
                <span
                  key={b.id}
                  className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-800"
                >
                  {b.label}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-emerald-800">
              <span className="font-medium">Link:</span> {bundle.cookiePolicyLinkLabel}
              {bundle.privacyPolicyLinkLabel ? ` · ${bundle.privacyPolicyLinkLabel}` : null}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copy("md")}
              className="rounded-full border border-emerald-500 bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              {copied === "md" ? "Copiato" : "Copia Markdown"}
            </button>
            <button
              type="button"
              onClick={() => copy("html")}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-300"
            >
              {copied === "html" ? "Copiato" : "Copia HTML (stub accessibile)"}
            </button>
            <button
              type="button"
              onClick={() => copy("plain")}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-300"
            >
              {copied === "plain" ? "Copiato" : "Copia report testuale"}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Markdown / brief</h3>
              <textarea
                readOnly
                spellCheck={false}
                rows={18}
                className="font-mono w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-[11px] leading-relaxed text-zinc-800 md:text-xs"
                value={bundle.markdownReport}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">HTML stub (adatta classi al tema)</h3>
              <textarea
                readOnly
                spellCheck={false}
                rows={18}
                className="font-mono w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-[11px] leading-relaxed text-zinc-800 md:text-xs"
                value={bundle.htmlSnippet}
              />
              <p className="text-xs text-zinc-600">{bundle.footerDisclaimer}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-600">Compila correttamente i campi richiesti per generare il copy.</p>
      )}
    </section>
  );
}
