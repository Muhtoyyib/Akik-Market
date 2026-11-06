import {describe, expect, it} from "vite-plus/test";
import {render} from "@testing-library/react";
import "@/styles/app.css";

const AUTOS_RGB = "rgb(60, 90, 42)";
const NAVY_RGB = "rgb(11, 50, 102)";
const PAGE_RGB = "rgb(246, 244, 240)";
const INK_RGB = "rgb(14, 27, 46)";

describe("division accent", () => {
  it("gives descendants of a division container that division's accent", () => {
    const {getByText} = render(
      <section data-division="autos">
        <div>
          <span className="text-accent">Autos</span>
        </div>
      </section>
    );
    expect(getComputedStyle(getByText("Autos")).color).toBe(AUTOS_RGB);
  });

  it("falls back to brand navy outside a division", () => {
    const {getByText} = render(<span className="text-accent">Group</span>);
    expect(getComputedStyle(getByText("Group")).color).toBe(NAVY_RGB);
  });
});

describe("light scheme only", () => {
  it("runs with the system preferring dark", () => {
    expect(matchMedia("(prefers-color-scheme: dark)").matches).toBe(true);
  });

  it("declares the light scheme so form controls stay light", () => {
    expect(getComputedStyle(document.documentElement).colorScheme).toBe("light only");
  });

  it("keeps the page background and ink text in the base layer", () => {
    const body = getComputedStyle(document.body);
    expect([body.backgroundColor, body.color]).toEqual([PAGE_RGB, INK_RGB]);
  });
});

describe("fonts", () => {
  it("loads Geist from the app's own origin", async () => {
    render(<p className="font-sans">Geist</p>);
    await document.fonts.load("16px 'Geist Variable'");
    const geist = [...document.fonts].find((face) => face.family.replaceAll('"', "") === "Geist Variable" && face.status === "loaded");
    expect(geist).toBeDefined();
  });

  it("requests no font from another origin", async () => {
    await document.fonts.ready;
    const fontRequests = performance.getEntriesByType("resource").filter((entry) => /\.(woff2?|ttf|otf)(\?|$)/.test(entry.name));
    expect(fontRequests.every((entry) => new URL(entry.name).origin === location.origin)).toBe(true);
  });
});
