import {readdirSync} from "node:fs";
import {resolve} from "node:path";
import {describe, expect, it} from "vite-plus/test";
import {pageExists, prerenderPathnames} from "@/lib/site-pages";

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
