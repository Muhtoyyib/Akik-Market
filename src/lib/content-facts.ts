/** A piece of business content and whether it is a stand-in until the owner supplies the real value. */
export type Fact<T> = {readonly value: T; readonly placeholder: boolean};

export function real<T>(value: T): Fact<T> {
  return {value, placeholder: false};
}

export function placeholder<T>(value: T): Fact<T> {
  return {value, placeholder: true};
}

/** A value built from other facts is a placeholder if any of them is. */
export function fromFacts<T>(sources: Fact<unknown>[], value: T): Fact<T> {
  return {value, placeholder: sources.some((source) => source.placeholder)};
}

function isFact(node: object): node is Fact<unknown> {
  return "value" in node && "placeholder" in node && Object.keys(node).length === 2;
}

/** Every placeholder in a content tree, with its dotted path, for the placeholder report. */
export function listPlaceholders(node: unknown, path: string[] = []): {path: string; value: unknown}[] {
  if (typeof node !== "object" || node === null) return [];
  if (isFact(node)) return node.placeholder ? [{path: path.join("."), value: node.value}] : [];
  return Object.entries(node).flatMap(([key, child]) => listPlaceholders(child, [...path, key]));
}
