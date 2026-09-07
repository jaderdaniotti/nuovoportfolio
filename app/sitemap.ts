import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl } from "@/lib/seo";
import { COMUNI_HUB_PATH } from "@/lib/comune-paths";
import { toolsCatalog } from "@/lib/tools-catalog";
import { getAllServicePostSlugs } from "@/lib/blog/posts";

const staticPages: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/servizi", changeFrequency: "weekly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/processo", changeFrequency: "monthly", priority: 0.7 },
  { path: "/perche-noi", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contatti", changeFrequency: "monthly", priority: 0.8 },
  { path: COMUNI_HUB_PATH, changeFrequency: "weekly", priority: 0.85 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const services: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: absoluteUrl(`/servizi/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tools: MetadataRoute.Sitemap = toolsCatalog.map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const blogSlugs = getAllServicePostSlugs();
  const blog: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...services, ...tools, ...blog];
}
