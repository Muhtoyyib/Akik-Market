import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Trust} from "@/features/home/trust/trust";
import {homeContent} from "@/lib/content/home";
import {siteContent} from "@/lib/content/site";

const {trust} = homeContent;
const {whatsapp} = siteContent;
const renderTrust = () =>
  render(<Trust heading={trust.heading.value} image={trust.image.value} rows={trust.rows} whatsappHref={whatsapp.main.href} />);

describe("Buy with confidence", () => {
  it("is a section named by its h2", () => {
    renderTrust();
    expect(screen.getByRole("region", {name: "Buy with confidence"})).toBeInTheDocument();
  });

  it("shows the four promises in order as h3s", () => {
    renderTrust();
    expect(screen.getAllByRole("heading", {level: 3}).map((heading) => heading.textContent)).toEqual([
      "Genuine phones",
      "Inspected cars",
      "Verified land papers",
      "Handover you can see",
    ]);
  });

  it("hides every row icon from assistive technology", () => {
    const {container} = renderTrust();
    const icons = [...container.querySelectorAll("li svg")];
    expect([icons.length, icons.every((icon) => icon.getAttribute("aria-hidden") === "true")]).toEqual([4, true]);
  });

  it("ends with one Chat on WhatsApp action", () => {
    renderTrust();
    expect(screen.getByRole("link", {name: "Chat on WhatsApp"})).toHaveAttribute("href", whatsapp.main.href);
  });
});
