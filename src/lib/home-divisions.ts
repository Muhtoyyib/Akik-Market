// The three businesses, when Akik began and how to reach it. Split from home-content.ts so the footer content can
// share these facts without importing the whole page.
// Wrap any value the owner hasn't confirmed in placeholder(...) so it shows up in the placeholder report.
import {placeholder, real} from "@/lib/content-facts";
import {whatsappHref} from "@/lib/whatsapp";

// Placeholder start year, chosen by the client lead; the owner's Instagram goes back to May 2020.
export const startYear = placeholder(2023);

// Confirmed from the platforms' own profile data on 2026-11-06.
export const social = {
  instagram: real("https://www.instagram.com/akikmarket/"),
  tiktok: real("https://www.tiktok.com/@akikmarket"),
};

// Both numbers are on the owner's 2023 flyer; which business each belongs to is still unknown.
export const mainNumber = placeholder("2347065470198");
// Confirmed as Akik's by the client lead on 2026-11-06; still placed on Engineering & Real Estate by guess.
const secondNumber = real("2348161894229");
export const greeting = real("Hello Akik, I'd like to ask about");

export function whatsappTo(number: string, topic: string) {
  return {href: whatsappHref(number, `${greeting.value} ${topic}`), hint: "chat on WhatsApp"};
}

export const divisions = [
  {
    key: "phones",
    name: "Phones & Gadgets",
    path: "/phones-and-gadgets",
    number: mainNumber,
    topic: "a phone",
    heading: placeholder("Where Akik began"),
    line: placeholder("Original phones, laptops and accessories, with warranty."),
    image: placeholder({src: "/placeholders/division-phones-photo.jpg", alt: "", width: 800, height: 1000}),
  },
  {
    key: "engineering",
    name: "Engineering & Real Estate",
    path: "/engineering",
    number: secondNumber,
    topic: "a house or land",
    heading: placeholder("Homes built and sold"),
    line: placeholder("We build houses and sell land with clean, verified papers."),
    image: placeholder({src: "/placeholders/division-engineering-photo.jpg", alt: "", width: 800, height: 1000}),
  },
  {
    key: "autos",
    name: "Autos",
    path: "/autos",
    number: mainNumber,
    topic: "a car",
    heading: placeholder("Cars you can trust"),
    line: placeholder("Inspected cars, ready to drive, with honest prices."),
    image: placeholder({src: "/placeholders/division-autos-photo.jpg", alt: "", width: 800, height: 1000}),
  },
] as const;
