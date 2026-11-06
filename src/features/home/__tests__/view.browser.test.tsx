import {render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {HomeView} from "@/features/home/view";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const pill = () => document.querySelector<HTMLElement>("[data-floating-pill]")!;
const heroBox = () => document.querySelector("video")!.parentElement!.getBoundingClientRect();

describe("Home in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
    window.scrollTo(0, 0);
  });

  it("moves focus to main from Skip to content", async () => {
    render(<HomeView />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(document.activeElement).toBe(screen.getByRole("main"));
  });

  it("hides the floating pill, and keeps it out of focus, while the header is in view", async () => {
    render(<HomeView />);
    await expect.poll(() => getComputedStyle(pill()).opacity).toBe("0");
    expect(pill().inert).toBe(true);
  });

  it("shows the floating pill once the header scrolls away", async () => {
    render(
      <div className="min-h-[300vh]">
        <HomeView />
      </div>
    );
    window.scrollTo(0, 600);
    await expect.poll(() => pill().inert).toBe(false);
  });

  it("gives the hero a 16:9 box on desktop", () => {
    render(<HomeView />);
    const {width, height} = heroBox();
    expect(Math.round((width / height) * 100)).toBe(178);
  });

  it("gives the hero a 4:5 box on a phone", async () => {
    await page.viewport(390, 844);
    render(<HomeView />);
    const {width, height} = heroBox();
    expect(Math.round((height / width) * 100)).toBe(125);
  });

  it("does not scroll sideways on a 360px phone", async () => {
    await page.viewport(360, 800);
    render(<HomeView />);
    expect(document.documentElement.scrollWidth).toBe(360);
  });

  it("passes axe on desktop and phone", async () => {
    const {container} = render(<HomeView />);
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([desktop, await axeViolations(container)]).toEqual([[], []]);
  });
});
