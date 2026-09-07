import { organizationNode, ORGANIZATION_ID } from "@/lib/json-ld";
import { absoluteUrl, OG_SITE_NAME, SITE_URL } from "@/lib/seo";
import type { ComuneData } from "@/lib/comuni";
import type { ComunePageSeo } from "@/lib/comuni-seo";
import { COMUNI_HUB_PATH, comuneBasePath, comuneServiziPath } from "@/lib/comune-paths";
import type { ServicePage } from "@/lib/service-pages";

function areaServed(comune: ComuneData) {
  return {
    "@type": "AdministrativeArea",
    name: `${comune.nome}, ${comune.provincia}, ${comune.regione}`,
  };
}

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function comuneServiceJsonLd(
  comune: ComuneData,
  seo: ComunePageSeo,
  options?: { service?: ServicePage },
) {
  const url = absoluteUrl(seo.canonical);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Comuni", path: COMUNI_HUB_PATH },
    { name: comune.nome, path: comuneBasePath(comune.slug) },
  ];

  if (seo.canonical !== comuneBasePath(comune.slug)) {
    if (seo.canonical.startsWith(comuneServiziPath(comune.slug))) {
      crumbs.push({ name: "Servizi", path: comuneServiziPath(comune.slug) });
    }
    crumbs.push({ name: seo.h1, path: seo.canonical });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: options?.service?.name
          ? `${options.service.name} a ${comune.nome}`
          : comune.seo.serviceName,
        serviceType: options?.service
          ? `${options.service.name} a ${comune.nome}`
          : `Creazione siti web a ${comune.nome} e SEO locale`,
        description: seo.description,
        url,
        areaServed: areaServed(comune),
        provider: {
          "@id": ORGANIZATION_ID,
        },
        brand: {
          "@type": "Brand",
          name: OG_SITE_NAME,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@type": "WebSite",
          name: OG_SITE_NAME,
          url: SITE_URL,
        },
        about: areaServed(comune),
      },
      breadcrumb(crumbs),
    ],
  };
}

export function comuniHubJsonLd(featured: ComuneData[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(COMUNI_HUB_PATH)}#webpage`,
        url: absoluteUrl(COMUNI_HUB_PATH),
        name: "Comuni serviti in Italia",
        description:
          "Directory dei comuni italiani con pagine localizzate per la creazione di siti web.",
      },
      {
        "@type": "ItemList",
        name: "Le 10 città più popolate d’Italia",
        numberOfItems: featured.length,
        itemListElement: featured.map((comune, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `Siti web a ${comune.nome}`,
          url: absoluteUrl(comuneBasePath(comune.slug)),
        })),
      },
    ],
  };
}
