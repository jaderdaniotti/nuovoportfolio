import type { MetadataRoute } from "next";
import { COMUNI_SILO_ENABLED } from "@/lib/comune-paths";
import {
  buildComuniSitemapChunk,
  getComuniSitemapChunkCount,
} from "@/lib/sitemap-entries";

export async function generateSitemaps() {
  if (!COMUNI_SILO_ENABLED) return [];
  return Array.from({ length: getComuniSitemapChunkCount() }, (_, id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  return buildComuniSitemapChunk(Number.isFinite(id) ? id : 0);
}
