import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Preventivi online — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const preventiviOnlinePosts = [
  {
    slug: "form-preventivo-multi-step-qualificare-senza-infastidire",
    service: "preventivi-online",
    title:
      "Form preventivo multi-step: qualificare senza far scappare chi vuole solo un’idea di costo",
    description:
      "Come costruisco form a step per richieste di preventivo: poche schermate, domande utili, meno “quanto costa?” vuoti — senza interrogatorio da call center.",
    date: "2026-07-10",
    keywords: [
      "form preventivo multi-step",
      "qualificare lead preventivo",
      "richiesta preventivo online",
      "form preventivo sito",
      "sistema preventivi online",
    ],
    intro:
      "Un muro di campi su una pagina sola fa chiudere il browser. Un “nome + telefono” ti riempie la casella di curiosi senza zona, senza foto, senza urgenza. Io progetto form preventivo multi-step che filtrano: ogni schermata ha un perché, e chi compila capisce perché glielo chiedo.",
    sections: [
      {
        heading: "Uno step, una decisione",
        paragraphs: [
          "Il multi-step funziona se ogni schermata risponde a una sola domanda: che servizio? Dove? Quanto è grande o urgente? Hai materiale (foto, bozza)? Come ti ricontatto? Mischiare tutto su una pagina sembra un modulo fiscale: la gente abbandona.",
          "Parto dal tuo flusso reale. Impresa di ristrutturazioni: tipo intervento, poi mq o stanze, poi CAP, poi upload. Servizio a chiamata: zona e urgenza prima dei dettagli tecnici. Non incollo un template: allineo i campi a come decidi tu se accettare o no.",
        ],
      },
      {
        heading: "Progresso visibile e campi che appaiono solo se servono",
        paragraphs: [
          "Mostro sempre a che punto sei — “2 di 4”, barra o step numerati. Riduce l’ansia. Obbligo solo ciò che evita una chiamata a vuoto: tipologia, zona, contatto. Foto, note e budget restano opzionali finché non sono davvero indispensabili.",
          "Se una domanda dipende dalla precedente, la nascondo. “Hai già un progetto?” compare solo su ristrutturazione completa, non su una riparazione lampadina. Meno rumore, più completamenti.",
        ],
      },
      {
        heading: "Copy da persona, non da software enterprise",
        paragraphs: [
          "Etichette corte, esempi sotto al campo (“es. bagno 6 mq, piastrelle da rifare”), tono umano: “Così capisco se posso aiutarti” batte “Compilare tutti i campi obbligatori”. Su mobile Avanti / Indietro devono essere grandi e facili da toccare con una mano.",
          "Dopo l’invio niente “grazie” generico. Confermo cosa è arrivato, tempi di risposta che puoi rispettare, e un’alternativa (WhatsApp o telefono) se l’urgenza è reale. Il form ha filtrato: ora chiudi tu.",
        ],
      },
      {
        heading: "Dove si spezza il percorso (e come lo riparo)",
        paragraphs: [
          "Guardo dove abbandonano. Step foto che perde metà dei lead? Lo rendo opzionale o lo sposto dopo. Fuori zona che arrivano ancora? Anticipo il CAP. Lead pochi ma tutti buoni: ok. Lead zero: ho over-qualificato.",
          "Il multi-step non è un effetto UI. È un filtro sul tuo tempo. Tarato bene, le richieste arrivano già con servizio, contesto e contatto — e non ricominci ogni volta da “mi racconti?”.",
        ],
      },
      {
        heading: "Dal form alla pagina servizio",
        paragraphs: [
          "Il form vive su una pagina che spiega cosa fai e cosa non fai. Chi arriva da Google o da una ads deve capire in dieci secondi se è nel posto giusto, poi entrare nel percorso a step.",
          "Se vuoi un sistema di preventivi online costruito così — non un plugin generico — parti dal servizio preventivi online o scrivimi da contatti: mappiamo i tuoi criteri di “lead serio” e li trasformiamo in schermate.",
        ],
      },
    ],
    faq: [
      {
        question: "Quanti step sono troppi?",
        answer:
          "Di solito 3–5 bastano. Oltre sei stai chiedendo troppo o spezzando domande che andrebbero insieme. Meglio quattro step corti che otto micro-schermate.",
      },
      {
        question: "Devo obbligare le foto?",
        answer:
          "Quasi mai. Le foto alzano la qualità, ma l’obbligo duro fa scappare chi è in auto o in ufficio. Le rendo facili e consigliate; obbligatorie solo se senza non puoi proprio rispondere.",
      },
      {
        question: "Il multi-step aiuta la SEO?",
        answer:
          "Indirettamente: meno rimbalzi sul form, più conversioni. La pagina servizio resta la base SEO; il form è lo strumento di conversione.",
      },
      {
        question: "Posso riusare lo stesso form per più servizi?",
        answer:
          "Sì, con ramificazioni: il primo step sceglie il servizio e sblocca domande diverse. Un ingresso, percorsi diversi — meno siti da mantenere.",
      },
    ],
    related: [
      {
        label: "Sistema preventivi online",
        href: "/servizi/preventivi-online",
      },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "stima-immediata-fasce-vs-ti-richiamiamo",
    service: "preventivi-online",
    title:
      "Stima immediata a fasce o “ti richiamiamo”? Come scelgo senza promettere il falso",
    description:
      "Fasce di prezzo automatiche o richiamo umano: quando ha senso ciascuna in un preventivo online — e come evitare numeri inventati che ti bruciano al telefono.",
    date: "2026-07-11",
    keywords: [
      "stima preventivo online",
      "preventivo automatico fasce",
      "ti richiamiamo preventivo",
      "calcolatore preventivo sito",
      "fascia prezzo preventivo",
    ],
    intro:
      "Il visitatore vuole un numero. Tu non vuoi impegnarti su un prezzo sbagliato. Tra “calcolatore magico” e “ti richiamiamo in 24 ore” c’è uno spazio onesto: le fasce indicative. Io le uso solo dove i parametri sono chiari — e lascio il richiamo umano dove sbagliare costa caro.",
    sections: [
      {
        heading: "Quando la fascia immediata ha senso",
        paragraphs: [
          "Funziona se hai driver ripetitivi: mq, stanze, tipo intervento standard, distanza, urgenza. Tinteggiatura, piccola manutenzione, servizi con listino interno collaudato. Mostro “indicativamente da X a Y” con note chiare: esclusi imprevisti, materiali speciali, accessi difficili.",
          "La fascia non è un contratto. È un filtro: chi ha budget 500 € e vede 2.000–3.000 € esce subito — e ti risparmia la chiamata. Chi è in fascia completa il contatto con più serietà.",
        ],
      },
      {
        heading: "Quando “ti richiamiamo” è la scelta più onesta",
        paragraphs: [
          "Ristrutturazioni complesse, impianti, edifici vincolati, B2B con capitolati: una stima automatica inventata crea litigi. Preferisco raccogliere dati e promettere un richiamo (o un preventivo scritto) entro un tempo che puoi davvero rispettare — non “presto” vago.",
          "Non lasciare il cliente nel vuoto: conferma immediata, riepilogo di ciò che ha inviato, prossima azione (“ti scrivo entro domani con domande o data sopralluogo”). “Ti richiamiamo” funziona se è un processo, non una scusa.",
        ],
      },
      {
        heading: "Ibrido: stima soft + chiusura umana",
        paragraphs: [
          "Spesso imposto un ibrido: dopo i dati chiave mostro una fascia ampia (“nella nostra esperienza interventi simili stanno tra…”) e poi chiedo il contatto per affinare. Dai qualcosa subito senza fingere precisione chirurgica.",
          "Se i prezzi si muovono (materiali, energia), le fasce devono essere aggiornabili in pochi click. Un calcolatore fermo a due stagioni fa è peggio di nessun numero.",
        ],
      },
      {
        heading: "Copy e responsabilità: niente finti listini per la SEO",
        paragraphs: [
          "Non pubblico prezzi inventati per intercettare keyword. Se mettiamo numeri, sono i tuoi, revisionati, con disclaimer leggibile. Preferisco perdere una ricerca generica che guadagnare un lead arrabbiato al telefono.",
          "Su mobile la fascia sta vicino alla CTA: “questa stima non è vincolante — completa per un preventivo reale”. Trasparenza = meno attrito dopo.",
        ],
      },
      {
        heading: "Come decido con te in brief",
        paragraphs: [
          "Ti chiedo: hai listino interno? Quante variabili “ammazzano” una stima? Cosa succede se il cliente arriva con un’aspettativa sbagliata? Dalle risposte nasce fascia, richiamo o ibrido — non da moda UI.",
          "Se stai valutando un sistema di preventivi online e non sai da che parte stare, guardiamo insieme i tuoi casi tipici dal servizio o da contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Un calcolatore preciso al centesimo conviene?",
        answer:
          "Raramente, fuori da prodotti standardizzati. Per lavori su misura crea aspettative false. Meglio fasce o richiamo strutturato.",
      },
      {
        question: "Quanto ampia può essere la fascia?",
        answer:
          "Abbastanza da coprire la variabilità reale, non così ampia da diventare inutile (“da 500 a 15.000”). Se non riesci a stringere, forse non è il caso della stima automatica.",
      },
      {
        question: "Posso mostrare la fascia solo dopo il contatto?",
        answer:
          "Sì, ma perdi il filtro precoce. Di solito mostro una stima soft subito e affino dopo i dati completi o il sopralluogo.",
      },
      {
        question: "Cosa scrivo se non voglio pubblicare prezzi?",
        answer:
          "Spiega i fattori che fanno variare il costo e invita a una richiesta guidata. Onestà sul “dipende” batte un finto “a partire da 99 €”.",
      },
    ],
    related: [
      {
        label: "Sistema preventivi online",
        href: "/servizi/preventivi-online",
      },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "settori-preventivi-online-ristrutturazioni-servizi-b2b",
    service: "preventivi-online",
    title:
      "Preventivi online: dove rendono di più tra ristrutturazioni, servizi e B2B",
    description:
      "Non ogni settore ha lo stesso ritorno da un form preventivo. Dove vedo i risultati più chiari — e dove conviene un contatto diverso.",
    date: "2026-07-12",
    keywords: [
      "preventivi online ristrutturazioni",
      "form preventivo servizi",
      "preventivo B2B sito",
      "richiesta preventivo impresa",
      "sistema preventivi online",
    ],
    intro:
      "Un sistema di preventivi online non è “per tutti allo stesso modo”. Lo consiglio forte dove le richieste si ripetono, il contesto conta (foto, mq, zona) e il telefono è pieno di curiosi. Altrove conta di più l’appuntamento. Qui i tre ambiti dove, nei miei progetti, il preventivo strutturato rende di più.",
    sections: [
      {
        heading: "Ristrutturazioni e edilizia leggera",
        paragraphs: [
          "Bagno, cucina, pavimenti, tinteggiatura: il cliente arriva con un’idea vaga e mille variabili. Un form che chiede tipologia, mq o stanze, stato attuale, CAP e foto trasforma “vorrei rifare il bagno” in una richiesta lavorabile.",
          "Il sopralluogo resta spesso necessario, ma arriva già filtrato: fuori zona e budget palesemente incompatibili calano. Per un’impresa locale è tempo di cantiere recuperato, non “marketing”.",
        ],
      },
      {
        heading: "Servizi a chiamata e artigiani organizzati",
        paragraphs: [
          "Pulizie straordinarie, garden, disinfestazioni, traslochi, manutenzioni: spesso hai già un listino interno. Il form raccoglie frequenza, metri o vani, accessibilità, urgenza. Rispondi con fascia o proposta scritta senza dieci chat WhatsApp sparse.",
          "Per le emergenze vere lascio sempre un canale rapido (tel / WhatsApp). Il preventivo online gestisce il programmato; l’urgenza non deve passare dallo stesso imbuto lento.",
        ],
      },
      {
        heading: "B2B e forniture: meno “ciao”, più contesto",
        paragraphs: [
          "Nel B2B il form non sostituisce la trattativa: prepara il primo contatto. Chiedo ragione sociale, settore, volume indicativo, sede, tempistiche, allegato (PDF capitolato, bozza, foto impianto). Il commerciale apre già con contesto.",
          "Evito questionari da trenta campi. Meglio ingresso corto + upload, poi approfondimento umano. Su più linee, il primo step seleziona la linea e adatta le domande.",
        ],
      },
      {
        heading: "Dove lo userei con più cautela",
        paragraphs: [
          "Professionisti ad alta riservatezza, luxury one-shot, o chi vende solo dopo una consulenza lunga: un form “preventivo” può sembrare freddo. Meglio richiesta appuntamento o brief leggero — abbastanza per non ripartire da zero, senza fingere un prezzo online impossibile.",
          "Se non sei sicuro, partiamo da una mappa: quante richieste al mese, quante sono spazzatura, cosa ti serve sapere al primo messaggio. Da lì: sistema preventivi pieno o contatto intelligente.",
        ],
      },
      {
        heading: "Come misuro se “sta funzionando”",
        paragraphs: [
          "Non guardo solo il numero di invii. Guardo quante chiamate a vuoto spariscono, quanto tempo risparmi a ricostruire il contesto, e se chi completa il form arriva già “parlabile”.",
          "Se ti riconosci in uno di questi settori e vuoi un percorso su misura, il dettaglio è sul servizio preventivi online — oppure parte da contatti con due esempi reali di richiesta che odi ricevere.",
        ],
      },
    ],
    faq: [
      {
        question: "Ho un e-commerce: mi serve il preventivo online?",
        answer:
          "Solo per prodotti o configurazioni su misura, o per il B2B. Per catalogo standard vince il carrello; il preventivo è per ciò che non ha prezzo fisso.",
      },
      {
        question: "Funziona anche per una ditta monocomunale?",
        answer:
          "Sì, anzi: il filtro zona è ancora più utile. Mostri i comuni serviti e chiudi fuori area prima del telefono.",
      },
      {
        question: "Posso usare lo stesso sistema per privati e aziende?",
        answer:
          "Sì, con uno step “privato / azienda” che cambia campi (anagrafica, upload capitolato, fatturazione).",
      },
      {
        question: "Quanto tempo prima di vedere meno chiamate a vuoto?",
        answer:
          "Spesso già dalle prime settimane, se indirizzi traffico (sito, ads, Google Business) verso il form e rispondi nei tempi dichiarati.",
      },
    ],
    related: [
      {
        label: "Sistema preventivi online",
        href: "/servizi/preventivi-online",
      },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "follow-up-preventivo-email-whatsapp-automazione-leggera",
    service: "preventivi-online",
    title:
      "Follow-up dopo il preventivo: email e WhatsApp con automazione leggera",
    description:
      "Come imposto conferma, reminder e nudge post-richiesta senza CRM pesante né bot che scrivono ogni ora — utili, umani, rispettosi dei dati.",
    date: "2026-07-13",
    keywords: [
      "follow-up preventivo",
      "automazione WhatsApp preventivo",
      "email dopo richiesta preventivo",
      "reminder lead preventivo",
      "notifiche preventivi online",
    ],
    intro:
      "Il form inviato non è la fine: è l’inizio. Se la richiesta resta tre giorni nella casella, hai già perso. Io imposto follow-up leggeri — email e, dove ha senso, WhatsApp — che ti ricordano di rispondere e rassicurano il cliente, senza drip aggressivi da SaaS.",
    sections: [
      {
        heading: "Prima la notifica a te, poi il messaggio a loro",
        paragraphs: [
          "Priorità zero: tu (o chi gestisce i lead) ricevi subito email o push con riepilogo strutturato — servizio, zona, urgenza, link alle foto. Se non vedi la richiesta, nessun follow-up al cliente salva la conversione.",
          "Poi la conferma al lead: “Ho ricevuto X, Y, Z. Ti rispondo entro…”. Riduce l’ansia e taglia i doppi invii “ha funzionato?”.",
        ],
      },
      {
        heading: "Tre messaggi, non una sequenza da dodici",
        paragraphs: [
          "Schema tipico: (1) conferma immediata, (2) reminder interno a te dopo N ore se non hai segnato “gestito”, (3) nudge opzionale al cliente dopo 48–72 ore se ancora in sospeso (“ti serve ancora il preventivo o hai già scelto?”). Stop.",
          "WhatsApp: template semplici, tono tuo, orari sensati — niente messaggi alle 23. Email: oggetto chiaro con riferimento (“Richiesta bagno – zona nord”). Allegati solo se servono.",
        ],
      },
      {
        heading: "Stati semplici battono i CRM che non apri",
        paragraphs: [
          "Nuovo → in lavorazione → inviato → chiuso / vinto / perso. Quattro stati. Se vivi in WhatsApp Business, etichette equivalenti. Non ti costringo a un CRM enterprise il giorno zero: collego il form a ciò che già usi.",
          "Quando il volume cresce, si struttura di più. Prima dimostriamo che le richieste sono buone e che rispondi in tempo.",
        ],
      },
      {
        heading: "Cosa non automatizzare (e privacy del follow-up)",
        paragraphs: [
          "Il preventivo vero, le eccezioni, le trattative delicate restano umani. L’automazione gestisce conferma, reminder e igiene della coda — non la firma sul prezzo.",
          "Uso solo i canali che la persona ha lasciato per quella richiesta. Niente liste marketing “di striscio”, niente inoltri a terzi senza bisogno. Misuro tempo di prima risposta e chiusura dopo follow-up: se i nudge non cambiano nulla, li spengo.",
        ],
      },
      {
        heading: "Dal form al ritmo di risposta",
        paragraphs: [
          "Il miglior follow-up è una prima risposta umana nei tempi che dichiari sul sito. L’automazione è la rete di sicurezza, non il sostituto.",
          "Se vuoi un percorso preventivo + notifiche leggere, senza stack gonfio, parti dal servizio preventivi online o da contatti con i tuoi tempi reali di risposta — li mettiamo per iscritto nel copy.",
        ],
      },
    ],
    faq: [
      {
        question: "WhatsApp automatico è accettabile?",
        answer:
          "Con consenso e buon senso: il cliente ti ha lasciato il numero per essere ricontattato su quella richiesta. Evito promozioni spammose scollegate dal preventivo.",
      },
      {
        question: "Serve un assistente virtuale 24/7?",
        answer:
          "Di solito no. Serve una conferma immediata e una risposta umana nei tempi che dichiari. Un bot che “chatta” senza chiudere frustra.",
      },
      {
        question: "Posso inoltrare le richieste a titolare e ufficio?",
        answer:
          "Sì: più destinatari o regole per tipo servizio. L’importante è ownership chiara sul lead — qualcuno deve “prenderlo in carico”.",
      },
      {
        question: "Se il cliente risponde alla mail automatica?",
        answer:
          "Imposto Reply-To sul tuo indirizzo reale, così la conversazione continua con te — non con un noreply cieco.",
      },
    ],
    related: [
      {
        label: "Sistema preventivi online",
        href: "/servizi/preventivi-online",
      },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "privacy-dati-progetto-form-preventivo-note-pratiche",
    service: "preventivi-online",
    title:
      "Privacy nel form preventivo: dati di progetto, foto e note pratiche",
    description:
      "Indirizzi, foto di interni, metrature, allegati: come raccolgo i dati in un preventivo online riducendo rischi inutili — senza legalese da template.",
    date: "2026-07-14",
    keywords: [
      "privacy form preventivo",
      "GDPR richiesta preventivo",
      "upload foto preventivo",
      "dati personali preventivo online",
      "consenso form preventivo",
    ],
    intro:
      "Un form preventivo raccoglie più di un nome: indirizzi, foto di interni, piani, a volte documenti. Non sono avvocato né DPO — lo dico subito — ma costruendo questi sistemi vedo sempre gli stessi errori: campi che invitano a scrivere troppo, upload senza limiti, policy scollegate. Ecco le pratiche che imposto di default.",
    sections: [
      {
        heading: "Raccogli solo ciò che ti serve per rispondere",
        paragraphs: [
          "Ogni campo in più è un pezzo di dato da proteggere. Se non ti serve il codice fiscale al primo contatto, non lo chiedere. Se l’indirizzo preciso può aspettare il sopralluogo, basta CAP o comune. Minimizzazione: banale, raramente applicata.",
          "Nel copy del campo libero scrivo cosa non mandare: documenti di identità, dati di terzi, referti, password. Se ti servono dopo, li chiedi su un canale più adatto — non in un textarea pubblico del sito.",
        ],
      },
      {
        heading: "Foto e allegati: utili, ma governati",
        paragraphs: [
          "Upload con tipi limitati (jpg/png/pdf), peso massimo, numero massimo. Istruzioni: “inquadra il problema, evita volti di minori e documenti leggibili sullo sfondo”. Non è paranoia: è rispetto per chi ti apre casa via pixel.",
          "Retention: le richieste non devono vivere per sempre in una cartella Digita-tutto. Definiamo quanto tenere i lead non convertiti e come cancellarli. Backup sì; archivio eterno di bagni altrui no.",
        ],
      },
      {
        heading: "Informativa chiara, checkbox separate",
        paragraphs: [
          "Collego informativa aggiornata, contatto del titolare, finalità chiare: “gestire la tua richiesta di preventivo”, non un mega-consenso marketing nascosto. Newsletter = checkbox separata, non pre-spuntata.",
          "HTTPS ovunque, protezione antispam senza frizioni assurde, niente pixel invasivi sulla pagina contatti se non servono. Analytics e cookie restano allineati alla policy del sito.",
        ],
      },
      {
        heading: "Accesso interno: chi vede cosa",
        paragraphs: [
          "Le foto del bagno del cliente non devono finire in una chat di gruppo da quindici persone “per curiosità”. Notifiche a chi gestisce i preventivi; link con accesso limitato dove possibile.",
          "Se usi un foglio o una casella condivisa, chiudiamo l’anello: chi legge, chi cancella, chi risponde. La privacy fallisce spesso per abitudine operativa, non per mancanza di banner.",
        ],
      },
      {
        heading: "Cosa non faccio io (e perché te lo dico)",
        paragraphs: [
          "Non redigo pareri legali, DPIA o nomina responsabili al posto del tuo consulente. Allineo il sito a buone pratiche tecniche e UX privacy-aware; la conformità formale resta a titolare e professionisti del settore.",
          "Ambiti delicati (sanità, minori, dati giudiziari): form all’osso o “richiedi richiamo”. Meglio pochi campi che un questionario che invita a scrivere cose che non dovrebbero stare in una mail. Per progettare il flusso: servizio preventivi online o contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Il consenso è obbligatorio per un preventivo?",
        answer:
          "La base giuridica può essere l’esecuzione di misure precontrattuali su richiesta dell’interessato — ma serve comunque informativa chiara. Checkbox marketing = altro discorso. Fatti validare il testo dal tuo consulente.",
      },
      {
        question: "Dove finiscono le foto caricate?",
        answer:
          "Su storage che definiamo nel progetto (hosting, email o servizio file), con accesso limitato a chi gestisce i preventivi. Te lo documento in fase di setup.",
      },
      {
        question: "Posso chiedere la carta d’identità nel form?",
        answer:
          "Di norma no, non al primo contatto. Se serve per contratto, la chiedi dopo su canale controllato — non in un upload libero del sito pubblico.",
      },
      {
        question: "Cosa metto in privacy policy se uso un form preventivo?",
        answer:
          "Finalità, tipi di dati (anche immagini), tempi di conservazione, destinatari, diritti dell’interessato. Io ti aiuto a elencare cosa fa tecnicamente il sito; il testo legale lo valida chi di dovere.",
      },
    ],
    related: [
      {
        label: "Sistema preventivi online",
        href: "/servizi/preventivi-online",
      },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
