import {render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {ContactView} from "@/features/contact/view";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const sendOnWhatsapp = () => userEvent.click(screen.getByRole("button", {name: "Send on WhatsApp"}));
const radios = () => screen.getAllByRole("radio");
const pills = () => radios().map((radio) => radio.nextElementSibling as HTMLElement);

describe("the Contact page in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("moves the business choice with the arrow keys", async () => {
    render(<ContactView />);
    await userEvent.click(pills()[0]!);
    await userEvent.keyboard("{ArrowRight}");
    expect(radios().map((radio) => (radio as HTMLInputElement).checked)).toEqual([false, true, false]);
  });

  it("gives every business pill and field a 44px touch target on a phone", async () => {
    await page.viewport(390, 844);
    render(<ContactView />);
    const controls = [...pills(), ...screen.getAllByRole("textbox")];
    expect(controls.filter((control) => control.getBoundingClientRect().height < 44)).toEqual([]);
  });

  it("has no sideways scroll on a 360px phone", async () => {
    await page.viewport(360, 800);
    render(<ContactView />);
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(360);
  });

  it("makes no network request when a valid enquiry is sent", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactView />);
    await userEvent.click(pills()[2]!);
    await userEvent.type(screen.getByRole("textbox", {name: "Your name (required)"}), "Ada");
    await userEvent.type(screen.getByRole("textbox", {name: /^Your message/}), "Is the Audi still available?");
    const before = performance.getEntriesByType("resource").length;
    await sendOnWhatsapp();
    expect([open.mock.calls.length, performance.getEntriesByType("resource").length - before]).toEqual([1, 0]);
  });

  it("has no axe violations at 1440px with errors showing", async () => {
    render(<ContactView />);
    await sendOnWhatsapp();
    // axe reads colours as drawn, so a field still changing colour reads as low contrast.
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no axe violations at 390px with errors showing", async () => {
    await page.viewport(390, 844);
    render(<ContactView />);
    await sendOnWhatsapp();
    // axe reads colours as drawn, so a field still changing colour reads as low contrast.
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
