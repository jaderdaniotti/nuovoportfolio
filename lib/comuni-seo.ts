import { getServicePage } from "@/lib/service-pages";
import { getServiceSeo } from "@/lib/service-seo";
import {
  COMUNI_HUB_PATH,
  comuneBasePath,
  comuneContattiPath,
  comunePercheNoiPath,
  comuneProcessoPath,
  comuneServicePath,
  comuneServiziPath,
} from "@/lib/comune-paths";

export const INDEXABLE_POPULATION_THRESHOLD = 0;
export const PRERENDER_POPULATION_THRESHOLD = 20_000;
export const COMUNE_REVALIDATE_SECONDS = 2_592_000;

export type ComuneSeoInput = {
  slug: string;
  nome: string;
  sigla: string;
  provincia: string;
  regione: string;
  codice: string;
  popolazione: number;
};

export type ComuneSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  opening: string;
  angle: string;
  cta: string;
  serviceName: string;
  h1: string;
};

export type ComunePageKind =
  | "home"
  | "servizi"
  | "service"
  | "contatti"
  | "processo"
  | "perche-noi";

export type ComunePageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  lead: string;
  cta: string;
};

const titlePrefix = [
  "Siti web a",
  "Realizzazione siti web a",
  "Web design e sviluppo a",
  "SEO locale e siti web a",
  "Sviluppo siti professionali a",
  "Creazione siti web a",
  "Freelance web a",
  "Siti internet a",
  "Presenza digitale a",
  "Siti per attività a",
  "Web designer a",
  "Sviluppatore web a",
  "Progetti web a",
  "Siti aziendali a",
  "Digitalizzazione e siti a",
  "Landing e siti web a",
] as const;

const opening = [
  "A {{comune}} progetto siti veloci, chiari e pensati per chi cerca online un’attività della zona.",
  "Per le imprese e i professionisti di {{comune}} costruisco presenze digitali che portano richieste, non solo una vetrina.",
  "A {{comune}} il sito deve funzionare da smartphone: recapiti, servizi e una chiamata all’azione visibile subito.",
  "Lavoro con attività di {{comune}} per trasformare ricerche locali in contatti qualificati.",
  "A {{comune}} un sito professionale è il punto fermo tra passaparola, Maps e campagne ads.",
  "Per {{comune}} parto da cosa fai e da chi vuoi raggiungere, poi costruisco struttura, testi e tecnologia.",
  "A {{comune}} progetto pagine che spiegano l’offerta in pochi secondi e rendono semplice scrivere o prenotare.",
  "Con le attività di {{comune}} punto a un sito ordinato, misurabile e facile da aggiornare nel tempo.",
  "A {{comune}} ({{sigla}}) il sito non è un accessorio: è dove chi ti cerca capisce se può fidarsi e come contattarti.",
  "Per chi lavora a {{comune}} ({{sigla}}) costruisco un indirizzo web stabile, non una pagina che cambia formato ogni mese.",
  "A {{comune}} unisco design sobrio e SEO locale: title, H1 e testi allineati a come ti cercano davvero.",
  "Se hai un’attività a {{comune}}, il sito deve dire zona, servizi e prossimo passo senza far girare a vuoto.",
  "A {{comune}} parto dal telefono: layout, CTA e form pensati per chi arriva da Maps o da una ricerca rapida.",
  "Per {{comune}} e dintorni progetto siti che restano tuoi: codice chiaro, hosting moderno, niente dipendenze inutili.",
  "A {{comune}} collego sito, WhatsApp e scheda Google così la richiesta non si perde tra canali diversi.",
  "Lavoro da freelance per {{comune}}: un referente solo, tempi reali, niente giro di account manager.",
  "A {{comune}} in {{regione}} costruisco pagine locali oneste — niente testo clonabile cambiando solo il nome città.",
  "Per le attività di {{comune}} preferisco poche pagine utili a un sito gonfio di sezioni vuote.",
] as const;

