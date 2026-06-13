import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { indexableRobots } from "@/lib/seo-robots";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contatti — Richiedi un preventivo sito web",
  description:
    "Contattami per un preventivo personalizzato: siti web su misura, veloci e orientati alla conversione. Risposta entro 24 ore lavorative.",
  keywords: [
    "contatti web designer",
    "preventivo sito web",
    "consulenza sito web",
    "creazione siti web Udine",
    ...siteConfig.keywords.slice(0, 4),
  ],
  openGraph: {
    title: `Contatti — ${siteConfig.name}`,
    description:
      "Richiedi un preventivo per il tuo sito web: consulenza diretta, proposta chiara e tempi trasparenti.",
    url: `${siteConfig.url}/contatti`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/contatti`,
  },
  robots: indexableRobots,
};

export default function ContattiRoutePage() {
  return <ContactPage />;
}
