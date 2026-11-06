import {describe, expect, it} from "vite-plus/test";
import {business} from "@/lib/content/business";
import {homeFeatured, homeNews, homeQuotes, homeStories} from "@/lib/content/home-collections";
import {listings} from "@/lib/content/listings";
import {posts} from "@/lib/content/news";
import {quotes} from "@/lib/content/quotes";
import {stories} from "@/lib/content/stories";

const names = (tabs: ReturnType<typeof homeFeatured>) => tabs.flatMap((tab) => tab.items.map((item) => item.value.name));

describe("Home's rules over the shared collections", () => {
  it("drops a sold car from Featured now when it leaves the listings", () => {
    const sold = listings.find((item) => item.value.name === "2018 Audi A5 Sportback")!;
    expect(names(homeFeatured(listings.filter((item) => item !== sold)))).not.toContain("2018 Audi A5 Sportback");
  });

  it("files each listing under its own business's tab", () => {
    expect(homeFeatured(listings).map((tab) => [tab.key, tab.items.every((item) => item.value.business === tab.key)])).toEqual([
      ["phones", true],
      ["engineering", true],
      ["autos", true],
    ]);
  });

  it("drops the tab of a business with no listings left", () => {
    const tabs = homeFeatured(listings.filter((item) => item.value.business !== "engineering"));
    expect(tabs.map((tab) => tab.key)).toEqual(["phones", "autos"]);
  });

  it("drops a removed post from Home's news", () => {
    const [newest, ...rest] = posts;
    expect(homeNews(rest).map((post) => post.title)).not.toContain(newest!.title);
  });

  it("drops a removed story from Home, leaving the other businesses' stories", () => {
    expect(homeStories(stories.filter((item) => item.business !== "phones")).map((tab) => tab.key)).toEqual(["engineering", "autos"]);
  });

  it("uses the first story when a business has more than one", () => {
    const [first] = stories;
    const second = {...first!, story: {...first!.story, value: {...first!.story.value, name: "SEGUN"}}};
    expect(homeStories([first!, second])[0]?.story.value.name).toBe("CHIAMAKA");
  });

  it("hides story and news photos from screen readers, since the text beside them says who and what", () => {
    const alts = new Set([...stories.map((item) => item.story.value.image.alt), ...posts.map((post) => post.image.value.alt)]);
    expect([...alts]).toEqual([""]);
  });

  it("finds a business by its key", () => {
    expect(business("autos").name).toBe("Autos");
  });
});

describe("homeQuotes", () => {
  it("skips a business with no quote rather than leaving an empty column", () => {
    expect(homeQuotes(quotes.filter((item) => item.business !== "autos")).map((column) => column.key)).toEqual(["phones", "engineering"]);
  });
});
