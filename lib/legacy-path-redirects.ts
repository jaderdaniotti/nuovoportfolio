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
  { source: "/siti-web/udine", destination: "/udine" },
  {
    source: "/siti-web-gemona-del-friuli",
    destination: "/siti-web/gemona-del-friuli",
  },
  { source: "/siti-web-buja", destination: "/siti-web/buja" },
  { source: "/siti-web-artegna", destination: "/siti-web/artegna" },
  { source: "/siti-web-osoppo", destination: "/siti-web/osoppo" },
  { source: "/siti-web-venzone", destination: "/siti-web/venzone" },
  { source: "/siti-web-tarcento", destination: "/siti-web/tarcento" },
  { source: "/siti-web-majano", destination: "/siti-web/majano" },
  { source: "/siti-web-trasaghis", destination: "/siti-web/trasaghis" },
  {
    source: "/siti-web-forgaria-nel-friuli",
    destination: "/siti-web/forgaria-nel-friuli",
  },
  {
    source: "/siti-web-san-daniele-del-friuli",
    destination: "/siti-web/san-daniele-del-friuli",
  },
  { source: "/siti-web-tolmezzo", destination: "/siti-web/tolmezzo" },
  { source: "/siti-web-udine", destination: "/udine" },
];
