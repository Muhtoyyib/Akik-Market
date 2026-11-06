import {readdirSync} from "node:fs";
import {resolve} from "node:path";
import {describe, expect, it} from "vite-plus/test";
import {posts} from "@/lib/content/news";
import {collectionPaths, pageExists, prerenderList, prerenderPathnames} from "@/lib/site-pages";

const routesDir = resolve(import.meta.dirname, "../../routes");

function routeFileToPathname(file: string): string {
  const name = file.replace(/\.tsx$/, "");
  return name === "index" ? "/" : `/${name.replace(/\.index$/, "").replaceAll(".", "/")}`;
}

describe("prerenderPathnames", () => {
  it("prerenders every static route file", () => {
    const routePathnames = readdirSync(routesDir)
      .filter((file) => file.endsWith(".tsx") && !file.startsWith("__") && !file.includes("$"))
      .map(routeFileToPathname);
    expect([...prerenderPathnames].sort()).toEqual(routePathnames.sort());
  });
});

describe("pageExists", () => {
  it("knows a shipped page", () => {
    expect(pageExists("/")).toBe(true);
  });

  it("knows a page that has not shipped", () => {
    expect(pageExists("/autos")).toBe(false);
  });
});

describe("prerenderList", () => {
  it("lists the static pages, then one path per item of each collection whose pages are built", () => {
    expect(prerenderList(["/", "/news"], [{base: "/news", slugs: ["fresh-car-arrivals", "new-phones-this-week"]}])).toEqual([
      "/",
      "/news",
      "/news/fresh-car-arrivals",
      "/news/new-phones-this-week",
    ]);
  });
});

describe("collectionPaths", () => {
  it("fails on a slug two items share, naming it", () => {
    expect(() => collectionPaths("/projects", ["jericho-terrace", "akobo-duplex", "jericho-terrace"])).toThrow(
      "/projects: slug jericho-terrace is used twice"
    );
  });

  it("fails on a slug that isn't lowercase and hyphenated, naming it", () => {
    expect(
      ["New-Phones", "new phones", "new--phones", "-new", "new-"].map((slug) => {
        try {
          collectionPaths("/news", [slug]);
          return "accepted";
        } catch (error) {
          return (error as Error).message; // A thrown value here is always our Error.
        }
      })
    ).toEqual([
      "/news: slug New-Phones must be lowercase words joined by hyphens",
      "/news: slug new phones must be lowercase words joined by hyphens",
      "/news: slug new--phones must be lowercase words joined by hyphens",
      "/news: slug -new must be lowercase words joined by hyphens",
      "/news: slug new- must be lowercase words joined by hyphens",
    ]);
  });

  it("accepts lowercase words and numbers joined by hyphens", () => {
    expect(collectionPaths("/news", ["iphone-13-in-stock"])).toEqual(["/news/iphone-13-in-stock"]);
  });

  it("gives every news post a unique, well-formed slug, ready for the News pages", () => {
    expect(
      collectionPaths(
        "/news",
        posts.map((post) => post.slug)
      )
    ).toHaveLength(posts.length);
  });
});
