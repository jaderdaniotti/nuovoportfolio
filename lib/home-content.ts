export const site = {
  name: "jaderweb",
  tagline: "Sviluppatore web freelance in Friuli Venezia Giulia.",
  location: "Udine, Friuli Venezia Giulia — Italia",
  email: "jaderdaniotti.lavoro@gmail.com",
  whatsapp: "393513152008",
  phoneDisplay: "+39 351 315 2008",
  year: 2026,
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Processo", href: "/processo" },
  { label: "Perché me", href: "/perche-noi" },
  { label: "Chi sono", href: "/#chi-siamo" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/contatti" },
] as const;

export const footerNavItems = [
  ...navItems,
  { label: "Comuni", href: "/comuni" },
  { label: "Tools", href: "/tools" },
  { label: "Siti web Udine", href: "/udine" },
  { label: "Siti web Gemona", href: "/siti-web/gemona-del-friuli" },
  { label: "Alto Friuli", href: "/siti-web" },
  { label: "Freelance FVG", href: "/friuli" },
  { label: "Costo sito web", href: "/costo-sito-web" },
] as const;

export const homeSeo = {
  title: "Sviluppatore Web Freelance Udine e Gemona | jaderweb",
  description:
    "Sviluppatore web freelance a Udine e Gemona del Friuli. Realizzo siti web, ecommerce e soluzioni digitali su misura per aziende e professionisti.",
  keywords: [
    "sviluppatore web Udine",
    "sviluppatore web freelance Udine",
    "sviluppatore web Gemona del Friuli",
    "sviluppatore web freelance Gemona del Friuli",
    "realizzazione siti web Udine",
    "siti web Udine",
    "siti web Gemona del Friuli",
    "ecommerce Udine",
    "Shopify Udine",
    "sviluppo web su misura",
    "jaderweb",
  ],
} as const;

export const hero = {
  eyebrow: "Sviluppatore web freelance · Udine · Gemona",
  headline: "Siti web, ecommerce e soluzioni digitali su misura",
  subheadline:
    "Sviluppatore web freelance a Udine e Gemona del Friuli. Progetto e realizzo siti web professionali, ecommerce e applicazioni web su misura per aziende, professionisti e attività locali.",
  ctaPrimary: "Richiedi un preventivo",
  ctaSecondary: "Vedi i lavori",
  ctaSecondaryHref: "/portfolio",
} as const;

export const homeLocalIntent = {
  eyebrow: "Udine · Gemona del Friuli",
  lead: "Lavoro come sviluppatore web freelance a Udine e Gemona del Friuli, seguendo progetti per aziende, professionisti e attività locali in Friuli Venezia Giulia.",
  places: [
    {
      name: "Udine",
      href: "/udine",
      heading: "Sviluppatore web freelance a Udine",
      body: "Siti, ecommerce Shopify e sviluppo su misura per chi lavora in città o in provincia. Un referente, preventivo scritto, stack scelto sul progetto vero.",
      cta: "Siti web a Udine",
    },
    {
      name: "Gemona del Friuli",
      href: "/siti-web/gemona-del-friuli",
      heading: "Sviluppo web a Gemona e in Alto Friuli",
      body: "Pagine chiare per negozi, artigiani, professionisti e aziende di Gemona e dei comuni vicini. Base a Udine, progetti sul territorio — senza sede finta in centro.",
      cta: "Siti web a Gemona",
    },
  ],
  serviceLinks: [
    { href: "/servizi", label: "scopri i servizi" },
    { href: "/servizi/professionisti", label: "siti per professionisti" },
    { href: "/costo-sito-web", label: "costo di un sito web" },
  ],
} as const;

export const homeFaqs = [
  {
    question: "Realizzi siti web a Udine e Gemona del Friuli?",
    answer:
      "Sì. Sono un sviluppatore web freelance con base a Udine e seguo Gemona del Friuli e l’Alto Friuli. Il lavoro avviene in call e WhatsApp; un confronto in zona si organizza quando serve.",
  },
  {
    question: "Quanto costa realizzare un sito web?",
    answer:
      "Dipende da pagine, contenuti e se serve un ecommerce o solo una vetrina. Ti mando un preventivo scritto sul tuo caso. I range li spiego nella pagina sul costo del sito, senza listino uguale per tutti.",
  },
  {
    question: "Realizzi ecommerce con Shopify?",
    answer:
      "Sì, quando Shopify è lo strumento giusto: catalogo, pagamenti, spedizioni. Se il flusso non sta in un tema, sviluppiamo una soluzione su misura.",
  },
  {
    question: "Puoi sviluppare funzionalità personalizzate?",
    answer:
      "Sì. Applicazioni web, aree riservate, form, integrazioni e automazioni: Next.js e Node.js quando un template non basta.",
  },
  {
    question: "Ti occupi anche di manutenzione e assistenza?",
    answer:
      "Sì. Dopo il lancio resto il referente per ritocchi, aggiornamenti e piccole evoluzioni, così il sito non resta fermo al giorno della pubblicazione.",
  },
] as const;

/** Live site previews in hero mockups. Screens: desktop 1440×900, mobile 390×844. */
export const heroMockups = [
  {
    name: "Como Private Driver",
    url: "https://www.comoprivatedriver.it/",
    desktopSrc: "/img/projects/comoprivatedriverpc.png",
    mobileSrc: "/img/projects/comoprivatedrivermobile.png",
  },
  {
    name: "Eleonora Politi Photographer",
    url: "https://eleonorapolitiphotographer.it/",
  },
  {
    name: "Gioia Capelli",
    url: "https://gioiacapelli.it/",
  },
  {
    name: "Spazio AC",
    desktopSrc: "/img/projects/spazioacpc.png",
    mobileSrc: "/img/projects/spazioacmobile.png",
  },
] as const;

export const authorityStrip = {
  marqueeText: "SITI WEB ✦ ECOMMERCE ✦ SVILUPPO WEB ✦ UDINE ✦ GEMONA ✦ ",
  tagline: "Dalla prima idea al progetto online.",
} as const;

export const scrollExpandSection = {
  title: "un referente digitale unico",
  scrollHint: "Scroll",
  imageSrcLight: "/img/sezione2bgchiaro.jpg",
  imageSrcDark: "/img/sezione2bgscuro.jpg",
  imageAlt: "Lavoro su un progetto digitale",
  services: [
    { label: "Siti web", icon: "/img/svg/sitiweb.svg" },
    { label: "Ecommerce", icon: "/img/svg/ecommerce.svg" },
    { label: "Automazioni", icon: "/img/svg/automazioni.svg" },
    { label: "Brand identity", icon: "/img/svg/brandidentity.svg" },
    { label: "Ads", icon: "/img/svg/ads.svg" },
  ],
} as const;

export const serviceCategories = [
  {
    number: "01",
    title: "Realizzazione siti web",
    description:
      "Siti web professionali e personalizzati per aziende, professionisti e attività locali a Udine, Gemona del Friuli e in Friuli Venezia Giulia.",
    items: [
      "Siti vetrina",
      "Landing page",
      "Blog",
      "Siti corporate",
      "Sviluppo custom",
    ],
  },
  {
    number: "02",
    title: "Ecommerce",
    description:
      "Realizzazione di ecommerce e negozi online con Shopify o soluzioni personalizzate.",
    items: [
      "Shopify",
      "E-commerce custom",
      "Pagamenti online",
      "Automazioni",
      "Integrazioni",
    ],
  },
  {
    number: "03",
    title: "Sviluppo web su misura",
    description:
      "Sviluppo di applicazioni web, portali e funzionalità personalizzate con Next.js, Node.js e tecnologie moderne.",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "API",
      "Web application",
      "Database",
      "Integrazioni",
    ],
  },
  {
    number: "04",
    title: "Automazioni",
    description:
      "Automazioni web e integrazioni per semplificare attività ripetitive e processi aziendali.",
    items: ["Bot", "Automazioni", "API", "Workflow", "Integrazione tra servizi"],
  },
] as const;

