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
});
