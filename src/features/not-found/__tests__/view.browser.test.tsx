import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {NotFoundView} from "@/features/not-found/view";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

describe("the 404 page in a browser", () => {
  it("has no axe violations on desktop or a phone", async () => {
    await page.viewport(1440, 900);
    const {container} = render(<NotFoundView />);
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([desktop, await axeViolations(container)]).toEqual([[], []]);
  });

  it("does not scroll sideways on a 360px phone", async () => {
    await page.viewport(360, 800);
    render(<NotFoundView />);
    expect(document.documentElement.scrollWidth).toBe(360);
  });
});
