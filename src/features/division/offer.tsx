import {CardRow} from "@/components/card-row/card-row";
import {Frame} from "@/components/frame/frame";
import {SectionHeader} from "@/components/section-header/section-header";

type OfferCard = {title: string; line: string; image: {src: string; alt: string; width: number; height: number}};
type OfferProps = {eyebrow: string; heading: string; cards: readonly {value: OfferCard}[]};

const HEADING_ID = "offer-heading";

/** Matic P3 + P4: what the business sells as photo cards. The cards don't link: no page lists a category yet (offer
 * spec, "Cards are not links"). */
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
