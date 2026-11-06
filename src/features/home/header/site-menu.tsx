import {Dialog} from "@base-ui/react/dialog";
import {X} from "lucide-react";
import {Button} from "@/components/button/button";
import {ROUND_ICON_BUTTON} from "@/components/button/round-icon-button";
import {Frame} from "@/features/home/frame";
import {NavLinks} from "@/features/home/header/nav-links";
import type {NavLink} from "@/lib/site-nav";

type SiteMenuProps = {handle: Dialog.Handle<unknown>; links: NavLink[]; currentPath: string; whatsappHref: string};

/**
 * The page list as a full-width panel (navigation spec, "Menu on small screens"). Base UI's modal dialog closes it on
 * Escape, keeps focus inside and returns focus to whichever menu button opened it.
 */
export function SiteMenu({handle, links, currentPath, whatsappHref}: SiteMenuProps) {
  return (
    <Dialog.Root handle={handle}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 transition-opacity duration-250 ease-standard data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 top-0 z-50 rounded-b-lg bg-page pt-4 pb-10 transition-opacity duration-250 ease-standard outline-none data-ending-style:opacity-0 data-starting-style:opacity-0">
          <Frame>
            <div className="flex items-center justify-between">
              <Dialog.Title className="type-label text-ink-muted">Menu</Dialog.Title>
              <Dialog.Close aria-label="Close menu" className={ROUND_ICON_BUTTON}>
                <X aria-hidden size={20} strokeWidth={1.5} />
              </Dialog.Close>
            </div>
            <nav aria-label="Menu">
              <NavLinks
                links={links}
                currentPath={currentPath}
                listClassName="mt-8 flex flex-col gap-4"
                linkClassName="type-h2"
                onNavigate={() => handle.close()}
              />
            </nav>
            <div className="mt-10">
              <Button href={whatsappHref}>Chat on WhatsApp</Button>
            </div>
          </Frame>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
