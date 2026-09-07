import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ComuniHubContent } from "@/components/comuni-hub-content";
import { InnerPageShell } from "@/components/inner-page-shell";
import {
  getComuneListItems,
  getComuniProvince,
  getComuniRegioni,
  getFeaturedComuni,
  getFeaturedComuniByRegione,
  getIndexableComuniItalia,
  toComuneListItem,
} from "@/lib/comuni";
import { comuniHubJsonLd } from "@/lib/comune-json-ld";
import { HUB_SEO } from "@/lib/comuni-seo";
import { pageSeo } from "@/lib/seo";
import { indexableRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  title: HUB_SEO.title,
  description: HUB_SEO.description,
  keywords: [...HUB_SEO.keywords],
  robots: indexableRobots,
  ...pageSeo(HUB_SEO.canonical, {
    title: HUB_SEO.title,
    description: HUB_SEO.description,
  }),
};

const FVG_REGIONE = "Friuli-Venezia Giulia";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default async function ComuniHubPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const regione = typeof params.regione === "string" ? params.regione : "";
  const provincia = typeof params.provincia === "string" ? params.provincia : "";

  const featured = getFeaturedComuni(10);
  const topCities = featured.map(toComuneListItem);
  const fvgCities = getFeaturedComuniByRegione(FVG_REGIONE, 8).map(
    toComuneListItem,
  );
  const totalIndexable = getIndexableComuniItalia().length;
  const hasFilters = Boolean(query || regione || provincia);
  const needle = normalize(query);

  const filtered = hasFilters
    ? getComuneListItems().filter((comune) => {
        if (regione && comune.regione !== regione) return false;
        if (provincia && comune.provincia !== provincia) return false;
        if (!needle) return true;
        return (
          normalize(comune.nome).includes(needle) ||
          normalize(comune.sigla).includes(needle) ||
          normalize(comune.provincia).includes(needle) ||
          normalize(comune.regione).includes(needle)
        );
      })
    : [];

  return (
    <InnerPageShell>
      <JsonLd data={comuniHubJsonLd(featured)} />
      <ComuniHubContent
        query={query}
        regione={regione}
        provincia={provincia}
        regioni={getComuniRegioni()}
        province={getComuniProvince(regione || undefined)}
        topCities={topCities}
        fvgCities={fvgCities}
        results={filtered}
        totalIndexable={totalIndexable}
      />
    </InnerPageShell>
  );
}
