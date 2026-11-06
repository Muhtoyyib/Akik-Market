import {pageExists} from "@/lib/site-pages";

/** Where a link goes: hint describes a fallback for assistive technology, e.g. "chat on WhatsApp". */
export type OnwardLink = {href: string; hint?: string};

/** Links to a page once it ships; until then to the closest real action (home-page design D3). */
export function onwardLink(pagePath: string, fallback: Required<OnwardLink>): OnwardLink {
  return pageExists(pagePath) ? {href: pagePath} : fallback;
}
