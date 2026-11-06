import {Button} from "@/components/button/button";
import {PhotoStack} from "@/features/home/founder/photo-stack";
import {Frame} from "@/features/home/frame";

type FounderProps = {
  photos: readonly {src: string; alt: string; width: number; height: number}[];
  heading: string;
  story: string;
  /** Present only once the About page exists (founder spec, "Link target"). */
  link?: {label: string; href: string};
};

const HEADING_ID = "founder-heading";

/** Matic P10: a small photo stack with arrows, then a centred heading, a short story and a link. */
export function Founder({photos, heading, story, link}: FounderProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (photos.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame className="flex flex-col items-center text-center">
        <PhotoStack photos={photos} />
        <h2 id={HEADING_ID} className="mt-12 max-w-3xl type-h2 text-ink">
          {heading}
        </h2>
        <p className="mt-4 max-w-prose type-body-lg text-ink-muted">{story}</p>
        {link && (
          <div className="mt-6">
            <Button href={link.href} variant="link">
              {link.label}
            </Button>
          </div>
        )}
      </Frame>
    </section>
  );
}