const angle = [
  "Curo Core Web Vitals, gerarchia dei contenuti e un percorso chiaro verso il contatto.",
  "Allineo titolo, intestazione e testo all’intento di chi cerca un servizio nella tua zona.",
  "Mostro prove concrete — lavori, orari, territorio — per far scattare la fiducia prima della chiamata.",
  "Sviluppo in Next.js con URL canoniche, metadati e una base tecnica pronta per la SEO locale.",
  "Itero dopo il lancio: messaggi, recapiti e sezioni crescono insieme alle richieste che arrivano.",
  "Collego il sito a WhatsApp, form e strumenti di lavoro così la richiesta non si perde.",
  "Progetto mobile-first: chi cerca da {{comune}} e dintorni arriva quasi sempre dal telefono.",
  "Tengo testi e struttura onesti: una domanda, una risposta, un passo successivo.",
  "Metto in evidenza provincia e comune dove serve, senza keyword stuffing.",
  "Definisco una CTA primaria (chiamata, WhatsApp o form) e la ripeto nei punti giusti.",
  "Ottimizzo immagini e font per non far aspettare chi naviga in 4G a {{comune}}.",
  "Allineo NAP e messaggi tra sito e canali locali, così Google e i clienti vedono la stessa storia.",
  "Scrivo sezioni servizi corte e concrete: cosa fai, dove, come si inizia.",
  "Uso URL e metadati puliti: niente parametri inutili, canonical chiaro, lingua it-IT.",
  "Se serve, preparo una landing dedicata alle ads senza mischiarla con la vetrina.",
  "Dopo il go-live resto disponibile per ritocchi basati su cosa chiedono davvero i visitatori.",
] as const;

const ctaCopy = [
  "Raccontami il progetto a {{comune}}: ti rispondo con una prima valutazione.",
  "Parliamo di un sito per la tua attività a {{comune}}.",
  "Scrivimi da {{comune}}: capiamo insieme cosa serve davvero online.",
  "Inizia da {{comune}}: un confronto rapido sul sito e sugli obiettivi.",
  "Hai un’attività a {{comune}}? Costruisco la presenza digitale giusta.",
  "Preventivo chiaro per {{comune}} e {{provincia}}: dimmi obiettivo e tempi.",
  "Vuoi un sito a {{comune}} senza giri di parole? Scrivimi due righe.",
  "Da {{comune}} al go-live: partiamo dal brief, non dal template.",
  "Contattami per {{comune}}: ti dico se ha senso rifare, migrare o semplificare.",
  "Un referente per il web a {{comune}} — iniziamo da Contatti o WhatsApp.",
] as const;

const intent = [
  "realizzazione siti web professionali",
  "restyling sito aziendale",
  "sviluppo landing page ad alta conversione",
  "ottimizzazione SEO locale tecnica",
  "consulenza performance e UX",
  "siti per attività locali",
  "digitalizzazione della piccola impresa",
  "pagine pensate per ricerche di zona",
  "siti mobile-first per attività locali",
  "presenza online con WhatsApp e Maps",
  "sito vetrina con SEO locale",
  "migrazione da WordPress a stack moderno",
] as const;

const localProofMetro = [
  "In una città come {{comune}} conti su ricerche competitive: servono messaggi netti e pagine servizi dedicate.",
  "{{comune}} ha volume di ricerca locale alto: il sito deve reggere confronto e chiarezza, non solo estetica.",
  "A {{comune}} chi ti cerca ha alternative: differenzio per offerta, zona e prova concreta.",
] as const;

const localProofCity = [
  "A {{area}} il mix tipico è passaparola + Google: il sito deve chiudere quel percorso.",
  "Per {{comune}} progetto una presenza sobria che funzioni anche fuori dal centro città.",
  "{{comune}} ({{sigla}}): abbastanza grande da meritare SEO locale vera, abbastanza agile da non servire un portale.",
] as const;

