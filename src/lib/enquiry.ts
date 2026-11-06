// The Contact form's rules (contact enquiry-form spec): what must be filled in, and the message it opens WhatsApp or
// email with. Nothing is sent or stored by the site (contact design D1).
import type {BusinessKey} from "@/lib/content/business";

/** Spec ("Fields"): well within what a WhatsApp link accepts (design, "Long messages in a link"). */
export const MESSAGE_MAX = 1000;

export type Enquiry = {business: BusinessKey | ""; name: string; topic: string; message: string};
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

/** One message per problem field, in the form's order; empty when the enquiry can be sent. */
export function enquiryErrors({business, name, message}: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (business === "") errors.business = "Choose a business";
  if (name.trim() === "") errors.name = "Write your name";
  if (message.trim() === "") errors.message = "Write your message";
  else if (message.length > MESSAGE_MAX) errors.message = `Keep your message to ${MESSAGE_MAX.toLocaleString("en-NG")} characters`;
  return errors;
}

/** The prefilled text: a greeting to the business with the visitor's name, the topic when given, then the message. */
export function enquiryText({name, topic, message}: Enquiry, businessName: string): string {
  const about = topic.trim() === "" ? "" : `\nAbout: ${topic.trim()}`;
  return `Hello Akik ${businessName}, I'm ${name.trim()}.${about}\n\n${message.trim()}`;
}

/** A mailto link (RFC 6068) with the business in the subject and the same text as the body. */
export function enquiryMailto(email: string, businessName: string, text: string): string {
  const subject = encodeURIComponent(`Enquiry for Akik ${businessName}`);
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(text)}`;
}
