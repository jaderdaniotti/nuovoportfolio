import { NextResponse } from "next/server";
import { fetchFeedXmlFromRemote } from "@/lib/rss-feed-fetch-remote";
import { validateFeedMarkup } from "@/lib/rss-feed-validator";

export const runtime = "nodejs";
export const maxDuration = 60;

function sanitizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  if (!t) return null;
  try {
    return new URL(t.startsWith("//") ? `https:${t}` : t).href.split("#")[0]!;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON non valido." }, { status: 400 });
  }

  const href = sanitizeUrl((body as { url?: unknown }).url);
  if (!href || (!href.startsWith("http://") && !href.startsWith("https://"))) {
    return NextResponse.json({ error: "Specifica un URL http o https valido nel campo url." }, { status: 400 });
  }

  try {
    const fetched = await fetchFeedXmlFromRemote(href);
    const validated = validateFeedMarkup(fetched.xml);
    return NextResponse.json({
      validation: validated,
      finalUrl: fetched.finalUrl,
      contentType: fetched.contentType,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore durante il recupero del feed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
