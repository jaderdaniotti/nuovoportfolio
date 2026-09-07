import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * CV / portfolio — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const cvPortfolioPosts = [
  {
    slug: "sito-personale-vs-linkedin-freelance-creativi",
    service: "cv-portfolio",
    title: "Sito personale o solo LinkedIn? Perché freelance e creativi restano bloccati",
    description:
      "LinkedIn ti fa trovare. Un sito personale ti fa scegliere. Ecco quando un portfolio sul tuo dominio batte un profilo social — e come li faccio lavorare insieme.",
    date: "2026-07-20",
    keywords: [
      "sito personale freelance",
      "portfolio vs LinkedIn",
      "sito creativo online",
      "CV portfolio online",
      "presenza web freelance",
    ],
    intro:
      "Mi arriva spesso lo stesso messaggio: «ho LinkedIn a posto, i progetti li metto lì». Poi mi mandano uno screenshot del feed e tre case study sepolti sotto un post di congrats. LinkedIn è un corridoio. Non è casa tua.",
    sections: [
      {
        heading: "Cosa LinkedIn fa bene — e dove ti limita",
        paragraphs: [
          "LinkedIn eccelle nella discoverability: recruiter, referral, aggiornamenti di ruolo. Se lavori in contesti corporate o sei in cerca attiva, ignorarlo è stupido. Il problema nasce quando diventa l’unica vetrina: foto ritagliate, progetti compressi in un carousel, CTA generiche che competono con gli annunci.",
          "Un art director o un founder serio vuole vedere il lavoro come lo hai pensato tu — gerarchia, ritmo, dettagli. Sul social quel lavoro lotta con il feed. Sul tuo dominio decidi tu cosa resta in primo piano.",
        ],
      },
      {
        heading: "Il sito non è un CV con più whitespace",
        paragraphs: [
          "Non duplico il curriculum riga per riga. Il PDF resta la lista: date, ruoli, skill. Il sito racconta: tre-cinque pezzi forti, come lavori, un contatto chiaro. Quantità senza contesto è rumore.",
          "Per freelance locali aggiungo spesso un segnale geografico onesto — da dove lavori, remoto o in presenza. Non è folklore: toglie ambiguità su fuso e disponibilità prima ancora del primo call.",
        ],
      },
      {
        heading: "Come li faccio lavorare in tandem",
        paragraphs: [
          "Strategia semplice: LinkedIn per essere trovati, sito per convincere. Nel profilo un link netto al portfolio — non a una bio da duemila caratteri. Sul sito, eventualmente un invito soft a connettersi se ha senso per il tuo settore. Non obbligatorio.",
          "Tecnicamente: dominio proprio, HTTPS, mobile leggibile, caricamento serio. Embed social pesanti li evito. Se il lavoro è visuale, pesano le immagini ottimizzate, non i widget di terzi.",
        ],
      },
      {
        heading: "Quando basta LinkedIn (e quando no)",
        paragraphs: [
          "Se sei junior e hai ancora poco da mostrare, un profilo curato può bastare qualche mese. Non forzo un sito vuoto. Quando hai progetti, collaborazioni o uno stile riconoscibile, il dominio diventa leva: pitch, QR sul biglietto, link nelle mail di candidatura.",
          "Il segnale che ascolto sempre: «su LinkedIn mi capiscono a metà». Ecco dove intervengo.",
        ],
      },
      {
        heading: "Behance, Dribbble e le altre vetrine altrui",
        paragraphs: [
          "Sono utili nel design. Restano piattaforme di qualcun altro: regole, algoritmo, branding condiviso. Sul sito personale controlli tipografia, SEO del tuo nome e il percorso verso il contatto.",
          "Spesso collego i pezzi migliori da lì senza dipendere solo da loro. Se stai costruendo un portfolio serio, guarda il servizio CV e portfolio: lo progetto per convincere, non per “avere un link”.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo abbandonare LinkedIn se apro un sito?",
        answer:
          "No. Li uso in tandem: LinkedIn per rete e aggiornamenti, sito per portfolio e contatto. Il link nel profilo punta alla home o ai progetti, non a un PDF generico.",
      },
      {
        question: "Un Behance o Dribbble sostituisce il sito?",
        answer:
          "No in modo affidabile. Sono vetrine utili, ma non controllano branding, SEO del nome e CTA. Meglio collegarli da una casa propria.",
      },
      {
        question: "Quanto contenuto serve per partire?",
        answer:
          "Tre progetti raccontati bene battono venti screenshot senza contesto. Partiamo da ciò che hai: brief, ruolo, risultato. Il resto si aggiunge senza rifare tutto.",
      },
      {
        question: "Ha senso anche se lavoro solo in remoto?",
        answer:
          "Sì. Un dominio proprio comunica professionalità ovunque. Sede e modalità (remoto, ibrido, in presenza) le chiarisco in footer o in “chi sono”.",
      },
    ],
    related: [
      { label: "Servizio CV e portfolio", href: "/servizi/cv-portfolio" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "case-study-portfolio-struttura-interviste-clienti",
    service: "cv-portfolio",
    title: "Case study nel portfolio: struttura che regge un’intervista con il cliente",
    description:
      "Come scrivere case study di portfolio che non siano slideshow: contesto, ruolo, decisioni, risultato — così in call non ripeti tutto da zero.",
    date: "2026-07-21",
    keywords: [
      "case study portfolio",
      "portfolio designer struttura",
      "scrivere case study creativi",
      "portfolio freelance progetti",
      "portfolio UX case study",
    ],
    intro:
      "Apri un portfolio e vedi dieci mockup belli e zero storia. In call il cliente chiede: «ok, ma tu cosa hai fatto esattamente?». Se il case study non risponde prima, stai regalando mezz’ora di recupero.",
    sections: [
      {
        heading: "Il formato che uso (e perché non è un romanzo)",
        paragraphs: [
          "Contesto in tre-quattro frasi: chi era il cliente, che problema aveva, che vincoli c’erano. Poi il tuo ruolo — non «abbiamo fatto», ma cosa hai guidato tu. Poi due-tre decisioni che contano. Infine un risultato misurabile o, se non c’è KPI, un outcome onesto.",
          "Evito il wall of text. Preferisco sezioni corte e immagini che illustrano la decisione, non solo il deliverable lucido.",
        ],
      },
      {
        heading: "Screenshot senza contesto = portfolio da scrollare e dimenticare",
        paragraphs: [
          "Un mockup da solo dice «so usare Figma». Non dice se hai negoziato lo scope, se hai semplificato un flusso, se hai salvato un go-live. Il pezzo che convince è la scelta, non solo la pixel perfection.",
          "Se hai NDAs, racconta il problema in forma anonima e mostra ciò che puoi. Meglio un caso parziale chiaro che un progetto “confidenziale” vuoto.",
        ],
      },
      {
        heading: "Ruolo e contributi: dove molti portfolio mentono per omissione",
        paragraphs: [
          "Scrivere «team di cinque» senza dire cosa hai fatto tu è un red flag. Io chiedo di esplicitare: research, UI, frontend, art direction, copy. Non serve gonfiare. Serve onestà leggibile in dieci secondi.",
          "In intervista ti faranno domande su quel pezzo. Se il testo già delimita il perimetro, la conversazione sale di livello subito.",
        ],
      },
      {
        heading: "Risultati: numeri quando ci sono, narrativa quando non ci sono",
        paragraphs: [
          "Conversioni, tempo di caricamento, ticket supporto giù, lead in più: mettili. Se il lavoro era brand o editoriale, spiega cosa è cambiato per il cliente — chiarezza, coerenza, time-to-publish.",
          "Niente metriche inventate. Un «il cliente ha rinnovato il contratto» vale più di un +347% senza fonte.",
        ],
      },
      {
        heading: "Quanti case study e in che ordine",
        paragraphs: [
          "Tre-cinque pezzi forti battono una griglia infinita. Metto in alto ciò che vuoi attrarre adesso, non solo ciò che ti piace di più sentimentalmente. Il resto può stare in un archivio o in un PDF.",
          "Quando strutturo un portfolio CV, i case study sono il cuore: il resto del sito serve a farli arrivare e a far partire il contatto.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo includere progetti personali o solo client work?",
        answer:
          "Entrambi vanno, se dimostrano skill rilevanti. Segnalo chiaramente cosa è personale e cosa è commissionato — evita ambiguità sul livello di responsabilità.",
      },
      {
        question: "Quanto deve essere lungo un case study?",
        answer:
          "Abbastanza da rispondere a contesto, ruolo, decisione, esito. Di solito una pagina scrollabile, non un white paper. Se serve profondità, aggiungo una sezione espandibile.",
      },
      {
        question: "E se non ho metriche?",
        answer:
          "Usa outcome qualitativi onesti: processo migliorato, stakeholder allineati, deliverable adottato. Non inventare percentuali.",
      },
      {
        question: "Posso riusare lo stesso case su LinkedIn?",
        answer:
          "Sì, in forma corta. Sul sito resta la versione completa; su LinkedIn un teaser con link al pezzo intero.",
      },
    ],
    related: [
      { label: "Servizio CV e portfolio", href: "/servizi/cv-portfolio" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "performance-tipografia-portfolio-credibilita",
    service: "cv-portfolio",
    title: "Performance e tipografia nel portfolio: come la credibilità si vede (e si sente)",
    description:
      "Un portfolio lento o tipograficamente confuso dice il contrario di ciò che prometti. Come imposto velocità, tipo e gerarchia per sembrare — e essere — professionali.",
    date: "2026-07-22",
    keywords: [
      "performance portfolio web",
      "tipografia portfolio designer",
      "portfolio lento",
      "credibilità sito personale",
      "ottimizzare immagini portfolio",
    ],
    intro:
      "Se vendi cura del dettaglio e il sito mette tre secondi a mostrare la prima immagine, il visitatore ha già deciso. La credibilità di un portfolio non è solo copy: è tipografia, peso e ritmo di caricamento.",
    sections: [
      {
        heading: "La prima impressione è tecnica, non solo estetico",
        paragraphs: [
          "Chi valuta un designer o uno sviluppatore guarda anche come hai costruito la casa. Font che saltano, layout che si muovono, hero da otto megabyte: sono messaggi. Dicono «non ho tempo per rifinire» anche se i mockup sono belli.",
          "Io parto da mobile reale, non da un preview desktop. La maggior parte dei recruiter e dei clienti apre il link dal telefono tra una riunione e l’altra.",
        ],
      },
      {
        heading: "Tipografia: poche famiglie, gerarchia dura",
        paragraphs: [
          "Due famiglie bastano. Una display per titoli, una testo per body — o una sola ben caricata. Contrasto di peso e dimensione crea ordine; dodici pesi diversi creano rumore da template.",
          "Corpo leggibile, interlinea generosa, titoli che non gridano. Se il lavoro è visuale, la tipografia fa da cornice silenziosa, non da spettacolo parallelo.",
        ],
      },
      {
        heading: "Immagini: il peso che uccide i portfolio",
        paragraphs: [
          "Esporto in formati moderni, dimensioni corrette per lo slot, lazy load sotto la piega. Una griglia di ventiquattro PNG non compressi è il modo più rapido per perdere un hiring manager impatient.",
          "Video e loop li uso con parsimonia e poster leggeri. Se serve motion, lo metto dove conta — non su ogni card.",
        ],
      },
      {
        heading: "Velocità percepita vs score da lab",
        paragraphs: [
          "Mi importa che il contenuto utile appaia presto: titolo, primo progetto, CTA. Un Lighthouse alto senza contenuto sopra la piega è vanity. Un sito “passabile” ma chiaro è meglio di un 98 vuoto.",
          "Hosting, caching e asset statici contano. Evito plugin e script di tracking che non servono a un portfolio personale.",
        ],
      },
      {
        heading: "Credibilità = coerenza tra promessa e esperienza",
        paragraphs: [
          "Se dichiari attenzione al craft, il sito deve respirare craft. Se dichiari velocità di esecuzione, non può sembrare abbandonato. Allineo tono, tipo e performance a ciò che vendi.",
          "Quando progetto un CV portfolio, tipografia e performance non sono un afterthought: sono parte del pitch silenzioso prima ancora del primo case study.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve un tema scuro per sembrare “creativi”?",
        answer:
          "No. Serve contrasto leggibile e un’identità coerente. Scuro o chiaro dipende dal brand e dal lavoro esposto, non dalla moda.",
      },
      {
        question: "Quante font posso caricare?",
        answer:
          "Idealmente una o due famiglie, con subset dei pesi usati. Ogni file in più ritarda il first paint.",
      },
      {
        question: "I WebGL e gli effetti pesanti aiutano?",
        answer:
          "Solo se sono il tuo prodotto. Altrimenti rubano attenzione e performance. Preferisco motion mirati e leggeri.",
      },
      {
        question: "Come controllo le immagini senza perdere qualità?",
        answer:
          "Ridimensiono allo slot reale, uso formati moderni, comprimo con occhio sul risultato — non con un preset cieco. Retina sì, megapixel inutili no.",
      },
    ],
    related: [
      { label: "Servizio CV e portfolio", href: "/servizi/cv-portfolio" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "cta-contatto-portfolio-senza-sembrare-disperati",
    service: "cv-portfolio",
    title: "CTA e contatto nel portfolio: chiedere lavoro senza sembrare disperati",
    description:
      "Come impostare call to action e pagina contatto in un portfolio personale: chiari, umani, senza tono “assumi subito” o form da corporate.",
    date: "2026-07-23",
    keywords: [
      "CTA portfolio",
      "contatto sito personale",
      "portfolio freelance contatto",
      "call to action CV online",
      "form contatto creativi",
    ],
    intro:
      "Il portfolio finisce e… niente. O peggio: un «hire me!!!!» neon. Tra il silenzio e la disperazione c’è una terza via: una CTA chiara, umana, che rispetta chi arriva e dice cosa succede dopo.",
    sections: [
      {
        heading: "Una CTA, un lavoro: cosa vuoi che facciano",
        paragraphs: [
          "Scrivere, chiamare, scaricare il CV, prenotare una call. Scegline una primaria. Le secondarie (LinkedIn, email plain) possono stare vicine, ma non competono a volume uguale.",
          "Il testo della CTA descrive l’azione: «Scrivimi del progetto» batte «Clicca qui». «Disponibile per collaborazioni da settembre» batte «Open to work» generico.",
        ],
      },
      {
        heading: "Tono: professionale ≠ freddo, umano ≠ supplice",
        paragraphs: [
          "Evito urgenza finta e emoji da landing ads. Preferisco una frase sul modo in cui lavoro e cosa serve per iniziare: brief, tempistiche, budget orientativo se ha senso.",
          "Se sei in cerca attiva, dillo con calma. Chi assume legge la sicurezza, non il panico.",
        ],
      },
      {
        heading: "Dove metto il contatto (senza ripeterlo ovunque)",
        paragraphs: [
          "In header un link Contatti o una mail visibile. Dopo ogni case study forte, un invito soft. In chiusura pagina, un blocco chiaro con aspettative sui tempi di risposta.",
          "Non serve un sticky bar aggressivo su mobile. Serve non far cercare l’indirizzo per sette scroll.",
        ],
      },
      {
        heading: "Form: pochi campi, conferma umana",
        paragraphs: [
          "Nome, email, messaggio, eventualmente un link al brief o al file. Basta. Campi tipo “company size” e “budget dropdown” da SaaS allontanano i creativi e i piccoli studi.",
          "Dopo l’invio, una conferma che non sembri errore di server: cosa ho ricevuto, quando rispondo di solito. Se uso WhatsApp o Calendly, lo dichiaro senza nasconderlo dietro tre click.",
        ],
      },
      {
        heading: "Disponibilità e filtri senza essere scortesi",
        paragraphs: [
          "Se non prendi progetti sotto X giorni o fuori da certe zone, una riga onesta risparmia mail inutili. Filtrare non è snob: è rispetto per il tempo di entrambi.",
          "Nel servizio portfolio imposto CTA e contatto come parte del design, non come footer dimenticato. Il pezzo bello senza via d’uscita è una vetrina chiusa.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio form o solo mailto?",
        answer:
          "Il form sul sito tiene traccia e funziona meglio su mobile. Mailto va come backup visibile. Evito di affidarmi solo a uno dei due.",
      },
      {
        question: "Devo mettere il telefono in chiaro?",
        answer:
          "Solo se vuoi chiamate. Molti preferiscono email o form per filtrare. Se lo metti, indica fasce orarie.",
      },
      {
        question: "Calendly sul portfolio è troppo “vendita”?",
        answer:
          "Dipende dal settore. Per consulenze e freelance senior può funzionare bene. Per junior in hiring corporate, a volte basta email + CV.",
      },
      {
        question: "Quante CTA posso mettere in homepage?",
        answer:
          "Una primaria evidente. Al massimo una secondaria quieta. Più di così diventa menu di ristorante.",
      },
    ],
    related: [
      { label: "Servizio CV e portfolio", href: "/servizi/cv-portfolio" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "dominio-email-seo-nome-cognome-portfolio",
    service: "cv-portfolio",
    title: "Dominio, email e SEO del nome: fare trovare il tuo portfolio (non un omonimo)",
    description:
      "Come scegliere dominio e email professionali, e impostare SEO on-page sul tuo nome e cognome così chi ti cerca trova il portfolio giusto.",
    date: "2026-07-24",
    keywords: [
      "dominio portfolio personale",
      "email professionale nome cognome",
      "SEO nome cognome",
      "sito personale dominio",
      "brand personale freelance",
    ],
    intro:
      "Cerchi il tuo nome su Google e esce un omonimo, un vecchio PDF e un profilo abbandonato. Il portfolio esiste, ma non è “tuo” nei risultati. Dominio, email e SEO base sistemano proprio questo.",
    sections: [
      {
        heading: "Dominio: nome.cognome, studio, o brand?",
        paragraphs: [
          "Per freelance e creativi, nome-cognome.it (o .com) è spesso la scelta più chiara: memorie, biglietti, firme mail. Se il cognome è impossibile da scrivere, un brand corto e pronunciabile batte un URL da rompicapo.",
          "Evito numeri casuali e trattini eccessivi. Un dominio stabile vale più di uno “carino” che cambi tra due anni.",
        ],
      },
      {
        heading: "Email sullo stesso dominio: segnale silenzioso",
        paragraphs: [
          "ciao@tuodominio batte nome.cognome88@gmail in una firma professionale. Non è snobismo: è coerenza. Chi riceve la mail vede lo stesso mondo del sito.",
          "Configuro SPF/DKIM quando serve e tengo un forward semplice. Non serve un inbox enterprise per un portfolio personale.",
        ],
      },
      {
        heading: "SEO del nome: title, H1 e fatti unici",
        paragraphs: [
          "Title e description devono includere nome, ruolo e cosa fai — non solo “Home” o “Portfolio”. In homepage un H1 chiaro; in “chi sono” fatti che solo tu puoi avere: città, specializzazione, collaborazioni pubbliche.",
          "Schema Person / profilo dove ha senso. Link da LinkedIn, GitHub, Behance verso il dominio canonico. Un segnale da più fonti batte dieci keyword stuffing.",
        ],
      },
      {
        heading: "Omonimi e disambiguazione",
        paragraphs: [
          "Se il tuo nome è comune, aggiungi un qualificatore naturale: ruolo, città, medium. «Giulia Rossi — UX designer Udine» è più utile di «Giulia Rossi creative visionary».",
          "Una pagina about con foto riconoscibile e bio specifica riduce i click sbagliati. Non serve un comunicato stampa: serve chiarezza.",
        ],
      },
      {
        heading: "Cosa non fare (anche se “lo fanno tutti”)",
        paragraphs: [
          "Non comprare dieci domini “per sicurezza” e lasciarli vuoti. Non mettere keyword nel dominio tipo miglior-designer-milano. Non affidarti solo a un link in bio Instagram come unica scoperta.",
          "Quando imposto un CV portfolio, dominio, email e basi SEO sul nome sono il pavimento: sopra ci costruisci case study e CTA. Senza pavimento, il resto scivola.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio .it o .com per un portfolio in Italia?",
        answer:
          "Entrambi vanno. .it è chiaro in ambito locale; .com è più neutro per lavoro internazionale. Conta disponibilità del nome e coerenza con l’email.",
      },
      {
        question: "Devo comprare anche le varianti del dominio?",
        answer:
          "Solo se c’è rischio reale di confusione o typosquatting. Altrimenti una variante ben scelta e redirect eventuali bastano.",
      },
      {
        question: "Quanto tempo ci vuole per rankare sul proprio nome?",
        answer:
          "Con nome poco competitivo spesso settimane/pochi mesi se LinkedIn e sito puntano allo stesso brand. Con omonimi forti, serve costanza e backlink naturali.",
      },
      {
        question: "Google Sites o Notion bastano per la SEO del nome?",
        answer:
          "Per partire sì, ma resti su dominio altrui e con limiti di branding. Un dominio proprio dà controllo su title, URL e email professionale.",
      },
    ],
    related: [
      { label: "Servizio CV e portfolio", href: "/servizi/cv-portfolio" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
