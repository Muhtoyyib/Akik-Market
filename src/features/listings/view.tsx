import {Frame} from "@/components/frame/frame";
import {IconRowsSection} from "@/components/icon-row/icon-rows-section";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {ListingsTabs} from "@/features/listings/listings-tabs";
import {listingsIndex, listingsNextSteps, type listingsGrid} from "@/lib/content/listings-page";
import {LISTINGS_PATH} from "@/lib/listings";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type ListingsViewProps = {tabs: typeof listingsGrid};

/** Listings: Matic P3's header with the page's h1, the Homes / Cars tabs and grid, then what happens next (P8 rows). */
export function ListingsView({tabs}: ListingsViewProps) {
  const {heading, intro} = listingsIndex;
  return (
    <PageLayout links={pageNav(LISTINGS_PATH, pageExists)}>
      <section aria-labelledby="listings-heading" className="pt-12 md:pt-20">
        <Frame>
          <SectionHeader level={1} heading={heading.value} description={intro.value} headingId="listings-heading" />
          <div className="mt-12 md:mt-16">
            <ListingsTabs tabs={tabs} />
          </div>
        </Frame>
      </section>
      <IconRowsSection heading={listingsNextSteps.heading.value} rows={listingsNextSteps.rows} headingId="next-steps-heading" />
    </PageLayout>
  );
}
