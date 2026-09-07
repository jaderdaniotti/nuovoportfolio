import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceBlogArticle } from "@/components/blog/service-blog-article";
import { getServicePostBySlug, getAllServicePostSlugs } from "@/lib/blog/posts";
import { pageSeo } from "@/lib/seo";
import { indexableRobots } from "@/lib/seo-robots";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServicePostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicePost = getServicePostBySlug(slug);
  if (!servicePost) {
    return { title: "Articolo non trovato" };
  }
  const title = `${servicePost.title} — jaderweb`;
  return {
    title,
    description: servicePost.description,
    keywords: servicePost.keywords,
    robots: indexableRobots,
    ...pageSeo(`/blog/${slug}`, {
      title: servicePost.title,
      description: servicePost.description,
    }),
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const servicePost = getServicePostBySlug(slug);
  if (!servicePost) {
    notFound();
  }
  return <ServiceBlogArticle post={servicePost} />;
}
