import type { Metadata } from "next";
import { ComuniHubContent } from "@/components/comuni-hub-content";
import { comuniItalia } from "@/lib/comuni";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Creazione siti web a: comuni serviti in Italia",
  description:
    "Creazione siti web a livello locale: esplora i comuni italiani serviti, cerca per provincia o regione e trova la pagina dedicata alla tua area.",
  keywords: [
    "Creazione siti web a",
    "creazione siti web a comuni italiani",
    "creazione siti web locale",
  ],
  alternates: {
    canonical: `${siteConfig.url}/comuni`,
  },
  openGraph: {
    title: "Creazione siti web a: comuni serviti in Italia",
    description:
      "Creazione siti web a livello locale: esplora i comuni italiani serviti, cerca per provincia o regione e trova la pagina dedicata alla tua area.",
    url: `${siteConfig.url}/comuni`,
  },
};

export default function ComuniHubPage() {
  return <ComuniHubContent comuni={comuniItalia} />;
}
