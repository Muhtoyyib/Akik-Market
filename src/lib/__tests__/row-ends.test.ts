import {describe, expect, it} from "vite-plus/test";
import {rowEnds} from "@/lib/row-ends";

describe("rowEnds", () => {
  it("is at the start and not the end before scrolling", () => {
    expect(rowEnds({scrollLeft: 0, scrollWidth: 2000, clientWidth: 1000})).toEqual({atStart: true, atEnd: false});
  });

  it("is at neither end in the middle of the row", () => {
    expect(rowEnds({scrollLeft: 500, scrollWidth: 2000, clientWidth: 1000})).toEqual({atStart: false, atEnd: false});
  });

  it("is at the end when the last card is fully in view", () => {
    expect(rowEnds({scrollLeft: 1000, scrollWidth: 2000, clientWidth: 1000})).toEqual({atStart: false, atEnd: true});
  });

  it("treats less than a pixel from the end as the end, since zoomed pages scroll in fractions", () => {
    expect(rowEnds({scrollLeft: 999.5, scrollWidth: 2000, clientWidth: 1000}).atEnd).toBe(true);
  });

  it("treats a pixel or more from the end as not the end", () => {
    expect(rowEnds({scrollLeft: 999, scrollWidth: 2000, clientWidth: 1000}).atEnd).toBe(false);
  });

  it("treats less than a pixel from the start as the start", () => {
    expect(rowEnds({scrollLeft: 0.5, scrollWidth: 2000, clientWidth: 1000}).atStart).toBe(true);
  });

  it("treats a pixel or more from the start as not the start", () => {
    expect(rowEnds({scrollLeft: 1, scrollWidth: 2000, clientWidth: 1000}).atStart).toBe(false);
  });

  it("is at both ends when the row fits without scrolling", () => {
    expect(rowEnds({scrollLeft: 0, scrollWidth: 1000, clientWidth: 1000})).toEqual({atStart: true, atEnd: true});
  });
});
