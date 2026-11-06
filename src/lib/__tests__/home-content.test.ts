import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {homeContent} from "@/lib/home-content";

describe("homeContent", () => {
  it("keeps the 2023 start year as a placeholder until the owner confirms it", () => {
    expect(homeContent.startYear).toEqual({value: 2023, placeholder: true});
  });

  it("lists the start year in the placeholder report", () => {
    expect(listPlaceholders(homeContent)).toContainEqual({path: "startYear", value: 2023});
  });

  it("opens WhatsApp to the main number with a greeting", () => {
    expect(homeContent.whatsapp.main.href).toBe("https://wa.me/2347065470198?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about");
  });

  it("shows three reassurance claims in the hero", () => {
    expect(homeContent.hero.claims.value).toHaveLength(3);
  });

  it("puts the start year in the divisions heading and marks it a placeholder", () => {
    expect(homeContent.divisions.heading).toEqual({value: "Built on trust since 2023", placeholder: true});
  });

  it("orders the divisions as the business grew", () => {
    expect(homeContent.divisions.cards.map((card) => card.name)).toEqual(["Phones & Gadgets", "Engineering & Real Estate", "Autos"]);
  });

  it("sends each division card to WhatsApp about that business until its page exists", () => {
    expect(homeContent.divisions.cards.map((card) => card.link.href)).toEqual([
      "https://wa.me/2347065470198?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about%20a%20phone",
      "https://wa.me/2348161894229?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about%20a%20house%20or%20land",
      "https://wa.me/2347065470198?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about%20a%20car",
    ]);
  });

  it("puts phones first among the featured tabs, since phones are what Akik is known for", () => {
    expect(homeContent.featured.tabs.map((tab) => tab.label)).toEqual(["Phones", "Homes", "Cars"]);
  });

  it("asks about a featured car by name on the cars WhatsApp number", () => {
    const car = homeContent.featured.tabs[2]?.items[0]?.value;
    expect(car?.href).toBe("https://wa.me/2347065470198?text=Hi%20Akik%2C%20I'm%20interested%20in%20the%202018%20Audi%20A5%20Sportback");
  });

  it("marks every featured item as a placeholder until the owner supplies real stock", () => {
    const items = homeContent.featured.tabs.flatMap((tab) => tab.items);
    expect(items.every((item) => item.placeholder)).toBe(true);
  });

  it("sends See all properties to WhatsApp for the property business until its page exists", () => {
    expect(homeContent.featured.tabs[1]?.link.href).toBe(
      "https://wa.me/2348161894229?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about%20a%20house%20or%20land"
    );
  });

  it("names each business in its See all action", () => {
    expect(homeContent.featured.tabs.map((tab) => tab.action)).toEqual(["See all phones", "See all properties", "See all cars"]);
  });

  it("points every featured photo at a file in public/", () => {
    const missing = homeContent.featured.tabs
      .flatMap((tab) => tab.items.map((item) => item.value.image.src))
      .filter((src) => !src.startsWith("/placeholders/featured/") || !existsSync(`public${src}`));
    expect(missing).toEqual([]);
  });

  it("hides featured photos from screen readers, since the card text names the item", () => {
    const alts = new Set(homeContent.featured.tabs.flatMap((tab) => tab.items.map((item) => item.value.image.alt)));
    expect([...alts]).toEqual([""]);
  });

  it("puts the start year in the phones customer's caption and marks it a placeholder", () => {
    expect(homeContent.proof.columns[0]?.source).toEqual({value: "PHONES & GADGETS · CUSTOMER SINCE 2023", placeholder: true});
  });

  it("lists the lead customer quote in the placeholder report", () => {
    expect(listPlaceholders(homeContent).map((entry) => entry.path)).toContain("proof.lead");
  });

  it("keeps the lead quote to about 25 words", () => {
    const {before, highlight} = homeContent.proof.lead.value;
    expect(`${before} ${highlight}`.split(" ").length).toBeLessThanOrEqual(25);
  });

  it("orders the proof columns as the business grew", () => {
    expect(homeContent.proof.columns.map((column) => column.key)).toEqual(["phones", "engineering", "autos"]);
  });
});
