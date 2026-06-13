"use client";

import Link from "next/link";
import { Check, Clock, MessageSquare, User } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ViewportAnimate } from "@/components/pricing/viewport-animate";
import { siteConfig } from "@/lib/site-config";

const benefits = [
  {
    icon: User,
    title: "Contatto diretto",
    description: "Niente ticket anonimi: parli sempre con me, dal primo messaggio alla consegna.",
  },
  {
    icon: Clock,
    title: "Risposta entro 24 ore",
    description: "Analizzo la richiesta e ti rispondo con i prossimi passi concreti, senza giri di parole.",
  },
  {
    icon: MessageSquare,
    title: "Preventivo chiaro",
    description: "Scope, tempi e investimento spiegati in modo semplice, prima di iniziare qualsiasi lavoro.",
  },
] as const;

const steps = [
  "Compili il form con obiettivi e priorità del progetto.",
  "Ti ricontatto entro 24 ore per chiarire dettagli e budget.",
  "Ricevi una proposta su misura con tempi e costi trasparenti.",
  "Partiamo solo quando sei convinto che sia la soluzione giusta.",
] as const;

export function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <ViewportAnimate
        as="header"
        enterAnimation="animate__fadeInDown"
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Iniziamo un progetto
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
          Trasformiamo la tua idea in un sito che converte
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Raccontami cosa ti serve: ti preparo un preventivo personalizzato per un sito veloce, su
          misura e pensato per portarti contatti qualificati.
        </p>
      </ViewportAnimate>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-10">
        <div className="space-y-8">
          <ViewportAnimate as="section" aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className="sr-only">
              Perché contattarmi
            </h2>
            <ul className="space-y-4">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ViewportAnimate>

          <ViewportAnimate
            as="section"
            aria-labelledby="process-heading"
            className="rounded-2xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2
              id="process-heading"
              className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
            >
              Cosa succede dopo l&apos;invio
            </h2>
            <ol className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-400">
              Vuoi capire i costi prima?{" "}
              <Link href="/pricing" className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
                Guarda i pacchetti
              </Link>
              .
            </p>
          </ViewportAnimate>
        </div>

        <ViewportAnimate
          as="section"
          aria-labelledby="form-heading"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8"
        >
          <h2 id="form-heading" className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
            Richiedi il tuo preventivo
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Compila il form: più dettagli mi dai, più precisa sarà la proposta commerciale.
          </p>

          <div className="mt-6">
            <ContactForm idPrefix="sales-contact" />
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:flex-row">
            <a
              href="https://wa.me/393513152008"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
            >
              Scrivimi su WhatsApp
            </a>
            <a
              href={siteConfig.links.email}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
            >
              Invia una email
            </a>
          </div>
        </ViewportAnimate>
      </div>

      <ViewportAnimate
        as="section"
        enterAnimation="animate__fadeIn"
        className="mt-16 rounded-2xl border border-zinc-200 bg-white px-6 py-8 text-center dark:border-zinc-800 dark:bg-zinc-900 md:px-10"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
          Pronto a fare il passo successivo?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Ogni settimana senza un sito efficace è traffico e opportunità persi. Iniziamo con una
          conversazione concreta.
        </p>
        <ul className="mx-auto mt-5 flex max-w-lg flex-col gap-2 text-left text-sm text-zinc-700 dark:text-zinc-300">
          {[
            "Consulenza iniziale senza impegno",
            "Proposta commerciale chiara e personalizzata",
            "Sviluppo diretto con un unico referente",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ViewportAnimate>
    </div>
  );
}
