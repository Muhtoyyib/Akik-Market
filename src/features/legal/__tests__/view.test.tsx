import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {LegalView} from "@/features/legal/view";
import {real} from "@/lib/content-facts";
import {privacy} from "@/lib/content/legal";

const renderPrivacy = (document = privacy) => render(<LegalView path="/privacy" document={document} />);
const short = {...privacy.value, sections: privacy.value.sections.slice(0, 3)};

describe("a legal page", () => {
  it("has the document's name as its one h1, and the date it was last updated", () => {
    renderPrivacy();
    expect([
      screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent),
      screen.getByText(/Last updated/).textContent,
    ]).toEqual([["Privacy policy"], "Last updated 6 NOV 2026"]);
  });

  it("says it is a draft while its text is a placeholder", () => {
    renderPrivacy();
    expect(screen.getByRole("note").textContent).toBe("Draft for review. Akik's lawyer will supply the final text.");
  });

  it("drops the draft notice once the text is real", () => {
    renderPrivacy(real(privacy.value));
    expect(screen.queryByRole("note")).toBeNull();
  });

  it("lists a contents link to each section heading", () => {
    renderPrivacy();
    const links = within(screen.getByRole("navigation", {name: "Contents"})).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual(
      privacy.value.sections.map((section) => [section.heading, `#${section.id}`])
    );
  });

  it("gives each contents link a heading to land on", () => {
    renderPrivacy();
    const targets = privacy.value.sections.map((section) => document.getElementById(section.id)?.tagName);
    expect(new Set(targets)).toEqual(new Set(["H2"]));
  });

  it("leaves out the contents list for a document of three sections or fewer", () => {
    renderPrivacy(real(short));
    expect(screen.queryByRole("navigation", {name: "Contents"})).toBeNull();
  });
});
