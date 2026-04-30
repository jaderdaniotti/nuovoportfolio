"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildPrivacyPolicyBaseBundle,
  SAMPLE_PRIVACY_POLICY_BASE_INPUT,
  type DataControllerKind,
  type PrivacyPolicyBaseInput,
  validatePrivacyPolicyBase,
} from "@/lib/privacy-policy-base-generator";

type CopyKind = "md" | "html" | null;

const controllerOptions: { value: DataControllerKind; label: string }[] = [
  { value: "societa", label: "Società / ente con personalità giuridica" },
  { value: "professionista", label: "Professionista / P.IVA individuale" },
  { value: "associazione", label: "Associazione / ente senza personalità giuridica" },
  { value: "persona-fisica", label: "Persona fisica" },
  { value: "altro", label: "Altro soggetto titolare" },
];

function checkboxRow(label: string, checked: boolean, onChange: (v: boolean) => void, hint?: string) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-zinc-800 shadow-sm transition hover:border-indigo-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span>
        <span className="font-medium">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-relaxed text-zinc-600">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ToolGeneratorePrivacyPolicyBase() {
  const [input, setInput] = useState<PrivacyPolicyBaseInput>({ ...SAMPLE_PRIVACY_POLICY_BASE_INPUT });
  const [copied, setCopied] = useState<CopyKind>(null);

  const err = useMemo(() => validatePrivacyPolicyBase(input), [input]);

  const bundle = useMemo(() => {
    if (err) return null;
    return buildPrivacyPolicyBaseBundle(input);
  }, [input, err]);

  const patchTreatments = useCallback((partial: Partial<PrivacyPolicyBaseInput["treatments"]>) => {
    setInput((prev) => ({ ...prev, treatments: { ...prev.treatments, ...partial } }));
  }, []);

  const patch = useCallback((partial: Partial<PrivacyPolicyBaseInput>) => {
    setInput((prev) => ({ ...prev, ...partial }));
  }, []);

  const loadSample = useCallback(() => setInput({ ...SAMPLE_PRIVACY_POLICY_BASE_INPUT }), []);

  const copy = useCallback(
    async (kind: Exclude<CopyKind, null>) => {
      const text =
        kind === "md"
          ? bundle?.markdown ?? ""
          : bundle?.html ?? "";
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
    "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none ring-indigo-500/0 transition focus:border-indigo-300 focus:ring-2";

  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/95 via-white to-slate-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Bozza Privacy Policy GDPR (Italiano)</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">
          Compila i campi sulla base del tuo scenario reale. Il generatore crea uno <strong className="font-medium text-zinc-900">scheletro ordinato</strong> con
          disclaimer, titolare, finalità sintetiche, destinatari, conservazione e diritti degli interessati — tutto <strong>solo nel browser</strong>.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-900/85">
          Non è consulenza legale: fai rivedere e integrare il testo prima della pubblicazione (cookie policy dedicata, fornitori, misure accesso, DPIA dove
          dovuta).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-indigo-300 hover:bg-indigo-50/80"
        >
          Carica esempio ACME
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">Identità e contatti</legend>
          <div className="mt-4 space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Denominazione / titolare</span>
              <input className={fieldCls} value={input.ownerLabel} onChange={(e) => patch({ ownerLabel: e.target.value })} />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Tipologia soggetto</span>
              <select
                className={`${fieldCls} cursor-pointer`}
                value={input.controllerKind}
                onChange={(e) => patch({ controllerKind: e.target.value as DataControllerKind })}
              >
                {controllerOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">P.IVA / CF / riferimento fiscale (opz.)</span>
              <input className={fieldCls} value={input.vatOrFiscalHint} onChange={(e) => patch({ vatOrFiscalHint: e.target.value })} placeholder="Es. IT…" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Sede o recapito (opz.)</span>
              <input
                className={fieldCls}
                value={input.registeredOffice}
                onChange={(e) => patch({ registeredOffice: e.target.value })}
                placeholder="Via, CAP, comune…"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">URL sito pubblico</span>
              <input className={fieldCls} value={input.websiteUrl} onChange={(e) => patch({ websiteUrl: e.target.value })} placeholder="https://" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Email dedicata privacy</span>
              <input
                type="email"
                className={fieldCls}
                value={input.privacyEmail}
                onChange={(e) => patch({ privacyEmail: e.target.value })}
                placeholder="privacy@..."
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">DPO/RPD — contatto testuale (opz.)</span>
              <input
                className={fieldCls}
                value={input.dataProtectionOfficer}
                onChange={(e) => patch({ dataProtectionOfficer: e.target.value })}
                placeholder="Se nominato…"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800">Data ultimo aggiornamento (AAAA-MM-GG)</span>
              <input type="date" className={`${fieldCls} font-mono text-xs md:text-sm`} value={input.lastUpdatedIsoDate} onChange={(e) => patch({ lastUpdatedIsoDate: e.target.value })} />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">Ambito trattamenti (abilita solo ciò che applichi sul sito)</legend>
          <div className="mt-4 grid gap-2">
            {checkboxRow(
              "Navigazione, log minimi e cookie/tecnologie strettamente necessari",
              input.treatments.navigationTechnical,
              (v) => patchTreatments({ navigationTechnical: v }),
              "Lascia attivo se pubblichi un sito reale.",
            )}
            {checkboxRow(
              "Analytics / statistiche anche via cookie analitici",
              input.treatments.analyticsCookies,
              (v) => patchTreatments({ analyticsCookies: v }),
            )}
            {checkboxRow(
              "Marketing, remarketing e profilazione cookie/banner pubblicitario",
              input.treatments.marketingProfiling,
              (v) => patchTreatments({ marketingProfiling: v }),
            )}
            {checkboxRow("Moduli contatto / richieste online", input.treatments.contactForms, (v) => patchTreatments({ contactForms: v }))}
            {checkboxRow("Newsletter o DEM", input.treatments.newsletterEmail, (v) => patchTreatments({ newsletterEmail: v }))}
            {checkboxRow("Registrazione utenti e account", input.treatments.userAccounts, (v) => patchTreatments({ userAccounts: v }))}
            {checkboxRow("E-commerce / pagamenti", input.treatments.ecommercePayments, (v) => patchTreatments({ ecommercePayments: v }))}
            {checkboxRow("Embed da social, mappe, video terzi", input.treatments.socialMapsEmbeds, (v) => patchTreatments({ socialMapsEmbeds: v }))}
            {checkboxRow("Outsourcing a fornitori (hosting, CRM, ticketing…)", input.treatments.outsourcingProcessors, (v) =>
              patchTreatments({ outsourcingProcessors: v }),
            )}
            {checkboxRow("Trasferimenti extra SEE possibili dal tuo stack", input.treatments.transfersOutsideEea, (v) =>
              patchTreatments({ transfersOutsideEea: v }),
              "CDN, hyperscaler USA, SaaS globali.",
            )}
          </div>
        </fieldset>
      </div>

      {err ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{err}</p>
      ) : bundle ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copy("md")}
              className="rounded-full border border-indigo-300 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              {copied === "md" ? "Copiato" : "Copia Markdown"}
            </button>
            <button
              type="button"
              onClick={() => copy("html")}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-indigo-300"
            >
              {copied === "html" ? "Copiato" : "Copia HTML semplificato"}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Sorgente Markdown</h3>
              <textarea
                readOnly
                spellCheck={false}
                rows={22}
                className="font-mono w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-[11px] leading-relaxed text-zinc-800 md:text-xs"
                value={bundle.markdown}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Anteprima HTML lite</h3>
              <div
                className="max-h-[480px] overflow-auto rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-zinc-800 shadow-inner prose-headings:text-sm prose-headings:font-semibold"
                dangerouslySetInnerHTML={{ __html: bundle.html }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-600">Compila correttamente i campi richiesti per generare il testo.</p>
      )}
    </section>
  );
}
