type Track = {scrollLeft: number; scrollWidth: number; clientWidth: number};

// Zoomed pages and high-density screens scroll in fractions of a pixel, so a row can stop just short of its end.
const SUBPIXEL = 1;

/** Whether a swipe row is scrolled to either end, which decides if its previous and next arrows are usable. */
export function rowEnds({scrollLeft, scrollWidth, clientWidth}: Track): {atStart: boolean; atEnd: boolean} {
  return {atStart: scrollLeft < SUBPIXEL, atEnd: scrollWidth - clientWidth - scrollLeft < SUBPIXEL};
}
