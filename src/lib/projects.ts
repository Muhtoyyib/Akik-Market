// Pure rules for the Projects pages: order, filter tabs and related projects (projects-pages design D1, D3).

type Ordered = {slug: string; type: string; completed: string};

const ALL = "all";
const RELATED_COUNT = 3;

/** Newest first by completion date (YYYY-MM), without changing the collection itself. */
export function newestFirst<T extends Ordered>(projects: readonly T[]): T[] {
  return [...projects].sort((a, b) => b.completed.localeCompare(a.completed));
}

/** The types that have at least one project, in the given order: a type with no projects gets no tab. */
export function presentTypes<K extends string>(projects: readonly Ordered[], order: readonly K[]): K[] {
  return order.filter((type) => projects.some((project) => project.type === type));
}

/** The tab a shared `?type=` link selects; anything unknown falls back to "all". */
export function typeFromSearch(search: string, types: readonly string[]): string {
  const type = new URLSearchParams(search).get("type") ?? ALL;
  return types.includes(type) ? type : ALL;
}

/** Up to three other projects: the newest of the same type, then the newest of any type. */
export function relatedProjects<T extends Ordered>(current: T, projects: readonly T[]): T[] {
  const others = newestFirst(projects.filter((project) => project.slug !== current.slug));
  const sameType = others.filter((project) => project.type === current.type);
  const rest = others.filter((project) => project.type !== current.type);
  return [...sameType, ...rest].slice(0, RELATED_COUNT);
}
