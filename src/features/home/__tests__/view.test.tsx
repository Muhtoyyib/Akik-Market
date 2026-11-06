import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {HomeView} from "@/features/home/view";

describe("HomeView", () => {
  it("names the brand as the page heading", () => {
    render(<HomeView />);
    expect(screen.getByRole("heading", {level: 1, name: "Akik"})).toBeInTheDocument();
  });

  it("lists every division", () => {
    render(<HomeView />);
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Phones & Gadgets",
      "Engineering & Real Estate",
      "Autos",
    ]);
  });
});
