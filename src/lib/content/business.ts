// Who Akik is and how to reach it: the facts every page shares (site content-source spec, "One home for each fact").
// Wrap any value the owner hasn't confirmed in placeholder(...) so it shows up in the placeholder report.
import {type Fact, placeholder, real} from "@/lib/content-facts";
import {photo, SIZES} from "@/lib/responsive-image";
import {whatsappHref} from "@/lib/whatsapp";

// Placeholder start year, chosen by the client lead; the owner's Instagram goes back to May 2020.
export const startYear = placeholder(2023);

// Confirmed from the platforms' own profile data on 2026-11-06.
export const social = {
  instagram: real("https://www.instagram.com/akikmarket/"),
  tiktok: real("https://www.tiktok.com/@akikmarket"),
};

// Confirmed by the client lead on 2026-11-06.
export const email = real("akikmarket@gmail.com");

// From the owner's Instagram bio; the structured data reads the same values.
export const address = real({street: "Iwo Road Shopping Complex", city: "Ibadan", country: "NG"});

export const hours = placeholder("Mon to Sat, 9am to 6pm");

// Not Akik's shop; alt stays empty so the page doesn't claim it is. Source in docs/placeholder-media.md.
export const shopPhoto = placeholder(photo("/placeholders/visit-shop.jpg", {alt: "", width: 1024, height: 768}, SIZES.fullWidth));

// Both numbers are on the owner's 2023 flyer; which business each belongs to is still unknown.
export const mainNumber = placeholder("2347065470198");
// Confirmed as Akik's by the client lead on 2026-11-06; still placed on Engineering & Real Estate by guess.
const secondNumber = real("2348161894229");
export const greeting = real("Hello Akik, I'd like to ask about");

export function whatsappTo(number: string, topic: string) {
  return {href: whatsappHref(number, `${greeting.value} ${topic}`), hint: "chat on WhatsApp"};
}

export const mainWhatsapp = {number: mainNumber, href: whatsappHref(mainNumber.value, greeting.value)};

// In the order the business grew. `tab` is the short name on tabs by business (Home's Featured and Stories, News).
export const businesses = [
  {key: "phones", name: "Phones & Gadgets", tab: "Phones", path: "/phones-and-gadgets", number: mainNumber, topic: "a phone"},
  {
    key: "engineering",
    name: "Engineering & Real Estate",
    tab: "Homes",
    path: "/engineering",
    number: secondNumber,
    topic: "a house or land",
  },
  {key: "autos", name: "Autos", tab: "Cars", path: "/autos", number: mainNumber, topic: "a car"},
] as const;

export type BusinessKey = (typeof businesses)[number]["key"];

/** The business with this key. */
export function business(key: BusinessKey) {
  return businesses.find((entry) => entry.key === key)!;
}

// About design D3: the phones chapter is the site start year, so Home, the footer and About can't disagree. The later
// years are stand-ins until the owner says when each business began.
export const businessYears = {
  phones: startYear,
  engineering: placeholder(2024),
  autos: placeholder(2025),
} satisfies Record<BusinessKey, Fact<number>>;

/** Every business's WhatsApp, number and hours, for the closing contact block on Home and About. */
export const shopContacts = businesses.map((entry) => ({
  key: entry.key,
  name: entry.name,
  number: entry.number,
  whatsappHref: whatsappTo(entry.number.value, entry.topic).href,
  hours,
}));
