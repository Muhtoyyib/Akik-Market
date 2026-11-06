import {createFileRoute} from "@tanstack/react-router";
import {LegalView} from "@/features/legal/view";
import {terms} from "@/lib/content/legal";
import {termsHead} from "@/lib/page-heads";

export const Route = createFileRoute("/terms")({
  head: () => termsHead,
  component: () => <LegalView path="/terms" document={terms} />,
});
