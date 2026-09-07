import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Ristoranti — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const ristorantiPosts = [
  {
    slug: "menu-digitale-vs-pdf-ristorante",
    service: "ristoranti",
    title: "Menu digitale o PDF sul sito ristorante? Perché il PDF ti frena",
    description:
      "Aggiornamenti, allergeni, mobile e QR: quando un menu HTML batte il PDF sul sito del ristorante — e quando il PDF resta solo come backup stampa.",
    date: "2026-05-11",
    keywords: [
      "menu digitale ristorante",
      "menu PDF sito ristorante",
      "allergeni menu online",
      "menu mobile ristorante",
      "QR code menu ristorante",
    ],
    intro:
      "Mi arriva spesso lo stesso brief: «il menu ce l’abbiamo già, è un PDF». Capisco. È veloce da caricare e sembra lavoro finito. Poi il cliente apre il telefono, fa pinch-to-zoom sul prezzo del risotto, e chiude. Il PDF sul sito pubblico non è un menu: è un allegato.",
    sections: [
      {
        heading: "Cosa chiede chi apre il menu dal telefono",
        paragraphs: [
          "Vuole scorrere sezioni, leggere prezzi senza girare lo schermo, capire allergeni in due tocchi. Non vuole scaricare un file né aspettare il viewer del browser.",
          "Con il menu in pagina (HTML) il testo è già lì. Ancore per antipasti, primi, vini. Foto leggere solo dove servono. Il PDF obbliga a un’app di lettura: lag, zoom, testo che salta. Su una connessione media in centro o in periferia, quella frizione basta.",
        ],
      },
      {
        heading: "Stagionalità e prezzi: chi aggiorna davvero il PDF?",
        paragraphs: [
          "Finisce il pesce del giorno. Sale il caffè. Cambia il menù del pranzo. Col PDF ogni modifica passa da chi «sa esportare»: giorni di ritardo, versioni vecchie in giro, QR stampati che puntano a un file morto.",
          "Nel menu digitale che imposto io aggiorni una riga e pubblichi. Stagionale, tartufo, offerta pranzo/cena: minuti, non un giro grafico. Se hai più sedi non moltiplichi i PDF: sezioni e filtri.",
        ],
      },
      {
        heading: "Allergeni leggibili, non in legenda microscopica",
        paragraphs: [
          "Gli allergeni non sono un optional grafico. Devono stare vicino al piatto, aggiornati, leggibili. Nel PDF finiscono spesso in fondo o in un carattere da sei punti che sul telefono nessuno apre.",
          "Nel digitale metto badge per piatto, filtri tipo senza glutine o vegano, note sempre visibili. Non sostituisco la sala. Riduco le chiamate «c’è nichel nel pesto?» e dimostri attenzione prima della prenotazione.",
        ],
      },
      {
        heading: "QR in sala: stesso link, due formati diversi",
        paragraphs: [
          "Il QR sul tavolo deve aprire una URL stabile del menu, non un Drive condiviso. Se cambi prezzi aggiorni la pagina; il cartoncino resta valido. Col PDF cambi file e rischi di lasciare in giro QR obsoleti.",
          "Il PDF lo tengo come seconda via: stampa, allegato per un evento aziendale, export offline. Sul sito pubblico la via principale è lo scroll. Stampabile sì — ma non come unica esperienza.",
        ],
      },
      {
        heading: "Come lo imposto nei siti ristorante che costruisco",
        paragraphs: [
          "Parto da sezioni chiare, tipografia grande, bottoni Chiama e Prenota vicini al menu. Foto solo dove aggiungono fiducia, non un catalogo da cento megabyte.",
          "Lavoro da Udine con ristoranti in Friuli e fuori: il menu digitale è pezzo del servizio sito ristorante, non un plugin gonfio. Se ti riconosci nel PDF che nessuno aggiorna, partiamo da lì.",
        ],
      },
    ],
    faq: [
      {
        question: "Il PDF sul sito ristorante è sempre sbagliato?",
        answer:
          "No come backup stampa o allegato. Sì come unica via sul mobile: zoom, aggiornamenti lenti, allergeni nascosti. Meglio HTML in pagina e PDF opzionale.",
      },
      {
        question: "Posso tenere menu del giorno e carta fissa insieme?",
        answer:
          "Sì. Una sezione «oggi» aggiornata spesso e una carta stagionale più stabile. Eviti due PDF e due QR confusi.",
      },
      {
        question: "Serve un’app per il menu digitale?",
        answer:
          "Quasi mai. Una pagina veloce sul sito basta. Le app aggiungono store, login e abbandono. Il cliente vuole leggere e prenotare.",
      },
      {
        question: "Come gestisco i prezzi che cambiano spesso?",
        answer:
          "Campi editabili sul CMS o una sezione dedicata. Pubblichi in minuti. Col PDF ogni variazione è un nuovo file e un rischio di versioni parallele.",
      },
    ],
    related: [
      { label: "Siti per ristoranti", href: "/servizi/ristoranti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "prenotazioni-ristorante-form-thefork-whatsapp",
    service: "ristoranti",
    title: "Prenotazioni ristorante: form sul sito, TheFork o solo WhatsApp?",
    description:
      "Confronto pratico tra form sul sito, TheFork e WhatsApp: commissioni, no-show, controllo dei dati e come combinarli senza perdere tavoli.",
    date: "2026-05-12",
    keywords: [
      "prenotazioni ristorante online",
      "form prenotazione ristorante",
      "TheFork ristorante",
      "prenotazione WhatsApp ristorante",
      "sito ristorante prenota",
    ],
    intro:
      "Sabato sera. Tre canali aperti: messaggi WhatsApp senza ora, una notifica TheFork, una chiamata persa. La sala chiede chiarezza; tu hai tre liste incomplete. La domanda non è «quale strumento è di moda». È chi tiene il calendario e chi paga il tavolo.",
    sections: [
      {
        heading: "WhatsApp: comodo per te, fragile per i numeri",
        paragraphs: [
          "Rispondi al volo, chiarisci allergie, senti il tono del cliente. Funziona finché i messaggi sono pochi. Poi perdi orari, dimentichi di confermare, nessuno ha un reminder automatico.",
          "Uso WhatsApp come canale umano, non come database. «Scrivici» sì — ma con un form o un tool che registra data, ora, coperti. Altrimenti il sabato diventa un gruppo di chat aperte.",
        ],
      },
      {
        heading: "TheFork e portali: visibilità vs commissione",
        paragraphs: [
          "I portali portano gente che non ti conosce. Utile in città competitive o in bassa stagione. Il costo è commissione, recensioni legate alla piattaforma, e clienti che tornano sul portale invece che sul tuo sito.",
          "Non li demonizzo. Li tratto come un canale a pagamento. Se il margine del tavolo regge e riempi sedie vuote, ok. Se sei già pieno di locali e paghi per chi ti avrebbe trovato su Google, rivedi il mix.",
        ],
      },
      {
        heading: "Form sul sito: i tuoi dati, la tua URL",
        paragraphs: [
          "Nome, telefono, data, ora, coperti, note. Conferma automatica. Lista in un foglio o nel gestionale. Nessuna commissione per prenotazione. L’URL resta sul tuo dominio: fiducia e brand.",
          "Il form non «acquisisce» da solo. Lavora se il sito è trovato e chiaro. Ma quando qualcuno arriva da Google Maps o da un articolo, avere Prenota qui evita di mandarlo altrove a pagare una piattaforma.",
        ],
      },
      {
        heading: "No-show: policy e reminder, non solo speranza",
        paragraphs: [
          "Nessun canale elimina chi non si presenta. Riduci il danno con conferma (SMS o email), deposito su tavoli grandi, e una frase chiara sul tempo di attesa del tavolo.",
          "WhatsApp senza conferma strutturata è il peggiore per i no-show: «ok» in chat non è un record. Form o portale con reminder battono il messaggio sparso.",
        ],
      },
      {
        heading: "Il mix che consiglio ai ristoranti che seguo",
        paragraphs: [
          "Sito con form o widget di prenotazione come canale principale. WhatsApp per chiarimenti e walk-in urgenti. Portale solo se ti serve domanda extra e hai calcolato la commissione.",
          "Quando progetto il sito ristorante collego la CTA Prenota al flusso che scegli tu — non a tre bottoni che si contraddicono. Un calendario solo. Il resto è rumore in sala.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usare solo WhatsApp per le prenotazioni?",
        answer:
          "Sì se i volumi sono bassi e rispondi sempre. Oltre una certa soglia perdi traccia e reminder. Meglio un form che scrive su un foglio o un gestionale, WhatsApp come supporto.",
      },
      {
        question: "TheFork conviene sempre?",
        answer:
          "No. Conviene se riempie posti che resterebbero vuoti e il margine regge la commissione. Se sei già saturo di clientela diretta, spesso no.",
      },
      {
        question: "Il form sul sito sostituisce il telefono?",
        answer:
          "No. Il telefono resta per gruppi, eventi, chiarimenti. Il form toglie carico alle richieste semplici: due, quattro, sei coperti in orario standard.",
      },
      {
        question: "Come riduco i no-show senza deposito?",
        answer:
          "Conferma automatica, reminder il giorno prima, policy chiara sul ritardo. Per tavoli grandi il deposito resta lo strumento più efficace.",
      },
    ],
    related: [
      { label: "Servizio siti ristorante", href: "/servizi/ristoranti" },
      { label: "Parliamone", href: "/contatti" },
      { label: "Lavori", href: "/portfolio" },
    ],
  },
  {
    slug: "foto-food-fiducia-sito-ristorante",
    service: "ristoranti",
    title: "Foto food sul sito ristorante: quali costruiscono fiducia (e quali no)",
    description:
      "Hero, piatti, sala e team: quali scatti servono sul sito di un ristorante, come pesano su mobile e perché stock e filtri pesanti allontanano chi prenota.",
    date: "2026-05-13",
    keywords: [
      "foto ristorante sito",
      "fotografia food web",
      "immagini menu online",
      "sito ristorante fiducia",
      "foto piatti ristorante",
    ],
    intro:
      "Ho aperto siti di ristoranti con hero da brochure e, sotto, tre scatti di piatti con flash da cellulare del 2014. L’effetto è stridente. La foto sul web non è «abbellire». È la prova che il posto esiste come lo descrivi.",
    sections: [
      {
        heading: "Una hero che assomiglia alla sera, non a un catalogo",
        paragraphs: [
          "Luce vera della sala, un tavolo apparecchiato, un dettaglio di servizio. Meglio di un collage di sei piatti con ombre diverse. Chi arriva da Maps vuole capire l’atmosfera in un secondo.",
          "Evito overlay di badge e sticker sulla foto. Il testo sta sotto o a lato in modo leggibile. La foto lavora; non la soffoco con promo.",
        ],
      },
      {
        heading: "Piatti: pochi scatti coerenti battono il dump di gallery",
        paragraphs: [
          "Sei–dodici foto forti per il lancio. Stesso stile di luce, stesso piatto bianco o stesso fondo. Se ogni foto ha un filtro diverso, sembra un aggregatore, non la tua cucina.",
          "Sul menu digitale non serve una foto per ogni riga. Bastano i signature e i piatti che la gente cerca. Il resto è peso e LCP che sale senza bisogno.",
        ],
      },
      {
        heading: "Stock e filtri: la fiducia si spezza in silenzio",
        paragraphs: [
          "Il cliente entra e vede un’altra sala. Oppure un piatto che non è nel menu. Quella distanza costa più di una foto «imperfetta» ma vera.",
          "Preferisco uno scatto amatoriale nitido e onesto a uno stock da banco. Se budgeti un set professionale, fallo una volta bene: sala, tre–quattro piatti, un ritratto dello chef o del team.",
        ],
      },
      {
        heading: "Peso file: mobile e Wi‑Fi del cliente",
        paragraphs: [
          "Esporto WebP o JPEG compressi, dimensioni responsive, lazy-load sotto la piega. Una gallery da quaranta megabyte su 4G fuori città chiude la scheda prima del menu.",
          "Alt text utili («tagliatelle al ragù di cinghiale») aiutano accessibilità e ricerca immagini. Non keyword stuffing: descrizione di ciò che si vede.",
        ],
      },
      {
        heading: "Cosa chiedo in brief prima di mettere online",
        paragraphs: [
          "Hero sala o location. Quattro–otto piatti coerenti. Eventuale esterno o dettaglio territorio se conta per il locale. Logo e colori leggibili sulle foto scure.",
          "Se le foto definitive arrivano dopo, pubblico con poche immagini oneste e aggiorno. Meglio un sito vero oggi che una griglia vuota «in attesa del fotografo».",
        ],
      },
    ],
    faq: [
      {
        question: "Serve per forza un fotografo food professionista?",
        answer:
          "Aiuta, non è obbligatorio al day one. Contano coerenza, luce e onestà. Un set pro ha senso quando hai già menu e sala stabili.",
      },
      {
        question: "Quante foto metto in homepage?",
        answer:
          "Una hero forte e poche prove sotto. La gallery lunga sta in una pagina dedicata o nel menu. Homepage affollata di thumbnail rallenta e confonde.",
      },
      {
        question: "Posso usare le storie Instagram sul sito?",
        answer:
          "Come teaser sì, come unica prova no. Stories spariscono e pesano. Sul sito servono file ottimizzati e permanenti.",
      },
      {
        question: "Le foto del menu devono coincidere col piatto servito?",
        answer:
          "Sì, il più possibile. Uno scatto «da rivista» lontano dal piatto reale genera delusione in sala e recensioni amare.",
      },
    ],
    related: [
      { label: "Siti ristorante", href: "/servizi/ristoranti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "seo-ristorante-citta-senza-trucchi",
    service: "ristoranti",
    title: "SEO ristorante in città: ranking locale senza trucchi",
    description:
      "Google Business Profile, pagine locali, menu indicizzabile e recensioni: la SEO pratica per farsi trovare per «ristorante + città» senza schemi o keyword stuffing.",
    date: "2026-05-14",
    keywords: [
      "SEO ristorante",
      "ristorante SEO locale",
      "Google Business Profile ristorante",
      "posizionamento ristorante città",
      "sito ristorante SEO",
    ],
    intro:
      "«Ristorante Udine» o «osteria [tua città]» non si compra con un articolo magico. Si costruisce con scheda Google a posto, sito che conferma nome indirizzo telefono, menu leggibile dai crawler e recensioni vere. Il resto è rumore.",
    sections: [
      {
        heading: "Prima la scheda Google, poi il blog",
        paragraphs: [
          "Categoria corretta, orari aggiornati, foto recenti, link al sito (non a un PDF orfano), attributi (terrazza, senza glutine, prenotazione). Chi cerca «vicino a me» guarda la mappa prima dei risultati blu.",
          "Se la scheda è incompleta o ha orari sbagliati, il sito perfetto arriva secondo. Allineo sempre NAP (nome, indirizzo, telefono) tra scheda, footer e contatti.",
        ],
      },
      {
        heading: "Pagine che rispondono a intenti veri",
        paragraphs: [
          "Homepage chiara: che cucina sei, dove sei, come prenoti. Menu in HTML. Contatti con mappa. Eventuale pagina eventi o pranzo aziende se è un canale reale — non dieci landing clone «miglior ristorante X».",
          "Keyword stuffing nel title («ristorante Udine ristorante centro Udine…») non aiuta. Un title onesto con città e tipo di cucina sì. H1 allineato a ciò che offri.",
        ],
      },
      {
        heading: "Menu indicizzabile: testo, non solo immagini",
        paragraphs: [
          "Se i piatti esistono solo come foto o PDF, Google legge poco. Testo di sezioni e piatti chiave dà segnali su cosa servi. Non serve copiare tutto il menu in un articolo SEO.",
          "Schema LocalBusiness / Restaurant dove ha senso, senza inventare stelle. Dati strutturati coerenti col sito, non markup fantasma.",
        ],
      },
      {
        heading: "Recensioni e menzioni: segnale locale, non campagna fake",
        paragraphs: [
          "Chiedi recensioni dopo un’esperienza buona, con link diretto alla scheda. Non comprare pacchetti. Google le annusa; i clienti pure.",
          "Citazioni su guide locali, eventi, collaborazioni con produttori: link naturali. Un pezzo sul blog ha senso se racconti qualcosa di utile (menu stagionale, allergeni, eventi) — non se ripeti «siamo i migliori» in cinque varianti.",
        ],
      },
      {
        heading: "Cosa faccio io sul sito (e cosa non prometto)",
        paragraphs: [
          "Tecnica pulita, mobile veloce, contenuti chiari, CTA Prenota, allineamento con la scheda. Monitoro Search Console e query locali. Non vendo «primo posto garantito in sette giorni».",
          "Se il locale è nuovo, i tempi sono quelli della fiducia e delle foto vere. Se sei già noto offline e invisibile online, di solito manca coerenza tra scheda e sito — e si sistema.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve un blog per la SEO del ristorante?",
        answer:
          "Solo se hai qualcosa da dire di utile e lo aggiorni. Meglio tre pagine solide (home, menu, contatti) che venti post vuoti. Il blog aiuta su intenti specifici, non sostituisce la scheda Google.",
      },
      {
        question: "Meglio puntare a «ristorante» o a nicchie tipo «pesce» o «pizza»?",
        answer:
          "Alla nicchia vera più la città. «Ristorante» da solo è generico. «Trattoria pesce [città]» o il tuo posizionamento reale convertono meglio.",
      },
      {
        question: "Le ads sostituiscono la SEO locale?",
        answer:
          "No. Le ads riempiono mentre lavori organico o su picchi. La scheda e il sito restano asset tuoi quando spegni il budget.",
      },
      {
        question: "Quanto tempo prima di vedere risultati locali?",
        answer:
          "Dipende da concorrenza e storico. Scheda e NAP a posto danno segnale in settimane; ranking competitivo può richiedere mesi di coerenza, non un trucco.",
      },
    ],
    related: [
      { label: "Siti per ristoranti", href: "/servizi/ristoranti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "landing-eventi-privati-tavolate-ristorante",
    service: "ristoranti",
    title: "Landing eventi privati e tavolate: perché una pagina dedicata converte",
    description:
      "Compleanni, cene aziendali, tavolate: come strutturare una landing sul sito del ristorante con capacita, menu, preventivo e CTA — senza affogare tutto in homepage.",
    date: "2026-05-15",
    keywords: [
      "eventi privati ristorante",
      "tavolate ristorante sito",
      "cena aziendale ristorante",
      "landing page ristorante",
      "prenotazione sala ristorante",
    ],
    intro:
      "In homepage parli di cucina quotidiana. Chi cerca una sala per trenta colleghi o un compleanno a menù fisso ha un’altra domanda. Se la risposta è sepolta in un PDF o in un «ci scriva», perdi richieste che avresti chiuso con una pagina chiara.",
    sections: [
      {
        heading: "Un intento, una pagina",
        paragraphs: [
          "Titolo esplicito: eventi privati, tavolate, cene aziendali. Capienza massima, sale o zone, orari possibili. Una frase su cosa non fate (es. no musica ad alto volume dopo le 23) evita call inutili.",
          "Homepage resta per chi prenota stasera. La landing eventi è per chi pianifica tra due e otto settimane. Due pubblici, due porte.",
        ],
      },
      {
        heading: "Cosa mettere sopra la piega (e cosa lasciare sotto)",
        paragraphs: [
          "Sopra: proposta in una riga, capienza, bottone Richiedi preventivo o Chiama. Subito sotto: tre formule tipo menù fisso / menu degustazione / buffet se le offri davvero.",
          "Sotto: galleria breve della sala, FAQ su acconto e cancellazione, form con data preferita e numero ospiti. Niente muri di testo romantico. Chi organizza vuole numeri.",
        ],
      },
      {
        heading: "Preventivo: campi che la sala sa usare",
        paragraphs: [
          "Data, fascia oraria, coperti, tipo evento, allergie note, telefono. Opzionale budget indicativo. Conferma automatica: «ti richiamiamo entro X». Poi rispondi tu — il form non chiude il contratto.",
          "Esporto le richieste in un foglio o le mando in email alla sala. Evito WhatsApp come unico ingresso: le tavolate grandi spariscono tra i messaggi del sabato.",
        ],
      },
      {
        heading: "Prove sociali mirate, non generiche",
        paragraphs: [
          "Una foto della sala allestita, una citazione di un evento aziendale o di un compleanno (con permesso). Meglio di dieci stelline generiche copiate da Google.",
          "Se fai matrimoni o cerimonie in modo serio, valuta una sottopagina o un link al servizio dedicato. Non mischiare tre business in un paragrafo solo.",
        ],
      },
      {
        heading: "Come la collego al resto del sito",
        paragraphs: [
          "Dal menu: Eventi / Tavolate. Dalla scheda Google, post con link diretto. Dal footer. CTA in homepage solo se gli eventi sono un pilastro, non un’etichetta decorativa.",
          "Nei progetti ristorante che seguo la landing eventi è spesso il pezzo che ripaga il sito oltre il «prenota un tavolo». Se hai sala e cucina per gruppi, merita una URL propria — non un PDF da inoltrare.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio un form o «chiama per eventi»?",
        answer:
          "Entrambi. Il form filtra data e coperti; il telefono chiude i dettagli. Solo telefono perde chi scrive la sera; solo form senza richiamo perde chi vuole parlare con la sala.",
      },
      {
        question: "Devo pubblicare i prezzi degli eventi online?",
        answer:
          "Range o «da» aiuta a filtrare. Listino fisso per ogni formula se i costi sono stabili. Evita «prezzi a richiesta» senza nessun ordine di grandezza se puoi.",
      },
      {
        question: "La landing eventi sostituisce la homepage?",
        answer:
          "No. Serve un ingresso dedicato. La homepage resta per il servizio quotidiano e la SEO brand/città.",
      },
      {
        question: "Serve un dominio separato per gli eventi?",
        answer:
          "Quasi mai. Una pagina sul dominio del ristorante basta e rafforza il brand. Dominio a parte solo se hai un format eventi con nome proprio e marketing distinto.",
      },
    ],
    related: [
      { label: "Siti ristorante", href: "/servizi/ristoranti" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
