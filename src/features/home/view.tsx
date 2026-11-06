import {lazy, Suspense} from "react";
import {PageLayout} from "@/components/page-layout/page-layout";
import {DIVISIONS_HEADING_ID, Divisions} from "@/features/home/divisions/divisions";
import {Featured} from "@/features/home/featured/featured";
import {Founder} from "@/features/home/founder/founder";
import {Hero} from "@/components/hero/hero";
import {LinkBanner} from "@/components/link-banner/link-banner";
import {News} from "@/features/home/news/news";
import {Stories} from "@/components/stories/stories";
import {Visit} from "@/components/visit/visit";
import {Trust} from "@/components/trust/trust";
import {homeContent} from "@/lib/content/home";
import {SECTION_IDS} from "@/lib/home-sections";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";
import {siteContent} from "@/lib/content/site";

// The wall's 29 quotes are 3 KB of script, which put Home over its budget (measured: 173.6 KB against 172). It sits
// below the fold, so it hydrates once its chunk arrives; until then the prerendered wall stays on screen as HTML.
const HomeWall = lazy(() => import("@/features/home/wall/wall").then((module) => ({default: module.HomeWall})));

export function HomeView() {
  const {whatsapp} = siteContent;
  const {hero, divisions, featured, stories, projects, trust, news, founder, visit} = homeContent;
  return (
    <PageLayout links={pageNav("/", pageExists)}>
      <Hero
        media={{kind: "video", ...hero.media.value}}
        heading={hero.heading.value}
        claims={hero.claims.value}
        whatsappHref={whatsapp.main.href}
        seeMoreHref={`#${DIVISIONS_HEADING_ID}`}
      />
      <Divisions eyebrow={divisions.eyebrow.value} heading={divisions.heading.value} cards={divisions.cards} />
      <Featured eyebrow={featured.eyebrow.value} heading={featured.heading.value} tabs={featured.tabs} />
      <Suspense>
        <HomeWall />
      </Suspense>
      <Stories heading={stories.heading.value} tabs={stories.tabs} id={SECTION_IDS.stories} />
      <LinkBanner
        name="Our projects"
        headingId="projects-heading"
        division="engineering"
        eyebrow={projects.eyebrow.value}
        heading={projects.heading.value}
        href={projects.link.href}
        image={projects.image.value}
      />
      <Trust heading={trust.heading.value} image={trust.image.value} rows={trust.rows} whatsappHref={whatsapp.main.href} />
      <News eyebrow={news.eyebrow.value} heading={news.heading.value} posts={news.posts} action={news.action} />
      <Founder photos={founder.photos.value} heading={founder.heading.value} story={founder.story.value} link={founder.link} />
      <Visit
        heading={visit.heading.value}
        address={visit.address.value}
        image={visit.image.value}
        contacts={visit.contacts}
        id={SECTION_IDS.visit}
      />
    </PageLayout>
  );
}
