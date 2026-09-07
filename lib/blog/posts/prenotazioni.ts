import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Prenotazioni — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const prenotazioniPosts = [
  {
    slug: "ux-prenotazione-cliniche-beauty-consulenti-slot-chiari",
    service: "prenotazioni",
    title:
      "UX prenotazione per cliniche, beauty e consulenti: slot chiari, meno abbandoni",
    description:
      "Come progetto flussi di booking per studi, centri estetici e consulenti: durata reale, griglia leggibile e conferma senza frizione — così lo slot online riduce le chiamate a vuoto.",
    date: "2026-07-15",
    keywords: [
      "prenotazione online cliniche",
      "booking centro estetico",
      "slot appuntamento chiari",
      "UX prenotazione online",
      "sistema prenotazioni Udine",
    ],
    intro:
      "Il calendario c’è già. Il problema è che chi arriva dal telefono non capisce in tre secondi cosa può prendere, quanto dura e se sei davvero libero. Io, da Udine, progetto UX di prenotazione partendo dallo slot: se la griglia mente sulla durata, squilla di nuovo il centralino e il sito è solo un poster.",
    sections: [
      {
        heading: "Lo slot è una promessa di tempo, non un pixel",
        paragraphs: [
          "«10:00 libero» per il cliente significa: arrivo alle dieci e finisco quando ho finito. Se mostri blocchi da quindici minuti su un servizio da quarantacinque, inventi overlap e litigi in reception. Collego ogni servizio a durata reale e, dove serve, a un buffer di preparazione: online compare solo ciò che puoi rispettare.",
          "In ambulatorio separo spesso prima visita e controllo. In beauty sommo taglio + colore in un’unica durata, non due prenotazioni che nessuno allinea. Per il consulente: slot da trenta o sessanta, timezone esplicito se lavori remoto.",
        ],
      },
      {
        heading: "Ordine del flusso: servizio prima del calendario vuoto",
        paragraphs: [
          "Sequenza che uso quasi sempre: servizio → operatore se conta → sede se ce n’è più di una → giorno → ora. Partire da un mese vuoto e chiedere «che servizio?» dopo fa abbandonare chi non ha ancora deciso. Sul mobile i giorni scorrono; le ore occupate restano visibili ma non cliccabili — non spariscono nel nulla.",
          "Sotto allo slot, copy corto: «45 min · conferma immediata» o «richiede acconto». Niente gergo da gestionale. Fasce riservate a telefono o urgenze? Non le metto online. Meglio meno orari onesti che un’agenda piena di fantasmi.",
        ],
      },
      {
        heading: "Riepilogo prima dei dati personali",
        paragraphs: [
          "Dopo l’ora mostro un blocco fisso: servizio, durata, prezzo se lo pubblichi, sede, cosa portare. Solo dopo chiedo nome e contatto. Chi prenota vuole rassicurarsi prima di consegnarti il numero.",
          "Il form resta corto: nome, telefono o email, nota breve. Anamnesi e questionari lunghi vivono dopo la conferma o in studio. Se certi casi non entrano nel web, un canale secondario chiaro («gruppi e urgenze: WhatsApp») batte un booking che finge di coprire tutto.",
        ],
      },
      {
        heading: "Cosa misuro dopo il go-live",
        paragraphs: [
          "Guardo abbandoni sul passo «scegli ora», orari più cliccati e quante prenotazioni poi richiedono modifica a mano. Se tutti chiamano «perché non vedo sabato», il problema è nelle regole di disponibilità, non nel colore del bottone.",
          "Obiettivo concreto: meno «siete liberi martedì?» a vuoto, più appuntamenti già allineati a durata e persona. CRM e cartelle cliniche arrivano dopo, se servono davvero — non il giorno uno.",
        ],
      },
      {
        heading: "Dal sito al servizio di prenotazione",
        paragraphs: [
          "La pagina servizi spiega cosa fai; il flusso booking chiude l’azione. Stesso tono, stesse regole che usi al telefono. Se reception e sito dicono due cose diverse, vince sempre la chat — e il booking muore.",
          "Se ti riconosci in cliniche, beauty o consulenze one-to-one e vuoi slot che non mentono, guarda il servizio prenotazioni o scrivimi da contatti: partiamo dalla durata reale dei tuoi servizi, non da un widget generico.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo pubblicare anche gli orari di riserva?",
        answer:
          "No. Online solo le fasce che vuoi riempire da web. Le riserve restano al telefono o in agenda interna: meno overbooking e aspettative sbagliate.",
      },
      {
        question: "Prima l’operatore o il servizio?",
        answer:
          "Di solito il servizio: il cliente sa cosa vuole. L’operatore viene dopo, o lo salto se lavori da solo. Se la relazione è il prodotto (consulente, fisioterapista fisso), lo anticipo.",
      },
      {
        question: "Quanto lungo il form di prenotazione?",
        answer:
          "Nome, contatto, eventuale nota. Tutto il resto dopo. Un questionario clinico sul primo click uccide le conversioni.",
      },
      {
        question: "Funziona anche per call one-to-one?",
        answer:
          "Sì: durata fissa, link meet o sede «online», campo argomento. Stessa UX, regole diverse.",
      },
    ],
    related: [
      { label: "Portali di prenotazione", href: "/servizi/prenotazioni" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "promemoria-sms-email-whatsapp-ridurre-no-show",
    service: "prenotazioni",
    title:
      "Promemoria SMS, email e WhatsApp: ridurre i no-show senza stalking",
    description:
      "Sequenze di reminder per attività su appuntamento: cosa mando, quando, e come evito messaggi invasivi che irritano i clienti invece di farli arrivare.",
    date: "2026-07-16",
    keywords: [
      "promemoria appuntamento",
      "ridurre no-show",
      "reminder WhatsApp prenotazione",
      "SMS conferma appuntamento",
      "prenotazioni online Friuli",
    ],
    intro:
      "Una poltrona vuota costa più di un sito lento: prodotto preparato, turno bruciato, umore a pezzi. Non si sistema con «speriamo che si ricordino». Io imposto promemoria automatici — email, SMS o WhatsApp — calibrati sul tipo di attività, così il cliente ha un’ancora senza sentirsi inseguito da un bot.",
    sections: [
      {
        heading: "La sequenza che uso (e quando la taglio)",
        paragraphs: [
          "Conferma subito all’invio: riepilogo + come modificare o cancellare. Poi un reminder a 24–48 ore per beauty, consulenze e visite non urgenti. Su slot caldi o con acconto alto, un ping la mattina stessa. Oltre tre messaggi raramente serve: diventa rumore.",
          "Canale primario: quello che il cliente ha già accettato. In Italia WhatsApp spesso batte l’email; l’SMS resta rete di sicurezza. Non sparo lo stesso testo su tre canali nello stesso minuto.",
        ],
      },
      {
        heading: "Copy che fa arrivare, non che spaventa",
        paragraphs: [
          "Messaggio corto: data, ora, sede o link, durata, un’azione («Rispondi NO per cancellare» o link di gestione). Il tono punitivo («in caso di assenza verrà addebitato…») non sta nel reminder: sta in policy e conferma iniziale.",
          "Digiuno, documenti, arrivo in anticipo: vanno nel reminder. È lì che salvano la visita, non in un paragrafo sepolto in homepage.",
        ],
      },
      {
        heading: "Cancellare e riprogrammare deve essere facile",
        paragraphs: [
          "Se per spostare un orario serve una telefonata da otto minuti, molti semplicemente non si presentano. Nel flusso lascio self-service con regole chiare (es. modifica fino a 12 ore prima). Tu recuperi lo slot; il cliente non si sente bloccato.",
          "Le cancellazioni tardive le conto. Se esplodono, rafforziamo acconto o policy — non i reminder. Più ping non curano una regola debole.",
        ],
      },
      {
        heading: "Privacy: solo ciò che serve all’appuntamento",
        paragraphs: [
          "Spiego a cosa servono i contatti: conferma e promemoria su quell’appuntamento, non newsletter a raffica. Allineo testi e consensi a come lavori tu; non invento un CRM di marketing se ti serve solo non avere buchi in agenda.",
          "Misuro no-show prima/dopo, aperture dei reminder e modifiche via link. Se i no-show restano alti, spesso è altro: attese lunghe in sede, overbooking, o slot troppo lontani nel tempo.",
        ],
      },
      {
        heading: "Reminder e sito di prenotazione insieme",
        paragraphs: [
          "Il reminder funziona se lo slot online è onesto e la policy è la stessa ovunque. Altrimenti mandi messaggi precisi su regole confuse — e perdi fiducia.",
          "Se vuoi una sequenza calibrata sul tuo pubblico locale, parti dal servizio prenotazioni o da contatti: scegliamo canale e cadenza sui tuoi numeri reali, non su un default da SaaS americano.",
        ],
      },
    ],
    faq: [
      {
        question: "WhatsApp, SMS o email?",
        answer:
          "Dipende dal pubblico. Beauty e professionisti locali: spesso WhatsApp + email di conferma. Contesti più formali: email + SMS. Parto da uno; il secondo solo se i dati lo chiedono.",
      },
      {
        question: "I reminder bastano senza acconto?",
        answer:
          "Per molti sì, se cancellare è facile e lo slot non è tra dieci giorni. Su trattamenti lunghi o alta richiesta, reminder + policy/acconto funzionano meglio insieme.",
      },
      {
        question: "Posso mettere offerte nel reminder?",
        answer:
          "Sconsiglio. Quel messaggio ha un lavoro: farti arrivare in orario. Promo e upsell stanno altrove.",
      },
      {
        question: "E se non apre WhatsApp?",
        answer:
          "Conferma email o SMS come rete di sicurezza; in agenda vedi comunque lo stato. Non dipendiamo da un solo canale.",
      },
    ],
    related: [
      { label: "Portali di prenotazione", href: "/servizi/prenotazioni" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "acconto-policy-prenotazione-aspettative-chiare",
    service: "prenotazioni",
    title:
      "Acconto e policy di prenotazione: aspettative chiare prima dell’appuntamento",
    description:
      "Come integro acconti, disdette e regole nel booking senza sembrare un regolamento ostile — e riducendo litigi in reception il giorno dell’appuntamento.",
    date: "2026-07-17",
    keywords: [
      "acconto prenotazione online",
      "policy disdetta appuntamento",
      "regole prenotazione sito",
      "caparra appuntamento",
      "booking online policy",
    ],
    intro:
      "L’acconto non è «essere cattivi»: è proteggere il tempo. Il guaio nasce quando la regola arriva tardi — o non arriva. Io metto policy e, dove serve, deposito nel flusso di prenotazione prima della conferma, non dopo una discussione al bancone.",
    sections: [
      {
        heading: "Policy corta, visibile, non nascosta nel footer",
        paragraphs: [
          "Una pagina «Come funziona la prenotazione»: entro quanto si sposta gratis, cosa succede in no-show, se serve acconto e su quali servizi, tempi di rimborso. Linkata dal booking e dalla conferma. Non un PDF legale da otto pagine: un testo umano che sottoscrivi davvero.",
          "Nel riepilogo pre-invio ripeto l’essenziale in tre righe. Chi conferma ha già visto la regola: meno «non lo sapevo».",
        ],
      },
      {
        heading: "Quando l’acconto ha senso (e quando no)",
        paragraphs: [
          "Ha senso su slot lunghi, trattamenti costosi, weekend, prime visite con preparazione, o quando i no-show ti hanno già bruciato margine. Per un taglio da venticinque minuti di martedì mattina spesso bastano reminder e cancellazione facile.",
          "Se attivo il deposito, lo collego solo ai servizi giusti. Importo chiaro (fisso o percentuale), cosa include, se scala sul totale o resta trattenuto in assenza. Niente «acconto universale perché fa moderno».",
        ],
      },
      {
        heading: "Pagamento online senza teatro",
        paragraphs: [
          "Il cliente deve capire se sta bloccando lo slot o pagando già una parte del servizio. Evito checkout con upsell random. Dopo il pagamento: riepilogo, data, ora, sede, link per gestire l’appuntamento secondo le regole.",
          "Se non vuoi gateway subito, parto da policy + conferma + reminder e aggiungo l’acconto quando i numeri lo giustificano. Meglio una regola rispettata che un pagamento inutilizzato.",
        ],
      },
      {
        heading: "Tono fermo, non punitivo",
        paragraphs: [
          "Scrivo «Se disdici entro X ore lo slot si libera per un altro cliente» invece di minacce. Una frase sul perché basta. In Friuli si vive di passaparola: la policy deve proteggerti senza sembrare un contratto da catena internazionale.",
          "Allineo WhatsApp e reception allo stesso testo. Se il sito dice 24 ore e al telefono «va bene anche un’ora prima», la policy online muore.",
        ],
      },
      {
        heading: "Policy come pezzo del sistema di prenotazione",
        paragraphs: [
          "Regole, reminder e (eventuale) acconto sono lo stesso prodotto. Separarli in tre tool diversi crea buchi. Io li tengo nel flusso che costruisco sul sito.",
          "Se vuoi impostare aspettative prima che qualcuno prenoti, guarda il servizio prenotazioni o scrivimi da contatti: partiamo da cosa ti è già successo in agenda, non da un template legale generico.",
        ],
      },
    ],
    faq: [
      {
        question: "L’acconto scoraggia le prenotazioni?",
        answer:
          "Su servizi ad alto impegno filtra. Su low-ticket obbligatorio e alto, sì, può far male. Lo taro sul valore dello slot e sulla tua storia di no-show.",
      },
      {
        question: "Serve un avvocato per la pagina policy?",
        answer:
          "Io scrivo il testo operativo chiaro. Per formulazioni delicate (salute, minori, dati particolari) fallo leggere al tuo consulente. Il sito non sostituisce un parere legale.",
      },
      {
        question: "Acconto solo il sabato?",
        answer:
          "Sì. Regole per giorno, servizio o operatore: il booking le applica senza che tu te le ricordi a mano.",
      },
      {
        question: "Niente acconto, solo regole?",
        answer:
          "Policy di disdetta + reminder + link di modifica. Spesso riduce già i buchi senza toccare i pagamenti.",
      },
    ],
    related: [
      { label: "Portali di prenotazione", href: "/servizi/prenotazioni" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "sync-google-calendar-prenotazioni-senza-overengineering",
    service: "prenotazioni",
    title:
      "Sync Google Calendar e prenotazioni: abbastanza sync, zero overengineering",
    description:
      "Come collego booking online e Google Calendar in modo pragmatico: eventi dove guardi ogni giorno, senza costruire un ERP o un secondo gestionale.",
    date: "2026-07-18",
    keywords: [
      "prenotazioni Google Calendar",
      "sync calendario booking",
      "integrazione Google Calendar sito",
      "agenda online professionisti",
      "prenotazioni Udine freelance",
    ],
    intro:
      "Molti professionisti vivono già in Google Calendar. Il sito di prenotazione non deve sostituirlo con un pannello alieno: deve dialogarci. Io imposto sync utili — eventi dove guardi ogni mattina — senza venderti architetture da ospedale quando ti bastano appuntamenti e blocchi «occupato».",
    sections: [
      {
        heading: "Due direzioni, due livelli di complessità",
        paragraphs: [
          "Livello 1, spesso abbastanza: dal booking verso Google. Ogni prenotazione crea un evento con titolo sensato, durata, sede o link meet, nota con contatto. Tu vedi l’agenda sul telefono; il sito resta master delle regole di disponibilità.",
          "Livello 2: anche ferie e impegni che metti a mano su Google chiudono gli slot online. Comodo, ma vuole disciplina. Se mescoli promemoria personali e lavoro sullo stesso calendario, il booking legge rumore.",
        ],
      },
      {
        heading: "Cosa non costruisco di proposito",
        paragraphs: [
          "Niente secondo gestionale «perché un giorno magari». Niente inventario, cartelle cliniche complete o fatturazione cucita a forza nel calendario. Se ti serve un software verticale di settore, valuto integrazione o convivenza: sito per acquisire e confermare, tool di settore per il resto.",
          "Evito doppie fonti di verità. O le regole stanno nel sistema di prenotazione, o in Google con regole chiare — non metà e metà senza documentarlo.",
        ],
      },
      {
        heading: "Dettagli che evitano doppie prenotazioni",
        paragraphs: [
          "Buffer tra appuntamenti, fuso orario esplicito, titoli che non espongono dati sensibili se condividi lo schermo, aggiornamento quando il cliente modifica o cancella. Più calendari? Definisco quale è «di booking».",
          "Per team piccoli: un calendario per operatore, non un calderone unico. La sync segue la persona scelta nel flusso.",
        ],
      },
      {
        heading: "Come capiamo se basta così",
        paragraphs: [
          "Dopo qualche settimana: slot fantasma, eventi non aggiornati dopo una disdetta, tempo ancora speso a copiare a mano. Se copi su un foglio, la sync non è tarata. Se apri Google e l’agenda torna, abbiamo chiuso senza overengineering.",
          "Da Udine lavoro così con consulenti, studi e centri servizi: strumento familiare + booking sul sito che rispetta le stesse ore.",
        ],
      },
      {
        heading: "Calendar come pezzo del portale, non come progetto a parte",
        paragraphs: [
          "La sync ha senso se slot, reminder e policy sono già onesti. Altrimenti sincronizzi il caos. Prima le regole, poi il ponte verso Google.",
          "Se vuoi collegare prenotazioni e Calendar senza un ERP, parti dal servizio prenotazioni o da contatti: scegliamo il livello minimo che ti toglie il copia-incolla.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve Google Workspace a pagamento?",
        answer:
          "Dipende da volume e permessi. Per molti basta un account Google ordinato e un calendario dedicato al lavoro. Con team, Workspace aiuta.",
      },
      {
        question: "Sync in tempo reale al secondo?",
        answer:
          "Aggiornamenti rapidi per uso reale, non promesse da borsa. Secondi o pochi minuti tra prenotazione e evento: bastano per evitare overlap tipici.",
      },
      {
        question: "Apple Calendar o Outlook?",
        answer:
          "Spesso sì via interoperabilità. Google resta il ponte più richiesto: parto da dove vivi oggi e scelgo il percorso minimo.",
      },
      {
        question: "Ho già un gestionale con calendario?",
        answer:
          "Allora il sito non lo reinventa: integriamo o usiamo il gestionale come master e il sito come vetrina + ingresso. Una sola fonte di verità.",
      },
    ],
    related: [
      { label: "Portali di prenotazione", href: "/servizi/prenotazioni" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "multi-sede-multi-operatore-scheduling-prenotazioni",
    service: "prenotazioni",
    title:
      "Scheduling multi-sede e multi-operatore: far scegliere senza far confondere",
    description:
      "Come organizzo prenotazioni online con più sedi o più professionisti: regole di disponibilità, UX di scelta e notifiche solo a chi di dovere.",
    date: "2026-07-19",
    keywords: [
      "prenotazione multi operatore",
      "booking multi sede",
      "calendario staff online",
      "appuntamenti più professionisti",
      "sistema prenotazioni Friuli",
    ],
    intro:
      "Due sedi, tre operatori, servizi diversi per ciascuno: è qui che i template «un calendario solo» si spezzano. Io progetto scheduling multi-sede e multi-operatore per chi prenota (scelta chiara) e per chi lavora (solo le proprie notifiche). Meno «pensavo di essere a Udine e invece…».",
    sections: [
      {
        heading: "Prima le regole, poi l’interfaccia",
        paragraphs: [
          "Mappiamo: quali servizi fa chi, in quale sede, in quali giorni. Chi non fa prime visite non le vede online. Una sede senza un trattamento non lo propone. Il booking nasconde le combinazioni impossibili invece di farle prenotare e disdire dopo.",
          "«Primo disponibile» non è magia: è ordinare gli slot liberi tra operatori abilitati a quel servizio. Senza regole vere, è roulette.",
        ],
      },
      {
        heading: "UX: sede e persona senza labirinto",
        paragraphs: [
          "Multi-sede: chiedo la sede presto, o la ricavo dal servizio se è esclusivo. Multi-operatore: «scegli tu» oppure «primo disponibile». Foto e nome se la relazione conta; li nascondo se conta solo lo slot.",
          "Sul mobile niente dropdown infiniti: lista o card con sede e prossimi orari. Il cliente non deve capire il tuo organigramma.",
        ],
      },
      {
        heading: "Notifiche e permessi: ognuno il proprio",
        paragraphs: [
          "L’operatore A non riceve gli appuntamenti di B. Email, WhatsApp e Calendar puntano al calendario giusto. Reception, se c’è, può avere vista d’insieme; i professionisti no, se non serve.",
          "Ferie e permessi chiudono solo gli slot di quella persona o sede. Un’assenza generica su un unico calendario condiviso è la causa classica di buchi e doppie assegnazioni.",
        ],
      },
      {
        heading: "Da uno a tanti senza rifare il sito",
        paragraphs: [
          "Parto spesso mono-operatore con scheletro pronto ad aggiungerne. Seconda sede: aggiungiamo sede e regole, non un secondo dominio. Stesso brand, stessi reminder, stessa policy.",
          "Misuro quota per sede/operatore, errori di assegnazione, chiamate «chi mi segue?». Se quella domanda resta alta, manca chiarezza in UX o in conferma — non un altro plugin.",
        ],
      },
      {
        heading: "Quando il multi-operatore è il prodotto",
        paragraphs: [
          "Per centri beauty, studi condivisi e piccole cliniche locali lo scheduling multi-persona è il cuore del portale di prenotazione, non un optional. Lo progetto così: regole prima, interfaccia dopo, sync e reminder allineati.",
          "Se stai crescendo da una poltrona a un team, guarda il servizio prenotazioni o scrivimi da contatti: mappiamo sedi, operatori e servizi prima di disegnare un click.",
        ],
      },
    ],
    faq: [
      {
        question: "Quanti operatori gestisce un booking snello?",
        answer:
          "Per la maggior parte delle attività locali, da 1 a 8–10 con regole chiare. Oltre, valutiamo se serve un gestionale di settore e il sito come ingresso.",
      },
      {
        question: "Il cliente deve scegliere l’operatore?",
        answer:
          "No. Obbligatoria, opzionale o assente (solo primo slot libero). Dipende se vendete la persona o la prestazione.",
      },
      {
        question: "Due sedi = due WhatsApp?",
        answer:
          "Non obbligatorio, ma utile. Altrimenti instrado per sede sulla stessa inbox con etichetta chiara. L’importante è non mischiare gli appuntamenti senza contesto.",
      },
      {
        question: "Prezzi diversi per sede?",
        answer:
          "Sì: servizio × sede (e se serve × operatore). Il riepilogo pre-conferma mostra il prezzo giusto prima dell’invio o dell’acconto.",
      },
    ],
    related: [
      { label: "Portali di prenotazione", href: "/servizi/prenotazioni" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
