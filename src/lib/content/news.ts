// Every news post: one collection, read by Home's News and, later, the News pages (site content-source spec).
// Placeholder posts, written to match what the owner posts on Instagram: stock arrivals, handovers, cars.
import {placeholder} from "@/lib/content-facts";
import {photo, SIZES} from "@/lib/responsive-image";

type PostInput = {slug: string; date: string; title: string; photo: string};

function post({slug, date, title, photo: image}: PostInput) {
  return {
    slug,
    date,
    title: placeholder(title),
    image: placeholder(photo(`/placeholders/news/${image}.jpg`, {alt: "", width: 960, height: 640}, SIZES.cardRow)),
  };
}

export type Post = ReturnType<typeof post>;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in posts the owner will replace.
export const posts: Post[] = [
  {slug: "new-phones-this-week", date: "2026-10-30", title: "New phones landed this week", photo: "news-phones"},
  {slug: "jericho-terrace-interiors", date: "2026-10-14", title: "Interiors finished at our Jericho terrace", photo: "news-homes"},
  {slug: "fresh-car-arrivals", date: "2026-09-22", title: "Fresh car arrivals, inspected and ready", photo: "news-cars"},
].map(post);
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
