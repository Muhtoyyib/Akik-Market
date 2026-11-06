import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {Trust} from "@/features/home/trust/trust";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";
import {siteContent} from "@/lib/content/site";

const {trust} = homeContent;
const {whatsapp} = siteContent;
const renderTrust = () =>
  render(<Trust heading={trust.heading.value} image={trust.image.value} rows={trust.rows} whatsappHref={whatsapp.main.href} />);
const photo = (container: HTMLElement) => container.querySelector("img")!.parentElement!.getBoundingClientRect();

describe("Buy with confidence in a browser", () => {
  it("puts a 4:5 photo on the left half and the promises on the right on desktop", async () => {
    await page.viewport(1440, 900);
    const {container} = renderTrust();
    const image = photo(container);
    const heading = screen.getByRole("heading", {level: 2}).getBoundingClientRect();
    expect([Math.round((image.height / image.width) * 100), heading.left > image.right, image.right < 1440 / 2]).toEqual([125, true, true]);
  });

  it("puts the photo first and the promises below on a phone", async () => {
    await page.viewport(390, 844);
    const {container} = renderTrust();
    expect(screen.getByRole("heading", {level: 2}).getBoundingClientRect().top).toBeGreaterThan(photo(container).bottom);
  });

  it("draws the row icons at 24px", async () => {
    await page.viewport(1440, 900);
    const {container} = renderTrust();
    const sizes = [...container.querySelectorAll("li svg")].map((icon) => icon.getBoundingClientRect().width);
    expect(new Set(sizes)).toEqual(new Set([24]));
  });

  it("has no axe violations", async () => {
    await page.viewport(1440, 900);
    expect(await axeViolations(renderTrust().container)).toEqual([]);
  });
});
