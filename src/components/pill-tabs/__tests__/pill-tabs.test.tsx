import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vite-plus/test";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";

const stories = [
  {value: "phones", label: "Phones", panel: <p>Phone story</p>},
  {value: "homes", label: "Homes", panel: <p>Home story</p>},
  {value: "cars", label: "Cars", panel: <p>Car story</p>},
];

function renderTabs() {
  render(<PillTabs label="Customer stories" tabs={stories} />);
  return screen.getByRole("tablist", {name: "Customer stories"});
}

const selectedTab = () => screen.getByRole("tab", {selected: true}).textContent;

describe("PillTabs", () => {
  it("is a named tab list with one tab per option", () => {
    renderTabs();
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Phones", "Homes", "Cars"]);
  });

  it("selects the first option and shows its panel", () => {
    renderTabs();
    expect([selectedTab(), screen.getByRole("tabpanel").textContent]).toEqual(["Phones", "Phone story"]);
  });

  it("shows the panel of the option a visitor clicks", async () => {
    renderTabs();
    await userEvent.click(screen.getByRole("tab", {name: "Cars"}));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Car story");
  });

  it("selects the next option with the right arrow", async () => {
    renderTabs();
    await userEvent.click(screen.getByRole("tab", {name: "Phones"}));
    await userEvent.keyboard("{ArrowRight}");
    expect(selectedTab()).toBe("Homes");
  });

  it("jumps to the last option with End and back to the first with Home", async () => {
    renderTabs();
    await userEvent.click(screen.getByRole("tab", {name: "Homes"}));
    await userEvent.keyboard("{End}");
    const atEnd = selectedTab();
    await userEvent.keyboard("{Home}");
    expect([atEnd, selectedTab()]).toEqual(["Cars", "Phones"]);
  });

  it("keeps only the selected option in the Tab order", () => {
    renderTabs();
    expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
  });

  it("labels the panel with its tab", () => {
    renderTabs();
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Phones");
  });
});
