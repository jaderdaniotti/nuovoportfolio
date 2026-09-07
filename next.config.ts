import type { NextConfig } from "next";
import { LEGACY_BLOG_REDIRECTS } from "./lib/legacy-blog-redirects";
import { LEGACY_PATH_REDIRECTS } from "./lib/legacy-path-redirects";

/**
 * Apex canonico: https://jaderweb.com
 * www → apex (308 permanent via `permanent: true`)
 * Security headers globali; cache lunga solo su asset statici versionati per path.
 */
const nextConfig: NextConfig = {
  // Canonico senza trailing slash (/servizi, non /servizi/).
  // Next reindirizza automaticamente le URL con slash finale.
  trailingSlash: false,

  async redirects() {
    return [
      ...LEGACY_PATH_REDIRECTS.map((rule) => ({
        source: rule.source,
        destination: rule.destination,
        permanent: true,
      })),
      ...LEGACY_BLOG_REDIRECTS.map((rule) => ({
        source: rule.source,
        destination: rule.destination,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jaderweb.com" }],
        destination: "https://jaderweb.com/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/grazie",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/offline",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
