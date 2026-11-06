import {render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {Featured} from "@/features/home/featured/featured";
import {homeContent} from "@/lib/home-content";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {featured} = homeContent;
const renderFeatured = () => render(<Featured eyebrow={featured.eyebrow.value} heading={featured.heading.value} tabs={featured.tabs} />);
const row = () => screen.getByRole("tabpanel").querySelector("ul")!;
const previous = () => screen.getByRole("button", {name: "Previous item"});
const next = () => screen.getByRole("button", {name: "Next item"});

describe("Featured now in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  it("puts the heading and the tabs on one row on desktop", () => {
    renderFeatured();
    const heading = screen.getByRole("heading", {level: 2}).getBoundingClientRect();
    const tabs = screen.getByRole("tablist").getBoundingClientRect();
    expect([tabs.left > heading.right, tabs.top < heading.bottom]).toEqual([true, true]);
  });

  it("disables Previous at the start of the row", async () => {
    renderFeatured();
    await expect.poll(() => [previous().hasAttribute("disabled"), next().hasAttribute("disabled")]).toEqual([true, false]);
  });

  it("moves the row one card along with Next", async () => {
    renderFeatured();
    const [first, second] = [...row().children] as HTMLElement[];
    await expect.poll(() => next().hasAttribute("disabled")).toBe(false);
    await userEvent.click(next());
    await expect.poll(() => row().scrollLeft).toBe(second!.offsetLeft - first!.offsetLeft);
  });

  it("disables Next once the last card is in view", async () => {
    renderFeatured();
    row().scrollLeft = row().scrollWidth;
    await expect.poll(() => [previous().hasAttribute("disabled"), next().hasAttribute("disabled")]).toEqual([false, true]);
  });

  it("swipes card by card on a phone without scrolling the page sideways", async () => {
    await page.viewport(390, 844);
    renderFeatured();
    expect([getComputedStyle(row()).scrollSnapType, document.documentElement.scrollWidth]).toEqual(["x mandatory", 390]);
  });

  it("has no axe violations on desktop or a phone", async () => {
    const {container} = renderFeatured();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([...desktop, ...(await axeViolations(container))]).toEqual([]);
  });

  it("switches tabs from the keyboard", async () => {
    renderFeatured();
    await userEvent.click(screen.getByRole("tab", {name: "Phones"}));
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", {selected: true})).toHaveTextContent("Homes");
  });
});
