import { NextResponse } from "next/server";
import {
  buildConfirmationEmail,
  buildContactEmail,
  createMailTransport,
  type ContactPayload,
} from "@/lib/mail";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  const mode = data.mode === "quick" || data.mode === "detailed" ? data.mode : null;
  const clientType =
    data.clientType === "privato" || data.clientType === "azienda"
      ? data.clientType
      : null;
  const email = asString(data.email);
  const phone = asString(data.phone);
  const services = asStringArray(data.services);
  const privacy = data.privacy === true;

  if (!mode || !clientType || !email || !phone || !privacy || services.length === 0) {
    return null;
  }

  if (clientType === "azienda" && !asString(data.companyName)) {
    return null;
  }

  if (clientType === "privato" && !asString(data.fullName)) {
    return null;
  }

  return {
    mode,
    clientType,
    fullName: asString(data.fullName),
    companyName: asString(data.companyName),
    contactPerson: asString(data.contactPerson),
    vat: asString(data.vat),
    services,
    budget: asString(data.budget),
    message: asString(data.message),
    website: asString(data.website),
    email,
    phone,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json(
        { ok: false, error: "Dati incompleti o non validi." },
        { status: 400 },
      );
    }

    const transport = createMailTransport();
    await transport.sendMail(buildContactEmail(payload));
    await transport.sendMail(buildConfirmationEmail(payload));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito. Riprova tra poco." },
      { status: 500 },
    );
  }
}
