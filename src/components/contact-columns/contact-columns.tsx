import {localPhone, telHref} from "@/lib/phone";

export type Contact = {
  key: "phones" | "engineering" | "autos";
  name: string;
  number: {value: string};
  whatsappHref: string;
  hours: {value: string};
};

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

/** One column per business, in the order given (Home's Visit us, Contact's channels). */
export function ContactColumns({contacts}: {contacts: readonly Contact[]}) {
  return (
    <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
      {contacts.map((contact) => (
        <ContactColumn key={contact.key} contact={contact} />
      ))}
    </ul>
  );
}
