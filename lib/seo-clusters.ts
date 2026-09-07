export const SEO_CLUSTERS = {
  "attivita-locali": {
    id: "attivita-locali",
    name: "Siti web per attività locali",
    description:
      "Presenza digitale per ristoranti, artigiani, B&B, palestre, studi e attività del territorio.",
    slugs: [
      "ristoranti",
      "artigiani",
      "palestre",
      "bb-case-vacanza",
      "professionisti",
      "associazioni-sportive",
      "band-eventi",
      "agenzie-immobiliari",
    ],
  },
  eventi: {
    id: "eventi",
    name: "Siti per eventi",
    description:
      "Pagine dedicate a matrimoni, sagre, feste private e calendari del territorio.",
    slugs: ["matrimoni", "sagre-eventi", "eventi-privati", "eventi-locali"],
  },
  digitalizzazione: {
    id: "digitalizzazione",
    name: "Digitalizzazione aziende",
    description:
      "Sistemi per preventivi, prenotazioni e organizzazione del lavoro, oltre al sito vetrina.",
    slugs: ["digitalizzazione", "preventivi-online", "prenotazioni"],
  },
  "presenza-rapida": {
    id: "presenza-rapida",
    name: "Presenza online essenziale",
    description:
      "Landing, one page, siti rapidi e portfolio per chi deve essere online in modo chiaro.",
    slugs: ["landing-ads", "one-page", "sito-48h", "cv-portfolio"],
  },
} as const;

export type SeoClusterId = keyof typeof SEO_CLUSTERS;

export const SERVICE_AREAS = [
  "Como",
  "Milano",
  "Bergamo",
  "Lecco",
  "Monza",
  "Lombardia",
] as const;

export const SERVICE_TYPES = [
  "Siti web",
  "Siti per attività locali",
  "Landing page",
  "Sistemi di prenotazione",
  "Preventivi online",
  "Digitalizzazione aziendale",
] as const;

export type ZoneSlug =
  | "lombardia"
  | "milano"
  | "bergamo"
  | "lecco"
  | "monza"
  | "como";

export type ZonePage = {
  slug: ZoneSlug;
  name: string;
  region: string;
  title: string;
  description: string;
  intro: string;
  targets: readonly string[];
  advantages: readonly string[];
  services: readonly string[];
};

