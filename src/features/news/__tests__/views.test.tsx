import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {NewsIndexView} from "@/features/news/index-view";
import {PostBody} from "@/features/news/post-body";
import {PostView} from "@/features/news/post-view";
import type {Block} from "@/lib/content/news-bodies";
import {businessBanner, newsGrid, postPage} from "@/lib/content/news-page";

const {posts, businesses} = newsGrid;
const renderIndex = (list = posts, keys = businesses) => render(<NewsIndexView posts={list} businesses={keys} />);
const phones = postPage("new-phones-this-week");
const renderPost = (page = phones) => render(<PostView {...page} />);
const photoBlock = phones.body.value.find((block) => block.kind === "photo") as Extract<Block, {kind: "photo"}>; // The phones post has a photo; the content tests check its alt.

describe("the News index", () => {
  it("has exactly one h1, with the eyebrow News above it", () => {
    renderIndex();
    const [h1] = screen.getAllByRole("heading", {level: 1});
    expect([screen.getAllByRole("heading", {level: 1}).length, h1?.previousElementSibling?.textContent]).toEqual([1, "News"]);
  });

  it("links to the owner's Instagram in a new tab with safe link attributes", () => {
    renderIndex();
    const link = screen.getByRole("link", {name: "Follow us on Instagram"});
    expect([link.getAttribute("href"), link.getAttribute("target"), link.getAttribute("rel")]).toEqual([
      "https://www.instagram.com/akikmarket/",
      "_blank",
      "noopener noreferrer",
    ]);
  });

  it("makes each card one link to its post, newest first", () => {
    renderIndex();
    const links = within(screen.getByRole("tabpanel")).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(posts.map((post) => post.href));
  });

  it("offers All and a tab per business with posts", () => {
    renderIndex();
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["All", "Phones", "Homes", "Cars"]);
  });

  it("shows no tabs when every post is about one business", () => {
    const homes = posts.filter((post) => post.business === "engineering");
    renderIndex(homes, ["engineering"]);
    const postLinks = screen.getAllByRole("link").filter((link) => link.getAttribute("href")?.startsWith("/news/"));
    expect([screen.queryAllByRole("tab"), postLinks.length]).toEqual([[], homes.length]);
  });
});

describe("a post page", () => {
  it("names the post in the only h1", () => {
    renderPost();
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual(["New phones landed this week"]);
  });

  it("leads back to All news", () => {
    renderPost();
    expect(screen.getByRole("link", {name: "All news"})).toHaveAttribute("href", "/news");
  });

  it("shows the business and the date on one line above the title", () => {
    renderPost();
    expect(screen.getByRole("heading", {level: 1}).previousElementSibling?.textContent).toBe("Phones & Gadgets · 30 OCT 2026");
  });

  it("shows the post's photo first, loaded eagerly", () => {
    renderPost();
    expect(screen.getByRole("article").querySelector("img")?.getAttribute("loading")).toBe("eager");
  });

  it("lists up to three other posts under More news", () => {
    renderPost();
    const related = screen.getByRole("region", {name: "More news"});
    expect(
      within(related)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual(phones.related.map((post) => post.href));
  });

  it("leaves More news out when there are no other posts", () => {
    renderPost({...phones, related: []});
    expect(screen.queryByRole("region", {name: "More news"})).toBeNull();
  });

  it("ends with a banner card naming the business and linking to its page", () => {
    renderPost();
    const banner = screen.getByRole("region", {name: "About this business"});
    expect(within(banner).getByRole("link")).toHaveAttribute("href", "/phones-and-gadgets");
  });

  it("names the banner link after WhatsApp before the business page exists", () => {
    renderPost({...phones, banner: businessBanner(phones.post, () => false)});
    const banner = screen.getByRole("region", {name: "About this business"});
    expect(within(banner).getByRole("link").textContent).toContain("Ask Phones & Gadgets on WhatsApp");
  });
});

describe("a post's body", () => {
  it("renders paragraphs, sub-headings as h2 and lists in order", () => {
    const blocks: Block[] = [
      {kind: "paragraph", text: "First"},
      {kind: "heading", text: "Middle"},
      {kind: "list", items: ["One", "Two"]},
    ];
    const {container} = render(<PostBody blocks={blocks} />);
    expect([...container.firstElementChild!.children].map((element) => [element.tagName, element.textContent])).toEqual([
      ["P", "First"],
      ["H2", "Middle"],
      ["UL", "OneTwo"],
    ]);
  });

  it("shows a photo with its alt text and caption", () => {
    render(<PostBody blocks={[photoBlock]} />);
    expect([screen.getByRole("img").getAttribute("alt"), screen.getByRole("figure").textContent]).toEqual([
      photoBlock.image.alt,
      photoBlock.caption,
    ]);
  });

  it("shows a photo with no caption as a figure without one", () => {
    render(<PostBody blocks={[{...photoBlock, caption: undefined}]} />);
    expect(screen.getByRole("figure").querySelector("figcaption")).toBeNull();
  });
});
