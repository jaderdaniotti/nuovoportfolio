"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const inputClassName =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-200";

type ContactFormProps = {
  className?: string;
  idPrefix?: string;
};

export function ContactForm({ className, idPrefix = "contact" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const fullName = String(fd.get("fullName") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const projectType = String(fd.get("projectType") ?? "").trim();
    const packageInterest = String(fd.get("packageInterest") ?? "").trim();
    const userMessage = String(fd.get("message") ?? "").trim();
    const privacyAccepted = fd.get("privacyAccepted") === "on";

    if (!privacyAccepted) {
      setFeedback({
        type: "error",
        message: "Per continuare devi accettare l'informativa privacy.",
      });
      return;
    }

    const message = [
      projectType ? `Tipo progetto: ${projectType}` : null,
      packageInterest ? `Pacchetto di interesse: ${packageInterest}` : null,
      "",
      userMessage,
    ]
      .filter((line) => line !== null)
      .join("\n")
      .trim();

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          message,
          privacyAccepted,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Si è verificato un errore durante l'invio.");
      }

      setFeedback({
        type: "success",
        message: "Richiesta inviata. Ti rispondo entro 24 ore lavorative con i prossimi passi.",
      });
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Si è verificato un errore durante l'invio.";
      setFeedback({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${idPrefix}-fullName`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nome e cognome
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Come posso chiamarti"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-email`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nome@azienda.it"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-phone`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Telefono
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+39 333 1234567"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-projectType`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Cosa ti serve?
          </label>
          <select id={`${idPrefix}-projectType`} name="projectType" required className={inputClassName}>
            <option value="">Seleziona un&apos;opzione</option>
            <option value="Nuovo sito web">Nuovo sito web</option>
            <option value="Restyling sito esistente">Restyling sito esistente</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Landing page">Landing page</option>
            <option value="Chatbot sul sito">Chatbot sul sito</option>
            <option value="Non sono sicuro">Non sono sicuro — voglio un consiglio</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-packageInterest`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Pacchetto di interesse
          </label>
          <select id={`${idPrefix}-packageInterest`} name="packageInterest" className={inputClassName}>
            <option value="">Non ho ancora scelto</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Business">Business</option>
            <option value="Soluzione su misura">Soluzione su misura</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-message`} className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Raccontami il progetto
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          rows={4}
          placeholder="Obiettivo del sito, tempistiche, settore, riferimenti utili..."
          className={cn(inputClassName, "resize-none")}
        />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 md:text-sm">
        <input
          id={`${idPrefix}-privacyAccepted`}
          name="privacyAccepted"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-200"
        />
        <span>
          Dichiaro di aver preso visione dell&apos;Informativa ai sensi del Decreto Legislativo 196/2003
          e del Regolamento (UE) 2016/679 (GDPR).
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Invio in corso..." : "Richiedi preventivo gratuito"}
      </button>

      {feedback ? (
        <p
          className={cn(
            "text-sm",
            feedback.type === "success" ? "text-zinc-700 dark:text-zinc-300" : "text-red-600 dark:text-red-400",
          )}
          role="status"
        >
          {feedback.message}
        </p>
      ) : null}
    </form>
  );
}
