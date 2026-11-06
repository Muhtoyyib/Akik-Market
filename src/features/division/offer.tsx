import {CardRow} from "@/components/card-row/card-row";
import {Frame} from "@/components/frame/frame";
import {SectionHeader} from "@/components/section-header/section-header";

type OfferCard = {title: string; line: string; image: {src: string; alt: string; width: number; height: number}; href?: string};
type OfferProps = {eyebrow: string; heading: string; cards: readonly {value: OfferCard}[]};

const HEADING_ID = "offer-heading";

/** Matic P3 + P4: what the business sells as photo cards. A card links only when the Listings page shows its
 * business (offer spec, "Cards are not links unless a page exists"). */
export function Offer({eyebrow, heading, cards}: OfferProps) {
  if (cards.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <SectionHeader eyebrow={eyebrow} heading={heading} headingId={HEADING_ID} />
        <CardRow label={heading} items={cards.map((card) => card.value)} />
      </Frame>
    </section>
  );
}
