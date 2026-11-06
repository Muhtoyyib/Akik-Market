import {render, screen, within} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {DivisionView} from "@/features/division/view";
import {divisionPage} from "@/lib/content/division-page";
import {businesses} from "@/lib/content/business";
import {pageExists} from "@/lib/site-pages";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const autos = divisionPage("autos", pageExists);
const heroBox = () => document.querySelector("[aria-labelledby='hero-heading'] img")!.parentElement!.getBoundingClientRect();

describe("a division page in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  it("gives the hero a 16:9 box on desktop", () => {
    render(<DivisionView page={autos} />);
    const {width, height} = heroBox();
    expect(Math.round((width / height) * 100) / 100).toBe(1.78);
  });

  it("gives the hero a 4:5 box on a phone", async () => {
    await page.viewport(390, 844);
    render(<DivisionView page={autos} />);
    const {width, height} = heroBox();
    expect(Math.round((width / height) * 100) / 100).toBe(0.8);
  });

  it("lays the offer cards out as one grid row on desktop", () => {
    render(<DivisionView page={autos} />);
    const tops = new Set(
      [...document.querySelectorAll("[aria-labelledby='offer-heading'] li")].map((card) => card.getBoundingClientRect().top)
    );
    expect(tops.size).toBe(1);
  });

  it("turns the offer into a swipe row on a phone, with the next card peeking in, and no sideways page scroll", async () => {
    await page.viewport(390, 844);
    render(<DivisionView page={autos} />);
    const row = document.querySelector("[aria-labelledby='offer-heading'] ul")!;
    const second = row.querySelectorAll("li")[1]!.getBoundingClientRect();
    expect([row.scrollWidth > row.clientWidth, second.left < 390, document.documentElement.scrollWidth]).toEqual([true, true, 390]);
  });

  it("stacks the steps photo above the steps on a phone and stretches the pill across", async () => {
    await page.viewport(390, 844);
    render(<DivisionView page={autos} />);
    const steps = screen.getByRole("region", {name: autos.steps.heading.value});
    const photo = steps.querySelector("img")!.getBoundingClientRect();
    const list = within(steps).getByRole("list").getBoundingClientRect();
    const pill = within(steps)
      .getByRole("link", {name: /Chat on WhatsApp/})
      .getBoundingClientRect();
    const column = within(steps).getByRole("list").parentElement!.getBoundingClientRect();
    expect([photo.bottom <= list.top, Math.round(pill.width)]).toEqual([true, Math.round(column.width)]);
  });

  it("keeps the steps pill at its own width on desktop", () => {
    render(<DivisionView page={autos} />);
    const steps = screen.getByRole("region", {name: autos.steps.heading.value});
    const pill = within(steps)
      .getByRole("link", {name: /Chat on WhatsApp/})
      .getBoundingClientRect();
    expect(pill.width).toBeLessThan(300);
  });

  for (const entry of businesses) {
    it(`has no axe violations on the ${entry.name} page at 1440 and 390`, async () => {
      const {container} = render(<DivisionView page={divisionPage(entry.key, pageExists)} />);
      const desktop = await axeViolations(container);
      await page.viewport(390, 844);
      expect([desktop, await axeViolations(container)]).toEqual([[], []]);
    });
  }
});
