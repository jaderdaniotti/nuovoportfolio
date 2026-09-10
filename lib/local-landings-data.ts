import type { LocalLandingPage } from "@/lib/local-landings-types";

export const localLandingPages: LocalLandingPage[] = [
  {
    slug: "gemona-del-friuli",
    path: "/siti-web/gemona-del-friuli",
    comuneSlug: "gemona-del-friuli-ud",
    name: "Gemona del Friuli",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 1,
    focus:
      "Sviluppatore web per aziende, professionisti e attività di Gemona: siti, e-commerce e un referente diretto.",
    primaryKeyword: "sviluppatore web Gemona del Friuli",
    keywords: [
      "sviluppatore web Gemona del Friuli",
      "sviluppatore siti web Gemona",
      "realizzazione siti web Gemona del Friuli",
      "web designer Gemona",
      "creazione sito web Gemona",
      "programmatore web Gemona",
      "siti web professionali Gemona",
      "ecommerce Gemona del Friuli",
      "sito aziendale Gemona",
      "freelance web Gemona",
    ],
    seoTitle: "Sviluppatore Web a Gemona del Friuli | Siti ed E-commerce",
    description:
      "Siti web, e-commerce e SEO locale per attività di Gemona del Friuli e dell’Alto Friuli. Un referente solo, da Udine, senza giro di agenzia.",
    eyebrow: "Gemona del Friuli · Alto Friuli",
    h1: "Sviluppatore web a Gemona del Friuli",
    lead: "Realizzo siti web, e-commerce e soluzioni digitali per aziende, professionisti e attività di Gemona del Friuli e dei comuni dell’Alto Friuli. Parli con me, non con un account manager.",
    heroCta: "Parliamo del tuo progetto",
    heroSecondary: { label: "Vedi i lavori", href: "/portfolio" },
    heroVariant: "flagship",
    proofPoints: [
      "Un referente dalla prima call al go-live",
      "Next.js, Shopify o vetrina — in base al lavoro vero",
      "Gemona, Artegna, Buja, Osoppo, Venzone e dintorni",
    ],
    servicesVariant: "grid",
    sectionOrder: [
      "intro",
      "services",
      "audience",
      "process",
      "portfolio",
      "local",
      "neighbors",
      "faq",
    ],
    intro: {
      heading: "Un sito che serve a chi ti cerca a Gemona — non una brochure",
      paragraphs: [
        "A Gemona del Friuli il passaparola conta ancora. Il sito entra in gioco quando qualcuno ti cerca su Google, apre Maps o vuole capire se sei la persona giusta prima di chiamare. Se la pagina è lenta, generica o ferma al 2016, quella richiesta va altrove.",
        "Lavoro da Udine come freelance e seguo progetti in città e in Alto Friuli. Non apro una sede finta in centro: costruisco pagine chiare, veloci e allineate a come ti cercano davvero — sviluppatore o meno, l’obiettivo è lo stesso: farti contattare.",
        "Se hai già un sito WordPress, una pagina Facebook usata come vetrina o un e-commerce che non vende, partiamo da lì. Ti dico se conviene rifare, migrare o sistemare. Niente pacchetto uguale per tutti.",
      ],
    },
    servicesHeading: "Cosa realizzo per Gemona e l’Alto Friuli",
    servicesIntro:
      "Non vendo “presenza online”. Scelgo lo strumento che chiude il contatto o la vendita, poi lo costruisco.",
    services: [
      {
        title: "Siti vetrina e siti aziendali",
        body: "Poche pagine utili: chi sei, cosa fai, zona, prove, recapito. Pensati per smartphone, con WhatsApp o form visibili senza scavare.",
        href: "/servizi",
      },
      {
        title: "E-commerce e Shopify",
        body: "Catalogo, pagamenti, spedizioni e un checkout che non perde il cliente. Shopify quando ha senso; su misura quando il flusso non sta in un tema.",
        href: "/servizi",
      },
      {
        title: "Sviluppo Next.js",
        body: "Siti veloci, URL pulite, metadati e una base tecnica che regge SEO e campagne. Ideale se vuoi controllo del codice, non un tema da aggiornare ogni tre mesi.",
      },
      {
        title: "SEO locale",
        body: "Title, H1, testi e struttura allineati a ricerche tipo “sito web Gemona” o al mestiere + comune. Niente promesse di primo posto: segnali onesti e pagine che rispondono all’intento.",
      },
      {
        title: "Manutenzione e restyling",
        body: "Aggiornamenti, ritocchi, migrazione da un sito vecchio. Se il dominio ha già un po’ di storia su Google, la conserviamo invece di buttarla.",
      },
    ],
    audience: {
      heading: "Per chi è pensata questa pagina",
      intro: "I progetti che ha senso fare da Gemona sono concreti, non “brand awareness” da slide.",
      items: [
        {
          title: "Aziende e PMI",
          body: "Sito istituzionale, pagine servizi, eventuali aree riservate o cataloghi. Un indirizzo stabile da mettere su biglietti, preventivi e scheda Google.",
        },
        {
          title: "Professionisti",
          body: "Studi, consulenti, tecnici: una vetrina che spiega competenza e zona di intervento senza copiare il sito del collega di Udine.",
        },
        {
          title: "Attività locali",
          body: "Negozi, artigiani, ristorazione: orari, menu o listino, percorso verso la chiamata. Il sito rafforza Maps, non lo sostituisce a vuoto.",
        },
        {
          title: "Chi vende online",
          body: "Piccolo magazzino o prodotto di nicchia: e-commerce misurabile, non un catalogo PDF caricato sul server.",
        },
      ],
    },
    process: {
      heading: "Come lavoriamo, dal messaggio al sito online",
      body: "Stesso metodo che uso su tutti i progetti: perimetro chiaro prima di scrivere una riga di codice.",
      steps: [
        {
          title: "Brief",
          body: "Mi racconti attività, territorio (Gemona o comuni vicini), obiettivo (chiamate, preventivi, vendite) e cosa hai già: dominio, testi, foto.",
        },
        {
          title: "Proposta",
          body: "Ti riporto struttura, tempi e cifra. Se manca qualcosa — foto, P.IVA, contenuti — lo dico subito, non a metà lavoro.",
        },
        {
          title: "Design e sviluppo",
          body: "Bozza, contenuti, build. Mobile-first. SEO tecnica di base già in fase di costruzione, non “dopo se avanza budget”.",
        },
        {
          title: "Lancio e seguito",
          body: "Messa online, controlli, ritocchi. Resta un referente per manutenzione e piccole evoluzioni.",
        },
      ],
    },
    local: {
      heading: "Perché ha senso un professionista che conosce l’Alto Friuli",
      paragraphs: [
        "Gemona non è un quartiere di una metropoli: le attività si conoscono, i clienti arrivano anche da Artegna, Buja, Osoppo e dalla Carnia. Il sito deve dirlo senza riempire la pagina di comuni copiati da una lista ISTAT.",
        "La concorrenza locale è fatta di web agency storiche, studi grafici e freelance WordPress. Io mi distinguo per stack moderno, pagine che convertono e un rapporto diretto. Se ti serve stampa offset e pieghevoli, non sono il fornitore giusto. Se ti serve un sito che regge Google e il telefono, sì.",
        "Opero in Friuli Venezia Giulia, provincia di Udine. Call e lavoro da remoto sono la regola; un confronto in presenza si organizza quando il progetto lo chiede.",
      ],
    },
    portfolioHeading: "Lavori reali, non mockup",
    portfolioIntro:
      "Hospitality, retail, food, professionisti: lo stesso rigore che applicherei a un progetto a Gemona.",
    portfolioTitles: [
      "Como Private Driver",
      "Gioia Capelli",
      "Eleonora Politi Photographer",
      "Authentic Pasta Lab",
    ],
    testimonialNames: ["Eleonora", "Carlotta Conti", "Marilena Mastaglio"],
    relatedHeading: "Zone che servo vicino a Gemona",
    relatedSlugs: ["artegna", "buja", "osoppo", "venzone", "tarcento", "tolmezzo"],
    extraLinks: [
      { label: "Siti web a Udine", href: "/udine" },
      { label: "Freelance in Friuli Venezia Giulia", href: "/friuli" },
      { label: "Quanto costa un sito web", href: "/costo-sito-web" },
      { label: "Pagina comune Gemona", href: "/comuni/gemona-del-friuli-ud" },
    ],
    faqs: [
      {
        question: "Quanto costa realizzare un sito web a Gemona del Friuli?",
        answer:
          "Dipende da pagine, testi, e-commerce e se partiamo da zero o da un sito esistente. Una vetrina chiara sta in una fascia diversa da un negozio online. I range li spiego nella pagina sul costo del sito; il numero chiuso arriva dopo il brief, non a freddo.",
      },
      {
        question: "Quanto tempo serve?",
        answer:
          "Una vetrina con contenuti pronti si chiude spesso in poche settimane. I ritardi arrivano quasi sempre da testi e foto, non dal codice. Te lo metto per scritto in proposta.",
      },
      {
        question: "Posso aggiornare il sito da solo?",
        answer:
          "Se ti serve un’area semplice per news o prodotti, la prevediamo. Se il sito cambia due volte l’anno, spesso conviene che lo aggiorni io: meno plugin, meno rischi, stesso risultato.",
      },
      {
        question: "Realizzi e-commerce anche per attività di Gemona?",
        answer:
          "Sì. Shopify o sviluppo su misura, in base a catalogo, magazzino e come vuoi gestire ordini e spedizioni. Non forzo una piattaforma se non calza.",
      },
      {
        question: "Ti occupi anche di manutenzione e SEO?",
        answer:
          "Sì: aggiornamenti, ritocchi, basi SEO (tecnica + contenuti locali). Non vendo “primo su Google”: lavoro su pagine utili e misurabili.",
      },
      {
        question: "Posso affidarti un sito già esistente?",
        answer:
          "Sì. Valuto se ha senso un restyling, una migrazione o interventi puntuali. Se il vecchio sito sta in piedi, non lo butto per principio.",
      },
      {
        question: "Segui anche Artegna, Buja e gli altri comuni intorno a Gemona?",
        answer:
          "Sì. Gemona è il punto di riferimento; lavoro con attività di Artegna, Buja, Osoppo, Venzone, Tarcento e verso Tolmezzo. Se sei in un comune limitrofo, la pagina dedicata ti spiega l’angolo specifico.",
      },
    ],
    ctaTitle: "Hai un’attività a Gemona o in Alto Friuli?",
    ctaBody:
      "Scrivimi due righe su cosa vuoi ottenere dal sito. Ti rispondo io, con un perimetro chiaro — non con un form che finisce in un CRM anonimo.",
    ctaLabel: "Richiedi un preventivo",
  },
  {
    slug: "buja",
    path: "/siti-web/buja",
    comuneSlug: "buja-ud",
    name: "Buja",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti aziendali per PMI, artigiani e imprese di Buja.",
    primaryKeyword: "realizzazione siti web Buja",
    keywords: [
      "realizzazione siti web Buja",
      "sito aziendale Buja",
      "siti web artigiani Buja",
      "web designer Buja",
      "sviluppatore web Buja",
      "creazione siti web Buja Udine",
    ],
    seoTitle: "Realizzazione Siti Web per Aziende a Buja | jaderweb",
    description:
      "Siti aziendali per PMI, artigiani e imprese di Buja: chiari, veloci, fatti per preventivi e clienti in provincia di Udine.",
    eyebrow: "Buja · provincia di Udine",
    h1: "Siti web per aziende e artigiani a Buja",
    lead: "A Buja servono siti che parlano a clienti e fornitori, non landing copiate cambiando il nome del comune. Progetto vetrine aziendali e presenze online che si possono mandare in una mail di preventivo.",
    heroCta: "Raccontami l’azienda",
    heroSecondary: { label: "Come lavoro", href: "/processo" },
    heroVariant: "split",
    servicesVariant: "list",
    sectionOrder: [
      "audience",
      "services",
      "intro",
      "process",
      "local",
      "neighbors",
      "faq",
    ],
    intro: {
      heading: "Un sito aziendale è un documento di lavoro, non un volantino",
      paragraphs: [
        "Molte imprese di Buja vivono di commesse, rete e fiducia. Il sito deve confermare quello che dici al telefono: cosa produci o installi, dove operi, come si richiede un intervento o un’offerta.",
        "Se oggi usi solo WhatsApp e una pagina Facebook, va bene per chi ti conosce già. Chi arriva da una ricerca o da un collega vuole un dominio, recapiti e due prove concrete. Quello costruisco.",
      ],
    },
    servicesHeading: "Cosa ha senso mettere online a Buja",
    servicesIntro:
      "Parto dal tipo di richiesta che vuoi ricevere, poi scelgo le pagine.",
    services: [
      {
        title: "Sito aziendale",
        body: "Home, attività, servizi, contatti. Testi asciutti, foto vere del laboratorio o del cantiere, CTA verso mail o telefono.",
        href: "/servizi/artigiani",
      },
      {
        title: "Pagine servizi",
        body: "Una pagina per linea di lavoro, così chi cerca un mestiere preciso non deve indovinare dal menù.",
      },
      {
        title: "Preventivi e contatto",
        body: "Form con i campi che ti servono davvero, oppure WhatsApp in evidenza se è così che rispondi.",
        href: "/servizi/preventivi-online",
      },
      {
        title: "Restyling del sito vecchio",
        body: "Teniamo il dominio, sistemiamo struttura e velocità, allineiamo i testi a come ti cercano oggi.",
      },
    ],
    audience: {
      heading: "Imprese, officine, artigiani",
      items: [
        {
          title: "Produzione e officine",
          body: "Chi visita il sito spesso è un altro imprenditore. Serve chiarezza su lavorazioni, materiali, raggio di intervento.",
        },
        {
          title: "Artigiani e installatori",
          body: "Zona (Buja, Gemona, Majano…), urgenze, esempi di lavori. Il sito riduce le telefonate “ma fate anche…?”.",
        },
        {
          title: "Studi e servizi B2B",
          body: "Una presenza sobria batte un template pieno di stock photos. Meglio tre paragrafi veri che dieci sezioni vuote.",
        },
      ],
    },
    process: {
      heading: "Tempi e modo di lavorare",
      body: "Un interlocutore solo. Niente workshop da mezza giornata se due messaggi bastano.",
      steps: [
        {
          title: "Cosa fai e per chi",
          body: "Settore, clienti tipo, comuni in cui lavori.",
        },
        {
          title: "Struttura",
          body: "Quante pagine, quali servizi, quale contatto primario.",
        },
        {
          title: "Online",
          body: "Sviluppo, messa online, istruzioni minime per non rimanere bloccati.",
        },
      ],
    },
    local: {
      heading: "Buja e i comuni a due passi",
      paragraphs: [
        "Buja sta nel mezzo tra Gemona e la pianura verso Majano e San Daniele. I clienti non si fermano al confine comunale: il sito può dirlo in modo naturale, senza una mappa di 80 comuni.",
        "Non esiste una web agency di quartiere che copra solo Buja: le pagine che trovi su Google sono spesso directory o landing clonate. Questa è scritta per chi ha un’impresa qui.",
      ],
    },
    relatedHeading: "Comuni vicini che seguo",
    relatedSlugs: ["gemona-del-friuli", "osoppo", "majano", "artegna"],
    extraLinks: [
      { label: "Sviluppatore web a Gemona", href: "/siti-web/gemona-del-friuli" },
      { label: "Costo di un sito web", href: "/costo-sito-web" },
    ],
    faqs: [
      {
        question: "Fate siti anche per ditte individuali a Buja?",
        answer:
          "Sì. Partita IVA piccola o società: il sito si dimensiona sul lavoro, non sulla forma giuridica.",
      },
      {
        question: "Devo comparire anche per Gemona?",
        answer:
          "Se lavori su entrambi i comuni, lo scriviamo nei testi e nei recapiti. Gemona ha una pagina più ampia; da Buja ci arrivi in un click.",
      },
      {
        question: "Serve un e-commerce?",
        answer:
          "Solo se vendi prodotti con ordine online. Per molte officine basta un sito vetrina con listini o richiesta offerta.",
      },
      {
        question: "Chi scrive i testi?",
        answer:
          "Posso partire da quello che mi detti tu (anche vocale) e metterlo in ordine. Non invento lavorazioni che non fai.",
      },
    ],
    ctaTitle: "Un sito all’altezza dell’impresa, non del template",
    ctaBody:
      "Dimmi settore, zona di intervento e se hai già un dominio. Ti rispondo con una prima valutazione.",
    ctaLabel: "Chiedi un preventivo",
  },
  {
    slug: "artegna",
    path: "/siti-web/artegna",
    comuneSlug: "artegna-ud",
    name: "Artegna",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti vetrina per piccole attività e professionisti di Artegna.",
    primaryKeyword: "siti web Artegna",
    keywords: [
      "siti web Artegna",
      "creazione sito web Artegna",
      "web designer Artegna",
      "sito vetrina Artegna",
      "freelance web Artegna",
    ],
    seoTitle: "Siti Web per Professionisti e Attività a Artegna | jaderweb",
    description:
      "Siti vetrina per professionisti e piccole attività di Artegna: chiari sul telefono, pensati per farsi trovare e farsi scrivere.",
    eyebrow: "Artegna · Gemonese",
    h1: "Sito vetrina per la tua attività a Artegna",
    lead: "Se hai uno studio, un negozio o un mestiere a Artegna, ti serve una pagina che si capisce in dieci secondi: chi sei, dove sei, come ti contattano. Il resto è rumore.",
    heroCta: "Partiamo dal sito",
    heroSecondary: { label: "Servizi", href: "/servizi" },
    heroVariant: "compact",
    servicesVariant: "numbered",
    sectionOrder: [
      "intro",
      "services",
      "audience",
      "faq",
      "local",
      "neighbors",
    ],
    intro: {
      heading: "Artegna è piccola: il sito deve essere ancora più chiaro",
      paragraphs: [
        "Non ti serve un portale. Ti serve un indirizzo web che Google e WhatsApp possano mostrare senza vergogna, con orari e zona (Artegna, Gemona, Tarcento) scritti in italiano normale.",
        "Molte ricerche locali finiscono su directory o su pagine identiche con il nome del paese cambiato. Qui il testo è pensato per chi lavora tra il Gemonese e la pedemontana, non per saturare keyword.",
      ],
    },
    servicesHeading: "Il minimo che funziona — fatto bene",
    servicesIntro:
      "Tre pezzi. Se ne servono di più, li aggiungiamo. Non partiamo da venti sezioni decorative.",
    services: [
      {
        title: "One page o poche pagine",
        body: "Offerta, zona, una prova (foto, lavoro, recensione vera se ce l’hai), contatto.",
        href: "/servizi/one-page",
      },
      {
        title: "Sito per professionisti",
        body: "Competenze, come si lavora insieme, area servita. Niente stock di strette di mano.",
        href: "/servizi/professionisti",
      },
      {
        title: "Collegamento a Maps e WhatsApp",
        body: "Stessi recapiti ovunque. Chi arriva dal telefono deve poter chiamare o scrivere subito.",
      },
    ],
    audience: {
      heading: "Piccole attività, non “brand”",
      items: [
        {
          title: "Professionisti",
          body: "Commercialisti, tecnici, consulenti, studi associati: una vetrina sobria vale più di un carousel.",
        },
        {
          title: "Negozi e servizi alla persona",
          body: "Orari, cosa offri, come prenotare. Il sito sostiene Instagram, non lo copia.",
        },
        {
          title: "Chi inizia ora",
          body: "Partita IVA nuova: un dominio tuo da subito, così non dipendi dal formato del social.",
        },
      ],
    },
    local: {
      heading: "Tra Gemona e Tarcento",
      paragraphs: [
        "Artegna sta sulla linea che collega Gemona a Udine. I clienti arrivano anche dai paesi vicini: ha senso dirlo, senza fingere di avere una filiale in ogni frazione.",
        "Lavoro da Udine e seguo il Gemonese di persona a livello di progetto: un referente, tempi reali, preventivo leggibile.",
      ],
    },
    relatedHeading: "Se la tua attività sta un paese più in là",
    relatedSlugs: ["gemona-del-friuli", "tarcento", "buja"],
    extraLinks: [
      { label: "Tutti i servizi", href: "/servizi" },
      { label: "Contatti", href: "/contatti" },
    ],
    faqs: [
      {
        question: "Per Artegna basta una pagina sola?",
        answer:
          "Spesso sì. Se hai tre servizi distinti o vuoi un blog, si allarga. Meglio una pagina piena che un menù vuoto.",
      },
      {
        question: "Devo comparire su Google Maps?",
        answer:
          "La scheda Google la gestisci tu (è il tuo profilo). Io allineo il sito: stessi dati, stesso nome, stesso telefono.",
      },
      {
        question: "Posso usare le foto del cellulare?",
        answer:
          "Sì, se sono nitide e vere. Meglio il tuo laboratorio che un’immagine scaricata. Ti dico quali scattare.",
      },
      {
        question: "Quanto tempo ci vuole?",
        answer:
          "Con testi e foto pronti, una vetrina essenziale è questione di giorni o poche settimane, a seconda del perimetro.",
      },
    ],
    ctaTitle: "Vuoi un sito che si capisce da Artegna",
    ctaBody:
      "Scrivimi mestiere, se hai già un dominio e cosa vuoi che succeda quando qualcuno apre la pagina.",
    ctaLabel: "Scrivimi",
  },
  {
    slug: "osoppo",
    path: "/siti-web/osoppo",
    comuneSlug: "osoppo-ud",
    name: "Osoppo",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti aziendali e servizi digitali per imprese della zona di Osoppo.",
    primaryKeyword: "siti web aziendali Osoppo",
    keywords: [
      "siti web Osoppo",
      "sito aziendale Osoppo",
      "realizzazione siti web Osoppo",
      "sviluppatore web Osoppo",
      "digitalizzazione imprese Osoppo",
    ],
    seoTitle: "Siti Web Aziendali a Osoppo | Imprese e attività locali",
    description:
      "Siti per imprese e attività di Osoppo: vetrina aziendale, servizi digitali e un referente unico in provincia di Udine.",
    eyebrow: "Osoppo · zona produttiva",
    h1: "Siti web per imprese e attività a Osoppo",
    lead: "Osoppo è un comune di lavoro: capannoni, logistica, attività che servono il Gemonese. Il sito deve sembrare un’azienda che ha le idee chiare, non una landing turistica.",
    heroCta: "Parliamo del sito aziendale",
    heroVariant: "panel",
    servicesVariant: "grid",
    sectionOrder: [
      "services",
      "audience",
      "intro",
      "local",
      "process",
      "neighbors",
      "faq",
    ],
    intro: {
      heading: "Digitale utile, non “innovazione” da comunicato",
      paragraphs: [
        "Se vendi a altre imprese, il sito è spesso il primo PDF che il cliente non ti ha ancora chiesto: chi siete, certificazioni se ci sono, come si richiede un’offerta.",
        "Posso collegare il sito a form, mail aziendali e, se serve, a flussi semplici (niente software enterprise se ti basta un foglio e una casella ordinata).",
      ],
    },
    servicesHeading: "Presenza digitale da impresa",
    servicesIntro:
      "Pagine solide, performance, recapiti. Poi, solo se serve, e-commerce o area riservata.",
    services: [
      {
        title: "Sito corporate essenziale",
        body: "Azienda, mercati, servizi, contatti. Layout pulito, niente slider automatici che nessuno guarda.",
      },
      {
        title: "Servizi e lavorazioni",
        body: "Schede che un commerciale può mandare. Testi verificati con te, non copiati dal sito del concorrente.",
      },
      {
        title: "Digitalizzazione leggera",
        body: "Dominio, caselle, form, eventuali integrazioni. Passi concreti, non una “trasformazione” da slide.",
        href: "/servizi/digitalizzazione",
      },
      {
        title: "Manutenzione",
        body: "Il sito resta tuo. Io resto il tecnico di riferimento quando qualcosa si rompe o va aggiornato.",
      },
    ],
    audience: {
      heading: "A chi mi rivolgo a Osoppo",
      items: [
        {
          title: "Imprese produttive",
          body: "Chi ha già un nome in zona e vuole un sito all’altezza delle commesse, non un template da 49 euro.",
        },
        {
          title: "Attività di servizio alle aziende",
          body: "Manutenzioni, trasporti, forniture: spiegare raggio e modalità di contatto evita giri di telefono.",
        },
        {
          title: "Realtà miste",
          body: "Chi ha sia un punto locale sia clienti in provincia: una home che tiene insieme i due pezzi.",
        },
      ],
    },
    process: {
      heading: "Un percorso da fornitore, non da agenzia creativa",
      body: "Date, perimetro, consegna. Come un buon subappalto digitale.",
      steps: [
        { title: "Fabbisogno", body: "Cosa deve fare il sito nei prossimi 12 mesi, non “nel futuro”." },
        { title: "Offerta", body: "Pagine, tempi, cosa è escluso (foto, copy lungo, campagne ads)." },
        { title: "Consegna", body: "Online, accessi, breve istruzioni. Poi supporto a consumo o accordato." },
      ],
    },
    local: {
      heading: "Osoppo, Gemona, Trasaghis",
      paragraphs: [
        "La zona industriale e il tessuto intorno a Osoppo guardano a Gemona e alla valle. Il copy può citare l’area senza elencare ogni frazione.",
        "Non dichiaro un ufficio in comune: lavoro da Udine e seguo i progetti dell’Alto Friuli con call e, se serve, un passaggio in sede.",
      ],
    },
    relatedHeading: "Altre zone coperte vicino a Osoppo",
    relatedSlugs: ["gemona-del-friuli", "buja", "trasaghis"],
    extraLinks: [
      { label: "Digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Siti web Udine", href: "/udine" },
    ],
    faqs: [
      {
        question: "Fate anche loghi e brochure?",
        answer:
          "Il focus è il sito. Se serve un ritocco minimo al marchio per il web, si valuta. Campagne stampa e cataloghi cartacei non sono il mio mestiere principale.",
      },
      {
        question: "Possiamo avere una pagina in inglese?",
        answer:
          "Sì, se i clienti sono anche esteri. La seconda lingua si preventiva: non è “un bottone”.",
      },
      {
        question: "Il sito può stare sui nostri server?",
        answer:
          "Di solito uso hosting moderno e veloce. Se avete vincoli interni, li vediamo prima: non a progetto finito.",
      },
      {
        question: "Lavorate con scadenze da fiera o da appalto?",
        answer:
          "Se me lo dici all’inizio, costruisco intorno a quella data. All’ultimo minuto si fa solo ciò che sta in piedi.",
      },
    ],
    ctaTitle: "Serve un sito che si può mandare a un cliente",
    ctaBody:
      "Scrivimi settore, se hai già un sito e per quando ti servirebbe. Ti rispondo con un perimetro onesto.",
    ctaLabel: "Richiedi una valutazione",
  },
  {
    slug: "venzone",
    path: "/siti-web/venzone",
    comuneSlug: "venzone-ud",
    name: "Venzone",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti per turismo, ricettività e ristorazione a Venzone.",
    primaryKeyword: "siti web Venzone turismo",
    keywords: [
      "siti web Venzone",
      "sito B&B Venzone",
      "sito ristorante Venzone",
      "web designer Venzone",
      "sito agriturismo Alto Friuli",
      "prenotazioni online Venzone",
    ],
    seoTitle: "Siti Web per Turismo e Attività a Venzone | jaderweb",
    description:
      "Siti per B&B, ristoranti e attività di Venzone: prenotazioni, visibilità su Google e una vetrina all’altezza del borgo.",
    eyebrow: "Venzone · borgo e ciclovia",
    h1: "Siti web per chi accoglie a Venzone",
    lead: "Venzone vive di visite, ciclovia Alpe Adria, ristorazione e alloggi. Il sito deve far prenotare o scrivere, in italiano e — se ti serve — in un’altra lingua, senza commissioni da portale su ogni notte.",
    heroCta: "Parliamo della struttura",
    heroSecondary: { label: "Siti per B&B", href: "/servizi/bb-case-vacanza" },
    heroVariant: "split",
    servicesVariant: "grid",
    sectionOrder: [
      "local",
      "services",
      "audience",
      "portfolio",
      "faq",
      "neighbors",
    ],
    servicesHeading: "Strumenti per chi vive di ospiti",
    servicesIntro:
      "Booking, Google e passaparola convivono. Il sito è il canale che controlli tu.",
    services: [
      {
        title: "Siti per B&B e camere",
        body: "Camere, posizione (mura, stazione, ciclovia), come arrivare, contatto diretto. Eventuale motore di prenotazione se ne vale la pena.",
        href: "/servizi/bb-case-vacanza",
      },
      {
        title: "Ristoranti e locali",
        body: "Menu, orari, prenotazione tavolo, foto vere della sala — non piatti di stock.",
        href: "/servizi/ristoranti",
      },
      {
        title: "Attività e guide del territorio",
        body: "Escursioni, noleggi, esperienze: una pagina che spiega il giro e raccoglie la richiesta.",
      },
      {
        title: "Multilingua essenziale",
        body: "DE/EN se il traffico ciclistico o estero lo giustifica. Solo le pagine che servono, non un sito clonato male.",
      },
    ],
    audience: {
      heading: "Ricettività, tavola, territorio",
      items: [
        {
          title: "Affittacamere e B&B",
          body: "Ridurre la dipendenza dai portali su una parte delle prenotazioni, con una scheda chiara e aggiornata.",
        },
        {
          title: "Ristorazione",
          body: "Chi visita il borgo cerca dove mangiare. Il sito e Maps devono dire la stessa cosa.",
        },
        {
          title: "Servizi agli ospiti",
          body: "Noleggi, visite, prodotti locali: una vetrina che non sembra un e-commerce abbandonato.",
        },
      ],
    },
    local: {
      heading: "Un borgo che Google già conosce — il tuo nome no, se non hai un sito",
      paragraphs: [
        "Venzone è nelle guide, nella ciclovia, nei ricordi del terremoto e della ricostruzione. Quella notorietà non si trasferisce automaticamente al tuo alloggio o al tuo locale. Serve una pagina con nome, indirizzo, prove e un modo per prenotare.",
        "Lavoro con hospitality anche fuori regione: so cosa chiede chi arriva da telefono in treno o in bici. Per Venzone allineo testi e recapiti al fatto che l’ospite spesso non è del paese.",
      ],
    },
    portfolioHeading: "Esempi in ambito hospitality e territorio",
    portfolioIntro:
      "Progetti di accoglienza e spostamenti: stessa attenzione a chiarezza e contatto.",
    portfolioTitles: ["Como Private Driver", "Como Lake Suites", "Lake Como in Car"],
    testimonialNames: ["Marilena Mastaglio", "Samuel Abate"],
    relatedHeading: "Turismo e comuni a ridosso di Venzone",
    relatedSlugs: ["gemona-del-friuli", "trasaghis", "tolmezzo"],
    extraLinks: [
      { label: "Siti per B&B", href: "/servizi/bb-case-vacanza" },
      { label: "Siti per ristoranti", href: "/servizi/ristoranti" },
    ],
    faqs: [
      {
        question: "Sostituite Booking?",
        answer:
          "No, e non è detto che convenga. Il sito affianca i portali: chi ti conosce già può prenotare o scrivere senza commissione. Il mix lo decidi tu.",
      },
      {
        question: "Serve il tedesco?",
        answer:
          "Se una fetta degli ospiti arriva dalla ciclovia o dall’Austria, sì sulle pagine chiave. Lo valutiamo sui dati che hai (messaggi, nazionalità, stagione).",
      },
      {
        question: "Potete collegare un gestionale prenotazioni?",
        answer:
          "Spesso sì, se il tool ha un widget o un’API decente. Lo vediamo sul prodotto che usi già, senza farti cambiare software per principio.",
      },
      {
        question: "Fate anche foto professionali?",
        answer:
          "Non sono un fotografo di interni. Posso usare le tue foto e dirti cosa manca. Per uno shooting dedicato ti conviene un professionista del settore.",
      },
    ],
    ctaTitle: "Vuoi che l’ospite ti trovi senza il portale",
    ctaBody:
      "Raccontami struttura, canali che usi oggi e se ti serve una seconda lingua. Ti dico se un sito ha senso ora.",
    ctaLabel: "Raccontami la struttura",
  },
  {
    slug: "tarcento",
    path: "/siti-web/tarcento",
    comuneSlug: "tarcento-ud",
    name: "Tarcento",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti per professionisti, commercianti e aziende di Tarcento.",
    primaryKeyword: "realizzazione siti web Tarcento",
    keywords: [
      "realizzazione siti web Tarcento",
      "web agency Tarcento",
      "sito web professionisti Tarcento",
      "sviluppatore web Tarcento",
      "siti web Tarcento Udine",
    ],
    seoTitle: "Realizzazione Siti Web a Tarcento | Professionisti e aziende",
    description:
      "Siti per professionisti, negozi e aziende di Tarcento: freelance da Udine, pagine chiare, SEO locale senza template clonato.",
    eyebrow: "Tarcento · pedemontana",
    h1: "Realizzazione siti web a Tarcento",
    lead: "Tarcento ha studi, commercio e imprese che guardano sia al Gemonese sia a Udine. Costruisco siti che stanno in mezzo: professionali, veloci, senza il tono da mega-agenzia di città.",
    heroCta: "Richiedi un preventivo",
    heroSecondary: { label: "Portfolio", href: "/portfolio" },
    heroVariant: "city",
    proofPoints: [
      "Professionisti e PMI",
      "Commercio locale",
      "Collegamento naturale con Udine e Gemona",
    ],
    servicesVariant: "numbered",
    sectionOrder: [
      "intro",
      "services",
      "process",
      "audience",
      "neighbors",
      "faq",
    ],
    intro: {
      heading: "Non un’altra pagina “web agency Tarcento” copiata",
      paragraphs: [
        "Su Google, Tarcento è piena di directory e di agenzie che elencano il comune in calce a un testo uguale per Nimis, Cassacco e Lusevera. Questa pagina è per chi lavora qui e vuole un sito suo.",
        "Io non ho uno sportello in piazza: ho un metodo (brief, struttura, sviluppo, lancio) e un’offerta concreta. Se cerchi un fornitore con sede sotto casa per ritirare i biglietti da visita, non sono io. Se cerchi il sito, sì.",
      ],
    },
    servicesHeading: "Cosa chiede di solito chi mi scrive da Tarcento",
    servicesIntro: "Tre filoni. Si mescolano spesso nello stesso progetto.",
    services: [
      {
        title: "Siti per professionisti",
        body: "Posizionamento locale, servizi, fiducia. Pagine che un cliente può aprire prima dell’appuntamento.",
        href: "/servizi/professionisti",
      },
      {
        title: "Commercianti",
        body: "Orari, cosa vendi, novità, contatto. Eventuale piccolo catalogo se ha senso, non un Amazon in miniatura.",
      },
      {
        title: "Aziende",
        body: "Vetrina corporate e pagine servizio. Stesso rigore che uso per i progetti più grandi, dimensionato.",
      },
    ],
    audience: {
      heading: "Studi, negozi, ditte",
      items: [
        {
          title: "Studi professionali",
          body: "Un sito ordinato riduce le mail “ma vi occupate anche di…?” e rafforza la scheda Maps.",
        },
        {
          title: "Negozi e servizi",
          body: "Chi passa da Udine o da Gemona deve capire in un attimo se vali il tragitto.",
        },
        {
          title: "Piccole aziende",
          body: "B2B o misto: recapiti, settori, area. Niente animazioni che rallentano il commerciale in 4G.",
        },
      ],
    },
    process: {
      heading: "Dal primo messaggio al dominio online",
      body: "Niente discovery da venti slide. Quattro passi.",
      steps: [
        { title: "Obiettivo", body: "Chiamate, visite in sede, richieste B2B." },
        { title: "Pagine", body: "Elenco chiuso, così il preventivo sta in piedi." },
        { title: "Contenuti", body: "Tu porti i fatti; io li metto in ordine e online." },
        { title: "Go-live", body: "Test da telefono, recapiti, eventuale Search Console." },
      ],
    },
    relatedHeading: "Tarcento è in mezzo: ecco le altre pagine utili",
    relatedSlugs: ["gemona-del-friuli", "artegna", "udine"],
    extraLinks: [
      { label: "Freelance in FVG", href: "/friuli" },
      { label: "Costo sito web", href: "/costo-sito-web" },
    ],
    faqs: [
      {
        question: "Siete una web agency di Tarcento?",
        answer:
          "No. Sono un freelance con base a Udine. Seguo Tarcento e la pedemontana perché è territorio che servo, non perché clono una landing per ogni comune.",
      },
      {
        question: "Fate SEO locale su Tarcento?",
        answer:
          "Imposto title, testi e struttura in modo che chi cerca un servizio in zona trovi una risposta onesta. Il ranking dipende da tanti fattori; non lo garantisco.",
      },
      {
        question: "Posso avere un e-commerce per il negozio?",
        answer:
          "Sì se vendi online per davvero (magazzino, spedizioni, resi). Altrimenti una vetrina con contatto è più onesta e costa meno da mantenere.",
      },
      {
        question: "Lavorate anche verso Udine città?",
        answer:
          "Sì. C’è una pagina dedicata a Udine per progetti più ampi (Next.js, Shopify, automazioni).",
      },
    ],
    ctaTitle: "Un sito per Tarcento, scritto per il tuo mestiere",
    ctaBody:
      "Mestiere, se hai già un sito, cosa vuoi che succeda dopo il click. Ti rispondo io.",
    ctaLabel: "Parliamo del progetto",
  },
  {
    slug: "majano",
    path: "/siti-web/majano",
    comuneSlug: "majano-ud",
    name: "Majano",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti per imprese, artigiani e commercio a Majano.",
    primaryKeyword: "siti web Majano",
    keywords: [
      "siti web Majano",
      "sito artigiani Majano",
      "realizzazione siti web Majano",
      "sito aziendale Majano Udine",
    ],
    seoTitle: "Siti Web per Imprese e Artigiani a Majano | jaderweb",
    description:
      "Siti per imprese, artigiani e attività di Majano: vetrina chiara, zona di intervento e contatto diretto.",
    eyebrow: "Majano · medio Friuli",
    h1: "Siti web per imprese e artigiani a Majano",
    lead: "A Majano il tessuto è fatto di ditte, laboratori e negozi che servono i paesi intorno. Il sito deve dire il mestiere e il raggio, poi farti scrivere o chiamare.",
    heroCta: "Chiedi un preventivo",
    heroVariant: "compact",
    servicesVariant: "list",
    sectionOrder: [
      "audience",
      "services",
      "local",
      "intro",
      "faq",
      "neighbors",
    ],
    intro: {
      heading: "Meno vetrina “creativa”, più strumenti di lavoro",
      paragraphs: [
        "Se il cliente tipo è un privato del paese o un’altra ditta, il tono cambia. Lo decidiamo insieme: niente copy da startup se monti infissi o ripari impianti.",
      ],
    },
    servicesHeading: "Pagine che servono sul serio",
    servicesIntro: "Quattro blocchi. Si tagliano se non ti servono.",
    services: [
      {
        title: "Vetrina artigiana",
        body: "Lavorazioni, materiali, galleria di cantieri o pezzi veri.",
        href: "/servizi/artigiani",
      },
      {
        title: "Sito per l’impresa",
        body: "Chi siete, dove operate, come si richiede un intervento.",
      },
      {
        title: "Commercio locale",
        body: "Orari, prodotti, ritiro in sede. E-commerce solo se c’è un flusso di ordini reale.",
      },
      {
        title: "Restyling",
        body: "Dominio già vostro, aspetto e struttura da riportare al 2026.",
      },
    ],
    audience: {
      heading: "Ditte, laboratori, banconi",
      items: [
        {
          title: "Imprese edili e impianti",
          body: "Zone (Majano, Buja, San Daniele…), urgenze, esempi. Il sito filtra le richieste fuori zona o fuori mestiere.",
        },
        {
          title: "Artigiani di bottega",
          body: "Chi deve vedere il pezzo prima di venire: foto vere, tempi, come si ordina.",
        },
        {
          title: "Attività commerciali",
          body: "Un indirizzo web da mettere sulla vetrina fisica, coerente con Maps.",
        },
      ],
    },
    local: {
      heading: "Majano tra Buja, Gemona e San Daniele",
      paragraphs: [
        "I clienti si spostano. Il sito può nominare i comuni in cui intervieni davvero. Non una lista infinita “operiamo in tutta Italia” se lavori in un raggio di venti minuti.",
        "Seguo questi progetti dallo stesso tavolo dei lavori gemonesi: un freelance, preventivo unico, niente subappalto nascosto del sito.",
      ],
    },
    relatedHeading: "Pagine vicine a Majano",
    relatedSlugs: ["buja", "san-daniele-del-friuli", "gemona-del-friuli"],
    extraLinks: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Processo di lavoro", href: "/processo" },
    ],
    faqs: [
      {
        question: "Serve comparire su Google per “idraulico Majano” o mestieri simili?",
        answer:
          "Se è così che ti cercano, costruiamo title e testi intorno al mestiere + zona. La scheda Google resta tua; il sito la sostiene.",
      },
      {
        question: "Posso mostrare solo alcuni lavori, non tutti?",
        answer:
          "Sì. Scegliamo insieme cosa è rappresentativo e cosa è riservato.",
      },
      {
        question: "Fate siti in 48 ore?",
        answer:
          "Esiste un percorso rapido se i contenuti sono pronti. Non è la regola: meglio un sito giusto che uno pubblicato ieri e sbagliato.",
      },
      {
        question: "Chi aggiorna gli orari?",
        answer:
          "Possiamo farlo tu da un punto semplice, o io su messaggio. Lo decidiamo in base a quanto cambiano.",
      },
    ],
    ctaTitle: "Un sito per la ditta, non per il concorso di grafica",
    ctaBody:
      "Mestiere, comuni in cui lavori, se hai già un dominio. Ti rispondo con una proposta asciutta.",
    ctaLabel: "Scrivimi",
  },
  {
    slug: "trasaghis",
    path: "/siti-web/trasaghis",
    comuneSlug: "trasaghis-ud",
    name: "Trasaghis",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Turismo, lago e attività locali a Trasaghis.",
    primaryKeyword: "siti web Trasaghis",
    keywords: [
      "siti web Trasaghis",
      "sito hotel lago Trasaghis",
      "sito attività Trasaghis",
      "web designer Lago dei Tre Comuni",
    ],
    seoTitle: "Siti Web a Trasaghis | Turismo e attività sul lago",
    description:
      "Siti per strutture, imprese e attività di Trasaghis e del Lago dei Tre Comuni: accoglienza, servizi, contatto diretto.",
    eyebrow: "Trasaghis · Lago dei Tre Comuni",
    h1: "Siti web a Trasaghis e sul lago",
    lead: "Tra Gemona, Venzone e il lago, Trasaghis mescola ospitalità e lavoro locale. Il sito deve funzionare per chi arriva in vacanza e per chi cerca un fornitore della valle.",
    heroCta: "Parliamo del progetto",
    heroVariant: "split",
    servicesVariant: "grid",
    sectionOrder: [
      "local",
      "services",
      "audience",
      "faq",
      "neighbors",
    ],
    servicesHeading: "Due velocità: ospiti e territorio",
    servicesIntro:
      "Non mescolo un booking engine con il sito dell’officina. Si capisce subito a chi parla la pagina.",
    services: [
      {
        title: "Ricettività e ristoro",
        body: "Camere, ristorante, spiaggia o pontile se ci sono: informazioni pratiche, meteo-indipendenti, recapito.",
        href: "/servizi/bb-case-vacanza",
      },
      {
        title: "Attività e servizi della valle",
        body: "Chi lavora tutto l’anno: vetrina, zona, WhatsApp. Stesso stack, tono diverso.",
      },
      {
        title: "Pagine stagionali",
        body: "Se l’offerta cambia tra estate e inverno, lo prevediamo senza rifare il sito ogni aprile.",
      },
    ],
    audience: {
      heading: "Lago, valle, imprese",
      items: [
        {
          title: "Strutture sul lago",
          body: "Ospiti che confrontano tre hotel in una sera. Velocità, foto vere, come arrivare da Gemona o dall’A23.",
        },
        {
          title: "Attività locali",
          body: "Fornitori e servizi per chi vive a Trasaghis, Alesso, Peonis: chiarezza, non storytelling da brochure turistica.",
        },
        {
          title: "Progetti misti",
          body: "Chi ha sia un locale sia un’altra attività: due sezioni, un dominio, niente confusione.",
        },
      ],
    },
    local: {
      heading: "Il lago porta ricerche. Il sito deve chiuderle",
      paragraphs: [
        "Chi cerca il Lago dei Tre Comuni non cerca “web agency Trasaghis”: cerca dove dormire, mangiare, noleggiare. Se sei tu quella risposta, la pagina deve esserlo in modo esplicito.",
        "Collego questa zona a Venzone (borgo e ciclovia) e a Gemona (servizi, stazione, vita quotidiana). I link interni servono all’utente, non a gonfiare PageRank.",
      ],
    },
    relatedHeading: "Dalla valle verso borgo e Gemonese",
    relatedSlugs: ["gemona-del-friuli", "venzone", "osoppo"],
    extraLinks: [
      { label: "Siti B&B e case vacanza", href: "/servizi/bb-case-vacanza" },
      { label: "Alto Friuli", href: "/siti-web" },
    ],
    faqs: [
      {
        question: "Serve un sito se siamo già su Booking e Instagram?",
        answer:
          "Se vuoi un canale tuo, sì. Portali e social cambiano regole e costi. Il dominio resta.",
      },
      {
        question: "Potete indicare come arrivare dal casello?",
        answer:
          "Sì, ed è spesso più utile di un paragrafo sulla “location da sogno”. Mappe e istruzioni pratiche.",
      },
      {
        question: "Lavorate con attività piccole, tipo B&B familiare?",
        answer:
          "Sì. Il perimetro si adatta. Non serve un portale per dieci camere.",
      },
      {
        question: "Fate anche e-commerce di prodotti locali?",
        answer:
          "Se c’è magazzino e spedizione, si valuta. Altrimenti una pagina prodotti + contatto è più onesta.",
      },
    ],
    ctaTitle: "Un sito per chi arriva al lago — o chi ci vive",
    ctaBody:
      "Dimmi se sei ricettività, ristorazione o un’attività della valle. Ti dico che tipo di sito ha senso.",
    ctaLabel: "Raccontami l’attività",
  },
  {
    slug: "forgaria-nel-friuli",
    path: "/siti-web/forgaria-nel-friuli",
    comuneSlug: "forgaria-nel-friuli-ud",
    name: "Forgaria nel Friuli",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 2,
    focus: "Siti essenziali per attività e turismo a Forgaria nel Friuli.",
    primaryKeyword: "siti web Forgaria nel Friuli",
    keywords: [
      "siti web Forgaria nel Friuli",
      "sito attività Forgaria",
      "web designer Forgaria",
      "sito agriturismo Forgaria",
    ],
    seoTitle: "Siti Web a Forgaria nel Friuli | Attività e territorio",
    description:
      "Siti chiari per attività, agriturismi e imprese di Forgaria nel Friuli: un referente, niente template gonfio.",
    eyebrow: "Forgaria nel Friuli",
    h1: "Un sito web per la tua attività a Forgaria",
    lead: "Forgaria è un comune sparso, tra collina e Tagliamento. Chi ti cerca online ha bisogno di capire dove sei e come raggiungerti — non di uno slideshow.",
    heroCta: "Scrivimi",
    heroVariant: "compact",
    servicesVariant: "list",
    sectionOrder: ["intro", "local", "services", "faq", "neighbors"],
    intro: {
      heading: "Poche pagine, fatti veri, recapito visibile",
      paragraphs: [
        "Non ha senso un sito da dodici voci di menù se l’attività è una. Costruiamo il minimo che Google e le persone possano usare: nome, frazione, cosa offri, telefono o form.",
      ],
    },
    servicesHeading: "Cosa posso fare per Forgaria",
    servicesIntro: "Dimensionato al paese, non a una brochure regionale.",
    services: [
      {
        title: "Vetrina essenziale",
        body: "Una o tre pagine. Foto del posto, non di un altro collinare.",
        href: "/servizi/one-page",
      },
      {
        title: "Agriturismo e accoglienza",
        body: "Come arrivare, stagione, contatto. Stesso approccio dei progetti ricettivi più grandi, tagliato su di te.",
        href: "/servizi/bb-case-vacanza",
      },
      {
        title: "Imprese di servizio",
        body: "Raggio di intervento verso San Daniele, Trasaghis, Gemona se è vero.",
      },
    ],
    local: {
      heading: "Frazioni, collina, chi non è del posto",
      paragraphs: [
        "Indirizzo e indicazioni contano più di un claim sul panorama. Se sei a Cornino, Flagogna o in centro, lo scriviamo.",
        "Lavoro da Udine; Forgaria entra nella rete dell’Alto e medio Friuli che seguo insieme a Gemona e San Daniele.",
      ],
    },
    relatedHeading: "Comuni con cui Forgaria si parla",
    relatedSlugs: ["san-daniele-del-friuli", "trasaghis", "gemona-del-friuli"],
    extraLinks: [
      { label: "One page", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
    faqs: [
      {
        question: "Ha senso un sito se siamo in pochi a cercarci?",
        answer:
          "Sì se vuoi un recapito stabile, mail professionali e una pagina da mandare. Il volume di ricerca è basso: la pagina deve essere utile, non lunga.",
      },
      {
        question: "Potete mettere la mappa della frazione?",
        answer:
          "Sì, con Google Maps e istruzioni scritte. Meglio di un indirizzo che nessuno sa pronunciare al navigatore.",
      },
      {
        question: "Serve la SEO?",
        answer:
          "Basi sì: titolo, testi, velocità. Non un piano editoriale da rivista se non hai da pubblicare.",
      },
    ],
    ctaTitle: "Un indirizzo web per Forgaria, fatto con misura",
    ctaBody:
      "Due righe su attività e frazione. Ti dico se basta una pagina o serve qualcosa di più.",
    ctaLabel: "Richiedi un parere",
  },
  {
    slug: "san-daniele-del-friuli",
    path: "/siti-web/san-daniele-del-friuli",
    comuneSlug: "san-daniele-del-friuli-ud",
    name: "San Daniele del Friuli",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 3,
    focus: "Commercio, ristorazione, turismo ed e-commerce a San Daniele del Friuli.",
    primaryKeyword: "siti web ed e-commerce San Daniele del Friuli",
    keywords: [
      "siti web San Daniele del Friuli",
      "ecommerce San Daniele",
      "sito ristorante San Daniele",
      "sito prosciutto San Daniele",
      "web designer San Daniele del Friuli",
      "negozio online San Daniele",
    ],
    seoTitle: "Siti Web ed E-commerce a San Daniele del Friuli | jaderweb",
    description:
      "Siti e e-commerce per commercio, ristorazione e aziende di San Daniele del Friuli: vetrina, vendite, turismo enogastronomico.",
    eyebrow: "San Daniele del Friuli",
    h1: "Siti web ed e-commerce a San Daniele del Friuli",
    lead: "San Daniele è un marchio che il mondo cerca. Il tuo locale o la tua azienda no, se il sito è fermo o se vendi solo sui marketplace. Progetto vetrine, e-commerce e pagine che tengono insieme bottega, tavola e spedizioni.",
    heroCta: "Parliamo di sito o shop",
    heroSecondary: { label: "E-commerce", href: "/servizi" },
    heroVariant: "flagship",
    proofPoints: [
      "Botteghe e gastronomia",
      "Ristorazione e ospitalità",
      "Vendita online quando c’è logistica vera",
    ],
    servicesVariant: "grid",
    sectionOrder: [
      "intro",
      "services",
      "audience",
      "portfolio",
      "local",
      "faq",
      "neighbors",
    ],
    intro: {
      heading: "Il nome “San Daniele” non sostituisce la tua scheda",
      paragraphs: [
        "Chi cerca il prosciutto arriva su consorzi, grandi brand e portali. Chi cerca il tuo spaccio, il tuo ristorante o la tua azienda agricola ha bisogno del tuo nome, dell’indirizzo in centro o in frazione, degli orari e di un modo per ordinare.",
        "In paese c’è già chi fa grafica e siti. Io arrivo da un altro angolo: sviluppo, performance, Shopify o custom, SEO tecnica. Se ti serve solo un restyling visivo di un volantino, forse non sono il profilo. Se ti serve vendere o farti trovare, sì.",
      ],
    },
    servicesHeading: "Dal banco allo shop, senza salti mortali",
    servicesIntro:
      "Scegliamo il pezzo che il business regge. Uno shop senza spedizioni è un costo, non un canale.",
    services: [
      {
        title: "Sito vetrina del punto vendita",
        body: "Dove sei, cosa trovi, quando. Utile a chi organizza una gita o un acquisto in sede.",
      },
      {
        title: "E-commerce e Shopify",
        body: "Prodotti, pagamenti, fasce di spedizione, IVA. Solo se magazzino e reso sono pensati.",
      },
      {
        title: "Ristorazione",
        body: "Menu, prenotazione, eventi. Allineato a Maps.",
        href: "/servizi/ristoranti",
      },
      {
        title: "Aziende del comparto",
        body: "B2B, export, catalogo riservato: ne parliamo se il flusso esiste già o sta per partire.",
      },
    ],
    audience: {
      heading: "Chi vende, chi accoglie, chi produce",
      items: [
        {
          title: "Botteghe e gastronomie",
          body: "Vetrina + eventuale vendita a distanza. Testi che non copiano il Consorzio: parlano del tuo banco.",
        },
        {
          title: "Ristoranti e locali",
          body: "Turismo enogastronomico e clientela del sabato. Prenotazione visibile da telefono.",
        },
        {
          title: "Aziende e laboratori",
          body: "Sito istituzionale o catalogo. Tono da impresa, non da blog di ricette.",
        },
      ],
    },
    local: {
      heading: "San Daniele, Majano, Udine",
      paragraphs: [
        "Il centro storico tira visite. Le aziende intorno tirano lavoro. Il sito dichiara il pezzo che sei, senza fingere di essere il portale del turismo regionale.",
        "Da qui i link verso Majano (ditte e artigiani) e Udine (progetti più ampi) sono per chi ha sedi o clienti su più comuni.",
      ],
    },
    portfolioHeading: "Food e vendita: esempi di approccio",
    portfolioIntro: "Progetti food e retail: chiarezza di offerta e contatto.",
    portfolioTitles: ["Authentic Pasta Lab", "Al Posta", "Gioia Capelli"],
    testimonialNames: ["Anna", "Lidya M", "Mariangela Basilico"],
    relatedHeading: "Intorno a San Daniele",
    relatedSlugs: ["majano", "udine", "gemona-del-friuli"],
    extraLinks: [
      { label: "Ristoranti", href: "/servizi/ristoranti" },
      { label: "Costo di un sito", href: "/costo-sito-web" },
    ],
    faqs: [
      {
        question: "Possiamo vendere il prosciutto online?",
        answer:
          "Sì se avete diritto a venderlo, logistica del fresco o del confezionato, e regole chiare su spedizione. Lo shop si progetta intorno a quello, non il contrario.",
      },
      {
        question: "Shopify o sito su misura?",
        answer:
          "Shopify è spesso la via più saggia per un catalogo. Next.js custom se i flussi sono particolari. Te lo dico dopo aver capito prodotti e volumi, non per moda.",
      },
      {
        question: "Serve il sito in più lingue?",
        answer:
          "Se una parte delle vendite o dei coperti è estera, sì sulle pagine che convertono. Non traduco tutto “perché sta bene”.",
      },
      {
        question: "Gestite anche i social?",
        answer:
          "No come community manager continuativo. Il sito può collegare i profili e raccogliere le richieste. I contenuti social restano vostri o di chi già ve li cura.",
      },
      {
        question: "Avete sede a San Daniele?",
        answer:
          "No, lavoro da Udine. I progetti danieletti li seguo come gli altri dell’Alto e medio Friuli: call, materiali condivisi, un referente.",
      },
    ],
    ctaTitle: "Bottega, tavola o shop: un solo referente per il web",
    ctaBody:
      "Dimmi se vendi in sede, online o entrambi. Ti rispondo con il tipo di progetto che ha senso — anche se la risposta è “per ora solo vetrina”.",
    ctaLabel: "Richiedi un preventivo",
  },
  {
    slug: "tolmezzo",
    path: "/siti-web/tolmezzo",
    comuneSlug: "tolmezzo-ud",
    name: "Tolmezzo",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 3,
    focus: "Siti aziendali ed e-commerce per l’Alto Friuli e la Carnia, da Tolmezzo.",
    primaryKeyword: "sviluppatore web Tolmezzo",
    keywords: [
      "sviluppatore web Tolmezzo",
      "siti web Tolmezzo",
      "siti aziendali Carnia",
      "ecommerce Alto Friuli",
      "web designer Tolmezzo",
      "realizzazione siti web Tolmezzo",
    ],
    seoTitle: "Sviluppatore Web a Tolmezzo | Siti per l’Alto Friuli",
    description:
      "Siti aziendali, e-commerce e progetti web per imprese e professionisti di Tolmezzo e della Carnia. Freelance, referente unico.",
    eyebrow: "Tolmezzo · Carnia",
    h1: "Sviluppatore web a Tolmezzo e in Carnia",
    lead: "Tolmezzo è il centro di servizi dell’Alto Friuli. Per aziende, professionisti e attività della Carnia realizzo siti che stanno al passo con clienti di pianura e di montagna — senza far passare il progetto da tre uffici.",
    heroCta: "Parliamo del progetto",
    heroSecondary: { label: "Come lavoro", href: "/processo" },
    heroVariant: "panel",
    servicesVariant: "numbered",
    sectionOrder: [
      "services",
      "local",
      "audience",
      "process",
      "neighbors",
      "faq",
    ],
    servicesHeading: "Siti aziendali, e-commerce, presenza seria",
    servicesIntro:
      "In Carnia il fornitore “sotto casa” esiste già (grafica, WordPress, marketing). Io porto sviluppo, Next.js quando serve, shop e un contratto chiaro.",
    services: [
      {
        title: "Siti per aziende della Carnia",
        body: "Manifattura, impianti, servizi: pagine che un cliente di Udine o del Veneto può prendere sul serio.",
      },
      {
        title: "Professionisti a Tolmezzo",
        body: "Studi e consulenti: vetrina locale + credibilità verso chi non è del paese.",
        href: "/servizi/professionisti",
      },
      {
        title: "E-commerce",
        body: "Se produci o distribuisci, uno shop dimensionato. Niente cataloghi fantasma.",
      },
      {
        title: "Hospitality di montagna",
        body: "Hotel e appartamenti: informazioni pratiche, stagioni, contatto. Venzone e il gemonese sono a un salto.",
        href: "/servizi/bb-case-vacanza",
      },
    ],
    audience: {
      heading: "Imprese, studi, attività dell’Alto Friuli",
      items: [
        {
          title: "Aziende",
          body: "Chi ha già un mercato oltre il comune e vuole un sito che non sembri “provinciale” nel senso peggiore.",
        },
        {
          title: "Professionisti",
          body: "Un dominio curato vale più di una pagina Facebook per chi sceglie un tecnico o uno studio.",
        },
        {
          title: "Attività di fondovalle",
          body: "Commercio e servizi per chi vive a Tolmezzo e nei comuni carinici.",
        },
      ],
    },
    process: {
      heading: "Lavorare da Tolmezzo senza perdere tempo in trasferte inutili",
      body: "Call, condivisione file, go-live. Un incontro si fa se il progetto è grosso o se lo chiedi tu.",
      steps: [
        { title: "Inquadramento", body: "Settore, comuni, obiettivo del sito." },
        { title: "Perimetro", body: "Pagine, lingue, shop sì/no, tempi." },
        { title: "Realizzazione", body: "Design asciutto, sviluppo, recapiti, SEO di base." },
        { title: "Dopo", body: "Manutenzione e ritocchi. Un numero e una mail, gli stessi del sito." },
      ],
    },
    local: {
      heading: "Alto Friuli: Gemona da una parte, Carnia dall’altra",
      paragraphs: [
        "Tolmezzo non è un sobborgo di Udine. Ha un mercato proprio e collegamenti con la montagna. Il copy lo rispetta: non è la stessa pagina di Gemona con il nome cambiato.",
        "In zona trovi freelance di grafica e digital marketing. La differenza che offro è ingegneria del sito: velocità, struttura, e-commerce, stack moderno. Collaborare è possibile; sostituire un brand designer non è il mio obiettivo.",
      ],
    },
    relatedHeading: "Dalla Carnia verso Gemona e Udine",
    relatedSlugs: ["gemona-del-friuli", "venzone", "udine"],
    extraLinks: [
      { label: "Freelance FVG", href: "/friuli" },
      { label: "Siti web Udine", href: "/udine" },
    ],
    faqs: [
      {
        question: "Avete uno studio a Tolmezzo?",
        answer:
          "No. Base a Udine, progetti in Carnia e Alto Friuli. Per molti lavori la distanza non è un problema; se serve un sopralluogo, si organizza.",
      },
      {
        question: "Fate anche grafica coordinata e social?",
        answer:
          "Il sito è il nucleo. Logo minimo e adattamenti web sì; piano editoriale social e campagne a pagamento non sono il servizio principale.",
      },
      {
        question: "Un’azienda in un comune carnico piccolo può scrivervi?",
        answer:
          "Sì. Tolmezzo è il riferimento geografico; il progetto si scala sul comune reale.",
      },
      {
        question: "Lavorate con e-commerce B2B?",
        answer:
          "Sì se i listini, gli utenti e i pagamenti sono chiari. Un’area riservata non si improvvisa in una settimana.",
      },
    ],
    ctaTitle: "Un sito all’altezza della Carnia — e di chi compra da fuori",
    ctaBody:
      "Settore, se hai già un sito, se ti serve lo shop. Ti rispondo con un perimetro, non con uno sconto da landing.",
    ctaLabel: "Richiedi un preventivo",
  },
  {
    slug: "udine",
    path: "/udine",
    comuneSlug: "udine-ud",
    name: "Udine",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    priority: 4,
    focus:
      "Web development, e-commerce, Next.js, Shopify e automazioni per Udine e provincia.",
    primaryKeyword: "sviluppatore web Udine",
    keywords: [
      "sviluppatore web Udine",
      "realizzazione siti web Udine",
      "web designer Udine",
      "ecommerce Udine",
      "Next.js Udine",
      "Shopify Udine",
      "freelance web Udine",
      "automazioni siti web Udine",
    ],
    seoTitle: "Sviluppatore Web a Udine | Next.js, Shopify, siti su misura",
    description:
      "Siti web, e-commerce, Next.js e automazioni a Udine: un freelance referente unico per PMI e professionisti, in città e in FVG.",
    eyebrow: "Udine · Friuli Venezia Giulia",
    h1: "Sviluppatore web a Udine",
    lead: "Progetto e sviluppo siti, e-commerce e strumenti digitali per chi lavora a Udine e in provincia. Stack moderno quando serve, vetrina essenziale quando basta, sempre un solo interlocutore.",
    heroCta: "Inizia un progetto",
    heroSecondary: { label: "Portfolio", href: "/portfolio" },
    heroVariant: "city",
    proofPoints: [
      "Next.js e React",
      "Shopify ed e-commerce",
      "Automazioni e integrazioni",
    ],
    servicesVariant: "grid",
    sectionOrder: [
      "intro",
      "services",
      "process",
      "portfolio",
      "local",
      "neighbors",
      "faq",
    ],
    intro: {
      heading: "Udine è piena di agenzie. Io sto sul pezzo tecnico",
      paragraphs: [
        "A Udine trovi web agency strutturate, SEO freelance, software house e siti WordPress da ogni fascia di prezzo. Questa pagina non copia i loro elenchi di comuni. Racconta come lavoro io: codice, UX, SEO tecnica, shop, automazioni leggere.",
        "Se ti serve un team con account, social e media buying sotto lo stesso tetto, un’agenzia può calzare meglio. Se ti serve chi progetta e sviluppa il sito — e resta raggiungibile dopo — scrivimi.",
        "Opero da Udine e seguo tutta Italia. Il vantaggio locale è operativo: fuso orario, lingua, tempi, possibilità di un confronto in città quando il progetto lo merita.",
      ],
    },
    servicesHeading: "Sviluppo, shop, automazioni",
    servicesIntro:
      "Quattro linee. Un progetto di solito ne tocca due, non tutte.",
    services: [
      {
        title: "Siti su misura (Next.js)",
        body: "Performance, metadati, componenti. Ideale per chi vuole un sito che non dipende da trenta plugin.",
        href: "/servizi",
      },
      {
        title: "E-commerce e Shopify",
        body: "Cataloghi, checkout, integrazioni di pagamento e spedizione. Custom se Shopify non basta.",
      },
      {
        title: "Automazioni",
        body: "Form che arrivano dove lavori, WhatsApp, collegamenti tra strumenti. Meno copia-incolla, stessi dati.",
      },
      {
        title: "SEO tecnica e restyling",
        body: "Velocità, struttura, migrazioni. I contenuti locali (Gemona, provincia) si appoggiano a questa base.",
      },
    ],
    process: {
      heading: "Come si svolge un progetto a Udine",
      body: "Stesso metodo della pagina processo, applicato a brief cittadini e provinciali.",
      steps: [
        {
          title: "Discovery",
          body: "Obiettivo, vincoli, sito attuale, competitor che ti stanno davanti su Google.",
        },
        {
          title: "Proposta",
          body: "Perimetro, stack (Next.js, Shopify, ibrido), tempi, cosa non è incluso.",
        },
        {
          title: "Build",
          body: "Design, contenuti, sviluppo, recensioni su bozza. Niente sorprese da “poi mettiamo l’e-commerce”.",
        },
        {
          title: "Lancio",
          body: "Domini, redirect, Search Console se la vuoi, manutenzione.",
        },
      ],
    },
    local: {
      heading: "Città, provincia, Alto Friuli",
      paragraphs: [
        "Da Udine copro la provincia e, con pagine dedicate, Gemona e i comuni dell’Alto Friuli. Non è keyword stuffing: sono territori in cui prendo lavori e so come si muovono clienti e ricerche.",
        "La directory comuni tiene una pagina tecnica per Udine città. Questa è la pagina commerciale: più profonda, collegata a servizi, costi e portfolio.",
      ],
    },
    portfolioHeading: "Una selezione di lavori",
    portfolioIntro:
      "Hospitality, retail, food, professionisti. Lo stesso livello che applico ai progetti udinesi.",
    portfolioTitles: [
      "Eleonora Politi Photographer",
      "Como Private Driver",
      "Gioia Capelli",
      "Pompe Funebri Tortarolo e Conti",
    ],
    testimonialNames: ["Eleonora", "Marco Ricci", "Damiano Sain", "Stefano Erde"],
    relatedHeading: "Da Udine verso l’Alto Friuli",
    relatedSlugs: [
      "gemona-del-friuli",
      "tarcento",
      "san-daniele-del-friuli",
      "tolmezzo",
    ],
    extraLinks: [
      { label: "Freelance in Friuli Venezia Giulia", href: "/friuli" },
      { label: "Quanto costa un sito web", href: "/costo-sito-web" },
      { label: "Tutti i servizi", href: "/servizi" },
      { label: "Pagina silo Comune di Udine", href: "/comuni/udine-ud" },
    ],
    faqs: [
      {
        question: "Fate siti solo per Udine?",
        answer:
          "No. La base è Udine; i progetti sono nazionali. Udine e il Friuli sono il contesto quotidiano, non un recinto.",
      },
      {
        question: "Next.js o WordPress?",
        answer:
          "Next.js quando vuoi controllo, velocità e un sito che resta tuo. WordPress ha senso in altri scenari; non lo forzo né lo demonizzo a prescindere. Te lo dico sul caso.",
      },
      {
        question: "Sostituite un sito WordPress esistente?",
        answer:
          "Sì quando conviene. A volte basta un intervento; a volte la migrazione. Non ricostruisco per vendere ore.",
      },
      {
        question: "Quanto costa un sito a Udine?",
        answer:
          "Stessi range della guida sui costi: la città non ha un listino magico. Cambia complessità, non il CAP.",
      },
      {
        question: "Fate anche chatbot e automazioni?",
        answer:
          "Sì, quando riducono lavoro ripetitivo (richieste, FAQ, passaggio a WhatsApp). Non installo un bot per moda.",
      },
    ],
    ctaTitle: "Hai un progetto a Udine o in provincia?",
    ctaBody:
      "Raccontami cosa vuoi ottenere. Ti rispondo con uno stack e un perimetro, non con un pacchetto anonimo.",
    ctaLabel: "Parliamone",
  },
];
