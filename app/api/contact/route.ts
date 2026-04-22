import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  message?: string;
  privacyAccepted?: boolean;
};

function cleanEmailAddress(value: string) {
  return value.replace(/^mailto:/i, "").trim();
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    const fullName = payload.fullName?.trim() ?? "";
    const businessName = payload.businessName?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";
    const privacyAccepted = Boolean(payload.privacyAccepted);

    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Compila tutti i campi obbligatori prima di inviare." },
        { status: 400 },
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Devi accettare l'informativa privacy per procedere." },
        { status: 400 },
      );
    }

    const smtpUser = process.env.SMTP_USER?.trim() || cleanEmailAddress(siteConfig.links.email);
    const smtpPass = requiredEnv("GOOGLE_APP_PASSWORD");
    const recipient = process.env.CONTACT_TO?.trim() || cleanEmailAddress(siteConfig.links.email);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: process.env.SMTP_SECURE?.trim() === "false" ? false : true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `Nuovo contatto dal sito - ${fullName}`,
      text: [
        `Nome e cognome: ${fullName}`,
        `Nome attivita: ${businessName || "Non indicato"}`,
        `Telefono: ${phone}`,
        `Email: ${email}`,
        "",
        "Messaggio:",
        message,
      ].join("\n"),
      html: `
        <h2>Nuova richiesta dal form contatti</h2>
        <p><strong>Nome e cognome:</strong> ${fullName}</p>
        <p><strong>Nome attivita:</strong> ${businessName || "Non indicato"}</p>
        <p><strong>Telefono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Privacy accettata:</strong> Si</p>
        <hr />
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore durante l'invio del messaggio.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
