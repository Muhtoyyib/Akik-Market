import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/button/button";
import {Frame} from "@/features/home/frame";
import {AnnouncementBar} from "@/features/home/header/announcement-bar";
import {FloatingPill} from "@/features/home/header/floating-pill";
import {WordmarkLink} from "@/features/home/header/wordmark-link";

type SiteHeaderProps = {
  announcement: {text: string; href: string} | null;
  whatsappHref: string;
};

// Page links (About, the division pages, Projects, News, Contact) and the menu that holds them on small
// screens join the header as those pages ship; with only Home built, the spec leaves them out.
export function SiteHeader({announcement, whatsappHref}: SiteHeaderProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowOutOfView, setRowOutOfView] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(([entry]) => setRowOutOfView(entry ? !entry.isIntersecting : false));
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <AnnouncementBar announcement={announcement} />
      <Frame>
        <div ref={rowRef} className="flex h-20 items-center justify-between">
          <WordmarkLink />
          <Button href={whatsappHref}>Chat on WhatsApp</Button>
        </div>
      </Frame>
      <FloatingPill visible={rowOutOfView} whatsappHref={whatsappHref} />
    </header>
  );
}
