import {createFileRoute} from "@tanstack/react-router";
import {AboutView} from "@/features/about/view";
import {aboutContent} from "@/lib/content/about";
import {aboutHead} from "@/lib/page-heads";

export const Route = createFileRoute("/about")({
  head: () => aboutHead,
  component: () => <AboutView content={aboutContent} />,
});
