// The header's page links on every page but Home (site page-layout spec, "Same shell on every page" and "Current
// page"). Home's header jumps to its own sections instead (home-sections.ts).
import {businesses} from "@/lib/content/business";

/** A header link; `current` marks the page being viewed, or the collection it belongs to. */
export type NavLink = {label: string; href: string; current?: boolean};

// Sitemap order: docs/marketing-sitemap.md.
export const SITE_PAGES: readonly NavLink[] = [
  {label: "About", href: "/about"},
  ...businesses.map((entry) => ({label: entry.name, href: entry.path})),
  {label: "Projects", href: "/projects"},
  {label: "News", href: "/news"},
  {label: "Contact", href: "/contact"},
];

/** A link is current on its own page and on any page inside it, such as a news post under /news. */
function isCurrent(href: string, path: string): boolean {
  return path === href || path.startsWith(`${href}/`);
}

/** The built pages in sitemap order, with the one being viewed marked current. */
export function pageNav(path: string, exists: (path: string) => boolean): NavLink[] {
  return SITE_PAGES.filter((page) => exists(page.href)).map((page) => ({...page, current: isCurrent(page.href, path)}));
}
