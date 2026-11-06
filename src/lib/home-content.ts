// Everything Home says about the business. Wrap any value the owner hasn't confirmed in placeholder(...)
// so it shows up in the placeholder report. Approved for the pitch build by the client lead on 2026-11-06.
import {fromFacts, placeholder, real} from "@/lib/content-facts";
import {featuredTabs} from "@/lib/featured";
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

type FeaturedItemInput = {name: string; detail: string; price?: number; photo: string};

// Every featured item is a stand-in until the owner supplies real stock. Photos are StockSnap CC0, see docs/placeholder-media.md.
function featuredItem(number: string, {name, detail, price, photo}: FeaturedItemInput) {
  return placeholder({
    name,
    detail,
    price,
    href: whatsappHref(number, `Hi Akik, I'm interested in the ${name}`),
    image: {src: `/placeholders/featured/${photo}.jpg`, alt: "", width: 512, height: 640},
  });
}

const [phones, engineering, autos] = divisions;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in stock the owner will replace; tests pin the rules (links, order, photos on disk), not the copy.
const featuredGroups = [
  {
    key: phones.key,
    label: "Phones",
    action: "See all phones",
    link: onwardLink(phones.path, whatsappTo(phones.number.value, phones.topic)),
    items: [
      {name: "iPhone 13", detail: "128GB · 1 YEAR WARRANTY", price: 650000, photo: "phone-iphone"},
      {name: "Samsung Galaxy S23", detail: "256GB · 1 YEAR WARRANTY", price: 780000, photo: "phone-samsung"},
      {name: "MacBook Pro 14-inch", detail: "16GB · 512GB SSD", price: 2450000, photo: "laptop-macbook"},
      {name: "Wireless headphones", detail: "NEW · 6 MONTH WARRANTY", photo: "audio-headphones"},
      {name: "Samsung Galaxy A54", detail: "128GB · 1 YEAR WARRANTY", price: 385000, photo: "phone-white"},
      {name: "MacBook Air 13-inch", detail: "8GB · 256GB SSD", price: 1350000, photo: "laptop-desk"},
    ].map((item) => featuredItem(phones.number.value, item)),
  },
  {
    key: engineering.key,
    label: "Homes",
    action: "See all properties",
    link: onwardLink(engineering.path, whatsappTo(engineering.number.value, engineering.topic)),
    items: [
      {name: "4-bedroom detached duplex", detail: "4 BED · AKOBO", photo: "home-duplex"},
      {name: "3-bedroom bungalow", detail: "3 BED · OLUYOLE", price: 45000000, photo: "home-bungalow"},
      {name: "5-bedroom terrace with BQ", detail: "5 BED · BODIJA", photo: "home-terrace"},
      {name: "3-bedroom terrace", detail: "3 BED · JERICHO", price: 65000000, photo: "home-modern"},
      {name: "Furnished 2-bedroom apartment", detail: "2 BED · AKOBO", photo: "home-apartment"},
    ].map((item) => featuredItem(engineering.number.value, item)),
  },
  {
    key: autos.key,
    label: "Cars",
    action: "See all cars",
    link: onwardLink(autos.path, whatsappTo(autos.number.value, autos.topic)),
    items: [
      {name: "2018 Audi A5 Sportback", detail: "2018 · 54,000 KM", price: 21500000, photo: "car-audi"},
      {name: "2019 Mercedes-Benz C300", detail: "2019 · 41,000 KM", price: 32000000, photo: "car-mercedes"},
      {name: "2015 Land Rover Defender", detail: "2015 · 98,000 KM", photo: "car-landrover"},
      {name: "2012 Porsche 911 Carrera", detail: "2012 · 76,000 KM", photo: "car-porsche"},
      {name: "2017 Ford Mustang", detail: "2017 · 62,000 KM", price: 24000000, photo: "car-mustang"},
      {name: "2016 Toyota Camry", detail: "2016 · 88,000 KM", price: 12500000, photo: "car-sedan"},
    ].map((item) => featuredItem(autos.number.value, item)),
  },
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

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
    media: placeholder({poster: "/placeholders/hero-montage-poster.jpg", src: "/placeholders/hero-montage.webm"}),
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
  featured: {
    eyebrow: real("Featured now"),
    heading: placeholder("Just in at Akik"),
    tabs: featuredTabs(featuredGroups),
  },
} as const;
