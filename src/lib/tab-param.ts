// The tab a page keeps in its address (projects, listings and news design D1/D2), so a shared link opens on that tab.

/** Which search param holds the tab, the tabs it may name, and the one shown when it names none of them. */
export type TabParam = {param: string; tabs: readonly string[]; fallback: string};

/** The tab a link such as `?type=cars` selects; anything missing or unknown selects the fallback. */
export function tabFromSearch(search: string, {param, tabs, fallback}: TabParam): string {
  const tab = new URLSearchParams(search).get(param) ?? fallback;
  return tabs.includes(tab) ? tab : fallback;
}

/** The address after choosing a tab: the param names it, and a tab outside the list (such as "all") clears it. */
export function withTab(href: string, tab: string, {param, tabs}: Omit<TabParam, "fallback">): URL {
  const url = new URL(href);
  if (tabs.includes(tab)) url.searchParams.set(param, tab);
  else url.searchParams.delete(param);
  return url;
}
