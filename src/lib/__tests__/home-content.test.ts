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
});
