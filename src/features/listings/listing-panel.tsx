import {ItemCard} from "@/components/item-carousel/item-card";
import type {Listing} from "@/lib/content/listings";
import type {BusinessKey} from "@/lib/content/business";

type ListingPanelProps = {business: BusinessKey; count: string; items: readonly Listing[]};

/** The count line, then every item in four columns from 1280px, three from 1024px, two from 768px (grid spec). The
 * panel takes its business's accent (tabs spec). */
export function ListingPanel({business, count, items}: ListingPanelProps) {
  return (
    <div data-division={business}>
      <p className="type-label text-ink-muted">{count}</p>
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.value.name}>
            <ItemCard {...item.value} level={2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
