import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {business} from "@/lib/content/business";
import {projectSummaries} from "@/lib/content/project-summaries";
import {enquiryMessage, projects} from "@/lib/content/projects";
import {projectPage, projectsGrid} from "@/lib/content/projects-page";
import {projectHead, projectsIndexHead} from "@/lib/page-heads";
import {projectsBanner} from "@/lib/content/projects-banner";
import {prerenderPathnames} from "@/lib/site-pages";
import {whatsappHref} from "@/lib/whatsapp";

const all = projects.map((entry) => entry.value);
const bodija = projectPage("bodija-duplex");
const bodijaHead = projectHead("bodija-duplex");

describe("projects collection", () => {
  it("takes each project's name and description from its summary, which the page list and heads read", () => {
    expect(all.map(({slug, name, description}) => ({slug, name, description}))).toEqual(projectSummaries.value);
  });

  it("gives every project its own slug", () => {
    expect(new Set(all.map((project) => project.slug)).size).toBe(all.length);
  });

  it("gives every project a name, area, year, figure, description, story and photo", () => {
    const missing = all.filter(
      (project) =>
        !project.name ||
        !project.area ||
        !/^\d{4}$/.test(project.year) ||
        !project.figure.value ||
        !project.description ||
        project.story.length === 0 ||
        project.photos.length === 0
    );
    expect(missing).toEqual([]);
  });

  it("places every project in Ibadan, where Akik builds", () => {
    expect(new Set(all.map((project) => project.city))).toEqual(new Set(["Ibadan"]));
  });

  it("sizes every photo at 3:2, as the files are cropped", () => {
    const off = all.flatMap((project) => project.photos).filter((photo) => Math.abs(photo.width / photo.height - 1.5) > 0.01);
    expect(off).toEqual([]);
  });

  it("keeps each story to five paragraphs or fewer", () => {
    expect(all.every((project) => project.story.length <= 5)).toBe(true);
  });

  it("marks every project a placeholder until the owner supplies real work", () => {
    expect(projects.every((entry) => entry.placeholder)).toBe(true);
  });

  it("points every photo at a file in public/, with empty alt so the page doesn't claim it as Akik's work", () => {
    const photos = all.flatMap((project) => project.photos);
    expect(photos.filter((photo) => photo.alt !== "" || !existsSync(`public${photo.src}`))).toEqual([]);
  });

  it("prefills the enquiry with the project's name, to the Engineering number", () => {
    expect(bodija.project.enquiryHref).toBe(
      whatsappHref(business("engineering").number.value, "Hello Akik, I saw Bodija Duplex and I'd like to ask about")
    );
  });

  it("words the enquiry from the spec", () => {
    expect(enquiryMessage("Oluyole Court")).toBe("Hello Akik, I saw Oluyole Court and I'd like to ask about");
  });
});

describe("projects pages", () => {
  it("prerenders the index and one page per project", () => {
    const expected = ["/projects", ...all.map((project) => `/projects/${project.slug}`)];
    expect(expected.filter((path) => !prerenderPathnames.includes(path))).toEqual([]);
  });

  it("lists the projects newest first", () => {
    const dates = projectsGrid.projects.map((project) => project.completed);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("offers a tab for each type that has projects", () => {
    expect(projectsGrid.types).toEqual(["homes", "estates"]);
  });

  it("titles the index 'Projects · Akik'", () => {
    expect(projectsIndexHead.meta[0]).toEqual({title: "Projects · Akik"});
  });

  it("titles a project page after the project, as an article", () => {
    expect([bodijaHead.meta[0], bodijaHead.meta.find((tag) => "property" in tag && tag.property === "og:type")]).toEqual([
      {title: "Bodija Duplex · Akik"},
      {property: "og:type", content: "article"},
    ]);
  });

  it("previews a shared project page under its own name and description", () => {
    const og = Object.fromEntries(bodijaHead.meta.flatMap((tag) => ("property" in tag ? [[tag.property, tag.content]] : [])));
    expect([og["og:title"], og["og:description"]]).toEqual(["Bodija Duplex", bodija.project.description]);
  });

  it("gives a project page schema.org breadcrumbs: Projects, then the project", () => {
    expect(JSON.parse(bodijaHead.scripts[0]!.children)).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {"@type": "ListItem", position: 1, name: "Projects", item: "/projects"},
        {"@type": "ListItem", position: 2, name: "Bodija Duplex", item: "/projects/bodija-duplex"},
      ],
    });
  });

  it("titles every project page after its own project", () => {
    const titles = projectSummaries.value.map((summary) => projectHead(summary.slug).meta[0]);
    expect(titles).toEqual(projectSummaries.value.map((summary) => ({title: `${summary.name} · Akik`})));
  });

  it("shows three related projects, never the current one", () => {
    expect([bodija.related.length, bodija.related.some((project) => project.slug === "bodija-duplex")]).toEqual([3, false]);
  });

  it("points Home's and Engineering's projects banner at the Projects page now that it exists", () => {
    expect([projectsBanner.link.href, projectsBanner.heading.value]).toEqual(["/projects", "Homes we've built and handed over"]);
  });
});
