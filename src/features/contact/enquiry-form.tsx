import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {ChoiceGroup} from "@/features/contact/choice-group";
import {TextField} from "@/features/contact/text-field";
import {useEnquiry} from "@/features/contact/use-enquiry";
import type {contactForm} from "@/lib/content/contact";
import {MESSAGE_MAX} from "@/lib/enquiry";

type EnquiryFormProps = typeof contactForm;

const HEADING_ID = "enquiry-heading";

/** WhatsApp first, since that's where Akik answers; email for visitors without it (design D1). */
function SendButtons({send}: {send: (channel: "whatsapp" | "email") => void}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button onClick={() => send("whatsapp")}>Send on WhatsApp</Button>
      <Button variant="link" onClick={() => send("email")}>
        Send by email instead
      </Button>
    </div>
  );
}

/**
 * The enquiry form (enquiry-form spec, design D1): it checks itself, then opens WhatsApp or the mail app with the
 * message written. No submit button and no action, so nothing is posted before or after scripts load.
 */
export function EnquiryForm({heading, note, businesses}: EnquiryFormProps) {
  const {enquiry, errors, register, update, send} = useEnquiry();
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <div className="mx-auto max-w-2xl">
          <h2 id={HEADING_ID} className="type-h2 text-ink">
            {heading.value}
          </h2>
          <p className="mt-4 type-body text-ink-muted">{note.value}</p>
          <form aria-labelledby={HEADING_ID} noValidate onSubmit={(event) => event.preventDefault()} className="mt-10 flex flex-col gap-8">
            <ChoiceGroup
              ref={register("business")}
              name="business"
              legend="Which business"
              options={businesses}
              value={enquiry.business}
              onChange={(value) => update({business: value as typeof enquiry.business})} // value is one of the options
              error={errors.business}
            />
            <TextField
              ref={register("name")}
              id="name"
              label="Your name"
              autoComplete="given-name"
              required
              value={enquiry.name}
              onChange={(name) => update({name})}
              error={errors.name}
            />
            <TextField id="topic" label="What it's about" value={enquiry.topic} onChange={(topic) => update({topic})} />
            <TextField
              ref={register("message")}
              id="message"
              label="Your message"
              required
              multiline
              maxLength={MESSAGE_MAX}
              hint={`${enquiry.message.length.toLocaleString("en-NG")} of ${MESSAGE_MAX.toLocaleString("en-NG")} characters`}
              value={enquiry.message}
              onChange={(message) => update({message})}
              error={errors.message}
            />
            <SendButtons send={send} />
          </form>
        </div>
      </Frame>
    </section>
  );
}
