import {describe, expect, it} from "vite-plus/test";
import {featuredTabs, priceLabel} from "@/lib/featured";

describe("priceLabel", () => {
  it("writes a price in naira with thousands separators", () => {
    expect(priceLabel(1250000)).toBe("₦1,250,000");
  });

  it("rounds a price to whole naira", () => {
    expect(priceLabel(1250000.4)).toBe("₦1,250,000");
  });

  it("reads PRICE ON REQUEST when an item has no price", () => {
    expect(priceLabel(undefined)).toBe("PRICE ON REQUEST");
  });
});

const items = (count: number) => Array.from({length: count}, (_, index) => `item ${index + 1}`);

describe("featuredTabs", () => {
  it("leaves out a business with no featured items", () => {
    const tabs = featuredTabs([
      {key: "phones", items: items(3)},
      {key: "autos", items: []},
    ]);
    expect(tabs.map((tab) => tab.key)).toEqual(["phones"]);
  });

  it("shows the first eight items when the content lists more", () => {
    const [phones] = featuredTabs([{key: "phones", items: items(10)}]);
    expect(phones?.items).toEqual(items(8));
  });

  it("keeps every item when there are eight or fewer", () => {
    const [phones] = featuredTabs([{key: "phones", items: items(8)}]);
    expect(phones?.items).toHaveLength(8);
  });

  it("keeps the other fields of each business", () => {
    const [phones] = featuredTabs([{key: "phones", label: "Phones", items: items(3)}]);
    expect(phones?.label).toBe("Phones");
  });
});
