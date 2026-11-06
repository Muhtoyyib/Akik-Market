// Everything Home says about the business. Wrap any value the owner hasn't confirmed in placeholder(...)
// so it shows up in the placeholder report. Approved for the pitch build by the client lead on 2026-11-06.
import {fromFacts, placeholder, real} from "@/lib/content-facts";
import {featuredTabs} from "@/lib/featured";
import {footer} from "@/lib/home-footer";
import {latestPosts} from "@/lib/news";
import {onwardLink} from "@/lib/onward-link";
import {photo, SIZES, variantPath} from "@/lib/responsive-image";
import {pageExists} from "@/lib/site-pages";
import {whatsappHref} from "@/lib/whatsapp";
import {divisions, greeting, mainNumber, social, startYear, whatsappTo} from "@/lib/home-divisions";

type FeaturedItemInput = {name: string; detail: string; price?: number; photo: string};

// Every featured item is a stand-in until the owner supplies real stock. Photos are StockSnap CC0, see docs/placeholder-media.md.
function featuredItem(number: string, {name, detail, price, photo: image}: FeaturedItemInput) {
  return placeholder({
    name,
    detail,
    price,
    href: whatsappHref(number, `Hi Akik, I'm interested in the ${name}`),
    image: photo(`/placeholders/featured/${image}.jpg`, {alt: "", width: 512, height: 640}, SIZES.cardRow),
  });
}

const [phones, engineering, autos] = divisions;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in stock the owner will replace; tests pin the rules (links, order, photos on disk), not the copy.
const projectsPath = "/projects";

// Spec (projects-banner, "Link target"): until the Projects page exists the heading says where the card really goes.
const projects = {
  eyebrow: real(engineering.name),
  heading: pageExists(projectsPath) ? placeholder("Homes we've built and handed over") : real("Ask about our projects on WhatsApp"),
  link: onwardLink(projectsPath, whatsappTo(engineering.number.value, "your projects")),
  // Not an Akik building; alt stays empty so the page doesn't claim it is. Source in docs/placeholder-media.md.
  image: placeholder(photo("/placeholders/projects-house.jpg", {alt: "", width: 1024, height: 768}, SIZES.fullWidth)),
};

const newsPath = "/news";

// Spec (news, "Links"): cards link to their posts only once the News page exists; until then the action is Instagram.
function newsPost({slug, ...post}: {slug: string; date: string; title: string; photo: string}) {
  return {
    date: post.date,
    title: placeholder(post.title),
    href: pageExists(newsPath) ? `${newsPath}/${slug}` : undefined,
    image: placeholder(photo(`/placeholders/news/${post.photo}.jpg`, {alt: "", width: 960, height: 640}, SIZES.cardRow)),
  };
}

