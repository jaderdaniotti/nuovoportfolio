import { AuthorityStripSection } from "@/components/sections/authority-strip-section";
import { DifferentiationSection } from "@/components/sections/differentiation-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { HomeLocalIntentSection } from "@/components/sections/home-local-intent-section";
import { LocalSection } from "@/components/sections/local-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesFlowingMenuSection } from "@/components/sections/services-flowing-menu";
import { ServicesSection } from "@/components/sections/services-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { IntroSplash } from "@/components/intro-splash";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";
import { COMUNI_HUB_PATH } from "@/lib/comune-paths";
import { LOCAL_LANDINGS_HUB_PATH, getLocalLandingNavItems } from "@/lib/local-landings";

const PINNED_LOCAL_HREFS = ["/udine", "/siti-web/gemona-del-friuli"] as const;

export function HomePageShell() {
  const localLandings = getLocalLandingNavItems();
  const pinnedHrefs = new Set<string>(PINNED_LOCAL_HREFS);
  const pinned = PINNED_LOCAL_HREFS.flatMap((href) =>
    localLandings.filter((item) => item.href === href),
  );
  const rest = localLandings.filter((item) => !pinnedHrefs.has(item.href));

  return (
    <>
      <ScrollToTopOnLoad />
      <IntroSplash />
      <main>
        <HeroSection />
        <AuthorityStripSection />
        <HomeLocalIntentSection />
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
        <LocalSection
          links={[
            ...pinned.map((item) => ({ href: item.href, label: item.label })),
            { href: LOCAL_LANDINGS_HUB_PATH, label: "Siti web in Alto Friuli" },
            ...rest.map((item) => ({ href: item.href, label: item.label })),
            { href: COMUNI_HUB_PATH, label: "Tutti i comuni d’Italia" },
          ]}
        />
        <HomeFaqSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
