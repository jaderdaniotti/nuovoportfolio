"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BlurRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

export function BlurReveal({ text, className, as: Tag = "span", delay = 0 }: BlurRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-flex flex-wrap gap-x-[0.28em] gap-y-1", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

export function CountUp({ value, suffix = "", className, duration = 1.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

type ShimmerTextProps = {
  children: ReactNode;
  className?: string;
};

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "bg-linear-to-r from-zinc-600 via-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-400 dark:via-zinc-100 dark:to-zinc-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

type HomeSectionProps = {
  id: string;
  children: ReactNode;
  tone?: "default" | "muted" | "elevated" | "dark";
  className?: string;
  innerClassName?: string;
  ariaLabelledby?: string;
};

export function HomeSection({
  id,
  children,
  tone = "default",
  className,
  innerClassName,
  ariaLabelledby,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "scroll-mt-24 border-t border-zinc-200/80 first:border-t-0 dark:border-zinc-800/80",
        tone === "muted" && "bg-zinc-100/70 dark:bg-zinc-900/40",
        tone === "elevated" && "bg-white dark:bg-zinc-900/60",
        tone === "dark" &&
          "border-zinc-800 bg-zinc-950 text-zinc-100 dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:px-10 lg:py-36",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  id,
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-mono text-sm font-semibold tabular-nums text-zinc-400 dark:text-zinc-500">
          {index}
        </span>
        <span className="h-px w-10 bg-zinc-300 dark:bg-zinc-700" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <h2
        id={id}
        className="mt-5 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-100"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </header>
  );
}

type FaqAccordionProps = {
  items: { question: string; answer: string }[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-1 md:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-zinc-900 marker:content-none dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition group-open:rotate-45 dark:border-zinc-700 dark:text-zinc-400">
              +
            </span>
          </summary>
          <p className="pb-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
