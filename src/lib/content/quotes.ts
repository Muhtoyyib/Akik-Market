// Customer quotes: the lead quote and one short quote per business, for Home's proof and the Testimonials wall (site content-source
// spec, "Shared collections"). Apart from stories.ts because division pages read stories only: together, every
// division page carried the whole wall (measured: 172.8 KB, over the 172 KB budget). The wall's other quotes live in
// testimonials-page.ts, so Home doesn't load them either.
// Invented stand-ins: no real customer is named until the owner supplies quotes with permission.
import {type Fact, fromFacts, placeholder} from "@/lib/content-facts";
import {startYear, type BusinessKey} from "@/lib/content/business";
import {tilePhoto} from "@/lib/responsive-image";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
// The one quote that speaks for all three businesses.
export const leadQuote = placeholder({
  before: "I bought my phone from Akik, then my car. Now they are building my house.",
  highlight: "I trust them with everything.",
  source: "TUNDE A. · CUSTOMER OF ALL THREE BUSINESSES",
});

// Spec (testimonials page, "Permission for real customers"): a real quote records when the customer agreed and who
// recorded it; placeholders use a first name only and no face, so each shows a photo of what was bought instead.
type Permission = {date: string; recordedBy: string};

type QuoteInput = {
  business: BusinessKey;
  /** First name only while the quote is a placeholder. */
  name: string;
  text: string;
  source: Fact<string>;
  /** What the customer bought: the photo on their wall tile, cropped round. */
  photo: [path: string, width: number, height: number];
  permission?: Permission;
};

export function quote({text, photo: [path, width, height], ...input}: QuoteInput) {
  return {...input, quote: placeholder(text), photo: tilePhoto(path, {alt: "", width, height})};
}

export type Quote = ReturnType<typeof quote>;

export const since = (business: string, year: number | string) => placeholder(`${business} · CUSTOMER SINCE ${year}`);

export const quotes: Quote[] = [
  quote({
    business: "phones",
    name: "Kemi",
    text: "Original phone, fair price, and every question answered on WhatsApp.",
    source: fromFacts([startYear], `PHONES & GADGETS · CUSTOMER SINCE ${startYear.value}`),
    photo: ["/placeholders/featured/phone-iphone.jpg", 512, 640],
  }),
  quote({
    business: "engineering",
    name: "Ngozi",
    text: "Our land papers were checked and clean before we paid a kobo.",
    source: since("ENGINEERING & REAL ESTATE", 2024),
    photo: ["/placeholders/featured/home-duplex.jpg", 512, 640],
  }),
  quote({
    business: "autos",
    name: "Emeka",
    text: "The car came inspected, with a full report. It drives like new.",
    source: since("AUTOS", 2025),
    photo: ["/placeholders/featured/car-audi.jpg", 512, 640],
  }),
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
