export const contactPage = {
  eyebrow: "Contatti",
  title: "Hai un'idea?",
  titleLine2: "Parliamone.",
  subtitle:
    "Che tu abbia già un progetto definito o solamente un'idea, raccontaci cosa hai in mente. Troveremo insieme il modo migliore per trasformarla in qualcosa di reale.",
  stack: ["WEB", "E-COMMERCE", "AUTOMATION", "DIGITAL"] as const,
} as const;

export const contactModes = {
  title: "Come vuoi raccontarci il progetto?",
  quick: {
    id: "quick" as const,
    label: "Form rapido",
    time: "circa 1 min",
  },
  detailed: {
    id: "detailed" as const,
    label: "Form dettagliato",
    time: "circa 3 min",
  },
} as const;

export type ContactMode = (typeof contactModes.quick.id) | (typeof contactModes.detailed.id);

export const contactGoals = [
  "Sito web",
  "E-commerce",
  "Landing page",
  "Web application",
  "Sistema di prenotazione",
  "Automazione",
  "Configuratore",
  "Digitalizzazione aziendale",
  "Brand identity",
  "Ads",
  "Altro",
] as const;

export const contactAfter = {
  title: "E ora?",
  body: "Dopo l'invio non resti in attesa al buio. Questo è quello che succede.",
  steps: [
    {
      number: "01",
      title: "Riceviamo la tua richiesta",
      description:
        "Leggiamo il progetto e analizziamo quello che ci hai raccontato.",
    },
    {
      number: "02",
      title: "Ci conosciamo",
      description:
        "Ti ricontattiamo per capire meglio esigenze, obiettivi e funzionalità.",
    },
    {
      number: "03",
      title: "Troviamo la soluzione",
      description:
        "Valutiamo insieme tecnologia, struttura e approccio più adatti.",
    },
    {
      number: "04",
      title: "Si parte",
      description:
        "Definisco il progetto e iniziamo a trasformare l'idea in qualcosa di reale.",
    },
  ],
} as const;

export const contactDirect = {
  title: "Preferisci scriverci direttamente?",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappCta: "Scrivici su WhatsApp",
  whereLabel: "Dove siamo",
} as const;

export const contactClose = {
  title: "Non hai ancora un progetto preciso?",
  highlight: "Nessun problema.",
  body: "Non serve arrivare da me con tutto già deciso. Raccontami semplicemente cosa vorresti migliorare, cosa non funziona o cosa vorresti costruire.",
  cta: "Parliamone",
} as const;

export const contactFormCopy = {
  next: "Avanti",
  back: "Indietro",
  submit: "Iniziamo a parlarne",
  success: "Grazie. Ti ricontattiamo a breve.",
  error: "Completa i campi obbligatori per continuare.",
  steps: {
    who: {
      number: "01",
      title: "Chi sei?",
    },
    what: {
      number: "02",
      title: "Cosa vuoi realizzare?",
      hint: "Puoi selezionarne più di uno.",
    },
    project: {
      number: "03",
      title: "Parlaci del progetto",
      hint: "Raccontami cosa hai in mente, cosa vorresti ottenere e qualsiasi informazione che pensi possa essere utile.",
    },
    website: {
      number: "04",
      title: "Hai già qualcosa online?",
      hint: "Lascia vuoto se non hai ancora un sito.",
    },
    contact: {
      number: "05",
      title: "Come posso contattarti?",
    },
    quickContact: {
      number: "03",
      title: "Come posso contattarti?",
    },
  },
} as const;
