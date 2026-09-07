"use client";

import LogoLoop, { type LogoItem } from "@/components/logo-loop";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { useTheme } from "@/components/theme-provider";
import { testimonialsSection } from "@/lib/home-content";

export function TestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const reviewLogos: LogoItem[] = testimonialsSection.items.map((item) => ({
    title: item.name,
    node: (
      <figure className="flex w-[min(78vw,420px)] flex-col gap-4 text-left">
        <blockquote className="font-display text-[clamp(1.15rem,2.4vw,1.55rem)] font-medium leading-snug tracking-tight text-foreground">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <figcaption>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="mt-0.5 text-sm text-muted">{item.role}</p>
        </figcaption>
      </figure>
    ),
  }));

  return (
    <section className="bg-background py-20 text-foreground lg:py-28">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-5xl text-center">
          <SectionLabel className="justify-center">
            {testimonialsSection.label}
          </SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            {testimonialsSection.title}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-muted">
            {testimonialsSection.body}
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14 overflow-hidden py-4 lg:mt-16">
        <LogoLoop
          logos={reviewLogos}
          speed={45}
          direction="left"
          logoHeight={28}
          gap={80}
          hoverSpeed={12}
          fadeOut
          fadeOutColor={isDark ? "#0A0C00" : "#F6F5F3"}
          ariaLabel="Recensioni clienti"
        />
      </div>
    </section>
  );
}
