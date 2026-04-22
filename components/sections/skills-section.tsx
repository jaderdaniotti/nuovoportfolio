"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/home-content";

export function SkillsSection() {
  return (
    <section
      id="competenze"
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-white px-6 py-20 lg:px-24"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-900" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Competenze
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 max-w-2xl">
            Tutto ciò che serve per un prodotto completo.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 w-full">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-800 border-b border-zinc-100 pb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: j * 0.1 + (i * 0.2) }}
                    className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200"
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
