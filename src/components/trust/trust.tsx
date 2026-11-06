import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {IconRow, type IconRowContent} from "@/components/icon-row/icon-row";
import {MediaBox} from "@/components/media-box/media-box";

type TrustProps = {
  heading: string;
  image: {src: string; alt: string; width: number; height: number};
  rows: readonly {value: IconRowContent}[];
  whatsappHref: string;
  /** Unique on the page; a division page has two of these sections. */
  headingId?: string;
  /** Steps that happen in order are announced as an ordered list. */
  ordered?: boolean;
};

/** Matic P8: a 4:5 photo on the left half, the rows and one action on the right; stacked on phones, photo first. */
export function Trust({heading, image, rows, whatsappHref, headingId = "trust-heading", ordered = false}: TrustProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (rows.length === 0) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <section aria-labelledby={headingId} className="pt-24 md:pt-36">
      <Frame className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-6">
          <MediaBox ratio="4:5" media={{kind: "image", ...image}} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id={headingId} className="type-h2 text-ink">
            {heading}
          </h2>
          <List className="mt-8 flex flex-col gap-8 md:mt-10">
            {rows.map((row) => (
              <IconRow key={row.value.title} {...row.value} />
            ))}
          </List>
          <div className="mt-10">
            <Button href={whatsappHref}>Chat on WhatsApp</Button>
          </div>
        </div>
      </Frame>
    </section>
  );
}
