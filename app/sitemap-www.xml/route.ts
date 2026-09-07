import { NextResponse } from "next/server";

/**
 * Dismesso: dopo redirect www→apex (S03) una sitemap su host www
 * creerebbe segnali canonici contraddittori.
 * 308 → sitemap apex ufficiale.
 */
export function GET() {
  return NextResponse.redirect("https://jaderweb.com/sitemap.xml", 308);
}
