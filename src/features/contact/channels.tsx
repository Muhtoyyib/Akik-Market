import {ContactColumns} from "@/components/contact-columns/contact-columns";
import {Frame} from "@/components/frame/frame";
import type {contactChannels} from "@/lib/content/contact";

type ChannelsProps = typeof contactChannels;

const HEADING_ID = "channels-heading";
const LINK =
  "inline-flex min-h-11 items-center type-body text-ink underline underline-offset-4 outline-offset-2 outline-brand-navy hover:text-ink-muted focus-visible:outline-2 focus-visible:outline-solid";

/** Channels spec: a column per business as on Home's Visit us, then the email and the social accounts. */
export function Channels({heading, contacts, email, social}: ChannelsProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-16 md:pt-24">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          {heading.value}
        </h2>
        <ContactColumns contacts={contacts} />
        <div className="mt-10 flex flex-col gap-x-10 gap-y-2 border-t border-line pt-6 md:flex-row md:items-center">
          <a href={`mailto:${email.value}`} className={LINK}>
            {email.value}
          </a>
          {social.map((account) => (
            <a key={account.label} href={account.href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {account.label}
            </a>
          ))}
        </div>
      </Frame>
    </section>
  );
}
