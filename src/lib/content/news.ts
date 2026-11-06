// Every news post as a card shows it: its summary (news-summaries.ts) plus its business, photo and link. Read by Home's
// News and the News pages; the bodies (news-bodies.ts) load only on the post pages.
import {placeholder} from "@/lib/content-facts";
import {newsSummaries, type PostSummary} from "@/lib/content/news-summaries";
import type {BusinessKey} from "@/lib/content/business";
import {SIZES, photo} from "@/lib/responsive-image";

type Extra = {
  business: BusinessKey;
  /** Path and size of the original in media/placeholders; every card crops it to 3:2. */
  photo: [path: string, width: number, height: number];
};

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in posts the owner will replace; tests pin the rules.
const extras: Record<string, Extra> = {
  "new-phones-this-week": {business: "phones", photo: ["/placeholders/news/news-phones.jpg", 960, 640]},
  "jericho-terrace-interiors": {business: "engineering", photo: ["/placeholders/news/news-homes.jpg", 960, 640]},
  "fresh-car-arrivals": {business: "autos", photo: ["/placeholders/news/news-cars.jpg", 960, 640]},
  "saturday-site-visits": {business: "engineering", photo: ["/placeholders/projects/project-oluyole-court-2.jpg", 1024, 682]},
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

function post(entry: PostSummary) {
  // Every summary has its extras: the content tests check the lists match.
  const {
    business,
    photo: [path, width, height],
  } = extras[entry.slug]!;
  return {
    ...entry,
    business,
    // Not Akik's photos, so the alt stays empty and the page doesn't claim them (docs/placeholder-media.md).
    image: placeholder(photo(path, {alt: "", width, height}, SIZES.cardRow)),
    href: `/news/${entry.slug}`,
  };
}

export type Post = ReturnType<typeof post>;

export const posts: Post[] = newsSummaries.map(post);
