import SplitText from "@/components/split-text";
import { Button } from "@/components/button";
import { ContactStepForm } from "@/components/contact-step-form";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import {
  contactAfter,
  contactClose,
  contactDirect,
  contactPage,
} from "@/lib/contact-page";
import { site } from "@/lib/home-content";

export function ContactPageContent({
  locale,
}: {
  locale?: {
    eyebrow?: string;
    subtitle?: string;
    locationLine?: string;
  };
}) {
  return (
    <>
      <section className="bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>{locale?.eyebrow ?? contactPage.eyebrow}</SectionLabel>
          </Reveal>
          <h1 className="font-display mt-0 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            <SplitText
              tag="span"
              text={contactPage.title}
              className="font-display block text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
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
            <SplitText
              tag="span"
              text={contactPage.titleLine2}
              className="font-display block text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
              delay={30}
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
            <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {locale?.subtitle ?? contactPage.subtitle}
            </p>
            <p className="font-display mt-10 text-[clamp(0.95rem,2vw,1.15rem)] font-semibold tracking-[0.14em] text-foreground">
              {contactPage.stack.join(" · ")}
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="form"
        className="border-y border-border bg-background py-20 text-foreground lg:py-28"
      >
        <div className="page-shell">
          <div className="mx-auto max-w-3xl">
            <ContactStepForm />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
              {contactAfter.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
              {contactAfter.body}
            </p>
          </Reveal>
          <ProcessTimeline items={[...contactAfter.steps]} />
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
        <div className="page-shell">
          <Reveal>
            <h2 className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight">
              {contactDirect.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {contactDirect.emailLabel}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="font-display mt-3 inline-block text-[clamp(1.1rem,2vw,1.35rem)] font-semibold tracking-tight transition hover:opacity-70"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {contactDirect.whatsappLabel}
              </p>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display mt-3 inline-block text-[clamp(1.1rem,2vw,1.35rem)] font-semibold tracking-tight transition hover:opacity-70"
              >
                {contactDirect.whatsappCta} →
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {contactDirect.whereLabel}
              </p>
              <p className="font-display mt-3 text-[clamp(1.1rem,2vw,1.35rem)] font-semibold tracking-tight">
                {locale?.locationLine ?? site.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 text-foreground lg:py-32">
        <div className="page-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
              {contactClose.title}
            </h2>
            <p className="font-display mt-6 text-[clamp(1.5rem,4vw,2.6rem)] font-semibold tracking-tight">
              <mark className="bg-accent box-decoration-clone px-[0.12em] text-ink">
                {contactClose.highlight}
              </mark>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
              {contactClose.body}
            </p>
            <div className="mt-10">
              <Button href="#form">{contactClose.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
