import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {DesignSystemView} from "@/features/design-system/view";

describe("DesignSystemView", () => {
  it("has one page heading", () => {
    render(<DesignSystemView />);
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual(["Design system"]);
  });

  it("shows every token group and component", () => {
    render(<DesignSystemView />);
    expect(screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent)).toEqual(
      expect.arrayContaining(["Colour", "Type", "Shape", "Buttons", "Section header", "Pill tabs", "Media box", "Cards"])
    );
  });
});
