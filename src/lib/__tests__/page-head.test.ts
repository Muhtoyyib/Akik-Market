import {describe, expect, it} from "vite-plus/test";
import {pageHead} from "@/lib/page-head";

const about = pageHead({name: "About", description: "How a phone shop in Ibadan became three businesses."});
const post = pageHead({
  name: "New phones landed this week",
  description: "Fresh stock at Iwo Road.",
  type: "article",
  structuredData: [{"@type": "Article", headline: "New phones landed this week"}],
});
const content = (head: ReturnType<typeof pageHead>, key: string) =>
  head.meta.filter((tag) => ("name" in tag && tag.name === key) || ("property" in tag && tag.property === key)).map((tag) => tag.content);

describe("pageHead", () => {
  it("titles a page '{name} · Akik', once", () => {
    expect(about.meta.filter((tag) => "title" in tag)).toEqual([{title: "About · Akik"}]);
  });

  it("lets Home keep its own title", () => {
    expect(pageHead({title: "Akik · Phones, homes and cars in Ibadan", description: "x"}).meta[0]).toEqual({
      title: "Akik · Phones, homes and cars in Ibadan",
    });
  });

  it("sets one description and the same text for link previews", () => {
    expect([content(about, "description"), content(about, "og:description")]).toEqual([
      ["How a phone shop in Ibadan became three businesses."],
      ["How a phone shop in Ibadan became three businesses."],
    ]);
  });

  it("previews a page as a website with its title and a small card", () => {
    expect([content(about, "og:type"), content(about, "og:title"), content(about, "twitter:card")]).toEqual([
      ["website"],
      ["About · Akik"],
      ["summary"],
    ]);
  });

  it("previews a collection item as an article with the item's own title", () => {
    expect([content(post, "og:type"), content(post, "og:title")]).toEqual([["article"], ["New phones landed this week"]]);
  });

  it("sets no image, canonical URL or absolute link until the domain is decided", () => {
    expect(JSON.stringify([about, post])).not.toMatch(/og:image|canonical|https?:\/\//);
  });

  it("adds structured data as JSON-LD, and none when the page has none", () => {
    expect([post.scripts, about.scripts]).toEqual([
      [{type: "application/ld+json", children: '{"@type":"Article","headline":"New phones landed this week"}'}],
      [],
    ]);
  });

  it("tells search engines not to index a page that asks", () => {
    expect([content(pageHead({name: "Not found", description: "x", noindex: true}), "robots"), content(about, "robots")]).toEqual([
      ["noindex"],
      [],
    ]);
  });

  it("refuses a description over 160 characters, naming the page", () => {
    expect(() => pageHead({name: "About", description: "a".repeat(161)})).toThrow(/About.*161/);
  });

  it("accepts a description of exactly 160 characters", () => {
    expect(content(pageHead({name: "About", description: "a".repeat(160)}), "description")[0]).toHaveLength(160);
  });
});
