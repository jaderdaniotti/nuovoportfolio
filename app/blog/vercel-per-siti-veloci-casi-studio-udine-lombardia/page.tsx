import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";

const slug = "vercel-per-siti-veloci-casi-studio-udine-lombardia";

export const metadata: Metadata = getArticleMetadata(slug);

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
