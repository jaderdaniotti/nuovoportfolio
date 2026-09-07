import type { Metadata } from "next";
import { BlogArticlePage, getArticleMetadata } from "@/components/blog-article-page";
import { noindexRobots } from "@/lib/seo-robots";

const slug = "siti-web-veloci-piu-clienti-per-negozi-gemona-friuli";

export const metadata: Metadata = {
  ...getArticleMetadata(slug),
  robots: noindexRobots,
};

export default function Page() {
  return <BlogArticlePage slug={slug} />;
}
