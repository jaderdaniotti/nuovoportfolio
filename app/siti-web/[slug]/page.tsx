import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { LocalLandingContent } from "@/components/sections/local-landing-content";
import { localLandingJsonLd } from "@/lib/local-landing-json-ld";
import {
  getLocalLanding,
  getRoutedLocalLandings,
} from "@/lib/local-landings";
import { pageSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRoutedLocalLandings().map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalLanding(slug);
  if (!page || page.path === "/udine") {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.description,
    keywords: page.keywords,
    ...pageSeo(page.path, {
      title: page.seoTitle,
      description: page.description,
    }),
  };
}

export default async function LocalLandingRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLocalLanding(slug);
  if (!page || page.path === "/udine") {
    notFound();
  }

  return (
    <InnerPageShell>
      <JsonLd data={localLandingJsonLd(page)} />
      <LocalLandingContent page={page} />
    </InnerPageShell>
  );
}
