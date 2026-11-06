// Everything Home says that is Home's own. Site-wide facts come from business.ts and site.ts; listings, posts and stories
// from their collections. Wrap any value the owner hasn't confirmed in placeholder(...) so it shows up in the placeholder
// report. Approved for the pitch build by the client lead on 2026-11-06.
import {fromFacts, placeholder, real} from "@/lib/content-facts";
import {address, businesses, shopContacts, shopPhoto, social, startYear, whatsappTo, type BusinessKey} from "@/lib/content/business";
import {founderPhotos} from "@/lib/content/founder";
import {homeFeatured, homeNews, homeStories} from "@/lib/content/home-collections";
import {listings} from "@/lib/content/listings";
import {posts} from "@/lib/content/news";
import {leadQuote, quotes, stories} from "@/lib/content/stories";
import {projectsBanner} from "@/lib/content/projects-banner";
import {onwardLink} from "@/lib/onward-link";
import {photo, SIZES, variantPath} from "@/lib/responsive-image";
import {pageExists} from "@/lib/site-pages";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in copy the owner will replace; tests pin the rules.
// Each business's card on Home.
const cardCopy = {
  phones: {
    heading: placeholder("Where Akik began"),
    line: placeholder("Original phones, laptops and accessories, with warranty."),
    image: placeholder(photo("/placeholders/division-phones-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.cardRow)),
  },
  engineering: {
    heading: placeholder("Homes built and sold"),
    line: placeholder("We build houses and sell land with clean, verified papers."),
    image: placeholder(photo("/placeholders/division-engineering-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.cardRow)),
  },
  autos: {
    heading: placeholder("Cars you can trust"),
    line: placeholder("Inspected cars, ready to drive, with honest prices."),
    image: placeholder(photo("/placeholders/division-autos-photo.jpg", {alt: "", width: 800, height: 1000}, SIZES.cardRow)),
  },
} satisfies Record<BusinessKey, object>;

const newsPath = "/news";

const news = {
  eyebrow: real("News"),
  heading: placeholder("What's new at Akik"),
  posts: homeNews(posts),
  action: pageExists(newsPath) ? {label: "More news", href: newsPath} : {label: "Follow us on Instagram", href: social.instagram.value},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export const homeContent = {
  hero: {
    media: placeholder({poster: variantPath("/placeholders/hero-montage-poster.jpg", 1280), src: "/placeholders/hero-montage.webm"}),
    heading: placeholder("Phones, homes and cars from one name you trust."),
    claims: placeholder(["Original phones", "Inspected cars", "Verified land papers"]),
  },
  divisions: {
    eyebrow: real("Three businesses, one name"),
    heading: fromFacts([startYear], `Built on trust since ${startYear.value}`),
    cards: businesses.map((entry) => ({
      ...entry,
      ...cardCopy[entry.key],
      link: onwardLink(entry.path, whatsappTo(entry.number.value, entry.topic)),
    })),
  },
  proof: {
    heading: real("What customers say"),
    lead: leadQuote,
    columns: quotes.map(({business, quote, source}) => ({key: business, quote, source})),
  },
  stories: {
    heading: real("Customer stories"),
    tabs: homeStories(stories),
  },
  projects: projectsBanner,
  news,
  // Spec (founder): the founder's own photos and story replace these; the story is invented apart from the order of
  // the businesses, so it stays a placeholder even once the start year is confirmed.
  founder: {
    photos: founderPhotos,
    heading: placeholder("From one phone shop to three businesses"),
    story: placeholder(
      `Akik began in ${startYear.value} as a small shop selling original phones and gadgets. Customers kept coming back and asked for more, so we started building homes and selling land with clean papers. Then came inspected cars. Three businesses now, one promise: what we sell is what you get.`
    ),
    link: pageExists("/about") ? {label: "Read our story", href: "/about"} : undefined,
  },
  // Spec (visit-us). Address and hours are the site-wide facts, so Contact and the division pages show the same.
  visit: {
    heading: placeholder("Come and see us at Iwo Road"),
    address,
    image: shopPhoto,
    contacts: shopContacts,
  },
  // Spec (buy-with-confidence, "Promises are owner-approved"): every claim waits for the owner's sign-off.
  trust: {
    heading: placeholder("Buy with confidence"),
    image: placeholder(photo("/placeholders/trust-handshake.jpg", {alt: "", width: 800, height: 1000}, SIZES.halfWidth)),
    rows: [
      placeholder({icon: "shield" as const, title: "Genuine phones", line: "Every device is original, with warranty."}),
      placeholder({icon: "clipboard-check" as const, title: "Inspected cars", line: "Each car is checked before it's listed."}),
      placeholder({icon: "file-check" as const, title: "Verified land papers", line: "We confirm the documents before you pay."}),
      placeholder({icon: "key" as const, title: "Handover you can see", line: "Visit the site or the car before you commit."}),
    ],
  },
  featured: {
    eyebrow: real("Featured now"),
    heading: placeholder("Just in at Akik"),
    tabs: homeFeatured(listings),
  },
} as const;
