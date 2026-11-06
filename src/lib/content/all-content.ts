// Every content module, keyed by the heading it gets in the placeholder report. Site-wide facts and the shared
// collections come first, so a value a page reuses is listed once, where the owner replaces it. A new page module
// adds its line here (site content-source spec, "Placeholders marked and reported").
import {aboutContent} from "@/lib/content/about";
import {contactIndex, contactLocation} from "@/lib/content/contact";
import {privacy, terms} from "@/lib/content/legal";
import {address, email, hours, shopPhoto, social, startYear} from "@/lib/content/business";
import {autosPage} from "@/lib/content/divisions/autos";
import {engineeringPage} from "@/lib/content/divisions/engineering";
import {phonesPage} from "@/lib/content/divisions/phones";
import {founderPhotos} from "@/lib/content/founder";
import {homeContent} from "@/lib/content/home";
import {listings} from "@/lib/content/listings";
import {listingsIndex, listingsNextSteps} from "@/lib/content/listings-page";
import {newsBodies} from "@/lib/content/news-bodies";
import {newsIndex} from "@/lib/content/news-page";
import {moreQuotes} from "@/lib/content/quote-wall";
import {testimonialsIndex, testimonialsShare} from "@/lib/content/testimonials-page";
import {notFoundContent} from "@/lib/content/not-found";
import {projectsBanner} from "@/lib/content/projects-banner";
import {projects} from "@/lib/content/projects";
import {projectEnquiry, projectsIndex} from "@/lib/content/projects-page";
import {posts} from "@/lib/content/news";
import {siteContent} from "@/lib/content/site";
import {leadQuote, quotes} from "@/lib/content/quotes";
import {stories} from "@/lib/content/stories";

export const allContent = {
  "Site-wide": {...siteContent, business: {startYear, social, email, address, hours, shopPhoto}},
  Listings: {listings},
  "News posts": {posts, bodies: newsBodies},
  "Customer stories": {stories, leadQuote, quotes, moreQuotes},
  Projects: {projects},
  "News page": {newsIndex},
  "Testimonials page": {testimonialsIndex, testimonialsShare},
  "Contact page": {contactIndex, contactLocation},
  "Legal pages": {privacy, terms},
  "Listings page": {listingsIndex, listingsNextSteps},
  "Projects banner": {projectsBanner},
  Founder: {founderPhotos},
  Home: homeContent,
  "Phones & Gadgets": phonesPage,
  "Engineering & Real Estate": engineeringPage,
  Autos: autosPage,
  About: aboutContent,
  "Projects page": {projectsIndex, projectEnquiry},
  "Not found": notFoundContent,
};
