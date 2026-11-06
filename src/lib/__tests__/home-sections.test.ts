import {describe, expect, it} from "vite-plus/test";
import {headerLinks, sectionLinks} from "@/lib/home-sections";

const all = {divisions: true, featured: true, stories: true, news: true, visit: true};

describe("sectionLinks", () => {
  it("jumps to Home's sections in page order", () => {
    expect(sectionLinks(all)).toEqual([
      {label: "Businesses", href: "#divisions"},
      {label: "Featured", href: "#featured"},
      {label: "Stories", href: "#stories"},
      {label: "News", href: "#news"},
      {label: "Visit us", href: "#visit"},
    ]);
  });

  it("leaves out a link to a section that isn't on the page", () => {
    expect(sectionLinks({...all, news: false}).map((link) => link.label)).not.toContain("News");
  });
});

describe("headerLinks", () => {
  const sections = sectionLinks(all);

  it("uses the section links while no other page is built", () => {
    expect(headerLinks([], sections)).toBe(sections);
  });

  it("switches to the page links once a page is built", () => {
    const pages = [{label: "About", href: "/about"}];
    expect(headerLinks(pages, sections)).toBe(pages);
  });
});
