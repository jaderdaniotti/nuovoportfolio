export type CookieBannerTone = "neutral" | "formal" | "friendly";

export type CookieBannerCopyInput = {
  siteName: string;
  tone: CookieBannerTone;
  cookiePolicyUrl: string;
  privacyPolicyUrl: string;
  mentionAnalytics: boolean;
  mentionMarketing: boolean;
  showRejectNonEssential: boolean;
  showCustomizePreferences: boolean;
};

export type CookieBannerButtonHint = {
  id: "accept-all" | "reject-non-essential" | "preferences";
  label: string;
  note: string;
};

export type CookieBannerCopyBundle = {
  headline: string;
  body: string;
  bullets: string[];
  buttons: CookieBannerButtonHint[];
  cookiePolicyLinkLabel: string;
  privacyPolicyLinkLabel: string | null;
  markdownReport: string;
  htmlSnippet: string;
  footerDisclaimer: string;
};

export const SAMPLE_COOKIE_BANNER_COPY_INPUT: CookieBannerCopyInput = {
  siteName: "ACME Servizi Digitali",
  tone: "neutral",
  cookiePolicyUrl: "https://www.example.it/cookie-policy",
  privacyPolicyUrl: "https://www.example.it/privacy-policy",
  mentionAnalytics: true,
  mentionMarketing: true,
  showRejectNonEssential: true,
  showCustomizePreferences: true,
};

function normalizeOptionalHttpsUrl(raw: string): { ok: true; href: string } | { ok: false; message: string } {
  const t = raw.trim();
  if (!t) return { ok: true, href: "" };
  const withScheme = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  try {
    const u = new URL(withScheme);
    if (!["http:", "https:"].includes(u.protocol)) {
      return { ok: false, message: "Gli URL devono usare http:// o https://." };
    }
    return { ok: true, href: u.toString() };
  } catch {
    return { ok: false, message: "URL non valido (verifica dominio e percorso)." };
  }
}

export function validateCookieBannerCopyInput(input: CookieBannerCopyInput): string | null {
  const name = input.siteName.trim();
  if (name.length < 2) {
    return "Inserisci il nome del sito o del brand (almeno 2 caratteri).";
  }
  const ck = normalizeOptionalHttpsUrl(input.cookiePolicyUrl);
  if (!ck.ok) return ck.message;
  if (!ck.href) {
    return "Indica l’URL della cookie policy: è il riferimento obbligatorio per il copy del banner.";
  }
  const pv = normalizeOptionalHttpsUrl(input.privacyPolicyUrl);
  if (!pv.ok) return pv.message;
  return null;
}

function toneOpening(tone: CookieBannerTone): string {
  switch (tone) {
    case "formal":
      return "Ai sensi della normativa applicabile in materia di privacy e cookie";
    case "friendly":
      return "Per offrirti un’esperienza trasparente e rispettosa delle tue scelte";
    default:
      return "In conformità alla normativa su privacy e cookie";
  }
}

function toneVerbConsent(tone: CookieBannerTone): string {
  switch (tone) {
    case "formal":
      return "Esprimerà il suo consenso";
    case "friendly":
      return "Puoi dare il consenso";
    default:
      return "Puoi prestare il consenso";
  }
}

