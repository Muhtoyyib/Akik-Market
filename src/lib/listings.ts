// Pure rules for the Listings page and the links into it (listings-page specs and design D1).
import type {BusinessKey} from "@/lib/content/business";

export const LISTINGS_PATH = "/listings";

// Spec (listings tabs): homes and cars only; phones stay on Home and the Phones page (proposal, non-goals).
// Stryker disable StringLiteral,ObjectLiteral : tab labels and count nouns from the tabs and grid specs; tests pin them.
export const LISTING_KINDS = {
  homes: {business: "engineering", label: "Homes", one: "HOME", many: "HOMES"},
  cars: {business: "autos", label: "Cars", one: "CAR", many: "CARS"},
} as const satisfies Record<string, {business: BusinessKey; label: string; one: string; many: string}>;
// Stryker restore StringLiteral,ObjectLiteral

export type ListingKind = keyof typeof LISTING_KINDS;

const KIND_ORDER = Object.keys(LISTING_KINDS) as ListingKind[]; // Object.keys loses the key type; these are its keys.

/** The Listings tab that shows a business's items, if the page lists that business at all. */
export function kindOf(key: BusinessKey): ListingKind | undefined {
  return KIND_ORDER.find((kind) => LISTING_KINDS[kind].business === key);
}

/** The Listings page on this business's tab, once the page exists and lists the business. */
export function listingsHref(key: BusinessKey, exists: (path: string) => boolean): string | undefined {
  const kind = kindOf(key);
  return kind && exists(LISTINGS_PATH) ? `${LISTINGS_PATH}?type=${kind}` : undefined;
}

/** The line above the grid: "11 HOMES AVAILABLE", "1 CAR AVAILABLE" (grid spec, "Count"). */
export function countLine(count: number, kind: ListingKind): string {
  const {one, many} = LISTING_KINDS[kind];
  return `${count} ${count === 1 ? one : many} AVAILABLE`;
}

/** Newest first by listing date. YYYY-MM-DD dates sort as plain text. */
export function newestListed<T extends {value: {listed: string}}>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => b.value.listed.localeCompare(a.value.listed));
}

/** One tab per kind with items, in tab order, each with every item of that kind, newest first. */
export function listingTabs<T extends {value: {business: BusinessKey; listed: string}}>(items: readonly T[]) {
  return KIND_ORDER.map((kind) => ({
    kind,
    ...LISTING_KINDS[kind],
    items: newestListed(items.filter((item) => item.value.business === LISTING_KINDS[kind].business)),
  }))
    .filter((tab) => tab.items.length > 0)
    .map((tab) => ({...tab, count: countLine(tab.items.length, tab.kind)}));
}
