import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import type {FeaturedItem} from "@/components/item-carousel/item-card";
import {ItemCarousel} from "@/components/item-carousel/item-carousel";
import {SectionHeader} from "@/components/section-header/section-header";

type StockProps = {eyebrow: string; heading: string; items: readonly {value: FeaturedItem}[]; action: string; href: string};

const HEADING_ID = "stock-heading";

/** Krea's media card carousel, as built for Home's Featured now: this business's items and a "See all" link. */
export function Stock({eyebrow, heading, items, action, href}: StockProps) {
  // Spec (stock, "Left out when empty").
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <SectionHeader eyebrow={eyebrow} heading={heading} headingId={HEADING_ID} />
        <div className="mt-8 md:mt-12">
          <ItemCarousel
            items={items.map((item) => item.value)}
            action={
              <Button href={href} variant="link">
                {action}
              </Button>
            }
          />
        </div>
      </Frame>
    </section>
  );
}
