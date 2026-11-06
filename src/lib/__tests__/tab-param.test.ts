import {describe, expect, it} from "vite-plus/test";
import {tabFromSearch, withTab} from "@/lib/tab-param";

const TYPES = ["homes", "estates"];

describe("tabFromSearch", () => {
  it("selects the type named in ?type=", () => {
    expect(tabFromSearch("?type=estates", {param: "type", tabs: TYPES, fallback: "all"})).toBe("estates");
  });

  it("falls back for a type with no tab", () => {
    expect(tabFromSearch("?type=boats", {param: "type", tabs: TYPES, fallback: "all"})).toBe("all");
  });

  it("falls back with no ?type=", () => {
    expect(tabFromSearch("", {param: "type", tabs: TYPES, fallback: "homes"})).toBe("homes");
  });
});

describe("withTab", () => {
  it("names the chosen type, keeping the rest of the address", () => {
    expect(withTab("https://akik.test/listings?ref=home#grid", "cars", {param: "type", tabs: ["homes", "cars"]}).href).toBe(
      "https://akik.test/listings?ref=home&type=cars#grid"
    );
  });

  it("keeps the tab under the param it's given", () => {
    expect(withTab("https://akik.test/news", "autos", {param: "business", tabs: ["autos"]}).search).toBe("?business=autos");
  });

  it("clears ?type= for a tab that isn't a type", () => {
    expect(withTab("https://akik.test/projects?type=homes", "all", {param: "type", tabs: TYPES}).href).toBe("https://akik.test/projects");
  });
});
