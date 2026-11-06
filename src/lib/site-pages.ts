// Every route that ships must be listed here so the build prerenders it to static HTML (site page-registration spec).
// vite.config.ts loads this file through Vite, so it may import content modules for their slugs.

type Collection = {base: string; slugs: readonly string[]};

// Lowercase words or numbers joined by single hyphens.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Prerendered as 404.html, which the host serves on unknown paths (wrangler.jsonc); no page links to it. */
export const NOT_FOUND_PATH = "/404";

const STATIC_PAGES = ["/", "/phones-and-gadgets", "/engineering", "/autos", NOT_FOUND_PATH, "/design-system"];

// A collection's item pages, for each collection whose `$slug` route is built. The News pages add
// {base: "/news", slugs: posts.map((post) => post.slug)} with their route.
const COLLECTIONS: Collection[] = [];

/** One path per item, after checking every slug is well formed and used once. */
export function collectionPaths(base: string, slugs: readonly string[]): string[] {
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (!SLUG.test(slug)) throw new Error(`${base}: slug ${slug} must be lowercase words joined by hyphens`);
    if (seen.has(slug)) throw new Error(`${base}: slug ${slug} is used twice`);
    seen.add(slug);
  }
  return slugs.map((slug) => `${base}/${slug}`);
}

/** The static pages, then every built collection's item pages. */
export function prerenderList(pages: readonly string[], collections: readonly Collection[]): string[] {
  return [...pages, ...collections.flatMap(({base, slugs}) => collectionPaths(base, slugs))];
}

export const prerenderPathnames: readonly string[] = prerenderList(STATIC_PAGES, COLLECTIONS);

/** Whether a page has shipped, so links to pages not built yet can fall back to something real. */
export function pageExists(pathname: string): boolean {
  return prerenderPathnames.includes(pathname);
}

/**
 * The route the app renders for a path. On an unknown path the host serves 404.html, which was rendered as the 404
 * route; the client router must render that same route there, or hydration fails (React error 418).
 */
export function routedPath(pathname: string): string {
  // The prerenderer asks for "/design-system/"; the host serves the same page without the slash.
  const page = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return pageExists(page) ? pathname : NOT_FOUND_PATH;
}
