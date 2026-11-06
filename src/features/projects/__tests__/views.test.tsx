import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {ProjectDetailView} from "@/features/projects/detail-view";
import {ProjectsIndexView} from "@/features/projects/index-view";
import {projectPage, projectsGrid} from "@/lib/content/projects-page";

const {projects, types} = projectsGrid;
const bodija = projectPage("bodija-duplex");
const jericho = projectPage("jericho-villa");
const renderIndex = (list = projects, kinds = types) => render(<ProjectsIndexView projects={list} types={kinds} />);
const renderProject = (page = bodija) => render(<ProjectDetailView project={page.project} related={page.related} />);

describe("the Projects index", () => {
  it("has exactly one h1, with the business named above it", () => {
    renderIndex();
    const [h1] = screen.getAllByRole("heading", {level: 1});
    expect([screen.getAllByRole("heading", {level: 1}).length, h1?.previousElementSibling?.textContent]).toEqual([
      1,
      "Engineering & Real Estate",
    ]);
  });

  it("makes each card one link named after its project", () => {
    renderIndex();
    const panel = screen.getByRole("tabpanel");
    expect(
      within(panel)
        .getAllByRole("link")
        .map((link) => link.textContent)
    ).toEqual(projects.map((project) => project.name));
  });

  it("offers All and a tab per type with projects", () => {
    renderIndex();
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["All", "Homes", "Estates"]);
  });

  it("shows no tabs when every project is the same type", () => {
    const homes = projects.filter((project) => project.type === "homes");
    renderIndex(homes, ["homes"]);
    expect([screen.queryAllByRole("tab"), screen.getAllByRole("article").length]).toEqual([[], homes.length]);
  });
});

describe("a project page", () => {
  it("names the project in the only h1", () => {
    renderProject();
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual(["Bodija Duplex"]);
  });

  it("leads back to all projects", () => {
    renderProject();
    expect(screen.getByRole("link", {name: "All projects"}).getAttribute("href")).toBe("/projects");
  });

  it("lists location, year, type and size", () => {
    renderProject();
    expect([...document.querySelectorAll("dt")].map((term) => term.textContent)).toEqual(["Location", "Completed", "Type", "Size"]);
  });

  it("leaves out a fact the project doesn't have", () => {
    renderProject(projectPage("alakia-family-home"));
    expect([...document.querySelectorAll("dt")].map((term) => term.textContent)).toEqual(["Location", "Completed", "Type"]);
  });

  it("shows every photo after the hero's in the gallery, with empty alt text", () => {
    renderProject();
    const gallery = screen.getByRole("region", {name: "More photos"});
    const photos = within(gallery).getAllByRole("presentation");
    expect([photos.length, photos.every((photo) => photo.getAttribute("alt") === "")]).toEqual([bodija.project.photos.length - 1, true]);
  });

  it("leaves out the gallery with one photo", () => {
    renderProject(jericho);
    expect(screen.queryByRole("region", {name: "More photos"})).toBeNull();
  });

  it("shows up to three other projects, never this one", () => {
    renderProject();
    const related = screen.getByRole("region", {name: "More projects"});
    const names = within(related)
      .getAllByRole("link")
      .map((link) => link.textContent);
    expect([names.length, names.includes("Bodija Duplex")]).toEqual([3, false]);
  });

  it("ends with a WhatsApp pill to Engineering about this project", () => {
    renderProject();
    expect(screen.getByRole("link", {name: "Ask on WhatsApp"}).getAttribute("href")).toBe(bodija.project.enquiryHref);
  });

  it("marks Projects current in the header", () => {
    renderProject();
    expect(screen.getAllByRole("link", {name: "Projects", current: "page"}).length).toBeGreaterThan(0);
  });
});
