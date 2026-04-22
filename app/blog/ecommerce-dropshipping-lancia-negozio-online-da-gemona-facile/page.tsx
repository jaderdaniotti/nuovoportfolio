import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";

const slug = "ecommerce-dropshipping-lancia-negozio-online-da-gemona-facile";

export const metadata: Metadata = getArticleMetadata(slug);

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
