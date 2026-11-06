import {Dialog} from "@base-ui/react/dialog";
import {X} from "lucide-react";
import {type MouseEvent, useRef} from "react";
import {Button} from "@/components/button/button";
import {ROUND_ICON_BUTTON} from "@/components/button/round-icon-button";
import {Frame} from "@/components/frame/frame";
import {jumpToSection, sectionHash, sectionHeading} from "@/components/header/jump-to-section";
import {NavLinks} from "@/components/header/nav-links";
import type {NavLink} from "@/lib/home-sections";

type SiteMenuProps = {handle: Dialog.Handle<unknown>; links: NavLink[]; whatsappHref: string};

/**
 * The page list as a full-width panel (navigation spec, "Menu on small screens"). Base UI's modal dialog closes it on
 * Escape, keeps focus inside and returns focus to whichever menu button opened it.
 *
 * A section link waits for the menu to finish closing: the modal locks page scroll while open, and focus belongs on the
 * section's heading (Base UI's final focus), not back on the menu button.
 */
export function SiteMenu({handle, links, whatsappHref}: SiteMenuProps) {
  const pending = useRef<string | null>(null);
  const choose = (event: MouseEvent<HTMLAnchorElement>) => {
    pending.current = sectionHash(event);
    if (pending.current) event.preventDefault();
    handle.close();
  };
  // The target is cleared on open, not after the jump: Base UI reads finalFocus while unmounting, after this runs.
  const finish = (open: boolean) => {
    if (open) pending.current = null;
    else if (pending.current) jumpToSection(pending.current);
  };
  return (
    <Dialog.Root handle={handle} onOpenChangeComplete={finish}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 transition-opacity duration-250 ease-standard data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className="fixed inset-x-0 top-0 z-50 rounded-b-lg bg-page pt-4 pb-10 transition-opacity duration-250 ease-standard outline-none data-ending-style:opacity-0 data-starting-style:opacity-0"
          finalFocus={() => (pending.current ? sectionHeading(pending.current) : true)}
        >
          <Frame>
            <div className="flex items-center justify-between">
              <Dialog.Title className="type-label text-ink-muted">Menu</Dialog.Title>
              <Dialog.Close aria-label="Close menu" className={ROUND_ICON_BUTTON}>
                <X aria-hidden size={20} strokeWidth={1.5} />
              </Dialog.Close>
            </div>
            <nav aria-label="Menu">
              <NavLinks links={links} listClassName="mt-8 flex flex-col gap-4" linkClassName="type-h2" onNavigate={choose} />
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
