"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      privacyAccepted: fd.get("privacyAccepted") === "on",
    };

    if (!payload.privacyAccepted) {
      setFeedback({
        type: "error",
        message: "Per continuare devi accettare l'informativa privacy.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Si e verificato un errore durante l'invio.");
      }

      setFeedback({
        type: "success",
        message: "Messaggio inviato con successo. Ti rispondero al piu presto.",
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Si e verificato un errore durante l'invio.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contatti"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-[clamp(0.75rem,2dvh,1.5rem)] transition-colors dark:bg-zinc-950 lg:px-24"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
        
        {/* Left Side: Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-1 flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              Iniziamo
            </span>
          </div>
          
          <h2 className="text-[clamp(2rem,5.5vh,4.4rem)] font-bold leading-[0.98] tracking-tight text-zinc-900 dark:text-zinc-100">
            Pronto a <br className="hidden md:block"/>
            <span className="text-zinc-400 dark:text-zinc-500">rinnovarti?</span>
          </h2>

          <p className="max-w-md text-[clamp(0.9rem,1.9vh,1rem)] leading-tight text-zinc-600 dark:text-zinc-300">
            Parliamo del tuo prossimo progetto. Che sia un restyling o una nuova piattaforma, ti guiderò verso la soluzione migliore.
          </p>

          <div className="mt-3 hidden flex-col gap-4 lg:flex">
            <a 
              href={siteConfig.links.email}
              className="group flex w-max items-center gap-4 text-xl font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              Mandami un&apos;email
            </a>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex-1"
        >
          <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900 md:p-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nome e cognome
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Inserisci nome e cognome"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-200"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Numero di telefono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Es. +39 333 1234567"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nome@dominio.it"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Raccontami la tua idea o fai una domanda..."
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-200"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 md:text-sm">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-200"
                />
                <span className="text-xs">
                  Dichiaro di aver preso visione dell&apos;Informativa ai sensi del Decreto Legislativo
                  196/2003 e del Regolamento (UE) 2016/679 del Parlamento Europeo e del Consiglio del
                  27 Aprile 2016 (GDPR).
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-1 inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-900 px-6 text-sm font-medium tracking-wide text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {isSubmitting ? "Invio in corso..." : "Invia messaggio"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </button>

              {feedback ? (
                <p
                  className={`text-sm ${
                    feedback.type === "success" ? "text-emerald-600" : "text-red-600"
                  }`}
                  role="status"
                >
                  {feedback.message}
                </p>
              ) : null}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
