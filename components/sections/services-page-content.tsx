import { Button } from "@/components/button";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import SplitText from "@/components/split-text";
import FlowingMenu from "@/components/flowing-menu";
import { serviceIndexItems, servicesPage } from "@/lib/services-content";
import type { MenuItemData } from "@/components/flowing-menu";

export function ServicesPageContent({
  locale,
}: {
  locale?: {
    eyebrow?: string;
    title?: string;
    titleLine2?: string;
    body?: string;
    cta?: string;
    contactHref?: string;
    items?: MenuItemData[];
  };
}) {
  const title = locale?.title ?? servicesPage.title;
  const titleLine2 = locale?.titleLine2 ?? servicesPage.titleLine2;
  const body = locale?.body ?? servicesPage.body;
  const cta = locale?.cta ?? servicesPage.cta;
  const contactHref = locale?.contactHref ?? "/contatti";
  const items = locale?.items ?? [...serviceIndexItems];

  return (
    <>
      <section className="bg-hero pt-16 pb-20 text-foreground lg:pt-24 lg:pb-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>{locale?.eyebrow ?? servicesPage.eyebrow}</SectionLabel>
          </Reveal>
          <h1 className="font-display mt-0 max-w-4xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
            <SplitText
              tag="span"
              text={title}
              className="block w-full font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight"
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
              text={titleLine2}
              className="block w-full font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight"
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
              {body}
            </p>
            <div className="mt-10">
              <Button href={contactHref}>{cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-background text-foreground text-center">
        <div className="page-shell pt-16 pb-8 lg:pt-20 text-center">
          <Reveal className="text-center flex flex-col items-center">
            <SectionLabel>Indice </SectionLabel>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              Tutti i servizi web.
            </h2>
          </Reveal>
        </div>
        <FlowingMenu items={items} speed={12} />
      </section>

      <FinalCtaSection href={contactHref} />
    </>
  );
}
