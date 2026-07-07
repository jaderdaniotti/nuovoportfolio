import { buildFaqPageJsonLd } from "@/lib/faq-seo-generator";
import { homeFaq, homeServices } from "@/lib/home-page-content";
import { websitePlans } from "@/lib/pricing-content";
import { siteConfig } from "@/lib/site-config";

const homeUrl = siteConfig.url;

export function buildHomePageJsonLd(): Record<string, unknown> {
  const faqLd = buildFaqPageJsonLd(homeFaq, homeUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${homeUrl}/#website`,
        url: homeUrl,
        name: siteConfig.name,
        alternateName: siteConfig.personName,
        inLanguage: "it-IT",
        description: siteConfig.description,
        publisher: { "@id": `${homeUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}/#webpage`,
        url: homeUrl,
        name: "Creazione siti web a Udine e in tutta Italia | jaderweb",
        description: siteConfig.description,
        isPartOf: { "@id": `${homeUrl}/#website` },
        about: { "@id": `${homeUrl}/#person` },
        inLanguage: "it-IT",
      },
      {
        "@type": "Organization",
        "@id": `${homeUrl}/#organization`,
        name: siteConfig.name,
        url: homeUrl,
        logo: `${homeUrl}/logopurple.png`,
        email: "jaderdaniotti.lavoro@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udine",
          addressRegion: "Friuli-Venezia Giulia",
          addressCountry: "IT",
        },
        sameAs: [siteConfig.links.linkedin, siteConfig.links.github].filter(Boolean),
      },
      {
        "@type": "Person",
        "@id": `${homeUrl}/#person`,
        name: siteConfig.personName,
        url: homeUrl,
        jobTitle: "Web designer e sviluppatore fullstack",
        worksFor: { "@id": `${homeUrl}/#organization` },
        knowsAbout: [
          "Web design",
          "Sviluppo frontend",
          "Next.js",
          "SEO tecnica",
          "UI/UX",
          "E-commerce",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udine",
          addressRegion: "Friuli-Venezia Giulia",
          addressCountry: "IT",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${homeUrl}/#service`,
        name: "jaderweb — Creazione siti web",
        url: homeUrl,
        image: `${homeUrl}/logopurple.png`,
        description: siteConfig.description,
        areaServed: [
          { "@type": "Country", name: "Italia" },
          { "@type": "City", name: "Udine" },
          { "@type": "City", name: "Milano" },
          { "@type": "City", name: "Roma" },
        ],
        provider: { "@id": `${homeUrl}/#person` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servizi web",
          itemListElement: homeServices.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
          })),
        },
        makesOffer: websitePlans.map((plan) => ({
          "@type": "Offer",
          name: `Pacchetto ${plan.name}`,
          description: plan.tagline,
          price: String(plan.setupPrice),
          priceCurrency: "EUR",
        })),
      },
      faqLd,
    ],
  };
}
