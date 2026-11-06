import {describe, expect, it} from "vite-plus/test";
import {homeContent} from "@/lib/home-content";
import {homeHead, localBusiness} from "@/lib/home-head";

const business = localBusiness(homeContent);

describe("homeHead", () => {
  it("titles Home for search and sharing", () => {
    expect(homeHead(homeContent).meta).toContainEqual({title: "Akik · Phones, homes and cars in Ibadan"});
  });

  it("gives search engines and WhatsApp previews a description", () => {
    const description = homeHead(homeContent).meta.find((tag) => "name" in tag && tag.name === "description");
    expect(description).toEqual({name: "description", content: expect.stringContaining("Ibadan")});
  });

  it("gives link previews the same title as the page", () => {
    expect(homeHead(homeContent).meta).toContainEqual({property: "og:title", content: "Akik · Phones, homes and cars in Ibadan"});
  });

  it("marks Home as a website with a text-only preview card until there is a share image", () => {
    const meta = homeHead(homeContent).meta;
    expect([meta, meta.length]).toEqual([
      expect.arrayContaining([
        {property: "og:type", content: "website"},
        {property: "og:description", content: expect.stringContaining("Iwo Road Shopping Complex")},
        {name: "twitter:card", content: "summary"},
      ]),
      6,
    ]);
  });

  it("embeds the structured data as JSON-LD", () => {
    const [script] = homeHead(homeContent).scripts;
    expect([script?.type, JSON.parse(script?.children ?? "{}")]).toEqual(["application/ld+json", business]);
  });
});

describe("localBusiness", () => {
  it("names the business in schema.org's LocalBusiness vocabulary", () => {
    expect([business["@context"], business["@type"], business.name]).toEqual(["https://schema.org", "LocalBusiness", "Akik Market"]);
  });

  it("lists each business as a LocalBusiness department, reached on the main number overall", () => {
    expect([business.telephone, business.department.map((department) => department["@type"])]).toEqual([
      `+${homeContent.whatsapp.main.number.value}`,
      ["LocalBusiness", "LocalBusiness", "LocalBusiness"],
    ]);
  });

  it("describes what Akik sells and where", () => {
    expect(business.description).toBe(
      "Original phones, homes and land with clean papers, and inspected cars. Visit Akik at Iwo Road Shopping Complex, Ibadan, or chat on WhatsApp."
    );
  });

  it("describes the shop at the same address the Visit us section shows", () => {
    expect(business.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Iwo Road Shopping Complex",
      addressLocality: "Ibadan",
      addressCountry: "NG",
    });
  });

  it("lists the three businesses with the numbers the Visit us section shows", () => {
    expect(business.department.map((department) => [department.name, department.telephone])).toEqual(
      homeContent.visit.contacts.map((contact) => [contact.name, `+${contact.number.value}`])
    );
  });

  it("links the real social accounts and email", () => {
    expect([business.sameAs, business.email]).toEqual([
      ["https://www.instagram.com/akikmarket/", "https://www.tiktok.com/@akikmarket"],
      "akikmarket@gmail.com",
    ]);
  });
});
