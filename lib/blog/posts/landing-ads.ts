import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Landing ads — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const landingAdsPosts = [
  {
    slug: "landing-vs-sito-vetrina-campagne-google-meta",
    service: "landing-ads",
    title:
      "Landing page vs sito vetrina: perché Google e Meta odiano la homepage",
    description:
      "Mandare traffico ads sulla homepage spreca click nel menu. Quando serve una landing dedicata per Google e Meta — e come la collego al sito senza confusione.",
    date: "2026-06-20",
    keywords: [
      "landing page vs sito vetrina",
      "landing Google Ads",
      "landing Meta Facebook Instagram",
      "pagina conversione campagne",
      "landing page Udine",
    ],
    intro:
      "La campagna porta click. Le lead no. Spesso non è l’annuncio: è dove atterra la persona. Un sito vetrina racconta chi sei. Una landing chiude un’azione. Io, da Udine, costruisco pagine dedicate alle ads proprio per non far dispersare il budget tra «Chi siamo», il blog e tre bottoni diversi.",
    sections: [
      {
        heading: "Due mestieri diversi: narrare e convertire",
        paragraphs: [
          "Il sito aziendale serve chi ti cerca già: servizi, portfolio, contatti, fiducia. Chi arriva da un ads ha visto una promessa stretta — preventivo rapido, prova, webinar, offerta a tempo. Se lo mandi su `/`, deve ricostruire da solo il percorso. Molti abbandonano. Tu hai già pagato il click.",
          "La landing toglie le uscite inutili: niente menu a dieci voci, niente link al catalogo intero, niente footer da hub. Un messaggio, una prova, una call to action. Il resto, se serve, sta sotto la piega — non sopra.",
        ],
      },
      {
        heading: "Annuncio e pagina devono dire la stessa cosa",
        paragraphs: [
          "Su Google Ads la coerenza tra keyword, copy dell’annuncio e H1 pesa su qualità e costo per click. Su Meta conta continuità di messaggio e di tono: se l’inserzione promette «consulenza entro 48 ore», la pagina non può aprire con «benvenuti dal 1998».",
          "Parto dal brief campagna: obiettivo, pubblico, offerta, obiezioni tipiche. Solo dopo disegno la pagina. Non adatto un template generico all’annuncio che stai già pagando.",
        ],
      },
      {
        heading: "Quando il sito vetrina basta (e quando brucia soldi)",
        paragraphs: [
          "Branding soft, remarketing a chi ti conosce, traffico organico locale: una pagina servizi chiara può bastare. Cold traffic — gente che non ti ha mai sentito — vuole offerta e CTA univoca, non un tour del brand.",
          "Caso tipico in Friuli: artigiano o studio con 15–30 € al giorno su Meta. Mandare tutto sulla homepage è uno spreco. Un path tipo `/preventivo-rapido` con form corto e WhatsApp secondario cambia il gioco senza toccare il resto del sito.",
        ],
      },
      {
        heading: "Stesso dominio, ruolo diverso (e SEO pulita)",
        paragraphs: [
          "Preferisco path sul dominio principale: fiducia, consenso più semplice, tracking più pulito. Dominio separato solo per esigenze particolari di brand o partner.",
          "Pagine di test o offerte scadute: noindex quando serve, canonical chiaro, niente cannibalizzazione con le pagine servizi evergreen. Il sito resta la casa; la landing è la porta della campagna. Quando la campagna finisce, aggiorno o archivio — non lascio zombie.",
        ],
      },
      {
        heading: "Cinque cose che mi servono prima di scrivere",
        paragraphs: [
          "Obiettivo misurabile, offerta, prova (recensioni, casi, garanzie), azione unica, come gestisci le lead. Senza queste cinque non costruisco una landing: costruirei una homepage corta.",
          "Sul servizio landing per campagne ads c’è il perimetro tipico; da contatti mandami l’annuncio o il brief e ti dico se serve davvero una pagina dedicata o basta ritoccare un URL esistente.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usare la stessa landing per Google e Meta?",
        answer:
          "Sì, se messaggio e offerta coincidono. Se su Google punti keyword informative e su Meta spingi un’offerta aggressiva, meglio due varianti: stesso scheletro, copy e hero diversi.",
      },
      {
        question: "La landing sostituisce il sito aziendale?",
        answer:
          "No. Il sito resta per fiducia, SEO e navigazione. La landing è lo strumento della campagna: entra, converte, esci. Poi, se vuoi, rimandi al sito chi ha già lasciato il contatto.",
      },
      {
        question: "Serve un dominio tipo offerta-brand.it?",
        answer:
          "Raramente. Path sul dominio principale è quasi sempre meglio. Dominio separato solo se c’è un motivo di brand o di partnership chiaro.",
      },
      {
        question: "Quanto tempo serve per una landing ads?",
        answer:
          "Con testi, logo e prove pronti, una landing solida si chiude in pochi giorni — non settimane di redesign del sito. Il collo di bottiglia è il brief campagna, non il codice.",
      },
    ],
    related: [
      { label: "Servizio landing per campagne ads", href: "/servizi/landing-ads" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "above-the-fold-headline-prova-cta-unica",
    service: "landing-ads",
    title:
      "Above the fold landing ads: headline, prova e una sola CTA",
    description:
      "Nei primi secondi decidi se il click ads vale. Come organizzo headline, prova sociale e call to action unica sopra la piega — senza menu e senza clutter.",
    date: "2026-06-21",
    keywords: [
      "above the fold landing page",
      "headline landing ads",
      "CTA unica conversione",
      "prova sociale landing",
      "landing page mobile",
    ],
    intro:
      "Sul telefono «sopra la piega» sono pochi centimetri. Chi arriva da un annuncio non scorre per curiosità: decide se restare. Progetto quell’above-the-fold come un contratto in tre pezzi: cosa offri, perché fidarsi, cosa fare adesso. Vantaggi, FAQ e dettagli stanno sotto.",
    sections: [
      {
        heading: "Headline = promessa dell’annuncio, non un nuovo slogan",
        paragraphs: [
          "Se l’ads dice «Preventivo tetto in 24 ore a Udine», l’H1 non può essere «Soluzioni edilizie di qualità». Quasi letterale, stessa parola chiave o stesso beneficio. La persona deve pensare: sono nel posto giusto.",
          "Sotto, una riga di supporto: per chi è, in quanto tempo, senza jargon. Niente «eccellenza» o «passione». Preferisco tempi, zone, condizioni chiare.",
        ],
      },
      {
        heading: "Prova subito, non dopo lo scroll",
        paragraphs: [
          "Stelle Google, citazione corta, logo clienti, anni di attività — qualcosa di verificabile nello stesso blocco hero. Non un badge fluttuante: una riga di fiducia sotto o affianco alla headline.",
          "Se non hai ancora recensioni, uso prove alternative: garanzia concreta, anteprima del processo («ti richiamo entro un giorno lavorativo»). Meglio una prova debole ma vera che social proof inventata.",
        ],
      },
      {
        heading: "Una CTA primaria. Punto.",
        paragraphs: [
          "Form, WhatsApp, PDF e «chiama ora» nello stesso hero = paralisi. Scelgo un’azione allineata all’obiettivo campagna. WhatsApp o telefono possono stare sotto, più piccoli — non come gemelli uguali.",
          "Il bottone ha un verbo: «Richiedi il preventivo», «Prenota la call», «Iscriviti». Niente «Invia». Form corto: 3–5 campi. Ogni campo in più costa conversioni e quindi CPC.",
        ],
      },
      {
        heading: "Cosa tolgo di proposito",
        paragraphs: [
          "Menu completo, caroselli autoplay, pop-up al primo secondo, video con audio, slider di testimonianze pesanti. Sulla landing ads il rumore costa click.",
          "Anche il logo linkato alla homepage è un’uscita: a volte lo lascio non cliccabile, o lo mando a una pagina soft solo dopo la conversione. Sembra drastico; sul cold traffic funziona.",
        ],
      },
      {
        heading: "Sotto la piega: obiezioni, non romanzo aziendale",
        paragraphs: [
          "Dopo l’hero: benefici, tre step di come funziona, FAQ su prezzo, tempi, zona, impegno. Non la storia del brand per intero. Chi vuole approfondire lo fa dopo aver lasciato il contatto — o da una pagina linkata in conferma.",
          "Se vuoi che progetti l’above-the-fold sulla prossima campagna, sul servizio landing ads e da contatti partiamo dall’annuncio reale: screenshot e obiettivo. Da lì nasce l’hero, non da un moodboard.",
        ],
      },
    ],
    faq: [
      {
        question: "Il form deve stare per forza sopra la piega?",
        answer:
          "Su mobile sì, o almeno la CTA che porta al form. Su desktop posso affiancare testo e form. L’azione primaria deve essere visibile senza indovinare.",
      },
      {
        question: "Quante parole può avere la headline?",
        answer:
          "Poche: una riga e mezza al massimo sul telefono. Condizioni e asterischi in microcopy sotto, non nell’H1.",
      },
      {
        question: "Posso mettere WhatsApp come seconda CTA?",
        answer:
          "Sì, con gerarchia chiara: primaria grande, WhatsApp secondario. Se Meta ottimizza per messaggi, WhatsApp diventa la primaria — una sola storia.",
      },
      {
        question: "Serve una foto hero full-bleed?",
        answer:
          "Se rafforza l’offerta (prodotto, luogo, risultato), sì. Se è stock generico, spesso un layout tipografico con prova sociale converte di più e pesa di meno.",
      },
    ],
    related: [
      { label: "Landing per campagne ads", href: "/servizi/landing-ads" },
      { label: "Parliamone", href: "/contatti" },
    ],
  },
  {
    slug: "tracking-pixel-consenso-thank-you-landing-ads",
    service: "landing-ads",
    title:
      "Tracking landing ads: pixel, consenso cookie e thank-you che non mentono",
    description:
      "Senza eventi puliti ottimizzi al buio. Come imposto Meta Pixel, tag Google, consenso e pagina di ringraziamento — senza rompere la privacy né doppiare le conversioni.",
    date: "2026-06-22",
    keywords: [
      "tracking landing page",
      "Meta Pixel consenso",
      "Google Ads conversione thank you",
      "cookie consent campagne",
      "misurazione lead ads",
    ],
    intro:
      "Una landing bella senza tracking è un’auto senza cruscotto. Per Google e Meta preparo sempre tre pezzi insieme: pixel o tag, gestione del consenso, thank-you dove parte l’evento di conversione. Non sono dettagli da chiudere dopo: sono ciò che permette all’algoritmo di trovare persone simili a chi ti ha già scritto.",
    sections: [
      {
        heading: "Eventi che contano (e quelli che confondono)",
        paragraphs: [
          "Non traccio ogni scroll come conversione. Definisco un evento primario — Lead, Purchase, Schedule — allineato a ciò che paghi. Un click sul bottone non è una lead se il form non è inviato.",
          "Eventi intermedi (ViewContent, inizio form) servono alla diagnostica. L’ottimizzazione della campagna resta agganciata all’azione di valore. Meglio poche conversioni vere che mille micro-segnali rumorosi.",
        ],
      },
      {
        heading: "Pixel e tag: installazione sobria",
        paragraphs: [
          "Meta Pixel / Conversions API e Google tag li carico in modo controllato: consent mode o caricamento dopo il consenso, a seconda dello stack. Evito dieci script marketing «tanto per». Ogni third-party pesa su velocità e compliance.",
          "Per PMI e clienti in Friuli che gestiscono Ads da soli documento dove sta il pixel, quale evento usa, come verificarlo con i debugger ufficiali. Così quando cambia il media buyer non riparti da zero.",
        ],
      },
      {
        heading: "Consenso: la landing non è zona franca",
        paragraphs: [
          "Cookie di profilazione o pixel ads richiedono banner chiaro, scelte reali, e niente tracking marketing prima del consenso dove la norma lo chiede. Non faccio il consulente legale: allineo la pagina a un flusso onesto e collego gli script di conseguenza.",
          "Errori tipici: thank-you che spara la conversione anche con cookie ads rifiutati; banner solo sulla homepage e landing nuda. Campagna e privacy vivono sulla stessa URL.",
        ],
      },
      {
        heading: "Thank-you page: dove nasce il segnale vero",
        paragraphs: [
          "Dopo l’invio mando a una URL dedicata (`/grazie-preventivo`), non a un alert JavaScript. Lì: conferma, prossimi step, e — se il consenso lo permette — evento di conversione una sola volta. Niente reload che doppia i conteggi.",
          "Su quella pagina posso aggiungere un soft next step (WhatsApp, calendario) senza far sembrare che la conversione non sia ancora avvenuta. L’algoritmo ha il segnale; l’utente ha cura.",
        ],
      },
      {
        heading: "UTM e naming: igiene che paga dopo",
        paragraphs: [
          "UTM coerenti su ogni ads. In analytics distinguo landing A da landing B. Nomi campagna tipo «test1» o «asdf» tra un mese non ti dicono nulla.",
          "Se ti serve una landing con tracking pronto per Meta e Google, sul servizio landing ads e da contatti mi passi accesso tag manager / pixel (o li creo io) e l’obiettivo di conversione. Partiamo da lì, non dal colore del bottone.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve Google Tag Manager obbligatoriamente?",
        answer:
          "Non sempre. Su stack semplici inserisco i tag in modo diretto. GTM aiuta con più tool o media buyer esterni: meno deploy a ogni modifica.",
      },
      {
        question: "Conversions API di Meta è obbligatoria?",
        answer:
          "Sempre più utile con i limiti dei cookie. Non è magia: serve integrazione affidabile e gli stessi eventi del pixel. La valuto su volume campagna e stack.",
      },
      {
        question: "Posso tracciare WhatsApp come conversione?",
        answer:
          "Sì, con click-to-WhatsApp o evento sul tap, ma è più debole di form + thank-you. Se Meta ottimizza per messaggi, allineo tracking e obiettivo — non invento lead false.",
      },
      {
        question: "Il consenso abbassa le conversioni misurate?",
        answer:
          "Può ridurre gli eventi tracciati, ed è corretto. Meglio un numero onesto. Si mitiga con CAPI e qualità del traffico, non bypassando il banner.",
      },
    ],
    related: [
      { label: "Servizio landing ads", href: "/servizi/landing-ads" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "core-web-vitals-velocita-landing-risparmio-ads",
    service: "landing-ads",
    title:
      "Velocità e Core Web Vitals sulla landing: smettere di bruciare budget ads",
    description:
      "LCP alto costa bounce e click sprecati. Cosa ottimizzo sulle landing ads — immagini, JS, font, third-party — perché Google e Meta rendano di più.",
    date: "2026-06-23",
    keywords: [
      "Core Web Vitals landing page",
      "velocità landing ads",
      "LCP CLS INP landing",
      "ottimizzazione velocità conversione",
      "performance landing mobile",
    ],
    intro:
      "Paghi il click. La pagina ci mette troppo ad apparire. La persona se ne va. Non è «un po’ di attesa»: è budget bruciato. Sulle landing per campagne tratto la velocità come parte della conversione, non come optional da Lighthouse a fine progetto.",
    sections: [
      {
        heading: "LCP: la prima impressione misurata",
        paragraphs: [
          "Largest Contentful Paint — di solito hero o blocco titolo — deve arrivare in fretta sul mobile 4G. Immagini compresse, formati moderni, dimensioni corrette, priorità sul LCP. Niente slider pesanti above the fold.",
          "Evito hero video autoplay e background da megabyte. Se serve atmosfera, la costruisco con tipografia, colore e una foto leggera. Su una landing ads la stock gigante raramente paga il peso.",
        ],
      },
      {
        heading: "CLS: il bottone che non deve ballare",
        paragraphs: [
          "Banner cookie, font o immagini senza dimensioni spostano la CTA mentre l’utente sta per toccarla: perdi conversioni e alzi il Cumulative Layout Shift. Riservo spazio al cookie bar, imposto width/height, carico i font senza reflow aggressivi.",
          "Popup al load sono nemici del CLS e della pazienza. Se proprio servono, li ritardo e li dimensiono in modo prevedibile.",
        ],
      },
      {
        heading: "INP e JavaScript: meno librerie, più risposta",
        paragraphs: [
          "Interaction to Next Paint soffre con JS inutile: animazioni decorative, caroselli, chat di terze parti caricate subito, tag marketing non deferrati. Bundle stretto: form, tracking consentito, poco altro.",
          "Le animazioni che uso sono leggere e orientate alla gerarchia. Un form che risponde in un battito batte qualsiasi parallasse.",
        ],
      },
      {
        heading: "Hosting, cache e third-party",
        paragraphs: [
          "Anche una pagina ben scritta diventa lenta con hosting pigro o dieci pixel marketing. CDN adatta, cache, third-party dopo il consenso o in defer. Un tag «che non si sa mai» spesso vale meno del tempo che ruba.",
          "In Friuli Venezia Giulia il traffico ads è soprattutto mobile, reti mediocri, pausa pranzo o auto fermata. Progetto pensando a quello, non al Wi‑Fi dell’ufficio.",
        ],
      },
      {
        heading: "Veloce e chiara — o non basta",
        paragraphs: [
          "Landing veloce con messaggio confuso non salva la campagna. Landing lenta con messaggio perfetto la ammazza. Chiudo entrambe: above-the-fold chiaro e performance misurata prima del go-live ads.",
          "Se la tua pagina «funziona sui desktop dell’agenzia» ma i report mobile piangono, sul servizio landing ads e da contatti mandami l’URL e i CPC medi: spesso un intervento mirato su LCP e form rende più di un aumento di budget.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo mirare a 100/100 su Lighthouse?",
        answer:
          "No. Miriamo a Vital buoni sul campo (CrUX, Search Console, telefono reale). Un 100 senza conversioni non serve; un 85 con CTA chiara e LCP solido sì.",
      },
      {
        question: "Le animazioni sono vietate?",
        answer:
          "No, se sono leggere e non bloccano input o LCP. Evito librerie pesanti solo per far entrare fade i paragrafi.",
      },
      {
        question: "Un builder drag-and-drop può bastare?",
        answer:
          "A volte per test rapidi. Su spend serio preferisco codice controllato: meno bloat, tracking più pulito, Vital più prevedibili.",
      },
      {
        question: "La velocità influenza il Quality Score?",
        answer:
          "Indirettamente sì: esperienza post-click migliore, meno abbandoni, segnali di qualità più solidi. Non è l’unico fattore, ma su mobile pesa.",
      },
    ],
    related: [
      { label: "Landing per campagne ads", href: "/servizi/landing-ads" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "ab-test-varianti-landing-senza-rifare-sito",
    service: "landing-ads",
    title:
      "A/B test landing ads: varianti di headline e CTA senza rifare il sito",
    description:
      "Come strutturo test A/B su landing — copy, hero, form — con URL dedicate, senza toccare il sito vetrina né bloccare le campagne Google o Meta.",
    date: "2026-06-24",
    keywords: [
      "A/B test landing page",
      "varianti landing ads",
      "test headline CTA",
      "esperimento conversione Google Meta",
      "landing page test",
    ],
    intro:
      "Molti congelano le campagne perché «dobbiamo rifare il sito». Non serve. Per capire se converte meglio «Preventivo in 24 ore» o «Sopralluogo gratuito» preparo varianti della landing — non un redesign aziendale. Ipotesi piccole, misurabili, reversibili: una leva alla volta, dati invece di opinioni in riunione.",
    sections: [
      {
        heading: "Cosa testare (e cosa lasciare stare)",
        paragraphs: [
          "Priorità: headline, sotto-headline, copy CTA, lunghezza form, una prova sociale specifica, hero image vs layout tipografico. Bassa priorità all’inizio: colore esatto del bottone, font secondari, micro-animazioni.",
          "Un test alla volta. Se cambi headline e form insieme, non sai cosa ha mosso il tasso. Meglio due settimane pulite su una variabile che un mese di caos.",
        ],
      },
      {
        heading: "Due path, stesso scheletro — sito vetrina intatto",
        paragraphs: [
          "Due URL (`/offerta-a`, `/offerta-b`) o parametri sulla stessa base di componenti. Gli annunci puntano alla variante in test; in remarketing uso la vincitrice.",
          "Riuso layout, stili, tracking: cambio contenuti e, se serve, un blocco. Non duplico il progetto. Quando una variante vince, promuovo quel copy sulla URL stabile della campagna.",
        ],
      },
      {
        heading: "Volume piccolo: niente conclusioni da dodici lead",
        paragraphs: [
          "Con budget tipici delle PMI locali serve pazienza o test più grossolani — A vs B su Meta con ad set separati e landing dedicate. Dichiaro in anticipo metrica primaria (lead complete, costo per lead) e durata minima.",
          "Se il volume è bassissimo, a volte faccio test sequenziale: una variante per due settimane, poi l’altra, creatività e audience il più possibile stabili. Non è laboratorio universitario, ma batte il «secondo me».",
        ],
      },
      {
        heading: "Allineare ads e variante",
        paragraphs: [
          "Se la landing B parla di «prova gratuita», l’annuncio B deve dirlo. Altrimenti misuri un mismatch, non un copy migliore. Chiedo di clonare l’ads allineata, non di lasciare lo stesso creative su URL diverse e sperare.",
          "Su Google: experiment o due gruppi di annunci. Su Meta: ad set o Advantage con URL distinte e naming chiaro. Il report deve rispondere: quale URL ha il costo per lead più basso a qualità uguale?",
        ],
      },
      {
        heading: "Dopo il test: scrivere e archiviare",
        paragraphs: [
          "Cosa abbiamo testato, risultato, decisione. URL perdenti: noindex o redirect. Tra sei mesi non ripeti lo stesso esperimento perché «non ci ricordavamo».",
          "Se vuoi partire con due varianti sulla prossima campagna, sul servizio landing ads e da contatti mi mandi offerta, audience e budget giornaliero: ti dico se ha senso un A/B formale o un’unica landing ben fatta da iterare dopo i primi dati.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve uno strumento tipo Google Optimize?",
        answer:
          "Non per forza. Due URL e split del traffico in piattaforma ads bastano spesso. Tool avanzati hanno senso con volumi alti e team marketing strutturati.",
      },
      {
        question: "Posso A/B testare un form multipasso?",
        answer:
          "Sì: uno step vs tre è un test classico. Non cambiare insieme campi e copy CTA — una leva per esperimento.",
      },
      {
        question: "Quanto budget minimo per un test serio?",
        answer:
          "Dipende da CPC e tasso atteso. Serve abbastanza conversioni per non decidere sul rumore. Se spendi pochissimo, sistema prima messaggio e velocità, poi testi.",
      },
      {
        question: "La variante B può essere più lunga?",
        answer:
          "Sì, se l’ipotesi è «serve più rassicurazione». A volte vince la corta; a volte un settore scettico vuole FAQ e prove. Lo decide il test, non il gusto estetico.",
      },
    ],
    related: [
      { label: "Servizio landing per campagne ads", href: "/servizi/landing-ads" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
