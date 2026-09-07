import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl } from "@/lib/seo";
import { getIndexableComuniItalia, type ComuneData } from "@/lib/comuni";
import { COMUNI_CONTENT_LASTMOD } from "@/lib/sitemap-dates";
import {
  comuneBasePath,
  comuneContattiPath,
  comunePercheNoiPath,
  comuneProcessoPath,
  comuneServicePath,
  comuneServiziPath,
} from "@/lib/comune-paths";

export const SITEMAP_CHUNK_SIZE = 45_000;

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

type ComuneSitemapTier = {
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  home: number;
  servizi: number;
  service: number;
  secondary: number;
  contatti: number;
};

/** Tier da popolazione: grandi città più prioritarie / refresh più frequenti. */
export function comuneSitemapTier(popolazione: number): ComuneSitemapTier {
  if (popolazione >= 100_000) {
    return {
      changeFrequency: "weekly",
      home: 0.85,
      servizi: 0.78,
      service: 0.72,
      secondary: 0.58,
      contatti: 0.7,
    };
  }
  if (popolazione >= 20_000) {
    return {
      changeFrequency: "monthly",
      home: 0.75,
      servizi: 0.68,
      service: 0.62,
      secondary: 0.52,
      contatti: 0.65,
    };
  }
  if (popolazione >= 5_000) {
    return {
      changeFrequency: "monthly",
      home: 0.65,
      servizi: 0.58,
      service: 0.55,
      secondary: 0.45,
      contatti: 0.55,
    };
  }
  return {
    changeFrequency: "yearly",
    home: 0.5,
    servizi: 0.45,
    service: 0.4,
    secondary: 0.35,
    contatti: 0.42,
  };
}

function pushComuneEntries(entries: SitemapEntry[], comune: ComuneData) {
  const slug = comune.slug;
  const tier = comuneSitemapTier(comune.popolazione);
  const freq = tier.changeFrequency;

  entries.push({
    path: comuneBasePath(slug),
    changeFrequency: freq,
    priority: tier.home,
  });
  entries.push({
    path: comuneServiziPath(slug),
    changeFrequency: freq,
    priority: tier.servizi,
  });
  for (const service of servicePages) {
    entries.push({
      path: comuneServicePath(slug, service.slug),
      changeFrequency: freq,
      priority: tier.service,
    });
  }
  entries.push({
    path: comuneProcessoPath(slug),
    changeFrequency: freq === "weekly" ? "monthly" : freq,
    priority: tier.secondary,
  });
  entries.push({
    path: comunePercheNoiPath(slug),
    changeFrequency: freq === "weekly" ? "monthly" : freq,
    priority: tier.secondary,
  });
  entries.push({
    path: comuneContattiPath(slug),
    changeFrequency: freq,
    priority: tier.contatti,
  });
}

function comuneEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const comune of getIndexableComuniItalia()) {
    pushComuneEntries(entries, comune);
  }
  return entries;
}

let cachedEntries: SitemapEntry[] | null = null;

export function getComuniSitemapEntries() {
  if (!cachedEntries) {
    cachedEntries = comuneEntries();
  }
  return cachedEntries;
}

export function getComuniSitemapChunkCount() {
  return Math.max(1, Math.ceil(getComuniSitemapEntries().length / SITEMAP_CHUNK_SIZE));
}

export function buildComuniSitemapChunk(chunkId: number): MetadataRoute.Sitemap {
  const lastModified = COMUNI_CONTENT_LASTMOD;
  const start = chunkId * SITEMAP_CHUNK_SIZE;
  const slice = getComuniSitemapEntries().slice(start, start + SITEMAP_CHUNK_SIZE);

  return slice.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
