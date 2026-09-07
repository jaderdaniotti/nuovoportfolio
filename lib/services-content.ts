export const servicesPage = {
  eyebrow: "Servizi",
  title: "Non ti vendo un sito.",
  titleLine2: "Costruisco la soluzione giusta per il tuo mestiere.",
  body: "Template verticali, prodotti rapidi e sistemi su misura: dal matrimonio al ristorante, dalla palestra all’artigiano. Ogni progetto parte da un modello già pensato per il tuo settore.",
  cta: "Parliamo del tuo progetto",
} as const;

export const serviceHighlights = [
  {
    slug: "sito-48h",
    title: "Sito pronto in 48/72 ore",
    body: "Scegli un template, mi dai logo, foto e testi. Li personalizzo e pubblico. Una linea pensata per chi ha i materiali pronti e vuole partire in pochi giorni.",
    points: ["10–20 template", "Personalizzazione", "Pubblicazione inclusa"],
  },
  {
    slug: "one-page",
    title: "OnePage Start",
    body: "Una pagina chiara, responsive, con SEO base, WhatsApp, Maps e social. Per chi vuole una presenza digitale essenziale, senza un progetto complesso.",
    points: ["Una pagina", "Dominio e pubblicazione", "Contatti e WhatsApp"],
  },
  {
    slug: "digitalizzazione",
    title: "Digitalizzazione azienda",
    body: "Non un sito isolato: sito, dominio, email, Google Business, form, automazioni, CRM, SEO base e manutenzione. Un referente unico per digitalizzare l’attività.",
    points: ["Sito + email + dominio", "Automazioni e CRM", "Manutenzione"],
  },
] as const;

export const serviceGroups = [
  {
    id: "verticali",
    label: "Template verticali",
    title: "Un modello già pensato per il tuo settore.",
  },
  {
    id: "prodotti",
    label: "Prodotti rapidi",
    title: "Online in pochi giorni, con un percorso definito.",
  },
  {
    id: "sistemi",
    label: "Sistemi e prodotti",
    title: "Oltre la vetrina: prenotazioni e preventivi.",
  },
] as const;

