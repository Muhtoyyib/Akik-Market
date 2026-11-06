import {cn} from "cn";
import type {NavLink} from "@/lib/page-nav";

type NavLinksProps = {
  links: NavLink[];
  listClassName: string;
  linkClassName: string;
  onNavigate?: () => void;
};

const LINK = "rounded-sm outline-offset-2 outline-brand-navy transition-colors focus-visible:outline-2 focus-visible:outline-solid";

/** Header links, muted until hovered; a current page's link in ink and underlined (site page-layout, "Current page"). */
export function NavLinks({links, listClassName, linkClassName, onNavigate}: NavLinksProps) {
  return (
    <ul className={listClassName}>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              onClick={onNavigate}
              className={cn(LINK, linkClassName, link.current ? "text-ink underline underline-offset-4" : "text-ink-muted hover:text-ink")}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
