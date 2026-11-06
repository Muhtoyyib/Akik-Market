import {describe, expect, it} from "vite-plus/test";
import {directionsHref} from "@/lib/maps";

describe("directionsHref", () => {
  it("opens the address in the visitor's maps app", () => {
    expect(directionsHref("Iwo Road Shopping Complex, Ibadan")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Iwo%20Road%20Shopping%20Complex%2C%20Ibadan"
    );
  });
});
