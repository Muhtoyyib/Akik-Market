import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {Featured} from "@/features/home/featured/featured";

const image = {src: "/item.jpg", alt: "", width: 512, height: 640};
const item = (name: string, price?: number) => ({value: {name, detail: "DETAIL", price, href: `https://wa.me/1?text=${name}`, image}});
const tab = (key: "phones" | "engineering" | "autos", label: string, names: string[]) => ({
  key,
  label,
  action: `See all ${label.toLowerCase()}`,
  link: {href: `https://wa.me/${key}`},
  items: names.map((name) => item(name)),
});

const phones = tab("phones", "Phones", ["iPhone 13", "Galaxy S23", "Pixel 8"]);
const cars = tab("autos", "Cars", ["2014 Lexus ES350", "2016 Toyota Camry", "2018 Audi A5"]);

function renderFeatured(tabs = [phones, cars]) {
  return render(<Featured eyebrow="Featured now" heading="Just in at Akik" tabs={tabs} />);
}

describe("Featured now", () => {
  it("is a section named by its heading", () => {
    renderFeatured();
    expect(screen.getByRole("region", {name: "Just in at Akik"})).toBeInTheDocument();
  });

  it("selects the first business when the page loads", () => {
    renderFeatured();
    expect(screen.getByRole("tab", {selected: true})).toHaveTextContent("Phones");
  });

  it("names each card as a WhatsApp enquiry about the item", () => {
    renderFeatured();
    expect(screen.getByRole("link", {name: "Ask about iPhone 13 on WhatsApp"})).toHaveAttribute("href", "https://wa.me/1?text=iPhone 13");
  });

  it("shows a business's items and action when its tab is chosen", async () => {
    renderFeatured();
    await userEvent.click(screen.getByRole("tab", {name: "Cars"}));
    const panel = screen.getByRole("tabpanel");
    expect([
      within(panel).getByRole("link", {name: "Ask about 2014 Lexus ES350 on WhatsApp"}),
      within(panel).getByRole("link", {name: "See all cars"}),
    ]).toHaveLength(2);
  });

  it("gives the panel its business's accent", async () => {
    renderFeatured();
    await userEvent.click(screen.getByRole("tab", {name: "Cars"}));
    expect(screen.getByRole("tabpanel").querySelector("[data-division]")).toHaveAttribute("data-division", "autos");
  });

  it("reads PRICE ON REQUEST for an item without a price", () => {
    renderFeatured([{...phones, items: [item("iPhone 13"), item("Galaxy S23", 780000), item("Pixel 8")]}, cars]);
    const card = screen.getByRole("link", {name: "Ask about iPhone 13 on WhatsApp"}).closest("li")!;
    expect(card).toHaveTextContent("PRICE ON REQUEST");
  });

  it("leaves the tabs out when only one business has items", () => {
    renderFeatured([cars]);
    expect([screen.queryByRole("tablist"), screen.getByRole("link", {name: "See all cars"})]).toEqual([null, expect.anything()]);
  });

  it("leaves the section out when no business has items", () => {
    renderFeatured([]);
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("names the arrows for what they do", () => {
    renderFeatured();
    expect([screen.getByRole("button", {name: "Previous item"}), screen.getByRole("button", {name: "Next item"})]).toHaveLength(2);
  });
});
