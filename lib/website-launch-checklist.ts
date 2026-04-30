export type LaunchChecklistSection = {
  id: string;
  title: string;
  description: string;
  items: { id: string; label: string; hint?: string }[];
};

export const launchChecklistSections: LaunchChecklistSection[] = [
  {
    id: "seo-indicizzazione",
    title: "SEO e indicizzazione",
    description: "Metadati, crawling e segnali per i motori di ricerca.",
    items: [
      {
        id: "meta-unici",
        label: "Title e meta description unici e coerenti sulle pagine chiave",
        hint: "Evita duplicati tra URL simili.",
      },
      {
        id: "canonical-ok",
        label: "Tag canonical presenti e senza conflitti tra loro",
      },
      { id: "robots-allineato", label: "robots.txt e meta robots allineati (index/noindex voluti)" },
      {
        id: "sitemap-search-console",
        label: "Sitemap pubblicata e (se usi Google) inviata in Search Console",
      },
      {
        id: "gsc-verificata",
        label: "Proprietà Search Console verificata e utenti autorizzati",
      },
      {
        id: "schema-validato",
        label: "JSON-LD / dati strutturati testati (Rich Results Test o equivalente)",
      },
      { id: "link-interni", label: "Navigazione principale e link interni critici verificati" },
      {
        id: "hreflang",
        label: "hreflang corretto solo se il sito è multilingua",
        hint: "Altrimenti nessun hreflang superfluo.",
      },
    ],
  },
  {
    id: "tecnico",
    title: "Tecnico e infrastruttura",
    description: "HTTPS, redirect, form e fondamenta del deploy.",
    items: [
      { id: "https-forzato", label: "HTTPS attivo, certificato valido, mixed content assente" },
      {
        id: "redirect-canonical-host",
        label: "Redirect coerenti (www ⇄ apex, http → https) senza catene inutili",
      },
      { id: "pagina-404", label: "Pagina 404 utile, branded, con link alla home o ricerca" },
      { id: "dns-cutover", label: "DNS / CDN / propagazione controllati per il go-live" },
      {
        id: "favicon-pwa-base",
        label: "Favicon, manifest (se PWA) e theme-color dove servono",
      },
      {
        id: "form-contatto",
        label: "Form e workflow email (SMTP/API) testati end-to-end",
      },
      {
        id: "no-staging-pubblico",
        label: "Ambienti staging/dev non indicizzati e non linkati dal sito live",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    description: "Carico rapido e risorse ottimizzate.",
    items: [
      { id: "immagini-peso", label: "Immagini compresse e dimensioni appropriate al layout" },
      {
        id: "lazy-media",
        label: "Lazy loading su media below the fold (dove supportato)",
      },
      {
        id: "font-strategy",
        label: "Font web con strategia di caricamento (es. swap, subset)",
      },
      {
        id: "cache-statici",
        label: "Cache browser/CDN per asset statici configurata",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy e compliance",
    description: "Tracciamento consensuale e informativa aggiornata.",
    items: [
      {
        id: "cookie-cmp",
        label: "Banner cookie / CMP configurato secondo l’uso effettivo dei tag",
      },
      {
        id: "privacy-policy",
        label: "Informativa privacy aggiornata e link visibile (footer / form)",
      },
      {
        id: "consent-analytics",
        label: "Caricamento analytics/marketing rispetta il consenso dell’utente",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics e misurazione",
    description: "Dati affidabili senza perdere privacy.",
    items: [
      { id: "property-prod", label: "Property analytics punta all’ambiente di produzione" },
      {
        id: "eventi-test",
        label: "Eventi o conversioni chiave verificati in preview/staging",
      },
      {
        id: "no-pii-chiaro",
        label: "Nessun dato personale sensibile inviato in chiaro agli strumenti",
      },
    ],
  },
  {
    id: "contenuti-ux",
    title: "Contenuti e UX",
    description: "Qualità percepita e percorsi utente.",
    items: [
      { id: "ortografia-link", label: "Revisione copy e controllo link rotti principali" },
      { id: "cta-mobile", label: "CTA e funnel verificati su mobile e tablet" },
      {
        id: "a11y-base",
        label: "Contrasto e focus visibili su pulsanti e campi principali",
      },
    ],
  },
  {
    id: "golive",
    title: "Go-live e monitoraggio",
    description: "Ultimi controlli operativi.",
    items: [
      { id: "backup-pre", label: "Backup di DB e file (o restore point) prima del lancio" },
      { id: "monitoring", label: "Monitor uptime o alerting attivo sul dominio produzione" },
      { id: "rollback", label: "Piano di rollback o deploy precedente identificabile" },
    ],
  },
];

const allIds = launchChecklistSections.flatMap((s) => s.items.map((i) => i.id));

export function getLaunchChecklistTotal(): number {
  return allIds.length;
}

export function getLaunchChecklistProgress(checkedIds: ReadonlySet<string>): {
  done: number;
  total: number;
  percent: number;
} {
  const total = allIds.length;
  let done = 0;
  for (const id of allIds) {
    if (checkedIds.has(id)) done += 1;
  }
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

export function formatLaunchChecklistReport(checkedIds: ReadonlySet<string>): string {
  const { done, total, percent } = getLaunchChecklistProgress(checkedIds);
  const lines: string[] = [
    "Website launch checklist — report",
    `Completamento: ${done}/${total} (${percent}%)`,
    "",
  ];

  for (const section of launchChecklistSections) {
    lines.push(`## ${section.title}`);
    const pending: string[] = [];
    const complete: string[] = [];
    for (const item of section.items) {
      const line = item.hint ? `- ${item.label} (${item.hint})` : `- ${item.label}`;
      if (checkedIds.has(item.id)) complete.push(line);
      else pending.push(line);
    }
    if (complete.length) {
      lines.push("Fatto:");
      lines.push(...complete);
      lines.push("");
    }
    if (pending.length) {
      lines.push("Da fare:");
      lines.push(...pending);
      lines.push("");
    }
  }

  lines.push("— Generato in locale nel browser.");
  return lines.join("\n").trimEnd();
}

export const launchChecklistStorageKey = "website-launch-checklist-v1";
