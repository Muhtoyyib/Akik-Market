import {render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vite-plus/test";
import {commands, page, userEvent} from "vite-plus/test/browser";
import {MediaBox} from "@/components/media-box/media-box";
import {axeViolations} from "@/test/axe";
import loopSrc from "@/test/fixtures/loop.webm?url";
import posterSrc from "@/test/fixtures/poster.png?url";
import "@/styles/app.css";

const clip = {kind: "video", src: loopSrc, poster: posterSrc} as const;
const CARD_RGB = "rgb(255, 255, 255)";

function video() {
  const element = document.querySelector("video");
  if (!element) throw new Error("No video rendered");
  return element;
}

async function waitForPlayback(expectedPaused: boolean) {
  await expect.poll(() => video().paused, {timeout: 3000}).toBe(expectedPaused);
}

afterEach(async () => {
  await commands.emulateReducedMotion(false);
});

describe("MediaBox in a browser", () => {
  it("shows a card-coloured box of the right shape before the image arrives", async () => {
    await page.viewport(1440, 900);
    render(
      <div className="w-96">
        <MediaBox ratio="4:5" media={{kind: "image", src: "/never-loads.avif", alt: "Showroom", width: 800, height: 1000}} />
      </div>
    );
    const box = screen.getByRole("img").parentElement!;
    const {width, height} = box.getBoundingClientRect();
    expect([Math.round((height / width) * 100), getComputedStyle(box).backgroundColor]).toEqual([125, CARD_RGB]);
  });

  it("clips its media to rounded corners", () => {
    render(<MediaBox ratio="16:9" media={clip} />);
    const box = video().parentElement!;
    expect([getComputedStyle(box).overflow, getComputedStyle(box).borderRadius]).toEqual(["hidden", "24px"]);
  });

  it("uses the largest radius for a full-width banner", () => {
    render(<MediaBox ratio="16:9" media={clip} banner />);
    expect(getComputedStyle(video().parentElement!).borderRadius).toBe("32px");
  });

  it("plays its loop muted and inline", async () => {
    render(<MediaBox ratio="16:9" media={clip} />);
    await waitForPlayback(false);
    expect([video().muted, video().loop, video().playsInline]).toEqual([true, true, true]);
  });

  it("pauses when the visitor presses pause, and the control becomes play", async () => {
    render(<MediaBox ratio="16:9" media={clip} />);
    await waitForPlayback(false);
    await userEvent.click(screen.getByRole("button", {name: "Pause video"}));
    await waitForPlayback(true);
    expect(screen.getByRole("button", {name: "Play video"})).toBeInTheDocument();
  });

  it("plays again when the visitor presses play", async () => {
    render(<MediaBox ratio="16:9" media={clip} />);
    await waitForPlayback(false);
    await userEvent.click(screen.getByRole("button", {name: "Pause video"}));
    await userEvent.click(screen.getByRole("button", {name: "Play video"}));
    await waitForPlayback(false);
  });

  it("does not autoplay for a visitor who prefers reduced motion", async () => {
    await commands.emulateReducedMotion(true);
    render(<MediaBox ratio="16:9" media={clip} />);
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect([video().paused, screen.getByRole("button").getAttribute("aria-label")]).toEqual([true, "Play video"]);
  });

  it("places the pause control 24px from the bottom-left corner on desktop", async () => {
    await page.viewport(1440, 900);
    render(<MediaBox ratio="16:9" media={clip} />);
    const box = video().parentElement!.getBoundingClientRect();
    const control = screen.getByRole("button").getBoundingClientRect();
    expect([control.left - box.left, box.bottom - control.bottom, control.width]).toEqual([24, 24, 40]);
  });

  it("places the pause control 16px from the corner on a phone", async () => {
    await page.viewport(390, 844);
    render(<MediaBox ratio="16:9" media={clip} />);
    const box = video().parentElement!.getBoundingClientRect();
    const control = screen.getByRole("button").getBoundingClientRect();
    expect([control.left - box.left, box.bottom - control.bottom]).toEqual([16, 16]);
  });

  it("passes axe with a video, a scrim, overlay text and a caption", async () => {
    const {container} = render(
      <main className="bg-page">
        <MediaBox ratio="16:9" media={clip} scrim caption={{title: "Showroom", description: "Iwo Road, Ibadan"}}>
          <p className="absolute bottom-6 left-20 type-body text-on-dark">Built by Akik</p>
        </MediaBox>
      </main>
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
