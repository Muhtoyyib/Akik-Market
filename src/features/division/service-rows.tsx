import {cn} from "cn";
import type {ReactNode} from "react";
import {Frame} from "@/components/frame/frame";
import {IconRow, type IconRowContent} from "@/components/icon-row/icon-row";

type ServiceRowsProps = {heading: string; rows: readonly {value: IconRowContent}[]; children?: ReactNode};

const HEADING_ID = "services-heading";
const ROW_GRID = "grid gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10";

/** Matic P8 rows without the photo: a business's own services or checks in two columns, then anything it adds. */
export function ServiceRows({heading, rows, children}: ServiceRowsProps) {
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="max-w-3xl type-h2 text-ink">
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
