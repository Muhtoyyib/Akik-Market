import {Frame} from "@/components/frame/frame";
import {StoryBox, type StoryContent} from "@/components/story-box/story-box";

const HEADING_ID = "story-heading";

/** Matic P6 with a single story: this business's customer, no tabs. The h2 names the section for screen readers. */
export function Story({story}: {story?: {value: StoryContent}}) {
  // Spec (page-template, "No story yet"): no story, no section and no gap.
  if (!story) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          A customer's story
        </h2>
        <StoryBox {...story.value} />
      </Frame>
    </section>
  );
}
