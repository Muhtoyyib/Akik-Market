// Spec (news, "Header and cards"): Home shows the three newest posts.
const POSTS_ON_HOME = 3;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * "2026-11-06" as "6 NOV 2026". Read from the string, not a Date, so a visitor west of UTC never sees the day before.
 * Dates come from our own content source, always written as YYYY-MM-DD.
 */
export function newsDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** The newest posts first. YYYY-MM-DD strings sort by date as plain text. */
export function latestPosts<T extends {date: string}>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, POSTS_ON_HOME);
}
