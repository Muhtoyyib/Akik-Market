import {describe, expect, it} from "vite-plus/test";
import {newestFirst, presentTypes, relatedProjects} from "@/lib/projects";

const p = (slug: string, type: string, completed: string) => ({slug, type, completed});
const all = [
  p("old-home", "homes", "2023-01"),
  p("new-estate", "estates", "2025-05"),
  p("mid-home", "homes", "2024-06"),
  p("newest-home", "homes", "2025-09"),
  p("old-estate", "estates", "2022-03"),
];

describe("newestFirst", () => {
  it("orders projects by completion, newest first", () => {
    expect(newestFirst(all).map((project) => project.slug)).toEqual(["newest-home", "new-estate", "mid-home", "old-home", "old-estate"]);
  });

  it("leaves the collection's own order alone", () => {
    newestFirst(all);
    expect(all[0]?.slug).toBe("old-home");
  });
});

describe("presentTypes", () => {
  it("lists only the types that have projects, in the order given", () => {
    expect(presentTypes(all, ["land", "estates", "homes"])).toEqual(["estates", "homes"]);
  });
});

describe("relatedProjects", () => {
  it("shows the newest of the same type first, then the newest of any type", () => {
    expect(relatedProjects(all[2]!, all).map((project) => project.slug)).toEqual(["newest-home", "old-home", "new-estate"]);
  });

  it("never shows the current project", () => {
    expect(all.every((current) => !relatedProjects(current, all).includes(current))).toBe(true);
  });

  it("shows one card when the collection has two projects", () => {
    expect(relatedProjects(all[0]!, all.slice(0, 2))).toEqual([all[1]]);
  });

  it("is empty with no other projects", () => {
    expect(relatedProjects(all[0]!, [all[0]!])).toEqual([]);
  });
});
