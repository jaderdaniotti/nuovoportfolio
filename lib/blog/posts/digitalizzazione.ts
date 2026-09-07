import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Digitalizzazione — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const digitalizzazionePosts = [
  {
    slug: "digitalizzare-processi-prima-del-software",
    service: "digitalizzazione",
    title: "Digitalizzare i processi prima del software: da dove parto nelle PMI",
    description:
      "Comprare CRM e gestionali senza mappare i flussi è soldi buttati. Come analizzo i processi reali di una PMI e solo dopo scelgo gli strumenti.",
    date: "2026-07-30",
    keywords: [
      "digitalizzazione PMI",
      "processi digitali azienda",
      "software aziendale PMI",
      "analisi processi impresa",
      "digitalizzazione aziendale",
    ],
    intro:
      "Mi arriva spesso la lista già pronta: «ci serve un CRM come quello dei grandi, un gestionale nuovo, magari anche un’app». Io fermo tutto. Se non so come entra una richiesta, chi la tocca e dove finisce il dato, qualsiasi licenza diventa uno scaffale digitale che nessuno apre.",
    sections: [
      {
        heading: "Il software non sistema un flusso confuso",
        paragraphs: [
          "Se i clienti vi scrivono su email, WhatsApp, telefono e fogli sparsi, un CRM costoso non crea ordine da solo: moltiplica i campi da compilare. Il problema non è «manca lo strumento». È che nessuno ha deciso chi fa cosa, quando, e dove resta la traccia.",
          "Parto da una mappa banale ma onesta: ingresso → presa in carico → cosa serve per chiudere → dove vive lo storico. Carta, Excel o chat: non giudico. Documentiamo la realtà. Solo dopo decidiamo cosa digitalizzare.",
        ],
      },
      {
        heading: "Tre domande prima di qualsiasi licenza",
        paragraphs: [
          "Chiedo sempre: quali attività ripetete ogni settimana? Dove perdete tempo in copia-incolla? Cosa deve restare umano — relazione, decisione, eccezione? Se non rispondiamo a queste, ogni piattaforma sembra indispensabile e nessuna lo è.",
          "Spesso basta un form sul sito, una notifica ordinata e una cartella condivisa. Preferisco un pezzo utile in produzione in due settimane a un progetto da sei mesi che lo staff usa al 15%.",
        ],
      },
      {
        heading: "Cosa tengo e cosa butto",
        paragraphs: [
          "Se avete già un gestionale per le fatture e lo usate davvero, non lo sostituisco per moda. Integro il minimo: sito → inbox strutturata → stesso posto dove già lavorate. Il «riparto da zero» ha senso solo se lo strumento attuale è un collo di bottiglia vero.",
          "Se ogni commerciale ha il suo Excel personale, lì interviene la digitalizzazione: un ingresso unico e regole condivise. Non è tecnologia. È disciplina operativa resa più leggera dal digitale.",
        ],
      },
      {
        heading: "Un pilota piccolo batte il big bang",
        paragraphs: [
          "Scelgo uno o due flussi ad alto impatto — preventivi, richieste assistenza, apertura pratica — e li consegno funzionanti. Poi misuriamo: tempo risparmiato, errori in meno, lead non persi. Solo a quel punto si valuta il pezzo successivo.",
          "Il big bang «cambiamo tutto a settembre» nelle PMI fallisce quasi sempre: troppa formazione, troppi eccezioni, troppo stress. Meglio un successo visibile che convince il resto dell’azienda.",
        ],
      },
      {
        heading: "Come procedo nei progetti jaderweb",
        paragraphs: [
          "Workshop breve (anche remoto), elenco processi prioritari, perimetro chiaro, consegna, check dopo due settimane. Niente slide da consulenza da mesi. Chiarezza su tre–cinque flussi critici.",
          "Se state pensando di «digitalizzarvi» comprando cataloghi software, partiamo dai processi. Il servizio digitalizzazione lo imposto così: strumenti dopo, non prima.",
        ],
      },
    ],
    faq: [
      {
        question: "Quanto dura l’analisi dei processi?",
        answer:
          "Di solito una o due sessioni concentrate bastano per una PMI. Non serve un audit infinito: serve chiarezza su 3–5 flussi che fanno male ogni settimana.",
      },
      {
        question: "E se il titolare vuole subito il software «che usano tutti»?",
        answer:
          "Lo ascolto, poi mostro costi nascosti: formazione, migrazione, abbandono. Propongo un pilota piccolo sullo stesso obiettivo. I numeri convincono più delle slide.",
      },
      {
        question: "Serve cambiare gestionale per digitalizzarsi?",
        answer:
          "Quasi mai al giorno zero. Spesso si collega meglio ciò che c’è già — sito, form, email, fatturazione — e si tocca il gestionale solo se è davvero il collo di bottiglia.",
      },
      {
        question: "Lavori solo in presenza?",
        answer:
          "Sono basato a Udine e lavoro spesso in Friuli, ma seguo PMI anche a distanza se c’è un referente interno e i processi sono raccontabili.",
      },
    ],
    related: [
      { label: "Servizio digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "moduli-automazioni-sostituire-carta-pmi",
    service: "digitalizzazione",
    title: "Moduli e automazioni: sostituire la carta in PMI senza creare caos",
    description:
      "Come passo da fogli volanti e moduli A4 a form digitali e automazioni leggere che lo staff usa davvero — senza portali mastodontici.",
    date: "2026-07-31",
    keywords: [
      "moduli digitali PMI",
      "automazioni azienda",
      "sostituire carta ufficio",
      "form online imprese",
      "digitalizzazione processi",
    ],
    intro:
      "Nella piccola impresa italiana la carta non è nostalgia: è abitudine. Preventivi a mano, schede fotocopiate, fogli «da archiviare dopo». Io costruisco moduli digitali e automazioni sobrie che fanno sparire quella carta — percorsi che funzionano il martedì alle undici, in mezzo al lavoro vero.",
    sections: [
      {
        heading: "Cosa digitalizzare per primo (e cosa lasciare)",
        paragraphs: [
          "Non digitalizzo tutto il giorno uno. Parto dai pezzi che creano rumore: richieste di preventivo, anagrafiche per aprire una pratica, checklist di sopralluogo, richieste interne ripetitive. Se un foglio si usa una volta all’anno, può restare carta.",
          "Criterio semplice: se lo ricopiate, lo cercate o lo perdete spesso, merita un form. Se è una firma o un vincolo che deve restare cartaceo, non forzo il digitale per moda.",
        ],
      },
      {
        heading: "Un form utile ha campi pochi e giusti",
        paragraphs: [
          "Trasformare un A4 in quaranta campi online è peggio della carta: nessuno lo completa. Riduco ai dati per partire; obbligatori solo dove servono. Il resto si chiede dopo, in una seconda fase o a voce.",
          "Aggiungo istruzioni umane — «foto del pezzo da sostituire», «CAP per capire se siamo in zona» — e una conferma immediata: «l’abbiamo ricevuta, ti rispondiamo entro…». La carta non dava feedback. Il digitale deve darlo.",
        ],
      },
      {
        heading: "Automazioni che tolgono lavoro, non che lo spostano",
        paragraphs: [
          "Dopo l’invio: notifica al referente giusto, riga in foglio o CRM, eventuale reminder «richiamare entro 24h». Niente workflow da dieci step che nessuno manutiene. Se l’automazione si rompe in silenzio, è peggio del foglio sul tavolo.",
          "Per molte PMI funziona uno stack sobrio: form sul sito o link interno, email strutturata, Sheet o CRM semplice, reminder. Cresciamo dopo, quando l’abitudine c’è.",
        ],
      },
      {
        heading: "Archivio e privacy senza panico",
        paragraphs: [
          "Digitalizzare carta significa sapere dove finiscono i dati e per quanto. Imposto conservazioni sensate, accessi per ruolo e testi di consenso dove servono. Non sostituisco il consulente privacy: allineo il sistema a pratiche di buon senso.",
          "Vantaggio concreto: meno armadi, meno «chi ha l’ultima versione?», più tempo su clienti e produzione.",
        ],
      },
      {
        heading: "Introduzione graduale, non big bang",
        paragraphs: [
          "Spesso lascio carta e digitale in parallelo per una breve fase, poi spegniamo il vecchio modulo in una data chiara. Un reparto alla volta — commerciale, assistenza, amministrazione — convince meglio di un piano globale.",
          "Se volete togliere carta senza stressare lo staff, il servizio digitalizzazione parte da un modulo, non da un portale.",
        ],
      },
    ],
    faq: [
      {
        question: "I dipendenti devono cambiare tutto dall’oggi al domani?",
        answer:
          "No. Introduco un flusso alla volta, spesso in parallelo alla carta per una fase breve, poi spegniamo il vecchio quando il nuovo è stabile.",
      },
      {
        question: "Serve un’app da installare sul telefono?",
        answer:
          "Quasi mai. Un link a un form responsive e notifiche email o WhatsApp bastano per la maggior parte dei casi PMI.",
      },
      {
        question: "E se in cantiere o in magazzino non c’è internet?",
        answer:
          "Prevediamo raccolta minima sul posto e completamento in ufficio, o modalità offline dove ha senso. Il digitale si adatta al contesto, non il contrario.",
      },
      {
        question: "Posso partire solo da un reparto?",
        answer:
          "Sì, ed è consigliato. Un successo visibile convince il resto dell’azienda meglio di un progetto «tutta l’impresa».",
      },
    ],
    related: [
      { label: "Servizio digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "collegare-sito-crm-fatturazione-leggero",
    service: "digitalizzazione",
    title: "Collegare sito, CRM e fatturazione senza un progetto da sei mesi",
    description:
      "Integrazioni leggere tra sito web, CRM e fatturazione per PMI: meno copia-incolla, stesso cliente ovunque, stack che potete mantenere.",
    date: "2026-08-01",
    keywords: [
      "integrazione sito CRM",
      "CRM fatturazione PMI",
      "ecosistema digitale azienda",
      "automazioni lead fatture",
      "collegare gestionale sito",
    ],
    intro:
      "Incubo classico: il lead arriva dal sito, finisce in una mail, qualcuno lo copia nel CRM (se c’è), poi ridigita l’anagrafica nel programma fatture. Io collego sito, CRM e fatturazione in modo leggero — non un ERP totale, un filo continuo dal primo contatto alla fattura, con strumenti che già usate o che potete davvero mantenere.",
    sections: [
      {
        heading: "Un’anagrafica, tre posti: dove nasce la verità",
        paragraphs: [
          "Decidiamo quale sistema è la fonte: di solito il CRM per lead e trattative, il gestionale per clienti paganti. Il sito non è un database parallelo: è il cancello. I form scrivono nel posto giusto, non in una casella generica da cui ripartire a mano.",
          "Se non avete un CRM, non obbligo piattaforme enterprise. A volte basta una pipeline semplice — tool italiano leggero, piano free sensato, o un foglio strutturato — finché il volume non cresce. Preferisco onesto e usato a blasonato e vuoto.",
        ],
      },
      {
        heading: "Cosa collego davvero al giorno zero",
        paragraphs: [
          "Priorità tipica: form sito → record lead con fonte e servizio → notifica al commerciale → quando il deal è chiuso, passaggio ordinato verso fatturazione (manuale assistito o sync se l’API lo consente). Non automatizzo la parte fiscale delicata senza controllo umano.",
          "Email professionali, UTM sulle campagne, stati «nuovo / in corso / vinto / perso»: questi pezzi tolgono già gran parte del caos. Il resto è rifinitura.",
        ],
      },
      {
        heading: "Integrazioni leggere vs progetto mastodonte",
        paragraphs: [
          "Leggero vuol dire webhook, Make/Zapier con pochi scenari, o connettori nativi del gestionale. Pesante vuol dire riscrivere processi, migrare anni di anagrafiche e formare tutti i reparti insieme. Consiglio il primo finché non avete volume e disciplina.",
          "Attenzione ai costi nascosti: ogni sync rotto genera doppioni. Meglio pochi campi — nome, P.IVA, email, indirizzo — che cinquanta mapping fragili.",
        ],
      },
      {
        heading: "WhatsApp e gli altri canali «sporchi»",
        paragraphs: [
          "WhatsApp può entrare come canale di contatto, con una regola: lo stato della trattativa vive nel CRM, non nella chat. Altrimenti tornate al centralino digitale.",
          "Telefono e passaparola restano. L’obiettivo è che, entro pochi minuti, esista un record con fonte e prossimo passo — non che sparisca tutto in una conversazione privata.",
        ],
      },
      {
        heading: "Come lo imposto nei progetti jaderweb",
        paragraphs: [
          "Mappo gli strumenti attuali, scelgo uno o due flussi critici (es. richiesta da sito → CRM → preventivo), li consegno documentati e formo chi li userà. Solo dopo valutiamo fatture automatiche, cataloghi o portali clienti.",
          "L’obiettivo non è «avere tutto collegato». È non perdere lead e non ridigitare tre volte lo stesso cliente. Per una PMI, quello è già digitalizzazione seria.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo cambiare software di fatturazione?",
        answer:
          "Solo se quello attuale non espone dati o rende impossibile lavorare. Spesso si migliora l’ingresso — sito + CRM — e si lascia la fatturazione dove sta.",
      },
      {
        question: "WhatsApp può entrare in questo flusso?",
        answer:
          "Sì come canale, con cautela: il CRM resta il posto ufficiale dello stato trattativa. Evito di gestire tutto solo in chat.",
      },
      {
        question: "Quanto costa un’integrazione leggera?",
        answer:
          "Dipende dagli strumenti e dal numero di flussi. Partiamo da un perimetro piccolo e chiaro: così il preventivo resta proporzionato al beneficio.",
      },
      {
        question: "I dati restano in UE?",
        answer:
          "Scelgo stack coerenti con le vostre esigenze; su residenza dati e DPIA vi allineo al vostro consulente privacy, senza promesse da brochure.",
      },
    ],
    related: [
      { label: "Servizio digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "formazione-staff-strumenti-digitali-usati",
    service: "digitalizzazione",
    title: "Formare lo staff così gli strumenti digitali vengono davvero usati",
    description:
      "Senza adozione interna la digitalizzazione fallisce. Come organizzo formazione breve, referente interno e abitudini che reggono in PMI.",
    date: "2026-08-02",
    keywords: [
      "formazione digitale PMI",
      "adozione software aziendale",
      "change management piccola impresa",
      "staff strumenti digitali",
      "formazione CRM azienda",
    ],
    intro:
      "Ho visto CRM perfetti aperti due volte al mese e form «obbligatori» aggirati col telefono. La digitalizzazione non fallisce per mancanza di feature: fallisce perché nessuno ha tempo o voglia di cambiare rito. Io includo sempre formazione e adozione — incontri corti, regole chiare, un referente interno che non sia solo «quello dell’IT».",
    sections: [
      {
        heading: "Se non c’è un padrino interno, il progetto muore",
        paragraphs: [
          "Chiedo un referente operativo: commerciale, ufficio, produzione — qualcuno che vive il processo ogni giorno. Io costruisco e accompagno; loro decidono le eccezioni e ricordano ai colleghi il nuovo modo. Senza questa figura resto un fornitore che «ha messo un tool».",
          "Il titolare deve dare copertura: «da lunedì le richieste passano da qui» vale più di qualsiasi manuale PDF.",
        ],
      },
      {
        heading: "Formazione corta, sul caso reale",
        paragraphs: [
          "Niente corso da otto ore su funzioni che non userete. Sessioni da 45–60 minuti sul vostro flusso: «arriva un lead, ecco i tre click». Registro uno screen breve se serve ripassare. Meglio due richiami a una settimana di distanza che una maratona dimenticata.",
          "Coinvolgo chi resiste di più: spesso ha ragioni valide — troppi campi, doppio lavoro. Ascolto e semplifico prima di imporre lo strumento.",
        ],
      },
      {
        heading: "Abitudini, non slogan motivazionali",
        paragraphs: [
          "Rituali minimi: ogni mattina si aprono i «nuovi» nel CRM; ogni preventivo chiuso aggiorna lo stato; il form cartaceo muore in data X. Nelle prime settimane guardiamo l’uso — record creati, form inviati — senza fare la morale: i dati dicono dove serve aiuto.",
          "Se qualcuno lavora fuori sistema, non è «cattivo»: spesso il sistema è scomodo. Torno sul disegno del flusso, non solo sulla formazione.",
        ],
      },
      {
        heading: "Documentazione che si legge in due minuti",
        paragraphs: [
          "Lascio una scheda operativa: screenshot, link, chi contattare se si rompe qualcosa. Niente wiki infinita. La aggiorno quando cambia un passaggio — altrimenti torna la tradizione orale e si perde tutto al primo turnover.",
          "Questo pezzo umano vale quanto il codice. Senza di esso avete speso per uno scaffale digitale vuoto.",
        ],
      },
      {
        heading: "Dopo il go-live: check, non abbandono",
        paragraphs: [
          "A una o due settimane faccio un check e ritocco campi, notifiche, istruzioni. Poi, se volete, manutenzione periodica basata su come state lavorando davvero — non su feature da catalogo.",
          "Se state per introdurre strumenti nuovi e temete che restino spenti, partiamo da adozione e processo. Il resto viene dopo.",
        ],
      },
    ],
    faq: [
      {
        question: "Quante persone posso formare insieme?",
        answer:
          "Ideale 3–8 persone dello stesso processo. Gruppi misti — vendite + magazzino + admin — in un’unica sessione generano confusione.",
      },
      {
        question: "E se qualcuno è poco digitale?",
        answer:
          "Progetto percorsi semplici e guidati. La formazione parte dai loro compiti quotidiani, non dal jargon del software.",
      },
      {
        question: "La formazione è inclusa nel progetto?",
        answer:
          "Nei miei progetti di digitalizzazione sì, in forma essenziale. Un piano esteso multi-sede lo quotiamo a parte, con chiarezza.",
      },
      {
        question: "Cosa fai dopo il go-live?",
        answer:
          "Un check a 1–2 settimane e eventuali ritocchi. Poi, se serve, manutenzione periodica sui miglioramenti che emergono dall’uso reale.",
      },
    ],
    related: [
      { label: "Servizio digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "misurare-roi-progetto-digitalizzazione-kpi",
    service: "digitalizzazione",
    title: "ROI digitalizzazione: KPI semplici che una PMI può davvero misurare",
    description:
      "Come misuro il ritorno di un progetto di digitalizzazione senza dashboard inutili: tempi, lead, errori e costi nascosti leggibili dal titolare.",
    date: "2026-08-03",
    keywords: [
      "ROI digitalizzazione",
      "KPI digitalizzazione PMI",
      "misurare automazioni azienda",
      "ritorno investimento digitale",
      "indicatori digitalizzazione aziendale",
    ],
    intro:
      "«Ci siamo digitalizzati» non è un risultato. Un risultato è: meno ore a copiare dati, più preventivi chiusi, meno richieste perse. Io imposto progetti con pochi KPI leggibili anche su un foglio. Niente vanity metric da startup: numeri che un titolare può controllare il venerdì pomeriggio.",
    sections: [
      {
        heading: "Prima foto dello stato attuale (baseline)",
        paragraphs: [
          "Prima di toccare strumenti, raccogliamo due–quattro settimane di realtà: quante richieste arrivano, da quali canali, quanto tempo per un preventivo, quante volte ridigitate gli stessi dati, quante pratiche incomplete. Anche stime oneste vanno bene se non avete tracking.",
          "Senza baseline ogni miglioramento è aneddotica. Con baseline possiamo dire «abbiamo tolto X minuti a pratica» o «abbiamo perso Y lead in meno».",
        ],
      },
      {
        heading: "I cinque KPI che uso più spesso",
        paragraphs: [
          "Tempo medio di presa in carico. Percentuale di richieste complete al primo giro. Lead non ricontattati entro la soglia pattuita. Ore a settimana in copia-incolla o ricerca documenti. Tasso di utilizzo dello strumento — record creati, persone attive.",
          "Non li monitoro tutti per sempre: ne scegliamo due o tre legati all’obiettivo. Se digitalizziamo i preventivi, il KPI non è «follower Instagram».",
        ],
      },
      {
        heading: "Come traduco i KPI in ROI",
        paragraphs: [
          "Moltiplico ore risparmiate per un costo orario interno realistico. Aggiungo il valore di lead recuperati in modo prudente — non invento conversioni miracolose. Sottraggo costi chiari: mio lavoro, licenze, tempo di formazione.",
          "Se in sei mesi risparmio operativo e margine sui lead in più superano l’investimento, il progetto ha ROI positivo. Se no, ritagliamo scope o cambiamo approccio — non nascondiamo il risultato dietro slide colorate.",
        ],
      },
      {
        heading: "Cosa non misuro (di proposito)",
        paragraphs: [
          "Visite al sito senza contesto, «engagement», numero di automazioni attive. Possono servire altrove; da soli non dimostrano che l’azienda lavora meglio. Preferisco outcome operativi.",
          "Nei follow-up rivediamo i KPI dopo 30 e 90 giorni. È lì che si decide il pezzo successivo: ampliamento, stop, o solo manutenzione.",
        ],
      },
      {
        heading: "Numeri utili anche per soci e banca",
        paragraphs: [
          "Una tabella prima/dopo con tempi e costi è più credibile di un elenco di software acquistati. Vi aiuto a metterla in forma presentabile, senza gonfiare i benefici.",
          "Se volete capire se un intervento di digitalizzazione vale la pena sul vostro volume reale, partiamo dai KPI. Poi dagli strumenti.",
        ],
      },
    ],
    faq: [
      {
        question: "Non abbiamo analytics né CRM: possiamo misurare lo stesso?",
        answer:
          "Sì. Partiamo da conteggi manuali o da un foglio semplice per qualche settimana. Poi automatizziamo il tracking dove serve.",
      },
      {
        question: "In quanto tempo si vede il ROI?",
        answer:
          "Su interventi mirati — form, notifiche, ordine lead — spesso già in 4–8 settimane. Su cambi più culturali guardiamo a un trimestre.",
      },
      {
        question: "Mi dai una garanzia di ritorno economico?",
        answer:
          "No: dipende da volume, margini e disciplina interna. Garantisco trasparenza sui numeri che decidiamo insieme e correzioni se i KPI non si muovono.",
      },
      {
        question: "I KPI servono per convincere soci o banca?",
        answer:
          "Sì. Una tabella prima/dopo con tempi e costi batte qualsiasi lista di licenze. Vi aiuto a prepararla in forma chiara.",
      },
    ],
    related: [
      { label: "Servizio digitalizzazione", href: "/servizi/digitalizzazione" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
