"use client";

import { motion } from "framer-motion";
import { collaborations } from "@/lib/home-content";

export function CollabsSection() {
  return (
    <section
      id="collaborazioni"
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-zinc-50 px-6 py-20 lg:px-24"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Partnership
            </span>
            <span className="h-[1px] w-8 bg-zinc-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mt-2">
            Grandi risultati nascono da ottime collaborazioni.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {collaborations.map((collab, i) => (
            <motion.div
              key={collab.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group flex flex-col justify-between bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-900">{collab.name}</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 transition-colors group-hover:text-zinc-900"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </div>
                <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full w-max">
                  {collab.tag}
                </span>
                <p className="text-zinc-600 mt-2 leading-relaxed">
                  {collab.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
