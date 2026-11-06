import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {Visit} from "@/components/visit/visit";
import {Channels} from "@/features/contact/channels";
import {EnquiryForm} from "@/features/contact/enquiry-form";
import {contactChannels, contactForm, contactIndex, contactLocation} from "@/lib/content/contact";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

/** Contact (page spec): the h1 header, every channel, the enquiry form, then the shop's location. */
export function ContactView() {
  const {heading, intro} = contactIndex;
  const {heading: locationHeading, address, image} = contactLocation;
  return (
    <PageLayout links={pageNav("/contact", pageExists)}>
      <section aria-labelledby="contact-heading" className="pt-12 md:pt-20">
        <Frame>
          <SectionHeader level={1} heading={heading.value} description={intro.value} headingId="contact-heading" />
        </Frame>
      </section>
      <Channels {...contactChannels} />
      <EnquiryForm {...contactForm} />
      <Visit heading={locationHeading.value} address={address.value} image={image.value} contacts={[]} />
    </PageLayout>
  );
}
