import {BodyBlocks} from "@/components/body-blocks/body-blocks";
import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import type {Fact} from "@/lib/content-facts";
import type {LegalDocument} from "@/lib/content/legal";
import {newsDate} from "@/lib/news";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

// Spec (document, "Heading, date and contents"): a short document needs no contents list.
const CONTENTS_FROM = 4;
const HEADING_ID = "legal-heading";

type Section = LegalDocument["sections"][number];

/** A link to each section; the root's scroll padding keeps the heading clear of the floating header. */
function Contents({sections}: {sections: readonly Section[]}) {
  return (
    <nav aria-label="Contents" className="mt-10 border-t border-line pt-6">
      <ol className="flex list-decimal flex-col gap-1 pl-6 type-body text-ink">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex min-h-11 items-center underline-offset-4 outline-offset-2 outline-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-solid"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type LegalViewProps = {path: string; document: Fact<LegalDocument>};

/** A legal page (document spec): the h1, the date, a draft notice while placeholder, contents, then the sections. */
export function LegalView({path, document}: LegalViewProps) {
  const {name, updated, sections} = document.value;
  return (
    <PageLayout links={pageNav(path, pageExists)}>
      <article aria-labelledby={HEADING_ID} className="pt-12 md:pt-20">
        <Frame>
          <div className="mx-auto max-w-prose">
            <h1 id={HEADING_ID} className="type-display text-ink">
              {name}
            </h1>
            <p className="mt-4 type-label text-ink-muted">
              Last updated <time dateTime={updated}>{newsDate(updated)}</time>
            </p>
            {document.placeholder && (
              <p role="note" className="mt-6 rounded-md bg-card p-4 type-small text-ink">
                Draft for review. Akik's lawyer will supply the final text.
              </p>
            )}
            {sections.length >= CONTENTS_FROM && <Contents sections={sections} />}
            <div className="mt-12 flex flex-col gap-12">
              {sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id} className="type-h3 text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-4">
                    <BodyBlocks blocks={section.blocks} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Frame>
      </article>
    </PageLayout>
  );
}
