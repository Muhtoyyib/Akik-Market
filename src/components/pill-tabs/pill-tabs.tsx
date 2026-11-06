import {Tabs} from "@base-ui/react/tabs";
import {cn} from "cn";
import {useRef, type ReactNode} from "react";
import {scrollLeftToReveal} from "@/lib/reveal-in-track";

type PillTab = {value: string; label: string; panel: ReactNode};

type PillTabsProps = {
  /** Names the tab list for screen readers, for example "Customer stories". */
  label: string;
  tabs: PillTab[];
  surface?: "light" | "dark";
};

const SURFACE = {
  light: {
    track: "bg-card",
    tab: "text-ink data-active:text-on-dark outline-brand-navy",
    indicator: "bg-ink",
  },
  dark: {
    track: "bg-on-dark/10",
    tab: "text-on-dark data-active:text-ink outline-on-dark",
    indicator: "bg-on-dark",
  },
} as const;

/** Moves the track, never the page, so the selected pill is fully visible. */
function revealSelected(list: HTMLElement | null) {
  const selected = list?.querySelector<HTMLElement>("[data-active]");
  if (list && selected) list.scrollLeft = scrollLeftToReveal(list, selected);
}

export function PillTabs({label, tabs, surface = "light"}: PillTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const look = SURFACE[surface];
  return (
    <Tabs.Root defaultValue={tabs[0]?.value} onValueChange={() => requestAnimationFrame(() => revealSelected(listRef.current))}>
      <Tabs.List
        ref={listRef}
        aria-label={label}
        activateOnFocus
        className={cn("relative flex w-max max-w-full overflow-x-auto rounded-full p-1", look.track)}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={cn(
              "relative z-10 h-10 shrink-0 rounded-full px-5 type-small font-semibold whitespace-nowrap transition-colors ease-standard outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid",
              look.tab
            )}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
        {/* Placed by an inline script before React loads, so the selected pill's light text never shows on the bare track. */}
        <Tabs.Indicator
          renderBeforeHydration
          data-pill-indicator
          className={cn("absolute z-0 rounded-full pill-indicator", look.indicator)}
        />
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} className="mt-6">
          {tab.panel}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
