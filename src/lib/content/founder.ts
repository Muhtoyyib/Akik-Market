// The founder's photos, shown on Home and at the top of About. Wrap any value the owner hasn't confirmed in
// placeholder(...) so it shows up in the placeholder report.
import {placeholder} from "@/lib/content-facts";
import {photo, SIZES} from "@/lib/responsive-image";

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in photos the owner will replace.
// Spec (founder): the founder's own photos replace these. The front one is described, the photo stack's spec says.
export const founderPhotos = placeholder([
  photo(
    "/placeholders/founder/founder-phones.jpg",
    {alt: "A tablet and sales papers on a shop desk", width: 512, height: 640},
    SIZES.stackedPhoto
  ),
  photo(
    "/placeholders/founder/founder-building.jpg",
    {alt: "A building going up at sunset, with a crane above it", width: 800, height: 1000},
    SIZES.stackedPhoto
  ),
  photo("/placeholders/founder/founder-road.jpg", {alt: "An open road at sunrise", width: 800, height: 1000}, SIZES.stackedPhoto),
]);
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration
