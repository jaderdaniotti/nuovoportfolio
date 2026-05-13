export const siteConfig = {
  name: "jaderweb",
  personName: "Jader Daniotti",
  title: "Creazione siti web a Udine | jaderweb",
  description:
    "Creazione siti web a Udine e in tutta Italia: sviluppo su misura, UX moderna, SEO tecnica e supporto diretto per PMI, professionisti e brand.",
  // Keep one canonical host for metadata, robots and sitemap.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jaderweb.com").replace(/\/$/, ""),
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
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jaderweb.com").replace(/\/$/, ""),
  },
  links: {
    email: "mailto:jaderdaniotti.lavoro@gmail.com",
    calendar: "https://calendar.google.com",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
  },
} as const;
