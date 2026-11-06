import {cn} from "cn";
import type {ReactNode} from "react";
import {Button} from "@/components/button/button";

type FloatingPillProps = {visible: boolean; whatsappHref: string; menu: ReactNode};

/** The compact header that takes over once the full header has scrolled away. Hidden means inert, so it can't take focus. */
export function FloatingPill({visible, whatsappHref, menu}: FloatingPillProps) {
  return (
    <div
      data-floating-pill
      inert={!visible}
      className={cn(
        "fixed top-4 right-4 z-40 flex items-center gap-1 rounded-full bg-card p-1 shadow-float transition-opacity duration-250 ease-standard md:top-6 md:right-6",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {menu}
      <Button href={whatsappHref}>Chat on WhatsApp</Button>
    </div>
  );
}
