import {ServiceRows} from "@/features/division/service-rows";
import type {IconRowContent} from "@/components/icon-row/icon-row";

type AutosInspectionProps = {
  heading: string;
  rows: readonly {value: IconRowContent}[];
  report: string;
  financing?: {value: {heading: string; terms: string}};
};

/** Autos' own section (autos spec): what every car is checked for, that the report comes first, and financing only when offered. */
export function AutosInspection({heading, rows, report, financing}: AutosInspectionProps) {
  return (
    <ServiceRows heading={heading} rows={rows}>
      <p className="mt-10 max-w-prose type-body-lg text-ink">{report}</p>
      {financing && (
        <div className="mt-12 rounded-md bg-card p-6 md:p-8">
          <h3 className="type-h3 text-ink">{financing.value.heading}</h3>
          <p className="mt-2 type-body text-ink-muted">{financing.value.terms}</p>
        </div>
      )}
    </ServiceRows>
  );
}
