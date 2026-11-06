import {Button} from "@/components/button/button";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/features/home/frame";
import {directionsHref} from "@/lib/maps";
import {localPhone, telHref} from "@/lib/phone";

type Contact = {
  key: "phones" | "engineering" | "autos";
  name: string;
  number: {value: string};
  whatsappHref: string;
  hours: {value: string};
};
type VisitProps = {
  heading: string;
  address: {street: string; city: string};
  image: {src: string; alt: string; width: number; height: number};
  contacts: readonly Contact[];
};

const HEADING_ID = "visit-heading";
const CONTACT_LINK =
  "inline-flex min-h-11 items-center type-body text-ink underline-offset-4 outline-offset-2 outline-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-solid";

/** Hidden words around each link make it read "Call Autos 0706 547 0198" while the column shows just the number. */
function ContactColumn({contact}: {contact: Contact}) {
  const {key: division, name, number, whatsappHref, hours} = contact;
  return (
    <li data-division={division} className="border-t border-line pt-6">
      <p className="type-label text-accent">{name}</p>
      <div className="mt-3 flex flex-col items-start">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={CONTACT_LINK}>
          WhatsApp <span className="sr-only">{name}</span>
        </a>
        <a href={telHref(number.value)} className={CONTACT_LINK}>
          <span className="sr-only">Call {name}</span> {localPhone(number.value)}
        </a>
      </div>
      <p className="mt-3 type-small text-ink-muted">{hours.value}</p>
    </li>
  );
}

/** Obvious's closing block: a shop photo with the heading, address and one pill centred over it, then contacts per business. */
export function Visit({heading, address, image, contacts}: VisitProps) {
  const fullAddress = `${address.street}, ${address.city}`;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <MediaBox ratio="4:5/16:9" banner media={{kind: "image", ...image}}>
          {/* A full tint, not the bottom scrim: the text sits in the middle of the photo. */}
          <div aria-hidden className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-on-dark">
            <h2 id={HEADING_ID} className="max-w-3xl type-h2">
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
        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {contacts.map((contact) => (
            <ContactColumn key={contact.key} contact={contact} />
          ))}
        </ul>
      </Frame>
    </section>
  );
}
