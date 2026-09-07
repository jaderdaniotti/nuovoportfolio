import type { ServiceBlogPost } from "@/lib/blog/types";

/**
 * One-page — 5 articoli SEO, voce freelance (io), stile editoriale jaderweb.
 * Onesto sui limiti SEO e di architettura. Niente filler da template.
 */
export const onePagePosts = [
  {
    slug: "quando-basta-un-sito-one-page-e-quando-no",
    service: "one-page",
    title: "Quando basta un sito one-page (e quando ti serve altro)",
    description:
      "Criteri concreti per capire se una sola pagina è abbastanza — e quando invece una one-page diventa un compromesso che confonde clienti e Google.",
    date: "2026-06-25",
    keywords: [
      "sito one page",
      "quando scegliere one page",
      "one page vs multipagina",
      "sito una pagina",
      "freelance web",
    ],
    intro:
      "«Mi basta una pagina sola?» Me lo chiedono quasi ogni settimana. La risposta onesta non è un sì da catalogo: dipende da cosa vendi, da quante intenzioni diverse ha chi arriva, e da quanto materiale sei disposto a tenere aggiornato. Io dico sì solo quando la one-page è lo strumento giusto — e no quando rischia di diventare uno scroll infinito mascherato da «sito moderno».",
    sections: [
      {
        heading: "Funziona quando l’offerta è una",
        paragraphs: [
          "Se fai una cosa principale — consulenza, intervento locale, un servizio chiaro con un pubblico netto — una one-page spesso basta. Il visitatore deve capire in pochi scroll: chi sei, cosa risolvi, per chi, come contattarti. Punto. Niente labirinto.",
          "Esempi che vedo spesso: professionista agli inizi, artigiano con zona d’intervento definita, attività che vive di passaparola e vuole solo una presenza seria, piccolo studio senza materiale per dieci pagine. Qui la one-page non è povera: è focalizzata.",
        ],
      },
      {
        heading: "Quando una sola pagina non basta",
        paragraphs: [
          "Se hai linee di servizio diverse, pubblici distinti o contenuti che devono vivere da soli in Google, la multipagina vince. Ristorante con menu, eventi e prenotazioni; studio con case study multipli; associazione con calendario e news: comprimere tutto in uno scroll crea confusione e sezioni chilometriche.",
          "Non è questione di prestige. È usabilità. Se il visitatore deve scegliere tra cinque intenzioni diverse, un menu con pagine dedicate lo aiuta meglio di ancore su una pagina che non finisce mai.",
        ],
      },
      {
        heading: "Il test che uso in call",
        paragraphs: [
          "Chiedo tre cose: qual è l’azione principale (chiamata, form, WhatsApp, preventivo)? Quante informazioni minime servono prima di quell’azione? Quanto materiale hai davvero pronto oggi? Se l’azione è una, le info stanno in quattro–sei sezioni e i materiali ci sono, parto one-page.",
          "Se emergono «e poi anche… e poi anche…» senza priorità, fermo tutto e imposto un perimetro. Meglio una pagina forte che una one-page gonfia di pezzi che non aggiornerai mai.",
        ],
      },
      {
        heading: "Partire one-page e crescere dopo",
        paragraphs: [
          "Spesso propongo un percorso a tappe: prima una presenza essenziale che converte, poi pagine extra solo quando i dati o i clienti le chiedono. Non costruisco architetture fantasma «per il futuro» che restano vuote.",
          "Tecnicamente una one-page fatta bene non ti chiude le porte: se un giorno serve /servizi o /portfolio, si aggiunge senza buttare via il lavoro. La decisione iniziale resta onesta verso chi arriva oggi.",
        ],
      },
      {
        heading: "Cosa non ti dico per venderti una one-page",
        paragraphs: [
          "Non ti dico che «Google ama le one-page» — non è vero in assoluto. Non ti dico che è sempre più economica se poi ci ficchi dentro tre attività diverse. Non ti dico che sostituisce un sito strutturato quando hai contenuti reali da far crescere.",
          "Se ti riconosci nel dubbio «basta una pagina?», guarda il servizio one-page: lo progetto solo quando ha senso. Altrimenti ti dico di fare altro.",
        ],
      },
    ],
    faq: [
      {
        question: "La one-page è meno professionale di un sito a più pagine?",
        answer:
          "No. Professionale è chiaro, veloce e coerente col tuo lavoro. Una multipagina vuota o generica è peggio di una sola pagina fatta bene.",
      },
      {
        question: "Posso mettere prezzi e listini in una one-page?",
        answer:
          "Sì, se sono reali e aggiornabili. Se i prezzi cambiano spesso o dipendono dal caso, meglio fasce indicative e un form che chiede i dettagli giusti.",
      },
      {
        question: "Quanto tempo serve per una one-page?",
        answer:
          "Con logo, foto e testi chiari si arriva in tempi contenuti. Il collo di bottiglia di solito non è il codice: sono i contenuti e le decisioni su cosa tenere fuori.",
      },
      {
        question: "Se parto one-page, poi posso aggiungere pagine?",
        answer:
          "Sì. Disegno la struttura pensando a un’eventuale crescita, senza inventare sezioni vuote «per dopo».",
      },
    ],
    related: [
      { label: "Servizio OnePage Start", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "ordine-sezioni-one-page-problema-offerta-prova-cta",
    service: "one-page",
    title: "Ordine sezioni one-page: problema, offerta, prova, CTA",
    description:
      "Come ordinare le sezioni di un sito one-page senza brochure a caso: problema, offerta, prova sociale e una sola chiamata all’azione.",
    date: "2026-06-26",
    keywords: [
      "ordine sezioni one page",
      "struttura sito one page",
      "CTA one page",
      "layout one page",
      "conversione one page",
    ],
    intro:
      "Una one-page non è «tutto quello che so su di me in verticale». È un percorso. Se le sezioni sono nell’ordine sbagliato, la gente scrolla, si annoia e chiude. Io imposto sempre la stessa logica: problema → offerta → prova → azione. Il resto è rumore.",
    sections: [
      {
        heading: "Apri sul problema, non sul curriculum",
        paragraphs: [
          "Le prime righe devono dire a chi serve e perché dovrebbe restare. Non «benvenuti sul mio sito». Non la storia dell’azienda dal 1998. Il visitatore arriva con un dubbio o un bisogno: mostragli che lo hai capito.",
          "Se parti con dieci righi su di te, perdi chi non ha ancora motivo di fidarsi. La bio può stare più sotto, dopo che hai dimostrato di risolvere qualcosa.",
        ],
      },
      {
        heading: "Offerta: cosa fai, per chi, con che confine",
        paragraphs: [
          "Subito dopo: cosa offri in concreto, a chi, e cosa non fai. I confini rassicurano. «Siti per attività locali, non ecommerce da mille SKU» è più utile di «soluzioni digitali complete».",
          "Tre–cinque punti bastano. Se hai bisogno di un listino lungo, forse non è una one-page: è un catalogo che merita pagine dedicate.",
        ],
      },
      {
        heading: "Prova: numeri, nomi, pezzi di lavoro",
        paragraphs: [
          "Dopo l’offerta serve evidenza. Un progetto reale, una frase di un cliente, un prima/dopo, un risultato misurabile. Senza prova la CTA sembra una richiesta a freddo.",
          "Meglio tre prove vere che una griglia di «partner» inventati. Se non hai ancora case study, usa processo e garanzie concrete — non claim vuoti tipo «eccellenza».",
        ],
      },
      {
        heading: "Una CTA, ripetuta dove serve",
        paragraphs: [
          "Una one-page dovrebbe avere un’azione principale: scrivimi, chiedi preventivo, prenota. Quella CTA compare in hero, dopo l’offerta e in chiusura. Non cinque bottoni diversi che competono.",
          "WhatsApp, email e form possono convivere, ma uno deve essere primario. Se tutto è uguale, niente è chiaro.",
        ],
      },
      {
        heading: "Cosa taglio quasi sempre",
        paragraphs: [
          "Sezioni «i nostri valori» senza esempi. Slider di loghi senza link. Timeline aziendali. FAQ di dieci domande che nessuno fa. Meglio uno scroll corto e onesto.",
          "Quando costruisco una one-page imposto questo ordine e poi aggiungo solo ciò che sposta la decisione. Il resto resta fuori — o va in una pagina futura.",
        ],
      },
    ],
    faq: [
      {
        question: "Devo mettere i prezzi sopra o sotto?",
        answer:
          "Se i prezzi sono un filtro utile (fasce chiare), mettili dopo l’offerta. Se variano troppo, meglio un range e il form: evita di spaventare o di mentire.",
      },
      {
        question: "Quante sezioni sono troppe?",
        answer:
          "Oltre sei–sette blocchi sostanziali la one-page diventa un romanzo. Se ti serve di più, spezza in pagine.",
      },
      {
        question: "La bio del fondatore dove va?",
        answer:
          "Dopo prova o vicino alla CTA. Prima conta il problema del cliente, non il tuo percorso.",
      },
      {
        question: "Posso avere due CTA ugualmente importanti?",
        answer:
          "Di solito no. Una primaria, una secondaria soft. Due CTA «uguali» diluiscono i click e confondono.",
      },
    ],
    related: [
      { label: "Servizio OnePage Start", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "ancore-navigazione-one-page-non-brochure-pdf",
    service: "one-page",
    title: "Ancore e navigazione one-page: non è una brochure PDF",
    description:
      "Come usare menu, ancore e scroll su un sito one-page senza trasformarlo in un PDF lungo da sfogliare a caso.",
    date: "2026-06-27",
    keywords: [
      "ancore one page",
      "menu sito one page",
      "navigazione one page",
      "scroll sito una pagina",
      "UX one page",
    ],
    intro:
      "Ho visto one-page che sembravano brochure PDF: menu con otto voci, ancore che saltano a metà frase, scroll infinito senza punti di riposo. Una sola pagina non significa «niente navigazione». Significa navigazione onesta, leggera, al servizio di chi arriva dal telefono.",
    sections: [
      {
        heading: "Il menu deve promettere sezioni vere",
        paragraphs: [
          "Ogni voce del menu deve portare a un blocco con un titolo chiaro e contenuto utile. Se la voce dice «Servizi» e sotto trovi tre paragrafi generici, hai mentito. Meglio quattro ancore vere che otto etichette decorative.",
          "Su mobile il menu hamburger va bene, ma non nascondere l’unica CTA importante solo lì: tienila visibile o ripetila in chiusura.",
        ],
      },
      {
        heading: "Ancore: salti netti, non tremolii",
        paragraphs: [
          "L’ancora deve atterrare sotto l’header fisso, non tagliare il titolo a metà. Sembra un dettaglio tecnico: per l’utente è la differenza tra «sito curato» e «sito fatto di corsa».",
          "Evita animazioni di scroll da otto secondi. Un salto rapido o un movimento breve basta. Lo scroll teatrale stanca chi cerca solo l’indirizzo o il form.",
        ],
      },
      {
        heading: "Non è un PDF: serve gerarchia e aria",
        paragraphs: [
          "Una brochure stampata ha pagine. Una one-page ha ritmo: titoli, spazio bianco, immagini che non strozzano il testo. Se tutto è denso uguale, lo scroll diventa una muraglia.",
          "Spezza con prove, citazioni corte, un pezzo di lavoro. Non con divider colorati a caso. Il respiro visuale è parte della navigazione.",
        ],
      },
      {
        heading: "Deep link e condivisioni",
        paragraphs: [
          "Le ancore devono funzionare come URL: qualcuno può mandarti «tuosito.it/#contatti» e atterrare giusto. Se le ancore sono solo JS fragile, perdi condivisioni e bookmark.",
          "È uno dei motivi per cui non tratto la one-page come un’animazione unica: resta HTML leggibile, linkabili, aggiornabile.",
        ],
      },
      {
        heading: "Quando le ancore non bastano più",
        paragraphs: [
          "Se ti ritrovi con un menu di dieci voci e sezioni da romanzo, non è un problema di design: è un segnale che ti serve una multipagina. Le ancore non risolvono contenuti troppo eterogenei.",
          "In quel caso ti dico di spezzare. Continuare a «one-pagizzare» tutto è comodità mia e tua nel breve, confusione per il cliente nel lungo.",
        ],
      },
    ],
    faq: [
      {
        question: "Quante voci di menu ha senso avere?",
        answer:
          "Di solito tre–cinque. Oltre, o stai nominando pezzi inutili, o la pagina è troppo lunga per restare one-page.",
      },
      {
        question: "Serve uno sticky header?",
        answer:
          "Sì su pagine medie-lunghe, con menu leggero e CTA chiara. No se occupa mezzo schermo mobile.",
      },
      {
        question: "Meglio scroll fluido o salto immediato?",
        answer:
          "Preferisco un movimento breve o un salto netto. Lo scroll «cinematico» lungo sembra figo in demo e irrita in uso reale.",
      },
      {
        question: "Le ancore aiutano la SEO?",
        answer:
          "Poco da sole. Aiutano usabilità e link interni. La SEO seria su temi diversi chiede pagine dedicate, non solo #sezioni.",
      },
    ],
    related: [
      { label: "Servizio OnePage Start", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "form-sito-one-page-attrito-vs-completezza",
    service: "one-page",
    title: "Form sul sito one-page: attrito vs completezza",
    description:
      "Quanti campi mettere nel form di una one-page: abbastanza per qualificarti, non troppi da far abbandonare chi vuole solo scrivere.",
    date: "2026-06-28",
    keywords: [
      "form sito one page",
      "form contatto conversione",
      "campi form sito",
      "preventivo online one page",
      "attrito form web",
    ],
    intro:
      "Il form in fondo alla one-page è dove molti siti muoiono: troppi campi, etichette vaghe, nessun motivo per finire. Oppure troppo pochi campi e ti arrivano messaggi inutili. Io bilancio attrito e completezza — non «più dati possibili».",
    sections: [
      {
        heading: "Cosa ti serve davvero per rispondere",
        paragraphs: [
          "Nome, contatto (email o telefono), e una domanda che filtra: tipo di richiesta, zona, urgenza, budget a fasce. Basta. Il romanzo «raccontaci il tuo progetto» lo lasci opzionale.",
          "Se non userai un campo nelle prime ventiquattro ore, toglilo. Ogni input in più è un motivo per chiudere il telefono.",
        ],
      },
      {
        heading: "Attrito buono e attrito stupido",
        paragraphs: [
          "Attrito buono: una scelta che evita preventivi fuori target («solo B2B», «solo entro 30 km»). Attrito stupido: captcha aggressivi, obbligo di account, dieci checkbox legali ridondanti, CAPTCHA che sembrano esami.",
          "Privacy: un consenso chiaro e corto. Non un muro di testo prima del bottone Invia.",
        ],
      },
      {
        heading: "Dove metto il form sulla one-page",
        paragraphs: [
          "Una CTA in hero che scende al form; il form completo dopo prova e offerta; a volte un blocco corto a metà pagina se lo scroll è lungo. Non tre form diversi con campi diversi.",
          "Su mobile il form deve stare su una colonna, label visibili, errori leggibili. Se fallisce sul telefono, fallisce il sito.",
        ],
      },
      {
        heading: "Conferma e cosa succede dopo",
        paragraphs: [
          "Dopo l’invio: messaggio chiaro («ti rispondo entro un giorno lavorativo») e, se puoi, email di conferma. Il silenzio dopo «messaggio inviato» genera dubbi e doppi invii.",
          "Io collego notifiche che mi arrivano davvero. Un form che finisce in uno spam folder che non controlli non è un form: è teatro.",
        ],
      },
      {
        heading: "Form vs WhatsApp vs telefono",
        paragraphs: [
          "Su one-page locali WhatsApp spesso converte di più. Non è un fallimento del form: è il comportamento reale. Tieni WhatsApp come scorciatoia e il form per chi vuole lasciare dettagli senza chat.",
          "L’importante è una gerarchia: un canale primario evidente, gli altri secondari. Non una fila di icone tutte uguali.",
        ],
      },
    ],
    faq: [
      {
        question: "Quanti campi sono troppi?",
        answer:
          "Oltre cinque–sei obbligatori perdi gente. Se ti serve un brief lungo, fai un secondo passo dopo il primo contatto — non prima.",
      },
      {
        question: "Meglio email o telefono obbligatorio?",
        answer:
          "Dipende da come rispondi. Se chiami entro poche ore, telefono. Se lavori a batch in orari fissi, email. Uno obbligatorio, l’altro opzionale.",
      },
      {
        question: "Serve un form di preventivo automatico?",
        answer:
          "Solo se i parametri sono davvero calcolabili. Altrimenti un preventivo «automatico» bugiardo peggiora la fiducia.",
      },
      {
        question: "Posso usare solo WhatsApp senza form?",
        answer:
          "Sì per attività molto locali e messaggi brevi. Perdi traccia e allegati strutturati. Io spesso tengo entrambi, con priorità chiara.",
      },
    ],
    related: [
      { label: "Servizio OnePage Start", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    slug: "limiti-seo-siti-one-page-parlare-chiaro",
    service: "one-page",
    title: "Limiti SEO dei siti one-page: parliamone chiaro",
    description:
      "Cosa può (e non può) fare una one-page su Google: un URL, pochi intent, zero miracoli. Quando serve davvero una multipagina.",
    date: "2026-06-29",
    keywords: [
      "SEO sito one page",
      "limiti SEO one page",
      "one page Google",
      "posizionamento sito una pagina",
      "one page vs multipagina SEO",
    ],
    intro:
      "Ti dicono che la one-page «è SEO-friendly perché veloce». Veloce aiuta. Non basta. Una sola URL combatte per un cluster di intent limitato. Io lo dico in call prima di firmare: se ti serve posizionarti su dieci servizi diversi, la one-page non è la scorciatoia — è il collo di bottiglia.",
    sections: [
      {
        heading: "Un URL, un’intenzione principale",
        paragraphs: [
          "Google valuta una pagina soprattutto per un tema dominante. Su una one-page puoi ottimizzare bene un intent («idraulico a [città]», «consulenza X»). I secondari restano deboli: non hai URL dedicate, title distinti, link interni seri.",
          "Le ancore (#servizi, #prezzi) non equivalgono a pagine. Qualche snippet le mostra; non costruiscono un silo.",
        ],
      },
      {
        heading: "Cosa la one-page fa bene in SEO",
        paragraphs: [
          "Keyword locali chiare, title e H1 allineati, contenuti non duplicati, velocità, Core Web Vitals decenti, schema LocalBusiness se ha senso. Per un’attività con un’offerta netta e una zona, spesso è abbastanza.",
          "Anche la chiarezza aiuta: meno pagine orphan, meno thin content. Una sola pagina forte batte cinque pagine vuote «Servizi 1…5».",
        ],
      },
      {
        heading: "Dove si spezza",
        paragraphs: [
          "Blog, guide, landing per campagne diverse, portfolio con progetti che meritano URL proprie, servizi con pubblico e lessico diversi: qui la one-page soffoca. Non puoi far crescere articoli se non hai un posto dove viverli.",
          "Se il tuo piano è «scrivo dieci articoli SEO», non partire one-page fingendo che il blog arriverà «dopo in fondo allo scroll». Arriverà male.",
        ],
      },
      {
        heading: "Come ne parlo con i clienti",
        paragraphs: [
          "Non vendo miracoli. Dico: con una one-page puntiamo a poche query rilevanti e a conversione. Se tra sei mesi i dati dicono che certi temi meritano pagina dedicata, la aggiungiamo.",
          "Preferisco un no onesto oggi che una one-page promettendo «poi rankiamo su tutto». Quella promessa la fanno i template, non chi lavora sul serio.",
        ],
      },
      {
        heading: "Alternative senza overbuild",
        paragraphs: [
          "A volte basta one-page + una o due landing (servizio chiave, zona chiave). Non un sito da venti pagine vuote. Architettura minima, URL dove servono davvero.",
          "Se stai valutando una one-page e ti preoccupa la SEO, scrivimi: ti dico se il tuo intent ci sta in una pagina o se ti conviene partire già spezzato.",
        ],
      },
    ],
    faq: [
      {
        question: "Una one-page può arrivare in prima pagina su Google?",
        answer:
          "Sì su query mirate e poco competitive, soprattutto locali. No come strategia unica per tanti servizi e tanti articoli.",
      },
      {
        question: "Le ancore aiutano il posizionamento?",
        answer:
          "Aiutano usabilità e qualche deep link. Non sostituiscono pagine ottimizzate per intent diversi.",
      },
      {
        question: "Meglio one-page veloce o multipagina più lenta?",
        answer:
          "Né l’una né l’altra per dogma. Meglio l’architettura giusta e performance buone. Una multipagina lenta non «vince SEO» solo perché ha più URL.",
      },
      {
        question: "Posso fare SEO locale solo con Google Business?",
        answer:
          "Business Profile è centrale in locale, ma un sito chiaro (anche one-page) resta la destinazione di fiducia per chi vuole dettagli e contatto.",
      },
    ],
    related: [
      { label: "Servizio OnePage Start", href: "/servizi/one-page" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
] as const satisfies readonly ServiceBlogPost[];
