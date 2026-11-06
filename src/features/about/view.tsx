import {IconRowsSection} from "@/components/icon-row/icon-rows-section";
import {PageLayout} from "@/components/page-layout/page-layout";
import {ProjectsBanner} from "@/components/projects-banner/projects-banner";
import {Visit} from "@/components/visit/visit";
import {FounderStory} from "@/features/about/founder-story";
import {Team} from "@/features/about/team";
import {Timeline} from "@/features/about/timeline";
import type {aboutContent} from "@/lib/content/about";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

const ABOUT_PATH = "/about";

/** About page spec: founder, timeline, values, team, projects banner, then the shop. */
export function AboutView({content}: {content: typeof aboutContent}) {
  const {founder, timeline, values, team, projectsBanner, visit} = content;
  return (
    <PageLayout links={pageNav(ABOUT_PATH, pageExists)}>
      <FounderStory photos={founder.photos.value} heading={founder.heading.value} name={founder.name.value} story={founder.story.value} />
      <Timeline eyebrow={timeline.eyebrow.value} heading={timeline.heading.value} chapters={timeline.chapters} />
      <IconRowsSection heading={values.heading.value} rows={values.rows} headingId="values-heading" />
      <Team heading={team.heading.value} people={team.people} />
      <ProjectsBanner
        eyebrow={projectsBanner.eyebrow.value}
        heading={projectsBanner.heading.value}
        href={projectsBanner.link.href}
        image={projectsBanner.image.value}
      />
      <Visit heading={visit.heading.value} address={visit.address.value} image={visit.image.value} contacts={visit.contacts} />
    </PageLayout>
  );
}
