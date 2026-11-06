import {ClipboardCheck, FileCheck, Key, Shield, type LucideIcon} from "lucide-react";
import {Button} from "@/components/button/button";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/components/frame/frame";

// The content source names icons from the spec's table; this maps them to Lucide (icons.md: Lucide only).
const ICONS = {shield: Shield, "clipboard-check": ClipboardCheck, "file-check": FileCheck, key: Key} satisfies Record<string, LucideIcon>;

type TrustRow = {icon: keyof typeof ICONS; title: string; line: string};
type TrustProps = {
  heading: string;
  image: {src: string; alt: string; width: number; height: number};
  rows: readonly {value: TrustRow}[];
  whatsappHref: string;
};

const HEADING_ID = "trust-heading";

function Row({icon, title, line}: TrustRow) {
  const Icon = ICONS[icon];
  return (
    <li className="flex gap-4">
      <Icon aria-hidden size={24} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
      <div>
        <h3 className="type-h3 text-ink">{title}</h3>
        <p className="mt-1 type-body text-ink-muted">{line}</p>
      </div>
    </li>
  );
}

/** Matic P8: a 4:5 photo on the left half, the promises and one action on the right; stacked on phones, photo first. */
export function Trust({heading, image, rows, whatsappHref}: TrustProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-6">
          <MediaBox ratio="4:5" media={{kind: "image", ...image}} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id={HEADING_ID} className="type-h2 text-ink">
            {heading}
          </h2>
          <ul className="mt-8 flex flex-col gap-8 md:mt-10">
            {rows.map((row) => (
              <Row key={row.value.title} {...row.value} />
            ))}
          </ul>
          <div className="mt-10">
            <Button href={whatsappHref}>Chat on WhatsApp</Button>
          </div>
        </div>
      </Frame>
    </section>
  );
}
