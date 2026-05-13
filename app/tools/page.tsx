import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tools SEO per creazione siti web a livello locale",
  description:
    "Indice completo dei tools del sito per creazione siti web a livello locale: convertitori, analizzatori SEO, checker tecnici e utility operative.",
  keywords: [
    "Creazione siti web a",
    "tools creazione siti web",
    "tools SEO locale",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
  openGraph: {
    title: "Tools SEO per creazione siti web a livello locale",
    description:
      "Scopri i tools disponibili per creazione siti web a livello locale: analizzatori SEO, converter immagini/documenti e utility operative.",
    url: `${siteConfig.url}/tools`,
  },
};

export default function ToolsPage() {
  return <ToolsIndex />;
}
