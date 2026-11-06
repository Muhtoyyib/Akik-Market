import {render} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {TestimonialsView} from "@/features/testimonials/view";
import {testimonialsStories, testimonialsWall} from "@/lib/content/testimonials-page";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const renderPage = () => render(<TestimonialsView stories={testimonialsStories} wall={testimonialsWall} />);
const wall = () => document.querySelector<HTMLElement>("[data-wall]")!;
const customerTiles = () => [...wall().querySelectorAll<HTMLElement>("button")];
const fitsPage = () => document.documentElement.scrollWidth <= window.innerWidth;
// The touch area: the tile, or its ::before layer where that is larger.
const touchSize = (tile: HTMLElement) => {
  const inset = -Number.parseFloat(getComputedStyle(tile, "::before").top);
  const {width, height} = tile.getBoundingClientRect();
  return Math.min(width, height) + 2 * Math.max(inset, 0);
};
// Every image has loaded, so the wall is measured at its drawn size.
const loaded = () => Promise.all([...wall().querySelectorAll("img")].map((img) => img.decode().catch(() => undefined)));

describe("the Testimonials page in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  it("fits every tile of the wall at 360, 390, 768 and 1024px, with no sideways scroll", async () => {
    renderPage();
    const fits = [];
    for (const width of [360, 390, 768, 1024]) {
      await page.viewport(width, 800);
      // Tiles, not rows: a customer tile's 44px touch layer overflows its row by design.
      const outside = [...wall().querySelectorAll(":scope > div > *")].filter((tile) => {
        const {left, right} = tile.getBoundingClientRect();
        return left < 0 || right > width;
      });
      fits.push(outside.length === 0 && fitsPage());
    }
    expect(fits).toEqual([true, true, true, true]);
  });

  it("gives every customer tile a 44px touch target on a phone", async () => {
    await page.viewport(390, 844);
    renderPage();
    expect(customerTiles().filter((tile) => touchSize(tile) < 44)).toEqual([]);
  });

  it("tabs through the customer tiles only, in wall order", async () => {
    renderPage();
    customerTiles()[0]!.focus();
    const stops = [document.activeElement];
    for (let step = 1; step < customerTiles().length; step += 1) {
      await userEvent.tab();
      stops.push(document.activeElement);
    }
    expect(stops).toEqual(customerTiles());
  });

  it("lets photos fill most of the wall section's height at 1440px", async () => {
    renderPage();
    await loaded();
    const section = wall().closest("section")!.getBoundingClientRect().height;
    expect(wall().getBoundingClientRect().height / section).toBeGreaterThan(0.5);
  });

  it("has no axe violations at 1440px", async () => {
    renderPage();
    await loaded();
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no axe violations at 390px", async () => {
    await page.viewport(390, 844);
    renderPage();
    await loaded();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
