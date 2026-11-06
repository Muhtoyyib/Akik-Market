import {OWN_PAGES} from "@/test/fixtures/own-pages";
import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {AutosInspection} from "@/features/division/autos-inspection";
import {DivisionView} from "@/features/division/view";
import {placeholder} from "@/lib/content-facts";
import {divisionPage, type DivisionPage} from "@/lib/content/division-page";
import {pageExists} from "@/lib/site-pages";

const renderPage = (page: DivisionPage) => render(<DivisionView page={page} />);
const phones = divisionPage(OWN_PAGES.phones, pageExists);
const engineering = divisionPage(OWN_PAGES.engineering, pageExists);
const autos = divisionPage(OWN_PAGES.autos, pageExists);
const sectionNames = () =>
  within(screen.getByRole("main"))
    .getAllByRole("region")
    .map((section) => section.getAttribute("aria-labelledby"));

describe("a division page", () => {
  it("runs hero, offer, stock, steps, its own section, story and contacts in that order on Autos", () => {
    renderPage(autos);
    expect(sectionNames()).toEqual([
      "hero-heading",
      "offer-heading",
      "stock-heading",
      "steps-heading",
      "services-heading",
      "story-heading",
      "visit-heading",
    ]);
  });

  it("adds the Projects banner after Engineering's services", () => {
    renderPage(engineering);
    expect(sectionNames().slice(4, 6)).toEqual(["services-heading", "projects-heading"]);
  });

  it("leaves out the story with no story for the business", () => {
    renderPage({...engineering, story: undefined});
    expect(sectionNames()).not.toContain("story-heading");
  });

  it("leaves out the stock with nothing listed", () => {
    renderPage({...autos, stock: {...autos.stock, items: []}});
    expect(sectionNames()).not.toContain("stock-heading");
  });

  it("has exactly one h1, under the business name", () => {
    renderPage(phones);
    const [h1] = screen.getAllByRole("heading", {level: 1});
    expect([screen.getAllByRole("heading", {level: 1}).length, h1?.previousElementSibling?.textContent]).toEqual([1, "Phones & Gadgets"]);
  });

  it("sets the business's accent on the page content", () => {
    renderPage(autos);
    expect(screen.getByRole("main")).toHaveAttribute("data-division", "autos");
  });

  it("marks the business's own page current in the header", () => {
    renderPage(autos);
    expect(within(screen.getByRole("navigation", {name: "Main"})).getByRole("link", {name: "Autos"})).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("links each Autos offer card, named after its category, to the Cars listings", () => {
    renderPage(autos);
    const offer = screen.getByRole("region", {name: autos.offer.heading.value});
    const links = within(offer).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual(
      autos.offer.cards.map((card) => [card.value.title, "/listings?type=cars"])
    );
  });

  it("shows the offer cards as content, not links, while no page lists the business", () => {
    renderPage(divisionPage(OWN_PAGES.autos, () => false));
    const offer = screen.getByRole("region", {name: autos.offer.heading.value});
    expect([within(offer).getAllByRole("listitem").length, within(offer).queryAllByRole("link")]).toEqual([4, []]);
  });

  it("leaves the Phones offer cards unlinked, since the Listings page doesn't list phones", () => {
    renderPage(phones);
    const offer = screen.getByRole("region", {name: phones.offer.heading.value});
    expect(within(offer).queryAllByRole("link")).toEqual([]);
  });

  it("asks about every stock item on this business's WhatsApp, with See all to the Homes listings", () => {
    renderPage(engineering);
    const stock = screen.getByRole("region", {name: engineering.stock.heading.value});
    const hrefs = within(stock)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect([hrefs.slice(0, -1).every((href) => href?.startsWith("https://wa.me/2348161894229?")), hrefs.at(-1)]).toEqual([
      true,
      "/listings?type=homes",
    ]);
  });

  it("announces the buying steps as an ordered list", () => {
    renderPage(engineering);
    const steps = screen.getByRole("region", {name: engineering.steps.heading.value});
    expect(within(within(steps).getByRole("list")).getAllByRole("listitem").length).toBe(4);
    expect(within(steps).getByRole("list").tagName).toBe("OL");
  });

  it("lists the phone brands as words, with no logo images", () => {
    renderPage(phones);
    const services = screen.getByRole("region", {name: "Trade-ins, repairs and warranty"});
    const brands = within(services).getByRole("heading", {name: "Brands we sell"}).nextElementSibling!;
    expect([
      within(brands as HTMLElement)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
      within(services).queryAllByRole("img"),
    ]).toEqual([["Apple", "Samsung", "Tecno", "Infinix", "HP", "Dell"], []]);
  });

  it("prefills the Phones services action about a trade-in or repair", () => {
    renderPage(phones);
    const action = screen.getByRole("link", {name: /Ask about a trade-in or repair/});
    expect(decodeURIComponent(action.getAttribute("href")!)).toContain("I'd like to ask about a trade-in or repair");
  });

  it("shows only this business's contacts", () => {
    renderPage(phones);
    const visit = screen.getByRole("region", {name: phones.contact.heading.value});
    const names = within(visit)
      .getAllByRole("listitem")
      .map((column) => column.querySelector("p")?.textContent);
    expect(names).toEqual(["Phones & Gadgets"]);
  });

  it("sends every WhatsApp action on Autos to the Autos number", () => {
    renderPage(autos);
    const whatsapp = within(screen.getByRole("main"))
      .getAllByRole("link")
      .map((link) => link.getAttribute("href")!)
      .filter((href) => href.startsWith("https://wa.me/"));
    expect(whatsapp.every((href) => href.startsWith(`https://wa.me/${autos.contact.contacts[0]!.number.value}?`))).toBe(true);
  });
});

describe("the Autos inspection section", () => {
  const rows = autos.specific.kind === "autos" ? autos.specific.rows : [];

  it("shows no financing while the owner hasn't confirmed it", () => {
    render(<AutosInspection heading="What we check" rows={rows} report="Report first." />);
    expect(screen.queryByText(/financ/i)).toBeNull();
  });

  it("shows financing with the owner's terms once offered", () => {
    render(
      <AutosInspection
        heading="What we check"
        rows={rows}
        report="Report first."
        financing={placeholder({heading: "Financing", terms: "Terms here."})}
      />
    );
    expect(screen.getByRole("heading", {name: "Financing"})).toBeVisible();
  });
});
