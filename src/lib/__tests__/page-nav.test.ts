import {describe, expect, it} from "vite-plus/test";
import {pageNav, SITE_PAGES} from "@/lib/page-nav";

const built =
  (...paths: string[]) =>
  (path: string) =>
    paths.includes(path);

describe("pageNav", () => {
  it("lists the sitemap pages in order, at their sitemap paths", () => {
    expect(SITE_PAGES.map((page) => `${page.label} ${page.href}`)).toEqual([
      "About /about",
      "Phones & Gadgets /phones-and-gadgets",
      "Engineering & Real Estate /engineering",
      "Autos /autos",
      "Projects /projects",
      "Listings /listings",
      "News /news",
      "Contact /contact",
    ]);
  });

  it("links only the pages that are built, keeping sitemap order", () => {
    expect(pageNav("/about", built("/contact", "/about")).map((link) => link.href)).toEqual(["/about", "/contact"]);
  });

  it("marks the page being viewed as current, and only that one", () => {
    expect(pageNav("/about", built("/about", "/autos")).map((link) => [link.href, link.current])).toEqual([
      ["/about", true],
      ["/autos", false],
    ]);
  });

  it("marks a collection's link current on one of its item pages", () => {
    const news = pageNav("/news/new-phones-this-week", built("/news")).find((link) => link.href === "/news");
    expect(news?.current).toBe(true);
  });

  it("doesn't mark a page current because its path merely starts the same way", () => {
    expect(pageNav("/newsletter", built("/news"))[0]?.current).toBe(false);
  });
});
