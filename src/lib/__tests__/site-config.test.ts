import {describe, expect, it} from "vite-plus/test";
import {getPageTitle, siteConfig} from "@/lib/site-config";

describe("siteConfig", () => {
  it("lists the three divisions in the order the business grew", () => {
    expect(siteConfig.divisions.map((division) => division.slug)).toEqual(["phones-and-gadgets", "engineering", "autos"]);
  });

  it("uses the brand name alone as the default title", () => {
    expect(getPageTitle()).toBe("Akik");
  });

  it("prefixes a page title to the brand name", () => {
    expect(getPageTitle("Autos")).toBe("Autos | Akik");
  });
});
