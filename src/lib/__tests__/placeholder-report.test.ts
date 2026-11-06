import {describe, expect, it} from "vite-plus/test";
import {placeholder, real} from "@/lib/content-facts";
import {placeholderReport} from "@/lib/placeholder-report";

const hours = placeholder("Mon to Sat, 9am to 6pm");
const content = {
  hero: {heading: placeholder("Phones, homes and cars"), claims: real(["Original phones"])},
  visit: {address: real({street: "Iwo Road Shopping Complex"}), hours},
  social: {instagram: real("https://www.instagram.com/akikmarket/")},
};
const report = (pages: Parameters<typeof placeholderReport>[0]) => placeholderReport(pages).split("\n");

describe("placeholderReport", () => {
  it("lists a marked value under its page and section, with its path", () => {
    expect(report({Home: content})).toContain("- `hours`: Mon to Sat, 9am to 6pm");
  });

  it("leaves out values the owner has confirmed", () => {
    expect(placeholderReport({Home: content})).not.toContain("Iwo Road Shopping Complex");
  });

  it("heads each page and section that has placeholders with its count, and skips those with none", () => {
    const headings = report({"Site-wide": {social: content.social}, Home: content}).filter((line) => line.startsWith("#"));
    expect(headings).toEqual(["# Placeholder report: 2 values to replace", "## Home (2)", "### hero (1)", "### visit (1)"]);
  });

  it("lists a value two pages share once, under the first page that has it", () => {
    const lines = report({"Site-wide": {hours: {hours}}, Home: content});
    expect([lines.filter((line) => line.includes("Mon to Sat")).length, lines[0], lines.filter((line) => line.startsWith("## "))]).toEqual([
      1,
      "# Placeholder report: 2 values to replace",
      ["## Site-wide (1)", "## Home (1)"],
    ]);
  });

  it("writes objects compactly and cuts long values", () => {
    const line = report({Home: {founder: {photos: placeholder([{src: "/a.jpg", alt: "x".repeat(200)}])}}}).find((entry) =>
      entry.startsWith("- `photos`")
    );
    expect([line?.includes('[{"src":"/a.jpg"'), line?.endsWith("…")]).toEqual([true, true]);
  });

  it("keeps a value of exactly 100 characters whole and cuts a longer one to 100 plus an ellipsis", () => {
    const value = (length: number) => report({Home: {hero: {heading: placeholder("a".repeat(length))}}}).at(-1);
    expect([value(100), value(101)]).toEqual([`- \`heading\`: ${"a".repeat(100)}`, `- \`heading\`: ${"a".repeat(100)}…`]);
  });

  it("counts a single placeholder in the singular, using the section name for a top-level value", () => {
    expect(report({"Site-wide": {startYear: placeholder(2023)}})).toEqual([
      "# Placeholder report: 1 value to replace",
      "",
      "## Site-wide (1)",
      "",
      "### startYear (1)",
      "",
      "- `startYear`: 2023",
    ]);
  });

  it("says so when nothing is left to replace", () => {
    expect(placeholderReport({Home: {social: content.social}})).toBe("# Placeholder report: nothing left to replace");
  });
});
