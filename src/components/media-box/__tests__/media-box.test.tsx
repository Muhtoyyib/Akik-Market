import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {MediaBox} from "@/components/media-box/media-box";

const duplex = {kind: "image", src: "/media/duplex.avif", alt: "Four-bedroom duplex at handover", width: 1600, height: 900} as const;

describe("MediaBox", () => {
  it("describes its image with the alt text it is given", () => {
    render(<MediaBox ratio="16:9" media={duplex} />);
    expect(screen.getByRole("img", {name: "Four-bedroom duplex at handover"})).toBeInTheDocument();
  });

  it("loads lazily unless it is the first media on the page", () => {
    render(<MediaBox ratio="16:9" media={duplex} />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
  });

  it("loads eagerly and first when it leads the page", () => {
    render(<MediaBox ratio="16:9" media={duplex} priority />);
    const image = screen.getByRole("img");
    expect([image.getAttribute("loading"), image.getAttribute("fetchpriority")]).toEqual(["eager", "high"]);
  });

  it("reserves the image's space with its dimensions", () => {
    render(<MediaBox ratio="16:9" media={duplex} />);
    const image = screen.getByRole("img");
    expect([image.getAttribute("width"), image.getAttribute("height")]).toEqual(["1600", "900"]);
  });

  it("puts the caption under the box with its title as a heading", () => {
    render(<MediaBox ratio="4:5" media={duplex} caption={{title: "Akobo duplex", description: "Handed over in March"}} />);
    expect(screen.getByRole("heading", {level: 3, name: "Akobo duplex"})).toBeInTheDocument();
  });

  it("shows overlay content inside the box", () => {
    render(
      <MediaBox ratio="16:9" media={duplex}>
        <p>Built by Akik</p>
      </MediaBox>
    );
    expect(screen.getByText("Built by Akik")).toBeInTheDocument();
  });
});
