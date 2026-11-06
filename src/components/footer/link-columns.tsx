import type {FooterColumn} from "@/lib/footer-columns";
import {opensInNewTab} from "@/lib/links";

const LINK = "rounded-sm type-small outline-offset-2 outline-on-dark hover:underline focus-visible:outline-2 focus-visible:outline-solid";

/** Matic P11 link columns; the content has already left out links to pages that aren't built. */
export function LinkColumns({columns}: {columns: FooterColumn[]}) {
  return (
    <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {columns.map((column) => (
        <div key={column.heading}>
          <h2 className="type-label">{column.heading}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {column.links.map((link) => {
              const newTab = opensInNewTab(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={newTab ? "_blank" : undefined}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    className={LINK}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
