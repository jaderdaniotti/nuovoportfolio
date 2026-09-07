import nodemailer from "nodemailer";

export type ContactPayload = {
  mode: "quick" | "detailed";
  clientType: "privato" | "azienda";
  fullName: string;
  companyName: string;
  contactPerson: string;
  vat: string;
  services: string[];
  budget: string;
  message: string;
  website: string;
  email: string;
  phone: string;
};

const BRAND = {
  cream: "#F6F5F3",
  ink: "#0A0C00",
  accent: "#E3FF04",
  muted: "rgba(10,12,0,0.58)",
} as const;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function createMailTransport() {
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS").replace(/\s+/g, "");

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayName(payload: ContactPayload) {
  if (payload.clientType === "azienda") {
    return payload.companyName || payload.contactPerson || payload.email;
  }
  return payload.fullName || payload.email;
}

function greetingName(payload: ContactPayload) {
  if (payload.clientType === "azienda") {
    return payload.contactPerson || payload.companyName || "ciao";
  }
  const first = payload.fullName.trim().split(/\s+/)[0];
  return first || "ciao";
}

type DetailRow = { label: string; value: string };

function buildDetailRows(payload: ContactPayload): DetailRow[] {
  const rows: Array<DetailRow | null> = [
    {
      label: "Modalità",
      value: payload.mode === "quick" ? "Form rapido" : "Form dettagliato",
    },
    {
      label: "Tipo cliente",
      value: payload.clientType === "azienda" ? "Azienda" : "Privato",
    },
    payload.fullName ? { label: "Nome", value: payload.fullName } : null,
    payload.companyName ? { label: "Azienda", value: payload.companyName } : null,
    payload.contactPerson
      ? { label: "Referente", value: payload.contactPerson }
      : null,
    payload.vat ? { label: "P.IVA", value: payload.vat } : null,
    { label: "Email", value: payload.email },
    { label: "Telefono", value: payload.phone },
    payload.services.length
      ? { label: "Servizi", value: payload.services.join(", ") }
      : null,
    payload.budget ? { label: "Budget", value: payload.budget } : null,
    payload.website ? { label: "Sito attuale", value: payload.website } : null,
  ];

  return rows.filter((row): row is DetailRow => row !== null);
}

function rowsToText(rows: DetailRow[], message: string) {
  return [
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Messaggio:",
    message || "(nessun messaggio)",
  ].join("\n");
}

function emailShell({
  eyebrow,
  title,
  intro,
  rows,
  message,
  footerNote,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  rows: DetailRow[];
  message?: string;
  footerNote: string;
}) {
  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(10,12,0,0.12);width:34%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.muted};">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(10,12,0,0.12);vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color:${BRAND.ink};">
            ${escapeHtml(row.value)}
          </td>
        </tr>`,
    )
    .join("");

  const messageHtml = message
    ? `
      <div style="margin-top:28px;padding:20px 22px;border-radius:18px;background:${BRAND.cream};border:1px solid rgba(10,12,0,0.1);">
        <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.muted};">
          Messaggio
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${BRAND.ink};white-space:pre-wrap;">
          ${escapeHtml(message)}
        </p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.cream};color:${BRAND.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.cream};padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid rgba(10,12,0,0.12);border-radius:28px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND.ink};padding:28px 28px 24px;">
                <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(246,245,243,0.62);">
                  ${escapeHtml(eyebrow)}
                </p>
                <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.1;letter-spacing:-0.03em;color:${BRAND.cream};">
                  jaderweb
                </h1>
                <div style="margin-top:18px;display:inline-block;padding:8px 12px;border-radius:999px;background:${BRAND.accent};color:${BRAND.ink};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;">
                  ${escapeHtml(title)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:${BRAND.ink};">
                  ${escapeHtml(intro)}
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${rowsHtml}
                </table>
                ${messageHtml}
                <p style="margin:28px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:${BRAND.muted};">
                  ${escapeHtml(footerNote)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;border-top:1px solid rgba(10,12,0,0.1);background:${BRAND.cream};">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};">
                  Udine · Friuli Venezia Giulia · Italia
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildContactEmail(payload: ContactPayload) {
  const to = process.env.CONTACT_TO?.trim() || requireEnv("SMTP_USER");
  const from = requireEnv("SMTP_USER");
  const name = displayName(payload);
  const rows = buildDetailRows(payload);
  const message = payload.message || "(nessun messaggio)";

  return {
    from: `"jaderweb" <${from}>`,
    to,
    replyTo: payload.email,
    subject: `[jaderweb] Nuova richiesta — ${name}`,
    text: [
      "Nuova richiesta dal sito jaderweb",
      "",
      rowsToText(rows, message),
    ].join("\n"),
    html: emailShell({
      eyebrow: "Nuova richiesta",
      title: "Dal sito web",
      intro: `Hai ricevuto una nuova richiesta da ${name}.`,
      rows,
      message,
      footerNote: "Puoi rispondere direttamente a questa email per contattare il cliente.",
    }),
  };
}

export function buildConfirmationEmail(payload: ContactPayload) {
  const from = requireEnv("SMTP_USER");
  const name = greetingName(payload);
  const rows = buildDetailRows(payload).filter(
    (row) => row.label !== "Email" && row.label !== "Telefono",
  );
  const summaryRows: DetailRow[] = [
    ...rows,
    { label: "Email", value: payload.email },
    { label: "Telefono", value: payload.phone },
  ];

  return {
    from: `"jaderweb" <${from}>`,
    to: payload.email,
    replyTo: from,
    subject: "Ho ricevuto la tua richiesta — jaderweb",
    text: [
      `Ciao ${name},`,
      "",
      "Grazie per avermi scritto. Ho ricevuto la tua richiesta e ti ricontatterò a breve.",
      "",
      "Riepilogo:",
      rowsToText(summaryRows, payload.message || "(nessun messaggio)"),
      "",
      "A presto,",
      "jaderweb",
    ].join("\n"),
    html: emailShell({
      eyebrow: "Conferma invio",
      title: "Richiesta ricevuta",
      intro: `Ciao ${name}, grazie per avermi scritto. Ho ricevuto la tua richiesta e ti ricontatterò a breve.`,
      rows: summaryRows,
      message: payload.message || undefined,
      footerNote:
        "Se hai bisogno di aggiungere dettagli, rispondi pure a questa email.",
    }),
  };
}
