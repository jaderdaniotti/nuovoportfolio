"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/src/images";
import { Star } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="chi-sono"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-[clamp(0.75rem,2dvh,1.5rem)] transition-colors dark:bg-zinc-950 lg:px-24"
    >
      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-center gap-3 lg:grid-cols-2 lg:gap-12">
        
        {/* Left Side: Photo/Visual representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-square w-full max-w-[min(23vh,8.5rem)] overflow-hidden rounded-3xl bg-zinc-100 transition-colors dark:bg-zinc-900 sm:max-w-[min(28vh,10.5rem)] md:max-w-[min(34vh,13.5rem)] lg:mx-0 lg:max-w-[min(40vh,21rem)]"
        >
          <Image src={images.logo} alt="Jader Daniotti" className="w-full h-full object-cover" />
          <div className="absolute inset-2 rounded-2xl border border-zinc-200/50 p-3 dark:border-zinc-700 sm:inset-3 sm:p-4 md:inset-4 md:p-8">
          </div>
          {/* Abstract geometric decoration */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-50 blur-xl" />
        </motion.div>

        {/* Right Side: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              Chi Sono
            </span>
          </div>
          
          <h2 className="text-[clamp(1.9rem,5.5vh,3.2rem)] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            Design che converte, <br />
            Codice che scala.
          </h2>

          <div className="flex flex-col gap-3 text-[clamp(0.95rem,2.1vh,1.08rem)] font-medium text-zinc-600 dark:text-zinc-300">
            <p>
              Sono <strong className="text-zinc-900 text-lg font-semibold dark:text-zinc-100">Jader Daniotti</strong>, un Web Designer e Sviluppatore Fullstack basato a Udine, in Friuli. 
            </p>
            <p>
              La mia missione è trasformare idee complesse in interfacce digitali pulite, veloci e altamente funzionali. 
              Non creo solo &quot;siti vetrina&quot;, ma potenti strumenti di business ottimizzati per guidare le conversioni e l&apos;engagement.
            </p>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div>
              <p className="flex items-center gap-2 text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">5<Star className="h-5 w-5 text-zinc-900 dark:text-zinc-100" /></p>
              <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Media di valutazione</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">100%</p>
              <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Focalizzato su Performance & SEO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
