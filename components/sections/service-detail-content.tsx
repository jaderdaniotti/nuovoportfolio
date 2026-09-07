import Link from "next/link";
import { Button } from "@/components/button";
import { StickyStackCards } from "@/components/sticky-stack-cards";
import { BlogInsightsSection } from "@/components/sections/blog-insights-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import type { ServicePage } from "@/lib/service-pages";
import { getRelatedServicePages } from "@/lib/service-seo";
import { getServiceEmojiSrc } from "@/lib/services-content";

export function ServiceDetailContent({
  page,
  locale,
}: {
  page: ServicePage;
  locale?: {
    breadcrumbs?: Array<{ href: string; label: string }>;
    h1?: string;
    localLead?: string;
    contactHref?: string;
    relatedBasePath?: string;
    ctaTitle?: string;
    ctaBody?: string;
  };
}) {
  const emojiSrc = getServiceEmojiSrc(page.slug);
  const relatedPages = getRelatedServicePages(page.slug);
  const contactHref = locale?.contactHref ?? "/contatti";
  const relatedBasePath = locale?.relatedBasePath ?? "/servizi";
  const crumbs = locale?.breadcrumbs ?? [
    { href: "/", label: "Home" },
    { href: "/servizi", label: "Servizi" },
    { href: `/servizi/${page.slug}`, label: page.name },
  ];

  return (
    <>
      <section className="bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell">
          <Reveal>
            <nav aria-label="Percorso" className="mb-6">
              <ol className="flex flex-wrap items-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.href} className={index === 0 ? undefined : "flex items-center"}>
                    {index > 0 ? (
                      <span className="mx-2 text-border" aria-hidden="true">
                        /
                      </span>
                    ) : null}
                    {index === crumbs.length - 1 ? (
                      <span aria-current="page">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className="transition hover:text-foreground">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <SectionLabel>{page.name}</SectionLabel>
            <h1 className="font-display max-w-4xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
              {locale?.h1 ?? page.heroTitle}
              {emojiSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- emoji SVG from public folder
                <img
                  src={emojiSrc}
                  alt=""
                  aria-hidden="true"
                  className="ml-[0.28em] inline-block h-[0.85em] w-[0.85em] translate-y-[-0.06em] object-contain align-baseline"
                />
              ) : null}
            </h1>
            <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {page.heroBody}
            </p>
            {locale?.localLead ? (
              <p className="mt-5 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
                {locale.localLead}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={contactHref}>{page.heroCta}</Button>
              <Link
                href={`/demo/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold tracking-wide text-foreground transition hover:border-foreground/40 hover:bg-foreground/5"
              >
                Vedi la demo live
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>Il punto di partenza</SectionLabel>
            <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              {page.problemTitle}
            </h2>
            <p className="mt-8 max-w-3xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {page.problemBody}
            </p>
          </Reveal>
        </div>
      </section>

      {page.audienceItems && page.audienceItems.length > 0 ? (
        <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>Per chi</SectionLabel>
              <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                {page.audienceTitle ?? "Per chi è pensato"}
              </h2>
              {page.audienceBody ? (
                <p className="mt-8 max-w-3xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
                  {page.audienceBody}
                </p>
              ) : null}
            </Reveal>
            <ul className="mt-12 flex flex-wrap gap-3">
              {page.audienceItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>Funzionalità</SectionLabel>
            <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              Cosa può includere il progetto.
            </h2>
          </Reveal>
          <StickyStackCards
            items={page.features.map((feature, index) => ({
              iconLabel: String(index + 1).padStart(2, "0"),
              title: feature,
            }))}
          />
        </div>
      </section>

      {page.howSteps && page.howSteps.length > 0 ? (
        <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>Come funziona</SectionLabel>
              <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                {page.howTitle ?? "Come funziona"}
              </h2>
              {page.howIntro ? (
                <p className="mt-8 max-w-3xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
                  {page.howIntro}
                </p>
              ) : null}
            </Reveal>
            <ol className="mt-12 grid gap-5 md:grid-cols-2">
              {page.howSteps.map((step) => (
                <li
                  key={step.number}
                  className="rounded-[1.5rem] border border-border bg-foreground/[0.03] p-7"
                >
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-foreground/25">
                    {step.number}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {page.solutionTitle ? (
        <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>La soluzione</SectionLabel>
              <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                {page.solutionTitle}
              </h2>
              {page.solutionBody ? (
                <p className="mt-8 max-w-3xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
                  {page.solutionBody}
                </p>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {page.extraTitle ? (
        <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>Nel dettaglio</SectionLabel>
              <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                {page.extraTitle}
              </h2>
              {page.extraBody ? (
                <p className="mt-8 max-w-3xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
                  {page.extraBody}
                </p>
              ) : null}
            </Reveal>
            {page.extraItems && page.extraItems.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-3">
                {page.extraItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {relatedPages.length > 0 ? (
        <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>Servizi correlati</SectionLabel>
              <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                Soluzioni collegate.
              </h2>
            </Reveal>
            <ul className="mt-12 flex flex-wrap gap-3">
              {relatedPages.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`${relatedBasePath}/${related.slug}`}
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
                  >
                    {related.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <BlogInsightsSection
        service={page.slug}
        title={`Guide su ${page.name.toLowerCase()}.`}
      />

      <FinalCtaSection
        title={locale?.ctaTitle ?? page.ctaTitle}
        body={locale?.ctaBody ?? page.ctaBody}
        href={contactHref}
      />
    </>
  );
}
