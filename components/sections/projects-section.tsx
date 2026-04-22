"use client";

import { motion } from "framer-motion";
import type { HomeProject } from "@/lib/home-content";

type ProjectsSectionProps = {
  projects: HomeProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="progetti"
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-zinc-950 px-6 py-12 lg:px-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 h-full justify-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 shrink-0"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-700" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
              Lavori
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white line-clamp-2">
              Progetti su misura.
            </h2>
            <p className="text-zinc-400 max-w-xs text-sm">
              Scorri orizzontalmente per esplorare le soluzioni progettate per i miei clienti.
            </p>
          </div>
        </motion.div>

        {/* Projects Horizontal Scroll */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              href={project.projectUrl ?? undefined}
              target={project.projectUrl ? "_blank" : undefined}
              rel={project.projectUrl ? "noreferrer noopener" : undefined}
              className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 min-w-[85vw] md:min-w-[400px] flex-1 shrink-0 snap-center min-h-[300px] md:h-[40vh]"
            >
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

              {project.coverImage ? (
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                  aria-hidden
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-800 opacity-30 z-0 transition-transform duration-700 group-hover:scale-105" />
              )}

              <div className="relative z-20 flex flex-col gap-2">
                <p className="inline-flex max-w-max items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-zinc-300">
                  {project.role}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-3 md:transition-all md:duration-300 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 mt-2">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
