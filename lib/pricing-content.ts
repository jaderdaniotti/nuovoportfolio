import type { LucideIcon } from "lucide-react";
import { Bot, Crown, MessagesSquare, Rocket, Sprout } from "lucide-react";

export type PlanFeature = {
  label: string;
  basic: boolean;
  pro: boolean;
  business: boolean;
};

export type WebsitePlan = {
  id: "basic" | "pro" | "business";
  icon: LucideIcon;
  name: string;
  tagline: string;
  setupPrice: number;
  maintenancePrice: number;
  highlighted?: boolean;
  highlights: string[];
};

export type ChatbotPlan = {
  id: "standard" | "premium";
  icon: LucideIcon;
  name: string;
  audience: string;
  monthlyPrice: number;
  highlighted?: boolean;
  features: string[];
};

export type ChatbotPlanFeature = {
  label: string;
  standard: boolean | string;
  premium: boolean | string;
};

export const websitePlans: WebsitePlan[] = [
  {
    id: "basic",
    icon: Sprout,
    name: "Basic",
    tagline: "Presenza online essenziale per partire subito",
    setupPrice: 999,
    maintenancePrice: 290,
    highlights: [
      "Design personalizzato su misura",
      "Modulo contatti e social collegati",
      "SEO di base e GDPR inclusi",
      "Hosting e dominio configurati",
    ],
  },
  {
    id: "pro",
    icon: Rocket,
    name: "Pro",
    tagline: "Il pacchetto più scelto da PMI e professionisti",
    setupPrice: 1299,
    maintenancePrice: 349,
    highlighted: true,
    highlights: [
      "Fino a 5 pagine con animazioni moderne",
      "SEO avanzata e ottimizzazione velocità",
      "WhatsApp, Google Maps e sezione FAQ",
      "Form avanzati e supporto post-consegna",
    ],
  },
  {
    id: "business",
    icon: Crown,
    name: "Business",
    tagline: "Per brand che vogliono crescere con contenuti e dati",
    setupPrice: 1699,
    maintenancePrice: 449,
    highlights: [
      "Blog integrato con gestione articoli",
      "Google Analytics e SEO del blog",
      "Sito multilingua pronto per espansione",
      "Tutto ciò che include Pro, e di più",
    ],
  },
];

export const planFeatures: PlanFeature[] = [
  { label: "Design personalizzato", basic: true, pro: true, business: true },
  { label: "Sito responsive (mobile e tablet)", basic: true, pro: true, business: true },
  { label: "Modulo contatti", basic: true, pro: true, business: true },
  { label: "Collegamento social media", basic: true, pro: true, business: true },
  { label: "Galleria immagini", basic: true, pro: true, business: true },
  { label: "SEO di base", basic: true, pro: true, business: true },
  { label: "Cookie Banner GDPR", basic: true, pro: true, business: true },
  { label: "Privacy Policy e Cookie Policy", basic: true, pro: true, business: true },
  { label: "Hosting e dominio configurati", basic: true, pro: true, business: true },
  { label: "Supporto post-consegna", basic: true, pro: true, business: true },
  { label: "Fino a 5 pagine", basic: false, pro: true, business: true },
  { label: "Google Maps integrata", basic: false, pro: true, business: true },
  { label: "Pulsante WhatsApp", basic: false, pro: true, business: true },
  { label: "SEO avanzata", basic: false, pro: true, business: true },
  { label: "Ottimizzazione velocità sito", basic: false, pro: true, business: true },
  { label: "Animazioni moderne", basic: false, pro: true, business: true },
  { label: "Sezione FAQ", basic: false, pro: true, business: true },
  { label: "Form avanzati", basic: false, pro: true, business: true },
  { label: "Blog integrato", basic: false, pro: false, business: true },
  { label: "Gestione articoli del blog", basic: false, pro: false, business: true },
  { label: "Google Analytics", basic: false, pro: false, business: true },
  { label: "Multilingua", basic: false, pro: false, business: true },
  { label: "Ottimizzazione SEO del blog", basic: false, pro: false, business: true },
];

export const chatbotPlans: ChatbotPlan[] = [
  {
    id: "standard",
    icon: MessagesSquare,
    name: "Standard",
    audience: "Professionisti e studi",
    monthlyPrice: 39,
    features: [
      "Modelli AI avanzati",
      "500 crediti messaggio/mese",
      "5 AI Actions per agente",
      "Integrazioni e analytics di base",
    ],
  },
  {
    id: "premium",
    icon: Bot,
    name: "Premium",
    audience: "Aziende con alto volume contatti",
    monthlyPrice: 149,
    highlighted: true,
    features: [
      "Tutto lo Standard, e di più",
      "4.000 crediti messaggio/mese",
      "Voce, telefonia e campagne outbound",
      "API, personalizzazione e integrazioni avanzate",
    ],
  },
];

export const chatbotPlanFeatures: ChatbotPlanFeature[] = [
  { label: "Accesso a modelli AI avanzati", standard: true, premium: true },
  { label: "Crediti messaggio al mese", standard: "500", premium: "4.000" },
  { label: "AI Actions attive per agente", standard: "5", premium: "8" },
  { label: "Spazio per agente AI", standard: "10 MB", premium: "20 MB" },
  { label: "Membri del team", standard: "2", premium: "3" },
  { label: "Integrazioni", standard: true, premium: true },
  { label: "Analytics di base", standard: true, premium: true },
  { label: "Allegati in chat", standard: true, premium: true },
  { label: "Help desk", standard: false, premium: true },
  { label: "Voce", standard: false, premium: true },
  { label: "Telefonia", standard: false, premium: true },
  { label: "Campagne outbound", standard: false, premium: true },
  { label: "Accesso API", standard: false, premium: true },
  { label: "Personalizzazione avanzata", standard: false, premium: true },
  { label: "Riaddestramento automatico agenti", standard: false, premium: true },
  {
    label: "Integrazioni avanzate (Stripe, Zendesk e altri)",
    standard: false,
    premium: true,
  },
];

export const CHATBOT_SETUP_PRICE = 300;

export const chatbotColumnIcons = {
  standard: MessagesSquare,
  premium: Bot,
} as const;

export const planColumnIcons = {
  basic: Sprout,
  pro: Rocket,
  business: Crown,
} as const;

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
