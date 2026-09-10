import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/button";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import {
  LOCAL_LANDINGS_HUB_PATH,
  relatedLandings,
  type LocalLandingPage,
  type LocalSectionId,
} from "@/lib/local-landings";
import { getLinkTitle } from "@/lib/link-titles";
import { shouldPrefetchHref } from "@/lib/prefetch";
import { portfolioProjects, testimonialsSection } from "@/lib/home-content";
import { cn } from "@/lib/cn";

function Breadcrumb({
  page,
  inverted = false,
}: {
  page: LocalLandingPage;
  inverted?: boolean;
}) {
  const crumbs = [
    { href: "/", label: "Home" },
    ...(page.path === "/udine"
      ? []
      : [{ href: LOCAL_LANDINGS_HUB_PATH, label: "Alto Friuli" }]),
    { href: page.path, label: page.name },
  ];

  return (
    <nav aria-label="Percorso" className="mb-8">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-xs",
          inverted ? "text-panel-fg/55" : "text-muted",
        )}
      >
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {last ? (
                <span className={inverted ? "text-background" : "text-foreground"}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  title={getLinkTitle(crumb.href, crumb.label)}
                  prefetch={shouldPrefetchHref(crumb.href)}
                  className={cn(
                    "underline-offset-4 transition hover:underline",
                    inverted
                      ? "hover:text-background"
                      : "hover:text-foreground",
                  )}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Hero({ page }: { page: LocalLandingPage }) {
  const inverted = page.heroVariant === "panel";
  const compact = page.heroVariant === "compact";
  const split = page.heroVariant === "split";
  const city = page.heroVariant === "city" || page.heroVariant === "flagship";

  const title = (
    <h1
      className={cn(
        "font-display font-semibold tracking-tight",
        compact
          ? "max-w-3xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.04]"
          : "max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]",
      )}
    >
      {page.h1}
    </h1>
  );

  const lead = (
    <p
      className={cn(
        "mt-6 max-w-2xl leading-relaxed",
        inverted ? "text-panel-fg/80" : "text-muted",
        compact ? "text-[1.05rem]" : "text-[clamp(1.05rem,2vw,1.25rem)]",
      )}
    >
      {page.lead}
    </p>
  );

  const actions = (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Button href="/contatti">{page.heroCta}</Button>
      {page.heroSecondary ? (
        <Button
          href={page.heroSecondary.href}
          variant="outline"
          className={
            inverted
              ? "border-background/40 text-background hover:border-background"
              : undefined
          }
        >
          {page.heroSecondary.label}
        </Button>
      ) : null}
    </div>
  );

  return (
    <header
      className={cn(
        "border-b border-border",
        inverted ? "bg-foreground text-background" : "bg-hero text-foreground",
        compact ? "py-14 lg:py-20" : "py-20 lg:py-28",
      )}
    >
      <div className="page-shell">
        <Reveal>
          <Breadcrumb page={page} inverted={inverted} />
          {inverted ? (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-background/70">
                {page.eyebrow}
              </span>
            </div>
          ) : (
            <SectionLabel>{page.eyebrow}</SectionLabel>
          )}
          {split ? (
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              {title}
              <div>
                {lead}
                {actions}
              </div>
            </div>
          ) : (
            <>
              {title}
              {lead}
              {actions}
            </>
          )}
          {city && page.proofPoints && page.proofPoints.length > 0 ? (
            <ul className="mt-12 grid gap-3 sm:grid-cols-3">
              {page.proofPoints.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-md border px-4 py-3 text-sm leading-snug",
                    inverted
                      ? "border-background/20 text-panel-fg/85"
                      : "border-border text-muted",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}

function IntroSection({ page }: { page: LocalLandingPage }) {
  if (!page.intro) return null;
  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.intro.heading}
      </h2>
      {page.intro.paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-4 text-[1.05rem] leading-relaxed text-muted"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function ServicesSection({ page }: { page: LocalLandingPage }) {
  const numbered = page.servicesVariant === "numbered";
  const grid = page.servicesVariant === "grid";

  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.servicesHeading}
      </h2>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
        {page.servicesIntro}
      </p>
      <ul
        className={cn(
          "mt-8",
          grid ? "grid gap-4 sm:grid-cols-2" : "space-y-6",
        )}
      >
        {page.services.map((service, index) => (
          <li
            key={service.title}
            className={cn(
              grid && "rounded-md border border-border p-5",
              page.servicesVariant === "list" &&
                "border-l-2 border-accent pl-4",
            )}
          >
            <p className="font-display text-lg font-semibold tracking-tight">
              {numbered ? (
                <span className="mr-2 text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
              {service.href ? (
                <Link
                  href={service.href}
                  title={getLinkTitle(service.href, service.title)}
                  prefetch={shouldPrefetchHref(service.href)}
                  className="underline-offset-4 hover:underline"
                >
                  {service.title}
                </Link>
              ) : (
                service.title
              )}
            </p>
            <p className="mt-2 text-[1.02rem] leading-relaxed text-muted">
              {service.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AudienceSection({ page }: { page: LocalLandingPage }) {
  if (!page.audience) return null;
  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.audience.heading}
      </h2>
      {page.audience.intro ? (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
          {page.audience.intro}
        </p>
      ) : null}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {page.audience.items.map((item) => (
          <li key={item.title} className="rounded-md border border-border p-5">
            <h3 className="font-display text-base font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcessSection({ page }: { page: LocalLandingPage }) {
  if (!page.process) return null;
  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.process.heading}
      </h2>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
        {page.process.body}
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {page.process.steps.map((step, index) => (
          <li key={step.title} className="rounded-md bg-hero p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-2 text-base font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LocalSection({ page }: { page: LocalLandingPage }) {
  if (!page.local) return null;
  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.local.heading}
      </h2>
      {page.local.paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-4 text-[1.05rem] leading-relaxed text-muted"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function PortfolioSection({ page }: { page: LocalLandingPage }) {
  const titles = page.portfolioTitles ?? [];
  const projects = portfolioProjects.filter((project) =>
    titles.includes(project.title),
  );
  const quotes = testimonialsSection.items.filter((item) =>
    (page.testimonialNames ?? []).includes(item.name),
  );

  if (projects.length === 0 && quotes.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.portfolioHeading ?? "Lavori e recensioni"}
      </h2>
      {page.portfolioIntro ? (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
          {page.portfolioIntro}
        </p>
      ) : null}
      {projects.length > 0 ? (
        <ul className="mt-8 flex flex-wrap gap-3">
          {projects.map((project) => (
            <li key={project.title}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                title={getLinkTitle(project.url, project.title)}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
              >
                {project.title}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/portfolio"
              title={getLinkTitle("/portfolio", "Tutto il portfolio")}
              prefetch={shouldPrefetchHref("/portfolio")}
              className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-foreground/40"
            >
              Tutto il portfolio
            </Link>
          </li>
        </ul>
      ) : null}
      {quotes.length > 0 ? (
        <ul className="mt-8 space-y-6">
          {quotes.map((item) => (
            <li key={item.name} className="border-t border-border pt-6">
              <blockquote className="text-[1.02rem] leading-relaxed text-muted">
                “{item.quote}”
              </blockquote>
              <p className="mt-3 text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted">{item.role}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function NeighborsSection({ page }: { page: LocalLandingPage }) {
  const related = relatedLandings(page);
  const extras = page.extraLinks ?? [];
  if (related.length === 0 && extras.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
        {page.relatedHeading}
      </h2>
      {related.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.path}
                title={getLinkTitle(item.path, item.h1)}
                prefetch={shouldPrefetchHref(item.path)}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {extras.length > 0 ? (
        <ul className="mt-6 space-y-2 text-sm">
          {extras.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                title={getLinkTitle(item.href, item.label)}
                prefetch={shouldPrefetchHref(item.href)}
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function FaqSection({ page }: { page: LocalLandingPage }) {
  if (page.faqs.length === 0) return null;
  return (
    <section className="border-t border-border pt-14">
      <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
        Domande frequenti
      </h2>
      <dl className="mt-8 space-y-8">
        {page.faqs.map((item) => (
          <div key={item.question}>
            <dt className="font-display text-lg font-semibold tracking-tight">
              {item.question}
            </dt>
            <dd className="mt-3 text-[1.02rem] leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const sectionRenderers: Record<
  LocalSectionId,
  (page: LocalLandingPage) => ReactNode
> = {
  intro: (page) => <IntroSection page={page} />,
  services: (page) => <ServicesSection page={page} />,
  audience: (page) => <AudienceSection page={page} />,
  process: (page) => <ProcessSection page={page} />,
  portfolio: (page) => <PortfolioSection page={page} />,
  local: (page) => <LocalSection page={page} />,
  neighbors: (page) => <NeighborsSection page={page} />,
  faq: (page) => <FaqSection page={page} />,
};

export function LocalLandingContent({ page }: { page: LocalLandingPage }) {
  return (
    <article className="bg-background text-foreground">
      <Hero page={page} />

      <div className="page-shell py-16 lg:py-24">
        <div
          className={cn(
            page.heroVariant === "flagship" || page.heroVariant === "city"
              ? "mx-auto max-w-4xl"
              : "mx-auto max-w-3xl",
          )}
        >
          {page.sectionOrder.map((id, index) => {
            const node = sectionRenderers[id](page);
            if (!node) return null;
            return (
              <Reveal
                key={id}
                delay={Math.min(0.04 + index * 0.03, 0.18)}
                className={index === 0 ? undefined : "mt-14"}
              >
                {node}
              </Reveal>
            );
          })}
        </div>
      </div>

      <FinalCtaSection
        title={page.ctaTitle}
        body={page.ctaBody}
        cta={page.ctaLabel}
        href="/contatti"
      />
    </article>
  );
}
