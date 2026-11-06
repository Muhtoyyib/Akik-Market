import {LinkBanner} from "@/components/link-banner/link-banner";
import {AutosInspection} from "@/features/division/autos-inspection";
import {PhoneServices} from "@/features/division/phone-services";
import {IconRowsSection} from "@/components/icon-row/icon-rows-section";
import type {DivisionPage} from "@/lib/content/division-page";

/** The one section only this business has, chosen by its key (division-pages design D1). */
export function SpecificSection({section}: {section: DivisionPage["specific"]}) {
  if (section.kind === "phones") {
    return (
      <PhoneServices
        heading={section.heading.value}
        groups={section.groups}
        brands={section.brands.value}
        whatsappHref={section.whatsappHref}
      />
    );
  }
  if (section.kind === "engineering") {
    const {projects} = section;
    return (
      <>
        <IconRowsSection heading={section.heading.value} rows={section.rows} headingId="services-heading" />
        <LinkBanner
          name="Our projects"
          headingId="projects-heading"
          division="engineering"
          eyebrow={projects.eyebrow.value}
          heading={projects.heading.value}
          href={projects.link.href}
          image={projects.image.value}
        />
      </>
    );
  }
  return (
    <AutosInspection heading={section.heading.value} rows={section.rows} report={section.report.value} financing={section.financing} />
  );
}
