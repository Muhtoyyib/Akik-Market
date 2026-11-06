import {existsSync} from "node:fs";
import {describe, expect, it} from "vite-plus/test";
import {placeholderFacts} from "@/lib/content-facts";
import {aboutContent, aboutHead} from "@/lib/content/about";
import {businesses, startYear} from "@/lib/content/business";
import {founderPhotos} from "@/lib/content/founder";
import {homeContent} from "@/lib/content/home";

const {founder, timeline, values, team, visit} = aboutContent;
const reported = placeholderFacts(aboutContent).map((entry) => entry.path);

describe("About content", () => {
  it("titles the page 'About · Akik'", () => {
    expect(aboutHead.meta[0]).toEqual({title: "About · Akik"});
  });

  it("describes how Akik grew, naming the businesses in the order they began", () => {
    const at = businesses.map((entry) => aboutContent.description.value.indexOf(entry.name));
    expect([at.every((index) => index >= 0), [...at].sort((a, b) => a - b)]).toEqual([true, at]);
  });

  it("names no one in the founder line while the founder is a stand-in", () => {
    expect([founder.name.value, founder.name.placeholder]).toEqual(["Founder, Akik", true]);
  });

  it("tells the founder's story in one to four paragraphs", () => {
    expect(founder.story.value.length).toBeGreaterThanOrEqual(1);
    expect(founder.story.value.length).toBeLessThanOrEqual(4);
  });

  it("shows the same founder photos as Home", () => {
    expect([founder.photos, homeContent.founder.photos]).toEqual([founderPhotos, founderPhotos]);
  });

  it("describes the front founder photo for screen readers", () => {
    expect(founder.photos.value[0]?.alt).not.toBe("");
  });

  it("runs the chapters oldest first: phones, engineering, autos", () => {
    expect(timeline.chapters.map((chapter) => chapter.key)).toEqual(["phones", "engineering", "autos"]);
  });

  it("dates the phones chapter with the site start year, so Home, the footer and About agree", () => {
    expect(timeline.chapters[0]?.year).toBe(startYear);
  });

  it("keeps every chapter year a placeholder until the owner confirms it", () => {
    expect(timeline.chapters.map((chapter) => chapter.year.placeholder)).toEqual([true, true, true]);
  });

  it("gives each chapter two or three sentences", () => {
    const counts = timeline.chapters.map((chapter) => chapter.text.value.split(/(?<=\.)\s+/).length);
    expect(counts.every((count) => count >= 2 && count <= 3)).toBe(true);
  });

  it("points every page photo at a file in public/", () => {
    const photos = [...founder.photos.value, ...timeline.chapters.map((chapter) => chapter.image.value), visit.image.value];
    expect(photos.filter((photo) => !existsSync(`public${photo.src}`)).map((photo) => photo.src)).toEqual([]);
  });

  it("lists three to five values", () => {
    expect(values.rows.length).toBeGreaterThanOrEqual(3);
    expect(values.rows.length).toBeLessThanOrEqual(5);
  });

  it("has no team until the owner supplies real people", () => {
    expect(team.people).toEqual([]);
  });

  it("closes with every business's contacts", () => {
    expect(visit.contacts.map((contact) => contact.key)).toEqual(["phones", "engineering", "autos"]);
  });

  it("reports the founder's story and photos and every value as placeholders", () => {
    const expected = ["founder.photos", "founder.story", ...values.rows.map((_, index) => `values.rows.${index}`)];
    expect(expected.filter((path) => !reported.includes(path))).toEqual([]);
  });
});
