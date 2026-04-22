import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  const blogPosts = BLOG_ARTICLES;

  const posts = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    ...posts,
  ];
}
