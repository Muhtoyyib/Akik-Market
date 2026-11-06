import type {ReactNode} from "react";
import {ItemCard, type FeaturedItem} from "@/components/item-carousel/item-card";
import {SwipeRow} from "@/components/swipe-row/swipe-row";

type ItemCarouselProps = {items: readonly FeaturedItem[]; action: ReactNode};

/** Spec (featured-now/item-card, "Carousel"): item cards in a swipe row with arrows on desktop. */
export function ItemCarousel({items, action}: ItemCarouselProps) {
  return (
    <SwipeRow
      items={items.map((item) => ({key: item.name, node: <ItemCard {...item} />}))}
      itemClassName="w-4/5 md:w-2/5 lg:w-2/9"
      noun="item"
      action={action}
    />
  );
}
