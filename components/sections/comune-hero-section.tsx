"use client";

import { motion } from "framer-motion";
import type { ComuneData } from "@/lib/comuni";

type ComuneHeroSectionProps = {
  comune: ComuneData;
};

export function ComuneHeroSection({ comune }: ComuneHeroSectionProps) {
  const opening =
    comune.seo?.opening ??
    `Supporto aziende e professionisti a ${comune.nome} con siti web veloci, chiari e orientati ai contatti.`;

  const angle =
    comune.seo?.angle ??
    "Architettura tecnica, UX e SEO on-page allineate alle ricerche locali.";

  return (
    <section
      id="hero"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 px-6 py-[clamp(1rem,2.5dvh,2rem)] transition-colors dark:bg-zinc-950 lg:px-24"
    >
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-zinc-200/50 blur-[100px] dark:bg-zinc-800/40" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-200/30 blur-[120px] dark:bg-zinc-800/30" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full max-w-4xl flex-col gap-4 md:gap-5"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-900 dark:bg-zinc-300 md:w-12" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 md:text-xs">
              SEO Locale • {comune.nome}, {comune.sigla}
            </span>
          </div>

          <h1 className="text-[clamp(2.2rem,8.2vh,5.3rem)] font-bold leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-100">
            {comune.seo?.title ?? `Siti web a ${comune.nome} (${comune.sigla})`}
          </h1>

          <p className="mt-1 max-w-2xl text-[clamp(0.95rem,2.2vh,1.15rem)] leading-relaxed text-zinc-600 dark:text-zinc-300">
            {opening}
          </p>
          <p className="max-w-2xl text-[clamp(0.95rem,2vh,1.05rem)] leading-relaxed text-zinc-600 dark:text-zinc-300">
            {angle}
          </p>

          <div className="mt-4 grid w-full max-w-xl grid-cols-2 gap-3 text-xs text-zinc-600 md:text-sm">
            <div className="rounded-xl border border-zinc-200 bg-white/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <strong className="block text-zinc-900 dark:text-zinc-100">Provincia</strong>
              {comune.provincia?.nome} ({comune.sigla})
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <strong className="block text-zinc-900 dark:text-zinc-100">Popolazione</strong>
              {(comune.popolazione ?? 0).toLocaleString("it-IT")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
