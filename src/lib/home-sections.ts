// Home's sections that the header can jump to while Home is the only built page (navigation spec, "Section links").
import type {NavLink} from "@/lib/site-nav";

/** The `id` of each linkable Home section; the section components set these on their <section>. */
export const SECTION_IDS = {
  divisions: "divisions",
  featured: "featured",
  stories: "stories",
  news: "news",
  visit: "visit",
} as const;

type SectionKey = keyof typeof SECTION_IDS;

// Page order, with the label shown in the header.
const SECTIONS: {key: SectionKey; label: string}[] = [
  {key: "divisions", label: "Businesses"},
  {key: "featured", label: "Featured"},
  {key: "stories", label: "Stories"},
  {key: "news", label: "News"},
  {key: "visit", label: "Visit us"},
];

/** Links to the sections that are on the page; a section left out for having no content gets no link. */
export function sectionLinks(present: Record<SectionKey, boolean>): NavLink[] {
  return SECTIONS.filter(({key}) => present[key]).map(({key, label}) => ({label, href: `#${SECTION_IDS[key]}`}));
}

/** Page links once any other page is built; until then, the jumps to Home's sections. */
export function headerLinks(pages: NavLink[], sections: NavLink[]): NavLink[] {
  return pages.length > 0 ? pages : sections;
}
