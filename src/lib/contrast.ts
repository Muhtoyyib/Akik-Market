// WCAG 2.x relative luminance and contrast ratio: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
const HEX_COLOUR = /^#[0-9a-f]{6}$/i;
// Start of each channel in "#RRGGBB" and its luminance weight: red, green, blue.
const CHANNELS = [
  {offset: 1, weight: 0.2126},
  {offset: 3, weight: 0.7152},
  {offset: 5, weight: 0.0722},
] as const;
const LINEAR_THRESHOLD = 0.04045;
const LUMINANCE_FLARE = 0.05;

function channelToLinear(value: number): number {
  const srgb = value / 255;
  // The two pieces of the WCAG curve meet at the threshold, so `<` and `<=` give the same result: an equivalent mutant.
  // Stryker disable next-line EqualityOperator
  return srgb <= LINEAR_THRESHOLD ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  if (!HEX_COLOUR.test(hex)) throw new Error(`Expected a #RRGGBB colour, got ${hex}`);
  return CHANNELS.reduce((sum, {offset, weight}) => sum + weight * channelToLinear(parseInt(hex.slice(offset, offset + 2), 16)), 0);
}

export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + LUMINANCE_FLARE) / (Math.min(first, second) + LUMINANCE_FLARE);
}
