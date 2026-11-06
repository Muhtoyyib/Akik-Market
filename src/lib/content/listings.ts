// Everything for sale that the site shows: one collection, read by Home's Featured now and, later, the division and
// Listings pages (site content-source spec, "Shared collections"). Remove an item here and it leaves every page.
// Every item is a stand-in until the owner supplies real stock. Photos are StockSnap CC0, see docs/placeholder-media.md.
import {placeholder} from "@/lib/content-facts";
import {business, type BusinessKey} from "@/lib/content/business";
import {photo, SIZES} from "@/lib/responsive-image";
import {whatsappHref} from "@/lib/whatsapp";

type ListingInput = {business: BusinessKey; name: string; detail: string; price?: number; photo: string};

function listing({business: key, name, detail, price, photo: image}: ListingInput) {
  return placeholder({
    business: key,
    name,
    detail,
    price,
    href: whatsappHref(business(key).number.value, `Hi Akik, I'm interested in the ${name}`),
    image: photo(`/placeholders/featured/${image}.jpg`, {alt: "", width: 512, height: 640}, SIZES.cardRow),
  });
}

export type Listing = ReturnType<typeof listing>;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in stock the owner will replace; tests pin the rules (links, order, photos on disk), not the copy.
const items: ListingInput[] = [
  {business: "phones", name: "iPhone 13", detail: "128GB · 1 YEAR WARRANTY", price: 650000, photo: "phone-iphone"},
  {business: "phones", name: "Samsung Galaxy S23", detail: "256GB · 1 YEAR WARRANTY", price: 780000, photo: "phone-samsung"},
  {business: "phones", name: "MacBook Pro 14-inch", detail: "16GB · 512GB SSD", price: 2450000, photo: "laptop-macbook"},
  {business: "phones", name: "Wireless headphones", detail: "NEW · 6 MONTH WARRANTY", photo: "audio-headphones"},
  {business: "phones", name: "Samsung Galaxy A54", detail: "128GB · 1 YEAR WARRANTY", price: 385000, photo: "phone-white"},
  {business: "phones", name: "MacBook Air 13-inch", detail: "8GB · 256GB SSD", price: 1350000, photo: "laptop-desk"},
  {business: "engineering", name: "4-bedroom detached duplex", detail: "4 BED · AKOBO", photo: "home-duplex"},
  {business: "engineering", name: "3-bedroom bungalow", detail: "3 BED · OLUYOLE", price: 45000000, photo: "home-bungalow"},
  {business: "engineering", name: "5-bedroom terrace with BQ", detail: "5 BED · BODIJA", photo: "home-terrace"},
  {business: "engineering", name: "3-bedroom terrace", detail: "3 BED · JERICHO", price: 65000000, photo: "home-modern"},
  {business: "engineering", name: "Furnished 2-bedroom apartment", detail: "2 BED · AKOBO", photo: "home-apartment"},
  {business: "autos", name: "2018 Audi A5 Sportback", detail: "2018 · 54,000 KM", price: 21500000, photo: "car-audi"},
  {business: "autos", name: "2019 Mercedes-Benz C300", detail: "2019 · 41,000 KM", price: 32000000, photo: "car-mercedes"},
  {business: "autos", name: "2015 Land Rover Defender", detail: "2015 · 98,000 KM", photo: "car-landrover"},
  {business: "autos", name: "2012 Porsche 911 Carrera", detail: "2012 · 76,000 KM", photo: "car-porsche"},
  {business: "autos", name: "2017 Ford Mustang", detail: "2017 · 62,000 KM", price: 24000000, photo: "car-mustang"},
  {business: "autos", name: "2016 Toyota Camry", detail: "2016 · 88,000 KM", price: 12500000, photo: "car-sedan"},
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export const listings: Listing[] = items.map(listing);
