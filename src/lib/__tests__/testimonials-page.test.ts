import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {stories} from "@/lib/content/stories";
import {quoteWall} from "@/lib/content/quote-wall";
import {storyTabs, testimonialsShare, testimonialsStories} from "@/lib/content/testimonials-page";
import {testimonialsHead} from "@/lib/page-heads";
import {pageExists} from "@/lib/site-pages";
import {missingPermission} from "@/lib/testimonials";

const {quotes, rows} = quoteWall;
const tiles = rows.flat();

describe("the Testimonials content", () => {
  it("is prerendered at /testimonials", () => {
    expect(pageExists("/testimonials")).toBe(true);
  });

  it("is titled Testimonials · Akik", () => {
    expect(testimonialsHead.meta).toContainEqual({title: "Testimonials · Akik"});
  });

  it("has no real quote without a permission record", () => {
    expect(missingPermission(quotes)).toEqual([]);
  });

  it("names placeholder customers by first name only", () => {
    expect(quotes.filter((item) => item.quote.placeholder && item.name.includes(" "))).toEqual([]);
  });

  it("gives each of the 29 customers one tile, so customers fill 85% of the 34", () => {
    const customers = tiles.flatMap((tile) => (tile.kind === "customer" ? [tile.index] : []));
    expect([tiles.length, [...customers].sort((a, b) => a - b)]).toEqual([34, Array.from({length: 29}, (_, index) => index)]);
  });

  it("shows a different photo and first name for every customer", () => {
    const distinct = (values: string[]) => new Set(values).size === values.length;
    expect([distinct(quotes.map((item) => item.photo.src)), distinct(quotes.map((item) => item.name))]).toEqual([true, true]);
  });

  it("names each quote's business, for the card's accent", () => {
    expect(quotes.find((item) => item.name === "Ngozi")?.businessName).toBe("Engineering & Real Estate");
  });

  it("points every wall photo at a file in public/", () => {
    const sources = [...quotes.map((item) => item.photo.src), ...tiles.flatMap((tile) => ("image" in tile ? [tile.image.src] : []))];
    expect(sources.filter((src) => !existsSync(`public${src}`))).toEqual([]);
  });

  it("hides every wall photo from screen readers, since the button names the customer", () => {
    const alts = new Set([...quotes.map((item) => item.photo.alt), ...tiles.flatMap((tile) => ("image" in tile ? [tile.image.alt] : []))]);
    expect([...alts]).toEqual([""]);
  });

  it("gives every muted tile a photo, and customer tiles their quote's photo instead", () => {
    const withImage = tiles.map((tile) => [tile.kind, "image" in tile]);
    expect(withImage.filter(([kind, image]) => (kind === "filler") !== image)).toEqual([]);
  });

  it("crops every filler photo 3:2 and loads only the smallest copy of each wall photo", () => {
    const fillers = tiles.flatMap((tile) => ("image" in tile ? [tile.image] : []));
    const photos = [...quotes.map((item) => item.photo), ...fillers];
    expect([
      fillers.filter((image) => image.height !== Math.floor((image.width * 2) / 3)),
      photos.filter((image) => !image.src.endsWith("-480.webp")),
    ]).toEqual([[], []]);
  });

  it("names each tab after its customer when a business has two stories", () => {
    const [phones, homes, cars] = stories;
    const secondCar = {...cars!, story: {...cars!.story, value: {...cars!.story.value, name: "TOBI"}}};
    expect(storyTabs([phones!, homes!, cars!, secondCar]).map((tab) => tab.label)).toEqual([
      "Phones",
      "Homes",
      "Cars · IFEOMA",
      "Cars · TOBI",
    ]);
  });

  it("opens WhatsApp to the main number with the spec's message", () => {
    expect(testimonialsShare.href).toBe("https://wa.me/2348161894229?text=Hello%20Akik%2C%20I'd%20like%20to%20share%20my%20story");
  });

  it("labels each story tab by its business while each has one story", () => {
    expect(testimonialsStories.map((tab) => tab.label)).toEqual(["Phones", "Homes", "Cars"]);
  });

  it("lists the page's copy and the wall's extra quotes in the placeholder report", () => {
    const paths = listPlaceholders(allContent).map((entry) => entry.path);
    expect(
      ["Testimonials page.testimonialsIndex.heading", "Customer stories.moreQuotes.0.quote"].filter((path) => !paths.includes(path))
    ).toEqual([]);
  });
});
