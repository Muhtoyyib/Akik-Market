import {DIVISIONS_HEADING_ID, Divisions} from "@/features/home/divisions/divisions";
import {Featured} from "@/features/home/featured/featured";
import {Hero} from "@/features/home/hero/hero";
import {SiteHeader} from "@/features/home/header/site-header";
import {SkipLink} from "@/features/home/skip-link";
import {homeContent} from "@/lib/home-content";

export function HomeView() {
  const {announcement, hero, whatsapp, divisions, featured} = homeContent;
  return (
    <>
      <SkipLink />
      <SiteHeader announcement={announcement.value} whatsappHref={whatsapp.main.href} />
      <main id="main" tabIndex={-1} className="pt-4 pb-24 outline-none md:pb-36">
        <Hero
          media={hero.media.value}
          heading={hero.heading.value}
          claims={hero.claims.value}
          whatsappHref={whatsapp.main.href}
          seeMoreHref={`#${DIVISIONS_HEADING_ID}`}
        />
        <Divisions eyebrow={divisions.eyebrow.value} heading={divisions.heading.value} cards={divisions.cards} />
        <Featured eyebrow={featured.eyebrow.value} heading={featured.heading.value} tabs={featured.tabs} />
      </main>
    </>
  );
}
