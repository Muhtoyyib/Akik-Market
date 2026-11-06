import {describe, expect, it} from "vite-plus/test";
import {relatedItems} from "@/lib/related";

const item = (id: string, group: string, date: string) => ({id, group, date});
const key = (entry: ReturnType<typeof item>) => entry;

describe("relatedItems", () => {
  const all = [
    item("a", "phones", "2026-01-01"),
    item("b", "phones", "2026-03-01"),
    item("c", "autos", "2026-05-01"),
    item("d", "phones", "2026-02-01"),
    item("e", "autos", "2026-04-01"),
  ];

  it("puts the newest of the same group first, then the newest of the rest, three at most", () => {
    expect(relatedItems(all[0]!, all, key).map((entry) => entry.id)).toEqual(["b", "d", "c"]);
  });

  it("shows the only other item when there are two", () => {
    expect(relatedItems(all[0]!, all.slice(0, 2), key).map((entry) => entry.id)).toEqual(["b"]);
  });

  it("shows nothing when the item is the only one", () => {
    expect(relatedItems(all[0]!, [all[0]!], key)).toEqual([]);
  });
});
