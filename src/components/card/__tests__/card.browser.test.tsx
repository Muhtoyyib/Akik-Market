import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {Card} from "@/components/card/card";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const ENGINEERING_RGB = "rgb(164, 83, 45)";
const site = {src: "/never-loads.avif", alt: "Duplex under construction", width: 800, height: 1000};

describe("Card in a browser", () => {
  it("stretches cards in a row to the tallest one", async () => {
    await page.viewport(1440, 900);
    render(
      <div className="grid grid-cols-3 gap-6">
        <Card heading="Short" description="One line." href="/a" />
        <Card heading="Long" description={"A much longer description that wraps over several lines. ".repeat(6)} href="/b" />
        <Card heading="Medium" description="Two lines of text in this card, give or take." href="/c" />
      </div>
    );
    const heights = [...document.querySelectorAll("[data-card]")].map((card) => card.getBoundingClientRect().height);
    expect(new Set(heights).size).toBe(1);
  });

  it("aligns the arrows of a row at the bottom", async () => {
    await page.viewport(1440, 900);
    const {container} = render(
      <div className="grid grid-cols-2 gap-6">
        <Card heading="Short" description="One line." href="/a" />
        <Card heading="Long" description={"Longer text that wraps. ".repeat(12)} href="/b" />
      </div>
    );
    const arrows = [...container.querySelectorAll("[data-card-arrow]")].map((arrow) => arrow.getBoundingClientRect().bottom);
    expect(new Set(arrows).size).toBe(1);
  });

  it("does not move, grow or gain a shadow on hover", async () => {
    render(<Card heading="Autos" description="Cars." href="/autos" />);
    const card = document.querySelector("[data-card]")!;
    const before = card.getBoundingClientRect();
    await userEvent.hover(screen.getByRole("link"));
    const after = card.getBoundingClientRect();
    expect([after.x, after.y, after.width, after.height, getComputedStyle(card).boxShadow]).toEqual([
      before.x,
      before.y,
      before.width,
      before.height,
      "none",
    ]);
  });

  it("colours a division card's eyebrow with its division accent", () => {
    render(
      <Card
        variant="division"
        division="engineering"
        image={site}
        eyebrow="Engineering"
        heading="Build with us"
        description="Houses."
        href="/engineering"
      />
    );
    expect(getComputedStyle(screen.getByText("Engineering")).color).toBe(ENGINEERING_RGB);
  });

  it("pads content cards 32px on desktop and 24px on a phone", async () => {
    await page.viewport(1440, 900);
    render(<Card heading="Inspected" description="Checked by our mechanic." />);
    const desktop = getComputedStyle(screen.getByRole("heading").parentElement!).paddingTop;
    await page.viewport(390, 844);
    const phone = getComputedStyle(screen.getByRole("heading").parentElement!).paddingTop;
    expect([desktop, phone]).toEqual(["32px", "24px"]);
  });

  it("sends a click anywhere on the card to its page", async () => {
    render(<Card heading="Autos" description="Cars." href="#autos" />);
    const card = document.querySelector("[data-card]")!.getBoundingClientRect();
    const hit = document.elementFromPoint(card.left + 4, card.bottom - 4);
    expect(hit).toBe(screen.getByRole("link"));
  });

  it("draws the focus ring round the whole card", async () => {
    render(<Card heading="Autos" description="Cars." href="#autos" />);
    await userEvent.tab();
    expect(getComputedStyle(document.querySelector("[data-card]")!).outlineWidth).toBe("2px");
  });

  it("passes axe in every variant", async () => {
    const {container} = render(
      <main className="grid gap-6 bg-page">
        <Card heading="Inspected" description="Checked by our mechanic." />
        <Card variant="inset-link" eyebrow="Projects" heading="See finished homes" href="/projects" />
        <Card
          variant="division"
          division="autos"
          image={site}
          eyebrow="Autos"
          heading="Drive away today"
          description="Cars."
          href="/autos"
        />
      </main>
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
