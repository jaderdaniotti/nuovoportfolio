import type { Metadata } from "next";
import { HomePageShell } from "@/components/home-page-shell";
import { JsonLd } from "@/components/json-ld";
import { homeSeo } from "@/lib/home-content";
import { siteRootJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";

const { title, description, keywords } = homeSeo;

export const metadata: Metadata = {
  title,
  description,
  keywords: [...keywords],
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
