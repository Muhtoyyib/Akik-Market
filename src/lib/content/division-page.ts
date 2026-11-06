// Each division page: its own copy plus what it takes from the site-wide facts and the shared collections. Every
// WhatsApp action goes to this business's number (division page-template spec, "Every action reaches this business").
import {address, business, hours, shopPhoto, whatsappTo, type BusinessKey} from "@/lib/content/business";
import type {autosPage} from "@/lib/content/divisions/autos";
import type {engineeringPage} from "@/lib/content/divisions/engineering";
import type {phonesPage} from "@/lib/content/divisions/phones";
import {listings, type Listing} from "@/lib/content/listings";
import {projectsBanner} from "@/lib/content/projects-banner";
import {stories, type Story} from "@/lib/content/stories";
import {listingsHref, newestListed} from "@/lib/listings";

// Spec (stock, "Items from the listings collection"): at most eight, newest first.
const MAX_STOCK = 8;

/** This business's items, newest first, cut to what the page shows. YYYY-MM-DD dates sort as plain text. */
export function divisionStock(key: BusinessKey, all: readonly Listing[]): Listing[] {
  return newestListed(all.filter((item) => item.value.business === key)).slice(0, MAX_STOCK);
}

/** "See all": the Listings page filtered to this business once it exists and lists it, else WhatsApp to the business. */
export function seeAllHref(key: BusinessKey, exists: (path: string) => boolean): string {
  const {number, topic} = business(key);
  return listingsHref(key, exists) ?? whatsappTo(number.value, topic).href;
}

/** Spec (offer, "Cards are not links unless a page exists"): each card opens the Listings tab for its business. */
function offerWithLinks<T extends {cards: readonly {value: object}[]}>(offer: T, href: string | undefined) {
  return {...offer, cards: offer.cards.map((card) => ({...card, value: {...card.value, href}}))};
}

/** The first story told about this business, if any. */
export function divisionStory(key: BusinessKey, all: readonly Story[]): Story | undefined {
  return all.find((item) => item.business === key);
}

/**
 * A business with its own copy. Each route passes its own, so a division page loads only its business's words
 * (measured with Contact added: importing all three here cost every division page about 1 KB).
 */
export type OwnPage =
  | {key: "phones"; page: typeof phonesPage}
  | {key: "engineering"; page: typeof engineeringPage}
  | {key: "autos"; page: typeof autosPage};

/** The one section only this business has (division-pages design D1), with its WhatsApp action where it has one. */
function specificSection(own: OwnPage) {
  if (own.key === "phones") {
    const {services} = own.page;
    return {kind: "phones" as const, ...services, whatsappHref: whatsappTo(business("phones").number.value, services.topic.value).href};
  }
  if (own.key === "engineering") return {kind: "engineering" as const, ...own.page.services, projects: projectsBanner};
  return {kind: "autos" as const, ...own.page.inspection};
}

/** Everything one division page shows, in page order. */
export function divisionPage(ownPage: OwnPage, exists: (path: string) => boolean) {
  const {key, page: own} = ownPage;
  const entry = business(key);
  const ask = whatsappTo(entry.number.value, entry.topic).href;
  return {
    key,
    path: entry.path,
    hero: {...own.hero, eyebrow: entry.name, whatsappHref: ask},
    offer: offerWithLinks(own.offer, listingsHref(key, exists)),
    stock: {...own.stock, items: divisionStock(key, listings), href: seeAllHref(key, exists)},
    steps: {...own.steps, whatsappHref: ask},
    specific: specificSection(ownPage),
    story: divisionStory(key, stories),
    contact: {
      heading: own.contact.heading,
      address,
      image: shopPhoto,
      contacts: [{key, name: entry.name, number: entry.number, whatsappHref: ask, hours}],
    },
  };
}

export type DivisionPage = ReturnType<typeof divisionPage>;
