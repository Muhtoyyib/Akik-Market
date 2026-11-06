import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {ProjectsBanner} from "@/features/home/projects-banner/projects-banner";
import {homeContent} from "@/lib/home-content";

const {projects} = homeContent;
const renderBanner = () =>
  render(
    <ProjectsBanner
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

  it("names the card's link for where it goes until the Projects page exists", () => {
    renderBanner();
    expect(screen.getByRole("link", {name: "Ask about our projects on WhatsApp"})).toHaveAttribute("href", projects.link.href);
  });

  it("shows the real estate eyebrow in that business's accent", () => {
    renderBanner();
    expect(screen.getByText("Engineering & Real Estate").closest("[data-division]")).toHaveAttribute("data-division", "engineering");
  });
});
