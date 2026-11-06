import type {MouseEvent} from "react";

/** The in-page target of a link such as "#news", or null for a link to another page. */
export function sectionHash(event: MouseEvent<HTMLAnchorElement>): string | null {
  const href = event.currentTarget.getAttribute("href");
  return href?.startsWith("#") ? href : null;
}

/** The heading that names the section a link such as "#news" points at. */
export function sectionHeading(hash: string): HTMLElement | null {
  const headingId = document.getElementById(hash.slice(1))?.getAttribute("aria-labelledby");
  return headingId ? document.getElementById(headingId) : null;
}

/**
 * Brings a Home section's top into view (the root's scroll-padding keeps it below the header) and moves focus to its
 * heading, so keyboard and screen-reader users land where they asked (navigation spec, "Section links").
 */
export function jumpToSection(hash: string) {
  const section = document.getElementById(hash.slice(1));
  if (!section) return;
  section.scrollIntoView({block: "start"});
  sectionHeading(hash)?.focus({preventScroll: true});
  history.pushState(null, "", hash);
}

/** Click handler for header links: jumps for a section link, leaves page links to the browser. */
export function jumpOnClick(event: MouseEvent<HTMLAnchorElement>) {
  const hash = sectionHash(event);
  if (!hash) return;
  event.preventDefault();
  jumpToSection(hash);
}
