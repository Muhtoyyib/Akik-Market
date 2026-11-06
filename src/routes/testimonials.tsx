import {createFileRoute} from "@tanstack/react-router";
import {TestimonialsView} from "@/features/testimonials/view";
import {quoteWall} from "@/lib/content/quote-wall";
import {testimonialsStories} from "@/lib/content/testimonials-page";
import {testimonialsHead} from "@/lib/page-heads";

export const Route = createFileRoute("/testimonials")({
  head: () => testimonialsHead,
  component: () => <TestimonialsView stories={testimonialsStories} wall={quoteWall} />,
});
