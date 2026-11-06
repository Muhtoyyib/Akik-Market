import {cn} from "cn";
import type {MouseEvent} from "react";
import type {NavLink} from "@/lib/site-nav";

type NavLinksProps = {
  links: NavLink[];
  currentPath: string;
  listClassName: string;
  linkClassName: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const LINK = "rounded-sm outline-offset-2 outline-brand-navy transition-colors focus-visible:outline-2 focus-visible:outline-solid";

/** Page links with the current page marked (navigation spec, "Current page"): ink and underlined, the rest muted. */
export function NavLinks({links, currentPath, listClassName, linkClassName, onNavigate}: NavLinksProps) {
  return (
    <ul className={listClassName}>
      {links.map((link) => {
        const current = link.href === currentPath;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={cn(LINK, linkClassName, current ? "text-ink underline underline-offset-4" : "text-ink-muted hover:text-ink")}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
