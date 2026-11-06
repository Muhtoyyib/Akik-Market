import {readdirSync} from "node:fs";
import {resolve} from "node:path";
import {describe, expect, it} from "vite-plus/test";
import {newsSummaries as posts} from "@/lib/content/news-summaries";
import {collectionPaths, NOT_FOUND_PATH, pageExists, prerenderList, prerenderPathnames, routedPath} from "@/lib/site-pages";

const routesDir = resolve(import.meta.dirname, "../../routes");

function routeFileToPathname(file: string): string {
  const name = file.replace(/\.tsx$/, "");
  return name === "index" ? "/" : `/${name.replace(/\.index$/, "").replaceAll(".", "/")}`;
}

describe("prerenderPathnames", () => {
  it("prerenders every static route file, and item pages only under a $slug route", () => {
    const files = readdirSync(routesDir).filter((file) => file.endsWith(".tsx") && !file.startsWith("__"));
    const routePathnames = files.filter((file) => !file.includes("$")).map(routeFileToPathname);
    // "projects.$slug.tsx" serves every path under "/projects/".
    const itemBases = files.filter((file) => file.includes("$")).map((file) => `/${file.split(".$")[0]!.replaceAll(".", "/")}/`);
    const pages = prerenderPathnames.filter((path) => !itemBases.some((base) => path.startsWith(base)));
    expect(pages.sort()).toEqual(routePathnames.sort());
  });
});

describe("pageExists", () => {
  it("knows a shipped page", () => {
    expect(pageExists("/")).toBe(true);
  });

  it("knows a page that has not shipped", () => {
    expect(pageExists("/contact")).toBe(false);
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

describe("routedPath", () => {
  it("routes a path with no page to the 404 page, as the host does", () => {
    expect(routedPath("/shop/iphone-11")).toBe(NOT_FOUND_PATH);
  });

  it("leaves a built page's path alone with a trailing slash, as the prerenderer requests it", () => {
    expect(routedPath("/design-system/")).toBe("/design-system/");
  });

  it("leaves a built page's path alone", () => {
    expect(["/", "/design-system", "/404"].map(routedPath)).toEqual(["/", "/design-system", "/404"]);
  });
});
