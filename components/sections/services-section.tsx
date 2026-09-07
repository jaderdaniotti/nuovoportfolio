"use client";

import ScrollExpand from "@/components/scroll-expand";
import { useTheme } from "@/components/theme-provider";
import { scrollExpandSection } from "@/lib/home-content";
import { cn } from "@/lib/cn";

export function ServicesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="servizi"
      className={cn(isDark ? "bg-ink" : "bg-cream")}
      aria-label="Servizi"
    >
      <ScrollExpand
        key={theme}
        src={
          isDark
            ? scrollExpandSection.imageSrcDark
            : scrollExpandSection.imageSrcLight
        }
        alt={scrollExpandSection.imageAlt}
        title={scrollExpandSection.title}
        scrollHint={scrollExpandSection.scrollHint}
        useWindowScroll
        startWidth={38}
        startHeight={52}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.28}
        scrollDistance={1.15}
        holdDistance={0.4}
        overlayScrim={isDark ? 0.7 : 0.25}
        mediaTintClassName={isDark ? "bg-ink/55" : "bg-cream/60"}
        titleClassName={
          isDark
            ? "text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.75)]"
            : "text-ink [text-shadow:0_2px_20px_rgba(246,245,243,0.55)]"
        }
        hintClassName={isDark ? "text-white/70" : "text-ink"}
        className="min-h-0"
      >
        <ul className="mx-auto flex w-full max-w-3xl flex-col items-stretch sm:max-w-4xl">
          {scrollExpandSection.services.map((service) => (
            <li
              key={service.label}
              className={cn(
                "flex min-w-0 flex-col items-center gap-2  py-2 text-center last:border-b-0 sm:flex-row sm:gap-4 sm:py-4 sm:text-left",
                "font-display text-[clamp(2.15rem,8.5vw,4.25rem)] font-semibold leading-none tracking-tight",
                isDark
                  ? "text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.65)]"
                  : "text-ink",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-[1.05em] shrink-0 items-center justify-center rounded-full sm:size-[1.1em]",
                  isDark ? "bg-cream" : "bg-ink",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- emoji-style service icon */}
                <img
                  src={service.icon}
                  alt=""
                  className="size-[0.72em] object-contain sm:size-[0.78em]"
                />
              </span>
              <span className="text-center sm:text-left">{service.label}</span>
            </li>
          ))}
        </ul>
      </ScrollExpand>
    </section>
  );
}