const localProofTown = [
  "A {{comune}} spesso bastano poche pagine fatte bene: chi sei, cosa fai, come ti contattano.",
  "Per {{comune}} e i comuni vicini punta a chiarezza e velocità, non a decine di sezioni decorative.",
  "A {{comune}} il sito rafforza fiducia locale: recapiti, zona di intervento, foto vere.",
] as const;

const localProofSmall = [
  "Anche a {{comune}} un dominio proprio batte un profilo social che cambia formato ogni anno.",
  "Per {{comune}} costruisco una base leggera: trovabile, leggibile, aggiornabile senza agenzia.",
  "A {{comune}} il valore è essere raggiungibili: telefono, WhatsApp, orari, servizi in una pagina chiara.",
] as const;

const serviziTitle = [
  "Servizi web a {{comune}} ({{sigla}})",
  "Soluzioni digitali a {{comune}}",
  "Siti e sistemi per attività di {{comune}}",
  "Freelance web: servizi a {{comune}}",
  "Cosa posso fare per te a {{comune}}",
  "Servizi digitali localizzati a {{comune}}",
] as const;

const serviziLead = [
  "A {{comune}} copro siti verticali, landing, prenotazioni, preventivi e digitalizzazione — ogni pagina è pensata per ricerche locali.",
  "Da {{comune}} puoi aprire il servizio che ti riguarda: matrimoni, ristoranti, artigiani, B&B, professionisti e sistemi operativi.",
  "Tutti i servizi jaderweb, localizzati per {{comune}} ({{sigla}}), {{provincia}}.",
  "A {{comune}} in {{regione}} scelgo il pezzo giusto: vetrina, landing ads o flusso di contatto — non un pacchetto anonimo.",
  "Per le attività di {{comune}} elenco i servizi in modo concreto: cosa ottieni e perché serve sul territorio.",
] as const;

const contattiTitle = [
  "Contatti freelance web {{comune}}",
  "Contatti per un sito web a {{comune}}",
  "Parla con il freelance web a {{comune}}",
  "Richiedi un sito a {{comune}} ({{sigla}})",
  "Scrivimi per un progetto a {{comune}}",
  "Preventivo sito web a {{comune}}",
] as const;

const contattiLead = [
  "Contatti freelance web {{comune}}: raccontami l’attività, il territorio e cosa vuoi ottenere online. Ti rispondo con una prima valutazione.",
  "Hai un progetto a {{comune}} o in {{provincia}}? Scrivimi: siti web, landing, prenotazioni e digitalizzazione.",
  "Un referente diretto per {{comune}} ({{sigla}}): niente call center, un confronto concreto sul sito.",
  "Da {{comune}} ti rispondo io: brief corto, perimetro chiaro, niente slide inutili.",
  "Per {{comune}} e {{regione}} parti da Contatti o WhatsApp — stesso numero e stessa email del resto del sito.",
] as const;

const processoTitle = [
  "Processo per un sito web a {{comune}}",
  "Come lavoro a {{comune}}",
  "Dal brief al sito online a {{comune}}",
  "Fasi di lavoro per un sito a {{comune}}",
  "Metodo freelance a {{comune}} ({{sigla}})",
] as const;

const processoLead = [
  "A {{comune}} il metodo non cambia: ascolto, struttura, design, sviluppo, lancio e supporto. Cambiano territorio e intento di ricerca.",
  "Per i progetti a {{comune}} parto dal problema reale — richieste, orari, zona — poi costruisco il sito intorno a quello.",
  "Discovery, strategia e go-live: lo stesso percorso chiaro, applicato alle attività di {{comune}} e {{provincia}}.",
  "A {{comune}} ti dico tempi e pezzi prima di iniziare: niente “poi vediamo” senza accordo.",
  "Brief → bozza → build → online: un flusso lineare per le attività di {{comune}} in {{regione}}.",
] as const;

