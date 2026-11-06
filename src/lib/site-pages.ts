// Every route that ships must be listed here so the build prerenders it to static HTML.
export const prerenderPathnames: readonly string[] = ["/", "/design-system"];

/** Whether a page has shipped, so links to pages not built yet can fall back to something real. */
export function pageExists(pathname: string): boolean {
  return prerenderPathnames.includes(pathname);
}
