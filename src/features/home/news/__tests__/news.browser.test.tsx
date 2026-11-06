import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {News} from "@/features/home/news/news";
import {homeContent} from "@/lib/home-content";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {news} = homeContent;
const renderNews = () => render(<News eyebrow={news.eyebrow.value} heading={news.heading.value} posts={news.posts} action={news.action} />);
const cards = (container: HTMLElement) => [...container.querySelectorAll("li")].map((card) => card.getBoundingClientRect());

describe("News in a browser", () => {
  it("shows three 3:2 cards in a row on desktop", async () => {
    await page.viewport(1440, 900);
    const {container} = renderNews();
    const boxes = cards(container);
    const photo = container.querySelector("img")!.parentElement!.getBoundingClientRect();
    expect([new Set(boxes.map((box) => box.top)).size, Math.round((photo.width / photo.height) * 100)]).toEqual([1, 150]);
  });

  it("turns the cards into a swipe row on a phone without scrolling the page sideways", async () => {
    await page.viewport(390, 844);
    const {container} = renderNews();
    const row = container.querySelector("ul")!;
    expect([getComputedStyle(row).scrollSnapType, row.scrollWidth > row.clientWidth, document.documentElement.scrollWidth]).toEqual([
      "x mandatory",
      true,
      390,
    ]);
  });

  it("has no axe violations on desktop or a phone", async () => {
    await page.viewport(1440, 900);
    const {container} = renderNews();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([...desktop, ...(await axeViolations(container))]).toEqual([]);
  });
});
