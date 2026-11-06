import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {Stories} from "@/components/stories/stories";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {stories} = homeContent;
const renderStories = () => render(<Stories heading={stories.heading.value} tabs={stories.tabs} />);
const box = () => screen.getByRole("tabpanel").querySelector("img")!.parentElement!.getBoundingClientRect();

describe("Customer stories in a browser", () => {
  it("is a 16:9 box on desktop", async () => {
    await page.viewport(1440, 900);
    renderStories();
    expect(Math.round((box().width / box().height) * 100)).toBe(178);
  });

  it("is a 4:5 box on a phone", async () => {
    await page.viewport(390, 844);
    renderStories();
    expect(Math.round((box().height / box().width) * 100)).toBe(125);
  });

  it("floats the tabs inside the bottom of the box, centred", async () => {
    await page.viewport(1440, 900);
    renderStories();
    const tabs = screen.getByRole("tablist").getBoundingClientRect();
    const media = box();
    const centreOffset = Math.abs(tabs.left + tabs.width / 2 - (media.left + media.width / 2));
    expect([tabs.bottom < media.bottom, tabs.top > media.top + media.height / 2, centreOffset < 1]).toEqual([true, true, true]);
  });

  it("keeps the quote clear of the tabs on a phone", async () => {
    await page.viewport(390, 844);
    renderStories();
    const quote = screen.getByRole("tabpanel").querySelector("blockquote")!.getBoundingClientRect();
    expect(quote.bottom).toBeLessThan(screen.getByRole("tablist").getBoundingClientRect().top);
  });

  it("has no axe violations on desktop or a phone", async () => {
    await page.viewport(1440, 900);
    const {container} = renderStories();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([...desktop, ...(await axeViolations(container))]).toEqual([]);
  });
});