export const serviceOffers = [
  {
    group: "verticali",
    slug: "matrimoni",
    icon: "heart",
    title: "Siti per matrimoni",
    emoji: "💍",
    summary:
      "Il sito degli sposi: RSVP, countdown, mappa, lista nozze e galleria. Template personalizzabili in colori, foto e testi.",
    features: [
      "RSVP online",
      "Countdown",
      "Mappa location",
      "Lista nozze",
      "Galleria",
      "Hotel e parcheggi",
    ],
  },
  {
    group: "verticali",
    slug: "sagre-eventi",
    icon: "tent",
    title: "Sagre ed eventi comunali",
    emoji: "🎪",
    summary:
      "Un prodotto replicabile per sagre e feste: programma, espositori, menù, sponsor e countdown. Lo stesso sistema, adattato a ogni comune.",
    features: [
      "Programma",
      "Calendario",
      "Mappa",
      "Espositori",
      "Menù",
      "Volontari",
    ],
  },
  {
    group: "verticali",
    slug: "ristoranti",
    icon: "utensils",
    title: "Ristoranti con prenotazione",
    emoji: "🍕",
    summary:
      "Oltre a Home, Menù, Contatti: menù digitale, tavoli, eventi, QR code, recensioni e WhatsApp.",
    features: [
      "Menù digitale",
      "Prenotazione tavoli",
      "QR code",
      "Eventi",
      "Ordini online",
      "Recensioni",
    ],
  },
  {
    group: "verticali",
    slug: "bb-case-vacanza",
    icon: "house",
    title: "B&B e case vacanza",
    emoji: "🏠",
    summary:
      "Pacchetto B&B Online: camere, disponibilità, prenotazione, galleria, guida del territorio e multilingua.",
    features: [
      "Camere",
      "Calendario",
      "Prenotazione",
      "Pagamenti",
      "Guida turistica",
      "Multilingua",
    ],
  },
  {
    group: "verticali",
    slug: "professionisti",
    icon: "briefcase",
    title: "Siti per professionisti",
    emoji: "💼",
    summary:
      "Non un generico sito professionale: modelli per commercialista, avvocato, architetto, fotografo, psicologo e altre professioni.",
    features: [
      "Commercialista",
      "Avvocato",
      "Architetto",
      "Fotografo",
      "Geometra",
      "Psicologo",
    ],
  },
  {
    group: "verticali",
    slug: "associazioni-sportive",
    icon: "trophy",
    title: "Associazioni sportive",
    emoji: "⚽",
    summary:
      "Calendario, risultati, rosa, staff e iscrizioni. Un sistema da offrire alle società con canone annuale.",
    features: [
      "Calendario partite",
      "Risultati",
      "Rosa",
      "Sponsor",
      "Iscrizioni",
      "News",
    ],
  },
  {
    group: "verticali",
    slug: "band-eventi",
    icon: "music",
    title: "Band ed eventi musicali",
    emoji: "🎸",
    summary:
      "Biografia, date, media e booking per musicisti, DJ e band. Un template moderno, pensato per il prossimo ingaggio.",
    features: [
      "Calendario concerti",
      "Foto e video",
      "Spotify / YouTube",
      "Instagram",
      "Preventivo",
      "Booking",
    ],
  },
  {
    group: "verticali",
    slug: "agenzie-immobiliari",
    icon: "building",
    title: "Agenzie immobiliari",
    emoji: "🏢",
    summary:
      "Ogni immobile con foto, prezzo, planimetria, video e richiesta appuntamento. Più una ricerca avanzata del catalogo.",
    features: [
      "Schede immobili",
      "Planimetria",
      "Video",
      "Ricerca avanzata",
      "Richiesta info",
      "Appuntamenti",
    ],
  },
  {
    group: "verticali",
    slug: "eventi-privati",
    icon: "party",
    title: "Eventi privati",
    emoji: "🎉",
    summary:
      "Compleanni, lauree, battesimi, feste aziendali. Un Event Website con QR code da mettere sugli inviti.",
    features: [
      "Pagina evento",
      "QR code",
      "Info location",
      "Galleria",
      "RSVP",
      "Countdown",
    ],
  },
  {
    group: "verticali",
    slug: "artigiani",
    icon: "hammer",
    title: "Siti per artigiani",
    emoji: "🔨",
    summary:
      "Template per falegnami, idraulici, elettricisti, muratori. Il cuore è “Richiedi preventivo”, anche con foto del lavoro.",
    features: [
      "Preventivo",
      "Upload foto",
      "Servizi",
      "Zona di intervento",
      "WhatsApp",
      "Recensioni",
    ],
  },
  {
    group: "prodotti",
    slug: "landing-ads",
    icon: "megaphone",
    title: "Landing per campagne ads",
    emoji: "📣",
    summary:
      "Pagine dedicate alle campagne Instagram e Google: offerta, vantaggi, form, WhatsApp e tracking. Consegnate in tempi rapidi.",
    features: [
      "Offerta chiara",
      "CTA",
      "Form",
      "WhatsApp",
      "Tracking",
      "Testimonianze",
    ],
  },
  {
    group: "prodotti",
    slug: "one-page",
    icon: "layout",
    title: "OnePage Start",
    emoji: "📄",
    summary:
      "Una pagina, responsive, SEO base, contatti e pubblicazione. Per chi deve partire subito con una presenza essenziale.",
    features: [
      "Una pagina",
      "SEO base",
      "WhatsApp",
      "Google Maps",
      "Social",
      "Dominio",
    ],
  },
  {
    group: "prodotti",
    slug: "sito-48h",
    icon: "zap",
    title: "Sito in 48/72 ore",
    emoji: "⚡",
    summary:
      "Il cliente sceglie il template e fornisce i materiali. Li personalizzo e pubblico, in tempi rapidi.",
    features: [
      "Scelta template",
      "Logo e testi",
      "Personalizzazione",
      "Pubblicazione",
      "Tempi certi",
      "Identità visiva",
    ],
  },
  {
    group: "sistemi",
    slug: "palestre",
    icon: "dumbbell",
    title: "Palestre e personal trainer",
    emoji: "🏋️",
    summary:
      "Non una vetrina: prenotazione corsi, schede, abbonamenti e comunicazioni. Uno strumento per gestire palestra e clienti.",
    features: [
      "Prenotazione corsi",
      "Calendario",
      "Schede",
      "Abbonamenti",
      "Pagamenti",
      "Notifiche",
    ],
  },
  {
    group: "sistemi",
    slug: "preventivi-online",
    icon: "clipboard",
    title: "Sistema preventivi online",
    emoji: "📋",
    summary:
      "Il cliente sceglie il servizio, indica metri quadri, carica foto e riceve un preventivo ordinato. Per imprese edili e artigiani.",
    features: [
      "Scelta servizio",
      "Metrature",
      "Upload foto",
      "Zona",
      "Tempistiche",
      "Richiesta unica",
    ],
  },
  {
    group: "sistemi",
    slug: "prenotazioni",
    icon: "calendar",
    title: "Portali di prenotazione",
    emoji: "📅",
    summary:
      "Calendario + prenotazione + email/WhatsApp per parrucchieri, estetisti, tatuatori, officine e consulenti.",
    features: [
      "Calendario",
      "Prenotazione",
      "Promemoria",
      "WhatsApp",
      "Email",
      "Staff",
    ],
  },
  {
    group: "sistemi",
    slug: "cv-portfolio",
    icon: "id-card",
    title: "Portfolio e CV online",
    emoji: "🪪",
    summary:
      "Una pagina professionale per sviluppatori, designer, fotografi e freelance: progetti, competenze e download CV.",
    features: [
      "Portfolio",
      "Competenze",
      "Progetti",
      "Esperienze",
      "Download CV",
      "Contatti",
    ],
  },
  {
    group: "sistemi",
    slug: "eventi-locali",
    icon: "map",
    title: "Portali per eventi locali",
    emoji: "📍",
    summary:
      "Un aggregatore di sagre, concerti e mercatini. Gli organizzatori pagano per mettere in evidenza l’evento. Un prodotto tuo, non solo un lavoro per clienti.",
    features: [
      "Calendario eventi",
      "Categorie",
      "Mappa",
      "Evidenza a pagamento",
      "Schede evento",
      "Contatti",
    ],
  },
  {
    group: "sistemi",
    slug: "digitalizzazione",
    icon: "rocket",
    title: "Digitalizzazione dell’azienda",
    emoji: "🚀",
    summary:
      "Il pacchetto completo: sito, dominio, email, Google Business, form, automazioni, CRM, SEO e manutenzione.",
    features: [
      "Sito e dominio",
      "Email professionale",
      "Google Business",
      "Automazioni",
      "CRM",
      "Manutenzione",
    ],
  },
] as const;

