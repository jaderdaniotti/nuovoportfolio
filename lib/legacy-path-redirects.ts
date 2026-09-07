/**
 * Residui path jaderweb / clone EN → destinazioni canoniche IT (B06).
 * Blog thin: vedi `legacy-blog-redirects.ts`.
 */
export const LEGACY_PATH_REDIRECTS: Array<{
  source: string;
  destination: string;
}> = [
  { source: "/pricing", destination: "/costo-sito-web" },
  { source: "/prezzi", destination: "/costo-sito-web" },
  { source: "/tariffe", destination: "/costo-sito-web" },
  { source: "/prices", destination: "/costo-sito-web" },
  { source: "/about", destination: "/perche-noi" },
  { source: "/chi-siamo", destination: "/perche-noi" },
  { source: "/chi-sono", destination: "/perche-noi" },
  { source: "/why-us", destination: "/perche-noi" },
  { source: "/why-me", destination: "/perche-noi" },
  { source: "/contact", destination: "/contatti" },
  { source: "/contacts", destination: "/contatti" },
  { source: "/contatto", destination: "/contatti" },
  { source: "/services", destination: "/servizi" },
  { source: "/service", destination: "/servizi" },
  { source: "/process", destination: "/processo" },
  { source: "/workflow", destination: "/processo" },
  { source: "/works", destination: "/portfolio" },
  { source: "/work", destination: "/portfolio" },
  { source: "/projects", destination: "/portfolio" },
  { source: "/progetti", destination: "/portfolio" },
  { source: "/home", destination: "/" },
  { source: "/index", destination: "/" },
  { source: "/index.html", destination: "/" },
  { source: "/blog.html", destination: "/blog" },
  { source: "/sitemap-www.xml", destination: "/sitemap.xml" },
];
