import {cn} from "cn";
import type {MouseEvent} from "react";
import type {NavLink} from "@/lib/home-sections";

type NavLinksProps = {
  links: NavLink[];
  listClassName: string;
  linkClassName: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const LINK = "rounded-sm outline-offset-2 outline-brand-navy transition-colors focus-visible:outline-2 focus-visible:outline-solid";

/** The header's section links, muted until hovered. */
export function NavLinks({links, listClassName, linkClassName, onNavigate}: NavLinksProps) {
  return (
    <ul className={listClassName}>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <a href={link.href} onClick={onNavigate} className={cn(LINK, linkClassName, "text-ink-muted hover:text-ink")}>
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
