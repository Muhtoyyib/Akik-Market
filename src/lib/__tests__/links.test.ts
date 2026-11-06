import {describe, expect, it} from "vite-plus/test";
import {opensInNewTab} from "@/lib/links";

describe("opensInNewTab", () => {
  it.each(["https://wa.me/2347065470198", "http://example.com"])("opens web addresses like %s in a new tab", (href) => {
    expect(opensInNewTab(href)).toBe(true);
  });

  it.each(["/about", "#visit-us", "tel:+2347065470198", "mailto:hello@example.com", "xhttps://example.com"])(
    "keeps %s in the same tab",
    (href) => {
      expect(opensInNewTab(href)).toBe(false);
    }
  );
});
