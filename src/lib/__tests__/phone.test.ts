import {describe, expect, it} from "vite-plus/test";
import {localPhone, telHref} from "@/lib/phone";

describe("localPhone", () => {
  it("writes a Nigerian number in the local format, grouped for reading", () => {
    expect(localPhone("2347065470198")).toBe("0706 547 0198");
  });

  it("accepts a number written with a plus and spaces", () => {
    expect(localPhone("+234 816 189 4229")).toBe("0816 189 4229");
  });
});

describe("telHref", () => {
  it("links to the number in the international format", () => {
    expect(telHref("2347065470198")).toBe("tel:+2347065470198");
  });

  it("drops spaces and the plus sign before adding its own", () => {
    expect(telHref("+234 816 189 4229")).toBe("tel:+2348161894229");
  });
});
