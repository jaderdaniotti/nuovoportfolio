import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { LocalLandingContent } from "@/components/sections/local-landing-content";
import { localLandingJsonLd } from "@/lib/local-landing-json-ld";
import { requireLocalLanding } from "@/lib/local-landings";
import { pageSeo } from "@/lib/seo";

const page = requireLocalLanding("udine");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  keywords: page.keywords,
  ...pageSeo(page.path, { title: page.seoTitle, description: page.description }),
};

export default function UdinePillarPage() {
  return (
    <InnerPageShell>
      <JsonLd data={localLandingJsonLd(page)} />
      <LocalLandingContent page={page} />
    </InnerPageShell>
  );
}
