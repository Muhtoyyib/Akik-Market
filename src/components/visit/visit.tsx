import {Button} from "@/components/button/button";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/components/frame/frame";
import {directionsHref} from "@/lib/maps";
import {ContactColumns, type Contact} from "@/components/contact-columns/contact-columns";

type VisitProps = {
  heading: string;
  address: {street: string; city: string};
  image: {src: string; alt: string; width: number; height: number};
  /** Contact columns under the photo; Contact leaves them out, since its channels section shows them. */
  contacts: readonly Contact[];
  /** The section's own id, for in-page links to it. */
  id?: string;
};

const HEADING_ID = "visit-heading";
/** Obvious's closing block: a shop photo with the heading, address and one pill centred over it, then contacts per business. */
export function Visit({heading, address, image, contacts, id}: VisitProps) {
  const fullAddress = `${address.street}, ${address.city}`;
  return (
    <section id={id} aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <MediaBox ratio="4:5/16:9" banner media={{kind: "image", ...image}}>
          {/* A full tint, not the bottom scrim: the text sits in the middle of the photo. */}
          <div aria-hidden className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-on-dark">
            <h2 id={HEADING_ID} tabIndex={-1} className="max-w-3xl type-h2 outline-none">
              {heading}
            </h2>
            <p className="mt-4 type-body-lg">{fullAddress}</p>
            <div className="mt-8">
              <Button href={directionsHref(fullAddress)} variant="on-dark">
                Get directions
              </Button>
            </div>
          </div>
        </MediaBox>
        {contacts.length > 0 && (
          <div className="mt-12">
            <ContactColumns contacts={contacts} />
          </div>
        )}
      </Frame>
    </section>
  );
}
