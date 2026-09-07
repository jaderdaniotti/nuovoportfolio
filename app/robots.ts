import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getComuniSitemapChunkCount } from "@/lib/sitemap-entries";

export default function robots(): MetadataRoute.Robots {
  const comuniSitemaps = Array.from(
    { length: getComuniSitemapChunkCount() },
    (_, id) => absoluteUrl(`/comuni/sitemap/${id}.xml`),
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/grazie", "/offline"],
    },
    host: "https://jaderweb.com",
    sitemap: [
      absoluteUrl("/sitemap-index.xml"),
      absoluteUrl("/sitemap.xml"),
      ...comuniSitemaps,
    ],
  };
}
