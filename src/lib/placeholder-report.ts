import {type Fact, placeholderFacts} from "@/lib/content-facts";

// Long values (image lists, stories) are cut so each placeholder stays on one readable line.
const MAX_VALUE_LENGTH = 100;

type Entry = {path: string; fact: Fact<unknown>};
type Section = {section: string; entries: Entry[]};
type Page = {page: string; sections: Section[]; count: number};

function describe(value: unknown): string {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return text.length > MAX_VALUE_LENGTH ? `${text.slice(0, MAX_VALUE_LENGTH)}…` : text;
}

/** Each page's placeholders by section. A fact two pages share is kept only under the first, so it is replaced once. */
function collect(pages: Record<string, Record<string, unknown>>): Page[] {
  const seen = new Set<Fact<unknown>>();
  const fresh = (entry: Entry) => {
    if (seen.has(entry.fact)) return false;
    seen.add(entry.fact);
    return true;
  };
  return Object.entries(pages)
    .map(([page, content]) => {
      const sections = Object.entries(content)
        .map(([section, value]) => ({section, entries: placeholderFacts(value).filter(fresh)}))
        .filter(({entries}) => entries.length > 0);
      return {page, sections, count: sections.reduce((sum, {entries}) => sum + entries.length, 0)};
    })
    .filter(({count}) => count > 0);
}

/**
 * Every placeholder in the site's content, as Markdown grouped by page and then section (each top-level key), for the
 * owner to replace. Spec: site content-source, "Placeholders marked and reported"; CI runs it as a report, not a failure.
 */
export function placeholderReport(pages: Record<string, Record<string, unknown>>): string {
  const collected = collect(pages);
  const total = collected.reduce((sum, {count}) => sum + count, 0);
  if (total === 0) return "# Placeholder report: nothing left to replace";

  const lines = [`# Placeholder report: ${total} value${total === 1 ? "" : "s"} to replace`];
  for (const {page, sections, count} of collected) {
    lines.push("", `## ${page} (${count})`);
    for (const {section, entries} of sections) {
      lines.push("", `### ${section} (${entries.length})`, "");
      lines.push(...entries.map(({path, fact}) => `- \`${path || section}\`: ${describe(fact.value)}`));
    }
  }
  return lines.join("\n");
}
