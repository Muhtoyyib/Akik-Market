import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {useTypeParam} from "@/components/pill-tabs/use-type-param";
import {ListingPanel} from "@/features/listings/listing-panel";
import type {listingsGrid} from "@/lib/content/listings-page";

type ListingsTabsProps = {tabs: typeof listingsGrid};

/** Homes and Cars, kept in ?type= (design D1); the first tab is the default, and with one kind there are no tabs. */
export function ListingsTabs({tabs}: ListingsTabsProps) {
  const kinds = tabs.map((tab) => tab.kind);
  const {type, select} = useTypeParam(kinds, kinds[0] ?? "");
  const [only] = tabs;
  if (!only) return null;
  if (tabs.length === 1) return <ListingPanel {...only} />;
  return (
    <PillTabs
      label="Listings by kind"
      tabs={tabs.map((tab) => ({value: tab.kind, label: tab.label, panel: <ListingPanel {...tab} />}))}
      value={type}
      onValueChange={select}
    />
  );
}