const news = {
  eyebrow: real("News"),
  heading: placeholder("What's new at Akik"),
  // Placeholder posts, written to match what the owner posts on Instagram: stock arrivals, handovers, cars.
  posts: latestPosts(
    [
      {slug: "new-phones-this-week", date: "2026-10-30", title: "New phones landed this week", photo: "news-phones"},
      {slug: "jericho-terrace-interiors", date: "2026-10-14", title: "Interiors finished at our Jericho terrace", photo: "news-homes"},
      {slug: "fresh-car-arrivals", date: "2026-09-22", title: "Fresh car arrivals, inspected and ready", photo: "news-cars"},
    ].map(newsPost)
  ),
  action: pageExists(newsPath) ? {label: "More news", href: newsPath} : {label: "Follow us on Instagram", href: social.instagram.value},
};

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
  social,
  whatsapp: {
    main: {number: mainNumber, href: whatsappHref(mainNumber.value, greeting.value)},
  },
  // Confirmed by the client lead on 2026-11-06.
  email: real("akikmarket@gmail.com"),
  announcement: placeholder({text: "New phones arrive every week. See what just came in", href: social.instagram.value}),
  hero: {
    media: placeholder({poster: variantPath("/placeholders/hero-montage-poster.jpg", 1280), src: "/placeholders/hero-montage.webm"}),
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
  proof: {
    heading: real("What customers say"),
    // Invented stand-ins: no real customer is named until the owner supplies quotes with permission.
    lead: placeholder({
      before: "I bought my phone from Akik, then my car. Now they are building my house.",
      highlight: "I trust them with everything.",
      source: "TUNDE A. · CUSTOMER OF ALL THREE BUSINESSES",
    }),
    columns: [
      {
        key: phones.key,
        quote: placeholder("Original phone, fair price, and every question answered on WhatsApp."),
        source: fromFacts([startYear], `PHONES & GADGETS · CUSTOMER SINCE ${startYear.value}`),
      },
      {
        key: engineering.key,
        quote: placeholder("Our land papers were checked and clean before we paid a kobo."),
        source: placeholder("ENGINEERING & REAL ESTATE · CUSTOMER SINCE 2024"),
      },
      {
        key: autos.key,
        quote: placeholder("The car came inspected, with a full report. It drives like new."),
        source: placeholder("AUTOS · CUSTOMER SINCE 2025"),
      },
    ],
  },
  stories: {
    heading: real("Customer stories"),
    // Spec (customer-stories, "Placeholder stories"): a photo, a first name only and a marked quote until the owner
    // supplies real customers and footage. Photos are stills from Mixkit free clips, with no faces.
    tabs: [
      {
        key: phones.key,
        label: "Phones",
        story: placeholder({
          name: "CHIAMAKA",
          since: `CUSTOMER SINCE ${startYear.value}`,
          quote: "My phone from Akik is still going strong two years on. When I upgraded, I didn't look anywhere else.",
          image: photo("/placeholders/stories/story-phones.jpg", {alt: "", width: 1600, height: 900}, SIZES.fullWidth),
        }),
      },
      {
        key: engineering.key,
        label: "Homes",
        story: placeholder({
          name: "FEMI",
          since: "CUSTOMER SINCE 2024",
          quote: "Akik checked the land papers, built the house and handed us the keys. We moved in last December.",
          image: photo("/placeholders/stories/story-homes.jpg", {alt: "", width: 1600, height: 900}, SIZES.fullWidth),
        }),
      },
      {
        key: autos.key,
        label: "Cars",
        story: placeholder({
          name: "IFEOMA",
          since: "CUSTOMER SINCE 2025",
          quote: "They sent videos, the inspection report and the papers before I paid. The car had no surprises.",
          image: photo("/placeholders/stories/story-cars.jpg", {alt: "", width: 1600, height: 900}, SIZES.fullWidth),
        }),
      },
    ],
  },
  projects,
  news,
  // Spec (founder): the founder's own photos and story replace these; the story is invented apart from the order of
  // the businesses, so it stays a placeholder even once the start year is confirmed.
  founder: {
    photos: placeholder([
      photo(
        "/placeholders/founder/founder-phones.jpg",
        {alt: "A tablet and sales papers on a shop desk", width: 512, height: 640},
        SIZES.stackedPhoto
      ),
      photo(
        "/placeholders/founder/founder-building.jpg",
        {alt: "A building going up at sunset, with a crane above it", width: 800, height: 1000},
        SIZES.stackedPhoto
      ),
      photo("/placeholders/founder/founder-road.jpg", {alt: "An open road at sunrise", width: 800, height: 1000}, SIZES.stackedPhoto),
    ]),
    heading: placeholder("From one phone shop to three businesses"),
    story: placeholder(
      `Akik began in ${startYear.value} as a small shop selling original phones and gadgets. Customers kept coming back and asked for more, so we started building homes and selling land with clean papers. Then came inspected cars. Three businesses now, one promise: what we sell is what you get.`
    ),
    link: pageExists("/about") ? {label: "Read our story", href: "/about"} : undefined,
  },
  // Spec (visit-us). The address is real, from the owner's Instagram bio; the structured data reads the same values.
  visit: {
    heading: placeholder("Come and see us at Iwo Road"),
    address: real({street: "Iwo Road Shopping Complex", city: "Ibadan", country: "NG"}),
    image: placeholder(photo("/placeholders/visit-shop.jpg", {alt: "", width: 1024, height: 768}, SIZES.fullWidth)),
    contacts: divisions.map((division) => ({
      key: division.key,
      name: division.name,
      number: division.number,
      whatsappHref: whatsappTo(division.number.value, division.topic).href,
      hours: placeholder("Mon to Sat, 9am to 6pm"),
    })),
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
  footer,
  featured: {
    eyebrow: real("Featured now"),
    heading: placeholder("Just in at Akik"),
    tabs: featuredTabs(featuredGroups),
  },
} as const;
