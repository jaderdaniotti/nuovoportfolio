import type { Metadata } from "next";
import { HomePageShell } from "@/components/home-page-shell";
import { JsonLd } from "@/components/json-ld";
import { siteRootJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";

const title = "Siti web a Udine | Freelance Next.js — jaderweb";
const description =
  "Creo siti web, landing e digitalizzazione per PMI e professionisti a Udine e in Italia. Referente unico, veloci da caricare, pensati per convertire.";

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
