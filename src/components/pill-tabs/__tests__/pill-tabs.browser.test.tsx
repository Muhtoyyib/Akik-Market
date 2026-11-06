import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const INK_RGB = "rgb(14, 27, 46)";
const options = ["Phones & Gadgets", "Homes & Land", "Cars & Trucks", "Repairs & Trade-ins"].map((label, index) => ({
  value: `option-${index}`,
  label,
  panel: <p>{label} story</p>,
}));

const indicator = () => document.querySelector<HTMLElement>("[data-pill-indicator]")!;

// The fill slides over 250ms; wait until it covers the target pill.
async function waitForIndicatorAt(target: DOMRect) {
  await expect
    .poll(() => {
      const box = indicator().getBoundingClientRect();
      return [Math.round(box.left), Math.round(box.width)];
    })
    .toEqual([Math.round(target.left), Math.round(target.width)]);
}

describe("PillTabs in a browser", () => {
  it("fills only the selected pill", async () => {
    render(<PillTabs label="Stories" tabs={options} />);
    await userEvent.click(screen.getByRole("tab", {name: "Cars & Trucks"}));
    const selected = screen.getByRole("tab", {name: "Cars & Trucks"}).getBoundingClientRect();
    await waitForIndicatorAt(selected);
    expect(getComputedStyle(indicator()).backgroundColor).toBe(INK_RGB);
  });

  it("scrolls sideways inside its track on a 360px screen, never the page", async () => {
    await page.viewport(360, 800);
    render(
      <div className="px-4">
        <PillTabs label="Stories" tabs={options} />
      </div>
    );
    const track = screen.getByRole("tablist");
    expect([track.scrollWidth > track.clientWidth, document.documentElement.scrollWidth]).toEqual([true, 360]);
  });

  it("scrolls the selected pill into view on a narrow screen", async () => {
    await page.viewport(360, 800);
    render(
      <div className="px-4">
        <PillTabs label="Stories" tabs={options} />
      </div>
    );
    await userEvent.click(screen.getByRole("tab", {name: "Phones & Gadgets"}));
    await userEvent.keyboard("{End}");
    const track = screen.getByRole("tablist").getBoundingClientRect();
    const last = screen.getByRole("tab", {name: "Repairs & Trade-ins"}).getBoundingClientRect();
    expect(last.right).toBeLessThanOrEqual(track.right + 1);
  });

  it("does not move the page when switching", async () => {
    await page.viewport(1024, 600);
    render(
      <div>
        <div className="h-screen" />
        <PillTabs label="Stories" tabs={options} />
        <div className="h-screen" />
      </div>
    );
    window.scrollTo(0, 300);
    await userEvent.click(screen.getByRole("tab", {name: "Homes & Land"}));
    expect(window.scrollY).toBe(300);
  });

  it("passes axe on light and dark surfaces", async () => {
    const {container} = render(
      <main className="bg-page">
        <PillTabs label="Light stories" tabs={options} />
        <div className="bg-brand-navy text-on-dark">
          <PillTabs label="Dark stories" tabs={options} surface="dark" />
        </div>
      </main>
    );
    await waitForIndicatorAt(screen.getAllByRole("tab", {selected: true})[1]!.getBoundingClientRect());
    expect(await axeViolations(container)).toEqual([]);
  });
});
