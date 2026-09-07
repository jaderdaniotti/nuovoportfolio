import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Agenzie immobiliari — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 * SEO etica: zero doorway page, zero “mille comuni clonati”.
 */
export const agenzieImmobiliariPosts = [
  {
    slug: "schede-immobile-filtri-mappe-whatsapp-senza-solo-idealista",
    service: "agenzie-immobiliari",
    title:
      "Schede immobile sul sito: filtri, mappe e WhatsApp senza vivere solo di Idealista",
    description:
      "Come strutturo catalogo, filtri reali e contatto WhatsApp per un’agenzia immobiliare: i portali restano canali, il sito diventa dove chiudi il lead.",
    date: "2026-06-05",
    keywords: [
      "sito agenzia immobiliare",
      "schede immobile",
      "filtri ricerca immobili",
      "lead WhatsApp agenzia",
      "catalogo immobili sito",
    ],
    intro:
      "Idealista ti porta gente. Poi quella gente atterra su una pagina con tre foto storte e un numero generico — e torna al portale. Io progetto schede immobile perché restino e scrivano a te, non al marketplace.",
    sections: [
      {
        heading: "Il catalogo sul tuo dominio: perché conta",
        paragraphs: [
          "I portali fanno discovery. Il brand lo fai tu. Se ogni annuncio rimanda a una scheda debole, resti intercambiabile: stesso layout di altre cento agenzie, stesso tono da copy generico.",
          "Sul sito proprietario controllo ordine dei dati, tono, aggiornamenti e — soprattutto — dove finisce il contatto. Filtri che uso davvero: tipologia, zona, fascia prezzo, mq, stato. Pochi, affidabili, collegati a dati puliti. Niente menu da aeroporto.",
        ],
      },
      {
        heading: "Cosa deve avere una scheda che converte",
        paragraphs: [
          "In alto: prezzo, mq, locali, comune, etichetta (in vendita / riservato). Poi hero fotografico onesto, descrizione senza poesia da brochure, planimetria se c’è, CTA ripetute senza urlare.",
          "L’obiettivo non è imitare Idealista. È far capire in dieci secondi se vale la pena scrivere — e dare un motivo per farlo sul tuo dominio, non sul form del portale.",
        ],
      },
      {
        heading: "Mappe utili, non widget decorativi",
        paragraphs: [
          "La mappa orienta. Non deve esporre il civico se la policy commerciale dice di no: pin di zona o via senza numero, coerente col testo. Chi cerca “dove è davvero” capisce lo stesso.",
          "Su mobile la metto dopo i dati essenziali, altezza controllata. Punti di interesse (scuola, stazione) in testo o marker secondari — non una guida turistica dentro la scheda.",
        ],
      },
      {
        heading: "WhatsApp come ingresso, non come caos",
        paragraphs: [
          "Molte trattative chiudono in chat. Preparo un deep link con messaggio precompilato: riferimento immobile, ID, comune. L’agente sa di cosa parla senza chiedere «quale casa?».",
          "Accanto: form con nome, telefono, fascia oraria. Chi non usa WhatsApp non resta fuori. Stesso riferimento immobile su entrambi i canali. Idealista resta ingresso; il sito raccoglie il lead con contesto.",
        ],
      },
      {
        heading: "Stati aggiornati o meglio meno annunci",
        paragraphs: [
          "Niente è peggio di un venduto ancora online. Flusso semplice: bozza → pubblicato → riservato → chiuso. Etichette chiare; schede morte fuori o in archivio soft.",
          "Se c’è un gestionale, valuto sync; se lavorate a mano, un processo editoriale sostenibile batte un catalogo pieno di fantasmi. Dopo il go-live misuro click WhatsApp per scheda e filtri usati — non vanity traffic.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo togliere gli annunci da Idealista?",
        answer:
          "No. I portali restano acquisizione. Serve una scheda forte sul tuo sito così chi arriva da Google, referral o portale trova brand e lead tracciabile.",
      },
      {
        question: "Quante foto per scheda?",
        answer:
          "Meglio 8–20 scatti ordinati (esterni, interni, dettagli, contesto) che 40 ripetute. Luce reale e ordine: la prima impressione decide se aprono WhatsApp.",
      },
      {
        question: "La mappa deve mostrare l’indirizzo esatto?",
        answer:
          "Solo se lo volete. Per vendite delicate uso zona o via senza civico. Chiarezza per l’utente e privacy del proprietario si bilanciano insieme.",
      },
      {
        question: "WhatsApp sostituisce il CRM?",
        answer:
          "No: è un ingresso rapido. Il messaggio o il form devono finire dove assegnate l’agente e tenete lo storico. Il sito prepara il lead; il CRM lo governate voi.",
      },
    ],
    related: [
      { label: "Siti per agenzie immobiliari", href: "/servizi/agenzie-immobiliari" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "pagine-villa-lusso-esclusive-velocita-fotografia",
    service: "agenzie-immobiliari",
    title:
      "Pagine villa e immobili di lusso: esclusività, velocità e fotografia che non mente",
    description:
      "Come progetto landing per ville e immobili esclusivi: foto vere, caricamento rapido, tono riservato — senza gadget che fanno sembrare l’annuncio un e-commerce.",
    date: "2026-06-06",
    keywords: [
      "sito villa di lusso",
      "pagina immobile esclusivo",
      "fotografia immobiliare",
      "landing villa in vendita",
      "agenzia immobili di pregio",
    ],
    intro:
      "Una villa da un milione non si vende con lo stesso template del bilocale in periferia. Serve una pagina che respiri spazio e riservatezza — e che carichi in due secondi anche su 4G in collina.",
    sections: [
      {
        heading: "Una pagina, un immobile (quando ha senso)",
        paragraphs: [
          "Per gli esclusivi spesso stacco una URL dedicata: foto a tutta larghezza, testo corto, accesso su richiesta se serve. Non è snobismo: è controllo sul racconto e sui lead.",
          "Nel catalogo generale resta la card sintetica; chi clicca entra in un’esperienza diversa. Evito di mischiare “da 180.000” e “su richiesta” nello stesso grid rumoroso.",
        ],
      },
      {
        heading: "Fotografia: meno filtri, più verità",
        paragraphs: [
          "HDR aggressivo e cielo plastificato uccidono la fiducia. Preferisco scatti ordinati, luce naturale, qualche dettaglio tattile (materiali, vista, giardino) e una planimetria leggibile.",
          "Se le foto definitive arrivano dopo, pubblico con una selezione onesta e aggiorno. Meglio online con dieci immagini forti che in bozza per mesi in attesa del drone perfetto.",
        ],
      },
      {
        heading: "Velocità come segnale di qualità",
        paragraphs: [
          "Chi guarda immobili di pregio lo fa spesso dal telefono, in auto o in pausa. Una gallery da 8 MB a foto sembra dilettantesca quanto una descrizione piena di errori.",
          "Comprimo, lazy-load dopo la hero, evito slider pesanti e video autoplay. La pagina deve sembrare premium perché è ordinata e veloce — non perché ha particelle glitter.",
        ],
      },
      {
        heading: "Tono riservato, CTA chiare",
        paragraphs: [
          "Niente countdown o “ultimi pezzi”. Frasi corte su posizione, metri, stato, cosa è negoziabile. CTA: richiesta visita, brochure PDF, contatto diretto dell’agente referente.",
          "Se l’immobile è off-market o soft, un form “accesso materiali” con nome e telefono filtra meglio di un WhatsApp generico in homepage.",
        ],
      },
      {
        heading: "Cosa non metto (di proposito)",
        paragraphs: [
          "Chatbot invasivi, pop-up newsletter, mappe Street View che espongono il cancello se non concordato, confronti prezzo automatici da portale. Rompono il tono.",
          "Quando lavoro su queste pagine parto da foto e vincoli di privacy, poi layout. Se hai un esclusivo fermo sul portale e vuoi una vetrina propria, ne parliamo su contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve sempre una landing dedicata?",
        answer:
          "No. Ha senso sopra una certa fascia o per off-market. Sotto, una scheda catalogo eccellente basta — purché non sia una copia scarsa del portale.",
      },
      {
        question: "Video drone sì o no?",
        answer:
          "Sì se è corto, silenzioso di default e non blocca il caricamento. Un still forte in hero batte un video lento da 40 MB.",
      },
      {
        question: "Mostro il prezzo?",
        answer:
          "Se è pubblico sul portale, sì anche sul sito. Se è “su richiesta”, lo scrivo chiaro e chiedo un contatto qualificato — niente finti prezzi per SEO.",
      },
      {
        question: "Quanto tempo per una pagina villa?",
        answer:
          "Con foto e testo pronti, giorni. Il collo di bottiglia è quasi sempre selezione scatti e approvazione del proprietario, non il codice.",
      },
    ],
    related: [
      { label: "Servizio agenzie immobiliari", href: "/servizi/agenzie-immobiliari" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "chi-siamo-team-agenzia-fiducia-venditori",
    service: "agenzie-immobiliari",
    title:
      "Chi siamo e team agenzia: la pagina che convince i venditori (non solo i buyer)",
    description:
      "Perché la pagina Chi siamo di un’agenzia immobiliare deve parlare ai proprietari che affidano l’incarico: volti, metodo, zone, prove — non mission statement vuoti.",
    date: "2026-06-07",
    keywords: [
      "pagina chi siamo agenzia immobiliare",
      "team agenti immobiliari",
      "fiducia venditori immobili",
      "sito agenzia incarico vendita",
      "brand agenzia immobiliare",
    ],
    intro:
      "Chi cerca casa guarda gli annunci. Chi vi dà l’incarico guarda chi siete. Se la Chi siamo è un paragrafo stock con skyline generico, il proprietario firma altrove.",
    sections: [
      {
        heading: "Due pubblici, due messaggi (stessa pagina)",
        paragraphs: [
          "Buyer: «sapete la zona, rispondete in fretta». Venditore: «non sparite dopo il cartello, non sottovalutate, non lasciate l’immobile a marcire online».",
          "Strutturo la pagina per il secondo senza dimenticare il primo: metodo di valutazione, come gestite le visite, come comunicate. Poi i volti. Poi le zone.",
        ],
      },
      {
        heading: "Volti e ruoli, non solo logo",
        paragraphs: [
          "Foto vere degli agenti, nome, zona o specializzazione (residenziale, lusso, affitti). Un numero o email diretti dove ha senso — riduce il “centralino eterno”.",
          "Se siete in cinque, non serve biografia da LinkedIn. Tre righe sincere battono un romanzo sul “passione per il mattone”.",
        ],
      },
      {
        heading: "Prove, non slogan",
        paragraphs: [
          "Anni sul territorio, tipologie chiuse di recente (senza tradire privacy), recensioni con nome e contesto, eventuale video breve del titolare. Numeri reali: tempi medi di vendita solo se li tenete aggiornati.",
          "Evito claim tipo “n.1 in città” senza fonte. Il venditore smaliziato li ignora; l’acquirente pure.",
        ],
      },
      {
        heading: "Metodo in quattro passi visibili",
        paragraphs: [
          "Sopralluogo → pricing → piano foto/portali/sito → report al proprietario. Scritto chiaro, senza PDF da venti pagine in homepage.",
          "Se usate un report settimanale o un canale WhatsApp dedicato al venditore, ditelo: è il tipo di dettaglio che fa scegliere voi invece del “metto online e vediamo”.",
        ],
      },
      {
        heading: "Come la collego al resto del sito",
        paragraphs: [
          "Dalla Chi siamo link a contatti per incarico, a una selezione di immobili seguiti bene, eventualmente a un articolo sul processo. Niente menu fantasma.",
          "Quando rifaccio siti agenzia, questa pagina è spesso la prima che riscrivo coi titolari in call. Se la vostra è ferma al 2019, partiamo da lì.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio una pagina team o schede singole agente?",
        answer:
          "Team in una pagina se siete piccoli. Schede dedicate se un agente ha personal brand forte o zone molto diverse — senza duplicare lo stesso testo dieci volte.",
      },
      {
        question: "Devo mettere i risultati di vendita?",
        answer:
          "Sì, in forma aggregata o con casi anonimizzati. Indirizzi precisi e cifre sensibili solo col consenso. Meglio tre casi veri che una top ten inventata.",
      },
      {
        question: "La Chi siamo serve ancora con Instagram attivo?",
        answer:
          "Sì. Il proprietario che confronta tre agenzie apre i siti, non solo i reel. Instagram mostra vita; la Chi siamo mostra accountability.",
      },
      {
        question: "Quanto deve essere lunga?",
        answer:
          "Quanto basta a rispondere a «chi», «dove», «come lavorate», «perché affidarvi l’incarico». Oltre, tagliate: la fiducia non cresce con i aggettivi.",
      },
    ],
    related: [
      { label: "Agenzie immobiliari", href: "/servizi/agenzie-immobiliari" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "seo-pagine-zona-quartiere-agenzia-etica",
    service: "agenzie-immobiliari",
    title:
      "SEO zone e quartieri per agenzie: utile, locale, senza spam da doorway",
    description:
      "Come creo pagine zona e quartiere per un’agenzia immobiliare in modo etico: contenuto vero, immobili collegati, zero copie clonate su cento comuni.",
    date: "2026-06-08",
    keywords: [
      "SEO agenzia immobiliare",
      "pagine zona immobili",
      "landing quartiere agenzia",
      "SEO locale immobiliare",
      "sito agenzia senza doorway",
    ],
    intro:
      "«Casa in vendita a [comune]» ripetuto su duecento URL vuote non è strategia: è rumore che Google impara a ignorare — e che brucia fiducia. Io faccio SEO di zona solo dove avete sostanza da dire.",
    sections: [
      {
        heading: "Quando una pagina zona ha senso",
        paragraphs: [
          "Operative davvero lì: annunci attivi o recenti, agenti che la conoscono, qualcosa di specifico (pendolari, lago, centro storico, nuove costruzioni). Altrimenti non la apro.",
          "Meglio otto pagine forti su aree dove chiudete mandati che un elenco di comuni “per completezza”. La completezza da template è doorway con altro nome.",
        ],
      },
      {
        heading: "Cosa ci scrivo (e cosa no)",
        paragraphs: [
          "Paragrafi su tipologie tipiche, fasce di richiesta che vedete voi, scuole/collegamenti utili, come lavorate le visite in quella zona. Poi griglia degli immobili collegati, aggiornata.",
          "Niente Wikipedia riscritta sul comune, niente keyword stuffing, niente blocchi identici con solo il nome città cambiato. Se il testo funziona sostituendo “Udine” con “Pordenone”, va cestinato.",
        ],
      },
      {
        heading: "Interni e tecnici, senza magia nera",
        paragraphs: [
          "Title e H1 chiari, URL leggibile, link dalla navigazione zone o dal footer locale, schede immobile che puntano alla zona madre. Schema LocalBusiness a livello sito, non cento fake store.",
          "Google Business allineato alle zone servite. Recensioni vere. Niente network di domini satellite o PBN: non è il gioco che voglio giocare per i clienti.",
        ],
      },
      {
        heading: "Misura: richieste, non solo impression",
        paragraphs: [
          "Guardo form e WhatsApp dalle pagine zona, tempo sulla pagina, se gli utenti aprono gli annunci collegati. Se una zona non converte in mesi e non avete stock, la fondo o la tolgo.",
          "SEO locale immobiliare è maratona con inventario vero. Chi promette “primo su tutte le città della provincia in 30 giorni” sta vendendo altro.",
        ],
      },
      {
        heading: "Come lo imposto nei progetti",
        paragraphs: [
          "Parto dalla mappa reale di mandati e dalla Chi siamo. Poi scegliamo insieme le zone prioritarie. Scrivo (o edito) testi con l’agente referente — la loro voce batte la mia da sola.",
          "Se vi hanno proposto cento landing comune-clone, scartatele. Se volete un piano etico e sostenibile, ne parliamo: servizio agenzie e poi contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Quante pagine zona posso fare?",
        answer:
          "Quante aree sapete raccontare con annunci o esperienza reale. Spesso 5–15 bastano per un’agenzia provinciale. Oltre, qualità prima di quantità.",
      },
      {
        question: "Le pagine zona cannibalizzano gli annunci?",
        answer:
          "No se ogni URL ha un ruolo: zona = contesto + elenco; scheda = immobile singolo. Title diversi, link reciproci chiari.",
      },
      {
        question: "Meglio blog o pagine di servizio locali?",
        answer:
          "Pagine zona/servizio prima. Il blog serve a domande specifiche (mutuo, ristrutturare prima di vendere) — non a spammare nomi di frazioni.",
      },
      {
        question: "Funziona ancora nel 2026?",
        answer:
          "Sì, se Google trova utilità e stock aggiornato. Le doorway vuote perdono terreno da anni; le pagine utili no.",
      },
    ],
    related: [
      { label: "Siti agenzie immobiliari", href: "/servizi/agenzie-immobiliari" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "crm-routing-form-lead-agenti-immobiliari",
    service: "agenzie-immobiliari",
    title:
      "Form lead e routing agenti: dal sito al CRM senza richieste perse",
    description:
      "Come collego form e WhatsApp del sito agenzia a un routing sensato: immobile di riferimento, zona, agente di competenza — meno “chi prende questo?” in chat di gruppo.",
    date: "2026-06-09",
    keywords: [
      "form lead agenzia immobiliare",
      "routing agenti immobiliari",
      "CRM immobiliare sito",
      "notifiche lead immobili",
      "WhatsApp lead agenzia",
    ],
    intro:
      "Il lead arriva alle 21.30. Finisce in un gruppo WhatsApp da dodici persone. Rispondono in tre — o nessuno. Il problema non è il form: è cosa succede dopo il click.",
    sections: [
      {
        heading: "Cosa deve portare ogni lead (minimo)",
        paragraphs: [
          "Nome, telefono, riferimento immobile o zona, messaggio breve, timestamp. Se viene da una scheda, ID annuncio obbligatorio nel payload — anche nel testo WhatsApp precompilato.",
          "Campo “sono proprietario / sto cercando” salva chiamate inutili. Fascia oraria preferita riduce il ping-pong. Stop ai campi romanzo: più campi, meno invii.",
        ],
      },
      {
        heading: "Routing: regole semplici che reggono",
        paragraphs: [
          "Per scheda → agente o team che gestisce quell’immobile. Per zona senza annuncio → referente territoriale. Fuori orario → coda del mattino con SLA chiaro, non silenzio.",
          "Evito round-robin cieco su tutto il listino: chi non conosce l’immobile brucia la prima impressione. Meglio un backup umano documentato che un algoritmo furbo e opaco.",
        ],
      },
      {
        heading: "CRM, foglio, inbox: scegliete uno e usatelo",
        paragraphs: [
          "Se avete già un CRM immobiliare, il sito deve spingere lì (webhook, email strutturata, integrazione nativa). Se siete piccoli, un foglio + notifiche push ordinate batte cinque canali sparsi.",
          "Duplicare lo stesso lead su email, WhatsApp gruppo e CRM senza id unico è come non tracciare. Un id, uno stato (nuovo / preso in carico / chiuso), un owner.",
        ],
      },
      {
        heading: "WhatsApp e form insieme, non in guerra",
        paragraphs: [
          "WhatsApp per urgenza e buyer già caldi; form per chi vuole lasciare numero senza aprire chat. Entrambi devono creare lo stesso tipo di record con gli stessi campi chiave.",
          "Niente QR generici in vetrina senza riferimento. Niente “scrivici” in bio Instagram scollegato dal tracking. Il sito è l’hub; gli altri canali puntano lì o clonano il payload.",
        ],
      },
      {
        heading: "Cosa imposto io sul sito",
        paragraphs: [
          "Form per scheda e per contatti generali, messaggi precompilati, thank-you con tempi di risposta onesti, eventi analytics sui submit. Il CRM lo configurate voi o il vostro provider: io chiudo il pezzo web pulito.",
          "Se oggi i lead vivono solo nel gruppo di agenzia, possiamo ordinare l’ingresso dal sito. Scrivimi da contatti e guardiamo il flusso reale, non quello da presentazione.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve per forza un CRM costoso?",
        answer:
          "No. Serve un posto unico con owner e stato. Il CRM aiuta quando siete tanti o avete molto volume; sotto, disciplina e notifiche chiare bastano.",
      },
      {
        question: "Risposta entro quanto?",
        answer:
          "Nel residenziale caldo, sotto l’ora in orario lavorativo fa la differenza. Fuori orario: autoresponder con “vi richiamiamo entro…” e rispetto di quella promessa.",
      },
      {
        question: "Come evito che due agenti chiamino lo stesso lead?",
        answer:
          "Assegnazione immediata visibile a tutti (CRM o foglio) e regola: chi è owner parla; gli altri non doppiano. Il sito manda a una sola destinazione primaria.",
      },
      {
        question: "Posso collegare solo WhatsApp Business?",
        answer:
          "Sì come canale, ma loggate riferimento immobile e agente. Senza traccia, tra un mese non sapete cosa ha funzionato sul sito.",
      },
    ],
    related: [
      { label: "Servizio agenzie immobiliari", href: "/servizi/agenzie-immobiliari" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
