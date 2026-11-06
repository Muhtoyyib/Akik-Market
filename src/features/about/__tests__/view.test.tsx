import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {AboutView} from "@/features/about/view";
import {aboutContent} from "@/lib/content/about";

const person = {
  name: "Tunde Bello",
  role: "Shop manager",
  photo: {src: "/placeholders/founder/founder-phones-512.webp", alt: "Tunde Bello", width: 512, height: 640},
};
const withTeam = {...aboutContent, team: {...aboutContent.team, people: [person]}};
const sectionNames = () =>
  within(screen.getByRole("main"))
    .getAllByRole("region")
    .map((section) => section.getAttribute("aria-labelledby"));

describe("the About page", () => {
  it("runs founder, timeline, values, team, projects banner and contacts in that order", () => {
    render(<AboutView content={withTeam} />);
    expect(sectionNames()).toEqual([
      "founder-heading",
      "timeline-heading",
      "values-heading",
      "team-heading",
      "projects-heading",
      "visit-heading",
    ]);
  });

  it("goes from values straight to the projects banner while there is no team", () => {
    render(<AboutView content={aboutContent} />);
    expect(sectionNames().slice(2, 4)).toEqual(["values-heading", "projects-heading"]);
  });

  it("has exactly one h1, the founder's heading", () => {
    render(<AboutView content={aboutContent} />);
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual([aboutContent.founder.heading.value]);
  });

  it("reads the h1, then the founder's name and role, then the story", () => {
    render(<AboutView content={aboutContent} />);
    const founder = screen.getByRole("region", {name: aboutContent.founder.heading.value});
    const text = [...founder.querySelectorAll("h1, p")].map((node) => node.textContent);
    expect(text).toEqual([aboutContent.founder.heading.value, "Founder, Akik", ...aboutContent.founder.story.value]);
  });

  it("announces the timeline as an ordered list of three chapters, phones first", () => {
    render(<AboutView content={aboutContent} />);
    const timeline = screen.getByRole("region", {name: aboutContent.timeline.heading.value});
    const list = within(timeline).getByRole("list");
    expect([
      list.tagName,
      within(list)
        .getAllByRole("heading", {level: 3})
        .map((heading) => heading.textContent),
    ]).toEqual(["OL", aboutContent.timeline.chapters.map((chapter) => chapter.heading.value)]);
  });

  it("shows each chapter's year", () => {
    render(<AboutView content={aboutContent} />);
    const timeline = screen.getByRole("region", {name: aboutContent.timeline.heading.value});
    expect(aboutContent.timeline.chapters.every((chapter) => within(timeline).queryByText(String(chapter.year.value)))).toBe(true);
  });

  it("shows each team member's photo, named for screen readers, with their name and role", () => {
    render(<AboutView content={withTeam} />);
    const team = screen.getByRole("region", {name: aboutContent.team.heading.value});
    expect([within(team).getByRole("img").getAttribute("alt"), within(team).getByText("Shop manager").textContent]).toEqual([
      "Tunde Bello",
      "Shop manager",
    ]);
  });

  it("leads into the Projects page from the banner", () => {
    render(<AboutView content={aboutContent} />);
    expect(screen.getByRole("link", {name: "Homes we've built and handed over"}).getAttribute("href")).toBe("/projects");
  });

  it("ends with every business's contacts", () => {
    render(<AboutView content={aboutContent} />);
    const visit = screen.getByRole("region", {name: aboutContent.visit.heading.value});
    expect(
      within(visit)
        .getAllByRole("link", {name: /^WhatsApp/})
        .map((link) => link.textContent)
    ).toEqual(["WhatsApp Phones & Gadgets", "WhatsApp Engineering & Real Estate", "WhatsApp Autos"]);
  });

  it("marks About current in the header once the page is built", () => {
    render(<AboutView content={aboutContent} />);
    expect(screen.getAllByRole("link", {name: "About", current: "page"}).length).toBeGreaterThan(0);
  });
});