const percheTitle = [
  "Perché scegliere jaderweb a {{comune}}",
  "Freelance web a {{comune}}: perché me",
  "Sviluppo su misura per {{comune}}",
  "Un referente web per {{comune}}",
  "Perché un sito custom a {{comune}}",
] as const;

const percheLead = [
  "A {{comune}} non vendo un template anonimo: scelgo tecnologia e struttura in base al mestiere e al territorio.",
  "Per {{comune}} punto a codice pulito, performance e un sito che resta tuo, non una piattaforma da cui dipendi.",
  "Attività di {{comune}} e {{provincia}}: un partner che costruisce con te, dalla prima idea alla manutenzione.",
  "A {{comune}} lavoro in prima persona: decisioni rapide, voce unica, niente filiera di account.",
  "Per {{comune}} in {{regione}} preferisco onestà su tempi e costi rispetto a promesse da brochure.",
] as const;

const serviceTitleTemplates = [
  "{{query}} {{comune}}",
  "{{servizio}} a {{comune}} ({{sigla}})",
  "{{query}} a {{comune}}",
  "Realizzazione {{query}} {{comune}}",
  "{{servizio}} per attività a {{comune}}",
  "{{query}} in {{provincia}}: focus {{comune}}",
] as const;

const serviceLead = [
  "A {{comune}} progetto {{servizioLow}}: una pagina chiara per chi cerca questo servizio in zona, con recapito e passo successivo visibili.",
  "Per le attività di {{comune}} ({{sigla}}) il {{servizioLow}} serve a farsi trovare e a raccogliere richieste già complete.",
  "{{servizio}} a {{comune}}: stessa cura del progetto nazionale, testi e metadati allineati al comune e alla {{provincia}}.",
  "Chi cerca {{query}} {{comune}} deve capire in pochi secondi cosa offri e come scriverti. Il sito fa esattamente questo.",
  "A {{comune}} in {{regione}} il {{servizioLow}} parla al cliente locale: zona, tempi, prove e contatto diretto.",
  "Per {{comune}} costruisco {{servizioLow}} senza riempitivi: obiettivo, offerta, CTA.",
] as const;

export function isIndexablePopulation(popolazione: number) {
  return popolazione >= INDEXABLE_POPULATION_THRESHOLD;
}

export function isPreRenderPopulation(popolazione: number) {
  return popolazione >= PRERENDER_POPULATION_THRESHOLD;
}

export function seedFromComune(codice: string) {
  let hash = 5381;
  const input = codice || "comune";
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(seed: number, list: readonly T[], offset: number): T {
  return list[Math.abs(seed + offset) % list.length];
}

function fill(
  template: string,
  values: Record<string, string>,
) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? "");
}

function interpolate(template: string, input: ComuneSeoInput, extra: Record<string, string> = {}) {
  return fill(template, {
    comune: input.nome,
    sigla: input.sigla,
    provincia: input.provincia,
    regione: input.regione,
    ...extra,
  });
}

export function serviceQueryStem(serviceSlug: string) {
  const stems: Record<string, string> = {
    matrimoni: "siti web matrimoni",
    "sagre-eventi": "siti per sagre",
    ristoranti: "siti web ristoranti",
    "bb-case-vacanza": "siti web b&b",
    professionisti: "siti per professionisti",
    "associazioni-sportive": "siti associazioni sportive",
    "band-eventi": "siti web band",
    "agenzie-immobiliari": "siti agenzie immobiliari",
    "eventi-privati": "siti per eventi privati",
    artigiani: "siti web artigiani",
    "landing-ads": "landing page",
    "one-page": "siti one page",
    "sito-48h": "siti web veloci",
    palestre: "siti web palestre",
    "preventivi-online": "preventivi online",
    prenotazioni: "prenotazioni online",
    "cv-portfolio": "portfolio online",
    "eventi-locali": "portali eventi locali",
    digitalizzazione: "digitalizzazione aziendale",
  };
  return stems[serviceSlug] ?? `siti web ${serviceSlug.replace(/-/g, " ")}`;
}

