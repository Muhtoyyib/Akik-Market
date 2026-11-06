import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {Visit} from "@/components/visit/visit";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {visit} = homeContent;
const renderVisit = () =>
  render(<Visit heading={visit.heading.value} address={visit.address.value} image={visit.image.value} contacts={visit.contacts} />);
const photo = (container: HTMLElement) => container.querySelector("img")!.parentElement!.getBoundingClientRect();
const columns = (container: HTMLElement) =>
  [...container.querySelectorAll("li[data-division]")].map((column) => column.getBoundingClientRect());

describe("Visit us in a browser", () => {
  it("is a 16:9 banner with the heading centred over it on desktop", async () => {
    await page.viewport(1440, 900);
    const {container} = renderVisit();
    const box = photo(container);
    const heading = screen.getByRole("heading", {level: 2}).getBoundingClientRect();
    const offCentre = Math.abs(heading.left + heading.width / 2 - (box.left + box.width / 2));
    expect([Math.round((box.width / box.height) * 100), offCentre < 1, heading.top > box.top]).toEqual([178, true, true]);
  });

  it("puts the three contact columns side by side on desktop and stacks them on a phone", async () => {
    await page.viewport(1440, 900);
    const {container} = renderVisit();
    const desktopTops = new Set(columns(container).map((column) => column.top)).size;
    await page.viewport(390, 844);
    const [first, second] = columns(container);
    expect([desktopTops, second!.top >= first!.bottom]).toEqual([1, true]);
  });

  it("is a 4:5 banner on a phone", async () => {
    await page.viewport(390, 844);
    const box = photo(renderVisit().container);
    expect(Math.round((box.height / box.width) * 100)).toBe(125);
  });

  it("has no axe violations on desktop or a phone", async () => {
    await page.viewport(1440, 900);
    const {container} = renderVisit();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([...desktop, ...(await axeViolations(container))]).toEqual([]);
  });
});
