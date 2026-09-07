import type { MetadataRoute } from "next";
import { BRAND_INK, OG_SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: OG_SITE_NAME,
    short_name: OG_SITE_NAME,
    description:
      "Freelance web a Udine: siti internet, e-commerce, brand, SEO locale, social e contenuti per PMI, professionisti e hospitality.",
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "it",
    background_color: BRAND_INK,
    theme_color: BRAND_INK,
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
    ],
  };
}
