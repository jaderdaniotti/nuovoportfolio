export type SiteNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  match?: (pathname: string) => boolean;
};

export const HOME_PATH = "/";

export function homeSectionHref(sectionId: string): string {
  const id = sectionId.replace(/^#/, "").replace(/^\//, "");
  return `${HOME_PATH}#${id}`;
}

export const siteNavItems: SiteNavItem[] = [
  {
    label: "Home",
    href: HOME_PATH,
    ariaLabel: "Vai alla home",
    match: (pathname) => pathname === HOME_PATH,
  },
  {
    label: "Tariffe",
    href: "/pricing",
    ariaLabel: "Vai alla pagina tariffe",
    match: (pathname) => pathname === "/pricing",
  },
  {
    label: "Blog",
    href: "/blog",
    ariaLabel: "Vai al blog",
    match: (pathname) => pathname.startsWith("/blog"),
  },
  {
    label: "Contatti",
    href: "/contatti",
    ariaLabel: "Vai alla pagina contatti",
    match: (pathname) => pathname === "/contatti",
  },
];
