import {email, mainWhatsapp, social} from "@/lib/content/business";
import {pageHead} from "@/lib/page-head";
import type {homeContent} from "@/lib/content/home";

type HomeContent = typeof homeContent;

// Spec (page-shell, metadata). Open Graph needs an absolute image URL, so the share image waits for the domain.
const TITLE = "Akik · Phones, homes and cars in Ibadan";
const BUSINESS_NAME = "Akik Market";

function description({visit}: HomeContent): string {
  const {street, city} = visit.address.value;
  return `Original phones, homes and land with clean papers, and inspected cars. Visit Akik at ${street}, ${city}, or chat on WhatsApp.`;
}

/** schema.org LocalBusiness built from the same content the page shows, so the two can't disagree. */
export function localBusiness(content: HomeContent) {
  const {street, city, country} = content.visit.address.value;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    description: description(content),
    address: {"@type": "PostalAddress", streetAddress: street, addressLocality: city, addressCountry: country},
    telephone: `+${mainWhatsapp.number.value}`,
    email: email.value,
    sameAs: [social.instagram.value, social.tiktok.value],
    department: content.visit.contacts.map((contact) => ({
      "@type": "LocalBusiness",
      name: contact.name,
      telephone: `+${contact.number.value}`,
    })),
  };
}

/** The head for Home: its own title, the description, link-preview tags and the structured data. */
export function homeHead(content: HomeContent) {
  return pageHead({title: TITLE, description: description(content), structuredData: [localBusiness(content)]});
}
