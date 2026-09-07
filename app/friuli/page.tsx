import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { PillarPageContent } from "@/components/sections/pillar-page-content";
import { pillarPageJsonLd } from "@/lib/json-ld";
import { getPillarPage } from "@/lib/pillar-pages";
import { pageSeo } from "@/lib/seo";

const page = getPillarPage("friuli")!;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  ...pageSeo(page.path, { title: page.seoTitle, description: page.description }),
};

export default function FriuliPillarPage() {
  return (
    <InnerPageShell>
      <JsonLd data={pillarPageJsonLd(page)} />
      <PillarPageContent page={page} />
    </InnerPageShell>
  );
}
