import { AuthorityStripSection } from "@/components/sections/authority-strip-section";
import { ComunePagesSection } from "@/components/comune-pages-section";
import { DifferentiationSection } from "@/components/sections/differentiation-section";
import { BlogInsightsSection } from "@/components/sections/blog-insights-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FounderSection } from "@/components/sections/founder-section";
import { ComuneHeroSection } from "@/components/sections/comune-hero-section";
import { LocalSection } from "@/components/sections/local-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesFlowingMenuSection } from "@/components/sections/services-flowing-menu";
import { ServicesSection } from "@/components/sections/services-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";
import type { ComuneData } from "@/lib/comuni";
import { comuneLabel } from "@/lib/comuni";
import { seedFromComune, type ComunePageSeo } from "@/lib/comuni-seo";
import { COMUNI_HUB_PATH, comuneContattiPath, comuneServicePath } from "@/lib/comune-paths";
import { serviceIndexItems } from "@/lib/services-content";

export function ComuneHomeShell({
  comune,
  seo,
  nearby,
}: {
  comune: ComuneData;
  seo: ComunePageSeo;
  nearby: ComuneData[];
}) {
  const label = comuneLabel(comune);

  return (
    <>
      <ScrollToTopOnLoad />
      <main>
        <ComuneHeroSection comune={comune} seo={seo} />
        <AuthorityStripSection />
        <ServicesSection />
        <ComunePagesSection comune={comune} nearby={nearby} />
        <ServicesFlowingMenuSection
          label={label}
          title={`Servizi web a ${comune.nome}`}
          items={serviceIndexItems.map((item) => ({
            ...item,
            link: comuneServicePath(
              comune.slug,
              item.link.replace("/servizi/", ""),
            ),
          }))}
        />
        <PortfolioSection />
        <DifferentiationSection />
        <ProcessSection />
        <TechSection />
        <TestimonialsSection />
        <FounderSection />
        <LocalSection
          title={`Un freelance web per ${comune.nome}.`}
          titleLine2="Stesso metodo, territorio vero."
          body={`Sono jaderweb: progetto siti e sistemi digitali per attività di ${label}, in ${comune.provincia} e in ${comune.regione}. La pagina che stai leggendo è la landing localizzata di questo comune.`}
          areas={[comune.nome, comune.provincia, comune.regione, "Italia"]}
          links={[
            { href: COMUNI_HUB_PATH, label: "Tutti i comuni serviti" },
            { href: comuneContattiPath(comune.slug), label: `Contatti freelance web ${comune.nome}` },
            { href: "/blog", label: "Blog jaderweb" },
            { href: "/udine", label: "Pilastro siti web Udine" },
          ]}
        />
        <BlogInsightsSection
          title={`Approfondimenti utili per attività a ${comune.nome}.`}
          limit={6}
          seed={seedFromComune(comune.codice)}
        />
        <FinalCtaSection
          title={`Hai un progetto a ${comune.nome}?`}
          body={seo.cta}
          href={comuneContattiPath(comune.slug)}
        />
        <section className="sr-only">
          <h2>{seo.h1}</h2>
          <p>{seo.description}</p>
          <p>
            Comune {comune.nome} / Provincia {comune.provincia} ({comune.sigla}) /
            Regione {comune.regione}
          </p>
          <p>{comune.seo.cta}</p>
        </section>
      </main>
    </>
  );
}
