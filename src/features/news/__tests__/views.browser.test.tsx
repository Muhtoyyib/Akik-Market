import {render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {NewsIndexView} from "@/features/news/index-view";
import {PostView} from "@/features/news/post-view";
import {newsGrid, postPage} from "@/lib/content/news-page";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const start = location.pathname;
const renderIndex = () => render(<NewsIndexView posts={newsGrid.posts} businesses={newsGrid.businesses} />);
const renderPost = () => render(<PostView {...postPage("new-phones-this-week")} />);
const panelCards = () => [...document.querySelectorAll("[role='tabpanel']:not([hidden]) li")];
const columns = () => new Set(panelCards().map((card) => Math.round(card.getBoundingClientRect().left))).size;
const selected = () => screen.getByRole("tab", {selected: true}).textContent;

describe("the News pages in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  afterEach(() => {
    history.replaceState(null, "", start);
  });

  it("sets the cards in three columns at 1440px, two at 768px and one at 390px", async () => {
    renderIndex();
    const counts = [columns()];
    await page.viewport(768, 1024);
    counts.push(columns());
    await page.viewport(390, 844);
    counts.push(columns());
    expect(counts).toEqual([3, 2, 1]);
  });

  it("selects Homes from a shared ?business=engineering link, showing only Engineering posts", async () => {
    history.replaceState(null, "", `${start}?business=engineering`);
    renderIndex();
    const engineering = newsGrid.posts.filter((post) => post.business === "engineering").length;
    await waitFor(() => expect([selected(), panelCards().length]).toEqual(["Homes", engineering]));
  });

  it("selects All for an unknown ?business=", async () => {
    history.replaceState(null, "", `${start}?business=boats`);
    renderIndex();
    await waitFor(() => expect(selected()).toBe("All"));
  });

  it("puts the chosen tab in the address without a page load, and Back returns to All", async () => {
    renderIndex();
    await userEvent.click(screen.getByRole("tab", {name: "Cars"}));
    const chosen = location.search;
    history.back();
    await waitFor(() => expect([chosen, selected()]).toEqual(["?business=autos", "All"]));
  });

  it("keeps the body to a readable line length, about 65 characters", async () => {
    renderPost();
    const body = document.querySelector<HTMLElement>("[data-post-body]")!;
    const chars = body.getBoundingClientRect().width / Number.parseFloat(getComputedStyle(body).fontSize) / 0.5;
    expect(chars).toBeLessThanOrEqual(80);
  });

  it("keeps a body photo within the text column", async () => {
    renderPost();
    const body = document.querySelector("[data-post-body]")!.getBoundingClientRect();
    const photo = document.querySelector("[data-post-body] img")!.getBoundingClientRect();
    expect(photo.width).toBeLessThanOrEqual(body.width);
  });

  it("has no axe violations on the index and a post, at 1440px and 390px", async () => {
    const index = renderIndex();
    const results = [await axeViolations(document.body)];
    index.unmount();
    renderPost();
    results.push(await axeViolations(document.body));
    await page.viewport(390, 844);
    results.push(await axeViolations(document.body));
    expect(results).toEqual([[], [], []]);
  });
});
