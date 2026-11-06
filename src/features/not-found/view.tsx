import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {notFoundContent} from "@/lib/content/not-found";
import {siteContent} from "@/lib/content/site";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

const PATH = "/404";

/** What an unknown path shows (site not-found spec): the shared shell, one heading, a line, Home and WhatsApp. */
export function NotFoundView() {
  const {heading, line, home} = notFoundContent;
  return (
    <PageLayout links={pageNav(PATH, pageExists)}>
      <Frame>
        <section className="pt-24 md:pt-36">
          <SectionHeader level={1} heading={heading.value} description={line.value} />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={siteContent.whatsapp.main.href}>Chat on WhatsApp</Button>
            <Button href={home.value.href} variant="secondary">
              {home.value.label}
            </Button>
          </div>
        </section>
      </Frame>
    </PageLayout>
  );
}
