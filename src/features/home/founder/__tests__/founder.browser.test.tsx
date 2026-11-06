import {render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vite-plus/test";
import {commands, page, userEvent} from "vite-plus/test/browser";
import {Founder} from "@/features/home/founder/founder";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {founder} = homeContent;
const renderFounder = () => render(<Founder photos={founder.photos.value} heading={founder.heading.value} story={founder.story.value} />);
const front = () => document.querySelector<HTMLElement>("[data-depth='0']")!;

describe("Founder in a browser", () => {
  afterEach(async () => {
    await commands.emulateReducedMotion(false);
  });

  it("shows the front photo about 270px wide on desktop, with the others peeking out behind it", async () => {
    await page.viewport(1440, 900);
    renderFounder();
    const box = front().getBoundingClientRect();
    const behind = document.querySelector<HTMLElement>("[data-depth='1']")!.getBoundingClientRect();
    expect([box.width >= 256 && box.width <= 288, behind.right > box.right]).toEqual([true, true]);
  });

  it("keeps the peeking photos clear of the Next arrow on a phone", async () => {
    await page.viewport(390, 844);
    renderFounder();
    const peek = document.querySelector<HTMLElement>("[data-depth='2']")!.getBoundingClientRect();
    expect(peek.right).toBeLessThanOrEqual(screen.getByRole("button", {name: "Next photo"}).getBoundingClientRect().left);
  });

  it("moves the next photo to the front over 400ms", async () => {
    await page.viewport(1440, 900);
    renderFounder();
    expect(getComputedStyle(front()).transitionDuration).toBe("0.4s");
  });

  it("moves the photos instantly for a visitor who prefers reduced motion", async () => {
    await commands.emulateReducedMotion(true);
    await page.viewport(1440, 900);
    renderFounder();
    await userEvent.click(screen.getByRole("button", {name: "Next photo"}));
    expect(Number.parseFloat(getComputedStyle(front()).transitionDuration)).toBeLessThan(0.01);
  });

  it("brings the next photo to the front on a swipe to the left", async () => {
    await page.viewport(390, 844);
    renderFounder();
    const stack = front().parentElement!;
    const {left, top, width} = stack.getBoundingClientRect();
    stack.dispatchEvent(new PointerEvent("pointerdown", {bubbles: true, clientX: left + width - 20, clientY: top + 50}));
    stack.dispatchEvent(new PointerEvent("pointerup", {bubbles: true, clientX: left + 20, clientY: top + 50}));
    await expect.poll(() => screen.getByRole("img").getAttribute("alt")).toBe(founder.photos.value[1]!.alt);
  });

  it("has no axe violations", async () => {
    await page.viewport(1440, 900);
    expect(await axeViolations(renderFounder().container)).toEqual([]);
  });
});
