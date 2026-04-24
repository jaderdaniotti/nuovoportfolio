import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { siteConfig } from "@/lib/site-config";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
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
    ...posts,
  ];
}
