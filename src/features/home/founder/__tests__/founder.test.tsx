import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {Founder} from "@/features/home/founder/founder";
import {homeContent} from "@/lib/home-content";

const {founder} = homeContent;
const photos = founder.photos.value;

function renderFounder(link?: {label: string; href: string}) {
  return render(<Founder photos={photos} heading={founder.heading.value} story={founder.story.value} link={link} />);
}

describe("Founder", () => {
  it("is a section named by its heading", () => {
    renderFounder();
    expect(screen.getByRole("region", {name: "From one phone shop to three businesses"})).toBeInTheDocument();
  });

  it("names the arrows for what they do", () => {
    renderFounder();
    expect([screen.getByRole("button", {name: "Previous photo"}), screen.getByRole("button", {name: "Next photo"})]).toHaveLength(2);
  });

  it("shows only the front photo to assistive technology, described by its alt text", () => {
    renderFounder();
    expect(screen.getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual([photos[0]?.alt]);
  });

  it("brings the next photo to the front with the right arrow", async () => {
    renderFounder();
    await userEvent.click(screen.getByRole("button", {name: "Next photo"}));
    expect(screen.getByRole("img")).toHaveAccessibleName(photos[1]!.alt);
  });

  it("goes round to the last photo with the left arrow", async () => {
    renderFounder();
    await userEvent.click(screen.getByRole("button", {name: "Previous photo"}));
    expect(screen.getByRole("img")).toHaveAccessibleName(photos.at(-1)!.alt);
  });

  it("tells the story with the start year", () => {
    renderFounder();
    expect(screen.getByText(/began in 2023/)).toBeInTheDocument();
  });

  it("leaves Read our story out until the About page exists", () => {
    renderFounder();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("links Read our story to the About page once it exists", () => {
    renderFounder({label: "Read our story", href: "/about"});
    expect(screen.getByRole("link", {name: "Read our story"})).toHaveAttribute("href", "/about");
  });
});
