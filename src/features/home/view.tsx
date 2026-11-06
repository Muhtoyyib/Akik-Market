import {Hero} from "@/features/home/hero/hero";
import {SiteHeader} from "@/features/home/header/site-header";
import {SkipLink} from "@/features/home/skip-link";
import {homeContent} from "@/lib/home-content";

export function HomeView() {
  const {announcement, hero, whatsapp} = homeContent;
  return (
    <>
      <SkipLink />
      <SiteHeader announcement={announcement.value} whatsappHref={whatsapp.main.href} />
      <main id="main" tabIndex={-1} className="pt-4 pb-24 outline-none md:pb-36">
        <Hero media={hero.media.value} heading={hero.heading.value} claims={hero.claims.value} whatsappHref={whatsapp.main.href} />
      </main>
    </>
  );
}
