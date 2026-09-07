"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

const ENVIRONMENTS = [
  { label: "localhost", url: "localhost:3000" },
  { label: "staging", url: "staging.progetto.it" },
  { label: "production", url: "www.progetto.it" },
] as const;

export function ProcessLaunchReveal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [env, setEnv] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setEnv((value) => (value + 1) % ENVIRONMENTS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [inView]);

  const current = ENVIRONMENTS[env];

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-[1.25rem] border border-border bg-ink p-6 text-cream sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
          Ambiente
        </p>
        <p className="font-display mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
          {current.label}
        </p>
        <p className="mt-2 font-mono text-sm text-accent">{current.url}</p>
        <div className="mt-8 flex gap-2">
          {ENVIRONMENTS.map((item, i) => (
            <span
              key={item.label}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                env >= i ? "bg-accent" : "bg-cream/15",
              )}
            />
          ))}
        </div>
      </div>
      <p className="font-display mt-4 text-center text-xs font-semibold tracking-[0.16em] text-muted lg:text-left">
        LOCALHOST → STAGING → PRODUCTION
      </p>
    </div>
  );
}

const CSS_SNIPPETS = [
  {
    file: "globals.css",
    lines: [
      { t: ":root {", c: "muted" },
      { t: "  --accent: #E3FF04;", c: "accent" },
      { t: "  --ink: #0A0C00;", c: "cream" },
      { t: "}", c: "muted" },
    ],
  },
  {
    file: "hero.css",
    lines: [
      { t: ".hero {", c: "muted" },
      { t: "  display: grid;", c: "cream" },
      { t: "  gap: clamp(1rem, 3vw, 2rem);", c: "cream" },
      { t: "}", c: "muted" },
    ],
  },
  {
    file: "layout.css",
    lines: [
      { t: ".page-shell {", c: "muted" },
      { t: "  width: 100%;", c: "cream" },
      { t: "  padding-inline: 3rem;", c: "cream" },
      { t: "}", c: "muted" },
    ],
  },
] as const;

export function ProcessCodeReveal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % CSS_SNIPPETS.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [inView]);

  const snippet = CSS_SNIPPETS[index];

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-[1.25rem] border border-border bg-ink text-cream shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="ml-3 truncate font-mono text-[11px] text-cream/45">
            {snippet.file}
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed sm:p-6 sm:text-[13px]">
          <code>
            {snippet.lines.map((line) => (
              <span
                key={`${snippet.file}-${line.t}`}
                className={cn(
                  "block",
                  line.c === "accent" && "text-accent",
                  line.c === "cream" && "text-cream",
                  line.c === "muted" && "text-cream/45",
                )}
              >
                {line.t}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <p className="font-display mt-4 text-center text-xs font-semibold tracking-[0.16em] text-muted lg:text-left">
        CSS · COMPONENTS · TOKENS
      </p>
    </div>
  );
}
