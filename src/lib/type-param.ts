// The tab a page keeps in `?type=` (projects design D1, listings design D1), so a shared link opens on that tab.

/** The tab a `?type=` link selects; anything missing or unknown selects the fallback. */
export function typeFromSearch(search: string, types: readonly string[], fallback: string): string {
  const type = new URLSearchParams(search).get("type") ?? fallback;
  return types.includes(type) ? type : fallback;
}

/** The address after choosing a tab: `?type=` names it, and a tab that isn't a type (such as "all") clears it. */
export function withType(href: string, type: string, types: readonly string[]): URL {
  const url = new URL(href);
  if (types.includes(type)) url.searchParams.set("type", type);
  else url.searchParams.delete("type");
  return url;
}
