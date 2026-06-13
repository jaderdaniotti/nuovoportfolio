import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/pricing-page";
import { indexableRobots } from "@/lib/seo-robots";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tariffe siti web — Basic, Pro e Business",
  description:
    "Pacchetti siti web su misura: Basic da 999€, Pro da 1299€, Business da 1699€. Manutenzione annuale trasparente e chatbot AI opzionale con Codebase.",
  keywords: [
    "quanto costa un sito web",
    "prezzi siti web",
    "pacchetti siti web",
    "manutenzione sito web",
    "chatbot sito web",
    "creazione siti web Udine",
    ...siteConfig.keywords.slice(0, 4),
  ],
  openGraph: {
    title: `Tariffe siti web — ${siteConfig.name}`,
    description:
      "Confronta i pacchetti Basic, Pro e Business con prezzi di creazione, manutenzione e chatbot AI opzionale.",
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  robots: indexableRobots,
};

export default function PricingRoutePage() {
  return <PricingPage />;
}
