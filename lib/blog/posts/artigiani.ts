import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Artigiani — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const artigianiPosts = [
  {
    slug: "preventivo-online-idraulici-elettricisti-qualificare-richieste",
    service: "artigiani",
    title:
      "Preventivo online per idraulici ed elettricisti: meno chiamate a vuoto",
    description:
      "Come imposto un form preventivo sul sito di un artigiano: urgenza, zona, foto e tipologia — così al telefono arrivano solo richieste che puoi gestire.",
    date: "2026-06-15",
    keywords: [
      "preventivo online idraulico",
      "sito elettricista preventivo",
      "form richiesta intervento",
      "qualificare lead artigiani",
      "sito artigiani Friuli",
    ],
    intro:
      "Il cellulare suona mentre sei sotto un lavabo. Dall’altra parte: «quanto costa un idraulico?». Niente comune, niente problema, niente foto. Io progetto siti per artigiani partendo da lì: il preventivo online non chiude il prezzo — toglie le chiamate inutili prima che ti rubino mezz’ora.",
    sections: [
      {
        heading: "Il telefono non è un funnel, è il tuo mestiere",
        paragraphs: [
          "Ogni squillo a vuoto è tempo tolto a un cantiere o a una famiglia in casa. Sul sito metto un percorso corto: tipo di lavoro, urgenza, comune o CAP, spazio per due righe e — se riescono — una foto. Non un questionario da assicurazione.",
          "Il tono deve essere tuo. «Compila e verrai ricontattato» suona da centralino. Preferisco: «Scrivimi cosa serve, ti rispondo con tempi e prossimi passi». Sei tu dietro al link.",
        ],
      },
      {
        heading: "Campi che filtrano senza far scappare",
        paragraphs: [
          "Per idraulici funzionano: scarichi / acqua calda / caldaia / bagno / altro; casa o condominio; quando serve (oggi / settimana / programmato). Per elettricisti: quadro, prese, impianto, guasto, lavori nuovi. L’urgenza vera esce da sola.",
          "Le foto battono dieci frasi vaghe. Upload opzionale, limiti di peso, istruzione secca: «inquadra il problema». Se non possono caricare, il form resta inviabile — non blocco un allagamento per un obbligo tecnico.",
        ],
      },
      {
        heading: "Cosa può dire il sito (e cosa no)",
        paragraphs: [
          "Una FAQ onesta taglia le domande ripetute: zone, orari, se fai notturne, se il sopralluogo è gratis, cosa include. Fasce «a partire da» solo se le aggiorni davvero. Listini inventati per «fare SEO» generano litigi al telefono.",
          "Dopo l’invio: conferma con tempi di risposta reali e via d’uscita per le emergenze (WhatsApp o numero). Chi ha l’acqua in cucina non deve restare a guardare uno spinner.",
        ],
      },
      {
        heading: "Collegalo a come lavori già",
        paragraphs: [
          "Le richieste arrivano dove le apri: email, foglio, notifica sul telefono. Evito pannelli che non userai mai. Se vivi su WhatsApp Business, il form può anticipare la chat con comune, urgenza e allegati già pronti.",
          "Guardo invii, abbandoni a metà e quante richieste diventano sopralluoghi. Troppi abbandoni? Accorcio. Ancora fuori zona? Comune obbligatorio e mappa zone in evidenza prima del form.",
        ],
      },
      {
        heading: "Cosa costruisco io su questi siti",
        paragraphs: [
          "Struttura mobile, copy da persona reale, form a step se serve, conferma e collegamento al tuo canale. Niente «richiedi ora» generici da template edilizia.",
          "Se sei idraulico o elettricista e il sito attuale è solo un numero di telefono su uno sfondo stock, possiamo rifarlo come filtro. Scrivimi da contatti e vediamo il tuo flusso tipico di richieste.",
        ],
      },
    ],
    faq: [
      {
        question: "Il preventivo online sostituisce il sopralluogo?",
        answer:
          "No. Serve a capire se il lavoro è nel tuo raggio, se è urgente e cosa portare. Il prezzo preciso, nella maggior parte dei casi, resta sul posto.",
      },
      {
        question: "Quanti campi prima che la gente molla?",
        answer:
          "Di solito cinque–sette utili bastano. Oltre, spezzo in step (tipo → zona → dettagli). Meglio due schermate chiare che una pagina infinita.",
      },
      {
        question: "Devo pubblicare i prezzi?",
        answer:
          "Solo se sono reali e aggiornabili. Fasce indicative con note vanno bene; inventare listini per ranking no.",
      },
      {
        question: "Ha senso se lavoro da solo?",
        answer:
          "Soprattutto sì: il form ti protegge quando non puoi rispondere al primo squillo. Richiami con i dati già sotto mano.",
      },
    ],
    related: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Contatti", href: "/contatti" },
      { label: "Pagine comuni", href: "/comuni" },
    ],
  },
  {
    slug: "galleria-lavori-prima-dopo-fiducia-artigiani",
    service: "artigiani",
    title:
      "Galleria lavori prima/dopo: fiducia vera, non foto da brochure",
    description:
      "Come organizzo una galleria lavori per artigiani: coppie prima/dopo leggibili, didascalie utili, privacy e zero stock di cantieri americani.",
    date: "2026-06-16",
    keywords: [
      "galleria lavori artigiani",
      "foto prima dopo idraulico",
      "portfolio elettricista sito",
      "fiducia sito artigiani",
      "lavori artigiani online",
    ],
    intro:
      "Chi ti cerca online non ti ha mai visto aprire un quadro o smontare un scarico. Ha solo le tue foto e due righe di testo. Io costruisco gallerie per artigiani per la fiducia, non per il «wow» da agenzia. Prima e dopo, contesto, scatti veri — anche se imperfetti.",
    sections: [
      {
        heading: "Prima/dopo leggibile in tre secondi",
        paragraphs: [
          "Uno slider lento con dieci foto quasi uguali non convince. Preferisco coppie: problema → risultato, stesso angolo se puoi, luce simile. Sotto: «sostituzione scaldabagno, intervento in giornata» — non «soluzione chiavi in mano di eccellenza».",
          "Su mobile le coppie stanno una sotto l’altra, senza zoom forzato. Una foto un po’ soft ma vera batte il cantiere stock con operai sorridenti.",
        ],
      },
      {
        heading: "Ordina per tipo di lavoro, non per anno",
        paragraphs: [
          "Categorie che il cliente cerca: perdite, bagni, caldaie, quadri, impianti nuovi. Chi ha un problema simile trova prove, non un album cronologico. Sei casi forti battono quaranta mediocri.",
          "Dove ha senso, collego la foto alla pagina servizio. La galleria diventa prova sociale di ciò che già usi per la SEO locale.",
        ],
      },
      {
        heading: "Privacy: cosa lasciare fuori dall’inquadratura",
        paragraphs: [
          "Civici leggibili, nomi sul citofono, documenti sul tavolo, volti senza permesso: no. Insegno a scattare già «puliti» o a ritagliare. In condominio spesso basta il dettaglio tecnico senza l’ingresso.",
          "Se il cliente vuole nome e paese, ok — con consenso. Altrimenti «intervento a Udine / Cividale / collina» basta e suona locale senza esporre nessuno.",
        ],
      },
      {
        heading: "Foto + tre segnali che chiudono",
        paragraphs: [
          "Accanto alla galleria: focus del mestiere (senza numeri inventati), zone tipiche, CTA sopralluogo o WhatsApp. La foto apre; il contatto converte.",
          "Dopo il lancio guardo quali categorie aprono di più. Se tutti cliccano «bagni» e nessuno «domotica», ribilancio menu e homepage: il sito segue i lavori che portano richieste.",
        ],
      },
      {
        heading: "Partire senza fotografo",
        paragraphs: [
          "Smartphone a fuoco, luce dalla finestra, prima e dopo. Poi, se serve, un set dedicato. Meglio online con prove vere che aspettare mesi lo shooting perfetto.",
          "Quando lavoro al sito artigiani, seleziono, comprimo e scrivo le didascalie con te. Tu porti i lavori; io li metto in ordine da cliente, non da brochure.",
        ],
      },
    ],
    faq: [
      {
        question: "Non ho foto professionali: posso partire?",
        answer:
          "Sì. Partiamo da scatti ordinati e prima/dopo. Il fotografo, se serve, viene dopo.",
      },
      {
        question: "Quante immagini in homepage?",
        answer:
          "Tre–sei pezzi forti in evidenza; una pagina «Lavori» più ampia. Troppe thumbnail in home rallentano e confondono.",
      },
      {
        question: "Posso usare foto da catalogo fornitori?",
        answer:
          "Solo se dichiari che non sono tuoi interventi. Per la fiducia contano i tuoi lavori; il catalogo sta separato.",
      },
      {
        question: "Il prima/dopo aiuta su Google?",
        answer:
          "Indirettamente: più tempo in pagina, più richieste, didascalie locali. Non è magia SEO — è prova che sei chi dici di essere.",
      },
    ],
    related: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Contatti", href: "/contatti" },
      { label: "Pagine comuni", href: "/comuni" },
    ],
  },
  {
    slug: "zone-servite-comuni-seo-locale-artigiani",
    service: "artigiani",
    title:
      "Zone servite e comuni: SEO locale per artigiani senza spam di keyword",
    description:
      "Come elenco i comuni che servi sul sito senza sembrare un bot: pagine utili, Google Business allineato e coerenza con dove intervieni davvero.",
    date: "2026-06-17",
    keywords: [
      "SEO locale artigiani",
      "zone servite idraulico",
      "sito elettricista comuni",
      "SEO artigiani Udine",
      "pagine locali artigiani",
    ],
    intro:
      "«Idraulico Udine Cividale Tarcento Gemona…» ripetuto in homepage non ti posiziona: ti fa sembrare spam. Io lavoro al contrario. Per artigiani in Friuli e oltre progetto zone servite leggibili da umani e utili a Google: verità operativa prima, keyword dopo.",
    sections: [
      {
        heading: "Parti da dove vai, non da dove vorresti rankare",
        paragraphs: [
          "Se oltre i quaranta minuti di auto non prendi lavori, non invento una landing per ogni comune della regione. Elenco il nucleo (es. Udine e cintura), le zone occasionali e dove non intervieni. Onestà = meno litigi e segnali locali coerenti.",
          "Sul sito diventa pagina «Zone» o sezione con mappa + elenco. I comuni non sono un muro: sono contesti («interventi residenziali a…», «caldaie in…»).",
        ],
      },
      {
        heading: "Pagine locali solo con contenuto vero",
        paragraphs: [
          "Una URL «idraulico a [comune]» ha senso se aggiungi qualcosa di specifico: tempi medi, tipi di intervento tipici lì, foto in zona, note su accessibilità. Copiare la stessa pagina cambiando solo il paese è stuffing — e si vede.",
          "Spesso bastano poche pagine forti (città + due–tre poli) più un elenco degli altri comuni. Tre URL utili battono trenta clone.",
        ],
      },
      {
        heading: "Allinea sito e scheda Google",
        paragraphs: [
          "Google Business, NAP e zone di servizio devono dire la stessa cosa del sito. Scheda a Udine e sito «tutta Italia» confondono algoritmo e cliente.",
          "Categorie, servizi e foto della scheda le collego al messaggio del sito. Le recensioni vere pesano più di qualsiasi paragrafo SEO. Non compro recensioni: ti aiuto a chiederle dopo lavori andati bene, con un link semplice.",
        ],
      },
      {
        heading: "Comuni nel discorso, non a raffica",
        paragraphs: [
          "Nei titoli uso città o zona quando è naturale («Interventi elettrici a Udine e provincia»). Nei paragrafi i comuni compaiono dove raccontano un fatto. Ancore interne a contatti, galleria e servizi — non un loop di pagine gemelle.",
          "Se ti serve contesto geografico serio senza riempire il tuo sito di spam, si può collegare il discorso all’hub comuni: geografia chiara, copy umano.",
        ],
      },
      {
        heading: "Cosa faccio io in pratica",
        paragraphs: [
          "Mappa zone onesta, eventuali landing solo dove hai prova e domanda, testi senza stuffing, coerenza con la scheda. Niente generatori di «200 pagine comuni» da agenzia SEO anni Dieci.",
          "Se il tuo sito elenca mezzo Friuli ma in realtà lavori tre valli, sistemiamo il perimetro e le richieste migliorano — anche prima del ranking.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo fare una pagina per ogni comune?",
        answer:
          "No. Solo dove hai domanda reale e qualcosa di specifico da dire. Altrimenti elenco zone + pagine servizio bastano.",
      },
      {
        question: "Cinquanta comuni in homepage aiutano?",
        answer:
          "Di solito no: peggiorano leggibilità e sembrano stuffing. Homepage pulita, zone in una pagina dedicata.",
      },
      {
        question: "Conta di più il sito o Google Business?",
        answer:
          "Per «vicino a me» la scheda è centrale. Il sito conferma servizi e contatto. Devono dire la stessa cosa.",
      },
      {
        question: "Posso puntare fuori regione?",
        answer:
          "Solo se ci vai davvero e lo spieghi (trasferte, cantieri grandi). Altrimenti rifiuti richieste che non volevi.",
      },
    ],
    related: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Contatti", href: "/contatti" },
      { label: "Pagine comuni", href: "/comuni" },
    ],
  },
  {
    slug: "whatsapp-vs-form-urgenze-artigiani",
    service: "artigiani",
    title:
      "WhatsApp o form sul sito: cosa funziona per le urgenze artigiane",
    description:
      "Allagamento, corto, sera: quando conviene WhatsApp, quando il form, e come li imposto insieme sul sito di un artigiano senza caos.",
    date: "2026-06-18",
    keywords: [
      "WhatsApp sito artigiani",
      "form contatto idraulico",
      "CTA urgenze elettricista",
      "conversione sito artigiani",
      "contatto rapido interventi",
    ],
    intro:
      "Quando perde l’acqua, nessuno vuole otto campi. Quando serve un bagno nuovo, WhatsApp a raffica diventa un archivio disordinato. Io non scelgo un canale per moda: scelgo in base al tipo di richiesta. Sul sito di un artigiano, chat e form spesso convivono — con ruoli chiari.",
    sections: [
      {
        heading: "Urgenza vera: WhatsApp o telefono",
        paragraphs: [
          "Su homepage e pagine «guasto» metto CTA evidenti: WhatsApp urgenze e chiama ora, con orari di reperibilità. Messaggio precompilato («Ciao, urgenza a [comune]: …») riduce i «ciao quanto costi?» senza contesto.",
          "Se di notte non rispondi, lo scrivo. Meglio «reperibile fino alle 20» che un bottone sempre verde che genera rabbia alle due di mattina.",
        ],
      },
      {
        heading: "Lavori programmati: il form ordina meglio",
        paragraphs: [
          "Ristrutturazioni, impianti nuovi, manutenzioni: qui comune, tipologia e foto battono la chat sparsa. Tu ricevi dati strutturati; il cliente non riscrive tutto tre volte. Conferma con tempi di risposta = meno doppi messaggi.",
          "In analytics confronto click WhatsApp, invii form e chiamate. Non esiste un vincitore universale — esiste il mix che porta sopralluoghi buoni per il tuo mestiere.",
        ],
      },
      {
        heading: "Una gerarchia di CTA, non tre bottoni uguali",
        paragraphs: [
          "WhatsApp, form e telefono dello stesso peso confondono. Primaria per contesto: sulle pagine emergenza vince chat/call; su «preventivo bagno» vince form. Secondarie in footer o sticky mobile.",
          "Lo sticky su smartphone aiuta, ma non deve coprire contenuti o banner cookie. Lo testo dopo aver visto come si muove il tuo traffico reale.",
        ],
      },
      {
        heading: "Dietro le quinte: non perdere richieste",
        paragraphs: [
          "WhatsApp Business con etichette (urgente / preventivo / fuori zona) evita il caos. Il form arriva in email o foglio con lo stesso schema. Routine serale di cinque minuti per il triage di entrambi i canali.",
          "Misura qualità, non solo volume: quante chat diventano lavori? Se WhatsApp porta solo listini generici, irrigidisco il precompilato o spingo il form sui non-urgenti.",
        ],
      },
      {
        heading: "Come lo imposto nei progetti artigiani",
        paragraphs: [
          "Mappa dei tipi di richiesta tipici tuoi, CTA diverse per pagina, privacy linkata, niente plugin chat invasivi. Obiettivo: chi ha un’emergenza ti trova in un tap; chi ha un progetto ti lascia dati utili.",
          "Se oggi hai solo un numero in homepage e rispondi a tutto nello stesso thread, possiamo separare i flussi senza complicarti la vita. Ne parliamo da contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usare solo WhatsApp?",
        answer:
          "Sì se il lavoro è quasi tutto urgente e gestisci bene la chat. Per preventivi strutturati consiglio comunque un form leggero.",
      },
      {
        question: "Il form converte meno?",
        answer:
          "Spesso ha meno click — ma richieste più complete. Confronta i lavori chiusi, non solo il volume.",
      },
      {
        question: "WhatsApp e privacy?",
        answer:
          "È un canale del cliente, con regole sue. Sul sito informo sull’uso, linko la privacy e non chiedo dati sensibili inutili in chat.",
      },
      {
        question: "Meglio un numero Business dedicato?",
        answer:
          "Sì, se puoi: separa privato e lavoro, orari chiari, meno messaggi persi sul personale.",
      },
    ],
    related: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Contatti", href: "/contatti" },
      { label: "Pagine comuni", href: "/comuni" },
    ],
  },
  {
    slug: "certificazioni-garanzie-sito-artigiani-cosa-mostrare",
    service: "artigiani",
    title:
      "Certificazioni e garanzie sul sito artigiani: cosa mostrare (senza inventare)",
    description:
      "Come presento abilitazioni, assicurazioni e garanzie sul web: solo fatti verificabili, testi precisi, niente badge scaricati da directory.",
    date: "2026-06-19",
    keywords: [
      "certificazioni sito artigiani",
      "garanzie idraulico online",
      "abilitazioni elettricista sito",
      "assicurazione impresa artigiana",
      "fiducia web artigiani",
    ],
    intro:
      "Un badge «certificato eccellenza 2026» trovato online non costruisce fiducia: la brucia quando il cliente chiede dettagli. Io, sui siti per artigiani, tratto certificazioni e garanzie come fatti. Mostriamo ciò che hai. Non inventiamo sigle per riempire il footer.",
    sections: [
      {
        heading: "Cosa merita spazio in homepage",
        paragraphs: [
          "Abilitazioni e patentini che hai davvero (impianti, gas, FER se pertinenti al tuo lavoro), RC professionale se ce l’hai, iscrizione e requisiti di legge del mestiere, anni di attività solo se veri. Nomi chiari, non icone misteriose.",
          "«Lavori a regola d’arte / secondo normativa vigente» va bene se è il tuo standard — non come slogan vuoto. Se rilasci dichiarazioni di conformità, lo spiego in servizi o FAQ: il cliente sa cosa riceve a fine lavoro.",
        ],
      },
      {
        heading: "Garanzie precise, non teatrali",
        paragraphs: [
          "«Garanzia a vita su tutto» è una trappola. Preferisco: manodopera per X mesi/anni, materiali secondo produttore, esclusioni (manomissioni, usura, terzi). Allineato a ciò che firmi in preventivo.",
          "Estensioni di garanzia dei brand: solo se corrette. Niente file di loghi non autorizzati. Una frase vera batte una riga di marchi decorativi.",
        ],
      },
      {
        heading: "Cosa non metto «per fare bella figura»",
        paragraphs: [
          "Certificazioni scadute, corsi non finiti, numeri di clienti gonfiati, «partner ufficiale» senza accordo, recensioni inventate, claim di sicurezza esagerati. Se non puoi spiegarlo a un cliente pedante, non sta sul sito.",
          "Badge generici tipo «top artigiano» da directory sconosciute: li evito. Sembrano spam e non chiudono richieste serie.",
        ],
      },
      {
        heading: "Layout: fatti compatti, CTA libere",
        paragraphs: [
          "Blocco corto in homepage (tre–cinque punti), dettagli in «Chi sono» o «Garanzie». PDF o scan solo se leggibili e aggiornati, senza dati personali inutili. Su mobile i badge non devono rubare spazio a WhatsApp e form.",
          "Obiettivo: capire che sei in regola e che rispetti gli impegni. Poi poter scriverti. La prova apre la porta; galleria e preventivo chiaro la tengono aperta.",
        ],
      },
      {
        heading: "Come lavoriamo sui tuoi documenti",
        paragraphs: [
          "Mi mandi elenco di ciò che hai (non inventiamo nulla in call). Io lo traduco in microcopy onesto e aggiornabile. Se qualcosa scade, lo togliamo o lo segniamo — niente claim eterni.",
          "Se il sito attuale è pieno di badge generici e zero prove tue, ripuliamo e mettiamo in evidenza solo il verificabile. È più persuasivo di qualunque «certificato» scaricato.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo pubblicare i PDF dei patentini?",
        answer:
          "Non obbligatorio. Spesso basta indicarli e mostrarli a richiesta. Se li pubblichi, occhio a dati personali e scadenze.",
      },
      {
        question: "Posso scrivere «impianti a norma»?",
        answer:
          "Sì se è ciò che fai e rilasci la documentazione prevista. Evita «zero rischi» o promesse che non controlli al cento per cento.",
      },
      {
        question: "L’assicurazione va in evidenza?",
        answer:
          "Sì, soprattutto per lavori in casa di terzi e condomini. Una riga chiara rassicura più di un paragrafo legale illeggibile.",
      },
      {
        question: "Sto ancora facendo un corso: lo anticipo?",
        answer:
          "No come già ottenuto. Al massimo «in formazione su…» se vuoi trasparenza; altrimenti aggiorniamo il sito quando l’hai.",
      },
    ],
    related: [
      { label: "Siti per artigiani", href: "/servizi/artigiani" },
      { label: "Contatti", href: "/contatti" },
      { label: "Pagine comuni", href: "/comuni" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
