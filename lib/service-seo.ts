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
    title: "Sito matrimonio con RSVP | Inviti digitali — jaderweb",
    description:
      "Creo il sito del vostro matrimonio: conferma presenza, location, lista nozze e galleria. Un solo link per gli invitati, prima e dopo il giorno.",
    relatedServices: ["eventi-privati", "prenotazioni", "cv-portfolio"],
  },
  "sagre-eventi": {
    primaryKeyword: "sito per sagra",
    title: "Sito sagra ed eventi comunali | Programma e mappa — jaderweb",
    description:
      "Programma, mappa, espositori e menù per sagre e feste patronali. Un sito mobile-first che i visitatori consultano davvero.",
    relatedServices: ["eventi-locali", "eventi-privati", "landing-ads"],
  },
  ristoranti: {
    primaryKeyword: "sito web ristorante",
    title: "Sito ristorante con prenotazione | Menù digitale — jaderweb",
    description:
      "Menù digitale, prenotazione tavoli, galleria ed eventi: il sito che fa trovare il locale e prenotare senza attrito.",
    relatedServices: ["prenotazioni", "landing-ads", "digitalizzazione"],
  },
  "bb-case-vacanza": {
    primaryKeyword: "sito web b&b",
    title: "Sito B&B e case vacanza | Camere e prenotazioni — jaderweb",
    description:
      "Camere, galleria, disponibilità e info sul territorio per B&B e appartamenti. Aiuto chi sta scegliendo dove soggiornare a prenotare.",
    relatedServices: ["prenotazioni", "ristoranti", "landing-ads"],
  },
  professionisti: {
    primaryKeyword: "sito per professionisti",
    title: "Sito per professionisti | Portfolio e appuntamenti — jaderweb",
    description:
      "Servizi, prove di lavoro e richiesta appuntamento per studi e liberi professionisti. Un sito che parla del tuo mestiere, non di template.",
    relatedServices: ["cv-portfolio", "prenotazioni", "one-page"],
  },
  "associazioni-sportive": {
    primaryKeyword: "sito associazione sportiva",
    title: "Sito associazione sportiva | Calendario e iscrizioni — jaderweb",
    description:
      "Calendario, risultati, rosa, sponsor e iscrizioni in un sito pensato per smartphone. La società sportiva online senza fogli sparsi.",
    relatedServices: ["palestre", "eventi-locali", "prenotazioni"],
  },
  "band-eventi": {
    primaryKeyword: "sito web band",
    title: "Sito band e musicisti | Media e booking — jaderweb",
    description:
      "Bio, media, calendario e form booking per band, DJ e artisti. Presentati bene e ricevi richieste organizzate.",
    relatedServices: ["eventi-privati", "landing-ads", "cv-portfolio"],
  },
  "agenzie-immobiliari": {
    primaryKeyword: "sito agenzia immobiliare",
    title: "Sito agenzia immobiliare | Schede e ricerca — jaderweb",
    description:
      "Schede complete, ricerca, planimetrie e richiesta appuntamento. Un sito immobiliare che guida il cliente fino al contatto.",
    relatedServices: ["preventivi-online", "landing-ads", "digitalizzazione"],
  },
  "eventi-privati": {
    primaryKeyword: "sito evento",
    title: "Sito evento privato | RSVP e programma — jaderweb",
    description:
      "Compleanni, lauree e feste: RSVP, location e programma in una pagina dedicata agli invitati. Condividi un solo link.",
    relatedServices: ["matrimoni", "sagre-eventi", "landing-ads"],
  },
  artigiani: {
    primaryKeyword: "sito web artigiano",
    title: "Sito artigiano | Portfolio lavori e preventivi — jaderweb",
    description:
      "Mostra i tuoi lavori, la zona di intervento e raccogli preventivi via form o WhatsApp. Fatto per imprese locali che vendono fiducia.",
    relatedServices: ["preventivi-online", "professionisti", "one-page"],
  },
  "landing-ads": {
    primaryKeyword: "landing page",
    title: "Landing page per ads | Conversione senza distrazioni — jaderweb",
    description:
      "Landing per Google, Meta e Instagram: un obiettivo, una CTA, tracking. Niente menù inutili che bruciano il budget ads.",
    relatedServices: ["one-page", "sito-48h", "digitalizzazione"],
  },
  "one-page": {
    primaryKeyword: "sito one page",
    title: "Sito one page professionale | Essenziale e chiaro — jaderweb",
    description:
      "Una pagina: chi sei, cosa fai, contatti, WhatsApp e mappa. Presenza digitale responsive senza complicazioni.",
    relatedServices: ["sito-48h", "landing-ads", "professionisti"],
  },
  "sito-48h": {
    primaryKeyword: "sito web veloce",
    title: "Sito online in 48/72 ore | Setup rapido — jaderweb",
    description:
      "Se hai già logo, foto e testi, metto online un sito professionale in 48/72 ore: struttura pronta e personalizzazione visiva.",
    relatedServices: ["one-page", "landing-ads", "professionisti"],
  },
  palestre: {
    primaryKeyword: "sito web palestra",
    title: "Sito palestra e PT | Corsi e prenotazioni — jaderweb",
    description:
      "Prenotazione corsi, calendario, abbonamenti e comunicazioni per palestre e personal trainer. Meno WhatsApp caotici, più organizzazione.",
    relatedServices: ["prenotazioni", "associazioni-sportive", "digitalizzazione"],
  },
  "preventivi-online": {
    primaryKeyword: "preventivo online",
    title: "Preventivo online strutturato | Richieste complete — jaderweb",
    description:
      "Il cliente sceglie servizio, dati e foto: tu ricevi una richiesta già organizzata. Meno email incomplete, più preventivi utili.",
    relatedServices: ["artigiani", "agenzie-immobiliari", "digitalizzazione"],
  },
  prenotazioni: {
    primaryKeyword: "prenotazioni online",
    title: "Prenotazioni online | Calendario e promemoria — jaderweb",
    description:
      "Disponibilità, conferme e promemoria per attività su appuntamento. Riduci le chiamate perse e i no-show.",
    relatedServices: ["ristoranti", "palestre", "professionisti"],
  },
  "cv-portfolio": {
    primaryKeyword: "portfolio online",
    title: "Portfolio e CV online | Freelance e creativi — jaderweb",
    description:
      "Progetti, competenze ed esperienze in un sito personale con download CV. Ideale se il tuo lavoro si giudica guardando i pezzi.",
    relatedServices: ["professionisti", "band-eventi", "one-page"],
  },
  "eventi-locali": {
    primaryKeyword: "portale eventi",
    title: "Portale eventi locali | Calendario del territorio — jaderweb",
    description:
      "Calendario, mappa e schede per sagre, concerti e manifestazioni. Uno strumento per far scoprire cosa succede in zona.",
    relatedServices: ["sagre-eventi", "band-eventi", "landing-ads"],
  },
  digitalizzazione: {
    primaryKeyword: "digitalizzazione aziendale",
    title: "Digitalizzazione PMI | Sito, CRM e automazioni — jaderweb",
    description:
      "Sito, email, CRM e automazioni in un sistema coerente — non solo una vetrina. Parto da cosa ti fa perdere tempo oggi.",
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
