import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {homeContent} from "@/lib/content/home";
import {siteContent} from "@/lib/content/site";
import {email} from "@/lib/content/business";

describe("homeContent", () => {
  it("keeps the 2023 start year as a placeholder until the owner confirms it", () => {
    expect(siteContent.startYear).toEqual({value: 2023, placeholder: true});
  });

  it("lists the start year in the placeholder report", () => {
    expect(listPlaceholders(siteContent)).toContainEqual({path: "startYear", value: 2023});
  });

  it("opens WhatsApp to the main number with a greeting", () => {
    expect(siteContent.whatsapp.main.href).toBe("https://wa.me/2347065470198?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about");
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

  it("sends each division card to its business's page now the pages are built", () => {
    expect(homeContent.divisions.cards.map((card) => card.link.href)).toEqual(["/phones-and-gadgets", "/engineering", "/autos"]);
  });

  it("puts phones first among the featured tabs, since phones are what Akik is known for", () => {
    expect(homeContent.featured.tabs.map((tab) => tab.label)).toEqual(["Phones", "Homes", "Cars"]);
  });

  it("asks about a featured car by name on the cars WhatsApp number", () => {
    const car = homeContent.featured.tabs[2]?.items[0]?.value;
    expect(car?.href).toBe("https://wa.me/2347065470198?text=Hi%20Akik%2C%20I'm%20interested%20in%20the%202018%20Audi%20A5%20Sportback");
  });

  it("marks every featured item as a placeholder until the owner supplies real stock", () => {
    const items = homeContent.featured.tabs.flatMap((tab) => tab.items);
    expect(items.every((item) => item.placeholder)).toBe(true);
  });

  it("sends See all for homes and cars to their Listings tab, and phones to the Phones page", () => {
    expect(homeContent.featured.tabs.map((tab) => tab.link.href)).toEqual([
      "/phones-and-gadgets",
      "/listings?type=homes",
      "/listings?type=cars",
    ]);
  });

  it("names each business in its See all action", () => {
    expect(homeContent.featured.tabs.map((tab) => tab.action)).toEqual(["See all phones", "See all properties", "See all cars"]);
  });

  it("points every featured photo at a file in public/", () => {
    const missing = homeContent.featured.tabs
      .flatMap((tab) => tab.items.map((item) => item.value.image.src))
      .filter((src) => !src.startsWith("/placeholders/featured/") || !existsSync(`public${src}`));
    expect(missing).toEqual([]);
  });

  it("hides featured photos from screen readers, since the card text names the item", () => {
    const alts = new Set(homeContent.featured.tabs.flatMap((tab) => tab.items.map((item) => item.value.image.alt)));
    expect([...alts]).toEqual([""]);
  });

  it("puts the start year in the phones customer's caption and marks it a placeholder", () => {
    expect(homeContent.proof.columns[0]?.source).toEqual({value: "PHONES & GADGETS · CUSTOMER SINCE 2023", placeholder: true});
  });

  it("lists the lead customer quote in the placeholder report", () => {
    expect(listPlaceholders(homeContent).map((entry) => entry.path)).toContain("proof.lead");
  });

  it("keeps the lead quote to about 25 words", () => {
    const {before, highlight} = homeContent.proof.lead.value;
    expect(`${before} ${highlight}`.split(" ").length).toBeLessThanOrEqual(25);
  });

  it("orders the proof columns as the business grew", () => {
    expect(homeContent.proof.columns.map((column) => column.key)).toEqual(["phones", "engineering", "autos"]);
  });

  it("tells one customer story per business, in growth order", () => {
    expect(homeContent.stories.tabs.map((tab) => tab.label)).toEqual(["Phones", "Homes", "Cars"]);
  });

  it("puts the start year in the phones story and keeps every story a placeholder", () => {
    const [phones] = homeContent.stories.tabs;
    expect([phones?.story.value.since, homeContent.stories.tabs.every((tab) => tab.story.placeholder)]).toEqual([
      "CUSTOMER SINCE 2023",
      true,
    ]);
  });

  it("names placeholder customers by first name only", () => {
    expect(homeContent.stories.tabs.filter((tab) => tab.story.value.name.includes(" "))).toEqual([]);
  });

  it("points every story photo at a file in public/", () => {
    expect(homeContent.stories.tabs.filter((tab) => !existsSync(`public${tab.story.value.image.src}`))).toEqual([]);
  });

  it("sends the projects banner to the Projects page now that it exists", () => {
    const {heading, link} = homeContent.projects;
    expect([heading.value, link.href]).toEqual(["Homes we've built and handed over", "/projects"]);
  });

  it("points the projects photo at a file in public/", () => {
    expect(existsSync(`public${homeContent.projects.image.value.src}`)).toBe(true);
  });

  it("keeps the confirmed contact email and second number out of the placeholder report", () => {
    const paths = listPlaceholders(homeContent).map((entry) => entry.path);
    expect([email.value, paths.includes("email"), paths.some((path) => path.endsWith("divisions.cards.1.number"))]).toEqual([
      "akikmarket@gmail.com",
      false,
      false,
    ]);
  });

  it("lists all four buy-with-confidence promises in the placeholder report until the owner approves them", () => {
    const paths = listPlaceholders(homeContent).map((entry) => entry.path);
    expect(paths.filter((path) => path.startsWith("trust.rows."))).toEqual([
      "trust.rows.0",
      "trust.rows.1",
      "trust.rows.2",
      "trust.rows.3",
    ]);
  });

  it("orders the promises phones, cars, land, handover", () => {
    expect(homeContent.trust.rows.map((row) => row.value.title)).toEqual([
      "Genuine phones",
      "Inspected cars",
      "Verified land papers",
      "Handover you can see",
    ]);
  });

  it("points the trust photo at a file in public/", () => {
    expect(existsSync(`public${homeContent.trust.image.value.src}`)).toBe(true);
  });

  it("shows news newest first", () => {
    expect(homeContent.news.posts.map((post) => post.date)).toEqual(["2026-10-30", "2026-10-14", "2026-09-22"]);
  });

  it("leaves news cards unlinked and sends the action to Instagram until the News page exists", () => {
    expect([homeContent.news.posts.map((post) => post.href), homeContent.news.action]).toEqual([
      [undefined, undefined, undefined],
      {label: "Follow us on Instagram", href: "https://www.instagram.com/akikmarket/"},
    ]);
  });

  it("points every news photo at a file in public/", () => {
    expect(homeContent.news.posts.filter((post) => !existsSync(`public${post.image.value.src}`))).toEqual([]);
  });

  it("tells the founder's story in at most 60 words, from the start year", () => {
    const story = homeContent.founder.story.value;
    expect([story.split(/\s+/).length <= 60, story.includes("began in 2023")]).toEqual([true, true]);
  });

  it("links Read our story to the About page now that it exists", () => {
    expect(homeContent.founder.link).toEqual({label: "Read our story", href: "/about"});
  });

  it("shows three to five founder photos, each described and on disk", () => {
    const photos = homeContent.founder.photos.value;
    const problems = photos.filter((photo) => photo.alt === "" || !existsSync(`public${photo.src}`));
    expect([photos.length >= 3 && photos.length <= 5, problems]).toEqual([true, []]);
  });

  it("lists a contact for each business in growth order, with its number", () => {
    expect(homeContent.visit.contacts.map((contact) => [contact.name, contact.number.value])).toEqual([
      ["Phones & Gadgets", "2347065470198"],
      ["Engineering & Real Estate", "2348161894229"],
      ["Autos", "2347065470198"],
    ]);
  });

  it("keeps the shop address as a real fact and the opening hours as placeholders", () => {
    const paths = listPlaceholders(homeContent).map((entry) => entry.path);
    expect([paths.includes("visit.address"), paths.filter((path) => path.endsWith(".hours")).length]).toEqual([false, 3]);
  });

  it("points the shop photo at a file in public/", () => {
    expect(existsSync(`public${homeContent.visit.image.value.src}`)).toBe(true);
  });
});
