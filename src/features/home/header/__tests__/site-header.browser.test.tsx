import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import {SiteHeader} from "@/features/home/header/site-header";
import {sectionLinks} from "@/lib/home-sections";
import {axeViolations} from "@/test/axe";
import "@/styles/app.css";

const everySection = sectionLinks({divisions: true, featured: true, stories: true, news: true, visit: true});
const pages = everySection.slice(0, 2);
// A tall page below the header, so the header can scroll out of view.
const renderPage = (links = pages) =>
  render(
    <>
      <SiteHeader announcement={null} whatsappHref="https://wa.me/2347065470198" links={links} />
      <main className="h-screen" />
      <main className="h-screen" aria-hidden />
    </>
  );
const pill = () => document.querySelector<HTMLElement>("[data-floating-pill]")!;
// Selected by attribute: Testing Library gives an element hidden by CSS an empty name, and these checks are about
// which copy CSS hides at each width. DOM order is the header row's button, then the pill's.
const menuButtons = () => [...document.querySelectorAll<HTMLElement>('button[aria-label="Menu"]')];
const rowMenuButton = () => menuButtons()[0]!;
const mainNav = () => document.querySelector<HTMLElement>('nav[aria-label="Main"]')!;

describe("SiteHeader in a browser", () => {
  it("shows the links in the header row on desktop, with no menu button", async () => {
    await page.viewport(1440, 900);
    renderPage();
    expect([mainNav().checkVisibility(), rowMenuButton().checkVisibility()]).toEqual([true, false]);
  });

  it("fits every section link in the header row at 1024px, the narrowest desktop width", async () => {
    await page.viewport(1024, 768);
    const {container} = renderPage(everySection);
    const row = mainNav().parentElement!;
    expect([
      row.scrollWidth <= row.clientWidth,
      new Set([...container.querySelectorAll("nav li")].map((li) => li.getBoundingClientRect().top)).size,
    ]).toEqual([true, 1]);
  });

  it("moves the links into the menu on a phone", async () => {
    await page.viewport(390, 844);
    renderPage();
    expect([mainNav().checkVisibility(), rowMenuButton().checkVisibility()]).toEqual([false, true]);
  });

  it("closes the menu on Escape and puts focus back on the menu button", async () => {
    await page.viewport(390, 844);
    renderPage();
    const button = rowMenuButton();
    await userEvent.click(button);
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect([screen.queryByRole("dialog"), document.activeElement]).toEqual([null, button]));
  });

  it("keeps focus inside the open menu", async () => {
    await page.viewport(390, 844);
    renderPage();
    await userEvent.click(rowMenuButton());
    const dialog = await screen.findByRole("dialog");
    const stops = [];
    for (let step = 0; step < 6; step += 1) {
      await userEvent.tab();
      stops.push(dialog.contains(document.activeElement));
    }
    expect(stops.every(Boolean)).toBe(true);
  });

  it("keeps the floating pill hidden and out of the tab order while the header is in view", async () => {
    await page.viewport(1440, 900);
    renderPage();
    expect([getComputedStyle(pill()).opacity, pill().inert]).toEqual(["0", true]);
  });

  it("shows the floating pill once the header scrolls out of view", async () => {
    await page.viewport(1440, 900);
    renderPage();
    window.scrollTo(0, 600);
    await waitFor(() => expect([pill().inert, getComputedStyle(pill()).opacity]).toEqual([false, "1"]));
  });

  it("opens the same menu from the floating pill on desktop", async () => {
    await page.viewport(1440, 900);
    renderPage();
    window.scrollTo(0, 600);
    await waitFor(() => expect(pill().inert).toBe(false));
    await userEvent.click(menuButtons()[1]!);
    expect(await screen.findByRole("dialog", {name: "Menu"})).toBeVisible();
  });

  it("has no axe violations with the menu open on a phone", async () => {
    await page.viewport(390, 844);
    renderPage();
    await userEvent.click(rowMenuButton());
    await screen.findByRole("dialog");
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
