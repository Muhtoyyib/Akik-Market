import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {Proof} from "@/features/home/proof/proof";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {proof} = homeContent;
const renderProof = () => render(<Proof heading={proof.heading.value} lead={proof.lead.value} columns={proof.columns} />);
const columnBoxes = (container: HTMLElement) =>
  [...container.querySelectorAll("li[data-division]")].map((column) => column.getBoundingClientRect());

describe("Proof in a browser", () => {
  it("shows three equal columns side by side on desktop", async () => {
    await page.viewport(1440, 900);
    const {container} = renderProof();
    const [first, second, third] = columnBoxes(container);
    expect([first!.top === third!.top, Math.round(first!.width) === Math.round(second!.width)]).toEqual([true, true]);
  });

  it("stacks the columns 32px apart on a phone", async () => {
    await page.viewport(390, 844);
    const {container} = renderProof();
    const [first, second] = columnBoxes(container);
    expect(second!.top - first!.bottom).toBe(32);
  });

  it("has no axe violations", async () => {
    await page.viewport(1440, 900);
    const {container} = renderProof();
    expect(await axeViolations(container)).toEqual([]);
  });
});
