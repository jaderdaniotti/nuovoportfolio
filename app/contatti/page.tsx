import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { ContactPageContent } from "@/components/sections/contact-page-content";
import { entityGraphNodes, ORGANIZATION_ID, PERSON_ID } from "@/lib/json-ld";
import { absoluteUrl, OG_SITE_NAME, SITE_URL, pageSeo } from "@/lib/seo";

const title = "Contatti e preventivo sito web | Udine — jaderweb";
const description =
  "Scrivimi o WhatsApp: preventivo chiaro per sito, landing o digitalizzazione. Rispondo io, Jader Daniotti — Udine e tutta Italia.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/contatti", { title, description }),
};

function contattiJsonLd() {
  const url = absoluteUrl("/contatti");
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@type": "WebSite", name: OG_SITE_NAME, url: SITE_URL },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contatti", item: url },
        ],
      },
    ],
  };
}

export default function ContattiPage() {
  return (
    <InnerPageShell>
      <JsonLd data={contattiJsonLd()} />
      <ContactPageContent />
    </InnerPageShell>
  );
}
