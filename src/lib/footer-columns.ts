export type FooterLink = {label: string; href: string};
export type FooterColumn = {heading: string; links: FooterLink[]};

// Our own pages start with "/"; anything else is another site and is always there.
const isOwnPage = (href: string) => href.startsWith("/");

/** Spec (footer link-columns, "Columns"): drop links to unbuilt pages, then any column they leave empty. */
export function visibleColumns(columns: FooterColumn[], exists: (path: string) => boolean): FooterColumn[] {
  return columns
    .map((column) => ({...column, links: column.links.filter((link) => !isOwnPage(link.href) || exists(link.href))}))
    .filter((column) => column.links.length > 0);
}
