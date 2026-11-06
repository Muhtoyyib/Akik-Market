import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {afterEach, describe, expect, it, vi} from "vite-plus/test";
import {ContactView} from "@/features/contact/view";

const start = location.pathname;
const send = () => userEvent.click(screen.getByRole("button", {name: "Send on WhatsApp"}));
const fill = async () => {
  await userEvent.click(screen.getByRole("radio", {name: "Engineering & Real Estate"}));
  await userEvent.type(screen.getByRole("textbox", {name: "Your name (required)"}), "Ada");
  await userEvent.type(screen.getByRole("textbox", {name: /^Your message/}), "Is the Akobo plot still available?");
};

describe("the Contact page", () => {
  afterEach(() => {
    history.replaceState(null, "", start);
    vi.restoreAllMocks();
  });

  it("has one h1, then the channels, the form and the location in that order", () => {
    render(<ContactView />);
    expect(
      within(screen.getByRole("main"))
        .getAllByRole("heading", {level: 2})
        .map((heading) => heading.textContent)
    ).toEqual(["Every way to reach us", "Send us a message", "Find us at Iwo Road"]);
  });

  it("dials each business in international form and links the email", () => {
    render(<ContactView />);
    expect([
      screen.getByRole("link", {name: /Call Autos/}).getAttribute("href"),
      screen.getByRole("link", {name: "akikmarket@gmail.com"}).getAttribute("href"),
    ]).toEqual(["tel:+2348161894229", "mailto:akikmarket@gmail.com"]);
  });

  it("opens Instagram and TikTok in a new tab without handing them this page", () => {
    render(<ContactView />);
    const links = ["Instagram", "TikTok"].map((name) => within(screen.getByRole("main")).getByRole("link", {name}));
    expect(links.map((link) => [link.getAttribute("target"), link.getAttribute("rel")])).toEqual([
      ["_blank", "noopener noreferrer"],
      ["_blank", "noopener noreferrer"],
    ]);
  });

  it("sends Get directions to the shop's address in Google Maps, with no embedded map", () => {
    const {container} = render(<ContactView />);
    expect([screen.getByRole("link", {name: "Get directions"}).getAttribute("href"), container.querySelector("iframe")]).toEqual([
      "https://www.google.com/maps/search/?api=1&query=Iwo%20Road%20Shopping%20Complex%2C%20Ibadan",
      null,
    ]);
  });

  it("says required in each required field's name", () => {
    render(<ContactView />);
    expect([
      screen.getByRole("group", {name: "Which business (required)"}),
      screen.getByRole("textbox", {name: "Your name (required)"}),
      screen.getByRole("textbox", {name: "What it's about"}),
    ]).toHaveLength(3);
  });

  it("chooses Autos when opened from a link with ?business=autos", async () => {
    history.replaceState(null, "", `${start}?business=autos`);
    render(<ContactView />);
    await waitFor(() => expect(screen.getByRole("radio", {name: "Autos"})).toBeChecked());
  });

  it("chooses nothing for an unknown ?business=", () => {
    history.replaceState(null, "", `${start}?business=boats`);
    render(<ContactView />);
    expect(screen.getAllByRole("radio").filter((radio) => (radio as HTMLInputElement).checked)).toEqual([]);
  });

  it("shows every missing field's error and focuses the first, without opening WhatsApp", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactView />);
    await send();
    expect([
      ["Choose a business", "Write your name", "Write your message"].map((message) => screen.queryByText(message) !== null),
      document.activeElement === screen.getByRole("group", {name: "Which business (required)"}),
      open.mock.calls.length,
    ]).toEqual([[true, true, true], true, 0]);
  });

  it("puts the error under a missing message, reads it with the field and focuses it", async () => {
    render(<ContactView />);
    await userEvent.click(screen.getByRole("radio", {name: "Autos"}));
    await userEvent.type(screen.getByRole("textbox", {name: "Your name (required)"}), "Ada");
    await send();
    const message = screen.getByRole("textbox", {name: /^Your message/});
    expect([document.activeElement, message.getAttribute("aria-invalid"), message]).toEqual([message, "true", expect.objectContaining({})]);
    expect(message).toHaveAccessibleDescription(/Write your message/);
  });

  it("clears an error as soon as the field is filled", async () => {
    render(<ContactView />);
    await send();
    await userEvent.type(screen.getByRole("textbox", {name: "Your name (required)"}), "Ada");
    expect(screen.queryByText("Write your name")).toBeNull();
  });

  it("opens WhatsApp to the chosen business in a new tab with the visitor's words", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactView />);
    await fill();
    await send();
    const text = "Hello Akik Engineering & Real Estate, I'm Ada.\n\nIs the Akobo plot still available?";
    expect(open.mock.calls).toEqual([[`https://wa.me/2348161894229?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer"]]);
  });

  it("counts the message's characters against the limit", async () => {
    render(<ContactView />);
    await userEvent.type(screen.getByRole("textbox", {name: /^Your message/}), "Hello");
    expect(screen.getByText("5 of 1,000 characters")).toBeTruthy();
  });

  it("tells visitors the WhatsApp links work without the form", () => {
    render(<ContactView />);
    expect(screen.getByText(/The WhatsApp links above go straight to each business/)).toBeTruthy();
  });
});
