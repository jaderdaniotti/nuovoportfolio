export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  coverGradient: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-locale-friuli-siti-web",
    title: "SEO locale in Friuli: come farsi trovare su Google nel 2026",
    description:
      "Struttura dei contenuti, parole chiave geografiche e segnali di trust per PMI e professionisti che vogliono visibilità nella propria area.",
    date: "2026-03-12",
    readingMinutes: 6,
    keywords: [
      "SEO locale Friuli",
      "visibilità Google Udine",
      "ottimizzazione sito web",
    ],
    coverGradient: "from-violet-600/20 via-zinc-100 to-white",
    content: [
      "La SEO locale non è una lista di tag: è coerenza tra ciò che offri, come lo descrivi e dove operi. Per un sito che deve intercettare ricerche come «web designer Udine» o «agenzia siti web Friuli», servono pagine chiare, titoli univoci e contenuti che rispondano davvero all’intento di ricerca.",
      "Inizia dall’anagrafica: nome attività, area servita, recensioni verificate e link coerenti. Poi lavora sulla velocità: Core Web Vitals solidi riducono abbandoni e migliorano la percezione di qualità, soprattutto su mobile.",
      "Infine, costruisci autorità con casi studio, articoli utili (come questo) e pagine di servizio ben differenziate. Google premia siti che aiutano l’utente a decidere, non quelli che ripetono le stesse frasi in ogni paragrafo.",
    ],
  },
  {
    slug: "ux-siti-vetrina-conversioni",
    title: "UX per siti vetrina: gerarchia visiva e micro-interazioni che convertono",
    description:
      "Come progettare percorsi di lettura chiari, CTA visibili e sezioni che guidano il visitatore verso il contatto.",
    date: "2026-02-28",
    readingMinutes: 5,
    keywords: ["UX design", "conversion rate", "siti vetrina", "CTA"],
    coverGradient: "from-black/5 via-violet-500/10 to-white",
    content: [
      "Un portfolio o un sito vetrina ha un obiettivo primario: farti contattare. La gerarchia tipografica deve quindi anticipare il messaggio: chi sei, cosa fai, perché sei credibile, come raggiungerti.",
      "Le micro-interazioni — hover, transizioni leggere, feedback immediato ai form — non sono decorazione: comunicano cura e riducono l’attrito percettivo. L’utente capisce che il sito è «vivo» e curato.",
      "Evita il rumore visivo: meno colonne rigide, più griglie asimmetriche (bento) che mettono in risalto progetti e testimonianze senza affollare la pagina.",
    ],
  },
  {
    slug: "nextjs-performances-core-web-vitals",
    title: "Next.js e performance: perché la velocità è parte del design",
    description:
      "Rendering ibrido, immagini ottimizzate e strategie di caching: cosa significa in pratica per chi vuole un sito moderno.",
    date: "2026-01-20",
    readingMinutes: 7,
    keywords: ["Next.js", "Core Web Vitals", "performance web", "SSR"],
    coverGradient: "from-violet-700/15 to-zinc-50",
    content: [
      "Next.js permette di scegliere dove calcolare l’HTML: statico per pagine stabili, dinamico dove serve freschezza. Questo si traduce in tempi di primo caricamento più bassi e migliore esperienza, soprattutto su connessioni mobili.",
      "Le immagini con `next/image` e i font con `next/font` eliminano molti problemi classici: layout shift, pesi eccessivi, FOIT/FOUT non gestiti.",
      "Un sito veloce non è solo tecnico: è percepito come più professionale. È per questo che performance e UX vanno progettate insieme fin dall’inizio, non come «ottimizzazione finale».",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return blogPosts.map((p) => p.slug);
}
