import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {HomeView} from "@/features/home/view";
import {homeContent} from "@/lib/home-content";

describe("Home page shell", () => {
  it("has one banner and one main landmark", () => {
    render(<HomeView />);
    expect([screen.getAllByRole("banner").length, screen.getAllByRole("main").length]).toEqual([1, 1]);
  });

  it("offers Skip to content as the first stop on Tab", async () => {
    render(<HomeView />);
    await userEvent.tab();
    expect(document.activeElement).toHaveAccessibleName("Skip to content");
  });

  it("shows the sections in the spec's order, from the hero to Visit us", () => {
    render(<HomeView />);
    const main = screen.getByRole("main");
    const names = [...main.querySelectorAll(":scope > section")].map((section) => section.getAttribute("aria-labelledby"));
    const headings = names.map((id) => document.getElementById(id ?? "")?.textContent);
    expect(headings).toEqual([
      homeContent.hero.heading.value,
      homeContent.divisions.heading.value,
      homeContent.featured.heading.value,
      homeContent.proof.heading.value,
      homeContent.stories.heading.value,
      "Our projects",
      homeContent.trust.heading.value,
      homeContent.news.heading.value,
      homeContent.founder.heading.value,
      homeContent.visit.heading.value,
    ]);
  });

  it("ends with the footer after main", () => {
    render(<HomeView />);
    expect(screen.getByRole("main").nextElementSibling).toBe(screen.getByRole("contentinfo"));
  });

  it("points Skip to content at main", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "Skip to content"})).toHaveAttribute("href", `#${screen.getByRole("main").id}`);
  });
});

describe("Home header", () => {
  it("links the wordmark home", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "Akik Market home"})).toHaveAttribute("href", "/");
  });

  it("shows no links to pages that are not built yet", () => {
    render(<HomeView />);
    const header = screen.getByRole("banner");
    const hrefs = [...header.querySelectorAll("a[href]")].map((link) => link.getAttribute("href"));
    expect(hrefs.filter((href) => href?.startsWith("/") && href !== "/")).toEqual([]);
  });

  it("makes the whole announcement one link with its full text as the name", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: homeContent.announcement.value.text})).toHaveAttribute(
      "href",
      homeContent.announcement.value.href
    );
  });

  it("opens WhatsApp from the header", () => {
    render(<HomeView />);
    const [headerAction] = screen.getAllByRole("link", {name: "Chat on WhatsApp"});
    expect(headerAction).toHaveAttribute("href", homeContent.whatsapp.main.href);
  });
});

describe("Home hero", () => {
  it("has the only page heading", () => {
    render(<HomeView />);
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual([homeContent.hero.heading.value]);
  });

  it("points See what we do at the divisions heading", () => {
    render(<HomeView />);
    const target = screen.getByRole("link", {name: "See what we do"}).getAttribute("href")!.slice(1);
    expect(document.getElementById(target)).toBe(screen.getByRole("heading", {name: homeContent.divisions.heading.value}));
  });

  it("keeps each reassurance claim from breaking inside itself", () => {
    render(<HomeView />);
    // Scoped to the hero: the same phrases come back as promises in Buy with confidence.
    const hero = within(screen.getByRole("heading", {level: 1}).closest("section")!);
    for (const claim of homeContent.hero.claims.value) {
      expect(hero.getByText(claim)).toHaveClass("whitespace-nowrap");
    }
  });
});

describe("Home divisions", () => {
  it("shows the three businesses in the order they grew", () => {
    render(<HomeView />);
    const section = screen.getByRole("region", {name: homeContent.divisions.heading.value});
    expect(
      within(section)
        .getAllByRole("listitem")
        .map((item) => within(item).getByText(/&|Autos/).textContent)
    ).toEqual(["Phones & Gadgets", "Engineering & Real Estate", "Autos"]);
  });

  it("tells a screen reader that a card opens WhatsApp while its page is not built", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "Cars you can trust, chat on WhatsApp"})).toHaveAttribute(
      "href",
      homeContent.divisions.cards[2]!.link.href
    );
  });

  it("gives each card its division's accent", () => {
    render(<HomeView />);
    const section = screen.getByRole("region", {name: homeContent.divisions.heading.value});
    expect([...section.querySelectorAll("[data-division]")].map((card) => card.getAttribute("data-division"))).toEqual([
      "phones",
      "engineering",
      "autos",
    ]);
  });
});
