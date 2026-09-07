import { site } from "@/lib/home-content";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalPage = {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPage: LegalPage = {
  eyebrow: "Privacy",
  title: "Informativa sulla privacy",
  updatedAt: "7 settembre 2026",
  intro:
    "Questa informativa descrive come jaderweb tratta i dati personali raccolti attraverso il sito e i canali di contatto, in conformità al Regolamento UE 2016/679 (GDPR) e alla normativa italiana applicabile.",
  sections: [
    {
      title: "Titolare del trattamento",
      paragraphs: [
        `Il titolare del trattamento è jaderweb, con sede in ${site.location}.`,
        `Per qualsiasi richiesta relativa ai dati personali puoi scrivere a ${site.email}.`,
      ],
    },
    {
      title: "Dati raccolti",
      paragraphs: [
        "Tratto solo i dati necessari a rispondere alle richieste e a erogare i miei servizi.",
      ],
      items: [
        "dati di contatto (nome, email, telefono)",
        "dati relativi all’azienda o al progetto, se forniti",
        "contenuto dei messaggi inviati tramite form, email o WhatsApp",
        "dati tecnici di navigazione e, se presenti, preferenze cookie",
      ],
    },
    {
      title: "Finalità e basi giuridiche",
      paragraphs: [
        "I dati sono trattati per finalità legate alla gestione delle richieste e al rapporto con i clienti.",
      ],
      items: [
        "rispondere a richieste di informazioni e preventivi (esecuzione di misure precontrattuali)",
        "gestire comunicazioni e rapporti professionali (esecuzione del contratto o legittimo interesse)",
        "adempiere obblighi di legge, se applicabili",
        "migliorare il sito e la sicurezza tecnica (legittimo interesse)",
      ],
    },
    {
      title: "Modalità del trattamento",
      paragraphs: [
        "I dati sono trattati con strumenti digitali e misure di sicurezza adeguate a ridurre rischi di accesso non autorizzato, perdita o uso improprio.",
        "Conserviamo i dati solo per il tempo necessario alle finalità indicate o per gli obblighi di legge.",
      ],
    },
    {
      title: "Destinatari",
      paragraphs: [
        "I dati possono essere comunicati a fornitori tecnici che supportano hosting, email, analytics o strumenti di comunicazione, esclusivamente per le attività necessarie al servizio. Con il consenso, i dati di navigazione possono essere trattati da Google LLC tramite Google Analytics 4.",
        "Non vendiamo i dati personali a terzi.",
      ],
    },
    {
      title: "Trasferimenti extra-UE",
      paragraphs: [
        "Qualora alcuni strumenti tecnici comportino trasferimenti fuori dallo Spazio Economico Europeo, vengono adottate le garanzie previste dalla normativa vigente.",
      ],
    },
    {
      title: "Diritti dell’interessato",
      paragraphs: [
        "Puoi esercitare in qualsiasi momento i diritti previsti dal GDPR, tra cui accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, contattandoci all’indirizzo email indicato.",
        "Hai inoltre il diritto di proporre reclamo all’Autorità Garante per la protezione dei dati personali.",
      ],
    },
    {
      title: "Aggiornamenti",
      paragraphs: [
        "Questa informativa può essere aggiornata per adeguamenti normativi o organizzativi. La data di ultimo aggiornamento è indicata in cima alla pagina.",
      ],
    },
  ],
};

export const cookiePage: LegalPage = {
  eyebrow: "Cookie",
  title: "Informativa sui cookie",
  updatedAt: "7 settembre 2026",
  intro:
    "Questa pagina spiega cosa sono i cookie, quali tipologie possono essere utilizzate sul sito jaderweb e come gestirne le preferenze.",
  sections: [
    {
      title: "Cosa sono i cookie",
      paragraphs: [
        "I cookie sono piccoli file di testo salvati sul dispositivo quando visiti un sito web. Servono a far funzionare correttamente le pagine, ricordare preferenze o, se attivati, analizzare l’utilizzo del sito.",
      ],
    },
    {
      title: "Cookie utilizzati",
      paragraphs: [
        "Sul sito possono essere presenti le seguenti categorie:",
      ],
      items: [
        "Cookie tecnici / necessari: indispensabili al funzionamento del sito, ad esempio per tema chiaro/scuro o sicurezza di base",
        "Cookie di preferenza: memorizzano scelte dell’utente per migliorare l’esperienza",
        "Cookie analitici: Google Analytics 4 (gtag.js, ID G-8HKCHN507P), caricati solo dopo il consenso, per capire come viene utilizzato il sito in forma aggregata",
      ],
    },
    {
      title: "Base giuridica",
      paragraphs: [
        "I cookie tecnici sono utilizzati sulla base del legittimo interesse al corretto funzionamento del sito.",
        "Eventuali cookie non necessari, come quelli analitici non strettamente indispensabili, vengono utilizzati solo con il consenso dell’utente, ove richiesto.",
      ],
    },
    {
      title: "Come gestire i cookie",
      paragraphs: [
        "Puoi gestire o eliminare i cookie dalle impostazioni del browser. La disattivazione di alcuni cookie tecnici può limitare funzionalità del sito.",
        "Alla prima visita compare un banner di consenso: puoi accettare tutti i cookie oppure solo quelli necessari. La scelta viene salvata sul tuo dispositivo.",
      ],
    },
    {
      title: "Maggiori informazioni",
      paragraphs: [
        `Per domande su cookie e privacy puoi scriverci a ${site.email}.`,
        "Consulta anche l’informativa privacy per i dettagli sul trattamento dei dati personali.",
      ],
    },
  ],
};
