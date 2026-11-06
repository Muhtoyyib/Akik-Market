import {describe, expect, it} from "vite-plus/test";
import {placeholder, real} from "@/lib/content-facts";
import {placeholderReport} from "@/lib/placeholder-report";

const content = {
  hero: {heading: placeholder("Phones, homes and cars"), claims: real(["Original phones"])},
  visit: {address: real({street: "Iwo Road Shopping Complex"}), hours: placeholder("Mon to Sat, 9am to 6pm")},
  social: {instagram: real("https://www.instagram.com/akikmarket/")},
};

describe("placeholderReport", () => {
  it("lists a marked value under its section, with its path", () => {
    expect(placeholderReport(content)).toContain("- `hours`: Mon to Sat, 9am to 6pm");
  });

  it("leaves out values the owner has confirmed", () => {
    expect(placeholderReport(content)).not.toContain("Iwo Road Shopping Complex");
  });

  it("heads each section that has placeholders with its count, and skips sections with none", () => {
    const headings = placeholderReport(content)
      .split("\n")
      .filter((line) => line.startsWith("## "));
    expect(headings).toEqual(["## hero (1)", "## visit (1)"]);
  });

  it("totals the placeholders at the top", () => {
    expect(placeholderReport(content).split("\n")[0]).toBe("# Placeholder report: 2 values to replace");
  });

  it("writes objects compactly and cuts long values", () => {
    const report = placeholderReport({founder: {photos: placeholder([{src: "/a.jpg", alt: "x".repeat(200)}])}});
    const line = report.split("\n").find((entry) => entry.startsWith("- `photos`"));
    expect([line?.includes('[{"src":"/a.jpg"'), line?.endsWith("…")]).toEqual([true, true]);
  });

  it("keeps a value of exactly 100 characters whole and cuts a longer one to 100 plus an ellipsis", () => {
    const value = (length: number) =>
      placeholderReport({hero: {heading: placeholder("a".repeat(length))}})
        .split("\n")
        .at(-1);
    expect([value(100), value(101)]).toEqual([`- \`heading\`: ${"a".repeat(100)}`, `- \`heading\`: ${"a".repeat(100)}…`]);
  });

  it("counts a single placeholder in the singular, using the section name for a top-level value", () => {
    expect(placeholderReport({startYear: placeholder(2023)}).split("\n")).toEqual([
      "# Placeholder report: 1 value to replace",
      "",
      "## startYear (1)",
      "",
      "- `startYear`: 2023",
    ]);
  });

  it("says so when nothing is left to replace", () => {
    expect(placeholderReport({social: content.social})).toBe("# Placeholder report: nothing left to replace");
  });
});
