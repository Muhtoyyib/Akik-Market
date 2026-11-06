// Each post's body, as typed blocks (news-pages design D1) so placeholder marking and the report keep working. Only
// the post pages import this, so Home's News never loads a body.
import {placeholder} from "@/lib/content-facts";
import {photo} from "@/lib/responsive-image";

type Photo = {src: string; alt: string; width: number; height: number; srcSet: string; sizes: string};

export type Block =
  | {kind: "paragraph"; text: string}
  | {kind: "heading"; text: string}
  | {kind: "photo"; image: Photo; caption?: string}
  | {kind: "list"; items: string[]};

// The body column's width (max-w-prose at the body size), so a body photo never loads wider than it's drawn.
const BODY_PHOTO = "(min-width: 768px) 672px, 100vw";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in bodies the owner will replace; tests pin the rules.
const blocks: Record<string, Block[]> = {
  "new-phones-this-week": [
    {kind: "paragraph", text: "A new delivery came in on Monday, and most of it is already on the shelves at Iwo Road."},
    {kind: "heading", text: "What came in"},
    {
      kind: "list",
      items: ["iPhone 13, 128GB, in three colours", "Samsung Galaxy S23 and A54", "MacBook Air and MacBook Pro 14-inch"],
    },
    {
      kind: "photo",
      image: photo(
        "/placeholders/featured/phone-iphone.jpg",
        {alt: "A phone held up to show its screen", width: 512, height: 640},
        BODY_PHOTO
      ),
      caption: "Every phone is checked and sealed before it goes on sale.",
    },
    {kind: "paragraph", text: "Each one is original and comes with a year's warranty. Message us to hold one until you can visit."},
  ],
  "jericho-terrace-interiors": [
    {
      kind: "paragraph",
      text: "The inside of the Jericho terrace is done. The kitchens are fitted, the floors are laid and the lights work.",
    },
    {kind: "heading", text: "What's next"},
    {kind: "paragraph", text: "Each buyer walks through their home with our engineer and lists anything to fix before handover."},
  ],
  "fresh-car-arrivals": [
    {kind: "paragraph", text: "A new set of cars is in: saloons for the daily drive and SUVs with room for the family."},
    {kind: "heading", text: "Checked before they're listed"},
    {kind: "list", items: ["Engine, gearbox and brakes inspected", "Papers checked against the car", "Test drives welcome"]},
    {kind: "paragraph", text: "Message Autos on WhatsApp to book a test drive."},
  ],
  "saturday-site-visits": [
    {
      kind: "paragraph",
      text: "Buying a home before it's finished is easier when you can see it rise. So every Saturday morning, our site is open.",
    },
    {kind: "paragraph", text: "An engineer walks you round, shows what's been done that week and answers your questions on the spot."},
    {kind: "paragraph", text: "Message Engineering on WhatsApp the day before so we know to expect you."},
  ],
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

/** Every post's body, keyed by slug, each a placeholder until the owner's own posts replace them. */
export const newsBodies = Object.fromEntries(Object.entries(blocks).map(([slug, body]) => [slug, placeholder(body)]));
