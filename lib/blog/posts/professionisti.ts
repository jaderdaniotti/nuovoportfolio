import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Professionisti — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo = professione diversa, angolo e FAQ distinti. Niente filler da template.
 * Extra attenzione etica sul pezzo medico: niente promesse di risultato.
 */
export const professionistiPosts = [
  {
    slug: "sito-studio-legale-fiducia-aree-pratica-privacy",
    service: "professionisti",
    title:
      "Sito studio legale: fiducia, aree di pratica e contatto che rispetta la privacy",
    description:
      "Come strutturo un sito per avvocati: materie leggibili, segnali di affidabilità reali e form che non invitano a scrivere dati sensibili in una casella aperta.",
    date: "2026-05-21",
    keywords: [
      "sito studio legale",
      "sito avvocato",
      "aree di pratica avvocato",
      "contatto privacy studio legale",
      "sito professionisti legali",
    ],
    intro:
      "Chi cerca un avvocato non sta scegliendo un servizio da catalogo. Sta decidendo a chi affidare un problema che già lo tiene sveglio. Sul web la fiducia nasce in pochi secondi: materie chiare, tono sobrio, contatto che non chiede il fascicolo completo al primo click.",
    sections: [
      {
        heading: "La fiducia non arriva dal blu navy",
        paragraphs: [
          "Library stock, serif pesante, slogan tipo «al vostro fianco». L’ho visto cento volte. L’estetica può aiutare, ma da sola non convince. Quello che conta è capire subito: trattate la mia materia? Siete raggiungibili? Parlate da esseri umani senza diventare da bar?",
          "In homepage metto nome studio, sede, tre o quattro aree di pratica in evidenza, un invito al contatto netto. Niente «vinciamo sempre». Un visitatore ansioso cerca rassicurazione concreta, non una landing da ads.",
        ],
      },
      {
        heading: "Aree di pratica come pagine, non come elenco infinito",
        paragraphs: [
          "Venti materie in homepage confondono. Preferisco pagine dedicate sulle materie su cui lo studio vuole davvero posizionarsi: lavoro, famiglia, penale, societario. Ogni pagina dice a chi si rivolge, quali situazioni tipiche tratti, cosa succede al primo incontro.",
          "Serve anche alla SEO locale: «avvocato diritto del lavoro» funziona se esiste una pagina seria, non una voce sepolta nel footer. Non invento keyword: parto da ciò che lo studio già fa e lo rendo leggibile per chi cerca online.",
        ],
      },
      {
        heading: "Contatto privacy-aware: meno dettagli, più qualità",
        paragraphs: [
          "Il form di uno studio legale non è un questionario clinico. Chiedere subito «descrivi la causa nei dettagli» spinge a scrivere dati sensibili in un canale sbagliato. Io progetto form corti: nome, contatto, materia generica, fascia oraria, campo libero opzionale con avviso chiaro su cosa non scrivere.",
          "Spesso funziona meglio un percorso a due step: richiesta appuntamento + conversazione riservata in studio o in call. WhatsApp può fissare un orario; non è il posto per allegare documenti. Sul sito lo dico esplicitamente.",
        ],
      },
      {
        heading: "Team e segnali che rassicurano senza claim",
        paragraphs: [
          "Se ci sono più professionisti, una pagina team con foto reali e materie preferite batte qualsiasi brochure. Il cliente vuole immaginare con chi parlerà. Due paragrafi su esperienza e approccio bastano: niente biografie da premio Nobel.",
          "FAQ su tempi di risposta, come arriva il preventivo, lingue, accessibilità della sede. Non prometto esiti. Spiego il processo. È la differenza tra marketing etico e claim che uno studio non dovrebbe neanche leggere ad alta voce.",
        ],
      },
      {
        heading: "Cosa guardo dopo il lancio",
        paragraphs: [
          "Non mi fermo alle visite. Conto richieste complete, da quali pagine partono, se il form viene abbandonato a metà. Con quei numeri aggiusto copy e CTA senza rifare tutto il sito.",
          "Allineo anche Google Business Profile: stessi orari, stesso indirizzo, stessi servizi. Coerenza offline/online è fiducia. Se ti serve un sito per professionisti costruito così, parto da materie e privacy, non dal template.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve un blog legale pieno di articoli?",
        answer:
          "Non per forza. Meglio poche pagine di pratica scritte bene. Un blog ha senso solo se lo studio pubblica approfondimenti veri e li aggiorna: altrimenti resta un archivio abbandonato.",
      },
      {
        question: "Posso pubblicare sentenze o casi risolti?",
        answer:
          "Solo con anonimizzazione, consenso e regole deontologiche. Parto da scenari tipici senza dettagli identificativi e faccio validare i testi allo studio.",
      },
      {
        question: "WhatsApp è adatto per un avvocato?",
        answer:
          "Per fissare un appuntamento sì. Per gestire fascicoli no. Sul sito lo presento come contatto rapido, con avviso sui contenuti riservati e link chiaro al form o all’email dello studio.",
      },
      {
        question: "Quanto tempo serve per un sito studio legale?",
        answer:
          "Dipende da quante aree di pratica e da quanto materiale è pronto. Con contenuti chiari si arriva a una presenza solida in poche settimane di lavoro focalizzato, non mesi di redesign estetico.",
      },
    ],
    related: [
      { label: "Servizio siti per professionisti", href: "/servizi/professionisti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "sito-commercialista-730-bilanci-pagine-servizi",
    service: "professionisti",
    title:
      "Sito commercialista: 730, bilanci e pagine servizi che filtrano le richieste",
    description:
      "Nei picchi del 730 e dei bilanci lo studio riceve richieste confuse. Come organizzo un sito per commercialisti che spiega, filtra e indirizza i clienti giusti al momento giusto.",
    date: "2026-05-22",
    keywords: [
      "sito commercialista",
      "sito studio commercialista",
      "pagine servizi 730",
      "sito bilanci società",
      "sito professionisti fiscali",
    ],
    intro:
      "A marzo lo studio commercialista non ha un problema di traffico. Ha un problema di rumore: «quanto costa il 730?», «mi serve una Partita IVA», «il mio commercialista non risponde». Un sito ben fatto non elimina la stagione. Riduce le chat inutili e fa arrivare richieste già orientate.",
    sections: [
      {
        heading: "Il picco non si gestisce con una homepage generica",
        paragraphs: [
          "«Consulenza fiscale e societaria» non dice nulla a chi ha la scadenza sul calendario. In stagione metto in evidenza le pagine che contano davvero: 730 e dichiarazioni, aperture/cessazioni, bilanci e società, consulenza ordinaria.",
          "Ogni pagina ha un compito: spiegare per chi è, cosa serve portare, tempi tipici, come contattare. Il resto resta raggiungibile dal menu. Non nascondo i servizi: priorizzo quello che oggi genera code.",
        ],
      },
      {
        heading: "Checklist e documenti: meno andirivieni",
        paragraphs: [
          "La domanda più ripetuta è «cosa mi serve?». Una sezione documenti richiesti — CU, spese sanitarie, mutuo, contratti — taglia decine di messaggi. Non sostituisce il colloquio: anticipa il lavoro sporco.",
          "Per le società faccio lo stesso con bilanci: elenco tipico di documenti, finestra temporale, contatto dedicato se c’è. Chi arriva preparato risparmia ore allo studio e a sé stesso.",
        ],
      },
      {
        heading: "Form che filtrano, non questionari da catasto",
        paragraphs: [
          "Chiedo tipo di richiesta (privato / Partita IVA / società), urgenza, se è già cliente, e un contatto. Basta. Campi lunghi su redditi e codici fiscali sul web pubblico non li metto: rischiosi e inutili al primo contatto.",
          "In stagione aggiungo spesso una FAQ «stiamo ricevendo molte richieste: tempi di risposta». Onestà > silenzio. Chi legge sa cosa aspettarsi e smette di inondare WhatsApp ogni due ore.",
        ],
      },
      {
        heading: "SEO stagionale senza rifare il sito ogni anno",
        paragraphs: [
          "Le query sul 730 esplodono in una finestra stretta. Tiene una pagina stabile, aggiornata, con titolo e intro chiari — non un articolo fantasma pubblicato a febbraio e dimenticato. Stesso discorso per bilanci e scadenze societarie.",
          "Collego quelle pagine dalla homepage solo nei mesi utili, oppure le tengo sempre ma con CTA più evidenti in stagione. Piccoli aggiornamenti di copy battono redesign annuali.",
        ],
      },
      {
        heading: "Dopo il picco: cosa resta utile",
        paragraphs: [
          "Quando la coda cala, le stesse pagine servizi restano la spina dorsale del sito commercialista. Aggiungo magari un pezzo su consulenza ordinaria o digitalizzazione documentale — senza trasformare lo studio in un blog da content farm.",
          "Misuro quante richieste complete arrivano per tipo di servizio. Se il 730 satura e i bilanci no, ribilancio CTA e menu. Il sito deve seguire il lavoro reale dello studio, non il contrario.",
        ],
      },
    ],
    faq: [
      {
        question: "Conviene una landing solo sul 730?",
        answer:
          "Sì in stagione, se lo studio vuole catturare quella query. Deve comunque rimandare allo studio intero: altrimenti sembri un call center fiscale usa e getta.",
      },
      {
        question: "Posso pubblicare listini prezzi?",
        answer:
          "Fasce o «a partire da» aiutano a filtrare. Prezzi chiusi per ogni casistica spesso mentono: meglio spiegare da cosa dipende il preventivo e come richiederlo.",
      },
      {
        question: "I clienti anziani usano il sito?",
        answer:
          "Molti sì se tipografia grande, bottoni chiari, telefono in evidenza. Altri chiamano: il sito serve comunque a chi li aiuta (figli, commercialista precedente che manda il link).",
      },
      {
        question: "Serve l’area riservata clienti?",
        answer:
          "Solo se lo studio ha già un flusso documentale digitale e qualcuno che la gestisce. Altrimenti è un login abbandonato. Meglio partire da pagine servizi e form puliti.",
      },
    ],
    related: [
      { label: "Siti per professionisti", href: "/servizi/professionisti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "portfolio-architetto-designer-case-study-rfp",
    service: "professionisti",
    title:
      "Portfolio architetto e designer: case study che reggono a un RFP serio",
    description:
      "Come strutturo il portfolio di architetti e designer: progetti raccontati, non gallerie infinite — così rispondi a bandi, RFP e clienti esigenti senza PDF da 80 mega.",
    date: "2026-05-23",
    keywords: [
      "portfolio architetto",
      "sito studio di architettura",
      "case study design",
      "portfolio designer",
      "sito professionisti creativi",
    ],
    intro:
      "Un RFP o un cliente strutturato non apre Instagram e dice «bello». Apre il sito e cerca: avete fatto qualcosa di simile? Come lavorate? Chi firma il progetto? Se il portfolio è solo una griglia di foto belle, perdete la gara prima della call.",
    sections: [
      {
        heading: "Galleria ≠ case study",
        paragraphs: [
          "La foto hero del soggiorno con luce perfetta vende mood. Non spiega vincoli, budget, iter autorizzativo, ruolo dello studio. Per un bando o un cliente corporate serve il secondo pezzo.",
          "Io strutturo ogni progetto forte così: contesto (chi, dove, vincolo), intervento, il tuo ruolo, 4–8 immagini selezionate, esito misurabile se c’è (tempi, mq, certificazioni) senza gonfiare numeri inventati.",
        ],
      },
      {
        heading: "Meno progetti, più profondità",
        paragraphs: [
          "Quaranta thumbnails confondono. Preferisco sei–dodici case study solidi, filtrabili per tipologia: residenziale, retail, uffici, interior, product. Chi arriva da un RFP hotel vuole vedere hotel, non il restauro della nonna — anche se era bellissimo.",
          "I lavori «vecchi ma rilevanti» restano se insegnano qualcosa. I lavori recenti deboli li tengo fuori finché non hanno una storia. Qualità percepita batte quantità SEO di pagine vuote.",
        ],
      },
      {
        heading: "Processo e team: la parte che i creativi saltano",
        paragraphs: [
          "Molti studi di architettura e design nascondono il metodo. Errore. Una pagina processo — brief, concept, sviluppo, cantiere o produzione, consegna — rassicura chi deve giustificare la scelta a un consiglio di amministrazione.",
          "Team con ruoli chiari: partner, project architect, interior. Non serve il CV completo. Serve sapere chi parla in riunione e chi firma i elaborati.",
        ],
      },
      {
        heading: "PDF, press kit e download utili",
        paragraphs: [
          "Per RFP e gare spesso chiedono materiale allegabile. Una pagina press/kit con PDF leggero del portfolio selezionato, logo, bio studio evita di mandare zip da 200 MB la sera prima della scadenza.",
          "Il sito resta la versione viva; il PDF è un estratto. Li tengo allineati: stessi progetti chiave, stessa nomenclatura. Niente due narrazioni diverse che fanno sembrare lo studio disorganizzato.",
        ],
      },
      {
        heading: "Contatto che non sembra un form da e-commerce",
        paragraphs: [
          "Chiedo tipologia di progetto, location, fasce di budget indicative se ha senso, timeline. Chi risponde già orientato merita risposta prioritaria. Chi scrive solo «info prezzi» senza contesto riceve comunque una risposta, ma il filtro è onesto.",
          "Per studi che lavorano su selezione, il sito professionisti è la vetrina che precede lo studio fisico. Lo progetto perché regga a uno sguardo di cinque minuti da parte di chi valuta offerte, non solo a scroll da telefono.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio Behance o un sito proprio?",
        answer:
          "Behance è distribuzione. Il sito è casa: dominio, SEO, case study lunghi, contact form. Spesso li uso insieme: Behance punta al sito per i dettagli.",
      },
      {
        question: "Devo mostrare i budget dei progetti?",
        answer:
          "Solo se lo studio è a suo agio e i numeri sono reali. Altrimenti fasce o «progetto di scala X» bastano. Inventare cifre è peggio di ometterle.",
      },
      {
        question: "Quante foto per case study?",
        answer:
          "Di solito 6–12 selezionate battono 40 file mediocri. Priorità a prima/dopo, dettagli costruttivi o di prodotto, e una pianta o schema se aiuta la comprensione.",
      },
      {
        question: "Il portfolio va aggiornato ogni mese?",
        answer:
          "No. Ogni nuovo progetto rilevante sì. Un aggiornamento trimestrale serio vale più di micro-post settimanali abbandonati.",
      },
    ],
    related: [
      { label: "Servizio siti professionisti", href: "/servizi/professionisti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "sito-fotografo-vs-instagram-richieste-booking",
    service: "professionisti",
    title:
      "Sito fotografo vs Instagram: più richieste serie e booking senza caos",
    description:
      "Instagram porta occhi. Un sito fotografo porta brief, date e preventivi. Come passo le richieste da DM confuse a un flusso di booking chiaro.",
    date: "2026-05-24",
    keywords: [
      "sito fotografo",
      "sito fotografa",
      "portfolio fotografo online",
      "booking fotografo",
      "sito vs Instagram fotografo",
    ],
    intro:
      "Il feed è pieno. I DM anche: «quanto per un matrimonio?», «hai disponibilità a giugno?», tre foto sparse senza data. Instagram vende lo stile. Non tiene ferma la disponibilità, i pacchetti, o il contratto. Per quello serve un sito fotografo che lavori mentre tu sei in set.",
    sections: [
      {
        heading: "Cosa Instagram fa bene — e dove si spezza",
        paragraphs: [
          "Stories e reel mostrano energia, behind the scenes, prove luce. Perfetti. Quello che non fanno è una pagina pacchetti stabile, una gallery filtrata per tipologia, un form che chiede data e location prima che tu risponda alle 23.",
          "Il link in bio punta a una sola cosa. Se quella cosa è un Linktree con otto destinazioni, hai già perso metà delle richieste. Meglio un sito con home chiara e CTA «verifica disponibilità».",
        ],
      },
      {
        heading: "Portfolio per tipo di lavoro, non per ego",
        paragraphs: [
          "Se fai matrimoni, brand e ritratti, mescolarli in un unico mashup confonde. Sezioni separate — o filtri — fanno arrivare chi cerca proprio quel servizio. Il wedding planner non vuole scrollare still life di prodotto.",
          "Seleziono poco e bene: dieci scatti forti per categoria battono cento medi. Comprimi, ottimizza, mobile first: il cliente apre dal telefono in pausa caffè.",
        ],
      },
      {
        heading: "Dal DM al brief strutturato",
        paragraphs: [
          "Il form chiede: tipo di servizio, data (anche «flessibile»), location, stima ospiti o ore, budget indicative se ti va, contatto. Rispondi già con pezzi del puzzle. Meno «ti faccio sapere», più preventivi utili.",
          "In bio e nelle Stories ripeto lo stesso URL. Il messaggio è uno: «per date e preventivo usa il sito». Alleni il pubblico. I curiosi restano sui like; chi è serio compila.",
        ],
      },
      {
        heading: "Pacchetti, FAQ e confini professionali",
        paragraphs: [
          "Anche senza listino chiuso, spiegare cosa include un pacchetto base (ore, consegna, editing) taglia negoziazioni infinite. FAQ su anticipo, meteo, second shooter, tempi di consegna: domande che altrimenti tornano ogni settimana.",
          "Metto anche i no: non faccio X, non viaggio sotto Y senza rimborso. Chiarezza sul sito = meno attrito dopo. Non è freddezza. È rispetto del tuo tempo in set.",
        ],
      },
      {
        heading: "Booking e follow-up senza diventare centralino",
        paragraphs: [
          "Calendario connesso o pagina disponibilità aggiornata dove ha senso; conferma email automatica; link al contratto o all’anticipo. Non serve un SaaS monstre se hai dieci job al mese — serve un flusso ripetibile.",
          "Io costruisco il sito fotografo come prolungamento del tuo stile visuale, non come tema WordPress generico. Instagram resta il megafono. Il sito chiude le richieste.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usare solo Instagram senza sito?",
        answer:
          "Puoi, finché le richieste sono poche e gestibili a mano. Quando i DM si sovrappongono e perdi date, il sito smette di essere optional.",
      },
      {
        question: "Devo pubblicare i prezzi?",
        answer:
          "Fasce o «a partire da» filtrano. Prezzi chiusi per ogni variante spesso mentono. Meglio spiegare cosa fa variare il preventivo e chiedere i dati giusti nel form.",
      },
      {
        question: "Il sito rallenta se carico le foto full-res?",
        answer:
          "Sì. Esporto versioni web, lazy load, formati moderni. La qualità percepita resta alta; il telefono del cliente non esplode.",
      },
      {
        question: "Serve un blog fotografico?",
        answer:
          "Solo se racconti sessioni vere e lo aggiorni. Altrimenti portfolio + pacchetti + contatto bastano e performano meglio di articoli fantasma.",
      },
    ],
    related: [
      { label: "Siti per professionisti", href: "/servizi/professionisti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "sito-medico-marketing-etico-senza-promesse",
    service: "professionisti",
    title:
      "Sito medico: marketing etico senza promesse di risultato",
    description:
      "Come progetto siti per medici e studi ambulatoriali: informazione chiara, prenotazione utile, zero claim miracolosi. Fiducia e deontologia prima del ranking.",
    date: "2026-05-25",
    keywords: [
      "sito medico",
      "sito studio medico",
      "marketing etico medici",
      "sito ambulatorio",
      "sito professionisti sanitari",
    ],
    intro:
      "Un sito medico non è una landing che vende dimagrimenti o «risultati garantiti». È uno strumento di orientamento: chi sei, cosa tratti, come prenotare, cosa aspettarsi al primo accesso. Io lo progetto con un vincolo fisso: niente promesse di esito. Solo chiarezza e rispetto delle regole del settore.",
    sections: [
      {
        heading: "Cosa si può (e non si può) dire online",
        paragraphs: [
          "Niente garanzie di guarigione, niente prima/dopo aggressivi dove vietati o fuorvianti, niente ranking inventati tipo «il migliore di…». Spiego patologie e percorsi in linguaggio accessibile, con il disclaimer che l’informazione non sostituisce la visita.",
          "I testi li faccio validare dallo studio. Non improvviso contenuti clinici. Il mio lavoro è struttura, UX, SEO locale onesta — non fare da copywriter sanitario senza supervisione.",
        ],
      },
      {
        heading: "Pagine servizi = orientamento, non vendita aggressiva",
        paragraphs: [
          "Per ogni branca o prestazione rilevante: a chi si rivolge, come si svolge tipicamente la visita, tempi di attesa indicativi se noti, preparazione (digiuno, documenti). Il paziente arriva meno ansioso e con le domande giuste.",
          "Evito elenchi interminabili di prestazioni tariffario-style in homepage. Metto in evidenza ciò che lo studio vuole far trovare online; il resto resta in listino o in ambulatorio.",
        ],
      },
      {
        heading: "Prenotazione e contatto senza dati eccessivi",
        paragraphs: [
          "Il form chiede il minimo: nome, contatto, motivo generico o branca, preferenza oraria. Niente anamnesi completa sul web pubblico. Per referti e dati clinici esistono canali dedicati — non una casella del sito.",
          "Se c’è un sistema di prenotazione già in uso (cup, software di studio), lo collego o lo cito chiaramente. Duplicare agenda su tre tool crea no-show e doppie prenotazioni.",
        ],
      },
      {
        heading: "Fiducia: titoli, sede, accessibilità",
        paragraphs: [
          "Nome, specializzazione, ordine di appartenenza dove richiesto, sede, orari, come arrivare, eventuali barriere architettoniche. Foto reali dello studio battono stock di camici sorridenti.",
          "Recensioni: solo canali leciti e policy dello studio. Non compro fake review. Non chiedo di «promettere cinque stelle» sul sito. La reputazione si costruisce in ambulatorio; il web la rende trovabile senza distorcerla.",
        ],
      },
      {
        heading: "SEO locale senza clickbait sanitario",
        paragraphs: [
          "«Dermatologo + città», «visita + patologia comune + zona» funzionano se le pagine sono vere e utili. Titoli sensazionalistici danneggiano fiducia e, spesso, anche la conformità. Preferisco chiarezza a traffico tossico.",
          "Allineo Google Business Profile al sito: stessi orari, stesso indirizzo, stesse prestazioni dichiarate. Per i professionisti sanitari che vogliono una presenza web seria, questo batte qualsiasi funnel da infoprodotti.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso pubblicare casi clinici o foto prima/dopo?",
        answer:
          "Solo dove consentito, con consenso, anonimizzazione e senza suggerire risultati tipici garantiti. In molti contesti è più sicuro evitare o usare descrizioni generiche validate dallo studio.",
      },
      {
        question: "Il sito può sostituire il consenso informato?",
        answer:
          "No. Il sito orienta. Consensi, privacy e documentazione clinica restano nei processi dello studio, non in un form marketing.",
      },
      {
        question: "Conviene un blog su sintomi e patologie?",
        answer:
          "Sì solo con revisione medica e aggiornamento. Articoli superficiali o spaventosi fanno più danno che SEO. Meglio poche pagine servizi accurate.",
      },
      {
        question: "WhatsApp per i pazienti è ok?",
        answer:
          "Per orari e prenotazioni, se lo studio lo gestisce. Non per referti o dati sensibili in chat. Sul sito lo preciserei in modo esplicito.",
      },
    ],
    related: [
      { label: "Servizio siti per professionisti", href: "/servizi/professionisti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
