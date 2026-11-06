import {render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {Button} from "@/components/button/button";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const MIN_TARGET = 44;

function hitArea(element: HTMLElement) {
  const before = getComputedStyle(element, "::before");
  const box = element.getBoundingClientRect();
  return {height: Math.max(box.height, parseFloat(before.height) || 0), width: box.width};
}

describe("Button in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  it("shows a 2px brand-navy focus ring offset 2px when tabbed to", async () => {
    render(<Button href="/about">Our story</Button>);
    await userEvent.tab();
    const style = getComputedStyle(screen.getByRole("link"));
    expect([style.outlineStyle, style.outlineWidth, style.outlineOffset, style.outlineColor]).toEqual([
      "solid",
      "2px",
      "2px",
      "rgb(11, 50, 102)",
    ]);
  });

  it("uses a white focus ring on the on-dark variant", async () => {
    render(
      <Button href="/about" variant="on-dark">
        Our story
      </Button>
    );
    await userEvent.tab();
    expect(getComputedStyle(screen.getByRole("link")).outlineColor).toBe("rgb(255, 255, 255)");
  });

  it("draws pills 48px tall on desktop", () => {
    render(<Button href="/about">Our story</Button>);
    expect(screen.getByRole("link").getBoundingClientRect().height).toBe(48);
  });

  it.each(["primary", "secondary", "on-dark", "link"] as const)("gives the %s variant a 44px touch target on a phone", async (variant) => {
    await page.viewport(390, 844);
    render(
      <Button href="/about" variant={variant}>
        Our story
      </Button>
    );
    const area = hitArea(screen.getByRole("link"));
    expect(Math.min(area.height, area.width)).toBeGreaterThanOrEqual(MIN_TARGET);
  });

  it("draws pills 40px tall on a phone", async () => {
    await page.viewport(390, 844);
    render(<Button href="/about">Our story</Button>);
    expect(screen.getByRole("link").getBoundingClientRect().height).toBe(40);
  });

  it("keeps its size on hover", async () => {
    render(<Button href="/about">Our story</Button>);
    const link = screen.getByRole("link");
    const before = link.getBoundingClientRect();
    await userEvent.hover(link);
    const after = link.getBoundingClientRect();
    expect([after.width, after.height, after.x, after.y]).toEqual([before.width, before.height, before.x, before.y]);
  });

  it("passes axe in every variant", async () => {
    const {container} = render(
      <div className="bg-page">
        <Button href="/about">Primary</Button>
        <Button onClick={() => {}} variant="secondary">
          Secondary
        </Button>
        <Button href="/projects" variant="link">
          See all projects
        </Button>
        <Button onClick={() => {}} disabled>
          Disabled
        </Button>
        <div className="bg-brand-navy">
          <Button href="https://wa.me/2347065470198" variant="on-dark">
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
