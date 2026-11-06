import {StoryBox, type StoryContent} from "@/components/story-box/story-box";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {Frame} from "@/components/frame/frame";

type StoryTab = {key: string; label: string; story: {value: StoryContent}};
type StoriesProps = {
  heading: string;
  tabs: readonly StoryTab[];
  /** The section's own id, for a page that links to it (Home's `#stories`). */
  id?: string;
};

const HEADING_ID = "stories-heading";

/** Matic P6 (Home, Testimonials): one media box per story with pill tabs floating over its bottom centre. Placeholder stories are photos only. */
export function Stories({heading, tabs, id}: StoriesProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (tabs.length === 0) return null;
  return (
    <section id={id} aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} tabIndex={-1} className="sr-only">
          {heading}
        </h2>
        <PillTabs
          label={heading}
          surface="dark"
          overlay
          tabs={tabs.map((tab) => ({value: tab.key, label: tab.label, panel: <StoryBox {...tab.story.value} underTabs />}))}
        />
      </Frame>
    </section>
  );
}
