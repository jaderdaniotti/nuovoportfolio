import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComuneBySlug, toSeoInput, type ComuneData } from "@/lib/comuni";
import {
  buildComunePageSeo,
  type ComunePageKind,
  type ComunePageSeo,
} from "@/lib/comuni-seo";
import { pageSeo } from "@/lib/seo";
import { indexableRobots, noindexRobots } from "@/lib/seo-robots";

export type ComuneSlugParams = {
  params: Promise<{ slug: string }>;
};

export type ComuneServiceParams = {
  params: Promise<{ slug: string; service: string }>;
};

export function requireComune(slug: string): ComuneData {
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();
  return comune;
}

export function getLocalizedSeo(
  comune: ComuneData,
  kind: ComunePageKind,
  serviceSlug?: string,
): ComunePageSeo {
  return buildComunePageSeo(toSeoInput(comune), kind, serviceSlug);
}

export function comunePageMetadata(
  comune: ComuneData,
  kind: ComunePageKind,
  serviceSlug?: string,
): Metadata {
  const seo = getLocalizedSeo(comune, kind, serviceSlug);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: comune.indexable ? indexableRobots : noindexRobots,
    ...pageSeo(seo.canonical, {
      title: seo.title,
      description: seo.description,
    }),
  };
}
