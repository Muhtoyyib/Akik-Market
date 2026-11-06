import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {Stories} from "@/features/home/stories/stories";
import {homeContent} from "@/lib/content/home";

const {stories} = homeContent;
const renderStories = () => render(<Stories heading={stories.heading.value} tabs={stories.tabs} />);

describe("Customer stories", () => {
  it("is a section named for screen readers", () => {
    renderStories();
    expect(screen.getByRole("region", {name: "Customer stories"})).toBeInTheDocument();
  });

  it("opens on the phones story", () => {
    renderStories();
    expect(screen.getByRole("tab", {selected: true})).toHaveTextContent("Phones");
  });

  it("shows the Homes story's name, year and quote when Homes is chosen", async () => {
    renderStories();
    await userEvent.click(screen.getByRole("tab", {name: "Homes"}));
    const panel = screen.getByRole("tabpanel");
    expect(panel.textContent).toMatch(/FEMI · CUSTOMER SINCE 2024.*Akik checked the land papers/);
  });

  it("marks the story up as a quotation with the customer in its caption", () => {
    renderStories();
    const figure = within(screen.getByRole("tabpanel")).getByRole("figure");
    expect([!!figure.querySelector("blockquote"), figure.querySelector("figcaption")?.textContent]).toEqual([
      true,
      "CHIAMAKA · CUSTOMER SINCE 2023",
    ]);
  });

  it("shows no play button for a story that has only a photo", () => {
    renderStories();
    expect(screen.queryByRole("button", {name: /play/i})).toBeNull();
  });
});
