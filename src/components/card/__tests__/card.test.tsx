import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Card} from "@/components/card/card";

const site = {src: "/media/site.avif", alt: "Duplex under construction", width: 800, height: 1000};

describe("Card", () => {
  it("is one link named by its heading when it leads somewhere", () => {
    render(<Card heading="Engineering & Real Estate" description="Houses, land and building." href="/engineering" />);
    expect(screen.getByRole("link")).toHaveAccessibleName("Engineering & Real Estate");
  });

  it("holds no other link or button", () => {
    render(
      <Card
        variant="division"
        division="engineering"
        image={site}
        eyebrow="02"
        heading="Engineering"
        description="Houses."
        href="/engineering"
      />
    );
    const card = screen.getByRole("link");
    expect([within(card).queryAllByRole("link"), within(card).queryAllByRole("button")]).toEqual([[], []]);
  });

  it("is plain grouped text when it leads nowhere", () => {
    render(<Card heading="Inspected before sale" description="Every car is checked by our mechanic." />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("uses a third-level heading", () => {
    render(<Card heading="Inspected before sale" description="Every car is checked by our mechanic." />);
    expect(screen.getByRole("heading", {level: 3, name: "Inspected before sale"})).toBeInTheDocument();
  });

  it("shows the division image in a division card", () => {
    render(<Card variant="division" division="engineering" image={site} heading="Engineering" description="Houses." href="/engineering" />);
    expect(screen.getByRole("img", {name: "Duplex under construction"})).toBeInTheDocument();
  });
});
