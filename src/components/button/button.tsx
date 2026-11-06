import {cn} from "cn";
import {ArrowRight} from "lucide-react";
import type {ReactNode} from "react";
import {opensInNewTab} from "@/lib/links";

type Variant = "primary" | "secondary" | "on-dark" | "link";

// Only an on-page button can be disabled: every link on this site goes somewhere real.
type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
} & ({href: string; onClick?: never; disabled?: never} | {onClick: () => void; disabled?: boolean; href?: never});

// Shared by every variant. The spec sets button text at `small` size, weight 600.
const BASE =
  "relative inline-flex items-center justify-center gap-2 type-small font-semibold transition-colors ease-standard outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50";

// Pills are 40px on phones and 48px from md up; the ::before layer stretches the tappable area to 44px on phones.
const PILL =
  "h-10 rounded-full px-5 md:h-12 md:px-6 before:absolute before:inset-x-0 before:top-1/2 before:h-11 before:-translate-y-1/2 md:before:h-12";

// `ink` is the darkest token, so hover and press step the fill's opacity rather than move to a darker colour.
const VARIANTS: Record<Variant, string> = {
  primary: cn(PILL, "bg-ink text-on-dark outline-brand-navy hover:bg-ink/85 active:bg-ink/75"),
  secondary: cn(PILL, "border border-ink text-ink outline-brand-navy hover:bg-ink/5 active:bg-ink/10"),
  "on-dark": cn(PILL, "bg-on-dark text-ink outline-on-dark hover:bg-on-dark/85 active:bg-on-dark/75"),
  link: "group min-h-11 rounded-full text-ink outline-brand-navy hover:underline",
};

function LinkArrow() {
  return (
    <span
      aria-hidden
      className="inline-flex size-6 items-center justify-center rounded-full bg-ink text-on-dark transition-colors group-hover:bg-ink/85 in-division:bg-accent in-division:group-hover:bg-accent/85"
    >
      <ArrowRight size={16} strokeWidth={1.5} />
    </span>
  );
}

export function Button({children, variant = "primary", disabled = false, href, onClick}: ButtonProps) {
  const className = VARIANTS[variant];
  const content = (
    <>
      {children}
      {variant === "link" && <LinkArrow />}
    </>
  );

  if (href === undefined) {
    return (
      <button type="button" className={cn(BASE, className)} onClick={onClick} disabled={disabled}>
        {content}
      </button>
    );
  }
  const newTab = opensInNewTab(href);
  return (
    <a href={href} className={cn(BASE, className)} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  );
}