export const portfolioProjects = [
  {
    title: "Eleonora Politi Photographer",
    tags: "Fotografia",
    summary:
      "Sito web professionale per una fotografa, con portfolio, servizi e contatti.",
    url: "https://eleonorapolitiphotographer.it/",
  },
  {
    title: "Como Private Driver",
    tags: "NCC e turismo",
    summary:
      "Sito web per un servizio di noleggio con conducente e itinerari turistici.",
    url: "https://www.comoprivatedriver.it/",
    desktopSrc: "/img/projects/comoprivatedriverpc.png",
  },
  {
    title: "Gioia Capelli",
    tags: "Attività commerciale",
    summary: "Sito web per un’attività retail, con presentazione e contatti.",
    url: "https://gioiacapelli.it/",
  },
  {
    title: "Pompe Funebri Tortarolo e Conti",
    tags: "Sito aziendale",
    summary:
      "Sito web aziendale per un’impresa di onoranze: servizi, informazioni e recapito.",
    url: "https://www.pompefunebritortaroloeconti.it/",
  },
  {
    title: "Como Lake Suites",
    tags: "Struttura ricettiva",
    summary: "Sito web per una struttura ricettiva, con soggiorni e contatti.",
    url: "https://www.comolakesuites.eu/",
  },
  {
    title: "Lake Como in Car",
    tags: "NCC e turismo",
    summary: "Sito web per un servizio di transfer e tour sul territorio.",
    url: "https://www.lakecomoincar.eu/it",
  },
  {
    title: "Authentic Pasta Lab",
    tags: "Food",
    summary: "Sito web per un’attività food, con proposta e identità visiva.",
    url: "https://authenticpastalab.vercel.app/",
  },
  {
    title: "Al Posta",
    tags: "Ristorazione",
    summary: "Sito web per un locale di ristorazione.",
    url: "https://alposta.vercel.app/",
  },
] as const;

