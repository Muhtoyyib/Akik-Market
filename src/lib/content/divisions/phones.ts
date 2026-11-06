// What the Phones & Gadgets page says that is its own. Every promise, service and claim is a stand-in until the owner
// confirms it (division-pages proposal, "Business facts and placeholders"). Photos: docs/placeholder-media.md.
import {BadgeCheck, MessageCircle, RefreshCw, Shield, Store, Wrench} from "lucide-react";
import {placeholder, real} from "@/lib/content-facts";
import {pageDescriptions} from "@/lib/content/page-descriptions";
import {photo, SIZES} from "@/lib/responsive-image";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
export const phonesPage = {
  description: pageDescriptions.phones,
  hero: {
    media: placeholder(photo("/placeholders/news/news-phones.jpg", {alt: "", width: 960, height: 640}, SIZES.fullWidth)),
    heading: placeholder("Original phones and laptops, with warranty"),
    claims: placeholder(["Original devices", "Warranty on every phone", "Trade-ins welcome"]),
  },
  offer: {
    eyebrow: real("What we sell"),
    heading: placeholder("Phones, laptops and accessories"),
    cards: [
      placeholder({
        title: "Phones",
        line: "iPhone, Samsung and more, new and UK-used.",
        image: photo("/placeholders/featured/phone-iphone.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Laptops",
        line: "MacBook and Windows laptops for work and school.",
        image: photo("/placeholders/featured/laptop-macbook.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Accessories",
        line: "Headphones, chargers, cases and power banks.",
        image: photo("/placeholders/featured/audio-headphones.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
    ],
  },
  stock: {eyebrow: real("In stock"), heading: placeholder("Just in at Phones & Gadgets"), action: real("See all phones")},
  steps: {
    heading: placeholder("How buying a phone works"),
    image: placeholder(photo("/placeholders/division-phones-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.halfWidth)),
    rows: [
      placeholder({icon: MessageCircle, title: "Ask on WhatsApp", line: "Tell us the phone you want; we send photos and the price."}),
      placeholder({icon: Store, title: "See it at the shop", line: "Try the phone at Iwo Road before you pay."}),
      placeholder({icon: BadgeCheck, title: "Check it's original", line: "We open the box with you and check the serial."}),
      placeholder({icon: Shield, title: "Leave with a warranty", line: "Every phone comes with a written warranty."}),
    ],
  },
  services: {
    heading: placeholder("Trade-ins, repairs and warranty"),
    topic: real("a trade-in or repair"),
    groups: [
      {
        title: real("Trade-in"),
        rows: [
          placeholder({
            icon: RefreshCw,
            title: "Bring your old phone",
            line: "We price it on the spot and take it off your new one.",
          }),
        ],
      },
      {
        title: real("Repairs"),
        rows: [placeholder({icon: Wrench, title: "Screens and batteries", line: "Most repairs are done the same day."})],
      },
      {
        title: real("Warranty"),
        rows: [
          placeholder({
            icon: Shield,
            title: "Covered for a year",
            line: "Faults are covered for 12 months from the day you buy.",
          }),
        ],
      },
    ],
    brands: placeholder(["Apple", "Samsung", "Tecno", "Infinix", "HP", "Dell"]),
  },
  contact: {heading: placeholder("Try a phone at Iwo Road")},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
