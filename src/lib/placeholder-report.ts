import {listPlaceholders} from "@/lib/content-facts";

// Long values (image lists, stories) are cut so each placeholder stays on one readable line.
const MAX_VALUE_LENGTH = 100;

function describe(value: unknown): string {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return text.length > MAX_VALUE_LENGTH ? `${text.slice(0, MAX_VALUE_LENGTH)}…` : text;
}

/**
 * Every placeholder in a page's content, as Markdown grouped by section (each top-level key), for the owner to
 * replace. Spec: home page-shell placeholder report; task 1.2 runs it in CI as a report, not a failure.
 */
export function placeholderReport(content: Record<string, unknown>): string {
  const sections = Object.entries(content)
    .map(([section, value]) => ({section, entries: listPlaceholders(value)}))
    .filter(({entries}) => entries.length > 0);
  const total = sections.reduce((sum, {entries}) => sum + entries.length, 0);
  if (total === 0) return "# Placeholder report: nothing left to replace";

  const lines = [`# Placeholder report: ${total} value${total === 1 ? "" : "s"} to replace`];
  for (const {section, entries} of sections) {
    lines.push("", `## ${section} (${entries.length})`, "");
    lines.push(...entries.map(({path, value}) => `- \`${path || section}\`: ${describe(value)}`));
  }
  return lines.join("\n");
}
