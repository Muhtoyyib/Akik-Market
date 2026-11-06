// The viewBox is Geist's ink box for "AKIK" at size 200, measured in Chromium: x 3.84 to 460.88, cap height 142.
// Its height is three quarters of the cap height, so the box's bottom edge hides the lower quarter (wordmark spec).
const VIEW_BOX = "4 0 457 107";
const FONT_SIZE = 200;
const BASELINE = 142;
// Spec (footer wordmark, "Logo source"): Geist at weight 600. Set as SVG attributes so the size scales with the viewBox.
const WEIGHT = 600;

/** The giant AKIK cropped by the footer box. Decorative: the brand name is already in the header and legal line. */
export function Wordmark({text}: {text: string}) {
  return (
    <svg viewBox={VIEW_BOX} aria-hidden className="mt-12 -mb-6 block w-full md:mt-16 md:-mb-16">
      <text x={0} y={BASELINE} fontSize={FONT_SIZE} fontWeight={WEIGHT} className="fill-on-dark/10">
        {text}
      </text>
    </svg>
  );
}
