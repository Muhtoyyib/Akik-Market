export interface Division {
  slug: string;
  name: string;
}

export const siteConfig = {
  name: "Akik",
  divisions: [
    {slug: "phones-and-gadgets", name: "Phones & Gadgets"},
    {slug: "engineering", name: "Engineering & Real Estate"},
    {slug: "autos", name: "Autos"},
  ] satisfies Division[],
} as const;

export function getPageTitle(page?: string): string {
  return page ? `${page} · ${siteConfig.name}` : siteConfig.name;
}
