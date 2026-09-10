import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { LocalLandingsHubContent } from "@/components/sections/local-landings-hub-content";
import { localLandingsHubJsonLd } from "@/lib/local-landing-json-ld";
import {
  LOCAL_LANDINGS_HUB_PATH,
  LOCAL_LANDINGS_HUB_SEO,
  getLocalLandingPages,
} from "@/lib/local-landings";
import { pageSeo } from "@/lib/seo";

const title = LOCAL_LANDINGS_HUB_SEO.title;
const description = LOCAL_LANDINGS_HUB_SEO.description;

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo(LOCAL_LANDINGS_HUB_PATH, { title, description }),
};

export default function SitiWebHubPage() {
  return (
    <InnerPageShell>
      <JsonLd data={localLandingsHubJsonLd(getLocalLandingPages())} />
      <LocalLandingsHubContent />
    </InnerPageShell>
  );
}
