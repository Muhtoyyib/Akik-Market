import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Visit} from "@/features/home/visit/visit";
import {homeContent} from "@/lib/home-content";

const {visit} = homeContent;
const renderVisit = () =>
  render(<Visit heading={visit.heading.value} address={visit.address.value} image={visit.image.value} contacts={visit.contacts} />);

describe("Visit us", () => {
  it("is a section named by its heading", () => {
    renderVisit();
    expect(screen.getByRole("region", {name: "Come and see us at Iwo Road"})).toBeInTheDocument();
  });

  it("shows the shop's address", () => {
    renderVisit();
    expect(screen.getByText("Iwo Road Shopping Complex, Ibadan")).toBeInTheDocument();
  });

  it("opens the shop's location in a maps app from Get directions", () => {
    renderVisit();
    expect(screen.getByRole("link", {name: "Get directions"})).toHaveAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=Iwo%20Road%20Shopping%20Complex%2C%20Ibadan"
    );
  });

  it("calls each business on its own number, written locally and dialled internationally", () => {
    renderVisit();
    const autos = screen.getByRole("link", {name: "Call Autos 0706 547 0198"});
    expect([autos.getAttribute("href"), autos.textContent]).toEqual(["tel:+2347065470198", "Call Autos 0706 547 0198"]);
  });

  it("opens WhatsApp to each business from its column", () => {
    renderVisit();
    expect(screen.getByRole("link", {name: "WhatsApp Engineering & Real Estate"})).toHaveAttribute(
      "href",
      expect.stringMatching(/^https:\/\/wa\.me\/2348161894229/)
    );
  });

  it("gives each business a column in growth order, in its accent", () => {
    const {container} = renderVisit();
    const columns = [...container.querySelectorAll("li[data-division]")];
    expect(
      columns.map((column) => [
        column.getAttribute("data-division"),
        within(column as HTMLElement).getByText("Mon to Sat, 9am to 6pm").textContent,
      ])
    ).toEqual([
      ["phones", "Mon to Sat, 9am to 6pm"],
      ["engineering", "Mon to Sat, 9am to 6pm"],
      ["autos", "Mon to Sat, 9am to 6pm"],
    ]);
  });
});
