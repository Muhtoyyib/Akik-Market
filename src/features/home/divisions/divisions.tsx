import {Card} from "@/components/card/card";
import {SectionHeader} from "@/components/section-header/section-header";
import {Frame} from "@/features/home/frame";
import type {OnwardLink} from "@/lib/onward-link";
import {SECTION_IDS} from "@/lib/home-sections";

type DivisionCard = {
  key: "phones" | "engineering" | "autos";
  name: string;
  heading: {value: string};
  line: {value: string};
  image: {value: {src: string; alt: string; width: number; height: number}};
  link: OnwardLink;
};

type DivisionsProps = {eyebrow: string; heading: string; cards: readonly DivisionCard[]};

export const DIVISIONS_HEADING_ID = "divisions-heading";

/** Three equal columns on desktop; under 1024px a swipe row that runs to the screen's right edge so the next card peeks in. */
export function Divisions({eyebrow, heading, cards}: DivisionsProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (cards.length === 0) return null;
  return (
    <section id={SECTION_IDS.divisions} aria-labelledby={DIVISIONS_HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <SectionHeader eyebrow={eyebrow} heading={heading} headingId={DIVISIONS_HEADING_ID} />
        <ul className="-mr-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 md:-mr-8 md:mt-12 md:pr-8 lg:mr-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pr-0">
          {cards.map((card) => (
            <li key={card.key} className="w-4/5 shrink-0 snap-start md:w-2/5 lg:w-auto">
              <Card
                variant="division"
                division={card.key}
                image={card.image.value}
                eyebrow={card.name}
                heading={card.heading.value}
                description={card.line.value}
                href={card.link.href}
                linkHint={card.link.hint}
              />
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
