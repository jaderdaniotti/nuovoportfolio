import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * Sito 48/72 ore — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Ogni pezzo ha angolo, esempi e FAQ distinti. Niente filler da template.
 */
export const sito48hPosts = [
  {
    slug: "cosa-include-davvero-sito-48-72-ore",
    service: "sito-48h",
    title: "Cosa include davvero un sito in 48/72 ore (e cosa resta fuori)",
    description:
      "Perimetro onesto del percorso express: struttura, contenuti tuoi, go-live — senza redesign da zero, e-commerce o promesse che non stanno in due giorni.",
    date: "2026-06-30",
    keywords: [
      "sito in 48 ore",
      "sito web 72 ore",
      "sito express cosa include",
      "sito web veloce Italia",
      "jaderweb sito 48h",
    ],
    intro:
      "«Sito in 48 ore» suona da slogan. Io lo uso come finestra di lavoro, non come magia. Parte quando i materiali sono pronti e chiude con un sito che prende chiamate — non con un moodboard infinito. Qui ti dico cosa c’è dentro e cosa no, così non compri un’aspettativa sbagliata.",
    sections: [
      {
        heading: "Il timer non parte dalla prima email",
        paragraphs: [
          "Prima allineiamo obiettivo, struttura e file. Solo quando logo, testi e foto sono sul tavolo (o abbiamo dichiarato i buchi) conto le ore. Una chat «magari la prossima settimana» non è kick-off.",
          "Se il dominio manca o l’hosting è un labirinto, lo sistemiamo prima. Preferisco due giorni di preparazione e uno sprint pulito che fingere di essere già «in 48h» mentre aspettiamo accessi.",
        ],
      },
      {
        heading: "Cosa costruisco nello sprint",
        paragraphs: [
          "Homepage, servizi, chi sono/siamo se serve, contatti con form o WhatsApp, privacy di base. Responsive, immagini leggeri, meta essenziali, CTA evidenti. Adatto colori e tipografia al brand che già hai — non invento un’identità da zero.",
          "La struttura è collaudata. Le ore vanno in contenuti, gerarchia e pubblicazione, non in inventare layout ogni volta. Per una vetrina locale che deve lavorare subito, è il pezzo giusto.",
        ],
      },
      {
        heading: "Cosa resta fuori (e lo dico subito)",
        paragraphs: [
          "Fuori: copy lungo da blank page, shooting, restyling logo, tre concept da votare, e-commerce, area riservata, CRM, funnel ads, blog editoriale. Possono arrivare dopo, in un lotto separato.",
          "Se mi chiedi «tutto custom ma in 72 ore», ti dico di no. Meglio un no chiaro che un sì che diventa tre settimane di eccezioni non pagate né dichiarate.",
        ],
      },
      {
        heading: "Feedback: un giro mirato, non revisioni a oltranza",
        paragraphs: [
          "Nello sprint c’è spazio per correggere testi, foto e dettagli visivi. Non c’è spazio per rifare la homepage perché «magari orizzontale». Quello è un progetto custom.",
          "Chi decide in giornata chiude lo sprint. Chi ha dieci approvatori interni spezza il timer — e va bene, ma allora cambiamo percorso.",
        ],
      },
      {
        heading: "Dopo il go-live non sparisco",
        paragraphs: [
          "Consegno un sito utilizzabile, non un MVP da scusarsi. Nelle settimane dopo si può stringere SEO locale, CTA, una pagina in più. L’express ti mette online; l’evoluzione è scelta, non obbligo nascosto nel prezzo.",
          "Se vuoi il dettaglio del servizio o capire se il tuo caso ci sta, parti da contatti con elenco materiali. Ti rispondo sì, no, o «sì dopo questa preparazione».",
        ],
      },
    ],
    faq: [
      {
        question: "Le 48/72 ore partono dal primo messaggio?",
        answer:
          "No. Partono dal kick-off con materiali completi (o eccezioni dichiarate). Prima c’è un allineamento breve.",
      },
      {
        question: "Posso chiedere modifiche illimitate nello sprint?",
        answer:
          "No. Un giro mirato su contenuti e personalizzazione. Iterazioni di design profonde = progetto custom.",
      },
      {
        question: "Il sito express è «definitivo»?",
        answer:
          "È professionale e pronto a lavorare. Poi puoi evolverlo. Online subito non significa bloccato per sempre.",
      },
      {
        question: "Hosting e dominio sono inclusi?",
        answer:
          "Li allineiamo in kick-off. Se il dominio è tuo, lo colleghiamo; se manca pezzi infrastrutturali, li chiudiamo prima del timer.",
      },
    ],
    related: [
      { label: "Servizio sito in 48/72 ore", href: "/servizi/sito-48h" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "checklist-materiali-sito-express-senza-blocchi",
    service: "sito-48h",
    title:
      "Checklist materiali sito express: cosa preparare per non bloccare lo sprint",
    description:
      "Logo, testi, foto, contatti, dominio e legali: la lista secca che uso prima delle 48/72 ore, così lo sprint non si ferma a metà per un file mancante.",
    date: "2026-07-01",
    keywords: [
      "checklist materiali sito web",
      "preparare contenuti sito",
      "logo foto testi sito",
      "sito express materiali",
      "sito veloce senza blocchi",
    ],
    intro:
      "Lo sprint muore quasi sempre allo stesso posto: «ti mando i testi domani» che diventa venerdì. Io parto solo con una checklist chiusa. Se manca pezzi, aspettiamo due giorni e partiamo puliti — meglio che consegnare buchi.",
    sections: [
      {
        heading: "Identità: file che non si sgranano",
        paragraphs: [
          "Logo PNG trasparente e, se ce l’hai, SVG o PDF vettoriale. Palette anche grezza (esadecimali o campioni da biglietto). Font brand se li usi già; altrimenti ne scelgo una coppia coerente con il modello.",
          "Favicon o logo ritagliabile in quadrato. Un JPEG compresso tre volte su WhatsApp si vede. Possiamo partire, ma la resa grafica ne risente — meglio dirlo prima.",
        ],
      },
      {
        heading: "Testi: abbastanza per una vetrina seria",
        paragraphs: [
          "Headline, sottotitolo, tre–sei servizi con titolo e poche righe, bio breve, contatti (telefono, email, indirizzo, orari, social). Non serve un romanzo. Serve chiarezza.",
          "Bozze Word o note telefono vanno bene: le metto in pagina. Se i testi mancano del tutto, o li scriviamo prima, o usiamo placeholder — ma allora il «finito in 48h» non vale sul go-live pieno.",
        ],
      },
      {
        heading: "Foto reali, non colli di bottiglia",
        paragraphs: [
          "Poche foto nitide dell’attività, del team, dei lavori battono venti stock. Originali, non screenshot Instagram ricompressi. Video hero? Dimmi peso e dove sta (Drive, WeTransfer).",
          "Io comprimo e ritaglio. Nello sprint non invento uno shooting. Stock di emergenza sì; autenticità locale no, se non me la dai.",
        ],
      },
      {
        heading: "Dominio, form, legali",
        paragraphs: [
          "Accesso al registrar (o decisione su nuovo dominio). Dove arrivano le richieste: email, WhatsApp, entrambi. Privacy e cookie: se hai un testo lo adatto; se no, base da vetrina semplice.",
          "Stessi numeri e orari di Google Business e WhatsApp Business. Coerenza NAP = meno confusione per chi ti cerca in zona.",
        ],
      },
      {
        heading: "Come chiudiamo la checklist",
        paragraphs: [
          "Ti mando un elenco barrabile. Al 100% (o con eccezioni scritte) avviamo. A metà sprint senza «servizio 4» metto in pausa il timer: preferisco dirlo che pubblicare un buco.",
          "Dubbi su cosa hai già in cartella? Quindici minuti di check bastano spesso a riordinare, non a produrre da zero. Scrivimi da contatti.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso partire con testi incompleti?",
        answer:
          "Solo se concordiamo placeholder e data di integrazione. Quelle ore non contano come sito finito al 100%.",
      },
      {
        question: "Le foto da smartphone vanno bene?",
        answer:
          "Sì se nitide, illuminate e pertinenti. Meglio il tuo negozio reale di uno stock perfetto e falso.",
      },
      {
        question: "Devo avere già il dominio?",
        answer:
          "Ideale sì. Altrimenti lo registriamo o trasferiamo prima del publish. Senza dominio resta solo un’anteprima.",
      },
      {
        question: "Cosa fare se il logo è ancora una bozza?",
        answer:
          "Possiamo pubblicare con quello che c’è e sostituirlo dopo. Te lo segno come limite, non come sorpresa a fine sprint.",
      },
    ],
    related: [
      { label: "Sito in 48/72 ore", href: "/servizi/sito-48h" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "velocita-vs-design-custom-trade-off-sito-express",
    service: "sito-48h",
    title:
      "Velocità vs design custom: i trade-off reali del sito express",
    description:
      "Cosa guadagni e cosa lasci sul tavolo scegliendo 48/72 ore invece di un progetto su misura — criteri pratici, senza venderti l’unicità assoluta in un weekend.",
    date: "2026-07-02",
    keywords: [
      "sito web veloce vs custom",
      "template vs design su misura",
      "trade-off sito express",
      "design personalizzato sito",
      "quando scegliere sito express",
    ],
    intro:
      "Non puoi avere tutto subito: o comprimi i tempi, o apri spazio al design su misura. Io non vendo illusioni. Ti spiego i trade-off dell’express così scegli a occhi aperti — e non mi chiedi tre homepage alternative dentro uno sprint da due giorni.",
    sections: [
      {
        heading: "Cosa guadagni con la velocità",
        paragraphs: [
          "Online in tempi certi. Meno riunioni. Meno decisioni estetiche infinite. Un sito che raccoglie form e chiamate mentre altri sono ancora in «bozza hero».",
          "Se hai già brand e contenuti, è leva commerciale: la presenza web smette di essere un progetto aperto. Io valorizzo questo, non il wow grafico fine a sé stesso.",
        ],
      },
      {
        heading: "Cosa rinunci (senza giudizi di valore)",
        paragraphs: [
          "Rinunci a layout inventati da zero, micro-interazioni uniche, esplorazioni tipografiche lunghe, concept multipli da votare in comitato. Personalizzazione sì — colori, foto, tono, sezioni — dentro un’architettura già pensata.",
          "Se il tuo vantaggio passa da un’esperienza web unica (portfolio art direction, prodotto digitale, brand luxury), l’express è stretto. Serve custom con tempi e budget diversi.",
        ],
      },
      {
        heading: "Il modello non è «logo sul template»",
        paragraphs: [
          "Adatto gerarchia, CTA, ritmo e prove sociali. Un artigiano e un commercialista non escono uguali. La differenza col custom è dove spendiamo le ore: esecuzione e contenuti, non reinvenzione strutturale.",
          "Per molte attività locali che devono farsi trovare e contattare, è esattamente ciò che serve — non un compromesso da nascondere.",
        ],
      },
      {
        heading: "Tre domande per scegliere",
        paragraphs: [
          "Materiali pronti? Online questa settimana o questo mese? Ti serve presenza + contatto o esperienza di brand? Sì / questa settimana / presenza → express. Altrimenti apriamo un altro percorso.",
          "Puoi anche fare express ora e custom dopo: prima vendi e comunichi, poi investiamo in profondità. È sequenza, non downgrade.",
        ],
      },
      {
        heading: "Come evito i rimpianti",
        paragraphs: [
          "Metto i limiti in preventivo. Se a metà sprint emerono «vorrei un’animazione custom», fermiamo e ricalcoliamo — non mischiamo i due modelli fingendo che sia ancora express.",
          "Dubbio? Mandami due frasi sul tuo obiettivo e i materiali che hai. Ti dico quale strada ha senso, anche se non è quella da 48 ore.",
        ],
      },
    ],
    faq: [
      {
        question: "Il sito express si riconosce come template?",
        answer:
          "Si riconosce come struttura solida. Con foto e testi veri diventa il tuo sito. Unicità assoluta di layout = custom.",
      },
      {
        question: "Posso passare al custom a metà sprint?",
        answer:
          "Sì, ma si ricalcolano tempi e scope. Meglio decidere prima: mischiare i modelli spezza le aspettative.",
      },
      {
        question: "La SEO soffre con l’express?",
        answer:
          "No se titoli, meta, velocità e contenuti locali sono curati. Una strategia editoriale di mesi non entra in 48 ore: arriva dopo.",
      },
      {
        question: "Posso personalizzare colori e font?",
        answer:
          "Sì, entro il modello. Non invento un sistema tipografico da zero nello stesso sprint.",
      },
    ],
    related: [
      { label: "Percorso sito 48/72 ore", href: "/servizi/sito-48h" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "dopo-il-lancio-miglioramenti-settimane-2-4",
    service: "sito-48h",
    title:
      "Dopo il lancio: cosa migliorare nelle settimane 2–4 senza rifare tutto",
    description:
      "Online non è finito. Micro-fix, SEO locale, CTA e piccoli upgrade tipici dopo un sito express — senza redesign ogni tre giorni.",
    date: "2026-07-03",
    keywords: [
      "ottimizzare sito dopo lancio",
      "migliorare sito web settimane",
      "SEO locale dopo go-live",
      "conversioni sito vetrina",
      "evoluzione sito express",
    ],
    intro:
      "Pubblicare in 48/72 ore è la partenza, non il traguardo. Nelle settimane 2–4 guardo dati reali, aggiusto copy e CTA, rafforzo la presenza locale. Senza rifare il sito — solo migliorando ciò che già lavora.",
    sections: [
      {
        heading: "Settimana 2: ascolto e micro-fix",
        paragraphs: [
          "Da dove arrivano le visite, quali pagine tengono, dove abbandonano. Form vuoto? Spesso CTA confusa o telefono nascosto su mobile — non «design sbagliato».",
          "Sistemo testi deboli, aggiungo una FAQ mirata, porto WhatsApp/telefono in evidenza se il tuo pubblico chiama più di quanto scrive.",
        ],
      },
      {
        heading: "Settimana 3: SEO locale e coerenza",
        paragraphs: [
          "Allineo NAP con Google Business, eventuale sezione zona se servi provincia, recensioni vere se le hai. Niente blog da venti articoli vuoti.",
          "Coerenza batte volume: stessi orari, stessi servizi, stessi contatti. È SEO che un express guadagna in fretta.",
        ],
      },
      {
        heading: "Settimana 4: upgrade ad alto ritorno",
        paragraphs: [
          "Galleria lavori, case study corto, landing promo, schema base, tracking sul form, una pagina servizio rimasta fuori al lancio.",
          "Qui scegli: evoluzione leggera o lotto custom (prenotazioni, preventivi, area clienti). Il dominio è già caldo — non parti da zero.",
        ],
      },
      {
        heading: "Cosa non fare nelle prime settimane",
        paragraphs: [
          "Non rifare la homepage ogni tre giorni. Non aggiungere plugin a caso. Non sparare ads su una pagina ancora confusa. Prima chiarezza e contatto, poi traffico a pagamento.",
          "Preferisco tre–cinque interventi prioritari, non un backlog infinito. Meno rumore, più segnale misurabile.",
        ],
      },
      {
        heading: "Come lo facciamo insieme",
        paragraphs: [
          "Una lista corta, stime oneste, interventi a pacchetto. Se nelle prime settimane emergono bisogni da prodotto (booking, CRM), li nomino e li spostiamo su un percorso dedicato.",
          "Hai appena pubblicato o stai per farlo? Scrivimi da contatti e impostiamo il ciclo 2–4 senza reinventare tutto.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo aspettare mesi prima di toccare il sito?",
        answer:
          "No. Le settimane 2–4 sono ideali per micro-miglioramenti. I redesign grandi dopo dati reali.",
      },
      {
        question: "Serve Analytics obbligatoriamente?",
        answer:
          "Utile, in modo leggero e privacy-aware. Form e chiamate ti dicono già molto anche senza dashboard complesse.",
      },
      {
        question: "Posso aggiungere un blog dopo?",
        answer:
          "Sì, con un piano minimo. Un blog vuoto al giorno zero non aiuta nessuno.",
      },
      {
        question: "Questi upgrade sono inclusi nello sprint express?",
        answer:
          "Lo sprint chiude col go-live. Le settimane 2–4 sono un lotto evolutivo separato, anche piccolo — meglio dichiararlo che nasconderlo.",
      },
    ],
    related: [
      { label: "Servizio sito express", href: "/servizi/sito-48h" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "chi-non-dovrebbe-scegliere-sito-express",
    service: "sito-48h",
    title: "Chi non dovrebbe scegliere il sito in 48/72 ore",
    description:
      "Onestà commerciale: profili e situazioni in cui l’express non è adatto — e cosa fare al posto suo senza forzare un timer impossibile.",
    date: "2026-07-04",
    keywords: [
      "sito express non adatto",
      "quando non fare sito veloce",
      "progetto web custom",
      "scelta percorso sito web",
      "alternativa sito 48 ore",
    ],
    intro:
      "Preferisco perdere un preventivo express che consegnare il percorso sbagliato. Le 48/72 ore funzionano, ma non per tutti. Se ti riconosci qui sotto, ti dico di scegliere un’altra strada — e quale.",
    sections: [
      {
        heading: "Non hai ancora brand né contenuti",
        paragraphs: [
          "Niente logo, niente foto, offerta confusa, testi «vediamo dopo»: lo sprint diventa un cantiere di copy e brand. Quello non è express — è fondazione.",
          "Prima messaggi e materiali, poi go-live veloce se serve. Invertire produce un sito vuoto online in fretta e delusione altrettanto veloce.",
        ],
      },
      {
        heading: "Ti serve un prodotto, non una vetrina",
        paragraphs: [
          "Prenotazioni complesse, preventivi multi-step, area clienti, cataloghi filtrati, pagamenti, multi-sede con logiche diverse: non entrano in due–tre giorni senza tagliare pezzi essenziali.",
          "Propongo fasi: presenza chiara, poi sistema. O un progetto dedicato da subito. L’express non comprime mesi di prodotto in un weekend.",
        ],
      },
      {
        heading: "Vuoi esplorare design senza vincoli",
        paragraphs: [
          "Moodboard, tre concept, animazioni custom, revisioni estetiche a oltranza: l’express ti frustrerà. Quel lavoro ha valore — con tempo e budget diversi.",
          "Non nascondo i limiti: stanno in preventivo. Meglio un custom dichiarato che un express gonfiato di eccezioni.",
        ],
      },
      {
        heading: "Approvazioni lente o troppi stakeholder",
        paragraphs: [
          "Comitati, agenzie esterne, legali che rivedono ogni riga in dieci giorni: il timer non sopravvive. Servono milestone e buffer.",
          "Libero professionista o PMI che decide in giornata? Lì l’express spesso calza. La velocità chiede decisioni, non solo ore di coding.",
        ],
      },
      {
        heading: "Cosa ti propongo al posto suo",
        paragraphs: [
          "Tre alternative: (1) preparazione materiali + express dopo; (2) one-page o landing se ti serve solo una campagna; (3) custom a fasi se ti serve un sistema.",
          "Scrivimi com’è la situazione oggi. Ti dico se le 48/72 ore hanno senso — anche se la risposta è no. Chiarezza prima della velocità.",
        ],
      },
    ],
    faq: [
      {
        question: "Se non sono adatto all’express, rifiuti il lavoro?",
        answer:
          "Rifiuto il percorso sbagliato, non il lavoro. Ti propongo lo scope corretto.",
      },
      {
        question: "Posso fare express solo per una landing?",
        answer:
          "A volte sì, con materiali pronti e obiettivo chiaro. Una landing non è scusa per infilare un CRM nello stesso sprint.",
      },
      {
        question: "Come capisco in cinque minuti se sono nel target?",
        answer:
          "Materiali pronti + presenza/contatto + decisioni rapide = sì. Brand assente o prodotto complesso = no (o non ancora).",
      },
      {
        question: "Posso fare express ora e custom dopo?",
        answer:
          "Sì, ed è spesso la sequenza più sana: online subito, profondità quando i dati e il budget lo chiedono.",
      },
    ],
    related: [
      { label: "Dettagli servizio 48/72 ore", href: "/servizi/sito-48h" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
