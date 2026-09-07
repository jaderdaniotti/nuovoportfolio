import Link from "next/link";
import SplitText from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import type { LegalPage } from "@/lib/legal-pages";

export function LegalPageContent({ page }: { page: LegalPage }) {
  return (
    <>
      <section className="relative overflow-x-clip bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>{page.eyebrow}</SectionLabel>
          </Reveal>
          <h1 className="font-display mt-0 max-w-4xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            <SplitText
              tag="span"
              text={page.title}
              className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight"
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
            <p className="mt-6 text-sm font-medium tracking-[0.12em] text-muted uppercase">
              Aggiornato il {page.updatedAt}
            </p>
            <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-background py-16 text-foreground lg:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl space-y-14">
            {page.sections.map((section, index) => (
              <Reveal key={section.title} delay={0.04 + index * 0.03}>
                <article className="border-b border-border pb-12 last:border-b-0 last:pb-0">
                  <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display mt-3 text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-[clamp(1.02rem,1.8vw,1.15rem)] leading-relaxed text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.items ? (
                    <ul className="mt-6 space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[clamp(1.02rem,1.8vw,1.15rem)] leading-relaxed text-foreground"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
            <p className="text-sm text-muted">
              {page.eyebrow === "Privacy" ? (
                <>
                  Consulta anche l&apos;
                  <Link
                    href="/cookie"
                    className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
                  >
                    informativa cookie
                  </Link>
                </>
              ) : (
                <>
                  Consulta anche l&apos;
                  <Link
                    href="/privacy"
                    className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
                  >
                    informativa privacy
                  </Link>
                </>
              )}
              , oppure torna ai{" "}
              <Link
                href="/contatti"
                className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Contatti
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
