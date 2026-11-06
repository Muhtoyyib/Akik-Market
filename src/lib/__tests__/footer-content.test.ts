import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {siteContent} from "@/lib/content/site";

const {footer} = siteContent;

describe("footer content", () => {
  it("counts from the start year, then phones sold and cars delivered", () => {
    expect(footer.counters.map((counter) => [counter.value.figure, counter.value.label])).toEqual([
      ["2023", "Serving Ibadan since"],
      ["1,000+", "Phones sold"],
      ["50+", "Cars delivered"],
    ]);
  });

  it("reports every invented figure as a placeholder", () => {
    expect(listPlaceholders(footer).map((entry) => entry.path)).toEqual(expect.arrayContaining(["counters.1", "counters.2"]));
  });

  it("keeps the start year figure a placeholder for as long as the start year is one", () => {
    expect(footer.counters[0]?.placeholder).toBe(siteContent.startYear.placeholder);
  });

  it("shows the Businesses, Company and Follow columns once those pages are built, and leaves out Legal", () => {
    expect(footer.columns.map((column) => column.heading)).toEqual(["Businesses", "Company", "Follow"]);
  });

  it("lists only the built pages under Company", () => {
    expect(footer.columns.find((column) => column.heading === "Company")?.links).toEqual([
      {label: "About", href: "/about"},
      {label: "Projects", href: "/projects"},
      {label: "Listings", href: "/listings"},
      {label: "Testimonials", href: "/testimonials"},
      {label: "News", href: "/news"},
    ]);
  });

  it("links each business's page under Businesses", () => {
    expect(footer.columns[0]?.links.map((link) => link.href)).toEqual(["/phones-and-gadgets", "/engineering", "/autos"]);
  });

  it("follows Akik on its real Instagram and TikTok accounts", () => {
    expect(footer.columns.find((column) => column.heading === "Follow")?.links).toEqual([
      {label: "Instagram", href: "https://www.instagram.com/akikmarket/"},
      {label: "TikTok", href: "https://www.tiktok.com/@akikmarket"},
    ]);
  });

  it("dates the legal line with the year the site was built", () => {
    expect(footer.legal.value).toBe(`© ${new Date().getFullYear()} Akik. Iwo Road, Ibadan.`);
  });

  it("marks the typeset wordmark as a placeholder for the owner's logo", () => {
    expect(footer.wordmark).toEqual({value: "AKIK", placeholder: true});
  });
});
