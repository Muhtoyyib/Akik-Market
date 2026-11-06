import {MediaBox} from "@/components/media-box/media-box";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {Frame} from "@/features/home/frame";

type Story = {name: string; since: string; quote: string; image: {src: string; alt: string; width: number; height: number}};
type StoryTab = {key: string; label: string; story: {value: Story}};
type StoriesProps = {heading: string; tabs: readonly StoryTab[]};

const HEADING_ID = "stories-heading";

/** Name and year come first in the markup so a screen reader entering the panel reads them before the quote. */
function StoryPanel({name, since, quote, image}: Story) {
  return (
    <MediaBox ratio="4:5/16:9" scrim media={{kind: "image", ...image}}>
      {/* pb-24 keeps the quote above the floating tabs. */}
      <figure className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-24 text-center text-on-dark md:items-start md:px-12 md:text-start">
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

/** Matic P6: one media box per story with pill tabs floating over its bottom centre. Placeholder stories are photos only. */
export function Stories({heading, tabs}: StoriesProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (tabs.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          {heading}
        </h2>
        <PillTabs
          label={heading}
          surface="dark"
          overlay
          tabs={tabs.map((tab) => ({value: tab.key, label: tab.label, panel: <StoryPanel {...tab.story.value} />}))}
        />
      </Frame>
    </section>
  );
}
