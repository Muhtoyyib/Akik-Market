import {cn} from "cn";
import type {ReactNode} from "react";
import {Frame} from "@/components/frame/frame";
import {IconRow, type IconRowContent} from "@/components/icon-row/icon-row";

type IconRowsSectionProps = {
  heading: string;
  rows: readonly {value: IconRowContent}[];
  /** Section ids name what the rows are (services, values), so in-page links and tests can find them. */
  headingId: string;
  children?: ReactNode;
};

const ROW_GRID = "grid gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10";

/** Matic P8 rows without the photo, in two columns from 768px: a business's services or checks, or Akik's values. */
export function IconRowsSection({heading, rows, headingId, children}: IconRowsSectionProps) {
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby={headingId} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={headingId} className="max-w-3xl type-h2 text-ink">
          {heading}
        </h2>
        <ul className={cn(ROW_GRID, "mt-8 md:mt-12")}>
          {rows.map((row) => (
            <IconRow key={row.value.title} {...row.value} />
          ))}
        </ul>
        {children}
      </Frame>
    </section>
  );
}
