import { SITE_URL } from "@/lib/seo";

/** Compatibility shim for legacy jaderweb imports. Canonical brand lives in lib/seo + lib/home-content. */
export const siteConfig = {
  name: "jaderweb",
  personName: "Jader Daniotti",
  vatNumber: "14494540967",
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
  links: {
    email: "mailto:jaderdaniotti.lavoro@gmail.com",
    calendar: "https://calendar.google.com",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
  },
} as const;
