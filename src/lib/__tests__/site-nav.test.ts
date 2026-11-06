import {describe, expect, it} from "vite-plus/test";
import {navLinks, SITE_PAGES, siteNav} from "@/lib/site-nav";

const pages = [
  {label: "About", href: "/about"},
  {label: "Autos", href: "/autos"},
  {label: "News", href: "/news"},
];

describe("navLinks", () => {
  it("links only the pages that are built, in sitemap order", () => {
    const built = new Set(["/news", "/about"]);
    expect(navLinks(pages, (path) => built.has(path)).map((link) => link.label)).toEqual(["About", "News"]);
  });
});

describe("siteNav", () => {
  it("is empty while Home is the only built page, so the header has no dead links", () => {
    expect(siteNav).toEqual([]);
  });
});

describe("SITE_PAGES", () => {
  it("follows the sitemap: About, the three businesses, Projects, News, Contact", () => {
    expect(SITE_PAGES).toEqual([
      {label: "About", href: "/about"},
      {label: "Phones & Gadgets", href: "/phones-and-gadgets"},
      {label: "Engineering & Real Estate", href: "/engineering"},
      {label: "Autos", href: "/autos"},
      {label: "Projects", href: "/projects"},
      {label: "News", href: "/news"},
      {label: "Contact", href: "/contact"},
    ]);
  });
});
