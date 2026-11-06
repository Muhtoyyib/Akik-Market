import {describe, expect, it} from "vite-plus/test";
import {stackDepth, turnStack} from "@/lib/photo-stack";

describe("turnStack", () => {
  it("brings the next photo to the front", () => {
    expect(turnStack(0, 1, 3)).toBe(1);
  });

  it("wraps from the last photo back to the first", () => {
    expect(turnStack(2, 1, 3)).toBe(0);
  });

  it("wraps from the first photo back to the last", () => {
    expect(turnStack(0, -1, 3)).toBe(2);
  });
});

describe("stackDepth", () => {
  it("puts the front photo at depth 0 and the rest behind it in order", () => {
    expect([0, 1, 2].map((index) => stackDepth(index, 1, 3))).toEqual([2, 0, 1]);
  });
});
