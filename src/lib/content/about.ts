// Everything the About page says. Wrap any value the owner hasn't confirmed in placeholder(...) so it shows up in the
// placeholder report. Only the order the businesses began in is confirmed (client lead); the story around it is a
// stand-in until the owner tells it.
import {BadgeCheck, FileCheck, Handshake, Store} from "lucide-react";
import {placeholder, real} from "@/lib/content-facts";
import {address, businesses, businessYears, shopContacts, shopPhoto, startYear} from "@/lib/content/business";
import {founderPhotos} from "@/lib/content/founder";
import {pageDescriptions} from "@/lib/content/page-descriptions";
import {projectsBanner} from "@/lib/content/projects-banner";
import {photo, SIZES} from "@/lib/responsive-image";

type Person = {name: string; role: string; photo: {src: string; alt: string; width: number; height: number}};

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
const chapterCopy = {
  phones: {
    heading: placeholder("It started with phones"),
    text: placeholder(
      "Akik opened on Iwo Road selling original phones, laptops and accessories. Every device came with a warranty, and customers came back for their next one."
    ),
    image: placeholder(photo("/placeholders/news/news-phones.jpg", {alt: "", width: 960, height: 640}, SIZES.halfWidth)),
  },
  engineering: {
    heading: placeholder("Then homes and land"),
    text: placeholder(
      "Customers asked us to help them build and buy. We started building homes and selling land, checking every paper before a buyer pays."
    ),
    image: placeholder(photo("/placeholders/news/news-homes.jpg", {alt: "", width: 960, height: 640}, SIZES.halfWidth)),
  },
  autos: {
    heading: placeholder("Then cars"),
    text: placeholder(
      "Cars came next, sold the same way. Each one is inspected and its papers checked before it is listed, and you can test drive it first."
    ),
    image: placeholder(photo("/placeholders/news/news-cars.jpg", {alt: "", width: 960, height: 640}, SIZES.halfWidth)),
  },
};

export const aboutContent = {
  // Real: the order the businesses began in and the address are both confirmed.
  description: pageDescriptions.about,
  founder: {
    photos: founderPhotos,
    heading: placeholder("One name for phones, homes and cars"),
    // Spec (about founder, "Placeholder until supplied"): no invented name.
    name: placeholder("Founder, Akik"),
    // Invented apart from the order of the businesses, so it stays a placeholder even once the start year is confirmed.
    story: placeholder([
      `Akik began in ${startYear.value} as a small phone shop on Iwo Road. The idea was simple: sell only original devices, and stand behind every one of them.`,
      "Customers trusted that promise and asked for more. Some wanted help building a home or buying land without the usual worry over papers. So we started doing that too, with the same care.",
      "Cars followed. Buying a used car in Ibadan can be a gamble, so we inspect each one and check its papers before we list it.",
      "Three businesses now, one way of working: what we sell is what you get.",
    ]),
  },
  timeline: {
    eyebrow: real("How we grew"),
    heading: placeholder("Three businesses, one at a time"),
    chapters: businesses.map((entry) => ({key: entry.key, name: entry.name, year: businessYears[entry.key], ...chapterCopy[entry.key]})),
  },
  values: {
    heading: placeholder("What we promise"),
    rows: [
      placeholder({icon: BadgeCheck, title: "Only the real thing", line: "Original phones, real papers, honest cars."}),
      placeholder({icon: FileCheck, title: "Papers before payment", line: "You see every document before you pay."}),
      placeholder({icon: Store, title: "See it first", line: "Visit the shop, the site or the car before you decide."}),
      placeholder({icon: Handshake, title: "One clear price", line: "Agreed up front and written down, with no hidden fees."}),
    ],
  },
  // Spec (about team, "Real people only"): empty until the owner supplies names, roles and photos.
  team: {heading: real("The people behind Akik"), people: [] as Person[]},
  projectsBanner,
  visit: {heading: placeholder("Come and meet us at Iwo Road"), address, image: shopPhoto, contacts: shopContacts},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
