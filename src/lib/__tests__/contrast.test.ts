import {describe, expect, it} from "vite-plus/test";
import {contrastRatio} from "@/lib/contrast";

describe("contrastRatio", () => {
  it("gives 21:1 for black on white", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
  });

  it("gives 1:1 for a colour on itself", () => {
    expect(contrastRatio("#0B3266", "#0B3266")).toBeCloseTo(1, 5);
  });

  it("gives the same ratio whichever colour is the foreground", () => {
    expect(contrastRatio("#FFFFFF", "#0A7489")).toBeCloseTo(contrastRatio("#0A7489", "#FFFFFF"), 10);
  });

  it("matches the WCAG reference value for #777777 on white", () => {
    expect(contrastRatio("#777777", "#FFFFFF")).toBeCloseTo(4.48, 2);
  });

  it("uses the linear segment for very dark channels", () => {
    expect(contrastRatio("#010101", "#000000")).toBeCloseTo(1.006, 3);
  });

  it("weights green most, then red, then blue", () => {
    const ratios = ["#FF0000", "#00FF00", "#0000FF"].map((colour) => contrastRatio(colour, "#000000"));
    expect(ratios.map((ratio) => ratio.toFixed(2))).toEqual(["5.25", "15.30", "2.44"]);
  });

  it("accepts lowercase hex", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
  });

  it("rejects a value that is not six-digit hex", () => {
    expect(() => contrastRatio("#FFF", "#000000")).toThrow("Expected a #RRGGBB colour, got #FFF");
  });

  it("rejects text before the hash", () => {
    expect(() => contrastRatio("x#FFFFFF", "#000000")).toThrow("Expected a #RRGGBB colour, got x#FFFFFF");
  });

  it("rejects text after the six digits", () => {
    expect(() => contrastRatio("#FFFFFF0", "#000000")).toThrow("Expected a #RRGGBB colour, got #FFFFFF0");
  });
});
