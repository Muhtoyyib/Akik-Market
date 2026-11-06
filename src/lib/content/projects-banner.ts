// The banner into the Projects page, shown on Home and the Engineering page (projects-banner spec).
import {placeholder, real} from "@/lib/content-facts";
import {business, whatsappTo} from "@/lib/content/business";
import {onwardLink} from "@/lib/onward-link";
import {photo, SIZES} from "@/lib/responsive-image";
import {pageExists} from "@/lib/site-pages";

// Stryker disable next-line StringLiteral : the path matters only once the Projects page ships; projects-pages tests the link.
const PROJECTS_PATH = "/projects";
const engineering = business("engineering");

// Stryker disable StringLiteral : copy from the projects-banner spec; tests pin the link rule.
// Spec (projects-banner, "Link target"): until the Projects page exists the heading says where the card really goes.
export const projectsBanner = {
  eyebrow: real(engineering.name),
  heading: pageExists(PROJECTS_PATH) ? placeholder("Homes we've built and handed over") : real("Ask about our projects on WhatsApp"),
  link: onwardLink(PROJECTS_PATH, whatsappTo(engineering.number.value, "your projects")),
  // Not an Akik building; alt stays empty so the page doesn't claim it is. Source in docs/placeholder-media.md.
  image: placeholder(photo("/placeholders/projects-house.jpg", {alt: "", width: 1024, height: 768}, SIZES.fullWidth)),
};
// Stryker restore StringLiteral
