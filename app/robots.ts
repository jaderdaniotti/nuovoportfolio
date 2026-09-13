import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/grazie", "/offline"],
    },
    host: "https://jaderweb.com",
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
