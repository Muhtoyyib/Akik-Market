import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {SectionHeader} from "@/components/section-header/section-header";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const INK_MUTED_RGB = "rgb(85, 96, 111)";
const AUTOS_RGB = "rgb(60, 90, 42)";

function gapBetween(upper: Element, lower: Element): number {
  return Math.round(lower.getBoundingClientRect().top - upper.getBoundingClientRect().bottom);
}

function FullHeader({align}: {align?: "center" | "start"}) {
  return (
    <SectionHeader
      align={align}
      eyebrow="Divisions"
      heading="Three businesses, one name"
      description="Phones, buildings and cars from one team in Ibadan."
      action={{href: "/about", label: "Read our story"}}
    />
  );
}

describe("SectionHeader in a browser", () => {
  it("spaces its parts 12, 16 and 24px apart", () => {
    const {container} = render(<FullHeader />);
    const [eyebrow, heading, line, action] = [...container.firstElementChild!.children];
    expect([gapBetween(eyebrow!, heading!), gapBetween(heading!, line!), gapBetween(line!, action!)]).toEqual([12, 16, 24]);
  });

  it("is centred by default", () => {
    render(<FullHeader />);
    expect(getComputedStyle(screen.getByRole("heading")).textAlign).toBe("center");
  });

  it("can start at the left edge", () => {
    render(<FullHeader align="start" />);
    expect(getComputedStyle(screen.getByRole("heading")).textAlign).toBe("start");
  });

  it("colours the eyebrow ink-muted outside a division", () => {
    render(<FullHeader />);
    expect(getComputedStyle(screen.getByText("Divisions")).color).toBe(INK_MUTED_RGB);
  });

  it("colours the eyebrow with the division accent inside a division section", () => {
    render(
      <section data-division="autos">
        <FullHeader />
      </section>
    );
    expect(getComputedStyle(screen.getByText("Divisions")).color).toBe(AUTOS_RGB);
  });

  it("passes axe", async () => {
    const {container} = render(
      <main className="bg-page">
        <FullHeader />
      </main>
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
