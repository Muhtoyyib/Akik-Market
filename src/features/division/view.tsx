import {Hero} from "@/components/hero/hero";
import {PageLayout} from "@/components/page-layout/page-layout";
import {Trust} from "@/components/trust/trust";
import {Visit} from "@/components/visit/visit";
import {Offer} from "@/features/division/offer";
import {SpecificSection} from "@/features/division/specific-section";
import {Stock} from "@/features/division/stock";
import {Story} from "@/features/division/story";
import type {DivisionPage} from "@/lib/content/division-page";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

/**
 * One template for the three businesses (division page-template spec): hero, offer, stock, how buying works, the
 * business's own section, a story and its contacts, all in the business's accent.
 */
export function DivisionView({page}: {page: DivisionPage}) {
  const {key, path, hero, offer, stock, steps, specific, story, contact} = page;
  return (
    <PageLayout links={pageNav(path, pageExists)} division={key}>
      <Hero
        media={{kind: "image", ...hero.media.value}}
        eyebrow={hero.eyebrow}
        heading={hero.heading.value}
        claims={hero.claims.value}
        whatsappHref={hero.whatsappHref}
      />
      <Offer eyebrow={offer.eyebrow.value} heading={offer.heading.value} cards={offer.cards} />
      <Stock
        eyebrow={stock.eyebrow.value}
        heading={stock.heading.value}
        items={stock.items}
        action={stock.action.value}
        href={stock.href}
      />
      <Trust
        heading={steps.heading.value}
        image={steps.image.value}
        rows={steps.rows}
        whatsappHref={steps.whatsappHref}
        headingId="steps-heading"
        ordered
        wideActionOnPhones
      />
      <SpecificSection section={specific} />
      <Story story={story?.story} />
      <Visit heading={contact.heading.value} address={contact.address.value} image={contact.image.value} contacts={contact.contacts} />
    </PageLayout>
  );
}