function populationProofPool(popolazione: number) {
  if (popolazione >= 250_000) return localProofMetro;
  if (popolazione >= 50_000) return localProofCity;
  if (popolazione >= 10_000) return localProofTown;
  return localProofSmall;
}

/** Evita «Roma e in Roma» quando nome == provincia. */
function withGeoExtras(input: ComuneSeoInput) {
  const sameName = input.nome.toLowerCase() === input.provincia.toLowerCase();
  return {
    area: sameName
      ? `${input.nome} (${input.sigla})`
      : `${input.nome} e provincia di ${input.provincia}`,
  };
}

export function buildComuneSeo(input: ComuneSeoInput): ComuneSeo {
  const seed = seedFromComune(input.codice);
  const prefix = pick(seed, titlePrefix, 0);
  const chosenIntent = pick(seed, intent, 4);
  const openingText = interpolate(pick(seed, opening, 1), input);
  const angleText = interpolate(pick(seed, angle, 2), input);
  const proofText = interpolate(
    pick(seed, populationProofPool(input.popolazione), 7),
    input,
    withGeoExtras(input),
  );
  const ctaText = interpolate(pick(seed, ctaCopy, 3), input);
  const title = `${prefix} ${input.nome} (${input.sigla})`;
  const description = `${openingText} ${angleText} ${proofText} Focus: ${chosenIntent}.`;

  return {
    title,
    description: description.slice(0, 320),
    canonical: comuneBasePath(input.slug),
    keywords: [
      `siti web ${input.nome}`,
      `creazione siti web ${input.nome}`,
      `freelance web ${input.nome}`,
      `web designer ${input.nome}`,
      `sviluppatore web ${input.nome}`,
      `seo locale ${input.nome}`,
      `creazione siti ${input.provincia}`,
      `siti web ${input.sigla}`,
      `realizzazione siti ${input.regione}`,
      `consulenza web ${input.nome}`,
      `${chosenIntent} ${input.nome}`,
    ],
    opening: openingText,
    angle: `${angleText} ${proofText}`,
    cta: ctaText,
    serviceName: `Servizi web a ${input.nome}`,
    h1: title,
  };
}

