import {createFileRoute} from "@tanstack/react-router";
import {LegalView} from "@/features/legal/view";
import {privacy} from "@/lib/content/legal";
import {privacyHead} from "@/lib/page-heads";

export const Route = createFileRoute("/privacy")({
  head: () => privacyHead,
  component: () => <LegalView path="/privacy" document={privacy} />,
});