export const differentiation = {
  title: "Non sono qui per venderti un sito.",
  body: "Parto dal tuo business, dagli obiettivi e da chi vuoi raggiungere. Poi scelgo tecnologia ed esperienza intorno a quello che ti serve: un sito, un ecommerce o uno sviluppo su misura.",
  points: [
    {
      title: "Strategia",
      description: "Prima capiamo insieme il problema.",
      icon: "/img/svg/strategia.svg",
    },
    {
      title: "Design",
      description: "Costruisco un'esperienza coerente con il brand.",
      icon: "/img/svg/design.svg",
    },
    {
      title: "Development",
      description: "Trasformo il progetto in un prodotto digitale reale.",
      icon: "/img/svg/development.svg",
    },
    {
      title: "Crescita",
      description: "Ti accompagno anche dopo la pubblicazione.",
      icon: "/img/svg/crescita.svg",
    },
  ],
} as const;

export const processSection = {
  title: "Dal primo messaggio al lancio.",
  body: "Un percorso chiaro per realizzare siti web e applicazioni: dalla prima conversazione al go-live, e oltre.",
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Capisco attività, obiettivi e se serve un sito, un ecommerce o uno sviluppo su misura.",
  },
  {
    number: "02",
    title: "Strategia",
    description: "Definisco struttura, funzionalità e direzione del progetto.",
  },
  {
    number: "03",
    title: "Design",
    description: "Progetto l’esperienza visiva intorno al brand e a chi deve usare il sito.",
  },
  {
    number: "04",
    title: "Development",
    description: "Sviluppo il sito o l’applicazione con lo stack adatto al lavoro.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Testo, ottimizzo e pubblico.",
  },
  {
    number: "06",
    title: "Support",
    description: "Resto disponibile per manutenzione, ritocchi e crescita dopo il lancio.",
  },
] as const;

