import {Card} from "@/components/card/card";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/features/home/frame";

type ProjectsBannerProps = {
  eyebrow: string;
  heading: string;
  href: string;
  image: {src: string; alt: string; width: number; height: number};
};

const HEADING_ID = "projects-heading";

/**
 * Matic P7: a full-width photo with one inset link card, over the right side on desktop and across the bottom on
 * phones. A hidden h2 names the section so the card's h3 sits under its own heading in the outline.
 */
export function ProjectsBanner({eyebrow, heading, href, image}: ProjectsBannerProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          Our projects
        </h2>
        <MediaBox ratio="4:5/16:9" banner media={{kind: "image", ...image}}>
          <div
            data-division="engineering"
            className="absolute inset-x-4 bottom-4 md:inset-x-auto md:top-1/2 md:right-8 md:bottom-auto md:w-96 md:-translate-y-1/2"
          >
            <Card variant="inset-link" eyebrow={eyebrow} heading={heading} href={href} />
          </div>
        </MediaBox>
      </Frame>
    </section>
  );
}
