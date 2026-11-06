// Each business with its own copy, as its route passes it to divisionPage, for tests that build several division pages.
import type {BusinessKey} from "@/lib/content/business";
import type {OwnPage} from "@/lib/content/division-page";
import {autosPage} from "@/lib/content/divisions/autos";
import {engineeringPage} from "@/lib/content/divisions/engineering";
import {phonesPage} from "@/lib/content/divisions/phones";

export const OWN_PAGES = {
  phones: {key: "phones", page: phonesPage},
  engineering: {key: "engineering", page: engineeringPage},
  autos: {key: "autos", page: autosPage},
} satisfies Record<BusinessKey, OwnPage>;
