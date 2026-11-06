import {render, screen} from "@testing-library/react";
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

  it("points Skip to content at main", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "Skip to content"})).toHaveAttribute("href", `#${screen.getByRole("main").id}`);
  });
});

describe("Home header", () => {
  it("links the wordmark home", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "Akik"})).toHaveAttribute("href", "/");
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

  it("points See what we do at the divisions section", () => {
    render(<HomeView />);
    expect(screen.getByRole("link", {name: "See what we do"})).toHaveAttribute("href", "#divisions");
  });

  it("keeps each reassurance claim from breaking inside itself", () => {
    render(<HomeView />);
    for (const claim of homeContent.hero.claims.value) {
      expect(screen.getByText(claim)).toHaveClass("whitespace-nowrap");
    }
  });
});
