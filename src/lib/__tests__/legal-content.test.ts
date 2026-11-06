import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {footer} from "@/lib/content/footer";
import {privacy, terms} from "@/lib/content/legal";
import {privacyHead, termsHead} from "@/lib/page-heads";
import {pageExists} from "@/lib/site-pages";

const text = (document: typeof privacy, id: string) =>
  document.value.sections
    .find((section) => section.id === id)
    ?.blocks.map((block) => ("text" in block ? block.text : ""))
    .join(" ") ?? "";

describe("the legal content", () => {
  it("builds both pages for the preview and links them in the footer", () => {
    expect([pageExists("/privacy"), pageExists("/terms"), footer.columns.at(-1)?.links.map((link) => link.href)]).toEqual([
      true,
      true,
      ["/privacy", "/terms"],
    ]);
  });

  it("titles the pages Privacy policy · Akik and Terms · Akik", () => {
    expect([privacyHead.meta[0], termsHead.meta[0]]).toEqual([{title: "Privacy policy · Akik"}, {title: "Terms · Akik"}]);
  });

  it("keeps both documents as placeholders in the report until the lawyer's text arrives", () => {
    const paths = listPlaceholders(allContent).map((entry) => entry.path);
    expect(["Legal pages.privacy", "Legal pages.terms"].filter((path) => !paths.includes(path))).toEqual([]);
  });

  it("covers what the privacy spec requires: form data, WhatsApp and email, cookies, and asking about your data", () => {
    expect([
      text(privacy, "what-we-collect"),
      text(privacy, "whatsapp-and-email"),
      text(privacy, "cookies"),
      text(privacy, "your-data"),
    ]).toEqual([
      expect.stringContaining("stores nothing you type"),
      expect.stringContaining("WhatsApp's or your email provider's own privacy policy"),
      expect.stringContaining("no cookies"),
      expect.stringContaining("akikmarket@gmail.com"),
    ]);
  });

  it("says listed prices and items are confirmed before any sale, and where purchases happen", () => {
    expect([text(terms, "listings"), text(terms, "buying")]).toEqual([
      expect.stringContaining("confirmed with you in conversation before any sale"),
      expect.stringContaining("each business's own shop app"),
    ]);
  });

  it("gives every section a unique id, so each contents link lands on one heading", () => {
    const duplicates = [privacy, terms].flatMap((document) => {
      const ids = document.value.sections.map((section) => section.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    expect(duplicates).toEqual([]);
  });
});
