// The 404 page's words (site not-found spec). The heading is the spec's; neither line states a business fact.
import {real} from "@/lib/content-facts";
import {pageHead} from "@/lib/page-head";

export const notFoundContent = {
  heading: real("We couldn't find that page"),
  line: real("The link may be old, or the page may have moved. Start again from Home, or ask us on WhatsApp."),
  home: real({label: "Back to Home", href: "/"}),
};

export const notFoundHead = pageHead({name: "Page not found", description: notFoundContent.line.value, noindex: true});
