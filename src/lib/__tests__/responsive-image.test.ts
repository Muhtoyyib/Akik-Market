import {describe, expect, it} from "vite-plus/test";
import {photo, variantPath, variantWidths} from "@/lib/responsive-image";

describe("variantWidths", () => {
  it("offers the standard widths below the original, then the original itself", () => {
    expect(variantWidths(1024)).toEqual([480, 960, 1024]);
  });

  it("never makes a copy wider than the original", () => {
    expect(variantWidths(1600)).toEqual([480, 960, 1600]);
  });

  it("keeps a small original as its only width", () => {
    expect(variantWidths(400)).toEqual([400]);
  });
});

describe("variantPath", () => {
  it("names a WebP copy after its original and width", () => {
    expect(variantPath("/placeholders/featured/car-audi.jpg", 480)).toBe("/placeholders/featured/car-audi-480.webp");
  });
});

describe("variantPath with unusual names", () => {
  it("replaces only the file's own extension, whatever its case", () => {
    expect(variantPath("/placeholders/v1.2/shop.JPG", 960)).toBe("/placeholders/v1.2/shop-960.webp");
  });
});

describe("photo", () => {
  const image = photo("/placeholders/visit-shop.jpg", {alt: "", width: 1024, height: 768}, "100vw");

  it("serves the full-size WebP as the fallback source", () => {
    expect(image.src).toBe("/placeholders/visit-shop-1024.webp");
  });

  it("lists every width so a phone can pick a smaller copy", () => {
    expect(image.srcSet).toBe(
      "/placeholders/visit-shop-480.webp 480w, /placeholders/visit-shop-960.webp 960w, /placeholders/visit-shop-1024.webp 1024w"
    );
  });

  it("keeps the alt text, the original's shape and the layout hint", () => {
    expect([image.alt, image.width, image.height, image.sizes]).toEqual(["", 1024, 768, "100vw"]);
  });
});
