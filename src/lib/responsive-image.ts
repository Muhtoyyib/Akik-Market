// Spec (imagery-and-media, "Weight"): photos in a modern format, sized for the screen, with smaller copies for phones.
// scripts/optimise-images.ts writes the WebP copies these names point to, using the same widths.

// A phone (480), a card or half-width banner on desktop (960) and a full-width banner (1600).
const STANDARD_WIDTHS = [480, 960, 1600];

/** Layout hints for `sizes`: how wide each kind of box is drawn, from the page frame (max 1312px inside the gutters). */
export const SIZES = {
  fullWidth: "(min-width: 1440px) 1312px, 100vw",
  halfWidth: "(min-width: 1024px) 640px, 100vw",
  cardRow: "(min-width: 1024px) 420px, 80vw",
  stackedPhoto: "(min-width: 768px) 272px, 192px",
} as const;

type Image = {alt: string; width: number; height: number};

/** The widths to serve: each standard width narrower than the original, then the original itself. */
export function variantWidths(width: number): number[] {
  return [...STANDARD_WIDTHS.filter((standard) => standard < width), width];
}

/** Where the WebP copy of an original at one width lives: `/a/b.jpg` at 480 becomes `/a/b-480.webp`. */
export function variantPath(src: string, width: number): string {
  return `${src.replace(/\.[a-z]+$/i, "")}-${width}.webp`;
}

/** A photo for the media box: WebP copies in a srcset, the full-size copy as the fallback, plus the layout hint. */
export function photo(src: string, image: Image, sizes: string) {
  const widths = variantWidths(image.width);
  return {
    ...image,
    src: variantPath(src, image.width),
    srcSet: widths.map((width) => `${variantPath(src, width)} ${width}w`).join(", "),
    sizes,
  };
}
