import {Dialog} from "@base-ui/react/dialog";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {AnnouncementBar} from "@/components/header/announcement-bar";
import {FloatingPill} from "@/components/header/floating-pill";
import {MenuButton} from "@/components/header/menu-button";
import {jumpOnClick} from "@/components/header/jump-to-section";
import {NavLinks} from "@/components/header/nav-links";
import {SiteMenu} from "@/components/header/site-menu";
import {WordmarkLink} from "@/components/header/wordmark-link";
import type {NavLink} from "@/lib/home-sections";

type SiteHeaderProps = {
  announcement: {text: string; href: string} | null;
  whatsappHref: string;
  links: NavLink[];
};

/** Whether the full header row has scrolled out of view, which is when the floating pill takes over. */
function useOutOfView() {
  const ref = useRef<HTMLDivElement>(null);
  const [outOfView, setOutOfView] = useState(false);
  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    const observer = new IntersectionObserver(([entry]) => setOutOfView(entry ? !entry.isIntersecting : false));
    observer.observe(row);
    return () => observer.disconnect();
  }, []);
  return {ref, outOfView};
}

// With no built pages to list there is no menu at all, rather than a button that opens an empty panel.
export function SiteHeader({announcement, whatsappHref, links}: SiteHeaderProps) {
  const {ref, outOfView} = useOutOfView();
  const [menu] = useState(() => Dialog.createHandle());
  const hasMenu = links.length > 0;

  return (
    <header>
      <AnnouncementBar announcement={announcement} />
      <Frame>
        <div ref={ref} className="flex h-20 items-center justify-between gap-6">
          <WordmarkLink />
          {hasMenu && (
            <nav aria-label="Main" className="hidden lg:block">
              <NavLinks
                links={links}
                listClassName="flex items-center gap-4 xl:gap-6"
                linkClassName="type-small whitespace-nowrap"
                onNavigate={jumpOnClick}
              />
            </nav>
          )}
          <div className="flex items-center gap-2">
            <Button href={whatsappHref}>Chat on WhatsApp</Button>
            {hasMenu && <MenuButton handle={menu} className="lg:hidden" />}
          </div>
        </div>
      </Frame>
      <FloatingPill visible={outOfView} whatsappHref={whatsappHref} menu={hasMenu ? <MenuButton handle={menu} /> : null} />
      {hasMenu && <SiteMenu handle={menu} links={links} whatsappHref={whatsappHref} />}
    </header>
  );
}
