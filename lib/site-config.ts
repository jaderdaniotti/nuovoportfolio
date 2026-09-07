import { SITE_URL } from "@/lib/seo";

/** Compatibility shim for legacy jaderweb imports. Canonical brand lives in lib/seo + lib/home-content. */
export const siteConfig = {
  name: "jaderweb",
  personName: "Jader Daniotti",
  vatNumber: "14494540967",
  /** E.164 senza spazi — unico formato telefono in JSON-LD */
  telephone: "+393513152008",
  title: "Creazione siti web a Udine | jaderweb",
  description:
    "Creazione siti web a Udine e in tutta Italia: sviluppo su misura, UX moderna, SEO tecnica e supporto diretto per PMI, professionisti e brand.",
  url: SITE_URL.replace(/\/$/, ""),
  locale: "it_IT",
  keywords: [
    "Creazione siti web a",
    "creazione siti web a Udine",
    "creazione siti web a Milano",
    "creazione siti web a Roma",
    "web designer Udine",
    "creazione siti web Friuli",
    "sviluppatore web Udine",
    "UI UX design",
    "siti web SEO",
    "Next.js developer Italia",
    "portfolio web designer",
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
