import {cn} from "cn";
import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";
import {SectionHeader} from "@/components/section-header/section-header";
import type {BusinessKey} from "@/lib/content/business";

type Chapter = {
  key: BusinessKey;
  year: {value: number};
  heading: {value: string};
  text: {value: string};
  image: {value: {src: string; alt: string; width: number; height: number}};
};
type TimelineProps = {eyebrow: string; heading: string; chapters: readonly Chapter[]};

const HEADING_ID = "timeline-heading";

/** About design D1: the chapters as an ordered list, the photo beside the text on desktop (alternating sides) and above
 * it on phones. Each chapter takes its business's accent for the year. */
export function Timeline({eyebrow, heading, chapters}: TimelineProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <SectionHeader eyebrow={eyebrow} heading={heading} headingId={HEADING_ID} />
        <ol className="mt-12 flex flex-col gap-16 md:mt-16 lg:gap-24">
          {chapters.map((chapter, index) => (
            <li key={chapter.key} data-division={chapter.key} className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div data-chapter-photo className={cn(index % 2 === 1 && "lg:order-last")}>
                <MediaBox ratio="3:2" media={{kind: "image", ...chapter.image.value}} />
              </div>
              <div>
                <p className="type-figure text-accent">{chapter.year.value}</p>
                <h3 className="mt-3 type-h3 text-ink">{chapter.heading.value}</h3>
                <p className="mt-3 max-w-prose type-body-lg text-ink-muted">{chapter.text.value}</p>
              </div>
            </li>
          ))}
        </ol>
      </Frame>
    </section>
  );
}
