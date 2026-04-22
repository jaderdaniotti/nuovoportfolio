export type HomeProject = {
  title: string;
  role: string;
  description: string;
  coverImage?: string | null;
  projectUrl?: string | null;
  span?: string;
};

export const projects: HomeProject[] = [
  {
    title: "Landing ad alte prestazioni",
    role: "Design system + Next.js",
    description:
      "Architettura modulare, immagini ottimizzate e contenuti pensati per la conversione e la SEO tecnica.",
    span: "lg:col-span-7",
  },
  {
    title: "Dashboard e UI complesse",
    role: "UI/UX + React",
    description:
      "Interfacce chiare per dati densi: gerarchia, stati vuoti e feedback immediato sulle azioni.",
    span: "lg:col-span-5",
  },
  {
    title: "Brand digital & identity",
    role: "Collaborazione con studi grafici",
    description:
      "Traduco identità visive in componenti web coerenti, accessibili e pronti a scalare.",
    span: "lg:col-span-5",
  },
  {
    title: "Integrazioni e automazioni",
    role: "API, form, analytics",
    description:
      "Form affidabili, tracciamento consapevole e collegamenti con strumenti di lavoro quotidiani.",
    span: "lg:col-span-7",
  },
];

export const skillGroups = [
  {
    title: "Linguaggi & framework",
    items: ["TypeScript", "React", "Next.js", "Node.js", "HTML/CSS", "Tailwind"],
  },
  {
    title: "Strumenti",
    items: ["Figma", "Git", "Vercel", "Analytics", "SEO on-page", "Accessibilità"],
  },
] as const;

export const collaborations = [
  {
    name: "Aurora Technologies",
    tag: "Sviluppo Agent AI",
    body:
      "Collaborazione su soluzioni AI-powered con sistemi Agent integrati in siti e applicazioni su misura.",
  },
  {
    name: "Wham Design",
    tag: "Grafica & brand identity",
    body:
      "Studio grafico orientato al branding: traduco visioni visuali in interfacce digitali coerenti e memorabili.",
  },
  {
    name: "G-START",
    tag: "Formazione & crescita",
    body:
      "Percorsi formativi e strategici: supporto su messaggio, obiettivi e presenza digitale misurabile.",
  },
] as const;
