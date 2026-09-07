import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Eventi privati — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const eventiPrivatiPosts = [
  {
    slug: "countdown-rsvp-anniversario-festa-privata",
    service: "eventi-privati",
    title:
      "Countdown e RSVP per anniversari e feste private: basta il gruppo WhatsApp",
    description:
      "Perché countdown + RSVP sul sito evento chiudono i «forse», raccolgono menù e plus one e danno una scadenza chiara — senza inseguire gli invitati in chat.",
    date: "2026-06-10",
    keywords: [
      "RSVP festa privata",
      "countdown evento",
      "sito anniversario",
      "conferma presenza festa",
      "sito evento privato",
    ],
    intro:
      "Per il trentesimo di Marco mi hanno passato il gruppo «Festa»: sessantotto persone, tre orari diversi in giro, nessuno sapeva se portare il regalo. In una sera ho messo online countdown, programma e RSVP. In tre giorni le risposte certe sono finite in un foglio per il catering — non tra le sticker.",
    sections: [
      {
        heading: "Il countdown è una deadline, non un gadget",
        paragraphs: [
          "Un numero che scende spinge ad aprire il link e a fare una cosa sola: sì/no, menù, accompagnatore. Su un anniversario o una laurea batte il messaggio «rispondete per favore» sepolto tra vocali.",
          "Lo metto sopra la piega, con data e orario accanto. Chi arriva dal QR dell’invito vede subito quanto manca e cosa deve fare. Niente scroll infinito prima della CTA.",
        ],
      },
      {
        heading: "RSVP da festa ≠ RSVP da matrimonio (stessa logica)",
        paragraphs: [
          "Su un compleanno da quaranta non ti serve il seating chart da centoventi. Ti serve sapere quanti arrivano, chi ha allergie, chi porta i bambini. Form corto: nome, presenza, plus one, note alimentari, contatto opzionale.",
          "Rispetto a un Google Form inoltrato in chat c’è il contesto: foto, dress code e mappa nella stessa pagina. Si completa di più, si sbaglia di meno.",
        ],
      },
      {
        heading: "Cosa chiedo — e cosa lascio fuori",
        paragraphs: [
          "Ogni campo in più abbassa le risposte. Niente login, CAPTCHA aggressivi, «come ci hai conosciuto?». Orario di arrivo o preferenza aperitivo/cena solo se la cucina li usa davvero.",
          "Export in CSV o foglio: quando il locale chiede i vegani non cerchi tra i vocali. Per feste aziendali private posso aggiungere azienda o badge — senza gonfiare il form.",
        ],
      },
      {
        heading: "Un reminder, non cinque nag",
        paragraphs: [
          "Scadenza scritta sopra il form («rispondi entro sabato 14»). Tre giorni prima un testo pronto da inoltrare o un reminder automatico se previsto. Una spinta gentile batte la raffica di «ci sei?».",
          "I «no» liberano posti e budget bar. Preferisco trentadue risposte certe a cinquanta «magari» — e il countdown spinge proprio lì.",
        ],
      },
      {
        heading: "Quando ha senso sul tuo evento",
        paragraphs: [
          "Anniversari, lauree, battesimi con buffet, feste in villa, team building chiusi: ovunque ci sia lista invitati e costo a testa, countdown + RSVP ripagano in stress risparmiato.",
          "Sul servizio eventi privati vedi come li integro. Da contatti partiamo da data e locale — spesso la pagina è online in pochi giorni.",
        ],
      },
    ],
    faq: [
      {
        question: "Il countdown rallenta il sito sul telefono?",
        answer:
          "No, se è leggero. Io lo tengo minimale: data target, tick al secondo o al minuto, niente librerie che mangiano batteria.",
      },
      {
        question: "Posso cambiare l’RSVP dopo aver inviato?",
        answer:
          "Sì: link di modifica nella conferma, oppure variazione via messaggio e aggiorno il foglio. Meglio una correzione che un no-show.",
      },
      {
        question: "Serve per una festa da quindici persone?",
        answer:
          "Se il locale vuole numeri precisi o c’è menù fisso, sì. Aperitivo informale a casa: a volte basta un messaggio — ma una pagina con indirizzo e orario riduce comunque confusione.",
      },
      {
        question: "WhatsApp non basta per le conferme?",
        answer:
          "Basta finché le risposte restano poche e ordinate. Oltre le 25–30 persone il thread diventa ingestibile: l’RSVP sul sito chiude tutto in un elenco solo.",
      },
    ],
    related: [
      { label: "Siti per eventi privati", href: "/servizi/eventi-privati" },
      { label: "Scrivimi per il tuo evento", href: "/contatti" },
    ],
  },
  {
    slug: "pagina-location-evento-privato-esperienza-venue",
    service: "eventi-privati",
    title:
      "Pagina location per eventi privati: il venue come esperienza, non come pin",
    description:
      "Come strutturare una pagina location che fa arrivare gli invitati già orientati — atmosfera, come arrivare, parcheggio — senza brochure generiche.",
    date: "2026-06-11",
    keywords: [
      "pagina location evento",
      "sito festa privata",
      "venue evento privato",
      "come arrivare festa",
      "indicazioni location",
    ],
    intro:
      "Ho visto invitati perdere mezz’ora in una rotonda sbagliata perché l’unico indirizzo stava in un PDF inoltrato tre volte. La location è la prima impressione dell’evento. Sul sito la racconto come un posto in cui stare, non come una scheda catastale.",
    sections: [
      {
        heading: "Un solo lavoro per la pagina location",
        paragraphs: [
          "Far dire «voglio essere lì» e togliere dubbi su come arrivarci. Titolo evocativo, due-tre foto vere del posto, un paragrafo sull’atmosfera, poi la logistica. Niente elenchi da catalogo wedding.",
          "Villa sul Collio, loft a Udine, casale in campagna: il tono cambia, la struttura no. Emozione prima, istruzioni subito dopo, mappa e contatto emergenza in fondo.",
        ],
      },
      {
        heading: "Foto e copy che vendono il posto",
        paragraphs: [
          "Chiedo scatti reali: ingresso al tramonto, sala apparecchiata, dettaglio del giardino. Una didascalia («il cortile dell’aperitivo») orienta meglio di dieci filtri.",
          "Dettagli concreti nel testo: «il cancello è quello in legno, non l’ingresso del ristorante accanto». Chi guida di notte ringrazia. Chi viene da fuori regione capisce se serve taxi o navetta.",
        ],
      },
      {
        heading: "Come arrivare, parcheggio, accessibilità",
        paragraphs: [
          "Blocco leggibile con una mano: indirizzo completo, link Maps, uscita autostradale, dove lasciare la macchina, eventuale navetta dall’hotel. Se manca il parcheggio, lo scrivo — meglio prima che al cancello.",
          "Per battesimi e feste con nonni: note su scale, ascensore, percorso più comodo. Non è marketing. È rispetto per chi partecipa.",
        ],
      },
      {
        heading: "Orari e «cosa succede dove»",
        paragraphs: [
          "Due luoghi = due sezioni con orari. Stesso venue = timeline breve: arrivo, aperitivo, cena, after. Gli invitati smettono di chiedere «a che ora si mangia?».",
          "Collego location a countdown e RSVP: chi conferma ha già visto dove sta andando. Coerenza, meno ansia.",
        ],
      },
      {
        heading: "Se ripeti eventi nello stesso venue",
        paragraphs: [
          "Location manager e organizer: stessa struttura come template. Cambi foto e testi, tieni URL e SEO locali. Diventa anche pezzo di portfolio post-evento.",
          "Sul servizio eventi privati spiego come imposto queste pagine. Da contatti mandami indirizzo e due foto del posto — partiamo da lì.",
        ],
      },
    ],
    faq: [
      {
        question: "Basta il link a Google Maps?",
        answer:
          "Come backup sì, come unica informazione no. Maps non spiega il cancello sbagliato, la navetta o il parcheggio riservato.",
      },
      {
        question: "Quante foto servono?",
        answer:
          "Di solito 4–8 scatti buoni. Meglio poche immagini nitide che una galleria lenta da quaranta file.",
      },
      {
        question: "La location vuole logo e contatti?",
        answer:
          "Spesso sì: blocco discreto. L’evento resta protagonista; il venue è accreditato senza trasformare la pagina in pubblicità.",
      },
      {
        question: "Mappa custom o embed?",
        answer:
          "Per la maggior parte delle feste private: embed Maps + indicazioni scritte. Pianta custom solo in strutture grandi o multi-edificio.",
      },
    ],
    related: [
      { label: "Siti per eventi privati", href: "/servizi/eventi-privati" },
      { label: "Parliamone", href: "/contatti" },
    ],
  },
  {
    slug: "privacy-lista-invitati-sito-evento-accesso",
    service: "eventi-privati",
    title:
      "Privacy guest list: sito invite-only senza far sudare gli zii",
    description:
      "Password, link privati, noindex: come proteggere programma e lista invitati di una festa privata restando usabili sul telefono.",
    date: "2026-06-12",
    keywords: [
      "sito evento privato",
      "password sito festa",
      "privacy invitati",
      "accesso riservato evento",
      "invite only sito",
    ],
    intro:
      "Compleanno a cerchia stretta, battesimo riservato, festa aziendale che non deve finire su Google: la privacy è rispetto, non paranoia. Progetto siti evento che sembrano «solo per chi è invitato» — senza chiedere agli zii di creare un account.",
    sections: [
      {
        heading: "Cosa nascondo davvero (e cosa no)",
        paragraphs: [
          "Di solito: elenco ospiti, dettagli del programma, indirizzo preciso fino a una data, galleria riservata. Pubblico al massimo un teaser. Obiettivo: evitare che un link random finisca in una Story aperta a tutti.",
          "Lo dico chiaro agli organizzatori: nessuna password ferma un amico indiscreto che inoltra. Filtra curiosi e motori di ricerca. Il resto è buonsenso.",
        ],
      },
      {
        heading: "Tre livelli di accesso che uso di più",
        paragraphs: [
          "1) Solo noindex + URL non ovvia — basta per molte feste familiari. 2) Password unica sull’invito o via WhatsApp — un codice per tutti. 3) Link personale all’RSVP — utile per tracciare aperture o evitare doppioni.",
          "Login individuali solo se l’IT aziendale lo impone. Ogni frizione in più fa abbandonare l’RSVP: privacy vuota e zero conferme.",
        ],
      },
      {
        heading: "Come spiegare l’accesso senza fare i misteriosi",
        paragraphs: [
          "Sull’invito: «Apri il sito con il codice stampato qui». In pagina: campo grande, messaggio d’errore umano («riprova, il codice è sulla cartolina»). Niente jargon da firewall.",
          "Se qualcuno è bloccato, WhatsApp dell’organizzatore in fondo. Preferisco un recovery umano a un flusso da SaaS.",
        ],
      },
      {
        heading: "Dati RSVP e privacy in pratica",
        paragraphs: [
          "Raccolgo solo ciò che serve. Privacy breve: chi legge le risposte, quando le cancello dopo l’evento. Niente newsletter agganciata di nascosto al form festa.",
          "Feste corporate: allineo con HR o legal su retention e hosting. Feste familiari: minimizzazione e trasparenza bastano.",
        ],
      },
      {
        heading: "Il feeling invite-only anche nel design",
        paragraphs: [
          "Oltre alla password: copy «sei dei nostri», foto del gruppo ristretto, niente CTA pubbliche tipo «prenota il tuo posto». Non deve sembrare un evento ticketed aperto.",
          "Se hai una lista chiusa e vuoi lo stesso approccio, sul servizio eventi privati trovi il perimetro. Da contatti dimmi quanto deve restare riservato — calibriamo il livello.",
        ],
      },
    ],
    faq: [
      {
        question: "Una password unica è abbastanza sicura?",
        answer:
          "Per una festa privata, nella maggior parte dei casi sì. Codice non ovvio (niente «festa2026») e condiviso solo nei canali dell’invito.",
      },
      {
        question: "Google può indicizzare comunque?",
        answer:
          "Con noindex, robots e accesso protetto il rischio scende al minimo. Uno screenshot pubblicato esce dal controllo tecnico.",
      },
      {
        question: "Gli anziani sanno inserire la password?",
        answer:
          "Sì, se il campo è grande e il codice è stampato sull’invito. Il browser basta: niente app sconosciute.",
      },
      {
        question: "Posso togliere la password dopo l’evento?",
        answer:
          "Certo. Molti lasciano aperta solo la galleria grazie, o archiviano tutto. Si decide in brief.",
      },
    ],
    related: [
      { label: "Siti per eventi privati", href: "/servizi/eventi-privati" },
      { label: "Scrivimi", href: "/contatti" },
    ],
  },
  {
    slug: "galleria-post-evento-lead-magnet-prenotazioni",
    service: "eventi-privati",
    title:
      "Galleria post-evento: ricordo per gli ospiti, magnete per le prossime feste",
    description:
      "Come trasformare le foto della festa in una galleria online che fa felici gli invitati e porta richieste a location, organizer e fotografi.",
    date: "2026-06-13",
    keywords: [
      "galleria evento online",
      "foto festa privata",
      "portfolio location eventi",
      "sito post evento",
      "lead magnet eventi",
    ],
    intro:
      "Due settimane dopo una festa vicino a Cividale il venue mi ha scritto: «Le foto sul sito ci hanno portato tre visite per altri eventi.» Non era magia SEO. Era una galleria ordinata, veloce, con un CTA chiaro in fondo. Ricordo e marketing possono convivere — se li progetti così dall’inizio.",
    sections: [
      {
        heading: "Due pubblici, una galleria",
        paragraphs: [
          "Gli invitati vogliono rivedersi. Venue e organizer vogliono mostrare atmosfera a chi sceglie dove fare la prossima festa. Sezioni: highlight della serata, dettagli location, dietro le quinte se autorizzati.",
          "Password opzionale per la parte «solo ospiti»; vetrina pubblica con 8–12 scatti che vendono il posto senza esporre minori o momenti troppo privati.",
        ],
      },
      {
        heading: "Velocità e consenso prima del wow",
        paragraphs: [
          "Galleria lenta su mobile uccide tutto. Compressione, lazy-load, griglia semplice. Meglio quaranta foto scelte che trecento file grezzi che nessuno scorre.",
          "Consenso: minori, ospiti che non vogliono apparire, diritti del fotografo. La fiducia vale più di un like.",
        ],
      },
      {
        heading: "CTA che non rovina il ricordo",
        paragraphs: [
          "In fondo, non sopra ogni foto: «Vuoi un evento così qui?» o «Organizzi feste private? Parliamone». Un bottone verso contatti o preventivo. Niente banner sopra i sorrisi.",
          "Per fotografi e planner diventa case study: crediti chiari, link al servizio, eventuale embed altrove. Tutti guadagnano visibilità senza litigare sul watermark.",
        ],
      },
      {
        heading: "Dal giorno dopo all’evergreen",
        paragraphs: [
          "Teaser in 48–72 ore se il fotografo consente, poi galleria completa. Dopo mesi: archivio o portfolio stagionale.",
          "Eventi ricorrenti: ogni festa alimenta la successiva. URL stabile, album aggiornato, prove sociali fresche. Lead magnet naturale — perché è vero.",
        ],
      },
      {
        heading: "Come lo imposto io",
        paragraphs: [
          "Brief privacy + chi possiede le foto + pubblica / privata / ibrida. Poi allineo design al sito evento già online: stesso tono, stessi colori.",
          "Dettagli sul servizio eventi privati; da contatti anche solo una cartella Drive di scatti e ti dico cosa ha senso mettere online.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio Instagram o galleria sul sito?",
        answer:
          "Instagram per teaser; il sito per ordine, qualità, privacy e CTA verso prenotazione. Ideale usarli insieme.",
      },
      {
        question: "Gli invitati possono scaricare le foto?",
        answer:
          "Sì, se previsto: drive protetto o download selezionato. Evito upload selvaggi senza moderazione.",
      },
      {
        question: "Quanto tempo lasciare online la galleria?",
        answer:
          "Da qualche mese a indefinito, a seconda di privacy e utilità marketing. Feste molto private: spesso chiusura dopo 60–90 giorni.",
      },
      {
        question: "Serve un account per vedere le foto?",
        answer:
          "Preferisco di no. Password condivisa o link privato bastano; gli account fanno abbandonare nonni e amici occasionali.",
      },
    ],
    related: [
      { label: "Siti per eventi privati", href: "/servizi/eventi-privati" },
      { label: "Contattami", href: "/contatti" },
    ],
  },
  {
    slug: "one-page-vs-multipagina-sito-eventi-privati",
    service: "eventi-privati",
    title:
      "One-page o multi-pagina per un evento privato? Come scelgo",
    description:
      "Confronto pratico tra one-page e struttura a più pagine per compleanni, lauree, anniversari e feste private — criteri su RSVP, location e privacy.",
    date: "2026-06-14",
    keywords: [
      "sito one page evento",
      "sito multipagina festa",
      "struttura sito evento privato",
      "landing festa privata",
      "sito compleanno online",
    ],
    intro:
      "«Tutto in una pagina o spezziamo?» Non c’è dogma. C’è il tipo di evento, quanta info serve agli invitati e se vuoi riusare il sito dopo. Ecco come decido io — da lauree one-page a feste aziendali a cinque sezioni.",
    sections: [
      {
        heading: "Quando la one-page vince",
        paragraphs: [
          "Evento monocentro, sotto ~80 invitati, un venue, RSVP semplice, programma in cinque righe: one-page. Countdown in cima, tono, location, RSVP, contatti. Un link, zero menu confusi.",
          "Costa meno, va online prima, si aggiorna in un colpo. Per un cinquantesimo o una festa di laurea è spesso la scelta di default.",
        ],
      },
      {
        heading: "Quando spezzare in più pagine",
        paragraphs: [
          "Due location, menù lunghi, alloggi, FAQ corpose, area fornitori, galleria pesante, agenda workshop corporate: multi-pagina. Meno muro di testo, URL dedicate («/location», «/rsvp», «/alloggi»).",
          "Privacy: puoi proteggere solo «/ospiti» e lasciare un teaser in home. Su one-page unica la password chiude tutto o niente.",
        ],
      },
      {
        heading: "RSVP, SEO e riuso",
        paragraphs: [
          "In one-page ancoro l’RSVP e ripeto il bottone. In multi-pagina gli do una route propria — utile per QR e reminder. Per SEO locale del venue, pagine separate battono un blocco unico.",
          "Portfolio post-festa e CTA booking: multipagina (home + gallery + contatti) invecchia meglio. One-shot familiare: one-page e poi archivio.",
        ],
      },
      {
        heading: "Ibrido: il compromesso che uso di più",
        paragraphs: [
          "Home one-page completa per gli invitati + una o due extra solo se servono («per chi alloggia», galleria post-evento). Navigazione minimale: logo, RSVP, eventualmente Location.",
          "Niente sito istituzionale per un compleanno. Niente romanzo da scrollare su mobile per centoventi persone.",
        ],
      },
      {
        heading: "Come decidiamo in call",
        paragraphs: [
          "In mezz’ora: numero invitati, location, password sì/no, brand venue dietro, galleria marketing dopo. Esco con una struttura in cinque righe — poi si costruisce.",
          "Sul servizio eventi privati vedi cosa includo. Da contatti raccontami l’evento in tre frasi e ti dico subito one-page o multi.",
        ],
      },
    ],
    faq: [
      {
        question: "La one-page è meno professionale?",
        answer:
          "No. È professionale se è chiara, veloce e completa. Il professionismo non si misura dal numero di voci di menu.",
      },
      {
        question: "Posso partire one-page e aggiungere pagine dopo?",
        answer:
          "Sì, e lo faccio spesso: online subito l’essenziale, poi galleria o alloggi quando i contenuti sono pronti.",
      },
      {
        question: "Il QR dell’invito dove deve puntare?",
        answer:
          "Di solito alla home (one-page) o direttamente all’RSVP se la priorità è la conferma. Evito QR che aprono PDF.",
      },
      {
        question: "Quanto cambia il budget tra le due opzioni?",
        answer:
          "La multi-pagina chiede più copy, layout e QA: sale il tempo. Non è il doppio per forza — dipende da pagine e materiali che fornite voi.",
      },
    ],
    related: [
      { label: "Siti per eventi privati", href: "/servizi/eventi-privati" },
      { label: "Richiedi un preventivo", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
