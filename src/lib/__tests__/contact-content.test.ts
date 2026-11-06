import {describe, expect, it} from "vite-plus/test";
import {listPlaceholders} from "@/lib/content-facts";
import {allContent} from "@/lib/content/all-content";
import {contactChannels, contactForm, contactLocation} from "@/lib/content/contact";
import {contactHead} from "@/lib/home-head";
import {pageExists} from "@/lib/site-pages";

const head = contactHead();
const data = JSON.parse(head.scripts[0]?.children ?? "{}");
const meta = (name: string) => head.meta.find((tag) => "name" in tag && tag.name === name);

describe("the Contact content", () => {
  it("is prerendered at /contact", () => {
    expect(pageExists("/contact")).toBe(true);
  });

  it("is titled Contact · Akik, with the address and WhatsApp in its description", () => {
    expect([head.meta[0], meta("description")?.content]).toEqual([
      {title: "Contact · Akik"},
      expect.stringMatching(/Iwo Road Shopping Complex, Ibadan.*WhatsApp/),
    ]);
  });

  it("gives search engines the address and numbers the page shows", () => {
    const {street, city} = contactLocation.address.value;
    expect([
      data["@type"],
      data.address.streetAddress,
      data.address.addressLocality,
      data.department.map((entry: {telephone: string}) => entry.telephone),
    ]).toEqual(["LocalBusiness", street, city, contactChannels.contacts.map((contact) => `+${contact.number.value}`)]);
  });

  it("lists a column per business in growth order", () => {
    expect(contactChannels.contacts.map((contact) => contact.key)).toEqual(["phones", "engineering", "autos"]);
  });

  it("offers the three businesses to choose from in the form, in the same order", () => {
    expect(contactForm.businesses.map((option) => option.value)).toEqual(["phones", "engineering", "autos"]);
  });

  it("lists the page's own copy and the opening hours in the placeholder report", () => {
    const paths = listPlaceholders(allContent).map((entry) => entry.path);
    const wanted = ["Contact page.contactIndex.heading", "Contact page.contactLocation.heading", "Site-wide.business.hours"];
    expect(wanted.filter((path) => !paths.some((found) => found.startsWith(path)))).toEqual([]);
  });
});
