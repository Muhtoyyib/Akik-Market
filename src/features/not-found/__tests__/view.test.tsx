import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {NotFoundView} from "@/features/not-found/view";
import {notFoundHead} from "@/lib/content/not-found";

describe("the 404 page", () => {
  it("says so in its one h1", () => {
    render(<NotFoundView />);
    expect(screen.getAllByRole("heading", {level: 1}).map((heading) => heading.textContent)).toEqual(["We couldn't find that page"]);
  });

  it("explains under the heading, and uses the same line as its description", () => {
    render(<NotFoundView />);
    const line = screen.getByText(/The link may be old/);
    expect(notFoundHead.meta).toContainEqual({name: "description", content: line.textContent});
  });

  it("offers a way back to Home", () => {
    render(<NotFoundView />);
    expect(within(screen.getByRole("main")).getByRole("link", {name: /home/i})).toHaveAttribute("href", "/");
  });

  it("offers WhatsApp to the main number", () => {
    render(<NotFoundView />);
    expect(within(screen.getByRole("main")).getByRole("link", {name: /Chat on WhatsApp/})).toHaveAttribute(
      "href",
      "https://wa.me/2348161894229?text=Hello%20Akik%2C%20I'd%20like%20to%20ask%20about"
    );
  });

  it("keeps the shared header and footer", () => {
    render(<NotFoundView />);
    expect([screen.getAllByRole("banner").length, screen.getAllByRole("contentinfo").length]).toEqual([1, 1]);
  });

  it("tells search engines not to index it", () => {
    expect(notFoundHead.meta).toContainEqual({name: "robots", content: "noindex"});
  });

  it("is titled as a page of the site", () => {
    expect(notFoundHead.meta[0]).toEqual({title: "Page not found · Akik"});
  });
});
