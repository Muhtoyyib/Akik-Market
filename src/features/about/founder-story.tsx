import {Frame} from "@/components/frame/frame";
import {PhotoStack} from "@/components/photo-stack/photo-stack";

type FounderStoryProps = {
  photos: readonly {src: string; alt: string; width: number; height: number; srcSet?: string; sizes?: string}[];
  heading: string;
  name: string;
  story: readonly string[];
};

const HEADING_ID = "founder-heading";

/** Matic P10 at full length: the photo stack, the page's h1, who is speaking, then the story. */
export function FounderStory({photos, heading, name, story}: FounderStoryProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-12 md:pt-20">
      <Frame className="flex flex-col items-center">
        <PhotoStack photos={photos} />
        <h1 id={HEADING_ID} className="mt-12 max-w-3xl text-center type-display text-ink">
          {heading}
        </h1>
        <p className="mt-4 type-label text-ink-muted">{name}</p>
        {/* Left-aligned: four centred paragraphs are hard to read. */}
        <div className="mt-10 flex max-w-prose flex-col gap-5 type-body-lg text-ink">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Frame>
    </section>
  );
}
