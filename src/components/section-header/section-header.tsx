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
};

export function SectionHeader({heading, eyebrow, description, action, level = 2, align = "center"}: SectionHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start text-start")}>
      {eyebrow && <p className="mb-3 type-label text-ink-muted in-division:text-accent">{eyebrow}</p>}
      <Heading className={level === 1 ? "type-display" : "type-h2"}>{heading}</Heading>
      {description && <p className="mt-4 max-w-prose type-body-lg text-ink-muted">{description}</p>}
      {action && (
        <div className="mt-6">
          <Button href={action.href} variant="link">
            {action.label}
          </Button>
        </div>
      )}
    </header>
  );
}
