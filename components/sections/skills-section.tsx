"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/home-content";

export function SkillsSection() {
  return (
    <section
      id="competenze"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-[clamp(0.75rem,2dvh,1.5rem)] lg:px-24"
    >
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center gap-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-900" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Competenze
            </span>
          </div>
          <h2 className="max-w-3xl text-[clamp(1.9rem,5.1vh,3rem)] font-bold tracking-tight text-zinc-900">
            Tutto ciò che serve per un prodotto completo.
          </h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="border-b border-zinc-100 pb-3 text-xl font-semibold tracking-tight text-zinc-800">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: j * 0.1 + (i * 0.2) }}
                    className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 md:text-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
