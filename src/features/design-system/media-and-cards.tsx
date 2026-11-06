import {Card} from "@/components/card/card";
import {MediaBox} from "@/components/media-box/media-box";
import {PreviewSection} from "@/features/design-system/preview-section";

// Abstract gradients generated for this preview; they stand for no real Akik media.
const WIDE = {kind: "image", src: "/samples/sample-wide.jpg", alt: "Sample gradient", width: 1600, height: 900} as const;
const PORTRAIT = {src: "/samples/sample-portrait.jpg", alt: "Sample gradient", width: 800, height: 1000};
const LOOP = {kind: "video", src: "/samples/sample-loop.webm", poster: "/samples/sample-loop-poster.jpg"} as const;

const DIVISIONS = [
  {division: "phones", eyebrow: "Phones & Gadgets"},
  {division: "engineering", eyebrow: "Engineering & Real Estate"},
  {division: "autos", eyebrow: "Autos"},
] as const;

function MediaBoxes() {
  return (
    <PreviewSection title="Media box">
      <div className="grid gap-6 md:grid-cols-2">
        <MediaBox
          ratio="16:9"
          media={WIDE}
          priority
          caption={{title: "Image with caption", description: "16:9, radius-md, caption below."}}
        />
        <MediaBox ratio="16:9" media={LOOP} scrim caption={{title: "Looping video", description: "Pause control, scrim for overlay text."}}>
          <p className="absolute right-6 bottom-6 left-20 type-body-lg text-on-dark">Overlay text on the scrim</p>
        </MediaBox>
      </div>
    </PreviewSection>
  );
}

function Cards() {
  return (
    <PreviewSection title="Cards">
      <div className="grid gap-6 md:grid-cols-3">
        <Card heading="Content card" description="Grouped text: a feature, a step or a fact." />
        <Card heading="Linked content card" description="The whole card is one link named by its heading." href="#cards" />
        <Card
          heading="Longer copy"
          description="Cards in a row stretch to the tallest one, and their arrows line up at the bottom of the row."
          href="#cards"
        />
      </div>
      {/* A 16:9 banner is about 200px tall on a phone, too short for the card, so it stacks below the banner there. */}
      <div className="mt-6">
        <MediaBox ratio="16:9" media={WIDE} banner>
          <div className="absolute right-6 bottom-6 hidden w-80 md:block">
            <Card variant="inset-link" eyebrow="Inset link" heading="One onward link over a banner" href="#cards" />
          </div>
        </MediaBox>
        <div className="mt-4 md:hidden">
          <Card variant="inset-link" eyebrow="Inset link" heading="One onward link over a banner" href="#cards" />
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {DIVISIONS.map(({division, eyebrow}) => (
          <Card
            key={division}
            variant="division"
            division={division}
            image={PORTRAIT}
            eyebrow={eyebrow}
            heading="Division card"
            description="One line about the division."
            href="#cards"
          />
        ))}
      </div>
    </PreviewSection>
  );
}

export function MediaAndCards() {
  return (
    <>
      <MediaBoxes />
      <Cards />
    </>
  );
}
