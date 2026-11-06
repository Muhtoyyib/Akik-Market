// Customer stories and quotes: one collection, read by Home and, later, the Testimonials and division pages
// (site content-source spec, "Shared collections").
// Invented stand-ins: no real customer is named until the owner supplies quotes and footage with permission. Story
// photos are stills from Mixkit free clips, with no faces (customer-stories spec, "Placeholder stories").
import {fromFacts, placeholder} from "@/lib/content-facts";
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

// The one quote that speaks for all three businesses.
export const leadQuote = placeholder({
  before: "I bought my phone from Akik, then my car. Now they are building my house.",
  highlight: "I trust them with everything.",
  source: "TUNDE A. · CUSTOMER OF ALL THREE BUSINESSES",
});

export const quotes = [
  {
    business: "phones",
    quote: placeholder("Original phone, fair price, and every question answered on WhatsApp."),
    source: fromFacts([startYear], `PHONES & GADGETS · CUSTOMER SINCE ${startYear.value}`),
  },
  {
    business: "engineering",
    quote: placeholder("Our land papers were checked and clean before we paid a kobo."),
    source: placeholder("ENGINEERING & REAL ESTATE · CUSTOMER SINCE 2024"),
  },
  {
    business: "autos",
    quote: placeholder("The car came inspected, with a full report. It drives like new."),
    source: placeholder("AUTOS · CUSTOMER SINCE 2025"),
  },
] satisfies {business: BusinessKey; quote: unknown; source: unknown}[];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
