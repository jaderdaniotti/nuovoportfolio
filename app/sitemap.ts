import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl } from "@/lib/seo";
import { COMUNI_HUB_PATH } from "@/lib/comune-paths";
import { toolsCatalog } from "@/lib/tools-catalog";
import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { getBlogPostDates } from "@/lib/blog/types";
import { getRoutedLocalLandings } from "@/lib/local-landings";
import { CORE_CONTENT_LASTMOD, parsePostDate } from "@/lib/sitemap-dates";

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
  { path: "/udine", changeFrequency: "monthly", priority: 0.9 },
  { path: "/friuli", changeFrequency: "monthly", priority: 0.85 },
  { path: "/costo-sito-web", changeFrequency: "monthly", priority: 0.85 },
  { path: "/siti-web", changeFrequency: "weekly", priority: 0.9 },
  { path: COMUNI_HUB_PATH, changeFrequency: "weekly", priority: 0.85 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const coreLastmod = CORE_CONTENT_LASTMOD;

  const core: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: coreLastmod,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const services: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: absoluteUrl(`/servizi/${page.slug}`),
    lastModified: coreLastmod,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tools: MetadataRoute.Sitemap = toolsCatalog.map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: coreLastmod,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const blog: MetadataRoute.Sitemap = SERVICE_BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: parsePostDate(getBlogPostDates(post).dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const landings: MetadataRoute.Sitemap = getRoutedLocalLandings().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: coreLastmod,
    changeFrequency: "weekly",
    priority: page.priority === 1 ? 0.92 : page.priority === 2 ? 0.88 : 0.86,
  }));

  return [...core, ...landings, ...services, ...tools, ...blog];
}
