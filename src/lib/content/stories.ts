// Customer stories: one collection, read by Home, the division pages and Testimonials (site content-source spec,
// "Shared collections"). Short quotes live in quotes.ts, so division pages don't load the Testimonials wall.
// Invented stand-ins: no real customer is named until the owner supplies quotes and footage with permission. Story
// photos are stills from Mixkit free clips, with no faces (customer-stories spec, "Placeholder stories").
import {placeholder} from "@/lib/content-facts";
import {startYear, type BusinessKey} from "@/lib/content/business";
import {photo, SIZES} from "@/lib/responsive-image";

function story(business: BusinessKey, value: {name: string; since: string; quote: string; photo: string}) {
  const {photo: image, ...rest} = value;
  return {
    business,
    story: placeholder({
      ...rest,
      image: photo(`/placeholders/stories/${image}.jpg`, {alt: "", width: 1600, height: 900}, SIZES.fullWidth),
    }),
  };
}

export type Story = ReturnType<typeof story>;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
export const stories: Story[] = [
  story("phones", {
    name: "CHIAMAKA",
    since: `CUSTOMER SINCE ${startYear.value}`,
    quote: "My phone from Akik is still going strong two years on. When I upgraded, I didn't look anywhere else.",
    photo: "story-phones",
  }),
  story("engineering", {
    name: "FEMI",
    since: "CUSTOMER SINCE 2024",
    quote: "Akik checked the land papers, built the house and handed us the keys. We moved in last December.",
    photo: "story-homes",
  }),
  story("autos", {
    name: "IFEOMA",
    since: "CUSTOMER SINCE 2025",
    quote: "They sent videos, the inspection report and the papers before I paid. The car had no surprises.",
    photo: "story-cars",
  }),
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
