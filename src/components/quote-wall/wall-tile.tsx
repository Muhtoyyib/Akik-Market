import {cn} from "cn";
import type {BusinessKey} from "@/lib/content/business";

type TileImage = {src: string; alt: string; width: number; height: number};

// Three sizes so eight tiles fit a 360px phone and the wall fills most of the section on desktop (quote-wall spec).
const SIZE = "size-9 md:size-20 lg:size-28";
const PHOTO = "size-full rounded-full object-cover";

/** A muted photo between the customers: decorative, so hidden from assistive technology. */
export function FillerTile({image}: {image: TileImage}) {
  return (
    <span aria-hidden className={cn(SIZE, "shrink-0")}>
      <img {...image} alt="" loading="lazy" decoding="async" className={cn(PHOTO, "opacity-40 grayscale")} />
    </span>
  );
}

type CustomerTileProps = {name: string; business: BusinessKey; image: TileImage; selected: boolean; onSelect: () => void};

/**
 * A customer's tile: the photo of what they bought, as a button. Selection is an accent ring, never growth
 * (anti-slop). The ::before layer makes a 44px touch target on phones, where the tile is 36px.
 */
export function CustomerTile({name, business, image, selected, onSelect}: CustomerTileProps) {
  return (
    <button
      type="button"
      data-division={business}
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        SIZE,
        "relative shrink-0 rounded-full outline-offset-4 outline-brand-navy transition-opacity ease-standard before:absolute before:-inset-1 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-solid md:before:inset-0",
        selected && "ring-4 ring-accent ring-offset-4 ring-offset-page"
      )}
    >
      <span className="sr-only">Read {name}'s quote</span>
      <img {...image} alt="" loading="lazy" decoding="async" className={PHOTO} />
    </button>
  );
}
