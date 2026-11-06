import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {describe, expect, it} from "vite-plus/test";
import {contrastRatio} from "@/lib/contrast";

const css = readFileSync(resolve(import.meta.dirname, "../app.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match?.[1]) throw new Error(`Token --${name} is not defined in app.css`);
  return match[1].trim().toUpperCase();
}

// Values from openspec/changes/design-system/specs/design-system/color/spec.md
const colorSpec: Record<string, string> = {
  page: "#F6F4F0",
  card: "#FFFFFF",
  ink: "#0E1B2E",
  "ink-muted": "#55606F",
  line: "#DCD8CF",
  "brand-navy": "#0B3266",
  "brand-red": "#B3122A",
  "on-dark": "#FFFFFF",
  phones: "#0A7489",
  engineering: "#A4532D",
  autos: "#3C5A2A",
};

describe("colour tokens", () => {
  it.each(Object.entries(colorSpec))("defines --color-%s as %s", (name, value) => {
    expect(token(`color-${name}`)).toBe(value);
  });
});

describe("radius tokens", () => {
  it.each([
    ["sm", "12PX"],
    ["md", "24PX"],
    ["lg", "32PX"],
  ])("defines --radius-%s as %s", (name, value) => {
    expect(token(`radius-${name}`)).toBe(value);
  });
});

describe("token contrast", () => {
  const ratio = (fg: string, bg: string) => contrastRatio(token(`color-${fg}`), token(`color-${bg}`));

  it("keeps ink-muted readable on the page and on cards", () => {
    expect(ratio("ink-muted", "page")).toBeGreaterThanOrEqual(5.8);
    expect(ratio("ink-muted", "card")).toBeGreaterThanOrEqual(6.3);
  });

  it.each(["phones", "engineering", "autos"])("keeps the %s accent readable as text on the page", (accent) => {
    expect(ratio(accent, "page")).toBeGreaterThanOrEqual(4.9);
  });

  it.each(["phones", "engineering", "autos"])("keeps on-dark text readable on the %s accent", (accent) => {
    expect(ratio("on-dark", accent)).toBeGreaterThanOrEqual(5.4);
  });

  it("keeps brand red readable on the page", () => {
    expect(ratio("brand-red", "page")).toBeGreaterThanOrEqual(6.2);
  });

  it("keeps on-dark text readable on navy and ink", () => {
    expect(ratio("on-dark", "brand-navy")).toBeGreaterThanOrEqual(4.5);
    expect(ratio("on-dark", "ink")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps on-dark text readable where the media scrim is at 60% ink, even over a white frame", () => {
    // The scrim's lightest readable stop is ink at 60% over the frame; white is the worst-case frame.
    const blend = (channel: number) => Math.round(0.6 * channel + 0.4 * 255);
    const ink = token("color-ink");
    const scrim =
      "#" +
      [1, 3, 5]
        .map((offset) =>
          blend(parseInt(ink.slice(offset, offset + 2), 16))
            .toString(16)
            .padStart(2, "0")
        )
        .join("");
    expect(contrastRatio(token("color-on-dark"), scrim)).toBeGreaterThanOrEqual(4.5);
  });
});
