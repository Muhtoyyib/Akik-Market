import {createFileRoute} from "@tanstack/react-router";
import {TestimonialsView} from "@/features/testimonials/view";
import {testimonialsStories, testimonialsWall} from "@/lib/content/testimonials-page";
import {testimonialsHead} from "@/lib/page-heads";

export const Route = createFileRoute("/testimonials")({
  head: () => testimonialsHead,
  component: () => <TestimonialsView stories={testimonialsStories} wall={testimonialsWall} />,
});
