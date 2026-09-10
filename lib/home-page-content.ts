import type { LucideIcon } from "lucide-react";
import {
  Bot,
  LayoutTemplate,
  Palette,
  RefreshCw,
  Search,
  ShoppingCart,
} from "lucide-react";
import { homeFaqs } from "@/lib/home-content";

export type HomeService = {
  icon: LucideIcon;
  title: string;
  description: string;
  keywords: string;
};

export type HomeProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export const homeHeroStats = [
  { value: 5, suffix: "★", label: "Recensioni medie" },
  { value: 100, suffix: "%", label: "Attenzione a velocità e SEO" },
  { value: 24, suffix: "h", label: "Di solito rispondo entro" },
] as const;

export const homeServices: HomeService[] = [
  {
    icon: LayoutTemplate,
    title: "Siti su misura",
    description:
      "Vetrine, landing e siti multi-pagina scritti a codice con Next.js. Veloci, responsive, curati nei dettagli.",
    keywords: "creazione siti web, sito vetrina",
  },
  {
    icon: Search,
    title: "SEO tecnica e locale",
    description:
      "Struttura pulita, Core Web Vitals, schema markup e contenuti pensati per uscire su Google — da Udine a tutta Italia.",
    keywords: "SEO siti web, Google Udine",
  },
  {
    icon: Palette,
    title: "UI/UX e design",
    description:
      "Interfacce ordinate, gerarchie chiare e componenti coerenti. Niente caos visivo: ogni schermata ha un motivo.",
    keywords: "web design, UI UX",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce e cataloghi",
    description:
      "Negozi online, cataloghi prodotti e percorsi d'acquisto con pagamenti, spedizioni e tracciamento integrato.",
    keywords: "ecommerce Next.js, negozio online",
  },
  {
    icon: RefreshCw,
    title: "Restyling e migrazione",
    description:
      "Hai un sito lento o datato? Lo rinnovo senza buttare via tutto quello che hai già costruito su Google.",
    keywords: "restyling sito web, migrazione sito",
  },
  {
    icon: Bot,
    title: "Chatbot e automazioni",
    description:
      "Assistenti sul sito, form che funzionano e collegamenti WhatsApp per rispondere anche quando non ci sei.",
    keywords: "chatbot sito web, automazioni",
  },
];

export const homeProcessSteps: HomeProcessStep[] = [
  {
    step: "01",
    title: "Ci sentiamo",
    description:
      "Mi racconti cosa ti serve, cosa non va nel sito attuale (se c'è) e quali tempi hai in testa. Niente questionari infiniti.",
  },
  {
    step: "02",
    title: "Design e prototipo",
    description:
      "Wireframe, UI su misura e revisioni rapide. Ogni pagina ha un obiettivo chiaro — non riempiamo spazi a caso.",
  },
  {
    step: "03",
    title: "Sviluppo Next.js",
    description:
      "Codice ordinato, immagini ottimizzate, deploy su Vercel. Il sito deve volare anche da mobile, punto.",
  },
  {
    step: "04",
    title: "Online e follow-up",
    description:
      "Mettiamo online, controlliamo analytics e SEO base. Poi resto disponibile per aggiustamenti e crescita.",
  },
];

export const homeValues = [
  {
    title: "Parli con me",
    body: "Niente ticket, niente passaggi in ufficio: scrivi e rispondo io, dalla prima idea alla consegna.",
  },
  {
    title: "Codice, non template",
    body: "Niente temi WordPress copiati: ogni progetto è costruito per quello che ti serve davvero.",
  },
  {
    title: "Numeri, non fumo",
    body: "Velocità, SEO e contatti dal sito si misurano. Preferisco mostrarti dati che farti promesse vuote.",
  },
] as const;

export const homeFaq: HomeFaqItem[] = [...homeFaqs];

export const homeToolsHighlight = {
  title: "Toolbox gratuito",
  description:
    "Oltre 40 strumenti SEO e utility che ho messo online — utili per capire come sta andando il tuo sito.",
  href: "/tools",
  featured: [
    { label: "Audit SEO on-page", href: "/tools/audit-seo-on-page" },
    { label: "Simulatore ROI sito web", href: "/tools/simulatore-roi-sito-web" },
    { label: "Generatore meta tag", href: "/tools/generatore-meta-tag" },
    { label: "Checker Core Web Vitals", href: "/tools/checker-core-web-vitals-base" },
  ],
} as const;
