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
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-zinc-50 px-6 py-20 lg:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Stack
            </span>
            <span className="h-[1px] w-8 bg-zinc-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            Tecnologie per l'eccellenza.
          </h2>
          <p className="text-zinc-600 max-w-lg mt-2 text-lg">
            Utilizzo i framework più moderni e robusti per garantire velocità,
            sicurezza e scalabilità ad ogni applicazione.
          </p>
        </motion.div>

        {/* Floating tech pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4">
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
              className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl flex items-center justify-center cursor-default shadow-sm border border-zinc-100 ${tech.bg}`}
            >
              <span className={`text-lg md:text-xl font-bold tracking-tight ${tech.color}`}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
