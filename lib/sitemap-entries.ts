import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl } from "@/lib/seo";
import { getIndexableComuniItalia } from "@/lib/comuni";
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

function comuneEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const comune of getIndexableComuniItalia()) {
    const slug = comune.slug;
    entries.push({ path: comuneBasePath(slug), changeFrequency: "monthly", priority: 0.7 });
    entries.push({ path: comuneServiziPath(slug), changeFrequency: "monthly", priority: 0.65 });
    for (const service of servicePages) {
      entries.push({
        path: comuneServicePath(slug, service.slug),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    entries.push({ path: comuneProcessoPath(slug), changeFrequency: "monthly", priority: 0.5 });
    entries.push({ path: comunePercheNoiPath(slug), changeFrequency: "monthly", priority: 0.5 });
    entries.push({ path: comuneContattiPath(slug), changeFrequency: "monthly", priority: 0.65 });
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
  const now = new Date();
  const start = chunkId * SITEMAP_CHUNK_SIZE;
  const slice = getComuniSitemapEntries().slice(start, start + SITEMAP_CHUNK_SIZE);

  return slice.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
