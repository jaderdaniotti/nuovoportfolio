"use client";

import { motion } from "framer-motion";
import reviews from "@/recensioni.json";

export function TestimonialsSection() {
  return (
    <section
      id="testimonianze"
      className="relative flex min-h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-20 lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <svg
            className="mx-auto mb-8 h-12 w-12 text-zinc-800"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>

          <div className="mb-4 text-sm uppercase tracking-[0.25em] text-zinc-500">
            Scorri orizzontalmente le recensioni
          </div>

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(161,161,170,0.35)_transparent]">
            {reviews.map((review, i) => (
              <motion.div
                key={`${review.nome}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex h-[min(62vh,520px)] min-w-[88%] snap-start flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:min-w-[72%] lg:min-w-[56%] xl:min-w-[48%]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  {"★".repeat(review.valutazione)}
                </div>

                <p className="flex-1 overflow-y-auto pr-2 text-xl font-medium leading-snug tracking-tight text-white md:text-2xl">
                  <span aria-hidden>&ldquo;</span>
                  {review.recensione}
                  <span aria-hidden>&rdquo;</span>
                </p>

                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 md:text-base">
                  — {review.nome}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
