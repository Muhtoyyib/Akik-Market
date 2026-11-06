import {cn} from "cn";
import {MediaBox} from "@/components/media-box/media-box";

export type StoryContent = {name: string; since: string; quote: string; image: {src: string; alt: string; width: number; height: number}};

/**
 * One customer story over its photo (Matic P6). Name and year come first in the markup so a screen reader entering the
 * box reads them before the quote. `underTabs` leaves room for pill tabs floating over the bottom.
 */
export function StoryBox({name, since, quote, image, underTabs = false}: StoryContent & {underTabs?: boolean}) {
  return (
    <MediaBox ratio="4:5/16:9" scrim media={{kind: "image", ...image}}>
      <figure
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col items-center px-6 text-center text-on-dark md:items-start md:px-12 md:text-start",
          underTabs ? "pb-24" : "pb-10 md:pb-12"
        )}
      >
        <figcaption className="mb-4 type-label">
          {name} · {since}
        </figcaption>
        <blockquote className="max-w-3xl type-quote">
          <p>“{quote}”</p>
        </blockquote>
      </figure>
    </MediaBox>
  );
}
