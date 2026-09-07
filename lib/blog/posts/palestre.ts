import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Palestre — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const palestrePosts = [
  {
    slug: "orari-corsi-prova-gratis-meno-caos-whatsapp",
    service: "palestre",
    title:
      "Orari corsi e prova gratis: come togliere caos WhatsApp dalla palestra",
    description:
      "Calendario corsi aggiornato e form per la prova gratis sul sito: meno messaggi ripetuti in reception, più richieste ordinate. Cosa metto online e cosa lascio in chat.",
    date: "2026-07-05",
    keywords: [
      "orari corsi palestra",
      "prova gratis palestra online",
      "calendario lezioni fitness",
      "prenotazione corso palestra",
      "sito web palestra",
    ],
    intro:
      "Alle 18:40 il telefono della reception vibra ancora: «A che ora è lo spinning?», «Posso fare una prova?», «C’è posto giovedì?». Non è che WhatsApp sia sbagliato. È che il sito non risponde a niente di utile — e io, quando rifaccio il sito di una palestra, parto da lì.",
    sections: [
      {
        heading: "Perché la gente scrive invece di guardare il sito",
        paragraphs: [
          "Se gli orari vivono su un PDF del 2023, su una Story e su un foglio stampato in bacheca, nessuno si fida. Il socio nuovo apre WhatsApp perché è l’unico posto dove qualcuno risponde in tempo reale.",
          "Ogni messaggio uguale dieci volte al giorno è tempo tolto a chi è già in sala. Io non spegno la chat: tolgo dal telefono le domande che una pagina chiara dovrebbe già chiudere.",
        ],
      },
      {
        heading: "Una sola fonte per il calendario corsi",
        paragraphs: [
          "Giorno, fascia, disciplina, trainer, livello se serve. Aggiornabile senza rifare il sito. Non serve un gestionale da catena americana: serve una tabella viva che reception e soci possano citare.",
          "Sul telefono deve restare leggibile. Filtri semplici (giorno, corso) e ancore per giorno battono un’immagine del planner scattata di sbieco. Se un corso è pieno, meglio dirlo online che rispondere «purtroppo no» dopo tre messaggi.",
        ],
      },
      {
        heading: "La prova gratis come percorso, non come messaggio libero",
        paragraphs: [
          "«Vorrei fare una prova» in chat arriva senza contesto: esperienza, orario, obiettivo, eventuali limiti. Tu perdi tempo a chiedere. Io metto un form corto: nome, contatto, corso, fascia preferita, nota opzionale.",
          "Nel copy dico cosa include la prova, quanto dura, se servono scarpe o abbigliamento, se c’è limite di posti. Meno sorprese in reception, meno no-show, meno discussioni sul «ma online non c’era scritto».",
        ],
      },
      {
        heading: "WhatsApp come secondo canale, non come ingresso unico",
        paragraphs: [
          "La chat resta per soci, urgenze, cambi last minute. Il sito diventa l’ingresso pubblico per orari e trial. Così smette di essere un call center e torna supporto.",
          "Dove serve, aggiungo una conferma automatica: «prova ricevuta, ti richiamiamo entro X ore». Il potenziale cliente non resta nel limbo — e tu non dipendi da chi ha il telefono in tasca mentre fa lo spot.",
        ],
      },
      {
        heading: "Cosa controllo dopo il go-live",
        paragraphs: [
          "Non mi basta «visite alla pagina corsi». Guardo quante prove complete arrivano, da quali lezioni partono, e se reception conferma che i messaggi ripetuti sono calati.",
          "Allineo anche Google Business agli stessi orari: se Maps dice una cosa e il sito un’altra, WhatsApp riparte. Per palestre in città o in provincia è quasi sempre lo stesso schema.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo collegare il gestionale che uso già?",
        answer:
          "Se ce l’hai, partiamo da embed, sync o link diretto. Se no, calendario chiaro + form trial riducono già il caos senza obbligarti a un software pesante dal giorno uno.",
      },
      {
        question: "La prova gratis va sempre in evidenza?",
        answer:
          "Sì se hai posti e staff per gestirla. Se sei pieno, meglio lista d’attesa o «prossima data». Non forzo CTA che reception non riesce a onorare.",
      },
      {
        question: "Gli orari devono stare in homepage?",
        answer:
          "Un assaggio sì (oggi / questa settimana); il dettaglio in pagina dedicata. Troppa densità in home confonde; zero orari spinge tutti su WhatsApp.",
      },
      {
        question: "In quanto tempo si mette online?",
        answer:
          "Con lista corsi e orari già chiari, spesso pochi giorni di lavoro mirato. Il collo di bottiglia è il materiale aggiornato, non il codice.",
      },
    ],
    related: [
      { label: "Siti per palestre", href: "/servizi/palestre" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "pagine-trainer-palestra-vendono-competenza",
    service: "palestre",
    title: "Pagine trainer in palestra: come vendere competenza (non solo selfie)",
    description:
      "Schede trainer che spiegano metodo, specializzazioni e per chi lavorano — così il nuovo socio sceglie il coach giusto e la palestra sembra staff serio, non solo attrezzi.",
    date: "2026-07-06",
    keywords: [
      "pagina trainer palestra",
      "scheda personal trainer sito",
      "staff palestra online",
      "sito web fitness coach",
      "presentazione trainer palestra",
    ],
    intro:
      "Un muro di foto con nome e «PT certificato» non convince nessuno che sta decidendo se firmare. Chi entra in prova vuole capire chi lo seguirà. Io uso le pagine trainer come prova di competenza — non come Instagram stampato.",
    sections: [
      {
        heading: "Cosa compra il socio quando sceglie un trainer",
        paragraphs: [
          "Non compra solo un orario. Compra metodo, sicurezza e la sensazione di non essere un numero. Se sul sito tutti i coach sono uguali, in sala vincono solo chi urla di più o chi ha più follower.",
          "Una scheda utile risponde a tre cose: per chi lavori (principianti, recovery, performance), cosa fai davvero (forza, mobilità, dimagrimento assistito), come lavori (sedute 1:1, piccoli gruppi, follow-up).",
        ],
      },
      {
        heading: "Struttura che uso per ogni profilo",
        paragraphs: [
          "Foto reale in contesto palestra, non ritocco da studio. Due-tre righe di bio senza curriculum da LinkedIn. Specializzazioni in elenco corto. Una frase su come prenotare o chiedere un intro.",
          "Se ha corsi fissi, li collego alla pagina orari. Se fa solo personal, metto una CTA «richiedi colloquio» con campi che filtrano (obiettivo, esperienza, fasce orarie).",
        ],
      },
      {
        heading: "Errori che vedo spesso",
        paragraphs: [
          "Curriculum kilometrico, certificati illegibili, zero indicazioni su per chi non è adatto. Oppure solo Stories embeddate che spariscono. Il sito deve restare leggibile tra sei mesi.",
          "Anche il tono conta: «trasformo il tuo corpo in 30 giorni» suona da infoproduttore. Preferisco «lavoriamo su forza e abitudini, con piani realistici» — vende di più a chi paga un abbonamento serio.",
        ],
      },
      {
        heading: "Staff come segnale di qualità della palestra",
        paragraphs: [
          "Quando lo staff è presentato bene, la struttura sembra organizzata anche se i macchinari non sono di ultima generazione. È un vantaggio competitivo contro le catene che mostrano solo open space vuoti.",
          "Per team piccoli bastano quattro-sei schede forti. Meglio poche e aggiornate che venti profili di chi non lavora più lì da un anno.",
        ],
      },
      {
        heading: "Come lo integro nel sito che costruisco",
        paragraphs: [
          "Pagina Staff o Trainer, card in homepage se lo staff è un pilastro del brand, link dai corsi agli istruttori. Mobile first: chi cerca un PT lo fa spesso la sera dal telefono.",
          "Se gestisci una palestra e i tuoi coach sono bravi ma invisibili online, possiamo sistemarlo senza rifare tutto il brand. Scrivimi e vediamo cosa avete già di materiale.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve una pagina per ogni trainer?",
        answer:
          "Sì se fanno personal o corsi distintivi. Per istruttori di gruppo che ruotano, a volte basta una scheda breve nella pagina corso.",
      },
      {
        question: "Che foto funzionano?",
        answer:
          "In sala, luce naturale o ambient, vestiti da lavoro reali. Evitate stock e pose da catalogo abbigliamento fitness.",
      },
      {
        question: "Posso linkare Instagram del trainer?",
        answer:
          "Come extra sì. Non come unico contenuto: le Stories scadono e il sito deve reggersi da solo.",
      },
      {
        question: "Quanto testo serve?",
        answer:
          "Centoventi-centottanta parole bastano. Più lungo solo se c’è un metodo davvero specifico da spiegare.",
      },
    ],
    related: [
      { label: "Servizio siti palestre", href: "/servizi/palestre" },
      { label: "Parliamone", href: "/contatti" },
    ],
  },
  {
    slug: "abbonamenti-palestra-prezzi-chiari-senza-sembra-cheap",
    service: "palestre",
    title:
      "Abbonamenti palestra online: prezzi chiari senza sembrare cheap",
    description:
      "Come mostrare mensili, trimestrali e pacchetti sul sito senza sembrare discount — e senza nascondere tutto dietro «scrivici per info». Trasparenza che filtra, non che svaluta.",
    date: "2026-07-07",
    keywords: [
      "prezzi abbonamento palestra",
      "listino palestra sito",
      "pacchetti palestra online",
      "costo mensile palestra",
      "sito web prezzi fitness",
    ],
    intro:
      "Nascondere i prezzi «per non sembrare economici» spesso fa l’opposto: sembra opaco. Mostrare solo «da €X» senza contesto sembra discount. Io cerco il punto di mezzo: chiarezza che seleziona, non che sconta.",
    sections: [
      {
        heading: "Cosa deve capire chi confronta tre palestre",
        paragraphs: [
          "Cosa include (sala, corsi, docce, armadietto, PT base), durata, vincoli di disdetta, costi di iscrizione. Se queste risposte vivono solo in reception, perdi chi confronta di sera dal divano.",
          "Non serve pubblicare ogni eccezione legale. Serve abbastanza perché una persona seria capisca se è nella tua fascia — e se no, non ti occupi mezz’ora di tour inutile.",
        ],
      },
      {
        heading: "Come presento i piani senza look da volantino",
        paragraphs: [
          "Tre colonne max: mensile, trimestrale/semestrale, annuale o student. Nomi umani («Full access», «Solo sala»), non «Gold Platinum Ultra». Una riga su cosa è incluso, una su cosa non lo è.",
          "Evito badge «più scelto!!» lampeggianti e countdown falsi. Se un piano è davvero il più richiesto, lo dico in una frase sobria. Il design resta da club, non da ecommerce di cuffie.",
        ],
      },
      {
        heading: "«A partire da» e i personal: quando ha senso",
        paragraphs: [
          "Per i PT, fasce orarie o «da €X / seduta» funzionano meglio di un listino chiuso se i pacchetti variano. Per gli abbonamenti sala, un numero chiaro batte il mistero.",
          "Se hai promo stagionali, le metto in un blocco datato («valida fino al…»), non mescolate al listino evergreen. Così non sembri sempre in saldo.",
        ],
      },
      {
        heading: "CTA dopo il prezzo: prova, tour, call",
        paragraphs: [
          "Il prezzo da solo non chiude. Accanto metto «prenota una prova» o «fissa un giro in palestra» con form breve. Chi è pronto avanza; chi è solo a caccia del più basso raramente completa i campi utili.",
          "In thank-you page: tempi di risposta veri. «Ti richiamiamo entro un giorno lavorativo» batte un generico grazie.",
        ],
      },
      {
        heading: "Allineamento con reception e Google",
        paragraphs: [
          "Se sul sito c’è un prezzo e in chat ne citano un altro, brucia fiducia in un secondo. Prima di pubblicare, congeliamo il listino con chi decide.",
          "Quando progetto siti per palestre, la pagina abbonamenti è spesso quella che taglia i lead sbagliati e alza la qualità delle prove. Se vuoi rivedere la tua, partiamo da come spiegate i piani oggi.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo mostrare proprio tutti i prezzi?",
        answer:
          "Almeno i piani principali e le fasce PT. Pacchetti enterprise o corporate possono restare «su richiesta».",
      },
      {
        question: "I prezzi online non ci fanno sembrare economici?",
        answer:
          "No, se il resto del sito parla di metodo, staff e spazio. Opacità totale sembra più «abbiamo qualcosa da nascondere».",
      },
      {
        question: "Come gestisco le promo senza sembrare always-on sale?",
        answer:
          "Blocco dedicato, date chiare, ritorno al listino standard. Niente prezzo barrato permanente.",
      },
      {
        question: "Meglio tabella o card?",
        answer:
          "Card su mobile, confronto a colonne su desktop. L’importante è scansionabile in dieci secondi.",
      },
    ],
    related: [
      { label: "Siti palestre", href: "/servizi/palestre" },
      { label: "Richiedi valutazione", href: "/contatti" },
    ],
  },
  {
    slug: "gallery-palestra-foto-atmosfera-non-stock",
    service: "palestre",
    title: "Gallery palestra: foto di atmosfera, non stock da catalogo",
    description:
      "Come scegliere e ordinare le foto del sito palestra: luce reale, persone vere, spogliatoi e zona corsi — così chi non è ancora entrato capisce se è il posto giusto.",
    date: "2026-07-08",
    keywords: [
      "foto palestra sito web",
      "gallery palestra",
      "immagini fitness centro",
      "fotografie palestra marketing",
      "sito web palestra visual",
    ],
    intro:
      "Lo stock del bodybuilder sudato sotto neon viola non racconta la tua sala. Chi sta per iscriversi vuole capire se si sentirà a posto. Io tratto la gallery come visita anticipata — non come wallpaper.",
    sections: [
      {
        heading: "Cosa deve «vedere» chi non ha ancora varcato la porta",
        paragraphs: [
          "Ampiezza della sala, tipo di attrezzi, luce, pulizia percepita, se c’è affollamento o respiro, come sono spogliatoi e docce. Sono le domande silenziose di chi ha già avuto esperienze brutte altrove.",
          "Una hero onesta batte dieci foto glam. Se lo spazio è compatto, non fingiamo un hangar: mostriamo cura e ordine.",
        ],
      },
      {
        heading: "Persone vere, consenso, niente posa da catalogo",
        paragraphs: [
          "Soci e trainer in movimento, con consenso scritto. Mix di età e livelli se li avete: segnala inclusività senza slogan. Evitate solo addominali da contest se il vostro pubblico è altro.",
          "Se in quel momento non potete fotografare persone, meglio ambient vuoti e dettagli (rack, zona stretching, ingresso) che volti stock. Il falso si sente.",
        ],
      },
      {
        heading: "Ordine della gallery: una storia, non un dump",
        paragraphs: [
          "Apro con ingresso o open space, poi zona pesi, corsi, cardio, spogliatoi, eventualmente area relax. Chi scrolla capisce il percorso fisico della palestra.",
          "Sei-dodici scatti forti per il lancio bastano. Poi si aggiorna. Meglio poche immagini leggere e nitide che una cartella da trecento file non compressi.",
        ],
      },
      {
        heading: "Tecnica che conta sul telefono",
        paragraphs: [
          "Orizzontali per hero, qualche verticale per mobile, file ottimizzati. Niente watermark enormi del fotografo a metà manubrio. Didascalie corte solo se aggiungono («Sala corsi — 80 mq», «Zona free weight»).",
          "Video silenzioso di 10–15 secondi in looping può aiutare più di un carosello infinito — se non pesa e non autoplaya con audio.",
        ],
      },
      {
        heading: "Come lo uso nei progetti palestra",
        paragraphs: [
          "Selezione, ritagli, compressione, sequenza, eventuale brief per un fotografo locale. Non serve un set da rivista: serve coerenza con orari, prezzi e staff che mostriamo nelle altre pagine.",
          "Se le tue foto attuali sono tre scatti del 2019 e un logo, partiamo da uno shooting minimo mirato. Scrivimi e ti dico cosa riprendere in una mattina.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve un fotografo professionista?",
        answer:
          "Ideale sì, anche mezza giornata. Con luce buona e un telefono recente si può partire, ma serve disciplina su inquadrature e ordine.",
      },
      {
        question: "Posso usare foto dei soci da Instagram?",
        answer:
          "Solo con permesso esplicito e file decenti. Tag e filtri pesanti sul sito sembrano amatoriali.",
      },
      {
        question: "Mostro anche gli spogliatoi?",
        answer:
          "Sì, se sono un punto di forza o se i competitor li nascondono. Pulizia e spazio contano quanto i rack.",
      },
      {
        question: "Ogni quanto aggiornare la gallery?",
        answer:
          "Dopo ristrutturazioni, nuovi attrezzi o cambio look. Altrimenti una revisione annuale basta.",
      },
    ],
    related: [
      { label: "Servizio palestre", href: "/servizi/palestre" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "seo-locale-palestra-citta-google-business",
    service: "palestre",
    title:
      "SEO locale palestra: città, Google Business e pagine che portano prove",
    description:
      "Come far trovare la palestra su Google nella tua città: scheda Business allineata, pagine locali utili, recensioni e sito veloce — senza keyword stuffing da 2012.",
    date: "2026-07-09",
    keywords: [
      "SEO locale palestra",
      "Google Business palestra",
      "palestra vicino a me",
      "sito web palestra SEO",
      "posizionamento palestra città",
    ],
    intro:
      "«Palestra + nome città» e «palestra vicino a me» sono dove inizia gran parte delle iscrizioni. Se la scheda Google è trasandata e il sito non conferma orari e zona, perdi gente che era già a un chilometro da te.",
    sections: [
      {
        heading: "Google Business Profile prima del blog",
        paragraphs: [
          "Categoria corretta, orari reali, foto aggiornate, link al sito (orari / prova / contatti), telefono cliccabile, area di servizio se ha senso. È il pezzo che Maps mostra prima ancora che aprano la tua home.",
          "Rispondi alle recensioni. Anche un «grazie, ti aspettiamo in sala» batte il silenzio. Le foto della scheda devono combaciare con quelle del sito — stessa luce, stesso spazio.",
        ],
      },
      {
        heading: "Cosa deve dire il sito alla query locale",
        paragraphs: [
          "Città e quartiere in titoli e testi dove è naturale: «palestra a…», zona, parcheggio, mezzi. Una mappa o indirizzo chiaro sopra la piega della pagina contatti.",
          "Pagine utili: corsi, abbonamenti, prova, staff. Un articolo generico «i 10 benefici del fitness» non ti posiziona contro il competitor con scheda completa e 80 recensioni.",
        ],
      },
      {
        heading: "NAP e coerenza ovunque",
        paragraphs: [
          "Nome, indirizzo, telefono identici su sito, Maps, social, eventuali directory. Una virgola diversa nell’indirizzo crea schede duplicate e confusione.",
          "Se hai due sedi, due schede e pagine distinte — non un unico blocco confuso «siamo anche a…» senza dettagli.",
        ],
      },
      {
        heading: "Velocità mobile e Intent di prova",
        paragraphs: [
          "Chi cerca dal telefono mentre decide se passare dopo lavoro. Sito lento o form impossibile da compilare = torna ai risultati e chiama il secondo della lista.",
          "CTA locali: «Prova gratis a [città]», «Orari di questa settimana». Collego SEO e conversione: ranking senza form è vanity.",
        ],
      },
      {
        heading: "Come lavoro io su questi progetti",
        paragraphs: [
          "Allineo scheda e sito, sistemo titoli e contenuti locali, metto prove e orari dove Google e l’utente li cercano, controllo Core Web Vitals di base. Niente magie da «prima posizione garantita».",
          "Se la tua palestra è invisibile nella tua città o la scheda è ferma al 2022, possiamo ripartire da lì. Contattami con città, sedi e cosa offrite oggi.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve un blog per la SEO locale?",
        answer:
          "Utile dopo. Prima scheda Google, NAP, pagine servizio e recensioni. Il blog aiuta su domande specifiche (es. corsi ipertensione) se avete davvero quell’offerta.",
      },
      {
        question: "Quanto pesano le recensioni?",
        answer:
          "Molto sulla decisione umana e sul pack locale. Qualità e risposte contano più del solo numero.",
      },
      {
        question: "Devo fare landing per ogni quartiere?",
        answer:
          "Solo se servite zone distinte con prova reale (sede, parcheggio, community). Pagine vuote copiate fanno danno.",
      },
      {
        question: "In quanto tempo si vedono risultati?",
        answer:
          "Settimane per fix tecnici e scheda; mesi per consolidare. Dipende da concorrenza e storico della scheda.",
      },
    ],
    related: [
      { label: "Siti per palestre", href: "/servizi/palestre" },
      { label: "Contatti", href: "/contatti" },
      { label: "Altri articoli del blog", href: "/blog" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
