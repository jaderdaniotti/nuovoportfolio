export type ServiceHowStep = {
  number: string;
  title: string;
  body: string;
};

export type ServicePage = {
  slug: string;
  name: string;
  description: string;
  heroTitle: string;
  heroBody: string;
  heroCta: string;
  problemTitle: string;
  problemBody: string;
  features: string[];
  solutionTitle?: string;
  solutionBody?: string;
  howTitle?: string;
  howIntro?: string;
  howSteps?: ServiceHowStep[];
  audienceTitle?: string;
  audienceBody?: string;
  audienceItems?: string[];
  extraTitle?: string;
  extraBody?: string;
  extraItems?: string[];
  ctaTitle: string;
  ctaBody: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "matrimoni",
    name: "Siti per matrimoni",
    description:
      "Sito dedicato al matrimonio: RSVP, location, lista nozze e galleria per accompagnare gli invitati.",
    heroTitle: "Il vostro giorno, raccontato online.",
    heroBody:
      "Un sito dedicato al vostro matrimonio, progettato per raccogliere tutte le informazioni che i vostri invitati devono sapere in un unico posto. Dalla conferma della presenza alla location, dalla lista nozze alla galleria fotografica: tutto il necessario per accompagnare gli invitati prima, durante e dopo il grande giorno.",
    heroCta: "Crea il tuo sito",
    problemTitle: "Un sito pensato per gli sposi",
    problemBody:
      "Un invito cartaceo non basta sempre. Gli invitati hanno bisogno di sapere dove andare, a che ora arrivare, come confermare la presenza e trovare tutte le informazioni utili. Il vostro sito diventa il punto di riferimento dell’evento.",
    features: [
      "Conferma presenza online",
      "Countdown al matrimonio",
      "Informazioni sulla cerimonia",
      "Mappa e indicazioni per raggiungere la location",
      "Lista nozze",
      "Galleria fotografica",
      "Informazioni su hotel e strutture vicine",
      "Dress code",
      "Programma della giornata",
      "Contatti",
      "Condivisione tramite QR code",
    ],
    solutionTitle: "Pensato per essere davvero vostro",
    solutionBody:
      "Parto da una struttura già progettata e la personalizzo con colori, fotografie, testi, nomi e stile del vostro matrimonio. Il risultato non è un semplice template: è il vostro spazio digitale.",
    ctaTitle: "Tutto il vostro matrimonio, in un unico posto.",
    ctaBody:
      "Raccontami come avete immaginato il vostro giorno. Costruisco insieme il sito che accompagnerà voi e i vostri invitati.",
  },
  {
    slug: "sagre-eventi",
    name: "Sagre ed eventi comunali",
    description:
      "Sito per sagre, feste patronali e manifestazioni comunali: programma, mappa, espositori e informazioni pratiche.",
    heroTitle: "La vostra manifestazione merita uno spazio tutto suo.",
    heroBody:
      "Un sito dedicato a sagre, feste patronali, manifestazioni comunali ed eventi locali, con tutte le informazioni organizzate in modo semplice e accessibile.",
    heroCta: "Parliamone",
    problemTitle: "Tutto ciò che serve per far conoscere l’evento",
    problemBody:
      "Programma, calendario, location, espositori, sponsor, menù e informazioni pratiche vengono raccolti in un unico sito facilmente consultabile anche da smartphone.",
    features: [
      "Programma della manifestazione",
      "Calendario degli appuntamenti",
      "Mappa dell’evento",
      "Espositori",
      "Stand gastronomici",
      "Menù",
      "Sponsor",
      "Informazioni su parcheggi e accessi",
      "Galleria fotografica",
      "Contatti",
      "Condivisione tramite QR code",
    ],
    solutionTitle: "Un sistema che può crescere insieme all’evento",
    solutionBody:
      "La struttura viene progettata per poter essere aggiornata nel tempo, aggiungendo nuove edizioni, appuntamenti, sponsor e contenuti.",
    ctaTitle: "Portate la vostra manifestazione online.",
    ctaBody:
      "Raccontami l’evento e costruisco uno spazio digitale dedicato alla tua comunità.",
  },
  {
    slug: "ristoranti",
    name: "Ristoranti con prenotazione",
    description:
      "Sito per ristoranti: menù digitale, prenotazione tavoli, galleria ed eventi in un’unica esperienza.",
    heroTitle: "Il vostro ristorante, oltre il semplice menù.",
    heroBody:
      "Un sito moderno che presenta il locale, valorizza la cucina e permette ai clienti di trovare informazioni e prenotare in modo semplice.",
    heroCta: "Parliamone",
    problemTitle: "Dal primo click alla prenotazione",
    problemBody:
      "Il sito diventa il punto di riferimento del ristorante: menù, informazioni, eventi, immagini e prenotazioni sono organizzati in un’esperienza unica.",
    features: [
      "Menù digitale",
      "Prenotazione tavoli",
      "QR code",
      "Galleria fotografica",
      "Eventi",
      "Piatti e specialità",
      "Informazioni sul locale",
      "Google Maps",
      "WhatsApp",
      "Richieste per gruppi",
      "Possibilità di integrare ordini online",
    ],
    solutionTitle: "Pensato per il cliente",
    solutionBody:
      "Il cliente deve poter trovare rapidamente ciò che cerca: cosa mangiare, dove siete, quando siete aperti e come prenotare.",
    ctaTitle: "Trasformo ogni visita sul sito in un’opportunità.",
    ctaBody:
      "Raccontami il tuo ristorante e progetto la presenza digitale più adatta al tuo locale.",
  },
  {
    slug: "bb-case-vacanza",
    name: "B&B e case vacanza",
    description:
      "Sito per B&B e case vacanza: camere, galleria, disponibilità e informazioni sul territorio.",
    heroTitle: "Fai venire voglia di soggiornare prima ancora di arrivare.",
    heroBody:
      "Un sito dedicato a B&B, appartamenti e case vacanza per presentare la struttura, mostrare gli ambienti e accompagnare il visitatore verso la prenotazione.",
    heroCta: "Parliamone",
    problemTitle: "La tua struttura, raccontata nel modo giusto",
    problemBody:
      "Fotografie, camere, servizi, disponibilità, posizione e informazioni sul territorio vengono organizzati in un’esperienza pensata per chi sta scegliendo dove soggiornare.",
    features: [
      "Presentazione delle camere",
      "Galleria fotografica",
      "Calendario disponibilità",
      "Prenotazioni",
      "Pagamenti online",
      "Servizi della struttura",
      "Mappa",
      "Informazioni sul territorio",
      "Guida turistica",
      "FAQ",
      "Multilingua",
      "Contatti",
    ],
    solutionTitle: "Un’esperienza completa",
    solutionBody:
      "Il sito può diventare anche una guida per i tuoi ospiti, fornendo informazioni su ristoranti, attrazioni, trasporti e attività nelle vicinanze.",
    ctaTitle: "Fai conoscere la tua struttura.",
    ctaBody:
      "Costruisco uno spazio digitale capace di trasformare la curiosità dei visitatori in soggiorni.",
  },
  {
    slug: "professionisti",
    name: "Siti per professionisti",
    description:
      "Sito professionale costruito intorno al tuo settore: servizi, portfolio, appuntamenti e contatti.",
    heroTitle: "La tua professione merita una presenza digitale all’altezza.",
    heroBody:
      "Un sito progettato intorno al tuo lavoro, alla tua professionalità e alle persone che vuoi raggiungere.",
    heroCta: "Parliamone",
    problemTitle: "Non un sito generico",
    problemBody:
      "Un avvocato, un architetto, un fotografo e un commercialista hanno esigenze completamente diverse. Per questo parto dal settore e costruisco una struttura coerente con il modo in cui lavori.",
    audienceTitle: "Possibili soluzioni",
    audienceItems: [
      "Commercialisti",
      "Avvocati",
      "Architetti",
      "Geometri",
      "Fotografi",
      "Consulenti",
      "Designer",
      "Liberi professionisti",
      "Studi professionali",
    ],
    features: [
      "Presentazione professionale",
      "Servizi",
      "Portfolio",
      "Progetti",
      "Recensioni",
      "Contatti",
      "Richiesta appuntamento",
      "Moduli",
      "Google Maps",
      "Blog",
      "Area documenti",
    ],
    ctaTitle: "Fai capire subito chi sei e cosa puoi fare.",
    ctaBody:
      "Raccontami la tua professione. Costruisco una presenza digitale coerente con il tuo lavoro.",
  },
  {
    slug: "associazioni-sportive",
    name: "Associazioni sportive",
    description:
      "Sito per società sportive: calendario, risultati, rosa, staff, sponsor e iscrizioni.",
    heroTitle: "Tutta la tua società sportiva, in un unico posto.",
    heroBody:
      "Un sito pensato per società sportive, squadre e associazioni, dove giocatori, famiglie e tifosi possono trovare rapidamente tutte le informazioni.",
    heroCta: "Parliamone",
    problemTitle: "Una piattaforma per la tua squadra",
    problemBody:
      "Calendario, risultati, rosa, staff, sponsor e comunicazioni diventano facilmente accessibili da smartphone.",
    features: [
      "Calendario partite",
      "Risultati",
      "Rosa giocatori",
      "Staff",
      "Classifiche",
      "News",
      "Foto",
      "Sponsor",
      "Iscrizioni",
      "Contatti",
      "Calendario allenamenti",
    ],
    ctaTitle: "Dai alla tua società uno spazio digitale tutto suo.",
    ctaBody:
      "Costruisco una piattaforma pensata per la tua squadra e per la tua comunità sportiva.",
  },
  {
    slug: "band-eventi",
    name: "Band ed eventi musicali",
    description:
      "Sito per musicisti, DJ e band: biografia, media, calendario e booking.",
    heroTitle: "La tua musica merita di essere ascoltata. E trovata.",
    heroBody:
      "Un sito per musicisti, DJ e band che vogliono presentarsi professionalmente, mostrare il proprio lavoro e ricevere richieste di booking.",
    heroCta: "Parliamone",
    problemTitle: "Tutto quello che serve per il tuo prossimo ingaggio",
    problemBody:
      "Biografia, musica, video, fotografie, calendario eventi e contatti vengono raccolti in un’unica esperienza.",
    features: [
      "Biografia",
      "Discografia",
      "Spotify",
      "YouTube",
      "Foto e video",
      "Calendario eventi",
      "Instagram",
      "Press kit",
      "Booking",
      "Richiesta informazioni",
    ],
    ctaTitle: "Trasforma il tuo profilo online in uno strumento professionale.",
    ctaBody:
      "Raccontami il tuo progetto musicale e costruisco il tuo spazio digitale.",
  },
  {
    slug: "agenzie-immobiliari",
    name: "Agenzie immobiliari",
    description:
      "Sito immobiliare con schede complete, ricerca avanzata, planimetrie e richiesta appuntamento.",
    heroTitle: "Gli immobili devono essere facili da trovare. E impossibili da ignorare.",
    heroBody:
      "Un sito immobiliare progettato per presentare gli immobili in modo chiaro, moderno e professionale.",
    heroCta: "Parliamone",
    problemTitle: "Ogni immobile, una scheda completa",
    problemBody:
      "Fotografie, caratteristiche, planimetrie, video, posizione e richiesta di appuntamento vengono organizzati in modo intuitivo.",
    features: [
      "Schede immobili",
      "Ricerca avanzata",
      "Filtri",
      "Galleria fotografica",
      "Planimetrie",
      "Video",
      "Informazioni tecniche",
      "Mappa",
      "Richiesta informazioni",
      "Prenotazione appuntamenti",
      "Moduli di contatto",
    ],
    ctaTitle: "Portiamo il tuo catalogo immobiliare online.",
    ctaBody:
      "Costruisco uno strumento che renda più semplice presentare, cercare e valorizzare i tuoi immobili.",
  },
  {
    slug: "eventi-privati",
    name: "Eventi privati",
    description:
      "Pagina dedicata a compleanni, lauree, battesimi e feste: RSVP, location e programma.",
    heroTitle: "Un evento. Una pagina da ricordare.",
    heroBody:
      "Un sito dedicato a compleanni, lauree, battesimi, feste, anniversari ed eventi aziendali.",
    heroCta: "Parliamone",
    problemTitle: "Tutte le informazioni che servono agli invitati",
    problemBody:
      "Location, orari, programma, fotografie e conferma della partecipazione possono essere raccolti in un unico spazio.",
    features: [
      "Pagina dedicata all’evento",
      "Countdown",
      "RSVP",
      "QR code",
      "Location",
      "Indicazioni stradali",
      "Programma",
      "Galleria",
      "Informazioni utili",
      "Contatti",
    ],
    ctaTitle: "Il tuo evento comincia prima ancora che inizi.",
    ctaBody:
      "Creo una pagina dedicata per raccontarlo e coinvolgere i tuoi invitati.",
  },
  {
    slug: "artigiani",
    name: "Siti per artigiani",
    description:
      "Sito per artigiani e imprese locali: portfolio lavori, zona di intervento e richiesta preventivo.",
    heroTitle: "Fai vedere quello che sai fare.",
    heroBody:
      "Un sito progettato per artigiani e imprese locali che vogliono mostrare i propri lavori e ricevere nuove richieste.",
    heroCta: "Parliamone",
    problemTitle: "Il portfolio diventa il tuo biglietto da visita",
    problemBody:
      "Un potenziale cliente vuole vedere cosa hai già realizzato. Per questo mettiamo al centro lavori, servizi, zona di intervento e richiesta di preventivo.",
    audienceTitle: "Pensato per",
    audienceItems: [
      "Falegnami",
      "Idraulici",
      "Elettricisti",
      "Muratori",
      "Imbianchini",
      "Fabbri",
      "Serramentisti",
      "Giardinieri",
      "Meccanici",
      "Altri artigiani",
    ],
    features: [
      "Portfolio lavori",
      "Servizi",
      "Richiesta preventivo",
      "Upload fotografie",
      "Zona di intervento",
      "WhatsApp",
      "Google Maps",
      "Recensioni",
      "Contatti",
    ],
    ctaTitle: "Fai parlare i tuoi lavori.",
    ctaBody:
      "Mostraci cosa fai ogni giorno e trasformiamo la tua esperienza in una presenza digitale professionale.",
  },
  {
    slug: "landing-ads",
    name: "Landing per campagne ads",
    description:
      "Landing page per campagne Google, Instagram e Facebook: un obiettivo, una call to action, tracking.",
    heroTitle: "La pubblicità porta persone. La landing deve convincerle.",
    heroBody:
      "Una pagina progettata per accompagnare chi arriva da Google, Instagram, Facebook o altre campagne verso una singola azione.",
    heroCta: "Parliamone",
    problemTitle: "Una pagina. Un obiettivo.",
    problemBody:
      "Una landing efficace elimina distrazioni e mette al centro l’offerta, i vantaggi e la call to action.",
    features: [
      "Hero ad alta conversione",
      "Call to action",
      "Form",
      "WhatsApp",
      "Recensioni",
      "Vantaggi",
      "FAQ",
      "Tracking",
      "Integrazione campagne",
      "Responsive design",
    ],
    ctaTitle: "Hai già una campagna? Costruisco la pagina che la supporta.",
    ctaBody:
      "Raccontami cosa vuoi promuovere e qual è l’azione che vuoi ottenere.",
  },
  {
    slug: "one-page",
    name: "OnePage Start",
    description:
      "Una pagina web essenziale e professionale: presentazione, servizi, contatti e posizione.",
    heroTitle: "Tutto quello che serve. In una sola pagina.",
    heroBody:
      "Una pagina web essenziale e professionale per attività che vogliono essere online senza costruire un progetto complesso.",
    heroCta: "Parliamone",
    problemTitle: "Una presenza digitale semplice",
    problemBody:
      "Presentazione, servizi, contatti, WhatsApp, social e posizione vengono organizzati in una singola esperienza chiara e responsive.",
    features: [
      "Presentazione",
      "Servizi",
      "Contatti",
      "WhatsApp",
      "Google Maps",
      "Social",
      "SEO di base",
      "Responsive design",
      "Form contatti",
    ],
    ctaTitle: "Parto dalla cosa più importante: esserci.",
    ctaBody:
      "Raccontami la tua attività e costruisco una pagina che la rappresenti.",
  },
  {
    slug: "sito-48h",
    name: "Sito in 48/72 ore",
    description:
      "Sito professionale in tempi rapidi per chi ha già logo, fotografie e testi pronti.",
    heroTitle: "Hai già tutto. Ti manca solo il sito.",
    heroBody:
      "Per chi ha logo, fotografie e testi pronti e vuole trasformarli rapidamente in un sito professionale.",
    heroCta: "Partiamo",
    problemTitle: "Un processo pensato per essere veloce",
    problemBody:
      "Scelgo una struttura già progettata, inserisco i tuoi contenuti, personalizzo l’identità visiva e preparo il sito per la pubblicazione.",
    features: [
      "Struttura già progettata",
      "Inserimento contenuti",
      "Personalizzazione visiva",
      "Ottimizzazione",
      "Pubblicazione",
    ],
    howTitle: "Come funziona",
    howSteps: [
      {
        number: "01",
        title: "Scegli la struttura",
        body: "Individuiamo il modello più adatto alla tua attività.",
      },
      {
        number: "02",
        title: "Ci fornisci i materiali",
        body: "Logo, fotografie, testi, contatti e informazioni.",
      },
      {
        number: "03",
        title: "Personalizziamo",
        body: "Adattiamo grafica, contenuti e componenti alla tua attività.",
      },
      {
        number: "04",
        title: "Pubblicazione",
        body: "Il sito viene ottimizzato e pubblicato.",
      },
    ],
    ctaTitle: "Hai già i materiali? Partiamo.",
    ctaBody:
      "Mandaci quello che hai e valutiamo insieme la soluzione più adatta.",
  },
  {
    slug: "palestre",
    name: "Palestre e personal trainer",
    description:
      "Sistema digitale per palestre e personal trainer: corsi, clienti, appuntamenti e comunicazioni.",
    heroTitle: "Una palestra non ha bisogno solo di un sito.",
    heroBody:
      "Ha bisogno di uno strumento che aiuti a gestire corsi, clienti, appuntamenti e comunicazioni.",
    heroCta: "Parliamone",
    problemTitle: "Dalla presentazione alla gestione",
    problemBody:
      "Creo sistemi digitali pensati per palestre, personal trainer e centri fitness.",
    features: [
      "Prenotazione corsi",
      "Calendario",
      "Gestione lezioni",
      "Schede allenamento",
      "Profili utenti",
      "Abbonamenti",
      "Pagamenti online",
      "Comunicazioni",
      "Area riservata",
    ],
    ctaTitle: "Portiamo la tua palestra nel digitale.",
    ctaBody:
      "Raccontami come gestisci oggi corsi e clienti e individuiamo cosa può essere automatizzato.",
  },
  {
    slug: "preventivi-online",
    name: "Sistema preventivi online",
    description:
      "Sistema di preventivazione online: servizio, informazioni, fotografie e richiesta già organizzata.",
    heroTitle: "Meno telefonate. Richieste di preventivo più complete.",
    heroBody:
      "Un sistema che permette ai potenziali clienti di fornire tutte le informazioni necessarie prima ancora del primo contatto.",
    heroCta: "Parliamone",
    problemTitle: "Come funziona",
    problemBody:
      "Il cliente seleziona il servizio, inserisce le informazioni richieste, indica dimensioni e località e può allegare fotografie. Tu ricevi una richiesta già organizzata.",
    features: [
      "Selezione servizio",
      "Domande personalizzate",
      "Metrature",
      "Upload fotografie",
      "Zona di intervento",
      "Tempistiche",
      "Note del cliente",
      "Invio automatico della richiesta",
      "Notifiche",
    ],
    ctaTitle: "Trasforma una richiesta generica in un’opportunità concreta.",
    ctaBody:
      "Costruisco il sistema di preventivazione più adatto al tuo lavoro.",
  },
  {
    slug: "prenotazioni",
    name: "Portali di prenotazione",
    description:
      "Sistema di prenotazione online per attività su appuntamento: calendario, conferme e promemoria.",
    heroTitle: "Prenotazioni più semplici. Per te e per i tuoi clienti.",
    heroBody:
      "Un sistema online per gestire appuntamenti, disponibilità e richieste senza dipendere esclusivamente da telefonate e messaggi.",
    heroCta: "Parliamone",
    problemTitle: "Pensato per attività che lavorano su appuntamento",
    problemBody:
      "Calendario, disponibilità e conferme in un unico strumento, pensato per chi riceve ogni giorno richieste di appuntamento.",
    audienceItems: [
      "Parrucchieri",
      "Barbieri",
      "Centri estetici",
      "Tatuatori",
      "Officine",
      "Consulenti",
      "Professionisti",
      "Studi",
    ],
    features: [
      "Calendario",
      "Disponibilità",
      "Prenotazione online",
      "Conferme",
      "Promemoria",
      "WhatsApp",
      "Email",
      "Gestione appuntamenti",
      "Cancellazioni",
    ],
    ctaTitle: "Trasforma il tuo calendario in un sistema automatico.",
    ctaBody: "Raccontami come gestisci oggi gli appuntamenti.",
  },
  {
    slug: "cv-portfolio",
    name: "Portfolio e CV online",
    description:
      "Sito personale per freelance e creativi: progetti, competenze, esperienze e download CV.",
    heroTitle: "Il tuo CV racconta cosa hai fatto. Il portfolio mostra cosa sai fare.",
    heroBody:
      "Un sito personale per professionisti, freelance e creativi che vogliono presentare competenze e progetti in modo più efficace.",
    heroCta: "Parliamone",
    problemTitle: "La tua identità professionale online",
    problemBody:
      "Progetti, esperienze, competenze e contatti vengono raccolti in una pagina progettata intorno al tuo profilo.",
    features: [
      "Presentazione",
      "Portfolio",
      "Progetti",
      "Competenze",
      "Esperienze",
      "Formazione",
      "Contatti",
      "Social",
      "Download CV",
      "Link professionali",
    ],
    ctaTitle: "Fai vedere quello che sai fare.",
    ctaBody: "Costruisco il tuo portfolio professionale.",
  },
  {
    slug: "eventi-locali",
    name: "Portali per eventi locali",
    description:
      "Portale per sagre, concerti e manifestazioni del territorio: calendario, mappa e schede evento.",
    heroTitle: "Tutti gli eventi della tua zona. In un unico posto.",
    heroBody:
      "Un portale dedicato alla scoperta di sagre, concerti, mercatini, manifestazioni ed eventi locali.",
    heroCta: "Parliamone",
    problemTitle: "Un punto di riferimento per il territorio",
    problemBody:
      "Gli utenti possono scoprire cosa succede nella propria zona, mentre organizzatori e associazioni possono presentare i propri eventi.",
    features: [
      "Calendario eventi",
      "Categorie",
      "Ricerca",
      "Mappa",
      "Schede evento",
      "Date e orari",
      "Informazioni organizzatore",
      "Eventi in evidenza",
      "Condivisione social",
      "Newsletter",
    ],
    extraTitle: "Per gli organizzatori",
    extraBody:
      "Ogni evento può avere una propria pagina con tutte le informazioni necessarie: programma, location, immagini, contatti e collegamenti esterni.",
    ctaTitle: "Costruisco il punto di riferimento digitale per gli eventi della tua zona.",
    ctaBody: "Hai un’idea per un portale locale? Parliamone.",
  },
  {
    slug: "digitalizzazione",
    name: "Digitalizzazione dell’azienda",
    description:
      "Ecosistema digitale per l’azienda: sito, email, CRM, automazioni, SEO e manutenzione.",
    heroTitle: "Non ti serve soltanto un sito. Ti serve un sistema.",
    heroBody:
      "La digitalizzazione di un’attività parte dal sito, ma non finisce lì. Costruisco un ecosistema digitale in cui sito, contatti, comunicazioni, automazioni e strumenti aziendali lavorano insieme.",
    heroCta: "Parliamone",
    problemTitle: "Un unico progetto",
    problemBody:
      "Analizziamo come lavora la tua azienda e individuiamo quali attività possono essere semplificate, automatizzate o portate online.",
    extraTitle: "Possibili componenti",
    extraItems: [
      "Sito web",
      "Dominio",
      "Email professionali",
      "Google Business",
      "Moduli di contatto",
      "CRM",
      "Automazioni",
      "Gestione lead",
      "SEO",
      "Integrazioni",
      "Strumenti interni",
      "Manutenzione",
    ],
    features: [
      "Analisi dei processi",
      "Sito e identità digitale",
      "Automazioni",
      "CRM e lead",
      "Integrazioni",
      "Manutenzione",
    ],
    solutionTitle: "Dalla richiesta del cliente alla gestione interna",
    solutionBody:
      "L’obiettivo non è semplicemente creare una bella interfaccia. È costruire un sistema che riduca il lavoro manuale, organizzi le informazioni e renda più semplice gestire i clienti.",
    ctaTitle: "Parto da come lavora oggi la tua azienda.",
    ctaBody:
      "Raccontami quali strumenti utilizzi e quali attività vuoi migliorare. Individuiamo insieme le opportunità di digitalizzazione.",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
