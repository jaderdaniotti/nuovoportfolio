"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function PricingSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <section
      id="costi"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-100 px-6 py-[clamp(0.75rem,2dvh,1.5rem)] transition-colors dark:bg-zinc-900 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[8%] top-[18%] h-[36vh] w-[36vh] rounded-full bg-zinc-300/50 blur-[120px] dark:bg-zinc-700/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center gap-6 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Trasparenza prezzi
        </p>
        <h2 className="max-w-3xl text-[clamp(1.8rem,5.8vh,4rem)] font-bold leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-100">
          Si ok, ma quanto costa?
        </h2>
        <p className="max-w-2xl text-[clamp(0.98rem,2.15vh,1.2rem)] leading-relaxed text-zinc-700 dark:text-zinc-300">
          Un sito vetrina professionale parte da <strong>1200 euro</strong>, con design su misura,
          prestazioni alte e una gestione diretta: niente catene lunghe da agenzia, parli sempre con me.
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-8 text-sm font-semibold tracking-wide text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Leggi
        </button>
      </motion.div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-120 flex h-dvh w-full items-center justify-center bg-zinc-950/75 p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Dettaglio costi sito vetrina"
        >
          <div className="relative z-999 flex h-full max-h-dvh w-full max-w-3xl flex-col rounded-2xl bg-white p-5 text-zinc-900 shadow-2xl dark:bg-zinc-950 dark:text-zinc-100 md:p-8">
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto">
              

              <div className="grid gap-3">
                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold">Design unico, non copia-incolla</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Ogni pagina e disegnata per il tuo brand, i tuoi obiettivi e il tuo pubblico.
                  </p>
                </article>

                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold">Contatto umano diretto</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Parli con un freelancer, non con un ticket anonimo. Per una modifica non devi fissare
                    riunioni infinite con un&apos;agenzia.
                  </p>
                </article>

                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold">Manutenzione molto piu leggera</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Nel 99% dei casi, invece di pacchetti da 1000 euro/anno tipici da agenzia, con me la
                    manutenzione parte da <strong>300 euro</strong>.
                  </p>
                </article>

                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold">Zero costi nascosti da CMS pesanti</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Il sito è sviluppato a codice: meno plugin, meno vincoli, meno costi strutturali
                    ricorrenti rispetto a setup WordPress tradizionali.
                  </p>
                </article>

                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold">Prestazioni superiori</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Pagine veloci, migliori Core Web Vitals, esperienza utente migliore e base SEO tecnica
                    piu solida.
                  </p>
                </article>
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-8 text-sm font-semibold tracking-wide text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Chiudi
              </button>
            </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
