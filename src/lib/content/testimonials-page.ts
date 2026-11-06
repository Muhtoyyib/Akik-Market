// The Testimonials page: its own words, and what it takes from the stories collection (testimonials-page specs). The
// photo wall it shares with Home is in quote-wall.ts.
import {placeholder, real} from "@/lib/content-facts";
import {business, mainWhatsapp} from "@/lib/content/business";
import {stories, type Story} from "@/lib/content/stories";
import {storyTabLabel} from "@/lib/testimonials";
import {whatsappHref} from "@/lib/whatsapp";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : copy and photo picks from the testimonials specs; tests pin the rules.
export const testimonialsIndex = {
  heading: placeholder("What our customers say"),
  intro: placeholder("Phones, homes and cars: the people who bought them, in their own words."),
};

export const testimonialsShare = {
  heading: placeholder("Bought from Akik? Tell us how it went."),
  action: real("Share your story on WhatsApp"),
  // Spec (share, "Share on WhatsApp"): the message is fixed by the spec.
  href: whatsappHref(mainWhatsapp.number.value, "Hello Akik, I'd like to share my story"),
};

// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

/** Every story, one tab each, labelled by business (and first name when a business has several). */
export function storyTabs(all: readonly Story[]) {
  return all.map((entry, index) => {
    const ofBusiness = all.filter((other) => other.business === entry.business).length;
    return {
      key: `${entry.business}-${index}`,
      label: storyTabLabel(business(entry.business).tab, entry.story.value.name, ofBusiness),
      story: entry.story,
    };
  });
}

export const testimonialsStories = storyTabs(stories);
