// Pure rules for the Projects pages: order, filter tabs and related projects (projects-pages design D1, D3).
import {relatedItems} from "@/lib/related";

type Ordered = {slug: string; type: string; completed: string};

/** Newest first by completion date (YYYY-MM), without changing the collection itself. */
export function newestFirst<T extends Ordered>(projects: readonly T[]): T[] {
  return [...projects].sort((a, b) => b.completed.localeCompare(a.completed));
}

/** The types that have at least one project, in the given order: a type with no projects gets no tab. */
export function presentTypes<K extends string>(projects: readonly Ordered[], order: readonly K[]): K[] {
  return order.filter((type) => projects.some((project) => project.type === type));
}

/** Up to three other projects: the newest of the same type, then the newest of any type. */
export function relatedProjects<T extends Ordered>(current: T, projects: readonly T[]): T[] {
  return relatedItems(current, projects, (project) => ({id: project.slug, group: project.type, date: project.completed}));
}
