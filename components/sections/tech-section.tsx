"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", bg: "bg-zinc-900", color: "text-white" },
  { name: "React", bg: "bg-sky-500/10", color: "text-sky-600" },
  { name: "TypeScript", bg: "bg-blue-500/10", color: "text-blue-600" },
  { name: "Tailwind CSS", bg: "bg-teal-500/10", color: "text-teal-600" },
  { name: "Framer Motion", bg: "bg-fuchsia-500/10", color: "text-fuchsia-600" },
  { name: "Laravel", bg: "bg-red-500/10", color: "text-red-600" },
  { name: "PHP", bg: "bg-indigo-500/10", color: "text-indigo-600" },
  { name: "Three.js", bg: "bg-zinc-200", color: "text-zinc-900" },
];

export function TechSection() {
  return (
    <section
      id="tecnologia"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 px-6 py-[clamp(0.75rem,2dvh,1.5rem)] transition-colors dark:bg-zinc-950 lg:px-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-10" />
      
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-400 dark:bg-zinc-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              Stack
            </span>
            <span className="h-px w-8 bg-zinc-400 dark:bg-zinc-600" />
          </div>
          <h2 className="text-[clamp(1.9rem,5.3vh,3.2rem)] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tecnologie per l&apos;eccellenza.
          </h2>
          <p className="mt-1 max-w-2xl text-[clamp(0.92rem,2vh,1.08rem)] text-zinc-600 dark:text-zinc-300">
            Utilizzo i framework più moderni e robusti per garantire velocità,
            sicurezza e scalabilità ad ogni applicazione.
          </p>
        </motion.div>

        {/* Floating tech pills */}
        <div className="mt-1 flex max-w-4xl flex-wrap items-center justify-center gap-2 md:gap-3">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.05,
                type: "spring", stiffness: 300
              }}
              className={`flex cursor-default items-center justify-center rounded-2xl border border-zinc-100 px-4 py-2 shadow-sm md:px-5 md:py-2.5 ${tech.bg}`}
            >
              <span className={`text-sm font-bold tracking-tight md:text-base ${tech.color}`}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
