"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { SitePreviewFrame } from "@/components/site-preview-frame";
import { hero, heroMockups } from "@/lib/home-content";

const AUTOPLAY_MS = 7000;

function MockupSlide({
  desktopSrc,
  mobileSrc,
  name,
  url,
  lcp = false,
}: {
  desktopSrc?: string;
  mobileSrc?: string;
  name: string;
  url?: string;
  lcp?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden pb-[12%] pt-2">
      <div className="relative z-10 w-[88%] overflow-hidden rounded-2xl border border-border bg-ink text-cream shadow-2xl lg:rounded-[1.25rem]">
        <div className="flex items-center gap-1.5 border-b border-cream/10 bg-ink px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="ml-2 truncate text-[11px] text-cream/40">
            {name}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-cream/5">
          <SitePreviewFrame
            url={url}
            fallbackSrc={desktopSrc}
            alt={`Homepage del sito ${name}`}
            viewportWidth={1440}
            viewportHeight={900}
            sizes="(min-width: 1024px) 55vw, 90vw"
            fetchPriority={lcp ? "high" : "auto"}
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-20 w-[32%] max-w-[220px] overflow-hidden rounded-[1.5rem] border border-border bg-ink text-cream shadow-xl sm:max-w-[260px] lg:w-[30%] lg:max-w-[280px] lg:rounded-[1.75rem]">
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-cream/20" />
        <div className="relative mx-1.5 mt-2 mb-1.5 aspect-[390/844] overflow-hidden rounded-[1.15rem] bg-cream/5">
          <SitePreviewFrame
            url={url}
            fallbackSrc={mobileSrc}
            alt={`Versione mobile del sito ${name}`}
            viewportWidth={390}
            viewportHeight={844}
            sizes="280px"
            lazy
          />
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const slides = heroMockups;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go, slides.length]);

  const current = slides[index];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <MockupSlide
            name={current.name}
            url={"url" in current ? current.url : undefined}
            desktopSrc={"desktopSrc" in current ? current.desktopSrc : undefined}
            mobileSrc={"mobileSrc" in current ? current.mobileSrc : undefined}
            lcp={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Progetto precedente"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:border-foreground/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Progetto successivo"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:border-foreground/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="ml-2 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Vai a ${s.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25"
              }`}
            />
          ))}
        </div>
        {"url" in current && current.url ? (
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition hover:text-foreground"
          >
            Apri sito
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-hero pt-8 text-foreground lg:pt-12"
    >
      <div className="page-shell grid min-w-0 gap-10 pb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:items-center lg:gap-8 lg:pb-24 xl:gap-10">
        <Reveal delay={0.05} y={16} className="min-w-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {hero.eyebrow}
          </p>

          <h1 className="font-display max-w-xl break-words text-[clamp(2.2rem,4.8vw,3.75rem)] font-semibold leading-[1.04] tracking-tight">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-lg text-[clamp(1rem,2vh,1.15rem)] leading-relaxed text-muted">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contatti">{hero.ctaPrimary}</Button>
            <Button href="/servizi" variant="outline" arrow="down">
              {hero.ctaSecondary}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="min-w-0 w-full">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
