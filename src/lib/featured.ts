// Spec (featured-now/item-card, "Item count"): Home shows at most eight items per business.
const MAX_ITEMS_ON_HOME = 8;

const naira = new Intl.NumberFormat("en-NG", {maximumFractionDigits: 0});

/** The price line on an item card. The naira sign is written out because the currency style prints "NGN" in some runtimes. */
export function priceLabel(price: number | undefined): string {
  return price === undefined ? "PRICE ON REQUEST" : `₦${naira.format(price)}`;
}

/** The businesses that get a tab: those with featured items, each cut to what Home shows. */
export function featuredTabs<T extends {items: readonly unknown[]}>(groups: readonly T[]): T[] {
  return groups.filter((group) => group.items.length > 0).map((group) => ({...group, items: group.items.slice(0, MAX_ITEMS_ON_HOME)}));
}
