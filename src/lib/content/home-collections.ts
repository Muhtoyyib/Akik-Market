// Home's rules over the shared collections (site-shell design D4): what Home picks from listings, posts and stories.
import {businesses, whatsappTo, type BusinessKey} from "@/lib/content/business";
import type {Listing} from "@/lib/content/listings";
import type {Post} from "@/lib/content/news";
import type {Story} from "@/lib/content/stories";
import {featuredTabs} from "@/lib/featured";
import {listingsHref} from "@/lib/listings";
import {latestPosts} from "@/lib/news";
import {onwardLink} from "@/lib/onward-link";
import {pageExists} from "@/lib/site-pages";

// Stryker disable StringLiteral,ObjectLiteral : tab labels and actions from the featured-now spec; tests pin them.
const ON_HOME: Record<BusinessKey, {label: string; action: string}> = {
  phones: {label: "Phones", action: "See all phones"},
  engineering: {label: "Homes", action: "See all properties"},
  autos: {label: "Cars", action: "See all cars"},
};
// Stryker restore StringLiteral,ObjectLiteral

/** "See all": the Listings tab for homes and cars once that page exists (listings page spec, "Links in"), else the
 * business's own page. */
function seeAll(entry: (typeof businesses)[number]) {
  const listing = listingsHref(entry.key, pageExists);
  return listing ? {href: listing} : onwardLink(entry.path, whatsappTo(entry.number.value, entry.topic));
}

/** Featured now: one tab per business with items, in growth order, each cut to what Home shows. */
export function homeFeatured(items: readonly Listing[]) {
  return featuredTabs(
    businesses.map((entry) => ({
      key: entry.key,
      ...ON_HOME[entry.key],
      link: seeAll(entry),
      items: items.filter((item) => item.value.business === entry.key),
    }))
  );
}

const NEWS_PATH = "/news";

/** News: the newest posts, linking to their pages once the News page exists (news spec, "Links"). */
export function homeNews(all: readonly Post[]) {
  return latestPosts(all).map((post) => ({
    date: post.date,
    title: post.title,
    // Stryker disable next-line StringLiteral : reachable only once the News page ships; news-pages tests the post link.
    href: pageExists(NEWS_PATH) ? `${NEWS_PATH}/${post.slug}` : undefined,
    image: post.image,
  }));
}

/** Customer stories: the first story for each business, in growth order. */
export function homeStories(all: readonly Story[]) {
  return businesses.flatMap((entry) => {
    const found = all.find((item) => item.business === entry.key);
    return found ? [{key: entry.key, label: ON_HOME[entry.key].label, story: found.story}] : [];
  });
}
