import {describe, expect, it} from "vite-plus/test";
import {placeholderFacts} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {business} from "@/lib/content/business";
import {listings} from "@/lib/content/listings";
import {listingsGrid, listingsNextSteps} from "@/lib/content/listings-page";
import {listingsHead} from "@/lib/page-heads";
import {prerenderPathnames} from "@/lib/site-pages";
import {whatsappHref} from "@/lib/whatsapp";

const content = (name: string) => listingsHead.meta.find((tag) => "name" in tag && tag.name === name)?.content;

describe("Listings content", () => {
  it("is prerendered at /listings", () => {
    expect(prerenderPathnames).toContain("/listings");
  });

  it("titles the page 'Listings · Akik'", () => {
    expect(listingsHead.meta[0]).toEqual({title: "Listings · Akik"});
  });

  it("describes homes and cars for sale in Ibadan", () => {
    expect(content("description")).toMatch(/homes and cars for sale in Ibadan/i);
  });

  it("shows every home and car in the collection, and no phones", () => {
    const shown = listingsGrid.flatMap((tab) => tab.items.map((item) => item.value.name));
    const expected = listings.filter((item) => item.value.business !== "phones").map((item) => item.value.name);
    expect([...shown].sort()).toEqual([...expected].sort());
  });

  it("asks about each item on its own business's WhatsApp, naming the item", () => {
    const wrong = listingsGrid.flatMap((tab) =>
      tab.items.filter(
        (item) => item.value.href !== whatsappHref(business(tab.business).number.value, `Hi Akik, I'm interested in the ${item.value.name}`)
      )
    );
    expect(wrong).toEqual([]);
  });

  it("says what happens next in three steps", () => {
    expect(listingsNextSteps.rows.length).toBe(3);
  });

  it("reports the heading, intro and every next step as placeholders under Listings page", () => {
    const reported = placeholderFacts(allContent["Listings page"]).map((entry) => entry.path);
    expect(reported).toEqual([
      "listingsIndex.heading",
      "listingsIndex.intro",
      "listingsNextSteps.heading",
      ...listingsNextSteps.rows.map((_, index) => `listingsNextSteps.rows.${index}`),
    ]);
  });
});
