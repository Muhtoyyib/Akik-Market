import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {type Fact, placeholderFacts} from "@/lib/content-facts";
import {business, businesses} from "@/lib/content/business";
import {divisionPage, divisionStock, divisionStory, seeAllHref} from "@/lib/content/division-page";
import {divisionHead} from "@/lib/page-heads";
import {autosPage} from "@/lib/content/divisions/autos";
import {engineeringPage} from "@/lib/content/divisions/engineering";
import {phonesPage} from "@/lib/content/divisions/phones";
import {listings} from "@/lib/content/listings";
import {stories} from "@/lib/content/stories";

const none = () => false;
const built =
  (...paths: string[]) =>
  (path: string) =>
    paths.includes(path);
const pages = businesses.map((entry) => divisionPage(entry.key, none));
const own = [phonesPage, engineeringPage, autosPage];

describe("division page content", () => {
  it("titles each page '{business} · Akik'", () => {
    expect(businesses.map((entry) => divisionHead(entry.key).meta[0])).toEqual([
      {title: "Phones & Gadgets · Akik"},
      {title: "Engineering & Real Estate · Akik"},
      {title: "Autos · Akik"},
    ]);
  });

  it("describes each page by what the business sells and where", () => {
    expect(own.every((page) => page.description.value.includes("Ibadan"))).toBe(true);
  });

  it("names the business over the h1", () => {
    expect(pages.map((page) => page.hero.eyebrow)).toEqual(["Phones & Gadgets", "Engineering & Real Estate", "Autos"]);
  });

  it("gives the hero three short claims", () => {
    expect(own.map((page) => page.hero.claims.value.length)).toEqual([3, 3, 3]);
  });

  it("offers three to six cards per business", () => {
    expect(own.every((page) => page.offer.cards.length >= 3 && page.offer.cards.length <= 6)).toBe(true);
  });

  it("lists three to five buying steps per business", () => {
    expect(own.every((page) => page.steps.rows.length >= 3 && page.steps.rows.length <= 5)).toBe(true);
  });

  it("keeps every promise a placeholder until the owner confirms it", () => {
    const facts: Fact<unknown>[] = [
      ...own.flatMap((page) => [...page.steps.rows, ...page.offer.cards]),
      ...phonesPage.services.groups.flatMap((group): Fact<unknown>[] => group.rows),
      ...engineeringPage.services.rows,
      ...autosPage.inspection.rows,
      autosPage.inspection.report,
    ];
    expect(facts.every((fact) => fact.placeholder)).toBe(true);
  });

  it("reports every placeholder on each page", () => {
    expect(own.map((page) => placeholderFacts(page).length > 10)).toEqual([true, true, true]);
  });

  it("points every page photo at a file in public/ and keeps it out of screen readers", () => {
    const images = own.flatMap((page) => [
      page.hero.media.value,
      page.steps.image.value,
      ...page.offer.cards.map((card) => card.value.image),
    ]);
    expect(images.filter((image) => !existsSync(`public${image.src}`) || image.alt !== "")).toEqual([]);
  });

  it("sends every WhatsApp action on a page to that business's own number", () => {
    const hrefs = pages.map((page) => [
      page.hero.whatsappHref,
      page.steps.whatsappHref,
      ...page.contact.contacts.map((contact) => contact.whatsappHref),
      page.stock.href,
    ]);
    expect(hrefs.map((list, index) => list.every((href) => href.startsWith(`https://wa.me/${businesses[index]!.number.value}?`)))).toEqual([
      true,
      true,
      true,
    ]);
  });

  it("prefills the Phones services action about a trade-in or repair", () => {
    const [phones] = pages;
    expect(phones?.specific.kind === "phones" && decodeURIComponent(phones.specific.whatsappHref)).toContain("a trade-in or repair");
  });

  it("puts the business's own section in the specific slot", () => {
    expect(pages.map((page) => page.specific.kind)).toEqual(["phones", "engineering", "autos"]);
  });

  it("shows only this business's contacts", () => {
    expect(pages.map((page) => page.contact.contacts.map((contact) => contact.key))).toEqual([["phones"], ["engineering"], ["autos"]]);
  });

  it("ships Autos with no financing until the owner gives terms", () => {
    expect(autosPage.inspection.financing).toBeUndefined();
  });
});

describe("divisionStock", () => {
  it("shows only this business's items, newest first", () => {
    const stock = divisionStock("autos", listings);
    const dates = stock.map((item) => item.value.listed);
    expect([stock.every((item) => item.value.business === "autos"), dates]).toEqual([true, [...dates].sort().reverse()]);
  });

  it("shows at most eight items", () => {
    const many = Array.from({length: 10}, (_, index) => ({
      ...listings[0]!,
      value: {...listings[0]!.value, listed: `2026-01-${10 + index}`},
    }));
    expect(divisionStock("phones", many).map((item) => item.value.listed)).toEqual([
      "2026-01-19",
      "2026-01-18",
      "2026-01-17",
      "2026-01-16",
      "2026-01-15",
      "2026-01-14",
      "2026-01-13",
      "2026-01-12",
    ]);
  });

  it("is empty for a business with nothing listed", () => {
    expect(
      divisionStock(
        "autos",
        listings.filter((item) => item.value.business !== "autos")
      )
    ).toEqual([]);
  });
});

describe("seeAllHref", () => {
  it("opens WhatsApp to the business until the Listings page exists", () => {
    expect(seeAllHref("autos", none)).toBe("https://wa.me/2348161894229?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about%20a%20car");
  });

  it("goes to the Listings page with Cars or Homes selected once it exists", () => {
    expect([seeAllHref("autos", built("/listings")), seeAllHref("engineering", built("/listings"))]).toEqual([
      "/listings?type=cars",
      "/listings?type=homes",
    ]);
  });

  it("keeps Phones on WhatsApp, since the Listings page doesn't list phones", () => {
    expect(seeAllHref("phones", built("/listings"))).toMatch(/^https:\/\/wa\.me\//);
  });
});

describe("divisionStory", () => {
  it("picks this business's first story", () => {
    expect(divisionStory("autos", stories)?.story.value.name).toBe("IFEOMA");
  });

  it("has none for a business with no story yet", () => {
    expect(
      divisionStory(
        "engineering",
        stories.filter((item) => item.business !== "engineering")
      )
    ).toBeUndefined();
  });
});

describe("business", () => {
  it("knows each business's number", () => {
    expect(business("engineering").number.value).toBe("2348161894229");
  });
});
