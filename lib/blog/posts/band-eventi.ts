import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Band ed eventi musicali — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const bandEventiPosts = [
  {
    slug: "epk-press-kit-online-band-booking",
    service: "band-eventi",
    title: "EPK online per band: il press kit che i booker aprono davvero",
    description:
      "Come strutturare un EPK / press kit digitale — bio, foto, rider, link audio — che un’agenzia apre in un click, senza ZIP, Drive sparsi e PDF «definitivi_v7».",
    date: "2026-05-31",
    keywords: [
      "EPK band",
      "press kit musicale online",
      "electronic press kit",
      "sito band booking",
      "press kit musicisti",
    ],
    intro:
      "Un booker mi ha scritto una riga: «Se il materiale è un Drive con dodici cartelle, chiudo.» Non era scortese. Aveva tre minuti e altre quindici band in lista. Quando costruisco un sito per musicisti, l’EPK online è spesso la prima pagina: una URL sola, aggiornabile, che sostituisce ZIP e «ti mando tutto su WhatsApp».",
    sections: [
      {
        heading: "Cosa cerca chi valuta un’apertura",
        paragraphs: [
          "Bio corta e lunga, foto ad alta risoluzione usabili, due o tre pezzi audio/video forti, rider essenziale, area geografica e tempi di anticipo. Niente wallpaper da forum, niente romanzi. Se in tre minuti non trova il pezzo migliore e un contatto chiaro, passa oltre.",
          "Io metto l’EPK come pagina del sito band, non come allegato. Booking, produzione e social ricevono lo stesso link. Zero versioni che divergono.",
        ],
      },
      {
        heading: "Bio e foto: ordine prima del «bello»",
        paragraphs: [
          "In cima la bio corta (ottanta–centoventi parole); sotto quella lunga per i comunicati. Le foto le raggruppo per uso: live, press, crop social. Pesi sotto controllo — su mobile nessuno scarica quaranta mega di TIFF.",
          "Per l’audio preferisco embed o link diretti a Spotify/Bandcamp; per il video un live e un pezzo da sala. Tre pezzi forti battono quindici mediocri.",
        ],
      },
      {
        heading: "Rider senza drama da «versione finale»",
        paragraphs: [
          "Una sezione rider scaricabile (PDF leggero) più un riassunto in pagina: canali, backline minimo, durata set. Quando cambia qualcosa, aggiorno file e data «ultimo aggiornamento». Niente mail «DEFINITIVO_v7_FINAL_davvero».",
          "Aggiungo anche il raggio tipico (Friuli, Veneto, oltre confine se serve) e quanto anticipo chiedete. Chi pianifica un festival a gennaio non vuole indovinare a giugno.",
        ],
      },
      {
        heading: "Pagina viva e PDF: entrambi, stessa fonte",
        paragraphs: [
          "La pagina resta sempre aggiornata per chi naviga; un one-pager o uno ZIP minimale serve a chi archivia offline. Il PDF lo tiro dal contenuto del sito, così non mentono l’uno all’altro.",
          "Alias e side project? EPK separati, URL chiare. Un booker confuso è un booker che non richiama.",
        ],
      },
      {
        heading: "Da cartella caotica a link che si inoltra",
        paragraphs: [
          "Parto da ciò che avete: foto sparse, bio vecchia, link Spotify. Pulisco, gerarchizzo, pubblico. Poi collego il form booking così la richiesta arriva già contestualizzata («ho visto l’EPK, date libere a luglio»).",
          "Se vuoi lo stesso per la tua band o come DJ, sul servizio band ed eventi musicali c’è lo schema; da contatti mi mandi i materiali grezzi e ti dico cosa manca prima di parlare con un’agenzia.",
        ],
      },
    ],
    faq: [
      {
        question: "EPK e press kit sono la stessa cosa?",
        answer:
          "In pratica sì: materiale ufficiale per stampa, festival e booking. «EPK» è il termine all’estero; in Italia senti spesso «press kit». Conta la struttura, non l’etichetta.",
      },
      {
        question: "Serve ancora un PDF se ho la pagina web?",
        answer:
          "Utile come archivio e per chi lavora offline. La fonte di verità resta la pagina: aggiorno il PDF quando cambia il sito, non il contrario.",
      },
      {
        question: "Cosa non mettere nell’EPK?",
        answer:
          "Tracklist infinite, dump fotografici non selezionati, link a chat private, Drive con password scadute. Meno rumore, più decisione.",
      },
      {
        question: "L’EPK può essere bilingue?",
        answer:
          "Sì: bio e one-pager in italiano e inglese aiutano se mirate a circuiti oltre confine. Lo faccio spesso per chi gira Austria e Slovenia.",
      },
    ],
    related: [
      { label: "Sito per band ed eventi musicali", href: "/servizi/band-eventi" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "calendario-live-biglietti-mobile-band",
    service: "band-eventi",
    title: "Calendario live e biglietti: date chiare che non si spezzano sul telefono",
    description:
      "Come costruire un calendario concerti con venue, stato e link ticket usabili dal telefono — senza Stories scadute o tabelle screenshotate.",
    date: "2026-06-01",
    keywords: [
      "calendario concerti band",
      "date live online",
      "link biglietti mobile",
      "sito band tour",
      "ticket link concerti",
    ],
    intro:
      "Chi decide di venire al concerto lo fa dal telefono: tram, coda al bar, fuori dal locale. Se le date sono uno screenshot di Excel o un Eventbrite sepolto in una Story di tre giorni fa, hai già perso la vendita. Sul sito band tratto il calendario come la pagina più concreta del progetto.",
    sections: [
      {
        heading: "Una riga, una data — non un diario",
        paragraphs: [
          "Ogni live: giorno e ora, città, venue, eventuale supporto/headliner, CTA biglietti o «info». Su mobile impilo in verticale. Niente colonne che obbligano lo scroll orizzontale.",
          "Le date passate le nascondo di default o le archivio a parte. La lista risponde a «dove suonate dopo?», non a nostalgia. La prova sociale resta, senza inquinare l’acquisto.",
        ],
      },
      {
        heading: "Ticket out: affidabilità prima del brand",
        paragraphs: [
          "Il bottone «Biglietti» punta al promoter o alla piattaforma (Ticketone, Eventbrite, Dice, link del club). Nuova scheda, testo chiaro sulla destinazione. Niente abbreviatori opachi: un hop in più su mobile è un abbandono.",
          "Presale fanclub e vendita generale? Li elenco in ordine, etichette corte. Un bottone primario batte tre pillole decorative che nessuno capisce.",
        ],
      },
      {
        heading: "Cosa si rompe sul telefono (e cosa taglio)",
        paragraphs: [
          "PDF manifesto da pinch-zoom infinito, mappe iframe sopra la fold, widget calendario da desktop, font del venue illeggibili. Testo i tap target, il contrasto e la velocità anche in 4G scarso.",
          "Le mappe le metto sotto richiesta o nella scheda della singola data. Prima il biglietto; poi l’orientamento per chi ha già deciso.",
        ],
      },
      {
        heading: "Sold out, spostamenti, rain date",
        paragraphs: [
          "Quando una data va sold out o si sposta, aggiorno lo stato in pagina e, se serve, un banner breve in cima. I social puntano al sito: «dettagli e biglietti sul link in bio». Non riscrivo lo stesso messaggio in cinque Stories.",
          "Al gruppo lascio un modo semplice per segnalarmi le modifiche — foglio condiviso o messaggio strutturato. Una sola fonte ufficiale.",
        ],
      },
      {
        heading: "Dal calendario al booking",
        paragraphs: [
          "Accanto alle date pubbliche un CTA soft per locali e festival: «Vuoi proporre una data?» verso il form. Chi organizza vede che siete attivi; chi ascolta vede dove venirvi a sentire.",
          "Se le serate sono ancora solo su Instagram, partiamo dal calendario sul sito: sulla pagina servizi c’è l’approccio; da contatti mi mandi le prossime cinque date e le sistemiamo.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio un Google Calendar embeddato?",
        answer:
          "Raramente: su mobile è goffo e toglie controllo sul design. Preferisco una lista HTML leggera, eventualmente aggiornata da un foglio che gestite voi.",
      },
      {
        question: "I biglietti devono stare solo sul sito?",
        answer:
          "No: la vendita resta sulle piattaforme. Il sito è l’indice affidabile che manda traffico pulito al ticket giusto.",
      },
      {
        question: "Come gestisco date TBA o venue segreta?",
        answer:
          "Mostro città e mese con stato «annuncio a breve» e abilito il link ticket solo quando è reale. Meglio onesti che bottoni morti.",
      },
      {
        question: "Serve una pagina per ogni concerto?",
        answer:
          "Utile per headliner o date speciali. Per un club tour fitto spesso basta la lista più una scheda espandibile.",
      },
    ],
    related: [
      { label: "Sito band con calendario live", href: "/servizi/band-eventi" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "bio-media-embed-sito-band-senza-caos",
    service: "band-eventi",
    title: "Bio e media sul sito band: audio e video senza discarico di embed",
    description:
      "Come ordinare biografia, foto, Spotify e YouTube su un sito per musicisti — gerarchia chiara, embed leggeri e una storia che si legge davvero.",
    date: "2026-06-02",
    keywords: [
      "bio band sito",
      "embed Spotify YouTube band",
      "media kit musicisti",
      "sito musicisti video audio",
      "pagina biografia band",
    ],
    intro:
      "La tentazione è scaricare tutto sul visitatore: dieci live, tre playlist, quaranta foto di backstage e una bio da duemila parole. Nessuno finisce quella pagina. Quando progetto siti per band, tratto bio e media come un disco: un ordine di ascolto, non un hard disk.",
    sections: [
      {
        heading: "La bio ha trenta secondi per farsi capire",
        paragraphs: [
          "Apro con genere, base (es. Udine) e cosa suonate dal vivo. Poi un paragrafo di percorso — release, festival, collaborazioni — e chiudo con cosa state promuovendo ora. Cronologia completa ed ex componenti: EPK o «approfondisci».",
          "Prima o terza persona, ma coerente col brand. Evito «energia esplosiva» e «non catalogabili» se non li reggo con fatti: locali veri, date, numeri.",
        ],
      },
      {
        heading: "Embed: pochi, pesanti di significato",
        paragraphs: [
          "Un player Spotify o Bandcamp in evidenza (single o album corrente), un video live rappresentativo, eventualmente un lyric o un visualizer. Stop. Il resto in lista «guarda anche» con thumbnail: pagina più veloce, scelta più chiara.",
          "Lazy-load dove posso; niente cinque iframe sopra la fold. Su mobile un YouTube a schermo pieno seguito da altri tre è scroll infinito e batteria a terra.",
        ],
      },
      {
        heading: "Foto: selezione, non archivio",
        paragraphs: [
          "Otto–dodici scatti curati battono ottanta file dump. Live, press, dettagli strumenti. Alt text sensati aiutano anche la ricerca locale («band rock Udine live»).",
          "Fotografo fisso? Credito in chiaro. Booker e professionisti lo notano; dimostra rispetto per chi lavora con voi.",
        ],
      },
      {
        heading: "Gerarchia della home",
        paragraphs: [
          "Ordine che uso spesso: ascolto/video → prossime date → bio corta → media secondari → booking. Chi arriva da Instagram trova subito la prova sonora; chi arriva da Google «band + città» capisce il profilo; chi vuole ingaggiarvi non scava.",
          "Instagram e TikTok restano in footer o in una riga social. Non sostituiscono il sito: dimostrano che siete vivi. Il sito tiene ciò che i feed dimenticano.",
        ],
      },
      {
        heading: "Manutenzione senza diventare webmaster",
        paragraphs: [
          "Esce un singolo? Aggiorniamo l’embed in evidenza e una riga in bio — non rifacciamo il sito. Video live nuovo: entra in cima, il più vecchio scende in lista.",
          "Se oggi la pagina è un collage di widget, sulla scheda band ed eventi musicali vedi come la ripulisco; da contatti mandami il link attuale e ti dico cosa tagliare per primo.",
        ],
      },
    ],
    faq: [
      {
        question: "Meglio Spotify o Bandcamp in evidenza?",
        answer:
          "Dipende da dove ascoltano e se vendete digitali/merch. Spesso Spotify per reach e Bandcamp se conta il merch. Uno in hero, l’altro in secondario.",
      },
      {
        question: "I verticali TikTok bastano come media?",
        answer:
          "Come prova social sì; come unico pezzo no. I booker vogliono sentire un set, non solo clip da quindici secondi. Affiancali a un live più lungo.",
      },
      {
        question: "Quanto lunga la bio?",
        answer:
          "In home circa cento–centocinquanta parole; lunga dedicata o in EPK trecento–cinquecento. Oltre, perdete lettori senza guadagnare credibilità.",
      },
      {
        question: "Gli embed rallentano il sito?",
        answer:
          "Sì se ne abusate. Li limito, li lazy-load e tengo il resto in HTML statico. Velocità è parte dell’immagine professionale.",
      },
    ],
    related: [
      { label: "Sito per musicisti e band", href: "/servizi/band-eventi" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "form-booking-band-feste-private-locali",
    service: "band-eventi",
    title: "Form booking band: feste private e locali nello stesso contatto (senza due caselle)",
    description:
      "Come disegnare un form booking per band e DJ che raccoglie i dati giusti per matrimoni/feste e per club/festival — un ingresso, due percorsi.",
    date: "2026-06-03",
    keywords: [
      "form booking band",
      "richiesta booking musicisti",
      "contatti band feste private",
      "booking locali festival",
      "preventivo DJ matrimonio",
    ],
    intro:
      "«Scrivici su Instagram» non è booking: è un labirinto di DM. Chi organizza un matrimonio chiede durata, repertoire e allestimento; un locale chiede cachet, rider e disponibilità. Se il form tratta tutti uguali, rispondi a metà e sprechi ore. Io imposto un selettore iniziale — festa privata / venue-festival — stessi contatti, campi diversi.",
    sections: [
      {
        heading: "Un inbox, due flussi: perché batte due email",
        paragraphs: [
          "«private@» e «booking@» sembrano professionali finché qualcuno scrive al posto sbagliato e Instagram resta il canale di fatto. Un form sul sito instrada tutto in una casella (o CRM) con «tipo richiesta» già valorizzato.",
          "Filtri, template giusti, numeri su cosa converte. Niente «hai scritto alla mail sbagliata» tre giorni dopo.",
        ],
      },
      {
        heading: "Campi per privati e matrimoni",
        paragraphs: [
          "Data, città/location, tipo (matrimonio, aziendale, compleanno), fascia oraria, ospiti stimati, mood o genere, budget a fasce, note allestimento. Email e telefono obbligatori; Instagram opzionale.",
          "Niente questionari da venti campi: chi organizza nozze è già sotto stress. Cinque domande utili e una call battono un form abbandonato.",
        ],
      },
      {
        heading: "Campi per club, locali e festival",
        paragraphs: [
          "Nome venue o festival, data o finestra, città, formato (headliner, support, DJ set), durata, cachet o «da definire», link evento, contatto tecnico. In automatico richiamo EPK e rider sul sito.",
          "Se girate Friuli e Veneto, un campo «altre date nella stessa tournée» chiude mini-tour senza cinque mail di ping-pong.",
        ],
      },
      {
        heading: "Conferma, anti-spam, tono vostro",
        paragraphs: [
          "Dopo l’invio: conferma chiara («ti rispondo entro X giorni lavorativi») e mail di ricevuta con riepilogo. Honeypot leggero; niente captcha umilianti sul telefono.",
          "Il testo del form parla come voi. Band informale? Niente burocratese. Mirate a wedding planner? Più ordine. Il form è brand, non solo database.",
        ],
      },
      {
        heading: "Dalla richiesta alla risposta che chiude",
        paragraphs: [
          "Due template di prima risposta: privati (disponibilità, pacchetti, cosa includono) e venue (rider, promo, materiale stampa). Il sito fornisce i link da incollare: date, media, EPK.",
          "Se oggi il booking è solo DM, partiamo dal form Contatti del sito. Dettagli sul servizio band ed eventi; poi contatti per capire insieme cachet, radius e tipi di serata che accettate.",
        ],
      },
    ],
    faq: [
      {
        question: "Possiamo lasciare solo WhatsApp?",
        answer:
          "Come canale secondario sì; come unico ingresso no. Non archivia bene, non scala e confonde privati e locali. Il form crea traccia; WhatsApp resta per il sì operativo.",
      },
      {
        question: "Meglio mostrare i prezzi sul sito?",
        answer:
          "Fasce o «a partire da» filtrano richieste fuori budget. Prezzi fissi pubblici dipendono da quanto variate tra privato e club — lo decidiamo caso per caso.",
      },
      {
        question: "Si può allegare un brief o una scaletta?",
        answer:
          "Sì, upload opzionale leggero per matrimoni e corporate. Per i club di solito basta un link all’evento.",
      },
      {
        question: "Come filtriamo zona e genere sbagliati?",
        answer:
          "In pagina indico area, tipologia di set e cosa non fate. Il form lo ripete in una riga: chi legge filtra da solo.",
      },
    ],
    related: [
      { label: "Booking e sito per band", href: "/servizi/band-eventi" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    slug: "sito-band-vs-solo-instagram-identita",
    service: "band-eventi",
    title: "Sito band vs solo Instagram: dove vive davvero l’identità",
    description:
      "Perché un dominio proprio non è «Instagram ma più brutto» — e quando un sito ufficiale cambia come locali e privati vi prenotano.",
    date: "2026-06-04",
    keywords: [
      "sito band vs Instagram",
      "identità band locale",
      "brand musicisti",
      "sito ufficiale band",
      "presenza online musicisti",
    ],
    intro:
      "Instagram è dove vi scoprono. Non è dove, tra due anni, un booker o uno sposo trova la versione ufficiale di chi siete. Il pattern lo vedo spesso: feed vivo, link in bio caotico, zero casa digitale. L’identità resta ospitata su una piattaforma che cambia regole, nasconde post e vi mescola al rumore.",
    sections: [
      {
        heading: "Cosa Instagram fa bene — e dove si spezza",
        paragraphs: [
          "Teaser, clip live, sold out, community. Per una band locale è ossigeno. Quello che non tiene ferma: bio ufficiale, EPK stabile, calendario affidabile, form booking con storico. Un solo link in bio; Stories che scadono; post che affondano.",
          "Se il «sito» è un Linktree a nove bottoni, state già ammettendo che serve un indice — solo che l’indice è generico e non racconta il brand.",
        ],
      },
      {
        heading: "Il sito decide la gerarchia (non l’app)",
        paragraphs: [
          "Tipografia, colori, foto, ordine delle sezioni: sul vostro dominio le scegliete voi. Su Instagram le sceglie Meta. Chi apre nomedellaband.it entra nel vostro mondo; chi apre il profilo entra nel feed.",
          "Per i privati conta fiducia: date, media e contatti ordinati sembrano un progetto serio. Per i festival conta velocità di briefing: un link unico batte «guarda l’highlight Booking».",
        ],
      },
      {
        heading: "Territorio sì, provincialismo no",
        paragraphs: [
          "Essere «la band di Udine» o «DJ del Collio» è un vantaggio se lo dite con fatti: locali reali, festival del territorio, lingue se girate oltre confine. Non serve scimmiottare aesthetic da major londinese se il pubblico è qui.",
          "Allo stesso tempo evitiamo flyer photocopiato 2012. Identità locale e mestiere web stanno insieme: mobile-first, coerente col merch e con le cover.",
        ],
      },
      {
        heading: "Feed come megafono, sito come sede",
        paragraphs: [
          "Flusso che imposto: ogni annuncio importante (data, single, sold out) ha post/Story che punta alla pagina giusta. Il bio link resta stabile: home o «live». Merch e ticket non competono in un menu a nove voci.",
          "Instagram porta attenzione; il sito converte in ascolto, biglietto o richiesta booking. Non è o l’uno o l’altro — è chi comanda la fonte di verità.",
        ],
      },
      {
        heading: "Quando ha senso partire adesso",
        paragraphs: [
          "Se avete più di poche date l’anno, chiedete cachet, fate privati, o volete uscire dal solo amici-di-amici, un sito band leggero ripaga in chiarezza prima che in traffico Google. La SEO locale («band matrimonio Udine», «live rock Friuli») è un bonus, non l’unico motivo.",
          "Se vi riconoscete nel caos del solo Instagram, sulla pagina servizi band ed eventi musicali c’è il perimetro; da contatti e dal portfolio vedete tono e risultati — poi decidiamo se partire da one-page o da EPK + date + booking.",
        ],
      },
    ],
    faq: [
      {
        question: "Senza pubblico Instagram il sito serve?",
        answer:
          "Sì per booking e privati: chi vi cerca per nome o arriva da un amico vuole un riferimento stabile. Il traffico social aiuta, non è l’unico ingresso.",
      },
      {
        question: "Basta un Linktree custom?",
        answer:
          "Meglio di niente, ma non sostituisce bio, media e form. È un menù; il sito è il locale.",
      },
      {
        question: "Dobbiamo abbandonare i social?",
        answer:
          "No. Li uso per scoperta e urgenza. Il sito tiene memoria, fiducia e conversioni.",
      },
      {
        question: "Quanto grande il primo sito band?",
        answer:
          "Spesso basta una one-page: ascolto, date, bio corta, media, form. Cresciamo quando materiali e date lo chiedono — non prima.",
      },
    ],
    related: [
      { label: "Sito ufficiale per band e DJ", href: "/servizi/band-eventi" },
      { label: "Contatti", href: "/contatti" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
