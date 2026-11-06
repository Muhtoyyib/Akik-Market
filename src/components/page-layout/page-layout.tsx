import type {ReactNode} from "react";
import {Footer} from "@/components/footer/footer";
import {SiteHeader} from "@/components/header/site-header";
import {SkipLink} from "@/components/skip-link/skip-link";
import type {BusinessKey} from "@/lib/content/business";
import {siteContent} from "@/lib/content/site";
import type {NavLink} from "@/lib/page-nav";

type PageLayoutProps = {links: NavLink[]; division?: BusinessKey; children: ReactNode};

/**
 * The shell every page shares (site page-layout spec): skip link, header, one main and the footer. A page that belongs
 * to one business sets its accent on main only, so the header and footer look the same everywhere. The shell's content
 * is site-wide, so it is read here once rather than passed in by every page.
 */
export function PageLayout({links, division, children}: PageLayoutProps) {
  const {announcement, whatsapp, footer} = siteContent;
  return (
    <>
      <SkipLink />
      <SiteHeader announcement={announcement.value} whatsappHref={whatsapp.main.href} links={links} />
      <main id="main" tabIndex={-1} data-division={division} className="pt-4 pb-24 outline-none md:pb-36">
        {children}
      </main>
      <Footer
        counters={footer.counters.map((counter) => counter.value)}
        columns={footer.columns}
        legal={footer.legal.value}
        wordmark={footer.wordmark.value}
      />
    </>
  );
}
