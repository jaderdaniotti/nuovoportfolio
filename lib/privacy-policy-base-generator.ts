export type DataControllerKind = "societa" | "professionista" | "associazione" | "persona-fisica" | "altro";

export type PrivacyPolicyBaseTreatments = {
  navigationTechnical: boolean;
  analyticsCookies: boolean;
  marketingProfiling: boolean;
  contactForms: boolean;
  newsletterEmail: boolean;
  userAccounts: boolean;
  ecommercePayments: boolean;
  socialMapsEmbeds: boolean;
  outsourcingProcessors: boolean;
  transfersOutsideEea: boolean;
};

export type PrivacyPolicyBaseInput = {
  ownerLabel: string;
  controllerKind: DataControllerKind;
  vatOrFiscalHint: string;
  registeredOffice: string;
  websiteUrl: string;
  privacyEmail: string;
  dataProtectionOfficer: string;
  lastUpdatedIsoDate: string;
  treatments: PrivacyPolicyBaseTreatments;
};

export const SAMPLE_PRIVACY_POLICY_BASE_INPUT: PrivacyPolicyBaseInput = {
  ownerLabel: "ACME Servizi Digitali S.r.l.",
  controllerKind: "societa",
  vatOrFiscalHint: "P.IVA IT01234567890",
  registeredOffice: "Via Roma 10, 20100 Milano (MI)",
  websiteUrl: "https://www.example.it",
  privacyEmail: "privacy@example.it",
  dataProtectionOfficer: "",
  lastUpdatedIsoDate: "2026-04-30",
  treatments: {
    navigationTechnical: true,
    analyticsCookies: true,
    marketingProfiling: false,
    contactForms: true,
    newsletterEmail: false,
    userAccounts: false,
    ecommercePayments: false,
    socialMapsEmbeds: true,
    outsourcingProcessors: true,
    transfersOutsideEea: true,
  },
};

const KIND_LABELS: Record<DataControllerKind, string> = {
  societa: "società o ente dotato di personalità giuridica",
  professionista: "professionista / libero professionista",
  associazione: "associazione o ente del terzo settore senza personalità giuridica",
  "persona-fisica": "persona fisica titolare del trattamento",
  altro: "soggetto titolare del trattamento",
};

export function normalizeUrlForPrivacy(u: string): string {
  const t = u.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function validatePrivacyPolicyBase(input: PrivacyPolicyBaseInput): string | null {
  const owner = input.ownerLabel.trim();
  if (owner.length < 2) {
    return "Inserisci la denominazione o il nome del titolare (almeno 2 caratteri).";
  }
  const normalized = normalizeUrlForPrivacy(input.websiteUrl);
  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return "URL del sito non valido (usa formato https://dominio.estensione).";
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    return "L’URL del sito deve iniziare con http:// o https://.";
  }
  const email = input.privacyEmail.trim();
  if (email.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Indirizzo email privacy non valido.";
  }
  const d = input.lastUpdatedIsoDate.trim();
  if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return "Formato data ultimo aggiornamento: AAAA-MM-GG.";
  }
  return null;
}

function sectionMarkdown(title: string, body: string): string {
  return `## ${title}\n\n${body.trim()}\n\n`;
}

