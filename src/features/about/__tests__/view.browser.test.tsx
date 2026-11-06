import {render} from "@testing-library/react";
import {beforeEach, describe, expect, it} from "vite-plus/test";
import {page} from "vite-plus/test/browser";
import {AboutView} from "@/features/about/view";
import {aboutContent} from "@/lib/content/about";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const rect = (element: Element) => element.getBoundingClientRect();
const chapters = () => [...document.querySelectorAll("[aria-labelledby='timeline-heading'] li")];
const photoOf = (chapter: Element) => rect(chapter.querySelector("[data-chapter-photo]")!);
const textOf = (chapter: Element) => rect(chapter.querySelector("h3")!);
const columnsOf = (selector: string) => new Set([...document.querySelectorAll(selector)].map((row) => Math.round(rect(row).left))).size;
const fourPeople = ["Ada", "Bayo", "Chidi", "Dami"].map((name) => ({
  name,
  role: "Sales",
  photo: {src: "/placeholders/founder/founder-phones-512.webp", alt: name, width: 512, height: 640},
}));
const withTeam = {...aboutContent, team: {...aboutContent.team, people: fourPeople}};

describe("the About page in a browser", () => {
  beforeEach(async () => {
    await page.viewport(1440, 900);
  });

  it("shows the founder's photo stack about 270px wide on desktop and 192px on a phone", async () => {
    render(<AboutView content={aboutContent} />);
    const desktop = rect(document.querySelector("[data-depth='0']")!).width;
    await page.viewport(390, 844);
    const phone = rect(document.querySelector("[data-depth='0']")!).width;
    expect([desktop >= 256 && desktop <= 288, Math.round(phone)]).toEqual([true, 192]);
  });

  it("puts each chapter's photo beside its text on desktop, on alternating sides", () => {
    render(<AboutView content={aboutContent} />);
    expect(chapters().map((chapter) => (photoOf(chapter).right <= textOf(chapter).left ? "photo left" : "photo right"))).toEqual([
      "photo left",
      "photo right",
      "photo left",
    ]);
  });

  it("puts each chapter's photo above its text on a phone", async () => {
    await page.viewport(390, 844);
    render(<AboutView content={aboutContent} />);
    expect(chapters().every((chapter) => photoOf(chapter).bottom <= textOf(chapter).top)).toBe(true);
  });

  it("shows the chapter photos at 3:2", () => {
    render(<AboutView content={aboutContent} />);
    const {width, height} = photoOf(chapters()[0]!);
    expect(Math.round((width / height) * 100) / 100).toBe(1.5);
  });

  it("sets the values in two columns from 768px and one on a phone", async () => {
    await page.viewport(768, 1024);
    render(<AboutView content={aboutContent} />);
    const wide = columnsOf("[aria-labelledby='values-heading'] li");
    await page.viewport(390, 844);
    expect([wide, columnsOf("[aria-labelledby='values-heading'] li")]).toEqual([2, 1]);
  });

  it("lays four people out as one grid row on desktop", () => {
    render(<AboutView content={withTeam} />);
    const tops = new Set([...document.querySelectorAll("[aria-labelledby='team-heading'] li")].map((card) => rect(card).top));
    expect(tops.size).toBe(1);
  });

  it("turns the team into a swipe row on a phone, with no sideways page scroll", async () => {
    await page.viewport(390, 844);
    render(<AboutView content={withTeam} />);
    const row = document.querySelector("[aria-labelledby='team-heading'] ul")!;
    expect([row.scrollWidth > row.clientWidth, document.documentElement.scrollWidth <= innerWidth]).toEqual([true, true]);
  });

  it("has no accessibility violations on desktop", async () => {
    const {container} = render(<AboutView content={withTeam} />);
    expect(await axeViolations(container)).toEqual([]);
  });

  it("has no accessibility violations on a phone", async () => {
    await page.viewport(390, 844);
    const {container} = render(<AboutView content={withTeam} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
