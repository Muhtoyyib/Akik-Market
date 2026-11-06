import {Controls} from "@/features/design-system/controls";
import {Foundations} from "@/features/design-system/foundations";
import {MediaAndCards} from "@/features/design-system/media-and-cards";

/** Internal review page for the client lead: every token and component. Not linked or in the sitemap. */
export function DesignSystemView() {
  return (
    <main className="mx-auto max-w-360 px-4 py-16 md:px-8 xl:px-16">
      <p className="type-label text-ink-muted">Internal preview · not linked from the site</p>
      <h1 className="mt-3 mb-12 type-display">Design system</h1>
      <Foundations />
      <Controls />
      <MediaAndCards />
    </main>
  );
}