export const zonePages: ZonePage[] = [
  {
    slug: "como",
    name: "Como",
    region: "Lombardia",
    title: "Siti web a Como",
    description:
      "Freelance web a Udine: siti web, landing e digitalizzazione per attività del Lario, PMI e professionisti.",
    intro:
      "Lavoro da Udine con attività locali, studi professionali, ristorazione, hospitality e imprese del territorio. Un sito chiaro e un contatto diretto valgono più di una vetrina generica.",
    targets: [
      "Ristoranti e hospitality",
      "B&B e case vacanza",
      "Artigiani e imprese edili",
      "Studi professionali",
      "Associazioni e palestre",
    ],
    advantages: [
      "Conosciamo il territorio e i clienti che cercano online",
      "Progetti pensati per smartphone e richieste via WhatsApp",
      "Un solo referente da Como, senza filiali intermedie",
    ],
    services: [
      "Siti per attività locali",
      "Landing per campagne",
      "Prenotazioni e preventivi",
      "Digitalizzazione",
    ],
  },
  {
    slug: "milano",
    name: "Milano",
    region: "Lombardia",
    title: "Siti web a Milano",
    description:
      "Siti web e digitalizzazione per aziende e professionisti a Milano e hinterland, con un partner operativo da Como.",
    intro:
      "Milano chiede siti veloci, credibili e orientati alla mia richiesta. Progetto presenze digitali per studi, retail, ristorazione e servizi, con un processo diretto e senza fronzoli.",
    targets: [
      "Studi e freelance",
      "Ristoranti e locali",
      "Agenzie e servizi B2B",
      "Retail e showroom",
      "Palestre e wellness",
    ],
    advantages: [
      "Tempi di confronto rapidi, anche da remoto",
      "Pagine pensate per ads e ricerca locale",
      "Integrazione con i tool che usi già",
    ],
    services: [
      "Siti professionali",
      "Landing ads",
      "One page e siti rapidi",
      "Digitalizzazione",
    ],
  },
  {
    slug: "bergamo",
    name: "Bergamo",
    region: "Lombardia",
    title: "Siti web a Bergamo",
    description:
      "Siti web per artigiani, ristoranti e PMI a Bergamo e provincia: presenza online chiara e orientata alle richieste.",
    intro:
      "A Bergamo molte attività vivono di passaparola. Un sito ben fatto rende quel passaparola misurabile: orari, preventivi, portfolio e contatto in un unico posto.",
    targets: [
      "Artigiani e officine",
      "Ristoranti e agriturismi",
      "Imprese edili",
      "Studi tecnici",
      "Associazioni sportive",
    ],
    advantages: [
      "Strutture pronte da personalizzare sul tuo settore",
      "Richieste organizzate, non solo un form generico",
      "Supporto dopo la pubblicazione",
    ],
    services: [
      "Siti per artigiani",
      "Preventivi online",
      "Siti per ristoranti",
      "Digitalizzazione",
    ],
  },
  {
    slug: "lecco",
    name: "Lecco",
    region: "Lombardia",
    title: "Siti web a Lecco",
    description:
      "Siti web e soluzioni digitali per attività di Lecco e del Lario orientale: turismo, servizi e imprese locali.",
    intro:
      "Tra lago e provincia, le ricerche partono spesso da mobile. Costruisco siti leggibili, con indicazioni, disponibilità e un contatto immediato.",
    targets: [
      "Hospitality e B&B",
      "Ristoranti e bar",
      "Guide e attività outdoor",
      "Artigiani",
      "Professionisti",
    ],
    advantages: [
      "Pagine chiare su smartphone",
      "Collegamento a mappe e WhatsApp",
      "Un processo lineare dalla richiesta al sito online",
    ],
    services: [
      "Siti B&B",
      "Siti ristoranti",
      "One page",
      "Prenotazioni",
    ],
  },
  {
    slug: "monza",
    name: "Monza",
    region: "Lombardia",
    title: "Siti web a Monza",
    description:
      "Siti web per professionisti, negozi e imprese a Monza e Brianza: presenza essenziale, campagne e digitalizzazione.",
    intro:
      "In Brianza il cliente confronta in fretta. Serve un sito che spieghi cosa fai, mostri il lavoro e renda semplice scrivere o prenotare.",
    targets: [
      "Professionisti e studi",
      "Negozi e showroom",
      "Imprese di servizi",
      "Palestre",
      "Agenzie immobiliari",
    ],
    advantages: [
      "Messaggio e struttura allineati al tuo settore",
      "Pagine pronte per campagne locali",
      "Possibilità di preventivi o prenotazioni online",
    ],
    services: [
      "Siti per professionisti",
      "Landing ads",
      "Preventivi online",
      "Digitalizzazione",
    ],
  },
  {
    slug: "lombardia",
    name: "Lombardia",
    region: "Lombardia",
    title: "Siti web in Lombardia",
    description:
      "Freelance web per PMI e attività in Lombardia: siti, landing e digitalizzazione con un referente unico da Como.",
    intro:
      "Seguiamo progetti in tutta la Lombardia. Il lavoro è da remoto o in presenza quando serve: l’obiettivo resta un sito che porta richieste, non una brochure ferma.",
    targets: [
      "PMI e studi",
      "Attività locali",
      "Hospitality",
      "Artigiani e imprese",
      "Organizzatori di eventi",
    ],
    advantages: [
      "Copertura regionale, processo unico",
      "Soluzioni verticali già pensate per il tuo mestiere",
      "Collegamento a ads, form e strumenti di lavoro",
    ],
    services: [
      "Siti verticali",
      "Digitalizzazione",
      "Landing e one page",
      "Eventi e hospitality",
    ],
  },
];

export function getZonePage(slug: string) {
  return zonePages.find((zone) => zone.slug === slug);
}

export type LongTailPage = {
  slug: string;
  path: string;
  name: string;
  parentSlug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: readonly { title: string; body: string; items?: readonly string[] }[];
};

