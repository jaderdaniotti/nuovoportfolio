import type { MetadataRoute } from "next";
import {
  buildComuniSitemapChunk,
  getComuniSitemapChunkCount,
} from "@/lib/sitemap-entries";

export async function generateSitemaps() {
  return Array.from({ length: getComuniSitemapChunkCount() }, (_, id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  return buildComuniSitemapChunk(Number.isFinite(id) ? id : 0);
}
