// What the Autos page says that is its own. Every promise and claim is a stand-in until the owner confirms it
// (division-pages proposal, "Business facts and placeholders"). Photos: docs/placeholder-media.md.
import {placeholder, real, type Fact} from "@/lib/content-facts";
import {pageDescriptions} from "@/lib/content/page-descriptions";
import {photo, SIZES} from "@/lib/responsive-image";

// Design D4: financing appears only with the owner's own terms, never as a stand-in. Not offered until they say so.
const financing: Fact<{heading: string; terms: string}> | undefined = undefined;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
export const autosPage = {
  description: pageDescriptions.autos,
  hero: {
    media: placeholder(photo("/placeholders/news/news-cars.jpg", {alt: "", width: 960, height: 640}, SIZES.fullWidth)),
    heading: placeholder("Inspected cars, honest prices"),
    claims: placeholder(["Inspected before listing", "Papers checked", "Test drives welcome"]),
  },
  offer: {
    eyebrow: real("What we sell"),
    heading: placeholder("Cars for every budget"),
    cards: [
      placeholder({
        title: "Saloons",
        line: "Reliable everyday cars, easy on fuel.",
        image: photo("/placeholders/featured/car-sedan.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "SUVs",
        line: "Room for the family and Ibadan's roads.",
        image: photo("/placeholders/featured/car-landrover.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Executive",
        line: "Mercedes-Benz, Audi and more, kept well.",
        image: photo("/placeholders/featured/car-mercedes.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Sports cars",
        line: "For the drive you've been waiting for.",
        image: photo("/placeholders/featured/car-porsche.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
    ],
  },
  stock: {eyebrow: real("In stock"), heading: placeholder("Cars ready to drive"), action: real("See all cars")},
  steps: {
    heading: placeholder("How buying a car works"),
    image: placeholder(photo("/placeholders/division-autos-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.halfWidth)),
    rows: [
      placeholder({icon: "message" as const, title: "Ask about a car", line: "We send videos, the price and the papers on WhatsApp."}),
      placeholder({icon: "clipboard-check" as const, title: "Read the inspection report", line: "See what we checked before you visit."}),
      placeholder({icon: "gauge" as const, title: "Test drive it", line: "Drive the car at Iwo Road before you decide."}),
      placeholder({icon: "key" as const, title: "Drive it home", line: "Pay, sign and leave with the keys and the papers."}),
    ],
  },
  inspection: {
    heading: placeholder("What we check on every car"),
    rows: [
      placeholder({icon: "cog" as const, title: "Engine and gearbox", line: "Started cold, listened to and scanned for fault codes."}),
      placeholder({icon: "car" as const, title: "Body and paint", line: "Checked for accident repairs and rust."}),
      placeholder({icon: "file-check" as const, title: "Papers", line: "Customs, registration and ownership confirmed."}),
      placeholder({icon: "gauge" as const, title: "Test drive", line: "Driven on the road before it's listed."}),
    ],
    report: placeholder("You get the full report before you pay."),
    financing,
  },
  contact: {heading: placeholder("See our cars at Iwo Road")},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
