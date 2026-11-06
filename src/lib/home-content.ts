// Everything Home says about the business. Wrap any value the owner hasn't confirmed in placeholder(...)
// so it shows up in the placeholder report. Approved for the pitch build by the client lead on 2026-11-06.
import {placeholder, real} from "@/lib/content-facts";
import {whatsappHref} from "@/lib/whatsapp";

// Placeholder start year, chosen by the client lead; the owner's Instagram goes back to May 2020.
const startYear = placeholder(2023);

// Both numbers are on the owner's 2023 flyer; which business each belongs to is still unknown.
const mainNumber = placeholder("2347065470198");
const greeting = real("Hello Akik, I'd like to ask about");

export const homeContent = {
  startYear,
  social: {
    // Confirmed from the platforms' own profile data on 2026-11-06.
    instagram: real("https://www.instagram.com/akikmarket/"),
    tiktok: real("https://www.tiktok.com/@akikmarket"),
  },
  whatsapp: {
    main: {number: mainNumber, href: whatsappHref(mainNumber.value, greeting.value)},
  },
  announcement: placeholder({text: "New phones arrive every week. See what just came in", href: "https://www.instagram.com/akikmarket/"}),
  hero: {
    media: placeholder({poster: "/placeholders/hero-poster.jpg", src: "/placeholders/hero-loop.webm"}),
    heading: placeholder("Phones, homes and cars from one name you trust."),
    claims: placeholder(["Original phones", "Inspected cars", "Verified land papers"]),
  },
} as const;
