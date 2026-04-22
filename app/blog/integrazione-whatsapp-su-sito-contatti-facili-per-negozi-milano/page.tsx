import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";

const slug = "integrazione-whatsapp-su-sito-contatti-facili-per-negozi-milano";

export const metadata: Metadata = getArticleMetadata(slug);

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
