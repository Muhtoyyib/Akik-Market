// Each post's slug, date, title and description, on their own: the page list and every post's head read these, and
// both are in the JavaScript every page loads, so the photos and bodies stay in news.ts (measured: with the photos here
// every page grew 1.6 KB and went over budget). Placeholder posts, written to match what the owner posts on Instagram.
import {placeholder} from "@/lib/content-facts";

type SummaryInput = {
  slug: string;
  /** YYYY-MM-DD, formatted by newsDate. */
  date: string;
  title: string;
  description: string;
};

function summary({title, description, ...input}: SummaryInput) {
  return {...input, title: placeholder(title), description: placeholder(description)};
}

export type PostSummary = ReturnType<typeof summary>;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in posts the owner will replace; tests pin the rules.
const items: SummaryInput[] = [
  {
    slug: "new-phones-this-week",
    date: "2026-10-30",
    title: "New phones landed this week",
    description: "iPhones, Samsung Galaxy phones and MacBooks are in at Iwo Road, each with a year's warranty.",
  },
  {
    slug: "jericho-terrace-interiors",
    date: "2026-10-14",
    title: "Interiors finished at our Jericho terrace",
    description: "The kitchens, floors and fittings are in at the Jericho terrace, ready for the buyers' final walk-through.",
  },
  {
    slug: "fresh-car-arrivals",
    date: "2026-09-22",
    title: "Fresh car arrivals, inspected and ready",
    description: "A new set of saloons and SUVs, each inspected and with its papers checked before it went on sale.",
  },
  {
    slug: "saturday-site-visits",
    date: "2026-08-15",
    title: "Site visits every Saturday",
    description: "Come and see a home being built: every Saturday morning our engineers walk buyers round a live site.",
  },
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export const newsSummaries = items.map(summary);
