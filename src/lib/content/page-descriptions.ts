// Every page's search description, on its own. Each route's head reads it from here, and route heads end up in the
// JavaScript every page loads, so this file stays small: a description here never pulls in a page's whole content
// (measured: keeping page content out of the heads took the heaviest page from 174.9 to about 170 KB).
import {placeholder, real} from "@/lib/content-facts";

// Stryker disable StringLiteral : descriptions from each page's spec; page-head tests check length and title.
export const pageDescriptions = {
  about: real("How Akik grew from Phones & Gadgets into Engineering & Real Estate, then Autos, all from one shop on Iwo Road, Ibadan."),
  phones: placeholder("Original phones, laptops and accessories with warranty, plus trade-ins and repairs, at Akik on Iwo Road, Ibadan."),
  engineering: placeholder("Homes built and sold, land with verified papers, and building and renovation, from Akik on Iwo Road, Ibadan."),
  autos: placeholder("Inspected cars with checked papers and honest prices, with test drives welcome, at Akik on Iwo Road, Ibadan."),
  projects: real("Homes and estates Akik has built and handed over in Ibadan, with the facts and photos of each."),
};
// Stryker restore StringLiteral