export const longTailPages: LongTailPage[] = [
  {
    slug: "falegnami",
    path: "/siti-web-falegnami",
    name: "Sito web per falegnami",
    parentSlug: "artigiani",
    title: "Sito web per falegnami",
    description:
      "Sito per falegnami e falegnamerie: portfolio lavori, zona di intervento e richiesta preventivo da smartphone.",
    h1: "Sito web per falegnami",
    intro:
      "Chi cerca un falegname online vuole vedere lavori veri, capire se copri la sua zona e inviarti misure o foto senza inseguire una chiamata. Il sito diventa il primo sopralluogo.",
    sections: [
      {
        title: "Cosa deve mostrare il sito",
        body: "Galleria per tipologia (cucine, arredi, restauri), materiali, tempi di lavorazione e un contatto chiaro. Meglio poche schede complete che un catalogo infinito senza contesto.",
        items: [
          "Portfolio lavori",
          "Zona di intervento",
          "Richiesta preventivo con foto",
          "WhatsApp e telefono",
        ],
      },
      {
        title: "Per chi è",
        body: "Falegnamerie artigiane, restauratori e laboratori che lavorano su commessa. Se già usi Instagram, il sito raccoglie quelle prove in un indirizzo tuo.",
      },
    ],
  },
  {
    slug: "idraulici",
    path: "/siti-web-idraulici",
    name: "Sito web per idraulici",
    parentSlug: "artigiani",
    title: "Sito web per idraulici",
    description:
      "Sito per idraulici e impianti: urgenze, zona coperta, servizi e richiesta intervento senza perdere la chiamata.",
    h1: "Sito web per idraulici",
    intro:
      "Le ricerche per un idraulico sono spesso urgenti. La pagina deve dire subito se sei disponibile, dove operi e come farti arrivare l’indirizzo.",
    sections: [
      {
        title: "Cosa deve fare il sito",
        body: "Elenco servizi (guasti, nuove installazioni, manutenzione), comuni coperti e un form o WhatsApp. Il sito non sostituisce il furgone: filtra le richieste serie.",
        items: [
          "Servizi e urgenze",
          "Comuni serviti",
          "Richiesta intervento",
          "Recapiti in evidenza",
        ],
      },
      {
        title: "Per chi è",
        body: "Ditte idrauliche, termoidraulici e artigiani in proprio che vogliono intercettare ricerche locali oltre al passaparola.",
      },
    ],
  },
  {
    slug: "elettricisti",
    path: "/siti-web-elettricisti",
    name: "Sito web per elettricisti",
    parentSlug: "artigiani",
    title: "Sito web per elettricisti",
    description:
      "Sito per elettricisti e impianti elettrici: servizi, certificazioni, zona e richiesta sopralluogo da mobile.",
    h1: "Sito web per elettricisti",
    intro:
      "Un elettricista viene cercato per un quadro, un allarme o un impianto nuovo. Il sito deve spiegare cosa fai e raccogliere i dati del sopralluogo.",
    sections: [
      {
        title: "Cosa includere",
        body: "Impianti civili e industriali, civilistici, foto di cantieri, comuni coperti e un canale per inviare planimetrie o foto del quadro.",
        items: [
          "Elenco servizi",
          "Zona di intervento",
          "Richiesta sopralluogo",
          "Materiali e referenze",
        ],
      },
      {
        title: "Per chi è",
        body: "Imprese elettriche e artigiani che vogliono richieste più complete rispetto a una sola pagina social.",
      },
    ],
  },
  {
    slug: "pizzerie",
    path: "/siti-web-pizzerie",
    name: "Sito web per pizzerie",
    parentSlug: "ristoranti",
    title: "Sito web per pizzerie",
    description:
      "Sito per pizzerie: menù digitale, orari, asporto e prenotazione tavoli, pensato per chi cerca da smartphone.",
    h1: "Sito web per pizzerie",
    intro:
      "Chi ha fame non aspetta un PDF. Il sito della pizzeria deve aprire il menù, gli orari e il modo per prenotare o ordinare in pochi secondi.",
    sections: [
      {
        title: "Cosa deve avere",
        body: "Menù aggiornabile, allergeni se li gestisci, mappa, recapito e prenotazione. Se fai asporto, il percorso deve essere evidente in home.",
        items: ["Menù digitale", "Orari", "Prenotazione", "Asporto e contatti"],
      },
      {
        title: "Per chi è",
        body: "Pizzerie al taglio, d’asporto e con sala. Utile anche se hai già i social: il sito resta il punto fermo quando cambia l’algoritmo.",
      },
    ],
  },
  {
    slug: "agriturismi",
    path: "/siti-web-agriturismi",
    name: "Sito web per agriturismi",
    parentSlug: "ristoranti",
    title: "Sito web per agriturismi",
    description:
      "Sito per agriturismi: menù, camere, eventi in fattoria e richieste di tavolo o soggiorno in un unico spazio.",
    h1: "Sito web per agriturismi",
    intro:
      "Un agriturismo racconta cucina, camere e territorio. Il sito deve far capire cosa si prenota — pranzo, festa o notte — senza confondere i tre percorsi.",
    sections: [
      {
        title: "Cosa mostrare",
        body: "Stagionalità del menù, camere o appartamenti, eventi, come arrivare e un form distinto per ristorante e pernottamento.",
        items: [
          "Cucina e menù",
          "Ospitalità",
          "Eventi e cerimonie",
          "Indicazioni stradali",
        ],
      },
      {
        title: "Per chi è",
        body: "Agriturismi in Lombardia e sul Lario che vogliono richieste ordinate, non solo messaggi sparsi su WhatsApp.",
      },
    ],
  },
  {
    slug: "bar",
    path: "/siti-web-bar",
    name: "Sito web per bar",
    parentSlug: "ristoranti",
    title: "Sito web per bar",
    description:
      "Sito per bar e caffetterie: orari, menù, eventi e posizione, per farti trovare da chi è già in zona.",
    h1: "Sito web per bar",
    intro:
      "Un bar vive di passaggio e di abitudine. Il sito serve a chi cerca orari, indirizzo, aperitivo o uno spazio per un evento piccolo.",
    sections: [
      {
        title: "Cosa mettere in evidenza",
        body: "Orari reali, mappa, proposta (colazione, pranzo veloce, aperitivo) e un contatto per riservare un tavolo o uno spazio.",
        items: ["Orari", "Menù o proposta", "Eventi", "Come arrivare"],
      },
      {
        title: "Per chi è",
        body: "Bar, caffetterie e locali diurni che vogliono una pagina propria oltre alle schede delle mappe.",
      },
    ],
  },
];

