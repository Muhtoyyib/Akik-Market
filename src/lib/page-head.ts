// Every page's head, set one way (site page-metadata spec). No og:image, canonical URL or absolute link until the
// production domain is decided: each needs an absolute URL.
import {getPageTitle} from "@/lib/site-config";

// Spec (page-metadata, "Title and description"): search results cut longer descriptions.
const MAX_DESCRIPTION = 160;

type PageHeadInput = {
  description: string;
  type?: "website" | "article";
  structuredData?: object[];
  noindex?: boolean;
} & ({name: string} | {title: string});

/** Title, description, link-preview tags and structured data for one page. Home passes its own `title`. */
export function pageHead(input: PageHeadInput) {
  const {description, type = "website", structuredData = [], noindex = false} = input;
  const title = "title" in input ? input.title : getPageTitle(input.name);
  if (description.length > MAX_DESCRIPTION) {
    throw new Error(`${title}: description is ${description.length} characters, over ${MAX_DESCRIPTION}`);
  }
  // An item page previews under the item's own title, the way a shared article does.
  const previewTitle = type === "article" && "name" in input ? input.name : title;
  return {
    meta: [
      {title},
      {name: "description", content: description},
      ...(noindex ? [{name: "robots", content: "noindex"}] : []),
      {property: "og:type", content: type},
      {property: "og:title", content: previewTitle},
      {property: "og:description", content: description},
      {name: "twitter:card", content: "summary"},
    ],
    scripts: structuredData.map((data) => ({type: "application/ld+json", children: JSON.stringify(data)})),
  };
}
