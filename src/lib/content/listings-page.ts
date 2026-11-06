// The Listings page's own words. The items themselves live in the shared collection (listings.ts), so a sold item
// removed there leaves this page, Home and its division page together (listings design, "Stale stock").
import {Handshake, Key, MessageCircle} from "lucide-react";
import {placeholder} from "@/lib/content-facts";
import {listings} from "@/lib/content/listings";
import {listingTabs} from "@/lib/listings";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : copy from the listings specs; tests pin the rules around it.
export const listingsIndex = {
  heading: placeholder("Homes and cars for sale now"),
  intro: placeholder("Everything available today. Tap one to ask about it on WhatsApp."),
};

// Spec (enquiry, "What happens next"): placeholders until the owner confirms how a sale goes.
export const listingsNextSteps = {
  heading: placeholder("What happens after you message"),
  rows: [
    placeholder({
      icon: MessageCircle,
      title: "We reply with photos and papers",
      line: "More photos, the full details and every document.",
    }),
    placeholder({icon: Key, title: "You visit or inspect", line: "See the home or test drive the car before you decide."}),
    placeholder({
      icon: Handshake,
      title: "You agree and pay in person",
      line: "One clear price, written down, paid at our office.",
    }),
  ],
};
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

/** Every home and car, one tab per kind with items. */
export const listingsGrid = listingTabs(listings);
