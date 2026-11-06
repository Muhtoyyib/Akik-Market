import {ArrowRight} from "lucide-react";
import {Frame} from "@/components/frame/frame";
import {opensInNewTab} from "@/lib/links";

type Announcement = {text: string; href: string};

export function AnnouncementBar({announcement}: {announcement: Announcement | null}) {
  if (!announcement?.text) return null;
  const newTab = opensInNewTab(announcement.href);
  return (
    <Frame>
      <a
        href={announcement.href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="flex min-h-11 items-center justify-center gap-2 border-b border-line type-small text-ink outline-offset-2 outline-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-solid"
      >
        <span className="truncate">{announcement.text}</span>
        <ArrowRight aria-hidden size={16} strokeWidth={1.5} className="shrink-0" />
      </a>
    </Frame>
  );
}
