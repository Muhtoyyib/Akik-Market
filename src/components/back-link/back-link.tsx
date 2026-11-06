import {ArrowLeft} from "lucide-react";

const BACK_LINK =
  "inline-flex min-h-11 items-center gap-2 type-small font-semibold text-ink underline-offset-4 outline-offset-2 outline-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-solid";

/** The text link from an item page to its collection ("All projects", "All news"), with a 44px touch target. */
export function BackLink({href, label}: {href: string; label: string}) {
  return (
    <a href={href} className={BACK_LINK}>
      <ArrowLeft aria-hidden size={16} strokeWidth={1.5} />
      {label}
    </a>
  );
}
