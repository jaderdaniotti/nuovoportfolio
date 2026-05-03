import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(siteConfig.url);
}
