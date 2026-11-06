import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vite-plus/test";
import {Button} from "@/components/button/button";

describe("Button", () => {
  it("is a link when it goes somewhere", () => {
    render(<Button href="/about">Our story</Button>);
    expect(screen.getByRole("link", {name: "Our story"})).toHaveAttribute("href", "/about");
  });

  it("is a button when it acts on the page", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Show more</Button>);
    await userEvent.click(screen.getByRole("button", {name: "Show more"}));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not submit forms by accident", () => {
    render(<Button onClick={() => {}}>Show more</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("opens WhatsApp in a new tab without giving it access to this page", () => {
    render(<Button href="https://wa.me/2347065470198">Chat on WhatsApp</Button>);
    const link = screen.getByRole("link", {name: "Chat on WhatsApp"});
    expect([link.getAttribute("target"), link.getAttribute("rel")]).toEqual(["_blank", "noopener noreferrer"]);
  });

  it("keeps a phone link in the same tab", () => {
    render(<Button href="tel:+2347065470198">Call us</Button>);
    expect(screen.getByRole("link", {name: "Call us"})).not.toHaveAttribute("target");
  });

  it("keeps the arrow of a link button out of its name", () => {
    render(
      <Button href="/projects" variant="link">
        See all projects
      </Button>
    );
    expect(screen.getByRole("link")).toHaveAccessibleName("See all projects");
  });

  it("disables a button so it cannot be clicked", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Show more
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
