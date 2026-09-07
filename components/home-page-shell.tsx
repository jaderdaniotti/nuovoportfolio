import { AuthorityStripSection } from "@/components/sections/authority-strip-section";
import { DifferentiationSection } from "@/components/sections/differentiation-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LocalSection } from "@/components/sections/local-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesFlowingMenuSection } from "@/components/sections/services-flowing-menu";
import { ServicesSection } from "@/components/sections/services-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { IntroSplash } from "@/components/intro-splash";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";
import { getFeaturedComuni } from "@/lib/comuni";
import { COMUNI_HUB_PATH, comuneBasePath } from "@/lib/comune-paths";

export function HomePageShell() {
  const featured = getFeaturedComuni(8);

  return (
    <>
      <ScrollToTopOnLoad />
      <IntroSplash />
      <main>
        <HeroSection />
        <AuthorityStripSection />
        <ServicesSection />
        <ServicesFlowingMenuSection />
        <PortfolioSection />
        <DifferentiationSection />
        <ProcessSection />
        <TechSection />
        <TestimonialsSection />
        <FounderSection />
        <LocalSection
          links={[
            ...featured.map((comune) => ({
              href: comuneBasePath(comune.slug),
              label: `Siti web a ${comune.nome}`,
            })),
            { href: COMUNI_HUB_PATH, label: "Tutti i comuni d’Italia" },
          ]}
        />
        <FinalCtaSection />
      </main>
    </>
  );
}
