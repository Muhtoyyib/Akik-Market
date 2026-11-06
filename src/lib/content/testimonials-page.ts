// The Testimonials page: its own words, the photo wall's filler photos, and what it takes from the stories
// collection (testimonials-page specs).
import {placeholder, real} from "@/lib/content-facts";
import {business, mainWhatsapp} from "@/lib/content/business";
import {leadQuote, quote, quotes, since, type Quote} from "@/lib/content/quotes";
import {stories, type Story} from "@/lib/content/stories";
import {photo} from "@/lib/responsive-image";
import {storyTabLabel, wallLayout} from "@/lib/testimonials";
import {whatsappHref} from "@/lib/whatsapp";

// A wall tile is drawn at most 112px wide; the smallest copy (480) is the one loaded.
const TILE = "112px";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : copy and photo picks from the testimonials specs; tests pin the rules.
export const testimonialsIndex = {
  heading: placeholder("What our customers say"),
  intro: placeholder("Phones, homes and cars: the people who bought them, in their own words."),
};

export const testimonialsShare = {
  heading: placeholder("Bought from Akik? Tell us how it went."),
  action: real("Share your story on WhatsApp"),
  // Spec (share, "Share on WhatsApp"): the message is fixed by the spec.
  href: whatsappHref(mainWhatsapp.number.value, "Hello Akik, I'd like to share my story"),
};

// Muted tiles between the customers: Akik's kind of stock and builds, never faces (page spec, no faces).
const FILLERS: [path: string, width: number][] = [
  ["/placeholders/featured/audio-headphones.jpg", 512],
  ["/placeholders/projects/project-bodija-duplex-1.jpg", 1024],
  ["/placeholders/featured/car-porsche.jpg", 512],
  ["/placeholders/featured/phone-white.jpg", 512],
  ["/placeholders/projects/project-oluyole-court-1.jpg", 1024],
  ["/placeholders/featured/car-mustang.jpg", 512],
  ["/placeholders/featured/laptop-desk.jpg", 512],
  ["/placeholders/featured/home-modern.jpg", 512],
  ["/placeholders/featured/car-sedan.jpg", 512],
  ["/placeholders/news/news-phones.jpg", 960],
  ["/placeholders/projects/project-akobo-bungalow-1.jpg", 1024],
  ["/placeholders/news/news-cars.jpg", 960],
  ["/placeholders/featured/home-apartment.jpg", 512],
  ["/placeholders/projects/project-jericho-villa-1.jpg", 960],
  ["/placeholders/news/news-homes.jpg", 960],
  ["/placeholders/projects/project-ring-road-apartments-1.jpg", 960],
];

// The wall's quotes after Home's three: a second and third customer for each business.
export const moreQuotes: Quote[] = [
  quote({
    business: "phones",
    name: "Segun",
    text: "I traded in my old phone and walked out with a better one the same afternoon.",
    source: since("PHONES & GADGETS", 2024),
    photo: ["/placeholders/featured/phone-samsung.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Tayo",
    text: "They sent photos of the site every week while I was abroad. The house was ready when they said.",
    source: since("ENGINEERING & REAL ESTATE", 2024),
    photo: ["/placeholders/featured/home-bungalow.jpg", 512, 640],
  }),
  quote({
    business: "autos",
    name: "Dapo",
    text: "I test drove three cars before choosing. Nobody rushed me, and the price didn't move.",
    source: since("AUTOS", 2025),
    photo: ["/placeholders/featured/car-mercedes.jpg", 512, 640],
  }),
  quote({
    business: "phones",
    name: "Bola",
    text: "My laptop came sealed with its warranty card. Repairs since then have been quick.",
    source: since("PHONES & GADGETS", 2025),
    photo: ["/placeholders/featured/laptop-macbook.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Amaka",
    text: "We bought a plot with every document in order. The survey matched what we saw on the ground.",
    source: since("ENGINEERING & REAL ESTATE", 2025),
    photo: ["/placeholders/featured/home-terrace.jpg", 512, 640],
  }),
  quote({
    business: "autos",
    name: "Halima",
    text: "The papers were in my name before I drove away. That is all I wanted.",
    source: since("AUTOS", 2025),
    photo: ["/placeholders/featured/car-landrover.jpg", 512, 640],
  }),
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

const wallQuotes = [...quotes, ...moreQuotes];

const fillers = FILLERS.map(([path, width]) => photo(path, {alt: "", width, height: Math.floor((width * 2) / 3)}, TILE));

/** The wall: the lead quote, every quote, and each tile's photo (fillers repeat when the wall outgrows them). */
export const testimonialsWall = {
  lead: leadQuote,
  quotes: wallQuotes.map((item) => ({...item, businessName: business(item.business).name})),
  rows: wallLayout(wallQuotes.length).map((row) =>
    row.map((tile) => (tile.kind === "customer" ? tile : {...tile, image: fillers[tile.index % fillers.length]!}))
  ),
};

/** Every story, one tab each, labelled by business (and first name when a business has several). */
export function storyTabs(all: readonly Story[]) {
  return all.map((entry, index) => {
    const ofBusiness = all.filter((other) => other.business === entry.business).length;
    return {
      key: `${entry.business}-${index}`,
      label: storyTabLabel(business(entry.business).tab, entry.story.value.name, ofBusiness),
      story: entry.story,
    };
  });
}

export const testimonialsStories = storyTabs(stories);
