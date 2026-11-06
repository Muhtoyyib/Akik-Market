import type {ReactNode} from "react";

/** One labelled block of the design-system preview. */
export function PreviewSection({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 type-h2">{title}</h2>
      {children}
    </section>
  );
}
