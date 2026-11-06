import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {PageLayout} from "@/components/page-layout/page-layout";

const about = [
  {label: "About", href: "/about", current: true},
  {label: "Autos", href: "/autos", current: false},
];
const renderPage = (division?: "autos") =>
  render(
    <PageLayout links={about} division={division}>
      <h1>About Akik</h1>
    </PageLayout>
  );

describe("PageLayout", () => {
  it("gives the page one banner, one main and one contentinfo landmark", () => {
    renderPage();
    expect(["banner", "main", "contentinfo"].map((role) => screen.getAllByRole(role).length)).toEqual([1, 1, 1]);
  });

  it("puts the page's content inside main", () => {
    renderPage();
    expect(within(screen.getByRole("main")).getByRole("heading", {level: 1, name: "About Akik"})).toBeVisible();
  });

  it("reaches Skip to content on the first Tab", async () => {
    renderPage();
    await userEvent.tab();
    expect(document.activeElement).toHaveTextContent("Skip to content");
  });

  it("marks the current page's link as current in the header", () => {
    renderPage();
    const nav = screen.getByRole("navigation", {name: "Main"});
    expect(
      [within(nav).getByRole("link", {name: "About"}), within(nav).getByRole("link", {name: "Autos"})].map((link) =>
        link.getAttribute("aria-current")
      )
    ).toEqual(["page", null]);
  });

  it("sets a business's accent on the page content, leaving the header and footer alone", () => {
    renderPage("autos");
    expect(
      ["main", "banner", "contentinfo"].map((role) => screen.getByRole(role).closest("[data-division]")?.getAttribute("data-division"))
    ).toEqual(["autos", undefined, undefined]);
  });

  it("uses the default accent on a page that belongs to no single business", () => {
    renderPage();
    expect(document.querySelector("[data-division]")).toBeNull();
  });
});
