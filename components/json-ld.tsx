import { siteConfig } from "@/lib/site-config";

type JsonLdProps = {
  data?: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  const defaultData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.personName,
        inLanguage: "it-IT",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.personName,
        url: siteConfig.url,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        jobTitle: "Web designer e sviluppatore",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udine",
          addressRegion: "Friuli-Venezia Giulia",
          addressCountry: "IT",
        },
        knowsAbout: [
          "Web design",
          "UI/UX",
          "Sviluppo frontend",
          "Next.js",
          "SEO",
        ],
        sameAs: [siteConfig.links.linkedin, siteConfig.links.github].filter(Boolean),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data ?? defaultData) }}
    />
  );
}
