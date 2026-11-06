import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {LinkBanner} from "@/components/link-banner/link-banner";
import {homeContent} from "@/lib/content/home";

const {projects} = homeContent;
const renderBanner = () =>
  render(
    <LinkBanner
      name="Our projects"
      headingId="projects-heading"
      division="engineering"
      eyebrow={projects.eyebrow.value}
      heading={projects.heading.value}
      href={projects.link.href}
      image={projects.image.value}
    />
  );

describe("Projects banner", () => {
  it("is a section named for screen readers", () => {
    renderBanner();
    expect(screen.getByRole("region", {name: "Our projects"})).toBeInTheDocument();
  });

  it("links the card to the Projects page, named by its heading", () => {
    renderBanner();
    expect(screen.getByRole("link", {name: "Homes we've built and handed over"})).toHaveAttribute("href", "/projects");
  });

  it("shows the real estate eyebrow in that business's accent", () => {
    renderBanner();
    expect(screen.getByText("Engineering & Real Estate").closest("[data-division]")).toHaveAttribute("data-division", "engineering");
  });
});
