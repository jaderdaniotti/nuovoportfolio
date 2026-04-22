"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/src/images";

export function AboutSection() {
  return (
    <section
      id="chi-sono"
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-white px-6 py-12 lg:px-24"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Photo/Visual representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl bg-zinc-100"
        >
          {/* We'll use a placeholder or stylized abstract shape if no photo is available */}
          <Image src={images.logo} alt="Jader Daniotti" className="w-full h-full object-cover" />
          <div className="absolute inset-4 rounded-2xl border border-zinc-200/50 bg-white/15 flex flex-col justify-end p-8">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Jader Daniotti</h3>
            <p className="text-scuro font-medium text-sm mt-1">Fullstack Developer & Designer</p>
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
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-300" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Chi Sono
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            Design che converte, <br />
            Codice che scala.
          </h2>

          <div className="flex flex-col gap-4 text-lg text-zinc-600 font-medium">
            <p>
              Sono <strong className="text-zinc-900 font-semibold">Jader Daniotti</strong>, un Web Designer e Sviluppatore Fullstack basato a Udine, in Friuli. 
            </p>
            <p>
              La mia missione è trasformare idee complesse in interfacce digitali pulite, veloci e altamente funzionali. 
              Non creo solo "siti vetrina", ma potenti strumenti di business ottimizzati per guidare le conversioni e l'engagement.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
            <div>
              <p className="text-4xl font-bold text-zinc-900 tracking-tighter">5+</p>
              <p className="text-sm text-zinc-500 mt-1 font-medium">Anni di esperienza</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 tracking-tighter">100%</p>
              <p className="text-sm text-zinc-500 mt-1 font-medium">Focalizzato su Performance & SEO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
