import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { getIndexableComuniItaliaSlugs } from "@/lib/comuni";
import { toolsCatalog } from "@/lib/tools-catalog";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getPostPriority(date: string) {
  const publishedAt = new Date(date).getTime();
  if (Number.isNaN(publishedAt)) return 0.6;
  const ageInDays = Math.max(0, (Date.now() - publishedAt) / DAY_IN_MS);

  if (ageInDays <= 14) return 0.9;
  if (ageInDays <= 60) return 0.8;
  if (ageInDays <= 180) return 0.7;

  return 0.6;
}

export function buildSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  const base = baseUrl.replace(/\/$/, "");
  const blogPosts = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestPostDate = blogPosts[0]?.date ? new Date(blogPosts[0].date) : new Date();
  const safeLatestPostDate = Number.isNaN(latestPostDate.getTime()) ? new Date() : latestPostDate;

  const posts = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: Number.isNaN(new Date(p.date).getTime()) ? new Date() : new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: getPostPriority(p.date),
  }));

  const comuniPages = getIndexableComuniItaliaSlugs().map((slug) => ({
    url: `${base}/comuni/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolsPages = toolsCatalog.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: safeLatestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: safeLatestPostDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/comuni`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/contatti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...posts,
    ...comuniPages,
    ...toolsPages,
  ];
}
