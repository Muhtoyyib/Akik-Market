// The footer's content. Wrap any value the owner hasn't confirmed in placeholder(...) so it shows up in the placeholder report.
import {fromFacts, placeholder, real} from "@/lib/content-facts";
import {visibleColumns} from "@/lib/footer-columns";
import {divisions, social, startYear} from "@/lib/home-divisions";
import {pageExists} from "@/lib/site-pages";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : page names and labels from the spec; tests pin which survive.
const columns = [
  {heading: "Businesses", links: divisions.map((division) => ({label: division.name, href: division.path}))},
  {
    heading: "Company",
    links: [
      {label: "About", href: "/about"},
      {label: "Projects", href: "/projects"},
      {label: "News", href: "/news"},
      {label: "Contact", href: "/contact"},
    ],
  },
  {
    heading: "Follow",
    links: [
      {label: "Instagram", href: social.instagram.value},
      {label: "TikTok", href: social.tiktok.value},
    ],
  },
  {
    heading: "Legal",
    links: [
      {label: "Privacy", href: "/privacy"},
      {label: "Terms", href: "/terms"},
    ],
  },
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export const footer = {
  // Spec (footer counters): only the start year comes from a fact; the other two are invented until the owner counts.
  counters: [
    fromFacts([startYear], {figure: String(startYear.value), label: "Serving Ibadan since"}),
    placeholder({figure: "1,000+", label: "Phones sold"}),
    placeholder({figure: "50+", label: "Cars delivered"}),
  ],
  columns: visibleColumns(columns, pageExists),
  // The area is from the owner's Instagram bio; the year is set at build time (see vitest.shared.ts).
  legal: real(`© ${__BUILD_YEAR__} Akik. Iwo Road, Ibadan.`),
  // Spec (footer wordmark, "Logo source"): typeset in Geist until the owner supplies a vector logo.
  wordmark: placeholder("AKIK"),
};
