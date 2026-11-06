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
  /** A section header that shares the tabs' row from lg up and sits above them on smaller screens. */
  header?: ReactNode;
  /** Floats the tabs over the bottom centre of the panel, for panels that are a media box (Matic P6). */
  overlay?: boolean;
  /** The selected tab, for a page that keeps it elsewhere (the Projects filter keeps it in ?type=). */
  value?: string;
  onValueChange?: (value: string) => void;
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

function listRow(overlay: boolean) {
  if (overlay) return "absolute inset-x-0 bottom-4 z-10 flex justify-center px-4 md:bottom-6";
  return "flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between";
}

function panelSpacing(header: ReactNode, overlay: boolean) {
  if (overlay) return undefined;
  return header ? "mt-8 md:mt-12" : "mt-6";
}

export function PillTabs({label, tabs, surface = "light", header, overlay = false, value, onValueChange}: PillTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const look = SURFACE[surface];
  return (
    <Tabs.Root
      defaultValue={tabs[0]?.value}
      value={value}
      onValueChange={(next: string) => {
        onValueChange?.(next);
        requestAnimationFrame(() => revealSelected(listRef.current));
      }}
      className={overlay ? "relative" : undefined}
    >
      <div className={listRow(overlay)}>
        {header}
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
      </div>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} className={panelSpacing(header, overlay)}>
          {tab.panel}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
