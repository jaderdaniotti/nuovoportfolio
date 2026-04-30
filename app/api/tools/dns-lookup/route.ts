import { NextResponse } from "next/server";
import { assertDnsProbeHostnameAllowed } from "@/lib/broken-link-checker-remote";
import {
  normalizeDnsHostname,
  parseDnsTypesFromBody,
  type DnsLookupApiResponse,
  type DnsLookupOk,
} from "@/lib/dns-record-checker";
import { resolveDnsRecords } from "@/lib/dns-record-checker-resolve";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON non valido." } satisfies DnsLookupApiResponse, {
      status: 400,
    });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Body deve essere un oggetto JSON." } satisfies DnsLookupApiResponse, {
      status: 400,
    });
  }

  const hostRaw = (body as Record<string, unknown>).hostname;
  if (typeof hostRaw !== "string" || !hostRaw.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Campo "hostname" obbligatorio (dominio o URL https).' } satisfies DnsLookupApiResponse,
      { status: 400 },
    );
  }

  const hostname = normalizeDnsHostname(hostRaw);
  if (!hostname) {
    return NextResponse.json({ ok: false, error: "Dominio o URL non valido." } satisfies DnsLookupApiResponse, {
      status: 400,
    });
  }

  try {
    assertDnsProbeHostnameAllowed(hostname);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Host non consentito.";
    return NextResponse.json({ ok: false, error: msg } satisfies DnsLookupApiResponse, { status: 400 });
  }

  const typesParsed = parseDnsTypesFromBody((body as Record<string, unknown>).types);
  if (!Array.isArray(typesParsed)) {
    return NextResponse.json({ ok: false, error: typesParsed.error } satisfies DnsLookupApiResponse, { status: 400 });
  }
  const types = typesParsed;

  try {
    const { sections, ms } = await resolveDnsRecords(hostname, types);
    const payload: DnsLookupOk = {
      ok: true,
      hostname,
      ms,
      sections,
    };
    return NextResponse.json(payload satisfies DnsLookupApiResponse);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Lookup DNS fallito.";
    return NextResponse.json({ ok: false, error: msg } satisfies DnsLookupApiResponse, { status: 500 });
  }
}
