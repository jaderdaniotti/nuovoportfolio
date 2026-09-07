import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { WhyUsPageContent } from "@/components/sections/why-us-page-content";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneSlugParams,
} from "@/lib/comune-page";
import { comuneContattiPath } from "@/lib/comune-paths";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ComuneSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const comune = requireComune(slug);
  return comunePageMetadata(comune, "perche-noi");
}

export default async function ComunePercheNoiPage({
  params,
}: ComuneSlugParams) {
  const { slug } = await params;
  const comune = requireComune(slug);
  const seo = getLocalizedSeo(comune, "perche-noi");

  return (
    <InnerPageShell>
      <JsonLd data={comuneServiceJsonLd(comune, seo)} />
      <WhyUsPageContent
        locale={{
          eyebrow: seo.eyebrow,
          extra: seo.lead,
          contactHref: comuneContattiPath(comune.slug),
          ctaTitle: `Costruisco il sito giusto per ${comune.nome}.`,
          ctaBody: seo.cta,
        }}
      />
    </InnerPageShell>
  );
}