export function getLongTailPage(slug: string) {
  return longTailPages.find((page) => page.slug === slug);
}

export type BlogCategory =
  | "Siti web"
  | "Ecommerce"
  | "Digitalizzazione"
  | "Automazioni"
  | "SEO";

export type BlogArticle = {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  date: string;
  relatedServices: readonly string[];
  sections: readonly { title: string; body: string }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "come-digitalizzare-una-piccola-impresa",
    category: "Digitalizzazione",
    title: "Come digitalizzare una piccola impresa",
    description:
      "Da dove partire per digitalizzare una PMI: sito, richieste, strumenti interni e un ordine di lavoro realistico.",
    date: "2026-08-15",
    relatedServices: ["digitalizzazione", "preventivi-online", "prenotazioni"],
    sections: [
      {
        title: "Non serve digitalizzare tutto il primo mese",
        body: "Digitalizzare una piccola impresa non significa comprare dieci software. Significa togliere dal telefono e dalla memoria le attività che si ripetono: richieste, appuntamenti, preventivi, follow-up. Si parte da un canale pubblico chiaro — di solito il sito — e da un modo unico per ricevere i dati del cliente.",
      },
      {
        title: "Il sito è il front office",
        body: "Se il sito non spiega cosa fai, dove operi e come si richiede un intervento, il resto della digitalizzazione resta invisibile. Una pagina ordinata riduce le chiamate “quanto fate X?” e aumenta le richieste già complete. È il pezzo che i motori di ricerca e le ads possono effettivamente mandare in ufficio.",
      },
      {
        title: "Dopo il sito: richieste e calendario",
        body: "Il secondo passo è decidere come entra il lavoro. Un form di preventivo con foto e zona, oppure un calendario di prenotazione, evita il ping-pong su WhatsApp. I dati arrivano nello stesso formato e puoi rispondere con un metodo, non a sensazione.",
      },
      {
        title: "Strumenti interni, non vetrine",
        body: "CRM, fogli condivisi, automazioni sulle email: servono quando il volume delle richieste cresce. Prima di integrarli conviene avere un flusso già rispettato. Altrimenti si automatizza il caos. In jaderweb parto da come lavori oggi e collego solo ciò che toglie passaggi inutili.",
      },
      {
        title: "Un ordine di lavoro realistico",
        body: "1) Sito e recapiti allineati. 2) Un solo modo per chiedere preventivo o prenotare. 3) Una casella o una dashboard dove quelle richieste restano. 4) Solo dopo, automazioni e campagne. Questo ordine evita di spendere energia su ads che mandano gente su una pagina che non converte.",
      },
    ],
  },
  {
    slug: "perche-un-artigiano-dovrebbe-avere-un-sito-web",
    category: "Siti web",
    title: "Perché un artigiano dovrebbe avere un sito web",
    description:
      "Perché Instagram non basta a un artigiano: zona, lavori, preventivo e un indirizzo che resta tuo.",
    date: "2026-08-15",
    relatedServices: ["artigiani", "preventivi-online", "landing-ads"],
    sections: [
      {
        title: "I social non sono un indirizzo",
        body: "Instagram mostra il mestiere, ma non è tuo: cambia formato, nasconde i post, mescola le storie. Un sito è l’indirizzo che stampi sul furgone e che Google può associare al tuo nome e alla tua zona. È il posto dove il lavoro resta consultabile anche tra sei mesi.",
      },
      {
        title: "Il cliente vuole prove e un perimetro",
        body: "Prima di scrivere, chi cerca un artigiano guarda se hai già fatto lavori simili e se arrivi fino a casa sua. Una pagina con portfolio, comuni serviti e un recapito visibile risponde a quelle due domande senza una telefonata a vuoto.",
      },
      {
        title: "Il preventivo arriva più completo",
        body: "Se il sito chiede foto, comune e tipo di intervento, la prima risposta può essere seria. Non sostituisce il sopralluogo: lo prepara. Meno “mi può mandare due foto?” e più valutazioni che partono da dati.",
      },
      {
        title: "Serve anche se lavori già pieno",
        body: "Un sito non è solo per chi cerca clienti a tutti i costi. Serve a filtrare, a spiegare come lavori e a far arrivare richieste quando non puoi stare al telefono in cantiere. Puoi anche usarlo come pagina di atterraggio per una campagna locale, senza costruire tutto da zero.",
      },
    ],
  },
  {
    slug: "sito-web-per-attivita-locali-cosa-serve",
    category: "SEO",
    title: "Sito web per attività locali: cosa serve davvero",
    description:
      "Cosa deve avere un sito per un’attività locale: chiarezza, mobile, recapiti, e una sola azione da fare.",
    date: "2026-08-15",
    relatedServices: ["ristoranti", "one-page", "landing-ads"],
    sections: [
      {
        title: "Una domanda, una pagina",
        body: "Chi cerca “ristorante Como”, “idraulico Lecco” o “B&B lago” arriva con un intento preciso. La home deve rispondere in pochi secondi: cosa sei, dove sei, come si fa il passo successivo. Tutto il resto — galleria, menù, staff — sta sotto, non al posto di quella risposta.",
      },
      {
        title: "Mobile prima del desktop",
        body: "Le ricerche locali succedono in strada o sul divano, quasi sempre dal telefono. Orari, pulsante di chiamata, WhatsApp e mappa devono stare in evidenza. Un sito che si legge solo sul computer perde la richiesta più calda.",
      },
      {
        title: "Google non è l’unica porta",
        body: "Schede Maps, ads e Instagram mandano traffico. Se atterrano su una pagina lenta o senza recapito, il clic è sprecato. Il sito è il punto in cui quei canali diventano una conversazione. Per questo colleghiamo le landing alle campagne e i servizi verticali alle ricerche organiche.",
      },
      {
        title: "Cosa non serve all’inizio",
        body: "Non serve un portale con dieci sezioni vuote, né testi lunghissimi che non dicono come contattarti. Serve una struttura onesta, foto vere e un form o un numero che funzioni. Si può crescere dopo: prenotazioni, preventivi, area clienti. Prima si rende trovabile e usabile l’essenziale.",
      },
    ],
  },
];

export const blogCategories: readonly BlogCategory[] = [
  "Siti web",
  "Ecommerce",
  "Digitalizzazione",
  "Automazioni",
  "SEO",
];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getClusterForSlug(slug: string) {
  return Object.values(SEO_CLUSTERS).find((cluster) =>
    (cluster.slugs as readonly string[]).includes(slug),
  );
}
