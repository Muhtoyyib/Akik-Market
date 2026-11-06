import {render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {ProjectDetailView} from "@/features/projects/detail-view";
import {ProjectsIndexView} from "@/features/projects/index-view";
import {projectPage, projectsGrid} from "@/lib/content/projects-page";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const start = location.pathname;
const bodija = projectPage("bodija-duplex");
const renderIndex = () => render(<ProjectsIndexView projects={projectsGrid.projects} types={projectsGrid.types} />);
const renderProject = () => render(<ProjectDetailView project={bodija.project} related={bodija.related} />);
const rect = (element: Element) => element.getBoundingClientRect();
const columns = () => new Set([...document.querySelectorAll("[role='tabpanel'] article")].map((card) => Math.round(rect(card).left))).size;
const shownNames = () => [...document.querySelectorAll("[role='tabpanel'] article h2")].map((name) => name.textContent);
const heroRatio = () => {
  const {width, height} = rect(document.querySelector("[aria-labelledby='project-heading'] img")!.parentElement!);
  return Math.round((width / height) * 100) / 100;
};

describe("the Projects pages in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  afterEach(() => {
    history.replaceState(null, "", start);
  });

  it("sets the cards in three columns at 1440px, two at 768px and one at 390px", async () => {
    renderIndex();
    const counts = [columns()];
    await page.viewport(768, 1024);
    counts.push(columns());
    await page.viewport(390, 844);
    counts.push(columns());
    expect(counts).toEqual([3, 2, 1]);
  });

  it("selects the tab a shared ?type= link names, showing only that type", async () => {
    history.replaceState(null, "", `${start}?type=estates`);
    renderIndex();
    const estates = projectsGrid.projects.filter((project) => project.type === "estates").map((project) => project.name);
    await waitFor(() => expect(shownNames()).toEqual(estates));
  });

  it("falls back to All for an unknown ?type=", async () => {
    history.replaceState(null, "", `${start}?type=boats`);
    renderIndex();
    await waitFor(() => expect(screen.getByRole("tab", {selected: true}).textContent).toBe("All"));
  });

  it("puts the chosen tab in the address without a page load, and Back returns to All", async () => {
    renderIndex();
    await userEvent.click(screen.getByRole("tab", {name: "Homes"}));
    const chosen = location.search;
    history.back();
    await waitFor(() => expect([chosen, screen.getByRole("tab", {selected: true}).textContent]).toEqual(["?type=homes", "All"]));
  });

  it("gives a project's hero a 16:9 box on desktop and 4:5 on a phone", async () => {
    renderProject();
    const desktop = heroRatio();
    await page.viewport(390, 844);
    expect([desktop, heroRatio()]).toEqual([1.78, 0.8]);
  });

  it("puts the facts beside the story on desktop and above it on a phone", async () => {
    renderProject();
    const facts = () => rect(document.querySelector("dl")!);
    const story = () => rect(document.querySelector("dl")!.nextElementSibling!);
    const desktop = facts().right <= story().left;
    await page.viewport(390, 844);
    expect([desktop, facts().bottom <= story().top]).toEqual([true, true]);
  });

  it("shows gallery arrows at 1440px while the photos overflow the row", () => {
    renderProject();
    expect(screen.getByRole("button", {name: "Next photo"}).checkVisibility()).toBe(true);
  });

  it("has no accessibility violations on the index at 1440 and 390px", async () => {
    const {container} = renderIndex();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([desktop, await axeViolations(container)]).toEqual([[], []]);
  });

  it("has no accessibility violations on a project at 1440 and 390px", async () => {
    const {container} = renderProject();
    const desktop = await axeViolations(container);
    await page.viewport(390, 844);
    expect([desktop, await axeViolations(container)]).toEqual([[], []]);
  });
});