export function buildCookieBannerCopyBundle(input: CookieBannerCopyInput): CookieBannerCopyBundle {
  const site = input.siteName.trim();
  const ck = normalizeOptionalHttpsUrl(input.cookiePolicyUrl);
  const pv = normalizeOptionalHttpsUrl(input.privacyPolicyUrl);
  const cookieHref = ck.ok ? ck.href : "";
  const privacyHref = pv.ok ? pv.href : "";

  const opening = toneOpening(input.tone);
  const categories: string[] = [
    "Cookie tecnici e strettamente necessari per sicurezza, preferenze essenziali e funzionamento base del sito.",
  ];
  if (input.mentionAnalytics) {
    categories.push(
      "Cookie di misura/analytics (solo se attivi): statistiche aggregate sul traffico per migliorare contenuti e prestazioni.",
    );
  }
  if (input.mentionMarketing) {
    categories.push(
      "Cookie di profilazione o marketing (solo se attivi): contenuti e annunci più pertinenti alle tue preferenze.",
    );
  }
  if (!input.mentionAnalytics && !input.mentionMarketing) {
    categories.push(
      "Non aggiungiamo in questo testo categorie facoltative: se usi analytics o remarketing, attiva le relative voci nel modulo.",
    );
  }

  const consentPhrase = toneVerbConsent(input.tone);
  let body =
    `${opening}, **${site}** utilizza cookie e tecnologie simili. ` +
    `I cookie necessari sono utilizzati per far funzionare il sito; `;
  if (input.mentionAnalytics || input.mentionMarketing) {
    body += `altre categorie sono attivate solo previo consenso, ove richiesto. `;
  } else {
    body += `verifica nel tuo progetto se servono altre categorie oltre ai necessari e aggiorna il testo di conseguenza. `;
  }
  body +=
    `${consentPhrase} tramite il banner o, in un secondo momento, dalle impostazioni dedicate. ` +
    `Puoi modificare o revocare le scelte in qualsiasi momento secondo quanto indicato nella documentazione privacy del sito.`;

  const headline =
    input.tone === "friendly"
      ? `Ciao! Le tue scelte sui cookie — ${site}`
      : input.tone === "formal"
        ? `Informativa sui cookie — ${site}`
        : `Cookie e tue preferenze — ${site}`;

  const buttons: CookieBannerButtonHint[] = [
    {
      id: "accept-all",
      label: input.tone === "formal" ? "Accetta tutti" : input.tone === "friendly" ? "Ok, accetto tutto" : "Accetta tutti",
      note: "Accetta categorie necessarie e, se presenti nel tuo stack, anche analytics e marketing — adatta il binding al tuo CMP.",
    },
  ];
  if (input.showRejectNonEssential) {
    buttons.push({
      id: "reject-non-essential",
      label: input.tone === "formal" ? "Rifiuta i non necessari" : input.tone === "friendly" ? "Solo necessari, grazie" : "Rifiuta i non necessari",
      note: "Mantiene solo i cookie strettamente necessari; richiede implementazione tecnica coerente (no pre-check su facoltativi).",
    });
  }
  if (input.showCustomizePreferences) {
    buttons.push({
      id: "preferences",
      label: input.tone === "formal" ? "Personalizza" : input.tone === "friendly" ? "Decidi tu" : "Personalizza preferenze",
      note: "Apre pannello preferenze / second layer con switch per categoria e link alla cookie policy.",
    });
  }

  const cookiePolicyLinkLabel = input.tone === "formal" ? "Cookie policy" : input.tone === "friendly" ? "Scopri i cookie che usiamo" : "Leggi la cookie policy";
  const privacyPolicyLinkLabel = privacyHref
    ? input.tone === "formal"
      ? "Privacy policy"
      : input.tone === "friendly"
        ? "Privacy"
        : "Informativa privacy"
    : null;

  const footerDisclaimer =
    "Testo indicativo generato offline: non è consulenza legale. Allinea terminologia e flussi al tuo Cookie Policy, al registro trattamenti e al CMP scelto (inclusi fornitori terzi).";

  const mdLines: string[] = [
    `# ${headline}`,
    "",
    body.replace(/\*\*(.+?)\*\*/g, "**$1**"),
    "",
    "## Messaggi pulsanti suggeriti",
    "",
    ...buttons.map((b) => `- **${b.label}** — _${b.note}_`),
    "",
    "## Link testuali",
    "",
    `- [${cookiePolicyLinkLabel}](${cookieHref})`,
  ];
  if (privacyHref && privacyPolicyLinkLabel) {
    mdLines.push(`- [${privacyPolicyLinkLabel}](${privacyHref})`);
  }
  mdLines.push("", "## Dettaglio categorie (copy secondario / tooltip)", "");
  categories.forEach((c, i) => mdLines.push(`${i + 1}. ${c}`));
  mdLines.push("", "---", "", `_Disclaimer: ${footerDisclaimer}_`);

  const markdownReport = mdLines.join("\n");

  const btnHtml = buttons
    .map(
      (b) =>
        `    <button type="button" data-cmp-action="${b.id}" class="cookie-banner__btn">${escapeHtmlLite(b.label)}</button>`,
    )
    .join("\n");

  const linksHtml: string[] = [
    `    <a href="${escapeAttr(cookieHref)}" class="cookie-banner__link">${escapeHtmlLite(cookiePolicyLinkLabel)}</a>`,
  ];
  if (privacyHref && privacyPolicyLinkLabel) {
    linksHtml.push(
      `    <a href="${escapeAttr(privacyHref)}" class="cookie-banner__link">${escapeHtmlLite(privacyPolicyLinkLabel)}</a>`,
    );
  }

  const htmlSnippet = [
    `<aside class="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-desc">`,
    `  <h2 id="cookie-banner-title">${escapeHtmlLite(headline)}</h2>`,
    `  <p id="cookie-banner-desc">${escapeHtmlLite(body.replace(/\*\*(.+?)\*\*/g, "$1"))}</p>`,
    `  <ul class="cookie-banner__notes">`,
    ...categories.map((c) => `    <li>${escapeHtmlLite(c)}</li>`),
    `  </ul>`,
    `  <div class="cookie-banner__actions">`,
    btnHtml,
    `  </div>`,
    `  <nav class="cookie-banner__legal" aria-label="Documentazione privacy">`,
    ...linksHtml,
    `  </nav>`,
    `</aside>`,
  ].join("\n");

  return {
    headline,
    body: body.replace(/\*\*(.+?)\*\*/g, "$1"),
    bullets: categories,
    buttons,
    cookiePolicyLinkLabel,
    privacyPolicyLinkLabel,
    markdownReport,
    htmlSnippet,
    footerDisclaimer,
  };
}

function escapeHtmlLite(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
  return escapeHtmlLite(s).replace(/'/g, "&#39;");
}

export function formatCookieBannerCopyPlainReport(bundle: CookieBannerCopyBundle): string {
  const lines = [
    bundle.headline,
    "",
    bundle.body,
    "",
    "Pulsanti:",
    ...bundle.buttons.map((b) => `- ${b.label}`),
    "",
    `Link: ${bundle.cookiePolicyLinkLabel}`,
  ];
  if (bundle.privacyPolicyLinkLabel) {
    lines.push(`Link: ${bundle.privacyPolicyLinkLabel}`);
  }
  lines.push("", "Bullet categorie:", ...bundle.bullets.map((b, i) => `${i + 1}. ${b}`));
  lines.push("", bundle.footerDisclaimer);
  return lines.join("\n");
}
