import {describe, expect, it} from "vite-plus/test";
import {whatsappHref} from "@/lib/whatsapp";

describe("whatsappHref", () => {
  it("opens a chat with the number and a prefilled message", () => {
    expect(whatsappHref("2347065470198", "Hello Akik")).toBe("https://wa.me/2347065470198?text=Hello%20Akik");
  });

  it("encodes characters that would break the link", () => {
    expect(whatsappHref("2347065470198", "Price & availability?")).toBe("https://wa.me/2347065470198?text=Price%20%26%20availability%3F");
  });

  it("drops spaces and the plus sign from the number", () => {
    expect(whatsappHref("+234 706 547 0198", "Hi")).toBe("https://wa.me/2347065470198?text=Hi");
  });
});
