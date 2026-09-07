import type { Metadata } from "next";

/**
 * Canonical production domain for jaderweb (apex).
 * Never use comodigitale hosts or *.vercel.app in metadata.
 */
export const SITE_URL = "https://jaderweb.com";

export const OG_SITE_NAME = "jaderweb";
export const OG_LOCALE = "it_IT";

export const BRAND_INK = "#0A0C00";
export const BRAND_CREAM = "#F6F5F3";
export const BRAND_ACCENT = "#E3FF04";

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("https://") || path.startsWith("http://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${normalized}`;
}

type PageSeoOptions = {
  title?: string;
  description?: string;
};

export function pageSeo(
  path: string = "/",
  options: PageSeoOptions = {},
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE,
      siteName: OG_SITE_NAME,
      url: absoluteUrl(path),
      ...(options.title ? { title: options.title } : {}),
      ...(options.description ? { description: options.description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(options.title ? { title: options.title } : {}),
      ...(options.description ? { description: options.description } : {}),
    },
  };
}
