import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {Footer} from "@/components/footer/footer";
import {homeContent} from "@/lib/home-content";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {footer} = homeContent;
const renderFooter = () =>
  render(
    <Footer
      counters={footer.counters.map((counter) => counter.value)}
      columns={footer.columns}
      legal={footer.legal.value}
      wordmark={footer.wordmark.value}
    />
  );
const box = () => screen.getByRole("contentinfo").firstElementChild!.firstElementChild!.getBoundingClientRect();
const wordmark = () => screen.getByText("AKIK").closest("svg")!.getBoundingClientRect();

describe("Footer in a browser", () => {
  it("is a rounded box inside the page gutters, not a full-bleed band", async () => {
    await page.viewport(1440, 900);
    renderFooter();
    expect([box().left, box().right]).toEqual([64, 1376]);
  });

  it("leaves a 16px gap below the box", async () => {
    await page.viewport(390, 844);
    renderFooter();
    expect(screen.getByRole("contentinfo").getBoundingClientRect().bottom - box().bottom).toBe(16);
  });

  it.each([1440, 390])("spans the wordmark across the box's inner width at %ipx, cut off by its bottom edge", async (width) => {
    await page.viewport(width, 900);
    renderFooter();
    const padding = width >= 768 ? 64 : 24;
    expect([Math.round(wordmark().width), Math.round(wordmark().bottom)]).toEqual([
      Math.round(box().width - 2 * padding),
      Math.round(box().bottom),
    ]);
  });

  it.each([1440, 390])("keeps every link and line of text above the wordmark at %ipx", async (width) => {
    await page.viewport(width, 900);
    const {container} = renderFooter();
    const texts = [...container.querySelectorAll("a, p, h2, li")].map((element) => element.getBoundingClientRect().bottom);
    expect(Math.max(...texts)).toBeLessThanOrEqual(wordmark().top);
  });

  it.each([1440, 390])("has no axe violations at %ipx", async (width) => {
    await page.viewport(width, 900);
    const {container} = renderFooter();
    expect(await axeViolations(container)).toEqual([]);
  });
});
