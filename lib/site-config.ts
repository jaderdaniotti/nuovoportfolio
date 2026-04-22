export const siteConfig = {
  name: "Jader Daniotti",
  title: "Jader Daniotti — Web Designer & Sviluppatore | Udine, Friuli",
  description:
    "Web designer e sviluppatore a Udine: siti web veloci, UX moderna, SEO e integrazioni AI. Progetti su misura per PMI, brand e startup in Friuli Venezia Giulia.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaderdaniotti.vercel.app",
  locale: "it_IT",
  keywords: [
    "web designer Udine",
    "creazione siti web Friuli",
    "sviluppatore web Udine",
    "UI UX design",
    "siti web SEO",
    "Next.js developer Italia",
    "portfolio web designer",
    "Jader Daniotti",
  ],
  author: {
    name: "Jader Daniotti",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaderdaniotti.vercel.app",
  },
  links: {
    email: "mailto:info@jaderdaniotti.it",
    calendar: "https://calendar.google.com",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
  },
} as const;
