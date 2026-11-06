import {describe, expect, it} from "vite-plus/test";
import {latestPosts, newestPosts, newsDate, postBusinesses} from "@/lib/news";

describe("newsDate", () => {
  it("writes a date as day, short month and year in capitals", () => {
    expect(newsDate("2026-11-06")).toBe("6 NOV 2026");
  });

  it("reads the date as a calendar day, whatever the visitor's time zone", () => {
    expect(newsDate("2026-01-01")).toBe("1 JAN 2026");
  });

  it("names every month by its three-letter abbreviation", () => {
    const months = Array.from({length: 12}, (_, index) => newsDate(`2026-${String(index + 1).padStart(2, "0")}-01`).split(" ")[1]);
    expect(months).toEqual(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]);
  });

  it("keeps two-digit days whole", () => {
    expect(newsDate("2026-09-30")).toBe("30 SEP 2026");
  });
});

const post = (date: string) => ({date, title: date});

describe("latestPosts", () => {
  it("shows the three newest posts, newest first", () => {
    const posts = ["2026-08-01", "2026-11-01", "2026-09-15", "2026-10-20", "2026-07-04"].map(post);
    expect(latestPosts(posts).map((entry) => entry.date)).toEqual(["2026-11-01", "2026-10-20", "2026-09-15"]);
  });

  it("shows every post when there are fewer than three", () => {
    expect(latestPosts([post("2026-08-01"), post("2026-09-01")]).map((entry) => entry.date)).toEqual(["2026-09-01", "2026-08-01"]);
  });

  it("leaves the content's own order alone", () => {
    const posts = [post("2026-08-01"), post("2026-09-01")];
    latestPosts(posts);
    expect(posts.map((entry) => entry.date)).toEqual(["2026-08-01", "2026-09-01"]);
  });
});

describe("postBusinesses", () => {
  it("lists only the businesses with posts, in the order given", () => {
    expect(postBusinesses([{business: "autos"}, {business: "phones"}], ["phones", "engineering", "autos"])).toEqual(["phones", "autos"]);
  });
});

describe("newestPosts", () => {
  it("lists every post newest first without changing the collection", () => {
    const posts = [post("2026-08-01"), post("2026-09-01"), post("2026-07-01"), post("2026-10-01")];
    expect([newestPosts(posts).map((entry) => entry.date), posts[0]?.date]).toEqual([
      ["2026-10-01", "2026-09-01", "2026-08-01", "2026-07-01"],
      "2026-08-01",
    ]);
  });
});
