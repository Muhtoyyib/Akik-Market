import {OWN_PAGES} from "@/test/fixtures/own-pages";
import {render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {DivisionView} from "@/features/division/view";
import {ListingsView} from "@/features/listings/view";
import {divisionPage} from "@/lib/content/division-page";
import {listingsGrid} from "@/lib/content/listings-page";
import {pageExists} from "@/lib/site-pages";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const start = location.pathname;
const renderPage = () => render(<ListingsView tabs={listingsGrid} />);
const columns = () =>
  new Set([...document.querySelectorAll("[role='tabpanel']:not([hidden]) li")].map((card) => Math.round(card.getBoundingClientRect().left)))
    .size;
const selected = () => screen.getByRole("tab", {selected: true}).textContent;

describe("the Listings page in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  afterEach(() => {
    history.replaceState(null, "", start);
  });

  it("sets the cards in four columns at 1440px, three at 1024px, two at 768px and one at 390px", async () => {
    renderPage();
    const counts = [columns()];
    for (const [width, height] of [
      [1024, 768],
      [768, 1024],
      [390, 844],
    ] as const) {
      await page.viewport(width, height);
      counts.push(columns());
    }
    expect(counts).toEqual([4, 3, 2, 1]);
  });

  it("selects Cars from a shared ?type=cars link", async () => {
    history.replaceState(null, "", `${start}?type=cars`);
    renderPage();
    await waitFor(() => expect(selected()).toBe("Cars"));
  });

  it("selects Homes for an unknown ?type=", async () => {
    history.replaceState(null, "", `${start}?type=phones`);
    renderPage();
    await waitFor(() => expect(selected()).toBe("Homes"));
  });

  it("puts the chosen tab in the address without a page load, and Back returns to Homes", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("tab", {name: "Cars"}));
    const chosen = location.search;
    history.back();
    await waitFor(() => expect([chosen, selected()]).toEqual(["?type=cars", "Homes"]));
  });

  it("has no axe violations at 1440px or 390px", async () => {
    renderPage();
    const wide = await axeViolations(document.body);
    await page.viewport(390, 844);
    expect([wide, await axeViolations(document.body)]).toEqual([[], []]);
  });

  it("has no axe violations on the Engineering page with linked offer cards", async () => {
    render(<DivisionView page={divisionPage(OWN_PAGES.engineering, pageExists)} />);
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
