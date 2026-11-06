import {DIVISIONS_HEADING_ID, Divisions} from "@/features/home/divisions/divisions";
import {Featured} from "@/features/home/featured/featured";
import {Hero} from "@/features/home/hero/hero";
import {ProjectsBanner} from "@/features/home/projects-banner/projects-banner";
import {Proof} from "@/features/home/proof/proof";
import {Stories} from "@/features/home/stories/stories";
import {Trust} from "@/features/home/trust/trust";
import {SiteHeader} from "@/features/home/header/site-header";
import {SkipLink} from "@/features/home/skip-link";
import {homeContent} from "@/lib/home-content";

export function HomeView() {
  const {announcement, hero, whatsapp, divisions, featured, proof, stories, projects, trust} = homeContent;
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
        <Proof heading={proof.heading.value} lead={proof.lead.value} columns={proof.columns} />
        <Stories heading={stories.heading.value} tabs={stories.tabs} />
        <ProjectsBanner
          eyebrow={projects.eyebrow.value}
          heading={projects.heading.value}
          href={projects.link.href}
          image={projects.image.value}
        />
        <Trust heading={trust.heading.value} image={trust.image.value} rows={trust.rows} whatsappHref={whatsapp.main.href} />
      </main>
    </>
  );
}
