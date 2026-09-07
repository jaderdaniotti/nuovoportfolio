export const site = {
  name: "jaderweb",
  tagline: "Digital solutions for ambitious businesses.",
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
] as const;

export const hero = {
  eyebrow: "FREELANCER · UDINE",
  headline: "Costruisco esperienze digitali che fanno crescere il tuo business.",
  subheadline:
    "Progetto e sviluppo siti web, e-commerce e soluzioni digitali su misura per aziende e professionisti.",
  ctaPrimary: "Inizia un progetto",
  ctaSecondary: "Scopri cosa faccio",
} as const;

/** Live site previews in hero mockups. Screens: desktop 1440×900, mobile 390×844. */
export const heroMockups = [
  {
    name: "Como Private Driver",
    url: "https://www.comoprivatedriver.it/",
    desktopSrc: "/img/projects/comoprivatedriverpc.png",
    mobileSrc: "/img/projects/comoprivatedrivermobile.png",
  },
  {
    name: "jaderweb",
    url: "https://jaderweb.com/",
    desktopSrc: "/img/projects/jaderwebpc.png",
    mobileSrc: "/img/projects/jaderwebmobile.png",
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
  marqueeText: "WEB ✦ E-COMMERCE ✦ DEVELOPMENT ✦ AUTOMATION ✦ ",
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
    title: "Siti Web",
    description:
      "Siti web progettati per rappresentare il tuo brand e trasformare visitatori in clienti.",
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
    title: "E-commerce",
    description:
      "Costruisco e-commerce pensati per vendere, semplici da gestire e pronti a crescere.",
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
    title: "Web Development",
    description:
      "Quando un template non basta, sviluppo la soluzione da zero.",
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
      "Riduco le attività manuali trasformandole in processi automatici.",
    items: ["Bot", "Automazioni", "API", "Workflow", "Integrazione tra servizi"],
  },
] as const;

export const portfolioProjects = [
  {
    title: "jaderweb",
    tags: "WEB DESIGN · NEXT.JS",
    url: "https://jaderweb.com/",
    desktopSrc: "/img/projects/jaderwebpc.png",
  },
  {
    title: "Eleonora Politi Photographer",
    tags: "PORTFOLIO · PHOTOGRAPHY",
    url: "https://eleonorapolitiphotographer.it/",
  },
  {
    title: "Como Private Driver",
    tags: "HOSPITALITY · WEB",
    url: "https://www.comoprivatedriver.it/",
    desktopSrc: "/img/projects/comoprivatedriverpc.png",
  },
  {
    title: "Gioia Capelli",
    tags: "RETAIL · WEB",
    url: "https://gioiacapelli.it/",
  },
  {
    title: "Pompe Funebri Tortarolo e Conti",
    tags: "CORPORATE · WEB",
    url: "https://www.pompefunebritortaroloeconti.it/",
  },
  {
    title: "Como Lake Suites",
    tags: "HOSPITALITY · WEB",
    url: "https://www.comolakesuites.eu/",
  },
  {
    title: "Lake Como in Car",
    tags: "HOSPITALITY · WEB",
    url: "https://www.lakecomoincar.eu/it",
  },
  {
    title: "Authentic Pasta Lab",
    tags: "FOOD · WEB",
    url: "https://authenticpastalab.vercel.app/",
  },
  {
    title: "Al Posta",
    tags: "FOOD · WEB",
    url: "https://alposta.vercel.app/",
  },
] as const;

export const differentiation = {
  title: "Non sono qui per venderti un sito.",
  body: "Parto dal tuo business, dagli obiettivi e dalle persone che vuoi raggiungere. Progetto quindi la tecnologia e l'esperienza digitale intorno alle tue esigenze.",
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
  body: "Un percorso chiaro, trasparente e collaborativo: dalla prima conversazione al go-live, e oltre.",
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Parliamo del progetto e degli obiettivi.",
  },
  {
    number: "02",
    title: "Strategia",
    description: "Definisco insieme struttura, funzionalità e direzione.",
  },
  {
    number: "03",
    title: "Design",
    description: "Creo l'esperienza visiva.",
  },
  {
    number: "04",
    title: "Development",
    description: "Sviluppo il progetto.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Testo, ottimizzo e pubblico.",
  },
  {
    number: "06",
    title: "Support",
    description: "Continuo a seguirti dopo il lancio.",
  },
] as const;

export const technologies = {
  title: "La tecnologia dietro i miei progetti.",
  body: "Uso tecnologie moderne per creare prodotti digitali veloci, scalabili e facilmente mantenibili.",
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
  title: "Freelance web a Udine.",
  titleLine2: "Progetti digitali ovunque.",
  body: "Sono un freelance web con base a Udine e lavoro con aziende, professionisti e realtà che vogliono costruire una presenza digitale realmente efficace.",
  areas: ["Udine", "Friuli Venezia Giulia", "Milano", "Italia"] as const,
} as const;

export const founderSection = {
  eyebrow: "Il referente",
  title: "Chi c’è dietro i lavori del web",
  body: "Jader è lo sviluppatore che si occuperà del tuo progetto: un referente unico con cui condividerai il percorso di creazione digitale, dalla prima idea al sito online.",
  name: "Jader",
  titleRole: "Sviluppatore",
  handle: "jaderweb",
  status: "jaderweb.com",
  contactText: "Visita il sito",
  siteUrl: "https://jaderweb.com",
  avatarLight: "/img/jader/logopurple.png",
  avatarDark: "/img/jader/logogrigio.png",
} as const;

export const finalCta = {
  title: "Hai un progetto in mente?",
  body: "Raccontami cosa vuoi costruire. Ti rispondo con una prima valutazione del progetto.",
  cta: "Raccontami il tuo progetto",
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
