"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/src/images";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row min-h-full w-full bg-zinc-50 items-center justify-center overflow-hidden px-6 lg:px-24"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-zinc-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-zinc-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 w-full max-w-4xl"
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
            <span className="h-px w-8 md:w-12 bg-zinc-900" />
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-zinc-600">
              Web Developer & Designer • Udine, IT
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight text-zinc-900 leading-[1.05]">
            Innovazione digitale <br className="hidden md:block" />
            <span className="text-zinc-500">su misura.</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Aiuto brand e professionisti a distinguersi online realizzando siti web 
            altamente performanti, ottimizzati per la SEO e progettati per convertire.
          </p>

          {/* Call To Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            {/* Primary CTA (triggering a scroll to Contact slide) */}
            <button 
              onClick={() => {
                const el = document.getElementById("contatti");
                el?.scrollIntoView({ behavior: "smooth" });
                // Note: The Swiper will handle the hash if configured standardly, or we can just update hash
                window.location.hash = "#contatti";
              }}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 font-medium text-zinc-50 tracking-wide transition-all hover:bg-zinc-800 w-full sm:w-auto"
            >
              <span className="mr-2">Richiedi un preventivo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            
            {/* Secondary CTA */}
            <button 
              onClick={() => {
                window.location.hash = "#progetti";
              }}
              className="inline-flex h-14 items-center justify-center rounded-full bg-transparent px-8 font-medium text-zinc-900 border border-zinc-200 transition-colors hover:bg-zinc-100 hover:border-zinc-300 w-full sm:w-auto"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 hidden lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] animate-pulse">Scroll</span>
        <div className="w-px h-8 bg-zinc-300 overflow-hidden relative">
          <motion.div 
            animate={{ top: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-full bg-zinc-900"
          />
        </div>
      </motion.div>
    </section>
  );
}
