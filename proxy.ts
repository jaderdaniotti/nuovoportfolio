import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Query che creano URL duplicate / non-canoniche → noindex,follow via header. */
const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "gbraid",
  "wbraid",
  "mc_cid",
  "mc_eid",
  "ref",
  "preview",
  "servizio",
];

function hasTrackingParams(url: URL) {
  return TRACKING_PARAM_KEYS.some((key) => url.searchParams.has(key));
}

function isAlwaysNoindexPath(pathname: string) {
  return pathname === "/grazie" || pathname === "/offline";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsNoindex =
    isAlwaysNoindexPath(pathname) || hasTrackingParams(request.nextUrl);

  if (!needsNoindex) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, follow");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|img/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt|xml|js|css|woff2?)$).*)",
  ],
};