export function formatPrivacyPolicyBaseReport(input: PrivacyPolicyBaseInput): string {
  const site = normalizeUrlForPrivacy(input.websiteUrl).replace(/\/$/, "");
  const owner = input.ownerLabel.trim();
  const kindPhrase = KIND_LABELS[input.controllerKind];
  let out = `# Informativa sulla privacy (“Privacy Policy”) — ${owner}\n\n`;
  out += `_Documento base generato in automatico il ${input.lastUpdatedIsoDate || "—"}; adattarlo con un legale prima della pubblicazione._\n\n`;
  out +=
    "**Avviso:** il testo che segue è una bozza strutturale e non sostituisce consulenza legale. GDPR, normativa nazionale del settore, contratti con fornitori e misure concrete (CMP, DPIA, registri) vanno verificati dal titolare e da professionisti abilitati.\n\n";

  out += sectionMarkdown(
    "1. Titolare del trattamento",
    [
      `Il titolare del trattamento è **${owner}**, qualificato come **${kindPhrase}**.`,
      input.registeredOffice.trim()
        ? `Sede/recapito dichiarati: ${input.registeredOffice.trim()}.`
        : "Completa questo paragrafo con sede legale o recapito aggiornato.",
      input.vatOrFiscalHint.trim()
        ? `Codice fiscale / partita IVA o altri identificativi comunicati: ${input.vatOrFiscalHint.trim()}.`
        : "Aggiungi, se pertinente, partita IVA, codice fiscale o riferimento al registro pubblico.",
      input.dataProtectionOfficer.trim()
        ? `Responsabile della protezione dei dati (DPO/RPD), ove nominato e contattabile ai fini degli interessati: ${input.dataProtectionOfficer.trim()}.`
        : "",
      `Sito oggetto dell’informativa: ${site}.`,
      `Email dedicata alla privacy degli interessati: **${input.privacyEmail.trim()}**.`,
    ]
      .filter(Boolean)
      .join("\n\n"),
  );

  out += sectionMarkdown(
    "2. Dati personali raccolti (in sintesi)",
    [
      "**Dati di navigazione e tecnici.** Indirizzo IP, identificatori di sessione, log di errore/base, lingua del browser e informazioni indispensabili al funzionamento del sito (seleziona le voci operative reali nei tuoi log).",
      input.treatments.contactForms ||
        input.treatments.newsletterEmail ||
        input.treatments.userAccounts ||
        input.treatments.ecommercePayments
        ? "**Dati forniti volontariamente.** Nome, email, contenuto messaggi e altri dati inseriti in moduli, registrazioni, ordini o iscrizione a newsletter."
        : "",
      input.treatments.ecommercePayments
        ? "**Dati economici/transazionali.** Dati relativi a ordini e pagamenti secondo gli strumenti che effettivamente utilizzi (carte, PSP, fatturazione)."
        : "",
      input.treatments.userAccounts
        ? "**Dati di account.** Credenziali, preferenze, cronologia degli accessi quando il servizio prevede un’area riservata."
        : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  );

  const purposes: string[] = [];

  purposes.push(
    "**Erogazione del sito e sicurezza.** Gestione della richiesta HTTP, prevenzione abusi e misure di sicurezza proporzionate (**interesse legittimo del titolare**, ove applicabile).",
  );

  if (input.treatments.navigationTechnical) {
    purposes.push(
      "**Cookie tecnici e strumenti strettamente necessari.** Memorizzazioni indispensabili al funzionamento o alla sessione (**base giuridica: necessità tecnica conforme alla normativa vigente sugli cookie e sulla privacy**). Aggiorna l’elenco preciso nella cookie policy collegata.",
    );
  }
  if (input.treatments.analyticsCookies) {
    purposes.push(
      "**Analisi statistiche aggregate.** Comprendi come si usa il sito per migliorare contenuti e usabilità (**consenso dove richiesto dalla normativa** o diversa base indicata dopo verifica tecnica degli strumenti attivi — es. configurazione anonimizzazioni). Descrivi fornitore e durata degli strumenti reali.",
    );
  }
  if (input.treatments.marketingProfiling) {
    purposes.push(
      "**Marketing e/o profilazione.** Personalizzazione di messaggi pubblicitari o remarketing (**consenso** salvo situazioni puntuali consentite dalla legge). Indica chiaramente categorie cookie/tag e opt-out disponibili.",
    );
  }
  if (input.treatments.contactForms || input.treatments.newsletterEmail) {
    purposes.push(
      "**Risposta a richieste e comunicazioni operative.** Gestione delle richieste inviate tramite modulo o email (**esecuzione di misure precontrattuali o contrattuali** / **consenso** per comunicazioni commerciali dove necessario).",
    );
  }
  if (input.treatments.newsletterEmail) {
    purposes.push(
      "**Newsletter o comunicazioni ricorrenti.** Invio contenuti (**consenso** o diverso fondamento documentato nei tuoi registri).",
    );
  }
  if (input.treatments.userAccounts) {
    purposes.push(
      "**Account e servizio digitale.** Registrazione, autenticazione e funzioni legate all’utenza (**esecuzione contratto**).",
    );
  }
  if (input.treatments.ecommercePayments) {
    purposes.push(
      "**Ordini e pagamenti.** Evasione degli acquisti e adempimenti contabili/fiscali (**contratto**, **obbligo legale**, secondo caso).",
    );
  }

  out += sectionMarkdown("3. Finalità e base giuridiche (schema)", purposes.join("\n\n"));

  const recipients: string[] = [
    "Personale incaricato del titolare in qualità necessaria allo svolgimento delle mansioni.",
  ];
  if (input.treatments.outsourcingProcessors || input.treatments.ecommercePayments) {
    recipients.push(
      "**Fornitori di servizio (sub-responsabili GDPR).** Hosting, CMS, gestione ticket, PSP, CRM o altri: elencali per nome/branca e tipo di incarico nell’appendice tecnica delle tue DPA effettivamente firmate.",
    );
  }
  if (input.treatments.socialMapsEmbeds) {
    recipients.push(
      "**Piattaforme terze da contenuti embedded.** Mappe, video o pulsanti social possono comportare comunicazione di dati verso soggetti autonomi (**informativa e consenso ove dovuto**, valutazioni di blocco prima del caricamento).",
    );
  }

  out += sectionMarkdown(
    "4. Destinatari e categorie di destinatari",
    recipients.filter(Boolean).join("\n\n"),
  );

  out += sectionMarkdown(
    "5. Conservazione",
    [
      "**Log e sicurezza.** Periodo proporzionale e coerente con policy interne documentate.",
      "**Dati di contatto e contrattuali.** Fino alla cessazione dell’incarico o nei termini stabiliti per obbligo legale/documentale.",
      input.treatments.marketingProfiling || input.treatments.analyticsCookies
        ? "**Strumenti di misura marketing/analytics.** Secondo TTL dei cookie/parametri e impostazioni del fornitore, come descritto nella cookie policy e nel pannello consensi."
        : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  );

  out += sectionMarkdown(
    "6. Trasferimenti extra SEE",
    input.treatments.transfersOutsideEea
      ? "Qualora utilizzi fornitori con sedi o infrastrutture extra Spazio Economico Europeo (es. cloud USA), documenta gli strumenti di adeguatezza o le **clausole contrattuali tipo** vigenti e gli eventuali **supplementary measures** dopo la valutazione del tuo legale/TIM."
      : "Se tutti i trattamenti restano infra-SEE o comunque coperti da adeguatezza documentata, indica comunque i fornitori effettivamente coinvolti e aggiorna in caso di sub-fornitori.",
  );

  out += sectionMarkdown(
    "7. Diritti degli interessati (articoli 15–22 GDPR)",
    [
      `Puoi rivolgerti a **${input.privacyEmail.trim()}** per esercitare diritti di accesso, retifica, cancellazione, limitazione, opposizione (ove applicabile) e portabilità (ove applicabile), nonché per revocare un consenso precedentemente espresso senza pregudicare liceità ante revoca.`,
      "Reclamo dinanzi **Garante per la protezione dei dati personali** italiano quando ritieni che il trattamento violi il Regolamento.",
    ].join("\n\n"),
  );

  out += sectionMarkdown(
    "8. Minori",
    "Se il servizio non è rivolto a minori di 14 anni, indica chiaramente l’esclusione di volontaria raccolta di dati; in caso contrario predisponi sistemi robusti di verifica/consenso genitoriale come da disciplina aggiornata.",
  );

  out += sectionMarkdown(
    "9. Aggiornamenti",
    `Modifiche sostanziali vanno comunicate con logica proporzionale (banner, email o comunicazione nell’area account). Mantieni traccia storica delle revisioni.`,
  );

  return out.trim() + "\n";
}

/** HTML minimale leggibile dal browser senza Markdown engine. */
export function privacyMarkdownToLiteHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const blocks: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      blocks.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
      i += 1;
      continue;
    }
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, ""));
        i += 1;
      }
      blocks.push(`<ul>${items.map((t) => `<li>${liteInlineMarkdown(t)}</li>`).join("")}</ul>`);
      continue;
    }
    const para: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#")) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(`<p>${liteInlineMarkdown(para.join(" "))}</p>`);
  }
  return `<article class="privacy-policy-lite">\n${blocks.join("\n")}\n</article>`;
}

function liteInlineMarkdown(s: string): string {
  const escaped = escapeHtml(s);
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/_(.+?)_/g, "<em>$1</em>");
}

export function buildPrivacyPolicyBaseBundle(input: PrivacyPolicyBaseInput): {
  markdown: string;
  html: string;
} {
  const md = formatPrivacyPolicyBaseReport(input);
  return {
    markdown: md,
    html: privacyMarkdownToLiteHtml(md),
  };
}
