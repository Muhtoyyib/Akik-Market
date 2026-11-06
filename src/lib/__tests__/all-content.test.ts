import {describe, expect, it} from "vite-plus/test";
import {placeholderFacts} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {homeContent} from "@/lib/content/home";
import {placeholderReport} from "@/lib/placeholder-report";

const report = placeholderReport(allContent);

describe("the site-wide placeholder report", () => {
  it("lists the placeholder start year under Site-wide", () => {
    expect(report.split("## Listings")[0]).toContain("- `startYear`: 2023");
  });

  it("lists a listing once, under Listings, not again under Home's Featured now", () => {
    expect(report.match(/2018 Audi A5 Sportback/g)).toHaveLength(1);
  });

  it("files each shared value where the owner replaces it: hours site-wide, then listings, posts and stories", () => {
    const under = (text: string) =>
      report
        .split("\n## ")
        .find((page) => page.includes(text))
        ?.split(" (")[0];
    expect(
      ["Mon to Sat", "iPhone 13", "New phones landed", "CHIAMAKA", "I bought my phone from Akik", "fair price", "projects-house"].map(under)
    ).toEqual(["Site-wide", "Listings", "News posts", "Customer stories", "Customer stories", "Customer stories", "Projects banner"]);
  });

  it("loses none of Home's placeholders", () => {
    const listed = new Set(Object.values(allContent).flatMap((content) => placeholderFacts(content).map((entry) => entry.fact)));
    expect(placeholderFacts(homeContent).filter((entry) => !listed.has(entry.fact))).toEqual([]);
  });
});
