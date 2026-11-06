import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {IconRow, type IconRowContent} from "@/components/icon-row/icon-row";

type Group = {title: {value: string}; rows: readonly {value: IconRowContent}[]};
type PhoneServicesProps = {heading: string; groups: readonly Group[]; brands: readonly string[]; whatsappHref: string};

const HEADING_ID = "services-heading";

/** Phones' own section (phones spec): trade-in, repairs and warranty as groups of rows, the brands as words, one action. */
export function PhoneServices({heading, groups, brands, whatsappHref}: PhoneServicesProps) {
  if (groups.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="max-w-3xl type-h2 text-ink">
          {heading}
        </h2>
        <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-3 lg:gap-6">
          {groups.map((group) => (
            <div key={group.title.value} className="border-t border-line pt-6">
              <h3 className="type-label text-accent">{group.title.value}</h3>
              <ul className="mt-6 flex flex-col gap-8">
                {group.rows.map((row) => (
                  <IconRow key={row.value.title} {...row.value} level={4} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Brands are trademarks: named in text, never shown as logos (phones spec, "Brands in text"). */}
        <h3 className="mt-12 type-label text-ink-muted">Brands we sell</h3>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 type-body-lg text-ink">
          {brands.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappHref}>Ask about a trade-in or repair</Button>
        </div>
      </Frame>
    </section>
  );
}
