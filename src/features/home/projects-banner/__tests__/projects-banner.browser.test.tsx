import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {ProjectsBanner} from "@/features/home/projects-banner/projects-banner";
import {homeContent} from "@/lib/content/home";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const {projects} = homeContent;
const renderBanner = () =>
  render(
    <ProjectsBanner
      eyebrow={projects.eyebrow.value}
      heading={projects.heading.value}
      href={projects.link.href}
      image={projects.image.value}
    />
  );
const boxes = (container: HTMLElement) => ({
  photo: container.querySelector("img")!.parentElement!.getBoundingClientRect(),
  card: container.querySelector("[data-card]")!.getBoundingClientRect(),
});

describe("Projects banner in a browser", () => {
  it("sits the card over the right of a 16:9 photo, vertically centred, 32px from the edge", async () => {
    await page.viewport(1440, 900);
    const {photo, card} = boxes(renderBanner().container);
    const centreGap = Math.abs(card.top + card.height / 2 - (photo.top + photo.height / 2));
    expect([Math.round((photo.width / photo.height) * 100), photo.right - card.right, centreGap < 1]).toEqual([178, 32, true]);
  });

  it("spans the card across the bottom of a 4:5 photo with 16px insets on a phone", async () => {
    await page.viewport(390, 844);
    const {photo, card} = boxes(renderBanner().container);
    expect([
      Math.round((photo.height / photo.width) * 100),
      card.left - photo.left,
      photo.right - card.right,
      photo.bottom - card.bottom,
    ]).toEqual([125, 16, 16, 16]);
  });

  it("has no axe violations", async () => {
    await page.viewport(1440, 900);
    expect(await axeViolations(renderBanner().container)).toEqual([]);
  });
});
