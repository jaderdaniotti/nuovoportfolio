import { SITE_URL } from "@/lib/seo";

/** Compatibility shim for legacy jaderweb imports. Canonical brand lives in lib/seo + lib/home-content. */
export const siteConfig = {
  name: "jaderweb",
  personName: "Jader Daniotti",
  vatNumber: "14494540967",
  /** E.164 senza spazi — unico formato telefono in JSON-LD */
  telephone: "+393513152008",
  title: "Sviluppatore Web Freelance Udine e Gemona | jaderweb",
  description:
    "Sviluppatore web freelance a Udine e Gemona del Friuli. Realizzo siti web, ecommerce e soluzioni digitali su misura per aziende e professionisti.",
  url: SITE_URL.replace(/\/$/, ""),
  locale: "it_IT",
  keywords: [
    "sviluppatore web Udine",
    "sviluppatore web freelance Udine",
    "sviluppatore web Gemona del Friuli",
    "realizzazione siti web Udine",
    "siti web Udine",
    "siti web Gemona del Friuli",
    "ecommerce Udine",
    "Shopify Udine",
    "sviluppo web su misura",
    "sviluppatore web freelance",
    "jaderweb",
    "Jader Daniotti",
  ],
  author: {
    name: "jaderweb",
    url: SITE_URL.replace(/\/$/, ""),
  },
  address: {
    addressLocality: "Udine",
    addressRegion: "Friuli-Venezia Giulia",
    addressCountry: "IT",
  },
  links: {
    email: "mailto:jaderdaniotti.lavoro@gmail.com",
    calendar: "https://calendar.google.com",
    /** Profili pubblici verificati — niente homepage generiche */
    linkedin: "https://www.linkedin.com/in/jader-daniotti-0a00b9328",
    github: "https://github.com/jaderdaniotti",
  },
} as const;

/** Profili ufficiali per JSON-LD `sameAs` (Organization + Person). */
export function sameAsProfiles(): string[] {
  return [siteConfig.links.linkedin, siteConfig.links.github];
}
