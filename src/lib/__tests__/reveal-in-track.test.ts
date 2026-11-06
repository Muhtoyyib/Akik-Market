import {describe, expect, it} from "vite-plus/test";
import {scrollLeftToReveal} from "@/lib/reveal-in-track";

const track = {scrollLeft: 100, clientWidth: 300};

describe("scrollLeftToReveal", () => {
  it("leaves the track alone when the item is already in view", () => {
    expect(scrollLeftToReveal(track, {offsetLeft: 150, offsetWidth: 80})).toBe(100);
  });

  it("scrolls back so an item cut off on the left starts at the left edge", () => {
    expect(scrollLeftToReveal(track, {offsetLeft: 40, offsetWidth: 80})).toBe(40);
  });

  it("scrolls on so an item cut off on the right ends at the right edge", () => {
    expect(scrollLeftToReveal(track, {offsetLeft: 380, offsetWidth: 80})).toBe(160);
  });

  it("treats an item touching either edge as in view", () => {
    expect([
      scrollLeftToReveal(track, {offsetLeft: 100, offsetWidth: 80}),
      scrollLeftToReveal(track, {offsetLeft: 320, offsetWidth: 80}),
    ]).toEqual([100, 100]);
  });
});
