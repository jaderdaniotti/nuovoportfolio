import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ServiceDetailContent } from "@/components/sections/service-detail-content";
import { serviceJsonLd } from "@/lib/json-ld";
import { getServicePage, servicePages } from "@/lib/service-pages";
import { getServiceSeo } from "@/lib/service-seo";
import { pageSeo } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  const seo = getServiceSeo(slug);
  if (!page || !seo) {
    return { title: "Servizio — jaderweb" };
  }

  return {
    title: seo.title,
    description: seo.description,
    ...pageSeo(`/servizi/${page.slug}`, {
      title: seo.title,
      description: seo.description,
    }),
  };
}

export default async function ServicePageRoute({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <InnerPageShell>
      <JsonLd data={serviceJsonLd(page)} />
      <ServiceDetailContent page={page} />
    </InnerPageShell>
  );
}
