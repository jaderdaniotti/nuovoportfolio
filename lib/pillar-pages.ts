export type PillarFaq = { question: string; answer: string };

export type PillarSection = {
  heading: string;
  paragraphs: string[];
};

export type PillarPage = {
  slug: "udine" | "friuli" | "costo-sito-web";
  path: string;
  eyebrow: string;
  title: string;
  /** Meta title */
  seoTitle: string;
  description: string;
  intro: string;
  sections: PillarSection[];
  faq: PillarFaq[];
  related: Array<{ label: string; href: string }>;
  ctaTitle: string;
  ctaBody: string;
};

export const pillarPages: PillarPage[] = [
  {
    slug: "udine",
    path: "/udine",
    eyebrow: "Udine",
    title: "Siti web a Udine",
    seoTitle: "Siti web a Udine — freelance web | jaderweb",
    description:
      "Creo siti web a Udine per PMI, professionisti e attività locali: chiari, veloci, pensati per convertire. Freelance, referente unico.",
    intro:
      "Se cerchi un sito web a Udine, non ti serve un’agenzia con dieci slide. Ti serve qualcuno che capisca il territorio, metta online una presenza seria e resti raggiungibile dopo il go-live. Sono Jader Daniotti: lavoro da qui, su progetti su misura.",
    sections: [
      {
        heading: "Cosa significa “sito web a Udine” nella pratica",
        paragraphs: [
          "Non è solo mettere la parola Udine nel title. È allineare sito, recapiti e messaggio a chi ti cerca in città e in provincia: orari, zona, WhatsApp, Maps, servizi chiari. Google Business Profile e sito devono dire le stesse cose.",
          "Lavoro con studi, negozi, hospitality, artigiani e piccole imprese. Spesso partiamo da un sito vecchio o da zero: prima chiarisco obiettivo (chiamate, preventivi, prenotazioni), poi costruisco pagine che rispondono a quelle ricerche.",
        ],
      },
      {
        heading: "Perché un referente locale (anche se lavori in tutta Italia)",
        paragraphs: [
          "Opero da Udine e seguo clienti in Friuli e oltre. Il vantaggio non è “essere dietro l’angolo per forza”: è parlare la stessa lingua operativa — tempi reali, decisioni rapide, niente giro di account manager.",
          "Se hai già un progetto a Milano o Roma ma vuoi un interlocutore unico in FVG, va bene lo stesso: il codice e l’hosting non hanno confine; la chiarezza sì.",
        ],
      },
      {
        heading: "Cosa includo di solito",
        paragraphs: [
          "Design e sviluppo su misura (Next.js quando ha senso), mobile-first, SEO tecnica di base, form o WhatsApp, pagine servizi, privacy/cookie coerenti con una vetrina professionale. Niente CMS pesante se non serve.",
          "Per le attività locali collego spesso la scheda Google, le foto vere e le prove concrete (casi, recensioni, lavori). Se ti serve un pezzo specifico — landing ads, prenotazioni, preventivi — lo trattiamo come obiettivo, non come gadget.",
        ],
      },
      {
        heading: "Come lavoriamo",
        paragraphs: [
          "Brief corto, proposta con tempi e perimetro, design e contenuti, messa online, ritocchi. Ti dico cosa manca (testi, foto, P.IVA in footer) prima che diventi un blocco.",
          "Se vuoi solo un’idea di budget, guarda anche la pagina sul costo di un sito web. Se vuoi partire, scrivimi da Contatti o WhatsApp.",
        ],
      },
    ],
    faq: [
      {
        question: "Fai siti solo per Udine?",
        answer:
          "No. Sono basato a Udine e lavoro in tutta Italia. Udine e il Friuli sono il contesto in cui opero ogni giorno; i progetti possono essere ovunque.",
      },
      {
        question: "Quanto tempo serve per un sito vetrina?",
        answer:
          "Dipende da contenuti pronti e complessità. Una vetrina chiara spesso si chiude in poche settimane se testi e foto arrivano senza ritardi. Te lo dico nel preventivo, non a sensazione.",
      },
      {
        question: "Sostituisci un sito WordPress esistente?",
        answer:
          "Sì, quando ha senso. Valuto se conviene migrare, rifare o sistemare. Non forzo un rebuild se un intervento mirato basta.",
      },
    ],
    related: [
      { label: "Freelance web in Friuli Venezia Giulia", href: "/friuli" },
      { label: "Quanto costa un sito web", href: "/costo-sito-web" },
      { label: "Pagina locale Udine (silo comuni)", href: "/comuni/udine-ud" },
      { label: "Tutti i servizi", href: "/servizi" },
    ],
    ctaTitle: "Hai un’attività a Udine o in zona?",
    ctaBody:
      "Raccontami cosa vuoi ottenere dal sito. Ti rispondo io, con un perimetro chiaro.",
  },
  {
    slug: "friuli",
    path: "/friuli",
    eyebrow: "Friuli Venezia Giulia",
    title: "Freelance web in Friuli Venezia Giulia",
    seoTitle: "Freelance web Friuli Venezia Giulia | jaderweb",
    description:
      "Freelance web in FVG: siti, landing e digitalizzazione per imprese e professionisti. Un referente da Udine, progetti in regione e oltre.",
    intro:
      "Il Friuli Venezia Giulia ha imprese piccole, distretti forti e tanta attività che ancora vive di passaparola e social. Un sito solido non è un vezzo: è l’indirizzo stabile che Google e i clienti possono usare. Lavoro da Udine come freelance web per chi vuole risultati senza struttura da agenzia.",
    sections: [
      {
        heading: "Per chi è pensato questo servizio in FVG",
        paragraphs: [
          "PMI, artigiani, studi professionali, ristorazione, hospitality, associazioni e chi vende servizi sul territorio. Se il cliente ti cerca per nome del comune o della provincia, il sito deve rispondere in modo concreto.",
          "Conosco i ritmi locali: decisioni rapide, budget sensati, poco tempo da buttare in riunioni inutili. Preferisco un brief onesto e una delivery misurabile.",
        ],
      },
      {
        heading: "Cosa costruisco",
        paragraphs: [
          "Siti vetrina, landing per campagne, flussi di contatto (form, WhatsApp), basi SEO, a volte e-commerce o digitalizzazione leggera (dominio, email, CRM semplice). Stack moderno quando serve performance e controllo del codice.",
          "Se operi tra Udine, Pordenone, Gorizia, Trieste o in Carnia, posso allineare messaggi e pagine locali senza gonfiare il progetto di template clonati.",
        ],
      },
      {
        heading: "Regione + Italia: come gestisco i progetti",
        paragraphs: [
          "Essere in FVG non limita il raggio. Molti lavori sono remoti: call, Figma o bozze, deploy, assistenza. La differenza è avere un interlocutore unico che conosce anche il mercato regionale.",
          "Per chi vuole copertura locale ampia, esiste anche il silo comuni: pagine geografiche che puntano a servizi reali. Le uso dove hanno senso SEO, non come spam.",
        ],
      },
      {
        heading: "Prossimo passo",
        paragraphs: [
          "Se cerchi un freelance web in Friuli Venezia Giulia, partiamo da obiettivo e vincoli (tempi, contenuti, budget). Niente pacchetto misterioso: ti dico cosa entra e cosa no.",
          "Per Udine città c’è una pagina dedicata. Per i range di spesa, la guida sul costo del sito. Per parlare del tuo caso: Contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Lavori anche fuori dal Friuli?",
        answer:
          "Sì. La base è Udine/FVG; i progetti possono essere nazionali. Call e consegna online sono la regola.",
      },
      {
        question: "Fai anche SEO locale in regione?",
        answer:
          "Imposto basi tecniche e contenuti locali sensati (servizi, comuni, NAP). Non vendo “primo posto garantito”: lavoro su segnali reali e chiarezza delle pagine.",
      },
      {
        question: "Posso chiederti solo una landing?",
        answer:
          "Sì. Spesso è il pezzo giusto per ads o un’offerta precisa. La disegnamo intorno a un’azione sola, non a un sito intero.",
      },
    ],
    related: [
      { label: "Siti web a Udine", href: "/udine" },
      { label: "Quanto costa un sito web", href: "/costo-sito-web" },
      { label: "Servizi", href: "/servizi" },
      { label: "Directory comuni", href: "/comuni" },
    ],
    ctaTitle: "Cerchi un freelance web in FVG?",
    ctaBody:
      "Scrivimi due righe sul progetto. Ti dico se ha senso e come lo imposterei.",
  },
  {
    slug: "costo-sito-web",
    path: "/costo-sito-web",
    eyebrow: "Prezzi",
    title: "Quanto costa un sito web",
    seoTitle: "Quanto costa un sito web nel 2026 | jaderweb",
    description:
      "Range reali per un sito web nel 2026: cosa fa salire il prezzo, cosa puoi evitare, e come ti preventivo da freelance a Udine.",
    intro:
      "“Quanto costa un sito web?” non ha una cifra unica — e chi te la tira fuori a freddo di solito sta vendendo un pacchetto, non un progetto. Qui ti spiego cosa fa muovere il prezzo e come lavoro io, così puoi arrivare al preventivo con le idee chiare.",
    sections: [
      {
        heading: "Ordini di grandezza (indicativi)",
        paragraphs: [
          "Una vetrina essenziale, ben fatta, con design su misura e basi SEO, di solito si colloca nell’ordine di qualche centinaio fino a circa mille euro di setup, a seconda di pagine e contenuti. Progetti con più sezioni, animazioni, form avanzati o blog salgono verso la fascia 1.000–2.000 €. E-commerce, aree riservate, integrazioni o digitalizzazione più ampia richiedono preventivo dedicato.",
          "Oltre al setup conta la manutenzione: aggiornamenti, sicurezza, piccole modifiche. Meglio metterla in conto che scoprire il sito fermo dopo un anno. I numeri esatti li chiudo dopo il brief — questi range servono a orientarti, non a sostituire una proposta.",
        ],
      },
      {
        heading: "Cosa fa alzare (o abbassare) il prezzo",
        paragraphs: [
          "Alza: tante pagine uniche, copy da scrivere da zero, foto da selezionare/ottimizzare, prenotazioni, preventivi online, multilingua, migrazioni da CMS vecchi, integrazioni CRM o gestionali.",
          "Abbassa: obiettivi chiari, contenuti pronti, poche pagine che convertono, niente feature “tanto per averle”. Un one-page fatto bene batte un sito di dodici pagine vuote.",
        ],
      },
      {
        heading: "Freelance vs agenzia vs template",
        paragraphs: [
          "Un template a 49 € non è un sito professionale: è un punto di partenza. L’agenzia può costare di più per struttura e account. Io sto nel mezzo operativo: un referente, codice e design sotto controllo, senza gonfiare le riunioni.",
          "Se ti serve solo una landing ads, non ti vendo un portale. Se ti serve un ecosistema (sito + email + flussi), lo dichiariamo come tale e lo prezziamo per pezzi.",
        ],
      },
      {
        heading: "Come ti preventivo",
        paragraphs: [
          "Mi dici obiettivo, esempi che ti piacciono, cosa hai già (dominio, testi, logo) e scadenze. Ti rispondo con perimetro, tempi e cifra — o con le domande che mancano.",
          "Niente sorprese da “poi vediamo il resto in corso d’opera” senza accordo. Se il progetto cresce, lo rivalutiamo insieme.",
        ],
      },
    ],
    faq: [
      {
        question: "Il prezzo include hosting e dominio?",
        answer:
          "Dipende dal progetto. Spesso configuro hosting e dominio nel setup; i rinnovi annuali restano a carico tuo o li gestiamo nella manutenzione. Te lo scrivo nel preventivo.",
      },
      {
        question: "Posso avere un sito “low cost” serio?",
        answer:
          "Sì, se accetti un perimetro stretto: poche pagine, tuoi contenuti, niente integrazioni esotiche. Low cost non significa fragile o illegibile su mobile.",
      },
      {
        question: "Fate fattura / P.IVA?",
        answer:
          "Sì. Opero con P.IVA; in footer trovi i riferimenti. Per dettagli fiscali sul tuo caso, li chiariamo in fase d’ordine.",
      },
    ],
    related: [
      { label: "Siti web a Udine", href: "/udine" },
      { label: "Freelance web in FVG", href: "/friuli" },
      { label: "Servizi", href: "/servizi" },
      { label: "Richiedi un preventivo", href: "/contatti" },
    ],
    ctaTitle: "Vuoi un preventivo sul tuo caso?",
    ctaBody:
      "Due righe su cosa ti serve bastano per partire. Ti rispondo con numeri e tempi reali.",
  },
];

export function getPillarPage(slug: string) {
  return pillarPages.find((page) => page.slug === slug);
}
