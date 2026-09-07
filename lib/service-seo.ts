import { getServicePage, servicePages } from "@/lib/service-pages";
import type { ServicePage } from "@/lib/service-pages";

type ServiceSlug = (typeof servicePages)[number]["slug"];

export type ServiceSeo = {
  primaryKeyword: string;
  title: string;
  description: string;
  relatedServices: readonly [ServiceSlug, ServiceSlug, ServiceSlug];
};

export const serviceSeo = {
  matrimoni: {
    primaryKeyword: "sito matrimonio",
    title: "Sito matrimonio | RSVP e info per gli invitati | jaderweb",
    description:
      "Sito dedicato al matrimonio con conferma presenza, location, lista nozze e galleria. Un unico spazio per accompagnare gli invitati prima e dopo il giorno.",
    relatedServices: ["eventi-privati", "prenotazioni", "cv-portfolio"],
  },
  "sagre-eventi": {
    primaryKeyword: "sito per sagra",
    title: "Sito per sagra | Programma ed eventi comunali | jaderweb",
    description:
      "Sito per sagre, feste patronali e manifestazioni comunali: programma, mappa, espositori, menù e informazioni pratiche, anche da smartphone.",
    relatedServices: ["eventi-locali", "eventi-privati", "landing-ads"],
  },
  ristoranti: {
    primaryKeyword: "sito web ristorante",
    title: "Sito web ristorante | Menù digitale e prenotazione | jaderweb",
    description:
      "Sito per ristoranti con menù digitale, prenotazione tavoli, galleria ed eventi. Pensato per far trovare il locale e prenotare in modo semplice.",
    relatedServices: ["prenotazioni", "landing-ads", "digitalizzazione"],
  },
  "bb-case-vacanza": {
    primaryKeyword: "sito web b&b",
    title: "Sito web B&B | Camere, galleria e prenotazioni | jaderweb",
    description:
      "Sito per B&B, appartamenti e case vacanza: camere, galleria, disponibilità, prenotazioni e informazioni sul territorio per chi sta scegliendo dove soggiornare.",
    relatedServices: ["prenotazioni", "ristoranti", "landing-ads"],
  },
  professionisti: {
    primaryKeyword: "sito per professionisti",
    title: "Sito per professionisti | Servizi, portfolio e contatti | jaderweb",
    description:
      "Sito professionale costruito intorno al tuo settore: servizi, portfolio, richiesta appuntamento e contatti per studi e liberi professionisti.",
    relatedServices: ["cv-portfolio", "prenotazioni", "one-page"],
  },
  "associazioni-sportive": {
    primaryKeyword: "sito associazione sportiva",
    title: "Sito associazione sportiva | Calendario, rosa e iscrizioni | jaderweb",
    description:
      "Sito per società e associazioni sportive: calendario, risultati, rosa, staff, sponsor e iscrizioni in un unico spazio accessibile da smartphone.",
    relatedServices: ["palestre", "eventi-locali", "prenotazioni"],
  },
  "band-eventi": {
    primaryKeyword: "sito web band",
    title: "Sito web band | Media, calendario e booking | jaderweb",
    description:
      "Sito per musicisti, DJ e band: biografia, media, calendario eventi e booking per presentarti in modo professionale e ricevere richieste.",
    relatedServices: ["eventi-privati", "landing-ads", "cv-portfolio"],
  },
  "agenzie-immobiliari": {
    primaryKeyword: "sito agenzia immobiliare",
    title: "Sito agenzia immobiliare | Schede, ricerca e appuntamenti | jaderweb",
    description:
      "Sito per agenzie immobiliari con schede complete, ricerca avanzata, planimetrie, video e richiesta di appuntamento.",
    relatedServices: ["preventivi-online", "landing-ads", "digitalizzazione"],
  },
  "eventi-privati": {
    primaryKeyword: "sito evento",
    title: "Sito evento | Compleanni, lauree e feste private | jaderweb",
    description:
      "Pagina dedicata a compleanni, lauree, battesimi e feste: RSVP, location, programma e informazioni utili per gli invitati.",
    relatedServices: ["matrimoni", "sagre-eventi", "landing-ads"],
  },
  artigiani: {
    primaryKeyword: "sito web artigiano",
    title: "Sito web artigiano | Portfolio lavori e preventivi | jaderweb",
    description:
      "Sito per artigiani e imprese locali: portfolio lavori, zona di intervento e richiesta preventivo, con WhatsApp e mappe.",
    relatedServices: ["preventivi-online", "professionisti", "one-page"],
  },
  "landing-ads": {
    primaryKeyword: "landing page",
    title: "Landing page | Campagne ads e conversione | jaderweb",
    description:
      "Landing page per campagne Google, Instagram e Facebook: un obiettivo, una call to action e tracking, senza distrazioni.",
    relatedServices: ["one-page", "sito-48h", "digitalizzazione"],
  },
  "one-page": {
    primaryKeyword: "sito one page",
    title: "Sito one page | Presenza essenziale e professionale | jaderweb",
    description:
      "Sito one page essenziale: presentazione, servizi, contatti, WhatsApp e posizione. Una presenza digitale chiara e responsive.",
    relatedServices: ["sito-48h", "landing-ads", "professionisti"],
  },
  "sito-48h": {
    primaryKeyword: "sito web veloce",
    title: "Sito web veloce | Online in 48/72 ore | jaderweb",
    description:
      "Sito professionale in 48/72 ore per chi ha già logo, foto e testi. Struttura pronta, personalizzazione visiva e pubblicazione.",
    relatedServices: ["one-page", "landing-ads", "professionisti"],
  },
  palestre: {
    primaryKeyword: "sito web palestra",
    title: "Sito web palestra | Corsi, clienti e prenotazioni | jaderweb",
    description:
      "Sistema digitale per palestre e personal trainer: prenotazione corsi, calendario, abbonamenti e comunicazioni con i clienti.",
    relatedServices: ["prenotazioni", "associazioni-sportive", "digitalizzazione"],
  },
  "preventivi-online": {
    primaryKeyword: "preventivo online",
    title: "Preventivo online | Richieste complete e organizzate | jaderweb",
    description:
      "Sistema di preventivo online: il cliente sceglie il servizio, inserisce dati e foto, tu ricevi una richiesta già organizzata.",
    relatedServices: ["artigiani", "agenzie-immobiliari", "digitalizzazione"],
  },
  prenotazioni: {
    primaryKeyword: "prenotazioni online",
    title: "Prenotazioni online | Calendario, conferme e promemoria | jaderweb",
    description:
      "Prenotazioni online per attività su appuntamento: calendario, disponibilità, conferme e promemoria, senza dipendere solo dal telefono.",
    relatedServices: ["ristoranti", "palestre", "professionisti"],
  },
  "cv-portfolio": {
    primaryKeyword: "portfolio online",
    title: "Portfolio online | Progetti, competenze e CV | jaderweb",
    description:
      "Portfolio e CV online per freelance e creativi: progetti, competenze, esperienze e download del curriculum in un sito personale.",
    relatedServices: ["professionisti", "band-eventi", "one-page"],
  },
  "eventi-locali": {
    primaryKeyword: "portale eventi",
    title: "Portale eventi | Calendario e schede del territorio | jaderweb",
    description:
      "Portale eventi locali per sagre, concerti e manifestazioni: calendario, mappa e schede evento per scoprire cosa succede in zona.",
    relatedServices: ["sagre-eventi", "band-eventi", "landing-ads"],
  },
  digitalizzazione: {
    primaryKeyword: "digitalizzazione aziendale",
    title: "Digitalizzazione aziendale | Sito, automazioni e CRM | jaderweb",
    description:
      "Digitalizzazione aziendale: sito, email, CRM, automazioni e manutenzione in un unico sistema, non solo una vetrina online.",
    relatedServices: ["preventivi-online", "prenotazioni", "landing-ads"],
  },
} as const satisfies Record<ServiceSlug, ServiceSeo>;

function isServiceSlug(slug: string): slug is keyof typeof serviceSeo {
  return Object.prototype.hasOwnProperty.call(serviceSeo, slug);
}

export function getServiceSeo(slug: string): ServiceSeo | undefined {
  if (isServiceSlug(slug)) {
    return serviceSeo[slug];
  }
  return undefined;
}

export function getRelatedServicePages(slug: string): ServicePage[] {
  const seo = getServiceSeo(slug);
  if (!seo) return [];

  return seo.relatedServices
    .filter((relatedSlug) => relatedSlug !== slug)
    .map((relatedSlug) => getServicePage(relatedSlug))
    .filter((page): page is ServicePage => Boolean(page));
}
