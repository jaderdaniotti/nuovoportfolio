/**
 * Smoke post-deploy: sample URL → 200 + canonical apex + JSON-LD.
 *
 *   npm run seo:smoke
 *   BASE_URL=https://jaderweb.com npm run seo:smoke
 */

import { SITE_URL } from "../lib/seo";

const base = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const SAMPLE_PATHS = [
  "/",
  "/servizi",
  "/servizi/ristoranti",
  "/blog",
  "/blog/sito-matrimonio-vs-instagram-whatsapp",
  "/contatti",
  "/udine",
  "/siti-web",
  "/siti-web/gemona-del-friuli",
  "/siti-web/buja",
  "/comuni",
  "/comuni/udine-ud",
  "/comuni/gemona-del-friuli-ud",
  "/robots.txt",
  "/sitemap.xml",
];

type CheckResult = {
  path: string;
  ok: boolean;
  status: number;
  canonicalOk: boolean;
  jsonLdOk: boolean;
  detail: string;
};

async function checkPath(path: string): Promise<CheckResult> {
  const url = `${base}${path}`;
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "jaderweb-seo-smoke/1.0" },
    });
    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const isXmlOrText =
      path.endsWith(".xml") || path.endsWith(".txt") || path.endsWith(".js");

    if (!response.ok) {
      return {
        path,
        ok: false,
        status,
        canonicalOk: false,
        jsonLdOk: false,
        detail: `HTTP ${status}`,
      };
    }

    if (isXmlOrText) {
      const body = await response.text();
      const hasContent = body.length > 20;
      return {
        path,
        ok: hasContent,
        status,
        canonicalOk: true,
        jsonLdOk: true,
        detail: hasContent ? "ok body" : "empty body",
      };
    }

    const html = await response.text();
    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    ) || html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
    );
    const canonical = canonicalMatch?.[1] ?? "";
    const canonicalOk =
      canonical.startsWith(SITE_URL) ||
      // local smoke: allow localhost canonical only if BASE is local
      (base.includes("localhost") && canonical.length > 0);

    const jsonLdOk =
      path === "/comuni" || path.startsWith("/comuni/")
        ? html.includes("application/ld+json") || html.includes("@context")
        : html.includes("application/ld+json");

    // Home/core should have ld+json; robots/sitemap skipped above
    const needsJsonLd = ![
      "/robots.txt",
      "/sitemap.xml",
    ].includes(path);

    const ok = status === 200 && (!needsJsonLd || jsonLdOk) && (path === "/robots.txt" || canonicalOk || path.endsWith(".xml"));

    return {
      path,
      ok: status === 200 && (isXmlOrText || (canonicalOk && (!needsJsonLd || jsonLdOk))),
      status,
      canonicalOk,
      jsonLdOk: needsJsonLd ? jsonLdOk : true,
      detail: `canonical=${canonical || "∅"} jsonld=${jsonLdOk}`,
    };
  } catch (error) {
    return {
      path,
      ok: false,
      status: 0,
      canonicalOk: false,
      jsonLdOk: false,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  console.log(`Smoke base: ${base}`);
  const results = [];
  for (const path of SAMPLE_PATHS) {
    const result = await checkPath(path);
    results.push(result);
    const mark = result.ok ? "OK" : "FAIL";
    console.log(`[${mark}] ${path} ${result.status} ${result.detail}`);
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} ok`);
  if (failed.length) process.exit(1);
}

main();
