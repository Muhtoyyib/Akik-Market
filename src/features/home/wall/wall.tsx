import {QuoteWall} from "@/components/quote-wall/quote-wall";
import {quoteWall} from "@/lib/content/quote-wall";

/** Home's photo wall: the same wall as Testimonials, with its content, so Home can load both after the page is ready. */
export function HomeWall() {
  return <QuoteWall {...quoteWall} />;
}
