import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";
import { noindexRobots } from "@/lib/seo-robots";

const slug = "come-creare-ecommerce-nextjs-gemona-del-friuli-guida-2026";

export const metadata: Metadata = {
  ...getArticleMetadata(slug),
  robots: noindexRobots,
};

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
