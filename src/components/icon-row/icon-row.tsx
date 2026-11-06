import {ROW_ICONS, type RowIcon} from "@/components/icon-row/icons";

export type IconRowContent = {icon: RowIcon; title: string; line: string};

/** Matic P8's row: an icon, a title and one line. The list around it decides whether the rows are ordered; `level` keeps
 * the outline unbroken when the rows sit under a group's own h3. */
export function IconRow({icon, title, line, level = 3}: IconRowContent & {level?: 3 | 4}) {
  const Icon = ROW_ICONS[icon];
  const Title = level === 3 ? "h3" : "h4";
  return (
    <li className="flex gap-4">
      <Icon aria-hidden size={24} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
      <div>
        <Title className="type-h3 text-ink">{title}</Title>
        <p className="mt-1 type-body text-ink-muted">{line}</p>
      </div>
    </li>
  );
}
