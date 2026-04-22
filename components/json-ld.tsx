import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
