import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {TestimonialsView} from "@/features/testimonials/view";
import {testimonialsStories, testimonialsWall} from "@/lib/content/testimonials-page";

const renderPage = (stories = testimonialsStories) => render(<TestimonialsView stories={stories} wall={testimonialsWall} />);
const wall = () => screen.getByRole("group", {name: "Customers"});
const card = () => document.querySelector("[aria-live='polite'] figure")!;

describe("the Testimonials page", () => {
  it("has one h1, then the stories, the wall and the share block in that order", () => {
    renderPage();
    expect(
      within(screen.getByRole("main"))
        .getAllByRole("heading")
        .map((heading) => [heading.tagName, heading.textContent])
    ).toEqual([
      ["H1", "What our customers say"],
      ["H2", "Customer stories"],
      ["H2", "What customers say"],
      ["H2", "Bought from Akik? Tell us how it went."],
    ]);
  });

  it("starts with the wall when there are no stories", () => {
    renderPage([]);
    expect(screen.getAllByRole("heading", {level: 2})[0]?.textContent).toBe("What customers say");
  });

  it("puts the lead quote above the wall", () => {
    renderPage();
    const lead = screen.getByText(/I trust them with everything/).closest("figure")!;
    expect(lead.compareDocumentPosition(wall()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("offers a button per customer, in wall order", () => {
    renderPage();
    const order = testimonialsWall.rows
      .flat()
      .flatMap((tile) => (tile.kind === "customer" ? [testimonialsWall.quotes[tile.index]!.name] : []));
    expect(
      within(wall())
        .getAllByRole("button")
        .map((button) => button.textContent)
    ).toEqual(order.map((name) => `Read ${name}'s quote`));
  });

  it("selects the first customer on load", () => {
    renderPage();
    expect([screen.getByRole("button", {name: "Read Kemi's quote", pressed: true}), card().textContent]).toEqual([
      expect.anything(),
      expect.stringContaining("Original phone, fair price"),
    ]);
  });

  it("shows Ngozi's quote and business when her tile is pressed", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", {name: "Read Ngozi's quote"}));
    expect([
      screen.getAllByRole("button", {pressed: true}).map((button) => button.textContent),
      card().textContent,
      card().getAttribute("data-division"),
    ]).toEqual([["Read Ngozi's quote"], expect.stringMatching(/land papers.*Engineering & Real Estate/), "engineering"]);
  });

  it("hides the muted tiles from assistive technology", () => {
    renderPage();
    const hidden = wall().querySelectorAll(":scope > div > [aria-hidden='true']");
    expect(hidden.length).toBe(34 - testimonialsWall.quotes.length);
  });

  it("asks for stories on WhatsApp", () => {
    renderPage();
    expect(screen.getByRole("link", {name: "Share your story on WhatsApp"}).getAttribute("href")).toMatch(
      /^https:\/\/wa\.me\/2348161894229\?text=/
    );
  });
});
