// What the Engineering & Real Estate page says that is its own. Every promise, service and claim is a stand-in until
// the owner confirms it (division-pages proposal, "Business facts and placeholders"). Photos: docs/placeholder-media.md.
import {placeholder, real} from "@/lib/content-facts";
import {photo, SIZES} from "@/lib/responsive-image";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
export const engineeringPage = {
  description: placeholder("Homes built and sold, land with verified papers, and building and renovation, from Akik on Iwo Road, Ibadan."),
  hero: {
    media: placeholder(photo("/placeholders/news/news-homes.jpg", {alt: "", width: 960, height: 640}, SIZES.fullWidth)),
    heading: placeholder("Homes built well, land with clean papers"),
    claims: placeholder(["Verified land papers", "Site visits any day", "Handover you can see"]),
  },
  offer: {
    eyebrow: real("What we sell"),
    heading: placeholder("Homes, land and building"),
    cards: [
      placeholder({
        title: "Houses",
        line: "Duplexes, bungalows and terraces, ready to move in.",
        image: photo("/placeholders/featured/home-duplex.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Land",
        line: "Plots with verified papers in growing areas of Ibadan.",
        image: photo("/placeholders/featured/home-modern.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
      placeholder({
        title: "Apartments",
        line: "Furnished and unfurnished flats to buy.",
        image: photo("/placeholders/featured/home-apartment.jpg", {alt: "", width: 512, height: 640}, SIZES.cardRow),
      }),
    ],
  },
  stock: {eyebrow: real("For sale"), heading: placeholder("Homes and land for sale now"), action: real("See all properties")},
  steps: {
    heading: placeholder("How buying a home works"),
    image: placeholder(photo("/placeholders/division-engineering-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.halfWidth)),
    rows: [
      placeholder({icon: "store" as const, title: "Visit the site", line: "See the house or plot with us, any day of the week."}),
      placeholder({icon: "file-check" as const, title: "Check the papers", line: "We show you the title documents before you pay."}),
      placeholder({icon: "handshake" as const, title: "Agree the price", line: "One clear price, written down, with no hidden fees."}),
      placeholder({icon: "key" as const, title: "Get the keys", line: "Handover on site, with every document in your name."}),
    ],
  },
  services: {
    heading: placeholder("Building and renovation"),
    rows: [
      placeholder({icon: "hammer" as const, title: "Building from the ground up", line: "We build on your land, from plans to roof."}),
      placeholder({icon: "paint-roller" as const, title: "Renovation", line: "We refresh and extend homes you already own."}),
      placeholder({icon: "hard-hat" as const, title: "Site supervision", line: "We manage builders and materials so you don't have to."}),
      placeholder({icon: "land-plot" as const, title: "Land sales", line: "Plots with clean papers, surveyed and marked out."}),
    ],
  },
  contact: {heading: placeholder("Talk to us about a home at Iwo Road")},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