export function buildComunePageSeo(
  input: ComuneSeoInput,
  kind: ComunePageKind,
  serviceSlug?: string,
): ComunePageSeo {
  if (kind === "home") {
    const seo = buildComuneSeo(input);
    return {
      title: `${seo.title} | jaderweb`,
      description: seo.description,
      canonical: seo.canonical,
      keywords: seo.keywords,
      h1: seo.h1,
      eyebrow: `SEO locale · ${input.nome}, ${input.sigla}`,
      lead: `${seo.opening} ${seo.angle}`,
      cta: seo.cta,
    };
  }

  const seed = seedFromComune(
    serviceSlug ? `${input.codice}:${kind}:${serviceSlug}` : `${input.codice}:${kind}`,
  );

  if (kind === "servizi") {
    const title = interpolate(pick(seed, serviziTitle, 0), input);
    const lead = interpolate(pick(seed, serviziLead, 1), input);
    return {
      title: `${title} | jaderweb`,
      description: `${lead} Siti verticali, landing e digitalizzazione per ${input.nome}, ${input.provincia}.`,
      canonical: comuneServiziPath(input.slug),
      keywords: [
        `servizi web ${input.nome}`,
        `freelance web ${input.nome}`,
        `siti web ${input.nome}`,
        `digitalizzazione ${input.nome}`,
      ],
      h1: title,
      eyebrow: `Servizi · ${input.nome} (${input.sigla})`,
      lead,
      cta: interpolate(pick(seed, ctaCopy, 3), input),
    };
  }

  if (kind === "contatti") {
    const title = interpolate(pick(seed, contattiTitle, 0), input);
    const lead = interpolate(pick(seed, contattiLead, 1), input);
    return {
      title: `${title} | jaderweb`,
      description: lead,
      canonical: comuneContattiPath(input.slug),
      keywords: [
        `contatti freelance web ${input.nome}`,
        `preventivo sito web ${input.nome}`,
        `freelance web ${input.nome} contatti`,
        `richiedi sito ${input.nome}`,
      ],
      h1: title,
      eyebrow: `Contatti · ${input.nome} (${input.sigla})`,
      lead,
      cta: interpolate(pick(seed, ctaCopy, 2), input),
    };
  }

  if (kind === "processo") {
    const title = interpolate(pick(seed, processoTitle, 0), input);
    const lead = interpolate(pick(seed, processoLead, 1), input);
    return {
      title: `${title} | jaderweb`,
      description: lead,
      canonical: comuneProcessoPath(input.slug),
      keywords: [
        `processo sito web ${input.nome}`,
        `come realizziamo siti a ${input.nome}`,
        `freelance web ${input.nome}`,
      ],
      h1: title,
      eyebrow: `Processo · ${input.nome} (${input.sigla})`,
      lead,
      cta: interpolate(pick(seed, ctaCopy, 0), input),
    };
  }

  if (kind === "perche-noi") {
    const title = interpolate(pick(seed, percheTitle, 0), input);
    const lead = interpolate(pick(seed, percheLead, 1), input);
    return {
      title: `${title} | jaderweb`,
      description: lead,
      canonical: comunePercheNoiPath(input.slug),
      keywords: [
        `freelance web ${input.nome}`,
        `perché jaderweb ${input.nome}`,
        `sviluppo siti ${input.nome}`,
      ],
      h1: title,
      eyebrow: `Perché me · ${input.nome} (${input.sigla})`,
      lead,
      cta: interpolate(pick(seed, ctaCopy, 4), input),
    };
  }

  const service = serviceSlug ? getServicePage(serviceSlug) : undefined;
  const serviceSeo = serviceSlug ? getServiceSeo(serviceSlug) : undefined;
  const query = serviceSlug ? serviceQueryStem(serviceSlug) : "siti web";
  const servizio = service?.name ?? "Servizio web";
  const title = interpolate(pick(seed, serviceTitleTemplates, 0), input, {
    query,
    servizio,
  });
  const lead = interpolate(pick(seed, serviceLead, 1), input, {
    query,
    servizio,
    servizioLow: servizio.toLowerCase(),
  });
  const description = `${lead} ${serviceSeo?.description ?? service?.description ?? ""}`.trim();

  return {
    title: `${title} | jaderweb`,
    description: description.slice(0, 320),
    canonical: comuneServicePath(input.slug, serviceSlug ?? ""),
    keywords: [
      `${query} ${input.nome}`,
      `${servizio} ${input.nome}`,
      `${query} ${input.sigla}`,
      `freelance web ${input.nome}`,
      serviceSeo?.primaryKeyword ? `${serviceSeo.primaryKeyword} ${input.nome}` : `sito ${input.nome}`,
    ],
    h1: title,
    eyebrow: `${servizio} · ${input.nome} (${input.sigla})`,
    lead,
    cta: interpolate(pick(seed, ctaCopy, 3), input),
  };
}

export const HUB_SEO = {
  title: "Creazione siti web a: comuni serviti in Italia | jaderweb",
  description:
    "Freelance web per la creazione di siti web in ogni comune italiano. Trova la pagina del tuo comune: servizi, contatti e soluzioni digitali localizzate.",
  canonical: COMUNI_HUB_PATH,
  keywords: [
    "creazione siti web comuni Italia",
    "siti web comune",
    "freelance web Italia",
    "SEO locale siti web",
  ],
} as const;
