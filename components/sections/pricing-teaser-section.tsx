"use client";

import { motion } from "framer-motion";
import { Bot, Check, Crown, Rocket, Sprout } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const websitePackages = [
  {
    icon: Sprout,
    name: "Basic",
    description: "Presenza online essenziale per partire subito",
  },
  {
    icon: Rocket,
    name: "Pro",
    description: "Il pacchetto più scelto da PMI e professionisti",
    highlighted: true,
  },
  {
    icon: Crown,
    name: "Business",
    description: "Per brand che vogliono crescere con contenuti e dati",
  },
] as const;

const extras = [
  "Siti sviluppati a codice, veloci e SEO-friendly",
  "Chatbot AI opzionale — Standard o Premium",
  "Tariffe trasparenti con manutenzione annuale",
] as const;

export function PricingTeaserSection() {
  return (
    <section
      id="tariffe"
      className="relative flex w-full flex-col items-center bg-white px-4 py-12 transition-colors dark:bg-zinc-950 sm:px-6 md:h-full md:justify-center md:overflow-hidden md:px-24 md:py-[clamp(0.75rem,2dvh,1.5rem)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] top-[-15%] h-[45%] w-[45%] rounded-full bg-zinc-200/50 blur-[100px] dark:bg-zinc-800/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 md:h-full md:min-h-0 md:justify-center md:gap-[clamp(1rem,3dvh,2rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex max-w-2xl flex-col gap-2 md:shrink-0 md:gap-3"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <span className="h-px w-8 bg-zinc-900 dark:bg-zinc-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Tariffe
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 md:text-[clamp(1.9rem,5.1vh,3rem)] dark:text-zinc-100">
            Pacchetti chiari, su misura per te
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 md:hidden dark:text-zinc-400">
            Basic, Pro e Business — con chatbot AI opzionale. Dettagli e tariffe nella pagina dedicata.
          </p>
          <p className="hidden max-w-xl text-[clamp(0.9rem,2vh,1.05rem)] leading-relaxed text-zinc-600 md:block dark:text-zinc-400">
            Basic, Pro e Business per siti web performanti. Aggiungi un chatbot AI se vuoi rispondere
            ai visitatori 24/7 e qualificare i lead — tutto spiegato nella pagina dedicata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:shrink-0 md:gap-4">
          {websitePackages.map((pkg, i) => {
            const Icon = pkg.icon;

            return (
              <motion.article
                key={pkg.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative rounded-2xl border bg-zinc-50 p-4 text-left dark:bg-zinc-900/80",
                  pkg.highlighted
                    ? "border-zinc-900 dark:border-zinc-100"
                    : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                {pkg.highlighted ? (
                  <span className="absolute -top-2.5 left-4 whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                    Più scelto
                  </span>
                ) : null}
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                  {pkg.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col gap-4 md:shrink-0 md:flex-row md:items-center md:justify-between md:gap-4"
        >
          <div className="flex flex-col gap-2">
            {extras.map((item) => (
              <p
                key={item}
                className="flex items-start gap-2 text-sm leading-snug text-zinc-700 dark:text-zinc-300"
              >
                {item.includes("Chatbot") ? (
                  <Bot
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100"
                    aria-hidden
                  />
                ) : (
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100"
                    aria-hidden
                  />
                )}
                <span>{item}</span>
              </p>
            ))}
          </div>

          <Link
            href="/pricing"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 md:w-auto md:px-6 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Scopri pacchetti e tariffe
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
