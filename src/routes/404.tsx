import {createFileRoute} from "@tanstack/react-router";
import {NotFoundView} from "@/features/not-found/view";
import {notFoundHead} from "@/lib/content/not-found";

// Prerendered as 404.html, which the host serves with status 404 for any unknown path (wrangler.jsonc). The router
// renders this route for any unknown path too (router.tsx), so the served page hydrates.
export const Route = createFileRoute("/404")({
  head: () => notFoundHead,
  component: NotFoundView,
});
