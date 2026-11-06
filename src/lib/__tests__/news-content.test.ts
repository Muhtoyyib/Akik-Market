import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {placeholderFacts} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {posts} from "@/lib/content/news";
import {newsBodies} from "@/lib/content/news-bodies";
import {businessBanner, newsGrid, newsIndex, postPage} from "@/lib/content/news-page";
import {newsSummaries} from "@/lib/content/news-summaries";
import {newsDate} from "@/lib/news";
import {newsIndexHead, newsPostHead} from "@/lib/page-heads";
import {prerenderPathnames} from "@/lib/site-pages";

const BLOCK_KINDS = ["paragraph", "heading", "photo", "list"];
const slugs = newsSummaries.map((summary) => summary.slug);
const phonesPost = postPage("new-phones-this-week");
const meta = (head: {meta: readonly object[]}, key: string) =>
  head.meta.find((tag) => Object.values(tag).includes(key)) as {content?: string} | undefined;

describe("news collection", () => {
  it("gives every post its own slug", () => {
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every post a business, a photo on disk and a body", () => {
    const missing = posts.filter(
      (post) => !post.business || !existsSync(`public${post.image.value.src}`) || !newsBodies[post.slug]?.value.length
    );
    expect(missing).toEqual([]);
  });

  it("has a body for every post and no body without a post", () => {
    expect(Object.keys(newsBodies).sort()).toEqual([...slugs].sort());
  });

  it("builds bodies only from paragraphs, sub-headings, photos and lists", () => {
    const kinds = Object.values(newsBodies).flatMap((body) => body.value.map((block) => block.kind));
    expect(kinds.filter((kind) => !BLOCK_KINDS.includes(kind))).toEqual([]);
  });

  it("describes every body photo for screen readers and points it at a file on disk", () => {
    const photos = Object.values(newsBodies).flatMap((body) =>
      body.value.flatMap((block) => (block.kind === "photo" ? [block.image] : []))
    );
    expect(photos.filter((image) => !image.alt || !existsSync(`public${image.src}`))).toEqual([]);
  });

  it("loads a body photo no wider than the text column (672px), full width on phones", () => {
    const sizes = Object.values(newsBodies).flatMap((body) =>
      body.value.flatMap((block) => (block.kind === "photo" ? [block.image.sizes] : []))
    );
    expect(new Set(sizes)).toEqual(new Set(["(min-width: 768px) 672px, 100vw"]));
  });

  it("links each post to its own page", () => {
    expect(posts.map((post) => post.href)).toEqual(slugs.map((slug) => `/news/${slug}`));
  });

  it("prerenders the index and one page per post", () => {
    expect(["/news", ...slugs.map((slug) => `/news/${slug}`)].filter((path) => !prerenderPathnames.includes(path))).toEqual([]);
  });

  it("reports every post's title, description, photo and body as placeholders", () => {
    const reported = placeholderFacts(allContent["News posts"]).map((entry) => entry.path);
    const expected = [
      ...posts.flatMap((_, index) => [`posts.${index}.title`, `posts.${index}.description`, `posts.${index}.image`]),
      ...slugs.map((slug) => `bodies.${slug}`),
    ];
    expect(expected.filter((path) => !reported.includes(path))).toEqual([]);
  });
});

describe("news index", () => {
  it("titles the page 'News · Akik'", () => {
    expect(newsIndexHead.meta[0]).toEqual({title: "News · Akik"});
  });

  it("lists every post newest first", () => {
    const dates = newsGrid.posts.map((post) => post.date);
    expect([dates.length, dates]).toEqual([posts.length, [...dates].sort().reverse()]);
  });

  it("gives a tab only to businesses with posts, in growth order", () => {
    expect(newsGrid.businesses).toEqual(["phones", "engineering", "autos"]);
  });

  it("points the intro's link at the owner's Instagram", () => {
    expect(newsIndex.instagram.href).toBe("https://www.instagram.com/akikmarket/");
  });
});

describe("a post page", () => {
  it("titles the page after the post, as an article", () => {
    const head = newsPostHead("new-phones-this-week");
    expect([head.meta[0], meta(head, "og:type")?.content]).toEqual([{title: "New phones landed this week · Akik"}, "article"]);
  });

  it("gives the Article data the headline and date the page shows", () => {
    const data = JSON.parse(newsPostHead("fresh-car-arrivals").scripts[0]!.children);
    const {post} = postPage("fresh-car-arrivals");
    expect(data).toEqual({"@context": "https://schema.org", "@type": "Article", headline: post.title.value, datePublished: post.date});
  });

  it("titles every post page after its own post", () => {
    expect(slugs.map((slug) => newsPostHead(slug).meta[0])).toEqual(
      newsSummaries.map((summary) => ({title: `${summary.title.value} · Akik`}))
    );
  });

  it("dates a post in the '30 OCT 2026' form", () => {
    expect(newsDate(phonesPost.post.date)).toBe("30 OCT 2026");
  });

  it("shows other posts, same business first, never the current one", () => {
    const {related} = postPage("jericho-terrace-interiors");
    expect(related.map((post) => post.slug)).toEqual(["saturday-site-visits", "new-phones-this-week", "fresh-car-arrivals"]);
  });

  it("ends with a banner into the post's business page now that it exists", () => {
    expect([phonesPost.banner.eyebrow, phonesPost.banner.heading, phonesPost.banner.link]).toEqual([
      "Phones & Gadgets",
      "See what Phones & Gadgets offers",
      {href: "/phones-and-gadgets"},
    ]);
  });

  it("sends the banner to the business's WhatsApp, saying so, before its page exists", () => {
    const banner = businessBanner(postPage("fresh-car-arrivals").post, () => false);
    expect([banner.heading, banner.link.href.startsWith("https://wa.me/"), banner.link.hint]).toEqual([
      "Ask Autos on WhatsApp",
      true,
      "chat on WhatsApp",
    ]);
  });
});
