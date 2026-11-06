// Reads business.ts, never Home's content: route heads are in the JavaScript every page loads (page-heads.ts).
import {address, email, mainWhatsapp, shopContacts, social} from "@/lib/content/business";
import {pageHead} from "@/lib/page-head";

// Spec (page-shell, metadata). Open Graph needs an absolute image URL, so the share image waits for the domain.
const TITLE = "Akik · Phones, homes and cars in Ibadan";
const BUSINESS_NAME = "Akik Market";

function description(): string {
  const {street, city} = address.value;
  return `Original phones, homes and land with clean papers, and inspected cars. Visit Akik at ${street}, ${city}, or chat on WhatsApp.`;
}

/** schema.org LocalBusiness built from the same facts the page shows (Home's Visit us), so the two can't disagree. */
export function localBusiness() {
  const {street, city, country} = address.value;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    description: description(),
    address: {"@type": "PostalAddress", streetAddress: street, addressLocality: city, addressCountry: country},
    telephone: `+${mainWhatsapp.number.value}`,
    email: email.value,
    sameAs: [social.instagram.value, social.tiktok.value],
    department: shopContacts.map((contact) => ({
      "@type": "LocalBusiness",
      name: contact.name,
      telephone: `+${contact.number.value}`,
    })),
  };
}

/** The head for Home: its own title, the description, link-preview tags and the structured data. */
export function homeHead() {
  return pageHead({title: TITLE, description: description(), structuredData: [localBusiness()]});
}
