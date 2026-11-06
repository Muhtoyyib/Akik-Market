import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Footer} from "@/features/home/footer/footer";
import {homeContent} from "@/lib/home-content";

const {footer} = homeContent;
const renderFooter = () =>
  render(
    <Footer
      counters={footer.counters.map((counter) => counter.value)}
      columns={footer.columns}
      legal={footer.legal.value}
      wordmark={footer.wordmark.value}
    />
  );

describe("Footer", () => {
  it("is the page's contentinfo landmark", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("reads each figure together with its label", () => {
    renderFooter();
    const figures = within(screen.getByRole("list", {name: "Akik in numbers"})).getAllByRole("listitem");
    expect(figures.map((figure) => figure.textContent)).toEqual(["2023 Serving Ibadan since", "1,000+ Phones sold", "50+ Cars delivered"]);
  });

  it("heads each link column", () => {
    renderFooter();
    expect(screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent)).toEqual(["Follow"]);
  });

  it("opens Instagram in a new tab without handing it this page", () => {
    renderFooter();
    const instagram = screen.getByRole("link", {name: "Instagram"});
    expect([instagram.getAttribute("href"), instagram.getAttribute("target"), instagram.getAttribute("rel")]).toEqual([
      "https://www.instagram.com/akikmarket/",
      "_blank",
      "noopener noreferrer",
    ]);
  });

  it("ends with the legal line", () => {
    renderFooter();
    expect(screen.getByText(`© ${new Date().getFullYear()} Akik. Iwo Road, Ibadan.`)).toBeInTheDocument();
  });

  it("hides the giant wordmark from assistive technology", () => {
    renderFooter();
    expect(screen.getByText("AKIK").closest("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