export const technologies = {
  title: "La tecnologia dietro i miei progetti.",
  body: "Sviluppo su misura con Next.js, React, Node.js e Shopify quando serve un negozio online — stack moderno, siti veloci e facili da mantenere.",
  stack: [
    "Next.js",
    "Node.js",
    "Shopify",
    "Linux",
    "Vercel",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "MySQL",
  ] as const,
} as const;

export const testimonialsSection = {
  label: "Testimonianze",
  title: "Le parole dei miei clienti.",
  body: "Recensioni vere su Google: disponibilità, tempi e un sito che rappresenta chi lo chiede.",
  items: [
    {
      quote:
        "Jader mi ha fatto il sito per il mio negozio, persona molto disponibile, competente e che cerca di soddisfarti in qualsiasi modo.",
      name: "Mariangela Basilico",
      role: "Recensione Google",
    },
    {
      quote:
        "Grande Jader! Super professionale e veloce, ottimo rapporto qualità prezzo! Ve lo consiglio ❤️",
      name: "Eleonora",
      role: "Recensione Google",
    },
    {
      quote:
        "Mi sono affidata a Jader per la realizzazione del mio sito internet e non potrei essere più soddisfatta della scelta.",
      name: "Carlotta Conti",
      role: "Recensione Google",
    },
    {
      quote:
        "Ha realizzato il mio sito per noleggio di Suites in centro a Como. Nulla da dire, sito impeccabile, tempistiche ottime, sempre disponibile per qualsiasi modifica e richiesta, prezzo molto competitivo per il servizio offerto.",
      name: "Marilena Mastaglio",
      role: "Recensione Google",
    },
    {
      quote:
        "Consiglio a tutti, mi ha accompagnato dall'inizio alla fine durante la partenza con la mia società di NCC.",
      name: "Samuel Abate",
      role: "Recensione Google",
    },
    {
      quote:
        "Professionista molto serio e disponibile, ha realizzato il nostro sito in poco tempo facendo attenzione ad ogni minimo dettaglio, curando il tutto come richiesto. Lo stra consiglio!",
      name: "Letyzia Favit",
      role: "Recensione Google",
    },
    {
      quote:
        "Fin dall'inizio Jader mi ha consigliato e modellato la mia idea nei minimi dettagli! Un professionista, mi ha consegnato il tutto nei tempi stabiliti! Lavoro di qualità e dettagliato in tutto! Consigliato",
      name: "Stefania",
      role: "Recensione Google",
    },
    {
      quote:
        "Lavorare con Jader è stato un vero piacere! Ha un gusto pazzesco.",
      name: "Ugnė Norbutaitė",
      role: "Recensione Google",
    },
    {
      quote:
        "Chiarezza fin dall'inizio e comunicazione facile e rapida. Jader è un professionista, mi ha creato un sito web unico! Esperto nel correggere i minimi dettagli.",
      name: "Marco Ricci",
      role: "Recensione Google",
    },
    {
      quote:
        "Veramente soddisfatta. Un risultato perfetto! Jader mi ha aiutata a creare finalmente un prodotto di qualità.",
      name: "Lidya M",
      role: "Recensione Google",
    },
    {
      quote:
        "Web Designer professionista e risultato perfetto! Tempistiche rispettate e precisione nei dettagli! Finalmente ho il mio sito web! Raccomandato se cerchi un lavoro di qualità e professionale! Grazie!",
      name: "Damiano Sain",
      role: "Recensione Google",
    },
    {
      quote:
        "Ottimo servizio, eccellente lavoro rapido e di qualità. Contatto chiaro e trasparente fin dall'inizio, lo consiglio a chiunque abbia bisogno di creare uno store online o sito web!",
      name: "Anna",
      role: "Recensione Google",
    },
    {
      quote:
        "Mi sono trovato benissimo. Ha realizzato il mio sito web in modo impeccabile: moderno, curato nei dettagli.",
      name: "Stefano Erde",
      role: "Recensione Google",
    },
    {
      quote:
        "Una persona professionale e ti sa accontentare su quello di cui hai bisogno.",
      name: "Matteo Chelini",
      role: "Recensione Google",
    },
    {
      quote:
        "Ho avuto il piacere di collaborare con Jader per la realizzazione del mio sito internet, rimanendo soddisfatta del risultato.",
      name: "Lavinia Pezzetta",
      role: "Recensione Google",
    },
    {
      quote:
        "Che dire, Jader è un mago del web! Ha trasformato le mie idee in un sito spettacolare, curando tutto nei minimi dettagli.",
      name: "Daniele Nisticò",
      role: "Recensione Google",
    },
  ],
} as const;

