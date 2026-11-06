import {render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {LegalView} from "@/features/legal/view";
import {privacy, terms} from "@/lib/content/legal";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const start = location.pathname;

describe("the legal pages in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  afterEach(() => {
    history.replaceState(null, "", start);
  });

  it("lands a contents jump with its heading below the floating header", async () => {
    render(<LegalView path="/privacy" document={privacy} />);
    const last = privacy.value.sections.at(-1)!;
    await userEvent.click(screen.getByRole("link", {name: last.heading}));
    const pill = document.querySelector("[data-floating-pill]")!.getBoundingClientRect();
    const heading = document.getElementById(last.id)!.getBoundingClientRect();
    expect([heading.top >= pill.bottom, heading.bottom <= innerHeight]).toEqual([true, true]);
  });

  it("keeps body lines within the readable length at 1440px", () => {
    render(<LegalView path="/privacy" document={privacy} />);
    const body = document.querySelector<HTMLElement>("[data-post-body]")!;
    const ch = Number.parseFloat(getComputedStyle(body).fontSize) * 0.5;
    // max-w-prose is 65ch; at most about 75 characters of body text per line.
    expect(body.getBoundingClientRect().width / ch).toBeLessThanOrEqual(150);
  });

  for (const [name, document, path] of [
    ["privacy", privacy, "/privacy"],
    ["terms", terms, "/terms"],
  ] as const) {
    for (const width of [1440, 390]) {
      it(`has no axe violations on ${name} at ${width}px`, async () => {
        await page.viewport(width, 900);
        render(<LegalView path={path} document={document} />);
        expect(await axeViolations(window.document.body)).toEqual([]);
      });
    }
  }
});
