"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/src/images";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 px-6 py-[clamp(1rem,2.5dvh,2rem)] transition-colors dark:bg-zinc-950 lg:px-24"
    >
      <div className="absolute bottom-0 right-8">
        <h1 className="brexon z-0 hidden select-none text-left text-[16vw] italic text-zinc-300 dark:text-zinc-700 md:block">
          JADER
        </h1>
      </div>
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-zinc-200/50 blur-[100px] dark:bg-zinc-800/40" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-200/30 blur-[120px] dark:bg-zinc-800/30" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full max-w-4xl flex-col gap-4 md:gap-5"
        >
          {/* Label / Subtitle */}
          <div className="flex items-center gap-3">
            <Image
              src={images.logo}
              alt="Logopurple"
              width={36}
              height={36}
              className="h-9 w-auto"
              priority
            />
            <span className="h-px w-8 bg-zinc-900 dark:bg-zinc-300 md:w-12" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 md:text-xs">
              Web Developer & Designer • Udine, IT
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.2rem,8.2vh,5.6rem)] font-bold leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-100">
            Innovazione digitale <br className="hidden md:block" />
            <span className="text-zinc-500 dark:text-zinc-400">su misura.</span>
          </h1>

          {/* Description */}
          <p className="mt-1 max-w-2xl text-[clamp(0.95rem,2.2vh,1.2rem)] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Aiuto brand e professionisti a distinguersi online realizzando siti web 
            altamente performanti, ottimizzati per la SEO e progettati per convertire.
          </p>

          {/* Call To Actions */}
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            {/* Primary CTA (triggering a scroll to Contact slide) */}
            <button 
              onClick={() => {
                const el = document.getElementById("contatti");
                el?.scrollIntoView({ behavior: "smooth" });
                // Note: The Swiper will handle the hash if configured standardly, or we can just update hash
                window.location.hash = "#contatti";
              }}
              className="group relative z-10 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-6 text-sm font-medium tracking-wide text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:w-auto"
            >
              <span className="mr-2">Richiedi un preventivo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            
            {/* Secondary CTA */}
            <button 
              onClick={() => {
                window.location.hash = "#progetti";
              }}
              className="z-10 inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-6 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 sm:w-auto"
            >
              Esplora i lavori
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500 xl:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] animate-pulse">Scroll</span>
        <div className="relative h-8 w-px overflow-hidden bg-zinc-300 dark:bg-zinc-700">
          <motion.div 
            animate={{ top: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 h-full w-full bg-zinc-900 dark:bg-zinc-100"
          />
        </div>
      </motion.div>
    </section>
  );
}
