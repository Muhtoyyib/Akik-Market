// The photo wall of customer quotes, on Home and Testimonials (testimonials quote-wall spec): every quote, the lead
// quote, and the muted filler photos between the customers.
import {business} from "@/lib/content/business";
import {leadQuote, quote, quotes, since, type Quote} from "@/lib/content/quotes";
import {tilePhoto} from "@/lib/responsive-image";
import {wallLayout} from "@/lib/testimonials";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : photo picks and stand-in copy the owner will replace; tests pin the rules.
// Muted tiles between the customers: Akik's builds, never faces (page spec, no faces). Five of 34 tiles, so customers
// fill 85% of the wall (the user, 2026-11-06).
const FILLERS: [path: string, width: number][] = [
  ["/placeholders/projects/project-bodija-duplex-1.jpg", 1024],
  ["/placeholders/projects/project-oluyole-court-1.jpg", 1024],
  ["/placeholders/projects/project-akobo-bungalow-1.jpg", 1024],
  ["/placeholders/projects/project-jericho-villa-1.jpg", 960],
  ["/placeholders/projects/project-ring-road-apartments-1.jpg", 960],
];

// The wall's quotes after the first three: 26 more stand-ins, so 29 of the wall's 34 tiles are customers.
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
  quote({
    business: "engineering",
    name: "Wale",
    text: "They cleared the site, poured the foundation and kept to the budget we agreed.",
    source: since("ENGINEERING & REAL ESTATE", 2025),
    photo: ["/placeholders/projects/project-alakia-build-1.jpg", 1024, 682],
  }),
  quote({
    business: "autos",
    name: "Kunle",
    text: "My Mustang came with every service record. I knew exactly what I was buying.",
    source: since("AUTOS", 2024),
    photo: ["/placeholders/featured/car-mustang.jpg", 512, 640],
  }),
  quote({
    business: "phones",
    name: "Yemi",
    text: "The headphones were original, and they showed me the serial number before I paid.",
    source: since("PHONES & GADGETS", 2025),
    photo: ["/placeholders/featured/audio-headphones.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Folake",
    text: "Our apartment was finished on time, and the papers were ready the day we moved in.",
    source: since("ENGINEERING & REAL ESTATE", 2024),
    photo: ["/placeholders/featured/home-apartment.jpg", 512, 640],
  }),
  quote({
    business: "autos",
    name: "Zainab",
    text: "They told me the one thing the car needed before I asked. That honesty sold it.",
    source: since("AUTOS", 2025),
    photo: ["/placeholders/featured/car-sedan.jpg", 512, 640],
  }),
  quote({
    business: "phones",
    name: "Chidi",
    text: "I ordered on WhatsApp in the morning and picked up my laptop that afternoon.",
    source: since("PHONES & GADGETS", 2024),
    photo: ["/placeholders/featured/laptop-desk.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Uche",
    text: "Every week I got photos of the build. I never had to chase anyone.",
    source: since("ENGINEERING & REAL ESTATE", 2025),
    photo: ["/placeholders/featured/home-modern.jpg", 512, 640],
  }),
  quote({
    business: "autos",
    name: "Obinna",
    text: "The Porsche was exactly as described, down to the last scratch they pointed out.",
    source: since("AUTOS", 2026),
    photo: ["/placeholders/featured/car-porsche.jpg", 512, 640],
  }),
  quote({
    business: "phones",
    name: "Funke",
    text: "My screen cracked a month in. They fixed it under warranty in two days.",
    source: since("PHONES & GADGETS", 2025),
    photo: ["/placeholders/featured/phone-white.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Aisha",
    text: "They walked us round the estate twice before we chose a plot. No pressure at all.",
    source: since("ENGINEERING & REAL ESTATE", 2026),
    photo: ["/placeholders/news/news-homes.jpg", 960, 640],
  }),
  quote({
    business: "autos",
    name: "Ibrahim",
    text: "I compared prices across Ibadan. Akik's was fair and the car was cleaner.",
    source: since("AUTOS", 2024),
    photo: ["/placeholders/news/news-cars.jpg", 960, 640],
  }),
  quote({
    business: "phones",
    name: "Musa",
    text: "I've bought three phones from Akik for my family. Every one was original.",
    source: since("PHONES & GADGETS", 2024),
    photo: ["/placeholders/news/news-phones.jpg", 960, 640],
  }),
  quote({
    business: "engineering",
    name: "Gbenga",
    text: "The duplex they built for us still has no cracks, two rainy seasons on.",
    source: since("ENGINEERING & REAL ESTATE", 2024),
    photo: ["/placeholders/projects/project-bodija-duplex-2.jpg", 960, 640],
  }),
  quote({
    business: "autos",
    name: "Lola",
    text: "My first car. They explained every paper and helped me register it.",
    source: since("AUTOS", 2025),
    photo: ["/placeholders/stories/story-cars.jpg", 1600, 900],
  }),
  quote({
    business: "phones",
    name: "Sade",
    text: "They moved all my photos and contacts to the new phone before I left the shop.",
    source: since("PHONES & GADGETS", 2026),
    photo: ["/placeholders/stories/story-phones.jpg", 1600, 900],
  }),
  quote({
    business: "engineering",
    name: "Bisi",
    text: "Building from abroad worried me. Akik sent videos and receipts for every stage.",
    source: since("ENGINEERING & REAL ESTATE", 2025),
    photo: ["/placeholders/stories/story-homes.jpg", 1600, 900],
  }),
  quote({
    business: "autos",
    name: "Nneka",
    text: "The SUV had a full inspection report. My mechanic found nothing they hadn't listed.",
    source: since("AUTOS", 2026),
    photo: ["/placeholders/division-autos-photo.jpg", 800, 1000],
  }),
  quote({
    business: "phones",
    name: "Ireti",
    text: "I traded in my old iPhone and paid the difference. Simple, and a fair price.",
    source: since("PHONES & GADGETS", 2026),
    photo: ["/placeholders/division-phones-photo.jpg", 800, 1000],
  }),
  quote({
    business: "engineering",
    name: "Jide",
    text: "Our flat in the court was handed over clean, with every key labelled.",
    source: since("ENGINEERING & REAL ESTATE", 2026),
    photo: ["/placeholders/projects/project-oluyole-court-2.jpg", 1024, 682],
  }),
  quote({
    business: "engineering",
    name: "Adaeze",
    text: "The land survey matched the papers exactly. We started building the next month.",
    source: since("ENGINEERING & REAL ESTATE", 2026),
    photo: ["/placeholders/division-engineering-photo.jpg", 800, 1000],
  }),
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

const wallQuotes = [...quotes, ...moreQuotes];

const fillers = FILLERS.map(([path, width]) => tilePhoto(path, {alt: "", width, height: Math.floor((width * 2) / 3)}));

/** The wall: the lead quote, every quote, and each tile's photo (fillers repeat when the wall outgrows them). */
export const quoteWall = {
  lead: leadQuote,
  quotes: wallQuotes.map((item) => ({...item, businessName: business(item.business).name})),
  rows: wallLayout(wallQuotes.length).map((row) =>
    row.map((tile) => (tile.kind === "customer" ? tile : {...tile, image: fillers[tile.index % fillers.length]!}))
  ),
};
