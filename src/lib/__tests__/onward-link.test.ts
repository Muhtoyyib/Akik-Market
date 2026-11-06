import {describe, expect, it} from "vite-plus/test";
import {onwardLink} from "@/lib/onward-link";

const whatsapp = {href: "https://wa.me/2347065470198?text=Hi", hint: "chat on WhatsApp"};

describe("onwardLink", () => {
  it("goes to the page once it has shipped", () => {
    expect(onwardLink("/", whatsapp)).toEqual({href: "/"});
  });

  it("falls back to something real, and says so, while the page is not built", () => {
    expect(onwardLink("/careers", whatsapp)).toEqual(whatsapp);
  });
});
