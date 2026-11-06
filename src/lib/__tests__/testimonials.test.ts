import {describe, expect, it} from "vite-plus/test";
import {missingPermission, storyTabLabel, wallLayout} from "@/lib/testimonials";

const customerSpots = (rows: ReturnType<typeof wallLayout>) =>
  rows.flat().flatMap((tile, cell) => (tile.kind === "customer" ? [cell] : []));

describe("wallLayout", () => {
  it("sets 34 tiles in staggered rows of 6, 7, 8, 7 and 6", () => {
    expect(wallLayout(9).map((row) => row.length)).toEqual([6, 7, 8, 7, 6]);
  });

  it("gives nine customers one tile each and the other 25 to filler photos", () => {
    const tiles = wallLayout(9).flat();
    expect([tiles.filter((tile) => tile.kind === "customer").length, tiles.filter((tile) => tile.kind === "filler").length]).toEqual([
      9, 25,
    ]);
  });

  it("spreads customers evenly through the wall, in order", () => {
    expect(customerSpots(wallLayout(4))).toEqual([4, 12, 21, 29]);
  });

  it("numbers customers and fillers in wall order", () => {
    const tiles = wallLayout(2).flat();
    expect([tiles.filter((tile) => tile.kind === "customer").map((tile) => tile.index), tiles.at(-1)]).toEqual([
      [0, 1],
      {kind: "filler", index: 31},
    ]);
  });

  it("keeps the full wall of fillers when there are no customers", () => {
    expect(wallLayout(0).map((row) => row.length)).toEqual([6, 7, 8, 7, 6]);
  });

  it("repeats the rows when there are more customers than tiles", () => {
    const rows = wallLayout(40);
    expect([rows.length, rows.flat().filter((tile) => tile.kind === "customer").length]).toEqual([10, 40]);
  });

  it("gives every tile to a customer when they fill the wall exactly", () => {
    expect(
      wallLayout(34)
        .flat()
        .every((tile) => tile.kind === "customer")
    ).toBe(true);
  });
});

describe("missingPermission", () => {
  const item = (name: string, placeholder: boolean, permission?: {date: string; recordedBy: string}) => ({
    name,
    quote: {placeholder},
    permission,
  });

  it("names a real quote with no permission record", () => {
    expect(missingPermission([item("Tunde", false)])).toEqual(["Tunde"]);
  });

  it("accepts a real quote with a permission record, and any placeholder", () => {
    expect(missingPermission([item("Tunde", false, {date: "2026-11-06", recordedBy: "Owner"}), item("KEMI", true)])).toEqual([]);
  });
});

describe("storyTabLabel", () => {
  it("uses the business's short name when it has one story", () => {
    expect(storyTabLabel("Cars", "IFEOMA", 1)).toBe("Cars");
  });

  it("adds the first name when the business has more than one story", () => {
    expect(storyTabLabel("Cars", "Ifeoma", 2)).toBe("Cars · Ifeoma");
  });
});
