"use client";

import { FormEvent, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";
import { contactForm } from "@/lib/home-content";
import {
  contactFormCopy,
  contactGoals,
  contactModes,
  type ContactMode,
} from "@/lib/contact-page";

type ClientType = "privato" | "azienda";

type FormData = {
  clientType: ClientType;
  fullName: string;
  companyName: string;
  contactPerson: string;
  vat: string;
  services: string[];
  budget: string;
  message: string;
  website: string;
  email: string;
  phone: string;
  privacy: boolean;
};

const emptyForm: FormData = {
  clientType: "privato",
  fullName: "",
  companyName: "",
  contactPerson: "",
  vat: "",
  services: [],
  budget: "",
  message: "",
  website: "",
  email: "",
  phone: "",
  privacy: false,
};

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-foreground/40";

function FieldLabel({
  children,
  optional,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <span className="mb-2 flex items-baseline justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
      {optional ? (
        <span className="font-medium normal-case tracking-normal opacity-70">
          {contactForm.optionalHint}
        </span>
      ) : null}
    </span>
  );
}

function ChoiceCard({
  selected,
  onSelect,
  title,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-2xl border px-5 py-5 text-left transition",
        selected
          ? "border-ink bg-accent text-ink"
          : "border-border bg-background hover:border-foreground/40",
      )}
    >
      <span className="font-display block text-lg font-semibold tracking-tight">
        {title}
      </span>
      {hint ? (
        <span
          className={cn(
            "mt-1 block text-sm",
            selected ? "text-ink/70" : "text-muted",
          )}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

export function ContactStepForm() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<ContactMode | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps = useMemo(() => {
    if (mode === "quick") return ["who", "what", "contact"] as const;
    return ["who", "what", "project", "website", "contact"] as const;
  }, [mode]);

  const current = mode ? steps[step] : null;
  const isLast = mode ? step === steps.length - 1 : false;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function toggleService(service: string) {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service],
    }));
    setError("");
  }

  function validateStep(key: (typeof steps)[number]) {
    if (key === "who" && data.clientType === "azienda" && !data.companyName.trim()) {
      return false;
    }
    if (key === "what" && data.services.length === 0) return false;
    if (key === "contact") {
      if (data.clientType === "privato" && !data.fullName.trim()) return false;
      if (!data.email.trim() || !data.phone.trim() || !data.privacy) return false;
    }
    return true;
  }

  function goNext() {
    if (!current) return;
    if (!validateStep(current)) {
      setError(contactFormCopy.error);
      return;
    }
    setError("");
    setStep((value) => value + 1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mode || !current || !validateStep(current)) {
      setError(contactFormCopy.error);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          clientType: data.clientType,
          fullName: data.fullName,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          vat: data.vat,
          services: data.services,
          budget: data.budget,
          message: data.message,
          website: data.website,
          email: data.email,
          phone: data.phone,
          privacy: data.privacy,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error || "Invio non riuscito. Riprova tra poco.");
        return;
      }

      setSent(true);
    } catch {
      setError("Invio non riuscito. Controlla la connessione e riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    const heartSrc =
      theme === "dark" ? "/img/svg/cuorebianco.svg" : "/img/svg/cuorenero.svg";

    return (
      <p
        className="font-display flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-16 text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight"
        role="status"
      >
        <span className="inline-flex items-center gap-2">
          <span className="underline decoration-2 underline-offset-[0.18em]">
            Grazie
          </span>
          <Image
            src={heartSrc}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="h-[0.85em] w-[0.85em] object-contain"
            aria-hidden
          />
        </span>
        <span>Ti ricontattiamo a breve.</span>
      </p>
    );
  }

  return (
    <div>
      <fieldset className="border-0 p-0">
        <legend className="font-display mb-5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-tight">
          {contactModes.title}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard
            selected={mode === "quick"}
            onSelect={() => {
              setMode("quick");
              setStep(0);
              setError("");
            }}
            title={contactModes.quick.label}
            hint={`(${contactModes.quick.time})`}
          />
          <ChoiceCard
            selected={mode === "detailed"}
            onSelect={() => {
              setMode("detailed");
              setStep(0);
              setError("");
            }}
            title={contactModes.detailed.label}
            hint={`(${contactModes.detailed.time})`}
          />
        </div>
      </fieldset>

      {mode ? (
        <form onSubmit={onSubmit} className="mt-12">
          <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
            STEP {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="mt-10 space-y-8">
            {current === "who" ? (
              <fieldset className="border-0 p-0">
                <legend className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
                  {contactFormCopy.steps.who.title}
                </legend>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {(Object.keys(contactForm.tabs) as ClientType[]).map((type) => (
                    <ChoiceCard
                      key={type}
                      selected={data.clientType === type}
                      onSelect={() => update("clientType", type)}
                      title={contactForm.tabs[type]}
                    />
                  ))}
                </div>
                {data.clientType === "azienda" ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <FieldLabel>{contactForm.fields.companyName}</FieldLabel>
                      <input
                        name="azienda"
                        autoComplete="organization"
                        value={data.companyName}
                        onChange={(e) => update("companyName", e.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <FieldLabel optional>{contactForm.fields.contactPerson}</FieldLabel>
                      <input
                        name="referente"
                        autoComplete="name"
                        value={data.contactPerson}
                        onChange={(e) => update("contactPerson", e.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <FieldLabel optional>{contactForm.fields.vat}</FieldLabel>
                      <input
                        name="piva"
                        autoComplete="off"
                        value={data.vat}
                        onChange={(e) => update("vat", e.target.value)}
                        className={inputClass}
                      />
                    </label>
                  </div>
                ) : null}
              </fieldset>
            ) : null}

            {current === "what" ? (
              <fieldset className="border-0 p-0">
                <legend className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
                  {contactFormCopy.steps.what.title}
                </legend>
                <p className="mt-3 text-sm text-muted">{contactFormCopy.steps.what.hint}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {contactGoals.map((goal) => {
                    const selected = data.services.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(goal)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition",
                          selected
                            ? "border-ink bg-accent text-ink"
                            : "border-border text-foreground hover:border-foreground/40",
                        )}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
                {mode === "detailed" ? (
                  <label className="mt-8 block max-w-md">
                    <FieldLabel optional>{contactForm.fields.budget}</FieldLabel>
                    <select
                      name="budget"
                      value={data.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{contactForm.placeholders.budget}</option>
                      {contactForm.budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </fieldset>
            ) : null}

            {current === "project" ? (
              <label className="block">
                <span className="font-display block text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
                  {contactFormCopy.steps.project.title}
                </span>
                <span className="mt-3 mb-5 block text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                  {contactFormCopy.steps.project.hint}
                </span>
                <FieldLabel optional>{contactForm.fields.message}</FieldLabel>
                <textarea
                  name="messaggio"
                  rows={6}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40"
                />
              </label>
            ) : null}

            {current === "website" ? (
              <label className="block">
                <span className="font-display block text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
                  {contactFormCopy.steps.website.title}
                </span>
                <span className="mt-3 mb-5 block text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                  {contactFormCopy.steps.website.hint}
                </span>
                <FieldLabel optional>{contactForm.fields.website}</FieldLabel>
                <input
                  type="text"
                  name="sito"
                  autoComplete="url"
                  placeholder="https://"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                  className={inputClass}
                />
              </label>
            ) : null}

            {current === "contact" ? (
              <fieldset className="border-0 p-0">
                <legend className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
                  {mode === "quick"
                    ? contactFormCopy.steps.quickContact.title
                    : contactFormCopy.steps.contact.title}
                </legend>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {data.clientType === "privato" ? (
                    <label className="block sm:col-span-2">
                      <FieldLabel>{contactForm.fields.fullName}</FieldLabel>
                      <input
                        name="nome"
                        autoComplete="name"
                        value={data.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        className={inputClass}
                      />
                    </label>
                  ) : null}
                  <label className="block">
                    <FieldLabel>{contactForm.fields.email}</FieldLabel>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <FieldLabel>{contactForm.fields.phone}</FieldLabel>
                    <input
                      type="tel"
                      name="telefono"
                      autoComplete="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  {mode === "quick" ? (
                    <label className="block sm:col-span-2">
                      <FieldLabel optional>{contactForm.fields.message}</FieldLabel>
                      <textarea
                        name="messaggio"
                        rows={4}
                        value={data.message}
                        onChange={(e) => update("message", e.target.value)}
                        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40"
                      />
                    </label>
                  ) : null}
                </div>
                <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={data.privacy}
                    onChange={(e) => update("privacy", e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  />
                  <span>
                    Ho letto e accetto l&apos;
                    <a
                      href="/privacy"
                      className="text-foreground underline decoration-accent decoration-2 underline-offset-2 transition hover:opacity-70"
                    >
                      informativa sulla privacy
                    </a>
                    . <span className="text-foreground/70">*</span>
                  </span>
                </label>
              </fieldset>
            ) : null}
          </div>

          {error ? (
            <p className="mt-6 text-sm text-foreground" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                arrow={false}
                onClick={() => {
                  setError("");
                  setStep((value) => value - 1);
                }}
              >
                {contactFormCopy.back}
              </Button>
            ) : null}
            {isLast ? (
              <Button type="submit" disabled={submitting}>
                {submitting ? "Invio in corso..." : contactFormCopy.submit}
              </Button>
            ) : (
              <Button type="button" onClick={goNext} disabled={submitting}>
                {contactFormCopy.next}
              </Button>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}
