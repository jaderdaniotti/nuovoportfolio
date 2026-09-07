"use client";

import Link from "next/link";
import SplitText from "@/components/split-text";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import {
  ProcessCodeReveal,
  ProcessLaunchReveal,
} from "@/components/process-visuals";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";
import {
  processCta,
  processFlexible,
  processPage,
  processPhases,
} from "@/lib/process-page";

function PhaseItems({
  items,
  checked = false,
}: {
  items: readonly string[];
  checked?: boolean;
}) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2 lg:mt-6">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted sm:px-4 sm:py-2"
        >
          {checked ? `✓ ${item}` : item}
        </li>
      ))}
    </ul>
  );
}

function PhaseClosing({
  phase,
}: {
  phase: (typeof processPhases)[number];
}) {
  if (phase.number === "01") {
    return (
      <p className="font-display mt-6 text-[clamp(1.15rem,2.4vw,1.65rem)] font-semibold leading-snug tracking-tight lg:mt-8">
        Non parto dalla tecnologia. Parto{" "}
        <mark className="bg-accent box-decoration-clone px-[0.12em] text-ink">
          dal problema
        </mark>
        .
      </p>
    );
  }

  if (phase.number === "02") {
    return (
      <p className="font-display mt-6 text-[clamp(1.25rem,2.8vw,1.9rem)] font-semibold leading-[1.15] tracking-tight text-ink underline decoration-accent decoration-[0.16em] underline-offset-[0.16em] in-data-[theme=dark]:text-cream lg:mt-8">
        {phase.closing}
      </p>
    );
  }

  if (phase.number === "03") {
    return (
      <p className="font-display mt-6 text-[clamp(1.15rem,2.4vw,1.65rem)] font-semibold leading-snug tracking-tight lg:mt-8">
        Deve essere bello da vedere e{" "}
        <mark className="bg-accent box-decoration-clone px-[0.12em] text-ink">
          semplice da utilizzare
        </mark>
        .
      </p>
    );
  }

  if (phase.number === "04") {
    return (
      <>
        {"question" in phase && phase.question ? (
          <p className="font-display mt-6 text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-tight lg:mt-8">
            {phase.question}
          </p>
        ) : null}
        <p className="font-display mt-3 text-[clamp(1.15rem,2.4vw,1.65rem)] font-semibold leading-snug tracking-tight text-ink underline decoration-accent decoration-[0.16em] underline-offset-[0.16em] in-data-[theme=dark]:text-cream">
          {phase.closing}
        </p>
      </>
    );
  }

  if (phase.number === "05") {
    return (
      <p className="font-display mt-6 text-[clamp(1.25rem,2.8vw,1.9rem)] font-semibold leading-snug tracking-tight lg:mt-8">
        <mark className="bg-accent box-decoration-clone px-[0.12em] text-ink">
          Si pubblica.
        </mark>
      </p>
    );
  }

  return (
    <p className="font-display mt-6 text-[clamp(1.15rem,2.4vw,1.65rem)] font-semibold leading-snug tracking-tight lg:mt-8">
      Costruisco pensando anche a{" "}
      <span className="underline decoration-accent decoration-[0.16em] underline-offset-[0.16em]">
        ciò che verrà dopo
      </span>
      .
    </p>
  );
}

function PhaseVisual({ number }: { number: string }) {
  if (number === "04") return <ProcessCodeReveal />;
  if (number === "05") return <ProcessLaunchReveal />;
  return null;
}

