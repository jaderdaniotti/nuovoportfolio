import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";

const slug = "app-router-nextjs-15-tutorial-developer-italiani";

export const metadata: Metadata = getArticleMetadata(slug);

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
