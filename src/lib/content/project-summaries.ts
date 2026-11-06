// Each project's slug, name and description, on their own. The page list prerenders a page per slug and every page's
// JavaScript includes it; each project page's head reads its name and description from here. The full collection
// (projects.ts) adds the rest, so the stories and photos load only on the Projects pages (measured: 2.3 KB on Home
// when the page list imported the whole collection).
import {placeholder} from "@/lib/content-facts";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in projects the owner will replace.
export const projectSummaries = placeholder([
  {
    slug: "bodija-duplex",
    name: "Bodija Duplex",
    description: "A four-bedroom duplex in Bodija, built from the foundation up and handed over with every document in the owner's name.",
  },
  {
    slug: "oluyole-court",
    name: "Oluyole Court",
    description:
      "Eight family homes in a gated court in Oluyole, with a shared gate, drainage and power built in before the first key was handed over.",
  },
  {
    slug: "akobo-bungalow",
    name: "Akobo Bungalow",
    description: "A three-bedroom bungalow in Akobo for a couple moving back to Ibadan, built while they were still abroad.",
  },
  {
    slug: "ring-road-apartments",
    name: "Ring Road Apartments",
    description: "Twelve flats on Ring Road, close to the shops and the main road, sold with clean papers and a clear service charge.",
  },
  {
    slug: "alakia-family-home",
    name: "Alakia Family Home",
    description: "A family home in Alakia, built on the owner's own land in seven months, with weekly site updates.",
  },
  {
    slug: "jericho-villa",
    name: "Jericho Villa",
    description: "A five-bedroom villa in Jericho with a terrace and a pool, handed over with its approvals and survey.",
  },
] as const);
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export type ProjectSlug = (typeof projectSummaries.value)[number]["slug"];
