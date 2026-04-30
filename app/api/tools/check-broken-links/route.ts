import { NextResponse } from "next/server";
import {
  BROKEN_LINK_MAX_URLS,
  validateUrlBatch,
} from "@/lib/broken-link-checker";
import { checkRemoteBrokenSingle } from "@/lib/broken-link-checker-remote";

export const runtime = "nodejs";
export const maxDuration = 120;

function sanitizeUrlList(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const t = item.trim();
    if (!t) continue;
    try {
      const href = new URL(t.startsWith("//") ? `https:${t}` : t).href.split("#")[0]!;
      if (/^https?:\/\//i.test(href) && !seen.has(href)) {
        seen.add(href);
        out.push(href);
      }
    } catch {
      // skip invalid
    }
  }
  return out;
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) break;
      results[i] = await fn(items[i]);
    }
  }

  const workers = Math.min(limit, Math.max(1, items.length));
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON non valido." }, { status: 400 });
  }

  const urls = sanitizeUrlList((body as { urls?: unknown }).urls);
  if (!urls) {
    return NextResponse.json({ error: 'Invia un array JSON "urls" con stringhe http/https.' }, { status: 400 });
  }

  const validationError = validateUrlBatch(urls);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (urls.length > BROKEN_LINK_MAX_URLS) {
    return NextResponse.json(
      { error: `Massimo ${BROKEN_LINK_MAX_URLS} URL consentiti.` },
      { status: 400 },
    );
  }

  try {
    const results = await mapLimit(urls, 5, (url) => checkRemoteBrokenSingle(url));
    return NextResponse.json({ results });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore durante la verifica.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
