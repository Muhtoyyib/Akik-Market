import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {SiteHeader} from "@/features/home/header/site-header";

const sections = [
  {label: "Businesses", href: "#divisions"},
  {label: "News", href: "#news"},
];
const renderHeader = (links = sections) =>
  render(<SiteHeader announcement={null} whatsappHref="https://wa.me/2347065470198" links={links} />);
const menuButton = () => screen.getAllByRole("button", {name: "Menu"})[0]!;

describe("SiteHeader", () => {
  it("shows no navigation and no menu when there is nothing to link", () => {
    renderHeader([]);
    expect([screen.queryByRole("navigation"), screen.queryByRole("button", {name: "Menu"})]).toEqual([null, null]);
  });

  it("lists its links in the main navigation", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", {name: "Main"});
    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.textContent)
    ).toEqual(["Businesses", "News"]);
  });

  it("announces the menu button as collapsed until it is opened", async () => {
    renderHeader();
    // The open menu hides the rest of the page from assistive technology, so keep hold of the button.
    const button = menuButton();
    const before = button.getAttribute("aria-expanded");
    await userEvent.click(button);
    expect([before, button.getAttribute("aria-expanded")]).toEqual(["false", "true"]);
  });

  it("points the open menu button at the menu it controls", async () => {
    renderHeader();
    const button = menuButton();
    await userEvent.click(button);
    expect(document.getElementById(button.getAttribute("aria-controls") ?? "")).toBe(screen.getByRole("dialog", {name: "Menu"}));
  });

  it("closes the menu when a link is chosen", async () => {
    renderHeader();
    await userEvent.click(menuButton());
    await userEvent.click(within(screen.getByRole("dialog")).getByRole("link", {name: "News"}));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes the menu from its close button", async () => {
    renderHeader();
    await userEvent.click(menuButton());
    await userEvent.click(screen.getByRole("button", {name: "Close menu"}));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("offers WhatsApp inside the menu", async () => {
    renderHeader();
    await userEvent.click(menuButton());
    expect(within(screen.getByRole("dialog")).getByRole("link", {name: "Chat on WhatsApp"})).toHaveAttribute(
      "href",
      "https://wa.me/2347065470198"
    );
  });
});
