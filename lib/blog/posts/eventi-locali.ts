import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Eventi locali — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const eventiLocaliPosts = [
  {
    slug: "aggregatore-eventi-citta-vs-sito-singolo-evento",
    service: "eventi-locali",
    title:
      "Aggregatore eventi città o sito di un solo evento: cosa costruire prima",
    description:
      "Calendario territoriale vs pagina di un’edizione: quando serve l’hub, quando basta la scheda, e come li faccio convivere senza duplicare programmi e confondere Google.",
    date: "2026-07-25",
    keywords: [
      "aggregatore eventi locali",
      "calendario eventi città",
      "sito singolo evento",
      "portale eventi territorio",
      "hub eventi comuni",
    ],
    intro:
      "«Ci serve un sito per gli eventi» — e poi scopro che intendono tre cose diverse: la sagra di settembre, l’hub di tutta la stagione, o un calendario che copre più comuni. Io fermo il brief lì. Aggregatore o scheda singola cambia architettura, SEO e chi aggiorna i contenuti ogni settimana.",
    sections: [
      {
        heading: "Il sito di un’edizione: profondità, non panoramica",
        paragraphs: [
          "Se l’evento ha nome proprio, date chiare e gente che cerca proprio quell’edizione, ti serve una scheda ricca: programma, mappa area, sponsor, FAQ, contatti. Chi arriva dal volantino o da Instagram vuole un URL solo — non un elenco di altre feste.",
          "Tratto quel sito come prodotto a scadenza: forte nella settimana dell’evento, archiviabile dopo. Non è un fallimento se «muore» a ottobre. È il ciclo naturale di un’edizione.",
        ],
      },
      {
        heading: "L’aggregatore: scoperta e abitudine di ritorno",
        paragraphs: [
          "Il calendario città (o di valle, o di provincia) risponde a un’altra domanda: «cosa succede questo weekend vicino a me?». L’utente non conosce ancora il nome. Filtra per data, categoria, comune. Qui vincono densità di schede, filtri veloci e una home che cambia ogni settimana.",
          "Per Pro Loco federate, destinazione turistica o redazione comunale il valore è diventare il posto dove si torna. Per gli organizzatori: visibilità ripetuta senza rifare il sito da zero ogni anno.",
        ],
      },
      {
        heading: "Come li faccio convivere senza cannibalizzarsi",
        paragraphs: [
          "Nella pratica consiglio spesso entrambi i livelli: scheda approfondita sull’evento (anche su dominio proprio) e card sintetica nell’aggregatore con link in uscita. L’hub non deve rubare il programma completo se l’organizzatore ha già investito in una pagina dedicata.",
          "Se l’evento non ha ancora un sito, la scheda sul portale può essere la versione completa. Evito tre programmi identici su tre URL: Google e gli utenti si confondono allo stesso modo.",
        ],
      },
      {
        heading: "Segnali che ti dicono da dove partire",
        paragraphs: [
          "Parti dall’aggregatore se hai già una lista ricorrente (mercati, rassegne, sagre di più comuni) e qualcuno disposto ad aggiornarla. Parti dal sito singolo se hai un’edizione grande, sponsor e un’identità che non entra in un elenco.",
          "In Friuli Venezia Giulia vedo entrambe le esigenze sullo stesso territorio: la rassegna estiva vuole profondità; il weekend turistico vuole «tutto in un posto». Senza un responsabile chiaro che aggiorna le date, l’hub diventa un cimitero entro tre mesi.",
        ],
      },
      {
        heading: "Cosa imposto io quando mi chiami",
        paragraphs: [
          "Chiedo ownership editoriale, quante schede al mese, se gli eventi hanno già dominio proprio, e se serve anche biglietteria o solo info. Da lì scelgo struttura: hub, scheda, o entrambi con gerarchia chiara.",
          "Se stai decidendo tra portale città e pagina di un festival, guarda il servizio eventi locali e scrivimi da contatti — chiarisco quale pezzo ti serve davvero, non entrambi «perché sì».",
        ],
      },
    ],
    faq: [
      {
        question:
          "Posso partire solo con l’aggregatore e approfondire dopo?",
        answer:
          "Sì. Parto da card essenziali (titolo, date, luogo, categoria, link) e arricchisco gli eventi che portano più traffico o che pagano un’evidenza.",
      },
      {
        question: "L’aggregatore sostituisce Facebook Events?",
        answer:
          "No: lo affianca. Facebook resta un canale di distribuzione; il portale è l’archivio ufficiale, indipendente dall’algoritmo e utile anche a chi non ha l’app.",
      },
      {
        question: "Chi dovrebbe aggiornare il calendario città?",
        answer:
          "Serve un responsabile chiaro — redazione, ufficio turismo o coordinamento associazioni. Senza ownership l’aggregatore invecchia in fretta.",
      },
      {
        question: "Meglio dominio nuovo o sezione del sito comunale?",
        answer:
          "Dipende da brand e autonomia. Una sezione comunale aiuta la fiducia; un dominio dedicato ha senso se il progetto è intercomunale o commerciale.",
      },
    ],
    related: [
      { label: "Portali per eventi locali", href: "/servizi/eventi-locali" },
      { label: "Contattami", href: "/contatti" },
      { label: "Pagine per i comuni", href: "/comuni" },
    ],
  },
  {
    slug: "mappa-filtri-festival-territorio",
    service: "eventi-locali",
    title:
      "Mappa e filtri per festival e eventi sul territorio: cosa funziona davvero",
    description:
      "Come progetto mappe e filtri su un portale eventi: categorie utili, performance mobile, pin chiari e cosa evitare perché la gente non usa mai i filtri «troppo furbi».",
    date: "2026-07-26",
    keywords: [
      "mappa eventi territorio",
      "filtri festival online",
      "calendario eventi mappa",
      "portale eventi interattivo",
      "filtri categoria data luogo",
    ],
    intro:
      "Una mappa piena di pin senza filtri è rumore. Dieci filtri che nessuno capisce sono peggio. Quando costruisco un portale eventi, mappa e filtri esistono per una sola cosa: far trovare «cosa fare sabato vicino a me» in meno di trenta secondi sul telefono.",
    sections: [
      {
        heading: "Tre filtri che bastano (quasi sempre)",
        paragraphs: [
          "Data (oggi / weekend / intervallo), categoria (musica, cibo, famiglia, sport, cultura), luogo o comune. Il resto — fascia oraria, prezzo, accessibilità — lo aggiungo solo se i dati ci sono davvero e qualcuno li aggiorna.",
          "Se metti un filtro e metà delle schede non lo compilano, l’utente vede liste vuote e pensa che «non succede niente». Meglio pochi filtri affidabili.",
        ],
      },
      {
        heading: "Mappa: pin leggibili, non cartina da brochure",
        paragraphs: [
          "Un pin per evento (o per venue se nello stesso posto ce ne sono tanti). Click → card con titolo, orario, link alla scheda. Zoom iniziale sul territorio reale, non su mezza Italia.",
          "Su mobile la mappa non deve mangiare tutto lo schermo al primo carico: lista + mappa a schede, o toggle lista/mappa. Chi è in macchina o in piedi vuole scorrere, non combattere i gesture.",
        ],
      },
      {
        heading: "Categorie che parlano alle persone, non all’organizzatore",
        paragraphs: [
          "«Manifestazione pluriennale di valorizzazione» non è una categoria. «Sagra», «concerto», «mercato», «per bambini» sì. Allineo le etichette a come cerca chi arriva da fuori — turisti e residenti stanchi del jargon istituzionale.",
          "Se due categorie si sovrappongono sempre, le unisco. Una tassonomia corta e onesta batte un albero da ufficio cultura.",
        ],
      },
      {
        heading: "Performance: la mappa non deve ammazzare il telefono",
        paragraphs: [
          "Carico i pin in modo leggero, evito librerie pesanti se bastano poche decine di punti, e non incollo cento iframe di Maps nelle schede. Una mappa condivisa + link «apri in Maps» sulla singola location è spesso più onesto.",
          "Anche le immagini in card: miniature, non hero da tre megabyte. Il weekend mobile è dove si decide se il portale resta aperto o viene chiuso in due secondi.",
        ],
      },
      {
        heading: "Come lo collego al resto del sito",
        paragraphs: [
          "Home con «in evidenza» + «questo weekend», pagina calendario con filtri, scheda evento con mappa del punto e ritorno all’elenco filtrato. Il breadcrumb e i link interni contano quanto il pin.",
          "Sul servizio eventi locali progetto mappa e filtri insieme ai contenuti: senza schede aggiornate, l’interfaccia più bella del mondo resta vuota. Da /comuni vedi come lavoro anche con le amministrazioni; da /contatti partiamo dal tuo territorio.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve per forza una mappa interattiva?",
        answer:
          "No. Con pochi eventi sparsi, una lista ordinata per data più link Maps sulle schede può bastare. La mappa ha senso quando densità e territorio contano.",
      },
      {
        question: "Quante categorie massimo?",
        answer:
          "Di solito tra cinque e otto. Oltre, la gente non sceglie e tu non le mantieni coerenti.",
      },
      {
        question: "I filtri devono ricordare la scelta tra visite?",
        answer:
          "Utile sul mobile se tornano spesso (cookie o URL con parametri). Non obbligatorio al lancio: prima accuratezza dei dati, poi comfort.",
      },
      {
        question: "Google Maps o mappa open source?",
        answer:
          "Dipende da budget, branding e quanti pin. Scelgo in base a costi di utilizzo e a quanto controllo serve sul look — non per moda.",
      },
    ],
    related: [
      { label: "Servizio eventi locali", href: "/servizi/eventi-locali" },
      { label: "Scrivimi", href: "/contatti" },
      { label: "Comuni e territorio", href: "/comuni" },
    ],
  },
  {
    slug: "seo-eventi-ricorrenti-anno-citta",
    service: "eventi-locali",
    title:
      "SEO per eventi ricorrenti: come non buttare via il ranking ogni anno",
    description:
      "Date, URL, edizioni e query «evento + città»: come strutturo i siti di sagre e festival ricorrenti così Google e gli utenti trovano l’edizione giusta senza pagine zombie.",
    date: "2026-07-27",
    keywords: [
      "SEO eventi locali",
      "SEO festival ricorrente",
      "posizionamento sagra città",
      "URL edizione evento",
      "eventi annuali Google",
    ],
    intro:
      "Ogni primavera qualcuno cancella il sito della sagra «perché è un’edizione nuova» e riparte da zero. A settembre piange il traffico. Per eventi ricorrenti la SEO non è un articolo magico: è continuità di URL, date chiare e contenuti che si aggiornano senza buttare la storia.",
    sections: [
      {
        heading: "URL stabili, edizione in evidenza — non il contrario",
        paragraphs: [
          "Preferisco un percorso tipo /sagra-nome/ o /eventi/nome-festival/ che resta negli anni, con l’anno corrente in titolo, hero e dati strutturati. Evito di cambiare slug ogni edizione solo per «pulizia».",
          "Se proprio serve archivio, /2024/ /2025/ come sotto-pagine o filtri — non come unico indirizzo che sparisce a novembre. I backlink dei giornali locali puntano dove li hai lasciati.",
        ],
      },
      {
        heading: "Query che la gente digita davvero",
        paragraphs: [
          "«Sagra [paese] 2026», «programma festival [città]», «concerti [territorio] weekend», «quando inizia [nome evento]». Titolo e H1 devono rispondere a data e luogo senza keyword stuffing.",
          "Una pagina «edizione 2026» con programma aggiornato batte dieci landing clone con lo stesso testo e anno diverso. Google smonta le copie; gli utenti pure.",
        ],
      },
      {
        heading: "Dati strutturati e fatti, non prosa vuota",
        paragraphs: [
          "Nome, startDate, endDate, location, organizer: li metto coerenti con ciò che si vede in pagina. Se sposti la data, aggiorni entrambi. Uno schema bugiardo fa più danni di nessuno schema.",
          "Programma scaricabile, mappa, biglietti: sono segnali di utilità. Un pezzo di trecento parole «la tradizione continua» senza orari non posiziona e non converte.",
        ],
      },
      {
        heading: "Cosa fare tra un’edizione e l’altra",
        paragraphs: [
          "Non lasciare online un programma scaduto come se fosse attuale. Banner chiaro «edizione conclusa — torna a primavera» + iscrizione newsletter o save-the-date. Oppure archivio con data in titolo.",
          "Tra le edizioni posso tenere viva una pagina hub con storia, gallery e link alle passate — utile a sponsor e stampa, e dà profondità al dominio senza fingere che l’evento sia in corso.",
        ],
      },
      {
        heading: "Come lavoro la SEO sugli eventi locali",
        paragraphs: [
          "Parto da come cercate l’evento oggi (Search Console se c’è, altrimenti query ovvie + competitor locali), poi sistemo titoli, URL e aggiornamento annuale. Niente promesse di «primo su Google in due settimane».",
          "Se gestisci una rassegna ricorrente o un calendario comunale, sul servizio eventi locali imposto basi SEO oneste; da /contatti mandami URL e anno prossimo e ti dico cosa tenere e cosa rifare.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo rifare il sito ogni anno per posizionarmi?",
        answer:
          "No. Devi aggiornare date, programma e meta — non buttare il dominio o lo slug che già raccolgono link e ricerche.",
      },
      {
        question: "Meglio un sito nuovo per ogni edizione?",
        answer:
          "Raramente. Ha senso solo se brand e organizzatore cambiano del tutto. Altrimenti continuità.",
      },
      {
        question: "Le Stories e Facebook bastano per la SEO?",
        answer:
          "No. I social portano picchi; la ricerca organica e i link dalla stampa locale chiedono una pagina stabile e citabile.",
      },
      {
        question: "Quanto prima pubblicare l’edizione nuova?",
        answer:
          "Appena hai date ufficiali e almeno un programma di massima. Prima esci, prima catturi le query con l’anno corrente.",
      },
    ],
    related: [
      { label: "Eventi locali e portali", href: "/servizi/eventi-locali" },
      { label: "Parliamone", href: "/contatti" },
      { label: "SEO per i comuni", href: "/comuni" },
    ],
  },
  {
    slug: "biglietteria-link-esterni-fiducia-evento",
    service: "eventi-locali",
    title:
      "Biglietteria e link esterni: come non far scappare chi vuole entrare",
    description:
      "Ticketone, Eventbrite, link in bio e form improvvisati: come tengo fiducia e chiarezza sul sito dell’evento quando la vendita è fuori — senza far sembrare una truffa il passaggio.",
    date: "2026-07-28",
    keywords: [
      "biglietteria evento online",
      "link Ticketone sito evento",
      "fiducia acquisto biglietti",
      "Eventbrite festival",
      "CTA biglietti sito",
    ],
    intro:
      "Il sito dice «compra qui», il click manda su un dominio che nessuno conosce, il prezzo sembra diverso, il telefono non risponde. Non è marketing: è fiducia spezzata. Quando la biglietteria è esterna — e spesso deve esserlo — il mio lavoro è rendere il passaggio ovvio, coerente e rassicurante.",
    sections: [
      {
        heading: "Dì subito dove si compra (e perché)",
        paragraphs: [
          "In hero e nella scheda biglietti: piattaforma ufficiale, prezzo a partire da, date di apertura prevendita. Una riga tipo «Biglietti ufficiali su [nome] — unico canale autorizzato» taglia i dubbi più di un banner glitter.",
          "Se ci sono più canali (online + botteghino + Circolo), elenco chiaro con orari. Il caos «scrivici in DM» è dove nascono i biglietti falsi e i litigi in coda.",
        ],
      },
      {
        heading: "Design del passaggio: stesso evento, altro dominio",
        paragraphs: [
          "Uso lo stesso nome evento, le stesse date e se possibile lo stesso logo nella pagina che linka fuori. Il salto di brand è il momento in cui la gente chiude il telefono.",
          "Evito abbreviatori opachi e cinque redirect. URL pulita, target chiaro, magari un’avviso «Stai per aprire il sito ufficiale della biglietteria». Non è burocratico: è rispetto.",
        ],
      },
      {
        heading: "Cosa tengo sul sito anche se non vendo io",
        paragraphs: [
          "Programma, accessibilità, regolamento, rimborsi in sintesi, contatti organizzatore, FAQ su età minima e ingressi. La piattaforma vende il posto; tu resti la fonte di verità sull’esperienza.",
          "Se i prezzi cambiano per fascia, li riassumo in tabella e aggiorno quando apre una nuova. Un «guarda su Ticket» senza numeri spinge al confronto con siti pirata che i numeri ce li mettono — falsi.",
        ],
      },
      {
        heading: "Mobile, code e momenti di picco",
        paragraphs: [
          "La CTA biglietti deve funzionare con una mano sola, sopra la piega, anche con connessione da campo sagra. Niente modal annidate o form prima del link se non servono.",
          "Nei giorni di ondata metto status onesti: «prevendita aperta», «ultime file», «sold out — lista d’attesa». Meglio una verità secca che un bottone verde che manda a un 404.",
        ],
      },
      {
        heading: "Come lo imposto nei progetti eventi",
        paragraphs: [
          "Integro i link ufficiali, testo anti-truffa soft, FAQ e coerenza visuale. Non sostituisco Ticketone: lo rendo meno spaventoso da raggiungere.",
          "Se organizzi un festival o una rassegna e la biglietteria «si sente» staccata dal sito, sul servizio eventi locali sistemiamo quel passaggio; da /contatti mandami URL e piattaforma e ti dico cosa cambiare per primo.",
        ],
      },
    ],
    faq: [
      {
        question: "Conviene vendere i biglietti solo dal proprio sito?",
        answer:
          "Solo se hai pagamenti, rimborsi e assistenza solidi. Altrimenti una piattaforma nota più fiducia — a patto che il link sia chiaro e ufficiale.",
      },
      {
        question: "Come contrasto i biglietti falsi?",
        answer:
          "Un solo canale dichiarato ovunque (sito, social, volantino), avviso anti-secondary market se serve, e niente vendita in DM. La chiarezza batte dieci post di protesta dopo.",
      },
      {
        question: "Posso incorporare il widget della biglietteria?",
        answer:
          "Sì, se è leggero e mobile-friendly. Se il widget è lento o brutto, un bottone netto verso la pagina ufficiale è meglio.",
      },
      {
        question: "Cosa fare a sold out?",
        answer:
          "Stato evidente, link a lista d’attesa o edizione successiva, niente CTA «compra» che mentono. Chi arriva tardi deve capire in un secondo.",
      },
    ],
    related: [
      { label: "Siti e portali eventi", href: "/servizi/eventi-locali" },
      { label: "Contatti", href: "/contatti" },
      { label: "Progetti per i comuni", href: "/comuni" },
    ],
  },
  {
    slug: "crm-organizzatori-raccolta-contatti-etica",
    service: "eventi-locali",
    title:
      "CRM per organizzatori eventi: raccogliere contatti senza bruciare fiducia",
    description:
      "Newsletter, form e liste post-evento: come imposto una raccolta contatti privacy-aware per sagre e festival — consenso chiaro, pochi campi, niente spam da «abbiamo il tuo numero».",
    date: "2026-07-29",
    keywords: [
      "CRM organizzatori eventi",
      "raccolta contatti festival",
      "newsletter eventi locali",
      "privacy form evento",
      "GDPR biglietti newsletter",
    ],
    intro:
      "Dopo l’evento tutti vogliono «il database». Poi arriva una newsletter settimanale a chi ha solo comprato un biglietto, senza aver detto sì. Io progetto la raccolta contatti al contrario: pochi dati, consenso leggibile, usi dichiarati. Un CRM etico non è più lento — è l’unico che non ti esplode in faccia a settembre.",
    sections: [
      {
        heading: "Cosa chiedere (e cosa lasciare stare)",
        paragraphs: [
          "Email e, se serve davvero, comune o interessi (musica / cibo / famiglia). Telefono solo se mandi SMS operativi (promemoria ingresso, cambio location) e lo dici esplicitamente. Nome completo e codice fiscale non servono per una newsletter.",
          "Ogni campo in più è un abbandono e un rischio privacy. Preferisco un form corto sul sito a un Excel scaricato da cinque tool diversi senza ownership.",
        ],
      },
      {
        heading: "Consenso: frasi umane, non muri legali",
        paragraphs: [
          "Checkbox non pre-spuntata: «Voglio ricevere avvisi sulle prossime edizioni (pochi messaggi l’anno)». Separare marketing da comunicazioni di servizio legate al biglietto già acquistato.",
          "Link a privacy breve e a chi è il titolare (associazione, Pro Loco, comune). Se usi un tool esterno, lo nomini. Niente «accetto tutto» da dodici pagine.",
        ],
      },
      {
        heading: "Dove raccogliere senza essere invadenti",
        paragraphs: [
          "Save-the-date in homepage dopo l’edizione, box in chiusura programma, thank-you post-biglietto con opt-in separato, QR in loco verso form mobile. Evito di obbligare la newsletter per scaricare il PDF del programma.",
          "In fiera o in sagra: se scavate email a fronte di un gadget, dite cosa arriverà e quanto spesso. Il «database da 3.000 contatti» pieno di indirizzi inventati non vale il wifi del gazebo.",
        ],
      },
      {
        heading: "Dopo: frequenza, cancellazione, rispetto",
        paragraphs: [
          "Pochi invii utili: save-the-date, programma online, sold out / cambio orario. Non il digest settimanale di non-notizie. Unsubscribe in un click, senza login archeologici.",
          "Se comparti liste con sponsor, serve base giuridica e trasparenza — spesso è meglio non farlo. Gli sponsor possono avere landing proprie; tu non sei un rivenditore di persone.",
        ],
      },
      {
        heading: "Cosa costruisco io sul pezzo tecnico",
        paragraphs: [
          "Form sul sito, double opt-in se ha senso, integrazione con un CRM o tool mail leggero, testi di consenso e pagine privacy allineate. Niente plugin che esportano contatti chissà dove.",
          "Lavoro con organizzatori e comuni: sulla pagina eventi locali vedi l’approccio; su /comuni il contesto PA; da /contatti raccontami come raccogliete oggi i contatti — spesso basta ripulire il flusso, non comprare un software nuovo.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usare le email dei biglietti per la newsletter?",
        answer:
          "Solo se il consenso o la finalità lo permettono e l’hai spiegato in acquisto. Altrimenti chiedi un opt-in separato. Mescolare tutto è il modo più veloce per bruciare fiducia (e rischiare reclami).",
      },
      {
        question: "Serve per forza un CRM costoso?",
        answer:
          "No. Per molte rassegne basta un tool mail ordinato + export pulito. Il CRM ha senso con più eventi, team e follow-up — non come status symbol.",
      },
      {
        question: "Quanto spesso scrivere alla lista?",
        answer:
          "Per un evento annuale spesso bastano 3–6 messaggi/anno legati a momenti veri. Meglio raro e utile che settimanale e vuoto.",
      },
      {
        question: "Cosa fare dei contatti dopo anni di inattività?",
        answer:
          "Pulisci: chi non apre da tempo esce o riceve un re-consent. Liste zombie costano e fanno danni di deliverability.",
      },
    ],
    related: [
      { label: "Servizio eventi locali", href: "/servizi/eventi-locali" },
      { label: "Richiedi una chiacchierata", href: "/contatti" },
      { label: "Comuni italiani", href: "/comuni" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
