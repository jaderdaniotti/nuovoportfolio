import { site } from "@/lib/home-content";
import { OG_SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import type { ServicePage } from "@/lib/service-pages";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: OG_SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/img/logo/logonerosubianco.svg"),
    email: site.email,
    telephone: site.phoneDisplay,
  };
}

export function breadcrumbListNode(page: ServicePage) {
  const serviceUrl = absoluteUrl(`/servizi/${page.slug}`);

  return {
    "@type": "BreadcrumbList",
    "@id": `${serviceUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servizi",
        item: absoluteUrl("/servizi"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name,
        item: serviceUrl,
      },
    ],
  };
}

export function serviceJsonLd(page: ServicePage) {
  const url = absoluteUrl(`/servizi/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        description: page.heroBody,
        url,
        provider: {
          "@id": ORGANIZATION_ID,
        },
      },
      breadcrumbListNode(page),
    ],
  };
}