export const caseStudy = {
  title: "Da un'idea a un e-commerce pronto a vendere.",
  client: "Cliente retail",
  sector: "Fashion & lifestyle",
  solution: "Shopify",
  services: "Design · Development · E-commerce · Automazioni",
  result:
    "Un percorso completo: dalla struttura del catalogo al go-live, con un'esperienza di acquisto semplice e coerente con il brand.",
} as const;

export const localSection = {
  title: "Sviluppatore web freelance a Udine.",
  titleLine2: "Progetti anche a Gemona e in FVG.",
  body: "Lavoro come sviluppatore web freelance a Udine e Gemona del Friuli, con aziende, professionisti e attività locali in Friuli Venezia Giulia. Realizzo siti anche per Buja, Artegna, Osoppo, Venzone, Tarcento, Majano e i comuni vicini.",
  areas: [
    "Gemona del Friuli",
    "Alto Friuli",
    "Udine",
    "Friuli Venezia Giulia",
    "Italia",
  ] as const,
} as const;

export const founderSection = {
  eyebrow: "Il referente",
  title: "Chi c’è dietro i lavori del web",
  body: "Sono Jader, sviluppatore web freelance. Aiuto aziende, professionisti e attività locali a realizzare siti web, ecommerce e soluzioni digitali su misura. Opero principalmente tra Udine, Gemona del Friuli e il resto del Friuli Venezia Giulia.",
  name: "Jader",
  titleRole: "Sviluppatore web freelance",
  handle: "jaderweb",
  status: "jaderweb.com",
  contactText: "Visita il sito",
  siteUrl: "https://jaderweb.com",
  avatarLight: "/img/jader/logopurple.png",
  avatarDark: "/img/jader/logogrigio.png",
} as const;

export const finalCta = {
  title: "Hai un progetto in mente?",
  body: "Se sei a Udine, Gemona del Friuli o in Friuli Venezia Giulia, scrivimi cosa ti serve. Ti rispondo io, con una prima valutazione e un preventivo chiaro.",
  cta: "Richiedi un preventivo",
  alt: "Oppure scrivici direttamente",
} as const;

export const contactForm = {
  tabs: {
    privato: "Privato",
    azienda: "Azienda",
  },
  optionalHint: "facoltativo",
  fields: {
    fullName: "Nome e cognome",
    companyName: "Nome azienda",
    contactPerson: "Nome referente",
    vat: "Partita IVA",
    phone: "Telefono",
    email: "Email",
    website: "Sito web attuale",
    service: "Tipo di servizio",
    budget: "Budget",
    message: "Raccontami il progetto",
    privacy: "Ho letto e accetto l'informativa sulla privacy.",
  },
  placeholders: {
    service: "Seleziona un servizio",
    budget: "Seleziona un range",
  },
  services: [
    "Siti Web",
    "E-commerce",
    "Web Development",
    "Automazioni",
    "Brand identity",
    "Ads",
    "Altro",
  ],
  budgets: [
    "Da definire",
    "Fino a 2.000 €",
    "2.000 – 5.000 €",
    "5.000 – 10.000 €",
    "Oltre 10.000 €",
  ],
} as const;

export const footerLegal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie" },
] as const;
