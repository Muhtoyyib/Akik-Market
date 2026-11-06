import {describe, expect, it} from "vite-plus/test";
import {enquiryErrors, enquiryMailto, enquiryText, MESSAGE_MAX, type Enquiry} from "@/lib/enquiry";

const valid: Enquiry = {business: "engineering", name: "Ada", topic: "A plot in Akobo", message: "Is the plot still available?"};

describe("enquiryErrors", () => {
  it("finds nothing wrong with a complete enquiry", () => {
    expect(enquiryErrors(valid)).toEqual({});
  });

  it("asks for a business, a name and a message when they're missing, but not a topic", () => {
    expect(enquiryErrors({business: "", name: "", topic: "", message: ""})).toEqual({
      business: "Choose a business",
      name: "Write your name",
      message: "Write your message",
    });
  });

  it("treats a name or message of only spaces as missing", () => {
    expect(enquiryErrors({...valid, name: "  ", message: "\n "})).toEqual({name: "Write your name", message: "Write your message"});
  });

  it("allows a message of exactly the limit and refuses one character more", () => {
    expect([
      enquiryErrors({...valid, message: "a".repeat(MESSAGE_MAX)}),
      enquiryErrors({...valid, message: "a".repeat(MESSAGE_MAX + 1)}),
    ]).toEqual([{}, {message: "Keep your message to 1,000 characters"}]);
  });
});

describe("enquiryText", () => {
  it("introduces the visitor, names the topic and the business, then gives the message", () => {
    expect(enquiryText(valid, "Engineering & Real Estate")).toBe(
      "Hello Akik Engineering & Real Estate, I'm Ada.\nAbout: A plot in Akobo\n\nIs the plot still available?"
    );
  });

  it("trims the spaces around a topic", () => {
    expect(enquiryText({...valid, topic: "  A plot in Akobo  "}, "Engineering & Real Estate")).toContain("\nAbout: A plot in Akobo\n");
  });

  it("leaves out the topic line when there is no topic, and trims what was typed", () => {
    expect(enquiryText({...valid, name: " Ada ", topic: " ", message: " Hi \n"}, "Autos")).toBe("Hello Akik Autos, I'm Ada.\n\nHi");
  });
});

describe("enquiryMailto", () => {
  it("addresses the email, with the business in the subject and the text as the body", () => {
    expect(enquiryMailto("akikmarket@gmail.com", "Autos", "Hi & bye")).toBe(
      "mailto:akikmarket@gmail.com?subject=Enquiry%20for%20Akik%20Autos&body=Hi%20%26%20bye"
    );
  });
});
