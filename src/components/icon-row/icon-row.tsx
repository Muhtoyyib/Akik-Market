import {ROW_ICONS, type RowIcon} from "@/components/icon-row/icons";

export type IconRowContent = {icon: RowIcon; title: string; line: string};

/** Matic P8's row: an icon, a title and one line. The list around it decides whether the rows are ordered. */
export function IconRow({icon, title, line}: IconRowContent) {
  const Icon = ROW_ICONS[icon];
  return (
    <li className="flex gap-4">
      <Icon aria-hidden size={24} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
      <div>
        <h3 className="type-h3 text-ink">{title}</h3>
        <p className="mt-1 type-body text-ink-muted">{line}</p>
      </div>
    </li>
  );
}
