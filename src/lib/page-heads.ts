// The head of every page but Home (home-head.ts) and the 404 (not-found.ts). Route heads are bundled into the
// JavaScript every page loads, so these read only page-descriptions.ts and project-summaries.ts, never a page's content.
import {business, type BusinessKey} from "@/lib/content/business";
import {pageDescriptions} from "@/lib/content/page-descriptions";
import {newsSummaries} from "@/lib/content/news-summaries";
import {projectSummaries} from "@/lib/content/project-summaries";
import {pageHead} from "@/lib/page-head";

export const PROJECTS_PATH = "/projects";

export const aboutHead = pageHead({name: "About", description: pageDescriptions.about.value});

export const listingsHead = pageHead({name: "Listings", description: pageDescriptions.listings.value});

export const newsIndexHead = pageHead({name: "News", description: pageDescriptions.news.value});

export const testimonialsHead = pageHead({name: "Testimonials", description: pageDescriptions.testimonials.value});

export const privacyHead = pageHead({name: "Privacy policy", description: pageDescriptions.privacy.value});

export const termsHead = pageHead({name: "Terms", description: pageDescriptions.terms.value});

export const projectsIndexHead = pageHead({name: "Projects", description: pageDescriptions.projects.value});

export function divisionHead(key: BusinessKey) {
  return pageHead({name: business(key).name, description: pageDescriptions[key].value});
}

/** A project's head: its own title and preview, as an article, with breadcrumbs. Paths stay relative until the
 * production domain is decided (page-head.ts). */
export function projectHead(slug: string) {
  // The router sends unknown slugs to /404 (routedPath), so a project page's slug is always listed.
  const {name, description} = projectSummaries.value.find((summary) => summary.slug === slug)!;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {"@type": "ListItem", position: 1, name: "Projects", item: PROJECTS_PATH},
      {"@type": "ListItem", position: 2, name, item: `${PROJECTS_PATH}/${slug}`},
    ],
  };
  return pageHead({name, description, type: "article", structuredData: [breadcrumbs]});
}

/** A post's head: its own title and preview, as an article, with `Article` data whose headline and date match the page. */
export function newsPostHead(slug: string) {
  // The router sends unknown slugs to /404 (routedPath), so a post page's slug is always listed.
  const {title, description, date} = newsSummaries.find((summary) => summary.slug === slug)!;
  const article = {"@context": "https://schema.org", "@type": "Article", headline: title.value, datePublished: date};
  return pageHead({name: title.value, description: description.value, type: "article", structuredData: [article]});
}
