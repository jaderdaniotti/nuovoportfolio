import { AuthorityStripSection } from "@/components/sections/authority-strip-section";
import { DifferentiationSection } from "@/components/sections/differentiation-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesFlowingMenuSection } from "@/components/sections/services-flowing-menu";
import { ServicesSection } from "@/components/sections/services-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";

export function HomePageShell() {
  return (
    <>
      <ScrollToTopOnLoad />
      <main>
        <HeroSection />
        <AuthorityStripSection />
        <ServicesSection />
        <ServicesFlowingMenuSection
          label="Per chi"
          title="Siti per aziende, professionisti e attività locali."
        />
        <PortfolioSection />
        <DifferentiationSection />
        <ProcessSection />
        <TechSection />
        <TestimonialsSection />
        <FounderSection />
        <HomeFaqSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
