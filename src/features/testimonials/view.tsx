import {ClosingBlock} from "@/components/closing-block/closing-block";
import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {Stories} from "@/components/stories/stories";
import {QuoteWall} from "@/features/testimonials/quote-wall";
import {testimonialsIndex, testimonialsShare, testimonialsStories, testimonialsWall} from "@/lib/content/testimonials-page";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type TestimonialsViewProps = {stories: typeof testimonialsStories; wall: typeof testimonialsWall};

/** Testimonials: the h1 header, every story, the photo wall of quotes, then the invitation to share a story. */
export function TestimonialsView({stories, wall}: TestimonialsViewProps) {
  const {heading, intro} = testimonialsIndex;
  return (
    <PageLayout links={pageNav("/testimonials", pageExists)}>
      <section aria-labelledby="testimonials-heading" className="pt-12 md:pt-20">
        <Frame>
          <SectionHeader level={1} heading={heading.value} description={intro.value} headingId="testimonials-heading" />
        </Frame>
      </section>
      <Stories heading="Customer stories" tabs={stories} />
      <QuoteWall {...wall} />
      <ClosingBlock heading={testimonialsShare.heading.value} action={testimonialsShare.action.value} href={testimonialsShare.href} />
    </PageLayout>
  );
}
