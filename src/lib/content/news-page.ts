// The News pages' own words, and what each post page shows around the post (news-pages specs).
import {placeholder, real} from "@/lib/content-facts";
import {business, businesses, shopPhoto, social, whatsappTo} from "@/lib/content/business";
import {type Post, posts} from "@/lib/content/news";
import {newsBodies} from "@/lib/content/news-bodies";
import {newestPosts, postBusinesses} from "@/lib/news";
import type {OnwardLink} from "@/lib/onward-link";
import {relatedItems} from "@/lib/related";
import {pageExists} from "@/lib/site-pages";

// Stryker disable StringLiteral : copy from the news specs; tests pin the rules around it.
export const newsIndex = {
  eyebrow: real("News"),
  heading: placeholder("What's new at Akik"),
  intro: placeholder("New stock, finished homes and cars as they arrive. For daily updates, follow us on Instagram."),
  instagram: {label: real("Follow us on Instagram"), href: social.instagram.value},
};
// Stryker restore StringLiteral

const listed = newestPosts(posts);

/** Every post, newest first, and the businesses that get a tab. */
export const newsGrid = {
  posts: listed,
  businesses: postBusinesses(
    listed,
    businesses.map((entry) => entry.key)
  ),
};

/** Spec (action, "Link to the business"): the post's business page once it exists, else WhatsApp, with the heading
 * saying which. */
export function businessBanner(post: Post, exists: (path: string) => boolean) {
  const entry = business(post.business);
  const built = exists(entry.path);
  const link: OnwardLink = built ? {href: entry.path} : whatsappTo(entry.number.value, entry.topic);
  return {
    eyebrow: entry.name,
    // Stryker disable next-line StringLiteral : headings from the action spec; tests pin both.
    heading: built ? `See what ${entry.name} offers` : `Ask ${entry.name} on WhatsApp`,
    link,
    image: shopPhoto.value,
  };
}

/** The post at this slug. Unknown slugs never reach a post page: the router sends them to /404 (routedPath). */
export function postPage(slug: string) {
  const post = listed.find((entry) => entry.slug === slug)!;
  return {
    post,
    // Every post has a body: the content tests check the two lists match.
    body: newsBodies[slug]!,
    related: relatedItems(post, listed, (entry) => ({id: entry.slug, group: entry.business, date: entry.date})),
    banner: businessBanner(post, pageExists),
  };
}
