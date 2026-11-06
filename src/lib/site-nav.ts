// The header's page links (home navigation spec, "Contents"). Pages join the header as soon as site-pages.ts lists them.
import {divisions} from "@/lib/home-divisions";
import {pageExists} from "@/lib/site-pages";

export type NavLink = {label: string; href: string};

// Sitemap order: docs/marketing-sitemap.md.
export const SITE_PAGES: NavLink[] = [
  {label: "About", href: "/about"},
  ...divisions.map((division) => ({label: division.name, href: division.path})),
  {label: "Projects", href: "/projects"},
  {label: "News", href: "/news"},
  {label: "Contact", href: "/contact"},
];

/** The pages from the list that are built, keeping their order. */
export function navLinks(pages: NavLink[], exists: (path: string) => boolean): NavLink[] {
  return pages.filter((page) => exists(page.href));
}

export const siteNav = navLinks(SITE_PAGES, pageExists);
