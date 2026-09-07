import { BrandLogo } from "@/components/brand-logo";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import SplitText from "@/components/split-text";
import { cn } from "@/lib/cn";
import {
  whyUsCode,
  whyUsCompare,
  whyUsCta,
  whyUsModern,
  whyUsPage,
  whyUsPassion,
  whyUsVersus,
  type CompareMark,
} from "@/lib/why-us-content";

const MARK: Record<CompareMark, { symbol: string; label: string }> = {
  yes: { symbol: "✓", label: "Sì" },
  no: { symbol: "✕", label: "No" },
  partial: { symbol: "△", label: "Parziale" },
};

function Mark({ value, featured = false }: { value: CompareMark; featured?: boolean }) {
  const mark = MARK[value];
  return (
    <span
      className={cn(
        "font-display inline-flex items-center justify-center text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-none",
        value === "yes" && featured && "text-ink",
        value === "yes" && !featured && "text-foreground",
        value !== "yes" && "text-muted",
      )}
      aria-label={mark.label}
    >
      {mark.symbol}
    </span>
  );
}

export function WhyUsPageContent({
  locale,
}: {
  locale?: {
    eyebrow?: string;
    extra?: string;
    contactHref?: string;
    ctaTitle?: string;
    ctaBody?: string;
  };
}) {
  return (
    <>
      <section className="relative overflow-x-clip bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell relative z-10 flex flex-col gap-10 lg:block">
          <div className="w-full lg:max-w-[min(100%,calc(100%-min(48vw,20rem)-1rem))]">
            <Reveal>
              <SectionLabel>{locale?.eyebrow ?? whyUsPage.eyebrow}</SectionLabel>
            </Reveal>
            <h1 className="font-display mt-0 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
              <SplitText
                tag="span"
                text={whyUsPage.title}
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
            </h1>
            <Reveal>
              <p className="font-display mt-8 max-w-3xl text-[clamp(1.2rem,2.4vw,1.75rem)] leading-snug tracking-tight">
                {whyUsPage.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {whyUsPage.body}
              </p>
              {locale?.extra ? (
                <p className="mt-4 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                  {locale.extra}
                </p>
              ) : null}
            </Reveal>
          </div>
          <div className="pointer-events-none relative mx-auto aspect-square w-[min(70vw,18rem)] overflow-hidden lg:absolute lg:inset-y-0 lg:right-[clamp(1.25rem,3vw,3rem)] lg:mx-0 lg:aspect-auto lg:w-[min(48vw,32rem)]">
            <BrandLogo
              fill
              sizes="(max-width: 1024px) 70vw, 32rem"
              className="origin-center scale-125 object-contain object-center lg:scale-[2] lg:object-right"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight">
              {whyUsCompare.title}
            </h2>
          </Reveal>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[32%] py-6 pr-6 text-sm font-medium text-muted" />
                  {whyUsCompare.columns.map((column) => (
                    <th
                      key={column.id}
                      className={cn(
                        "px-4 py-6 text-center sm:px-8",
                        column.id === "custom" && "bg-accent text-ink",
                      )}
                    >
                      <span className="font-display block text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-tight">
                        {column.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[11px] font-medium tracking-wide sm:text-xs",
                          column.id === "custom" ? "text-ink" : "text-muted",
                        )}
                      >
                        {column.caption}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {whyUsCompare.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <th className="py-5 pr-6 text-base font-medium sm:text-lg">
                      {row.label}
                    </th>
                    <td className="bg-accent/80 px-4 py-5 text-center sm:px-8">
                      <Mark value={row.custom} featured />
                    </td>
                    <td className="px-4 py-5 text-center sm:px-8">
                      <Mark value={row.template} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal className="max-w-4xl">
            <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-tight">
              {whyUsCode.title}
            </h2>
            <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {whyUsCode.body}
            </p>
          </Reveal>
          <ul className="mt-14 divide-y divide-border border-y border-border">
            {whyUsCode.points.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={0.06 + index * 0.05} className="py-10 lg:py-14">
                  <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-2 flex items-center gap-[0.28em] text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold tracking-tight">
                    {/* eslint-disable-next-line @next/next/no-img-element -- svg from public folder */}
                    <img
                      src={point.image}
                      alt=""
                      className="h-[1em] shrink-0 object-contain"
                    />
                    {point.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                    {point.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {whyUsVersus.columns.map((column, index) => (
              <Reveal key={column.id} delay={0.08 + index * 0.08}>
                <article
                  className={cn(
                    "rounded-[2rem] border border-border p-8 sm:p-10",
                    column.id === "code"
                      ? "bg-accent text-ink"
                      : "bg-foreground/[0.03]",
                  )}
                >
                  <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-tight">
                    {column.name}
                  </h2>
                  <ul className="mt-8 space-y-4">
                    {column.items.map((item) => (
                      <li
                        key={item.text}
                        className="flex gap-3 text-[clamp(1.05rem,2vw,1.25rem)] leading-snug"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "font-display w-6 shrink-0 font-semibold",
                            item.mark !== "yes" && column.id !== "code" && "text-muted",
                          )}
                        >
                          {MARK[item.mark].symbol}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {whyUsVersus.note}
            </p>
            <p className="font-display mt-4 text-[clamp(1.5rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-ink underline decoration-accent decoration-[0.18em] underline-offset-[0.18em] [[data-theme=dark]_&]:text-cream">
              {whyUsVersus.closing}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-tight">
              {whyUsModern.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {whyUsModern.body}
            </p>
          </Reveal>
          <p className="font-display mx-auto mt-12  text-center text-[clamp(1.15rem,3.2vw,2.1rem)] font-semibold leading-tight tracking-tight">
            {whyUsModern.stack.join(" · ")}
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
            {whyUsModern.note}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 text-foreground lg:py-32">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
              Facciamo questo{" "}
              <mark className="bg-accent box-decoration-clone px-[0.12em] text-ink">
                perché ci piace farlo
              </mark>
              .
            </h2>
            <p className="mt-8 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {whyUsPassion.body}
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCtaSection
        title={locale?.ctaTitle ?? whyUsCta.title}
        body={locale?.ctaBody ?? whyUsCta.body}
        href={locale?.contactHref ?? "/contatti"}
      />
    </>
  );
}