export function ProcessPageContent({
  locale,
}: {
  locale?: {
    eyebrow?: string;
    extra?: string;
    serviziHref?: string;
    contactHref?: string;
    ctaTitle?: string;
    ctaBody?: string;
  };
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const lean = Boolean(locale);
  const serviziHref = locale?.serviziHref ?? "/servizi";
  const contactHref = locale?.contactHref ?? "/contatti";

  return (
    <>
      <section className="bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell">
          {lean ? (
            <SectionLabel>{locale?.eyebrow ?? processPage.eyebrow}</SectionLabel>
          ) : (
            <Reveal>
              <SectionLabel>{processPage.eyebrow}</SectionLabel>
            </Reveal>
          )}
          <h1 className="font-display mt-0 max-w-5xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            {lean ? (
              <span>{processPage.title}</span>
            ) : (
              <SplitText
                tag="span"
                text={processPage.title}
                className="font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
                delay={40}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-80px"
                textAlign="left"
              />
            )}
          </h1>
          {lean ? (
            <>
              <p className="font-display mt-8 max-w-3xl text-[clamp(1.2rem,2.4vw,1.75rem)] leading-snug tracking-tight">
                {processPage.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {processPage.body}
              </p>
              {locale?.extra ? (
                <p className="mt-4 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                  {locale.extra}
                </p>
              ) : null}
              <p className="font-display mt-10 text-[clamp(0.85rem,1.8vw,1.05rem)] font-semibold tracking-[0.14em] text-foreground">
                {processPage.stack.join(" · ")}
              </p>
              <p className="mt-8 max-w-xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {processPage.thread}
              </p>
            </>
          ) : (
            <Reveal>
              <p className="font-display mt-8 max-w-3xl text-[clamp(1.2rem,2.4vw,1.75rem)] leading-snug tracking-tight">
                {processPage.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {processPage.body}
              </p>
              <p className="font-display mt-10 text-[clamp(0.85rem,1.8vw,1.05rem)] font-semibold tracking-[0.14em] text-foreground">
                {processPage.stack.join(" · ")}
              </p>
              <p className="mt-8 max-w-xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {processPage.thread}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <div className="relative">
        {processPhases.map((phase, index) => {
          const hasVisual = phase.number === "04" || phase.number === "05";
          const panelTone = isDark
            ? index % 2 === 0
              ? "bg-[#0A0C00]"
              : "bg-[#121410]"
            : index % 2 === 0
              ? "bg-[#F6F5F3]"
              : "bg-[#EFEEEA]";

          return (
            <section
              key={phase.number}
              className={cn(
                "border-b border-border text-foreground",
                "relative py-16",
                "lg:sticky lg:top-[5.25rem] lg:h-[calc(100dvh-5.25rem)] lg:overflow-x-clip lg:overflow-y-auto lg:py-0",
                panelTone,
              )}
              style={{ zIndex: index + 1 }}
            >
              <div
                className={cn(
                  "page-shell",
                  "lg:flex lg:h-full lg:items-center lg:py-10",
                )}
              >
                <div
                  className={cn(
                    "w-full",
                    hasVisual &&
                      "grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16",
                  )}
                >
                  <div className="min-w-0">
                    <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
                      {phase.number} — {phase.title}
                    </p>
                    <h2 className="font-display mt-3 text-[clamp(1.85rem,4.2vw,3.25rem)] font-semibold leading-[1.04] tracking-tight lg:mt-4">
                      {phase.headline}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[clamp(1.02rem,1.8vw,1.2rem)] leading-relaxed text-muted lg:mt-5">
                      {phase.body}
                    </p>
                    {"intro" in phase ? (
                      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground lg:mt-7">
                        {phase.intro}
                      </p>
                    ) : null}
                    <PhaseItems
                      items={phase.items}
                      checked={phase.number === "05"}
                    />
                    {"note" in phase && phase.note ? (
                      <p className="mt-5 max-w-2xl text-[clamp(1.02rem,1.8vw,1.15rem)] leading-relaxed text-muted">
                        {phase.note}
                      </p>
                    ) : null}
                    <PhaseClosing phase={phase} />
                  </div>

                  {hasVisual ? (
                    <div className="mt-8 min-w-0 lg:mt-0">
                      <PhaseVisual number={phase.number} />
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="relative z-20 border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight">
              {processFlexible.title}
            </h2>
            <p className="mt-6 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {processFlexible.body}
            </p>
            <p className="font-display mt-12 text-[clamp(1.05rem,2.4vw,1.5rem)] font-semibold leading-tight tracking-tight">
              {processFlexible.types.map((type, index) => (
                <span key={type.label}>
                  {index > 0 ? <span className="text-muted"> → </span> : null}
                  <Link href={serviziHref} className="transition hover:opacity-70">
                    {type.label}
                  </Link>
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="relative z-20">
        <FinalCtaSection
          title={locale?.ctaTitle ?? processCta.title}
          body={locale?.ctaBody ?? processCta.body}
          cta={processCta.cta}
          href={contactHref}
        />
      </div>
    </>
  );
}
