import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {SectionHeader} from "@/components/section-header/section-header";

describe("SectionHeader", () => {
  it("opens a section with a second-level heading", () => {
    render(<SectionHeader heading="Three businesses, one name" />);
    expect(screen.getByRole("heading", {level: 2, name: "Three businesses, one name"})).toBeInTheDocument();
  });

  it("uses the page heading when it opens the page", () => {
    render(<SectionHeader heading="Our story" level={1} />);
    expect(screen.getByRole("heading", {level: 1, name: "Our story"})).toBeInTheDocument();
  });

  it("keeps the eyebrow out of the heading list", () => {
    render(<SectionHeader eyebrow="Divisions" heading="Three businesses, one name" />);
    expect(screen.getAllByRole("heading").map((heading) => heading.textContent)).toEqual(["Three businesses, one name"]);
  });

  it("puts eyebrow, heading, supporting line and action in that order", () => {
    const {container} = render(
      <SectionHeader
        eyebrow="Divisions"
        heading="Three businesses, one name"
        description="Phones, buildings and cars from one team in Ibadan."
        action={{href: "/about", label: "Read our story"}}
      />
    );
    expect([...container.firstElementChild!.children].map((child) => child.textContent)).toEqual([
      "Divisions",
      "Three businesses, one name",
      "Phones, buildings and cars from one team in Ibadan.",
      "Read our story",
    ]);
  });

  it("offers its action as a link", () => {
    render(<SectionHeader heading="Projects" action={{href: "/projects", label: "See all projects"}} />);
    expect(screen.getByRole("link", {name: "See all projects"})).toHaveAttribute("href", "/projects");
  });

  it("leaves out the parts it is not given", () => {
    const {container} = render(<SectionHeader heading="Projects" />);
    expect(container.firstElementChild!.children).toHaveLength(1);
  });
});
