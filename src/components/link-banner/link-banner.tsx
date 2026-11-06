import {Card} from "@/components/card/card";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/components/frame/frame";
import type {BusinessKey} from "@/lib/content/business";

type LinkBannerProps = {
  /** Names the section for screen readers ("Our projects"), so the card's h3 sits under its own heading. */
  name: string;
  headingId: string;
  /** The business the card speaks for: its eyebrow takes that accent. */
  division: BusinessKey;
  eyebrow: string;
  heading: string;
  href: string;
  /** Read after the heading when the link isn't the obvious one, e.g. "chat on WhatsApp". */
  linkHint?: string;
  image: {src: string; alt: string; width: number; height: number};
};

/**
 * Matic P7: a full-width photo with one inset link card, over the right side on desktop and across the bottom on
 * phones. Leads into the Projects page (Home, Engineering, About) or from a news post to its business.
 */
export function LinkBanner({name, headingId, division, eyebrow, heading, href, linkHint, image}: LinkBannerProps) {
  return (
    <section aria-labelledby={headingId} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={headingId} className="sr-only">
          {name}
        </h2>
        <MediaBox ratio="4:5/16:9" banner media={{kind: "image", ...image}}>
          <div
            data-division={division}
            className="absolute inset-x-4 bottom-4 md:inset-x-auto md:top-1/2 md:right-8 md:bottom-auto md:w-96 md:-translate-y-1/2"
          >
            <Card variant="inset-link" eyebrow={eyebrow} heading={heading} href={href} linkHint={linkHint} />
          </div>
        </MediaBox>
      </Frame>
    </section>
  );
}
