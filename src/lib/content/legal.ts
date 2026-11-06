// The privacy policy and terms (legal-pages specs). Both are drafts until the owner's lawyer supplies the text
// (design D1): they say only what the site itself does, and each page shows a draft notice while it's a placeholder.
import {placeholder} from "@/lib/content-facts";
import {address, email, mainNumber} from "@/lib/content/business";
import type {Block} from "@/lib/content/news-bodies";
import {localPhone} from "@/lib/phone";

type Section = {id: string; heading: string; blocks: Block[]};
export type LegalDocument = {name: string; updated: string; sections: Section[]};

const p = (text: string): Block => ({kind: "paragraph", text});
const shop = `${address.value.street}, ${address.value.city}`;
const reach = `email ${email.value} or WhatsApp ${localPhone(mainNumber.value)}`;

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : draft text the owner's lawyer will replace; tests pin the topics.
export const privacy = placeholder<LegalDocument>({
  name: "Privacy policy",
  updated: "2026-11-06",
  sections: [
    {id: "who-we-are", heading: "Who we are", blocks: [p(`This website belongs to Akik, at ${shop}. You can reach us by ${reach}.`)]},
    {
      id: "what-we-collect",
      heading: "What this website collects",
      blocks: [
        p("This website has no accounts and stores nothing you type into it."),
        p(
          "The Contact form is not sent to us by the website. It writes your message into WhatsApp or your email app, and nothing leaves your device until you press send there."
        ),
      ],
    },
    {
      id: "whatsapp-and-email",
      heading: "WhatsApp and email",
      blocks: [
        p(
          "Every chat link and the Contact form open WhatsApp or your email app. Once you send a message, WhatsApp's or your email provider's own privacy policy applies to it."
        ),
        p("We use what you send us to answer you and to arrange what you ask about. We don't sell it."),
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and analytics",
      blocks: [
        p("This website sets no cookies and runs no analytics or advertising trackers. If that changes, we will update this policy first."),
      ],
    },
    {
      id: "hosting",
      heading: "Hosting",
      blocks: [
        p(
          "Our hosting provider may keep standard server logs, such as the address a request came from and the page asked for, to run and protect the website."
        ),
      ],
    },
    {
      id: "other-sites",
      heading: "Other websites",
      blocks: [p("Links to Instagram, TikTok, WhatsApp and Google Maps take you to those services, under their own privacy policies.")],
    },
    {
      id: "your-data",
      heading: "Your data and how to ask about it",
      blocks: [p(`You can ask us what we hold about you from your messages, and ask us to correct or delete it. To do that, ${reach}.`)],
    },
    {id: "changes", heading: "Changes to this policy", blocks: [p("When we change this policy, the date at the top changes with it.")]},
  ],
});

export const terms = placeholder<LegalDocument>({
  name: "Terms",
  updated: "2026-11-06",
  sections: [
    {
      id: "who-we-are",
      heading: "Who runs this website",
      blocks: [p(`This website is run by Akik, at ${shop}. The registered company name and number will be added here.`)],
    },
    {
      id: "what-it-is",
      heading: "What this website is",
      blocks: [
        p(
          "This website tells you about Akik's three businesses: Phones & Gadgets, Engineering & Real Estate, and Autos. You can't buy anything on it."
        ),
      ],
    },
    {
      id: "listings",
      heading: "Listings and prices",
      blocks: [
        p(
          "Listed items and prices are previews. Each is confirmed with you in conversation before any sale, and items can sell or change in the meantime."
        ),
      ],
    },
    {
      id: "buying",
      heading: "Buying from Akik",
      blocks: [p("Purchases happen in person at the shop or in each business's own shop app, under that app's terms.")],
    },
    {id: "photos", heading: "Photos", blocks: [p("Some photos show the kind of item or work we offer rather than the exact one listed.")]},
    {
      id: "other-sites",
      heading: "Links to other websites",
      blocks: [p("Links to WhatsApp, Instagram, TikTok and Google Maps take you to services we don't run.")],
    },
    {id: "contact", heading: "Questions", blocks: [p(`For anything about these terms, ${reach}.`)]},
  ],
});
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
