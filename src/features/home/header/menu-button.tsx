import {Dialog} from "@base-ui/react/dialog";
import {cn} from "cn";
import {Menu} from "lucide-react";
import {ROUND_ICON_BUTTON} from "@/components/button/round-icon-button";

type MenuButtonProps = {handle: Dialog.Handle<unknown>; className?: string};

/** A round button that opens the site menu. The header row and the floating pill each have one, sharing one menu. */
export function MenuButton({handle, className}: MenuButtonProps) {
  return (
    <Dialog.Trigger handle={handle} aria-label="Menu" className={cn(ROUND_ICON_BUTTON, className)}>
      <Menu aria-hidden size={20} strokeWidth={1.5} />
    </Dialog.Trigger>
  );
}
