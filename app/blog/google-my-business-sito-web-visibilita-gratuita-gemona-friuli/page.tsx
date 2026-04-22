import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";

const slug = "google-my-business-sito-web-visibilita-gratuita-gemona-friuli";

export const metadata: Metadata = getArticleMetadata(slug);

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
