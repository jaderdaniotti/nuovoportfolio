import type { LocalLandingPage } from "@/lib/local-landings-types";
import {
  entityGraphNodes,
  PERSON_ID,
  PROFESSIONAL_SERVICE_ID,
} from "@/lib/json-ld";
import { LOCAL_LANDINGS_HUB_PATH } from "@/lib/local-landings";
import { absoluteUrl, OG_SITE_NAME, SITE_URL } from "@/lib/seo";

function cityArea(page: LocalLandingPage) {
  return {
    "@type": "City",
    name: page.name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${page.province}, ${page.region}`,
    },
  };
}

function breadcrumbList(page: LocalLandingPage) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Siti web Alto Friuli", path: LOCAL_LANDINGS_HUB_PATH },
    { name: page.name, path: page.path },
  ];

  if (page.path === "/udine") {
    items.splice(1, 1);
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function localLandingJsonLd(page: LocalLandingPage) {
  const url = absoluteUrl(page.path);
  const graph: object[] = [
    ...entityGraphNodes(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.seoTitle,
      headline: page.h1,
      description: page.description,
      inLanguage: "it-IT",
      isPartOf: {
        "@type": "WebSite",
        name: OG_SITE_NAME,
        url: SITE_URL,
      },
      about: { "@id": PROFESSIONAL_SERVICE_ID },
      primaryImageOfPage: absoluteUrl("/img/logo/logonerosubianco.svg"),
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.h1,
      serviceType: page.primaryKeyword,
      description: page.description,
      url,
      areaServed: [
        cityArea(page),
        { "@type": "AdministrativeArea", name: "Friuli-Venezia Giulia" },
      ],
      provider: { "@id": PERSON_ID },
    },
    breadcrumbList(page),
  ];

  if (page.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function localLandingsHubJsonLd(pages: LocalLandingPage[]) {
  const url = absoluteUrl(LOCAL_LANDINGS_HUB_PATH);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Siti web in Alto Friuli",
        description:
          "Landing locali per Gemona del Friuli, comuni vicini, Tolmezzo e Udine.",
        isPartOf: {
          "@type": "WebSite",
          name: OG_SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        name: "Landing locali Alto Friuli",
        numberOfItems: pages.length,
        itemListElement: pages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.h1,
          url: absoluteUrl(page.path),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Siti web Alto Friuli",
            item: url,
          },
        ],
      },
    ],
  };
}
