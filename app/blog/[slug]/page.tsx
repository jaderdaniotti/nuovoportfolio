import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllSlugs, getPostBySlug } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    description: post.description,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <SiteHeader />
      <article className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link
            href="/blog"
            className="text-sm font-semibold text-violet-700 hover:text-violet-900"
          >
            ← Torna al blog
          </Link>
          <header className="mt-8">
            <p className="text-sm text-zinc-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">·</span>
              {post.readingMinutes} min di lettura
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-zinc-600">{post.description}</p>
          </header>

          <div className="mt-10 space-y-6 text-[1.05rem] leading-relaxed text-zinc-700">
            {post.content.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <SiteFooter />
    </>
  );
}
