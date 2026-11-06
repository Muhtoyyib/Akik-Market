import {describe, expect, it} from "vite-plus/test";
import {countLine, kindOf, listingsHref, listingTabs, newestListed} from "@/lib/listings";

const item = (name: string, business: "phones" | "engineering" | "autos", listed: string) => ({value: {name, business, listed}});
const built =
  (...paths: string[]) =>
  (path: string) =>
    paths.includes(path);

describe("kindOf", () => {
  it("lists Engineering under Homes and Autos under Cars, and not Phones", () => {
    expect([kindOf("engineering"), kindOf("autos"), kindOf("phones")]).toEqual(["homes", "cars", undefined]);
  });
});

describe("listingsHref", () => {
  it("opens the Listings page on the business's tab once the page exists", () => {
    expect([listingsHref("engineering", built("/listings")), listingsHref("autos", built("/listings"))]).toEqual([
      "/listings?type=homes",
      "/listings?type=cars",
    ]);
  });

  it("has no link while the Listings page isn't built", () => {
    expect(listingsHref("autos", built())).toBeUndefined();
  });

  it("has no link for Phones, which the page doesn't list", () => {
    expect(listingsHref("phones", built("/listings"))).toBeUndefined();
  });
});

describe("countLine", () => {
  it("counts homes in the plural", () => {
    expect(countLine(11, "homes")).toBe("11 HOMES AVAILABLE");
  });

  it("counts one car in the singular", () => {
    expect(countLine(1, "cars")).toBe("1 CAR AVAILABLE");
  });
});

describe("newestListed", () => {
  it("puts the newest listing first without changing the collection", () => {
    const all = [item("a", "autos", "2026-01-01"), item("b", "autos", "2026-03-01"), item("c", "autos", "2026-02-01")];
    expect([newestListed(all).map((entry) => entry.value.name), all[0]?.value.name]).toEqual([["b", "c", "a"], "a"]);
  });
});

describe("listingTabs", () => {
  const eleven = Array.from({length: 11}, (_, index) => item(`home ${index}`, "engineering", `2026-01-${10 + index}`));

  it("shows every home, unlike Home's limit of eight", () => {
    expect(listingTabs(eleven)[0]?.items.length).toBe(11);
  });

  it("offers Homes then Cars, leaving out phones", () => {
    const all = [item("car", "autos", "2026-01-01"), item("phone", "phones", "2026-01-01"), ...eleven];
    expect(listingTabs(all).map((tab) => [tab.kind, tab.label, tab.business, tab.count])).toEqual([
      ["homes", "Homes", "engineering", "11 HOMES AVAILABLE"],
      ["cars", "Cars", "autos", "1 CAR AVAILABLE"],
    ]);
  });

  it("gives a kind with no items no tab", () => {
    expect(listingTabs([item("car", "autos", "2026-01-01")]).map((tab) => tab.kind)).toEqual(["cars"]);
  });

  it("orders each tab newest first", () => {
    expect(listingTabs(eleven)[0]?.items[0]?.value.name).toBe("home 10");
  });
});