const SERVICE_EMOJI_FILES: Record<string, string> = {
  matrimoni: "matrimoni.svg",
  "sagre-eventi": "sagre.svg",
  ristoranti: "cibo.svg",
  "bb-case-vacanza": "bnb.svg",
  professionisti: "professionisti.svg",
  "associazioni-sportive": "associazionisportive.svg",
  "band-eventi": "musicali.svg",
  "agenzie-immobiliari": "immobiliari.svg",
  "eventi-privati": "eventiprivati.svg",
  artigiani: "artigiani.svg",
  "one-page": "onepage.svg",
  "sito-48h": "48_72ore.svg",
  palestre: "palestre.svg",
  "preventivi-online": "preventivi.svg",
  prenotazioni: "prenotazione.svg",
  "cv-portfolio": "portfolio.svg",
  "eventi-locali": "eventi.svg",
  digitalizzazione: "digitalizzazione.svg",
};

const SERVICE_EMOJI_DIR = "/img/pagina-servizi";

export function getServiceEmojiSrc(slug: string) {
  const file = SERVICE_EMOJI_FILES[slug];
  return file ? `${SERVICE_EMOJI_DIR}/${file}` : "";
}

export const serviceIndexItems = serviceOffers.map((offer) => ({
  link: `/servizi/${offer.slug}`,
  text: offer.title,
  image: getServiceEmojiSrc(offer.slug),
  emoji: offer.emoji,
}));
