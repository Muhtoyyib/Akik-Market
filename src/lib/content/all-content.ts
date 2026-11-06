// Every content module, keyed by the heading it gets in the placeholder report. Site-wide facts and the shared
// collections come first, so a value a page reuses is listed once, where the owner replaces it. A new page module
// adds its line here (site content-source spec, "Placeholders marked and reported").
import {address, email, hours, social, startYear} from "@/lib/content/business";
import {homeContent} from "@/lib/content/home";
import {listings} from "@/lib/content/listings";
import {posts} from "@/lib/content/news";
import {siteContent} from "@/lib/content/site";
import {leadQuote, quotes, stories} from "@/lib/content/stories";

export const allContent = {
  "Site-wide": {...siteContent, business: {startYear, social, email, address, hours}},
  Listings: {listings},
  "News posts": {posts},
  "Customer stories": {stories, leadQuote, quotes},
  Home: homeContent,
};
