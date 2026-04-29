import type { Metadata } from "next";
import { ComuniHubContent } from "@/components/comuni-hub-content";
import { comuniItalia } from "@/lib/comuni";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "In che comuni lavoro in Italia",
  description:
    "Scopri in quali comuni italiani lavoro: cerca per comune, provincia o regione e trova la pagina locale dedicata.",
  alternates: {
    canonical: `${siteConfig.url}/comuni`,
  },
  openGraph: {
    title: "In che comuni lavoro in Italia",
    description:
      "Scopri in quali comuni italiani lavoro: cerca per comune, provincia o regione e trova la pagina locale dedicata.",
    url: `${siteConfig.url}/comuni`,
  },
};

export default function ComuniHubPage() {
  return <ComuniHubContent comuni={comuniItalia} />;
}
