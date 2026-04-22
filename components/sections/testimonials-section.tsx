"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import reviews from "@/recensioni.json";

export function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const offset = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonianze"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-[clamp(0.75rem,2dvh,1.5rem)] lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-8xl flex-col justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <svg
            className="mx-auto mb-4 h-10 w-10 text-zinc-800"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              aria-label="Recensione precedente"
              onClick={() => scrollReviews("left")}
              className="z-20 hidden rounded-full border border-white/20 bg-zinc-900/80 p-2 text-zinc-100 transition hover:bg-zinc-800 md:block"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
            </button>

            <div
              className="w-full overflow-hidden"
            >
              <div
                ref={carouselRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {reviews.map((review, i) => (
                  <motion.div
                    key={`${review.nome}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="flex min-h-0 min-w-full snap-start flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:gap-4 md:p-5"
                  >
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      {"★".repeat(review.valutazione)}
                    </div>

                    <p className="text-[clamp(0.95rem,2vh,1.25rem)] font-medium leading-[1.45] tracking-tight text-white">
                      <span aria-hidden>&ldquo;</span>
                      {review.recensione}
                      <span aria-hidden>&rdquo;</span>
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 md:text-sm">
                      — {review.nome}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Recensione successiva"
              onClick={() => scrollReviews("right")}
              className="z-20 hidden rounded-full border border-white/20 bg-zinc-900/80 p-2 text-zinc-100 transition hover:bg-zinc-800 md:block"
            >
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
