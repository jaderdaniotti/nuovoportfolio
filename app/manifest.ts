import type { MetadataRoute } from "next";
import { BRAND_INK, OG_SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "jaderweb — freelance web Udine",
    short_name: OG_SITE_NAME,
    description:
      "Freelance web a Udine: siti internet, e-commerce, brand, SEO locale e contenuti per PMI e professionisti.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "it",
    dir: "ltr",
    id: "/",
    background_color: BRAND_INK,
    theme_color: BRAND_INK,
    categories: ["business", "productivity"],
    icons: [
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
      {
        src: "/icons/icon-192-maskable.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-maskable.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
