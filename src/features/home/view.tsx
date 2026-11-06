import {PageLayout} from "@/components/page-layout/page-layout";
import {DIVISIONS_HEADING_ID, Divisions} from "@/features/home/divisions/divisions";
import {Featured} from "@/features/home/featured/featured";
import {Founder} from "@/features/home/founder/founder";
import {Hero} from "@/components/hero/hero";
import {ProjectsBanner} from "@/components/projects-banner/projects-banner";
import {News} from "@/features/home/news/news";
import {Proof} from "@/features/home/proof/proof";
import {Stories} from "@/features/home/stories/stories";
import {Visit} from "@/components/visit/visit";
import {Trust} from "@/components/trust/trust";
import {homeContent} from "@/lib/content/home";
import {SECTION_IDS, sectionLinks} from "@/lib/home-sections";
import {siteContent} from "@/lib/content/site";

export function HomeView() {
  const {whatsapp} = siteContent;
  const {hero, divisions, featured, proof, stories, projects, trust, news, founder, visit} = homeContent;
  // Each flag mirrors the guard that leaves the section out when it has no content; Visit always renders.
  const sections = sectionLinks({
    divisions: divisions.cards.length > 0,
    featured: featured.tabs.length > 0,
    stories: stories.tabs.length > 0,
    news: news.posts.length > 0,
    visit: true,
  });
  return (
    <PageLayout links={sections}>
      <Hero
        media={{kind: "video", ...hero.media.value}}
        heading={hero.heading.value}
        claims={hero.claims.value}
        whatsappHref={whatsapp.main.href}
        seeMoreHref={`#${DIVISIONS_HEADING_ID}`}
      />
      <Divisions eyebrow={divisions.eyebrow.value} heading={divisions.heading.value} cards={divisions.cards} />
      <Featured eyebrow={featured.eyebrow.value} heading={featured.heading.value} tabs={featured.tabs} />
      <Proof heading={proof.heading.value} lead={proof.lead.value} columns={proof.columns} />
      <Stories heading={stories.heading.value} tabs={stories.tabs} />
      <ProjectsBanner
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
