import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {ListingsView} from "@/features/listings/view";
import {listingsGrid} from "@/lib/content/listings-page";

const renderPage = (tabs = listingsGrid) => render(<ListingsView tabs={tabs} />);
const [homes, cars] = listingsGrid;

describe("the Listings page", () => {
  it("has exactly one h1, followed by the tabs", () => {
    renderPage();
    const [h1] = screen.getAllByRole("heading", {level: 1});
    const follows = h1!.compareDocumentPosition(screen.getByRole("tablist")) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect([screen.getAllByRole("heading", {level: 1}).length, follows > 0]).toEqual([1, true]);
  });

  it("offers Homes then Cars, opening on Homes", () => {
    renderPage();
    expect([screen.getAllByRole("tab").map((tab) => tab.textContent), screen.getByRole("tab", {selected: true}).textContent]).toEqual([
      ["Homes", "Cars"],
      "Homes",
    ]);
  });

  it("counts the homes above the grid and shows a card for each", () => {
    renderPage();
    const panel = screen.getByRole("tabpanel");
    expect([within(panel).getByText(homes!.count).tagName, within(panel).getAllByRole("listitem").length]).toEqual([
      "P",
      homes!.items.length,
    ]);
  });

  it("names each card after its item, as an h2 under the page's h1", () => {
    renderPage();
    const names = within(screen.getByRole("tabpanel")).getAllByRole("heading", {level: 2});
    expect(names.map((name) => name.textContent?.replace(/\s+/g, " ").trim())).toEqual(
      homes!.items.map((item) => `Ask about ${item.value.name} on WhatsApp`)
    );
  });

  it("opens every card's WhatsApp in a new tab with safe link attributes", () => {
    renderPage();
    const links = within(screen.getByRole("tabpanel")).getAllByRole("link");
    expect(links.every((link) => link.getAttribute("target") === "_blank" && link.getAttribute("rel") === "noopener noreferrer")).toBe(
      true
    );
  });

  it("shows no tabs with only one kind listed", () => {
    renderPage([cars!]);
    expect([screen.queryAllByRole("tab"), screen.getByText(cars!.count).textContent]).toEqual([[], cars!.count]);
  });

  it("gives the panel its business's accent", () => {
    renderPage([cars!]);
    expect(screen.getByText(cars!.count).closest("[data-division]")?.getAttribute("data-division")).toBe("autos");
  });

  it("says what happens after messaging", () => {
    renderPage();
    expect(screen.getByRole("region", {name: "What happens after you message"})).toBeTruthy();
  });
});
