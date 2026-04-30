import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tools SEO e utility web",
  description:
    "Indice completo dei tools del sito: convertitori, analizzatori SEO, checker tecnici e utility per creator, freelance e aziende.",
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
  openGraph: {
    title: "Tools SEO e utility web",
    description:
      "Scopri i tools disponibili: analizzatori SEO, converter immagini/documenti e utility operative.",
    url: `${siteConfig.url}/tools`,
  },
};

export default function ToolsPage() {
  return <ToolsIndex />;
}
