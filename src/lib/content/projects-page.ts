// The Projects pages' own words and heads. The projects themselves live in the shared collection (projects.ts).
import {placeholder, real} from "@/lib/content-facts";
import {pageDescriptions} from "@/lib/content/page-descriptions";
import {business} from "@/lib/content/business";
import {type Project, projects, PROJECT_TYPES, type ProjectType} from "@/lib/content/projects";
import {newestFirst, presentTypes, relatedProjects} from "@/lib/projects";

// Stryker disable StringLiteral : copy from the projects specs; tests pin the rules around it.
export const projectsIndex = {
  eyebrow: real(business("engineering").name),
  heading: placeholder("Homes we've built and handed over"),
  intro: placeholder("Finished homes and estates across Ibadan, each handed over with its papers."),
  description: pageDescriptions.projects,
};

export const projectEnquiry = {
  heading: placeholder("Thinking of building or buying something like this?"),
  action: real("Ask on WhatsApp"),
};
// Stryker restore StringLiteral

const listed = newestFirst(projects.map((entry) => entry.value));

/** Every project, newest first, and the types that get a tab. */
// `as`: Object.keys widens to string[]; the keys are exactly PROJECT_TYPES's own.
export const projectsGrid = {projects: listed, types: presentTypes(listed, Object.keys(PROJECT_TYPES) as ProjectType[])};

/** The project at this slug. Unknown slugs never reach a project page: the router sends them to /404 (routedPath). */
export function projectBySlug(slug: string): Project {
  return listed.find((project) => project.slug === slug)!;
}

/** One project's page and up to three related projects. */
export function projectPage(slug: string) {
  const project = projectBySlug(slug);
  return {project, related: relatedProjects(project, listed)};
}
