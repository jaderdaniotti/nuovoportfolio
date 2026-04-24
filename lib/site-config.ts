export const siteConfig = {
  name: "jaderweb",
  personName: "Jader Daniotti",
  title: "jaderweb — Web Designer & Sviluppatore | Udine, Friuli",
  description:
    "Web designer e sviluppatore a Udine: siti web veloci, UX moderna, SEO e integrazioni AI. Progetti su misura per PMI, brand e startup in Friuli Venezia Giulia.",
  // Keep one canonical host for metadata, robots and sitemap.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jaderweb.com").replace(/\/$/, ""),
  locale: "it_IT",
  keywords: [
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
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jaderweb.com").replace(/\/$/, ""),
  },
  links: {
    email: "mailto:jaderdaniotti.lavoro@gmail.com",
    calendar: "https://calendar.google.com",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
  },
} as const;
