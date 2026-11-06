import {Button} from "@/components/button/button";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {SectionHeader} from "@/components/section-header/section-header";
import type {FeaturedItem} from "@/features/home/featured/item-card";
import {ItemCarousel} from "@/features/home/featured/item-carousel";
import {Frame} from "@/features/home/frame";
import type {OnwardLink} from "@/lib/onward-link";
import {SECTION_IDS} from "@/lib/home-sections";

type FeaturedTab = {
  key: "phones" | "engineering" | "autos";
  label: string;
  action: string;
  link: OnwardLink;
  items: readonly {value: FeaturedItem}[];
};

type FeaturedProps = {eyebrow: string; heading: string; tabs: readonly FeaturedTab[]};

const HEADING_ID = "featured-heading";

/** The panel takes its business's accent (tabs spec, "Accent follows the tab"). */
function Panel({tab}: {tab: FeaturedTab}) {
  return (
    <div data-division={tab.key}>
      <ItemCarousel
        items={tab.items.map((item) => item.value)}
        action={
          <Button href={tab.link.href} variant="link">
            {tab.action}
          </Button>
        }
      />
    </div>
  );
}

/** Tabs only when two or more businesses have items; the content source has already dropped empty ones. */
export function Featured({eyebrow, heading, tabs}: FeaturedProps) {
  const [only] = tabs;
  if (!only) return null;
  const header = <SectionHeader align="start" eyebrow={eyebrow} heading={heading} headingId={HEADING_ID} />;
  return (
    <section id={SECTION_IDS.featured} aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        {tabs.length > 1 ? (
          <PillTabs
            label="Featured items by business"
            header={header}
            tabs={tabs.map((tab) => ({value: tab.key, label: tab.label, panel: <Panel tab={tab} />}))}
          />
        ) : (
          <>
            {header}
            <div className="mt-8 md:mt-12">
              <Panel tab={only} />
            </div>
          </>
        )}
      </Frame>
    </section>
  );
}
