import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ComuneHomeShell } from "@/components/comune-home-shell";
import { getNearbyComuni, getPreRenderComuniItaliaSlugs } from "@/lib/comuni";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneSlugParams,
} from "@/lib/comune-page";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getPreRenderComuniItaliaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComuneSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const comune = requireComune(slug);
  return comunePageMetadata(comune, "home");
}

export default async function ComuneLandingPage({
  params,
}: ComuneSlugParams) {
  const { slug } = await params;
  const comune = requireComune(slug);
  const seo = getLocalizedSeo(comune, "home");
  const nearby = getNearbyComuni(comune);

  return (
    <>
      <JsonLd data={comuneServiceJsonLd(comune, seo)} />
      <ComuneHomeShell comune={comune} seo={seo} nearby={nearby} />
    </>
  );
}
