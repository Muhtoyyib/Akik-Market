// The Contact page's own words; the numbers, hours, email, address and shop photo are the site-wide facts in
// business.ts, so this page, Home and the structured data can't disagree (contact-page specs).
import {placeholder, real} from "@/lib/content-facts";
import {address, businesses, email, shopContacts, shopPhoto, social} from "@/lib/content/business";

// Stryker disable StringLiteral,ObjectLiteral : copy from the contact specs; tests pin the rules.
export const contactIndex = {
  heading: placeholder("Talk to the right business"),
  intro: placeholder("WhatsApp is the fastest way to reach us. Or write below and we'll reply on WhatsApp or email."),
};

export const contactChannels = {
  heading: real("Every way to reach us"),
  contacts: shopContacts,
  email,
  social: [
    {label: "Instagram", href: social.instagram.value},
    {label: "TikTok", href: social.tiktok.value},
  ],
};

export const contactForm = {
  heading: real("Send us a message"),
  // Spec ("Works without JavaScript failing silently"): shown always, so it is true before and after scripts load.
  note: real("Prefer not to fill in a form? The WhatsApp links above go straight to each business."),
  businesses: businesses.map((entry) => ({value: entry.key, label: entry.name})),
};

export const contactLocation = {heading: placeholder("Find us at Iwo Road"), address, image: shopPhoto};
// Stryker restore StringLiteral,ObjectLiteral
