import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {PageLayout} from "@/components/page-layout/page-layout";
import "@/styles/app.css";

// The accent as the browser paints it on an element inside the page content, and on the header's WhatsApp pill.
function paint(division?: "autos") {
  const {container, unmount} = render(
    <PageLayout links={[]} division={division}>
      <p className="text-accent">Eyebrow</p>
    </PageLayout>
  );
  const colours = [container.querySelector("main p")!, container.querySelector("header a[href^='https://wa.me']")!].map(
    (element) => getComputedStyle(element).color
  );
  unmount();
  return colours;
}

describe("PageLayout in a browser", () => {
  it("paints the Autos accent on an Autos page's content and leaves the header as on any other page", () => {
    const [autosAccent, autosHeader] = paint("autos");
    const [defaultAccent, defaultHeader] = paint();
    expect([autosAccent !== defaultAccent, autosHeader === defaultHeader]).toEqual([true, true]);
  });
});
