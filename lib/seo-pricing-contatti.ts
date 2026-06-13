import type { Metadata } from "next";
import { buildFaqPageJsonLd } from "@/lib/faq-seo-generator";
import {
  CHATBOT_SETUP_PRICE,
  chatbotPlans,
  websitePlans,
} from "@/lib/pricing-content";
import { siteConfig } from "@/lib/site-config";

const pricingUrl = `${siteConfig.url}/pricing`;
const contattiUrl = `${siteConfig.url}/contatti`;

const pricingFaq = [
  {
    question: "Quanto costa un sito web con jaderweb?",
    answer:
      "I pacchetti partono da 999 € (Basic) + 290 €/anno di manutenzione. Pro: 1.299 € + 349 €/anno. Business: 1.699 € + 449 €/anno. E-commerce e progetti custom richiedono preventivo su misura.",
  },
  {
    question: "Quanto costa il chatbot AI sul sito?",
    answer: `Installazione una tantum ${CHATBOT_SETUP_PRICE} €, poi Standard 39 €/mese o Premium 149 €/mese. Si combina con qualsiasi pacchetto sito.`,
  },
  {
    question: "Quale pacchetto sito conviene per una PMI?",
    answer:
      "Per la maggior parte di PMI e professionisti il Pro è il più equilibrato: fino a 5 pagine, SEO avanzata, WhatsApp, Google Maps e sezione FAQ.",
  },
  {
    question: "La manutenzione annuale è obbligatoria?",
    answer:
      "Sì, ed è pianificata per mantenere sicurezza, performance e stabilità del sito nel tempo. Parte da 290 €/anno in base al pacchetto.",
  },
  {
    question: "I siti sono sviluppati con CMS o a codice?",
    answer:
      "Siti sviluppati a codice con Next.js: veloci, SEO-friendly e senza CMS pesante. Hosting e dominio configurati in ogni pacchetto.",
  },
] as const;

export const pricingPageMetadata: Metadata = {
  title: "Tariffe siti web — Basic, Pro e Business",
  description:
    "Pacchetti siti web su misura: Basic da 999 €, Pro da 1.299 €, Business da 1.699 €. Manutenzione annuale trasparente. Chatbot AI opzionale da 39 €/mese + 300 € installazione.",
  keywords: [
    "quanto costa un sito web",
    "prezzi siti web",
    "pacchetti siti web",
    "tariffe siti web",
    "manutenzione sito web",
    "chatbot AI sito web",
    "preventivo sito web",
    "creazione siti web Udine",
    "creazione siti web Milano",
    "sito web PMI",
    "sito web professionisti",
    "Next.js sito web",
    ...siteConfig.keywords.slice(0, 6),
  ],
  openGraph: {
    title: "Tariffe siti web — Basic, Pro e Business | jaderweb",
    description:
      "Confronta i pacchetti Basic, Pro e Business: prezzi di creazione, manutenzione annuale e chatbot AI Standard (39 €/mese) o Premium (149 €/mese).",
    url: pricingUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tariffe siti web — Basic, Pro e Business | jaderweb",
    description:
      "Pacchetti siti web su misura da 999 €. Manutenzione annuale e chatbot AI opzionale. Tariffe trasparenti per PMI e professionisti.",
  },
  alternates: {
    canonical: pricingUrl,
  },
};

export const contattiPageMetadata: Metadata = {
  title: "Contatti — Richiedi un preventivo sito web",
  description:
    "Contatta Jader Daniotti per un preventivo personalizzato: siti web su misura a Udine e in tutta Italia. Consulenza diretta, proposta chiara e risposta entro 24 ore lavorative.",
  keywords: [
    "contatti web designer",
    "preventivo sito web",
    "consulenza sito web",
    "web designer Udine",
    "creazione siti web Udine",
    "creazione siti web Milano",
    "freelance siti web",
    "richiedi preventivo sito",
    "Jader Daniotti",
    ...siteConfig.keywords.slice(0, 6),
  ],
  openGraph: {
    title: "Contatti — Richiedi preventivo sito web | jaderweb",
    description:
      "Richiedi un preventivo per il tuo sito web: consulenza diretta con Jader Daniotti, proposta su misura e risposta entro 24 ore.",
    url: contattiUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti — Richiedi preventivo sito web | jaderweb",
    description:
      "Preventivo personalizzato per siti web su misura. Risposta entro 24 ore. Udine e tutta Italia.",
  },
  alternates: {
    canonical: contattiUrl,
  },
};

function buildWebsiteOffers() {
  return websitePlans.map((plan) => ({
    "@type": "Offer",
    name: `Pacchetto ${plan.name}`,
    description: plan.tagline,
    price: String(plan.setupPrice),
    priceCurrency: "EUR",
    url: pricingUrl,
    eligibleRegion: {
      "@type": "Country",
      name: "IT",
    },
    seller: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Manutenzione annuale",
        value: `${plan.maintenancePrice} EUR`,
      },
    ],
  }));
}

function buildChatbotOffers() {
  return chatbotPlans.map((plan) => ({
    "@type": "Offer",
    name: `Chatbot ${plan.name}`,
    description: plan.features.join(". "),
    price: String(plan.monthlyPrice),
    priceCurrency: "EUR",
    url: pricingUrl,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.monthlyPrice),
      priceCurrency: "EUR",
      unitText: "MONTH",
    },
    seller: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
  }));
}

export function buildPricingPageJsonLd(): Record<string, unknown> {
  const faqLd = buildFaqPageJsonLd([...pricingFaq], pricingUrl);
  const { "@context": _context, ...faqGraphItem } = faqLd;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pricingUrl}#webpage`,
        url: pricingUrl,
        name: "Tariffe siti web — Basic, Pro e Business",
        description: pricingPageMetadata.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: {
          "@type": "Service",
          name: "Creazione siti web su misura",
          provider: {
            "@type": "Person",
            name: siteConfig.personName,
            url: siteConfig.url,
          },
          areaServed: "IT",
        },
        breadcrumb: {
          "@id": `${pricingUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pricingUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tariffe",
            item: pricingUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Pacchetti siti web jaderweb",
        itemListElement: websitePlans.map((plan, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: plan.name,
          description: plan.tagline,
        })),
      },
      ...buildWebsiteOffers(),
      {
        "@type": "Offer",
        name: "Installazione chatbot AI",
        description: "Configurazione e installazione chatbot sul sito",
        price: String(CHATBOT_SETUP_PRICE),
        priceCurrency: "EUR",
        url: pricingUrl,
      },
      ...buildChatbotOffers(),
      faqGraphItem,
    ],
  };
}

export function buildContattiPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${contattiUrl}#webpage`,
        url: contattiUrl,
        name: "Contatti — Richiedi un preventivo sito web",
        description: contattiPageMetadata.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        breadcrumb: {
          "@id": `${contattiUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${contattiUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contatti",
            item: contattiUrl,
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${contattiUrl}#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.links.email.replace("mailto:", ""),
        telephone: "+393513152008",
        areaServed: {
          "@type": "Country",
          name: "IT",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udine",
          addressRegion: "Friuli-Venezia Giulia",
          addressCountry: "IT",
        },
        founder: {
          "@type": "Person",
          name: siteConfig.personName,
        },
        vatID: siteConfig.vatNumber,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.links.email.replace("mailto:", ""),
          telephone: "+393513152008",
          availableLanguage: ["Italian"],
          areaServed: "IT",
        },
      },
    ],
  };
}
