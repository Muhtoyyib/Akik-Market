import axe from "axe-core";

/** Runs axe on a rendered element and returns the rule ids that failed, so a test can assert an empty list. */
export async function axeViolations(element: Element): Promise<string[]> {
  const results = await axe.run(element);
  return results.violations.map((violation) => violation.id);
}
