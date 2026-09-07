import type { Metadata } from "next";
import { HomePageShell } from "@/components/home-page-shell";
import { JsonLd } from "@/components/json-ld";
import { siteRootJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";

const title = "jaderweb — Creazione siti web a Udine";
const description =
  "Freelance web a Udine: siti internet, e-commerce, brand, SEO locale, social e contenuti per PMI, professionisti e hospitality.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/", { title, description }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={siteRootJsonLd()} />
      <HomePageShell />
    </>
  );
}
