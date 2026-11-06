import {cn} from "cn";
import {Button} from "@/components/button/button";

type SectionHeaderProps = {
  heading: string;
  eyebrow?: string;
  description?: string;
  action?: {href: string; label: string};
  /** 1 only when the header opens the page. */
  level?: 1 | 2;
  align?: "center" | "start";
  /** Lets a link such as "See what we do" target the heading; it can then take focus. */
  headingId?: string;
};

export function SectionHeader({heading, eyebrow, description, action, level = 2, align = "center", headingId}: SectionHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start text-start")}>
      {eyebrow && <p className="mb-3 type-label text-ink-muted in-division:text-accent">{eyebrow}</p>}
      <Heading
        id={headingId}
        tabIndex={headingId ? -1 : undefined}
        className={cn(level === 1 ? "type-display" : "type-h2", "outline-none")}
      >
        {heading}
      </Heading>
      {description && <p className="mt-4 max-w-prose type-body-lg text-ink-muted">{description}</p>}
      {action && (
        <div className="mt-6">
          <Button href={action.href} variant="link">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
