import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";
import { noindexRobots } from "@/lib/seo-robots";

const slug = "sito-web-ecommerce-facile-vendi-online-da-milano-senza-complicazioni";

export const metadata: Metadata = {
  ...getArticleMetadata(slug),
  robots: noindexRobots,
};

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
