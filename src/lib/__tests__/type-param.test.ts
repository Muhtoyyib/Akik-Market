import {describe, expect, it} from "vite-plus/test";
import {typeFromSearch, withType} from "@/lib/type-param";

const TYPES = ["homes", "estates"];

describe("typeFromSearch", () => {
  it("selects the type named in ?type=", () => {
    expect(typeFromSearch("?type=estates", TYPES, "all")).toBe("estates");
  });

  it("falls back for a type with no tab", () => {
    expect(typeFromSearch("?type=boats", TYPES, "all")).toBe("all");
  });

  it("falls back with no ?type=", () => {
    expect(typeFromSearch("", TYPES, "homes")).toBe("homes");
  });
});

describe("withType", () => {
  it("names the chosen type, keeping the rest of the address", () => {
    expect(withType("https://akik.test/listings?ref=home#grid", "cars", ["homes", "cars"]).href).toBe(
      "https://akik.test/listings?ref=home&type=cars#grid"
    );
  });

  it("clears ?type= for a tab that isn't a type", () => {
    expect(withType("https://akik.test/projects?type=homes", "all", TYPES).href).toBe("https://akik.test/projects");
  });
});
