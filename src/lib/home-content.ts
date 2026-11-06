// Everything Home says about the business. Wrap any value the owner hasn't confirmed in placeholder(...)
// so it shows up in the placeholder report. Approved for the pitch build by the client lead on 2026-11-06.
import {fromFacts, placeholder, real} from "@/lib/content-facts";
import {onwardLink} from "@/lib/onward-link";
import {whatsappHref} from "@/lib/whatsapp";

// Placeholder start year, chosen by the client lead; the owner's Instagram goes back to May 2020.
const startYear = placeholder(2023);

// Both numbers are on the owner's 2023 flyer; which business each belongs to is still unknown.
const mainNumber = placeholder("2347065470198");
const secondNumber = placeholder("2348161894229");
const greeting = real("Hello Akik, I'd like to ask about");

function whatsappTo(number: string, topic: string) {
  return {href: whatsappHref(number, `${greeting.value} ${topic}`), hint: "chat on WhatsApp"};
}

const divisions = [
  {
    key: "phones",
    name: "Phones & Gadgets",
    path: "/phones-and-gadgets",
    number: mainNumber,
    topic: "a phone",
    heading: placeholder("Where Akik began"),
    line: placeholder("Original phones, laptops and accessories, with warranty."),
    image: placeholder({src: "/placeholders/division-phones.jpg", alt: "", width: 800, height: 1000}),
  },
  {
    key: "engineering",
    name: "Engineering & Real Estate",
    path: "/engineering",
    number: secondNumber,
    topic: "a house or land",
    heading: placeholder("Homes built and sold"),
    line: placeholder("We build houses and sell land with clean, verified papers."),
    image: placeholder({src: "/placeholders/division-engineering.jpg", alt: "", width: 800, height: 1000}),
  },
  {
    key: "autos",
    name: "Autos",
    path: "/autos",
    number: mainNumber,
    topic: "a car",
    heading: placeholder("Cars you can trust"),
    line: placeholder("Inspected cars, ready to drive, with honest prices."),
    image: placeholder({src: "/placeholders/division-autos.jpg", alt: "", width: 800, height: 1000}),
  },
] as const;

export const homeContent = {
  startYear,
  social: {
    // Confirmed from the platforms' own profile data on 2026-11-06.
    instagram: real("https://www.instagram.com/akikmarket/"),
    tiktok: real("https://www.tiktok.com/@akikmarket"),
  },
  whatsapp: {
    main: {number: mainNumber, href: whatsappHref(mainNumber.value, greeting.value)},
  },
  announcement: placeholder({text: "New phones arrive every week. See what just came in", href: "https://www.instagram.com/akikmarket/"}),
  hero: {
    media: placeholder({poster: "/placeholders/hero-poster.jpg", src: "/placeholders/hero-loop.webm"}),
    heading: placeholder("Phones, homes and cars from one name you trust."),
    claims: placeholder(["Original phones", "Inspected cars", "Verified land papers"]),
  },
  divisions: {
    eyebrow: real("Three businesses, one name"),
    heading: fromFacts([startYear], `Built on trust since ${startYear.value}`),
    cards: divisions.map((division) => ({
      ...division,
      link: onwardLink(division.path, whatsappTo(division.number.value, division.topic)),
    })),
  },
} as const;
