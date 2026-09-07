import Link from "next/link";
import { Button } from "@/components/button";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import type { PillarPage } from "@/lib/pillar-pages";

export function PillarPageContent({ page }: { page: PillarPage }) {
  return (
    <article className="bg-background text-foreground">
      <header className="border-b border-border bg-hero py-20 lg:py-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>{page.eyebrow}</SectionLabel>
            <h1 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {page.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="page-shell py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          {page.sections.map((section, index) => (
            <Reveal key={section.heading} delay={Math.min(0.04 + index * 0.03, 0.18)}>
              <section className={index === 0 ? undefined : "mt-14"}>
                <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-4 text-[1.05rem] leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}

          {page.faq.length > 0 ? (
            <section className="mt-16 border-t border-border pt-14">
              <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
                Domande frequenti
              </h2>
              <dl className="mt-8 space-y-8">
                {page.faq.map((item) => (
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
          ) : null}

          <aside className="mt-16 border-t border-border pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Approfondisci
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contatti">Contatti →</Button>
            </div>
          </aside>
        </div>
      </div>

      <FinalCtaSection
        title={page.ctaTitle}
        body={page.ctaBody}
        cta="Parliamone"
        href="/contatti"
      />
    </article>
  );
}
