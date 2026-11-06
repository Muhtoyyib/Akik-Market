import {Button} from "@/components/button/button";
import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {SectionHeader} from "@/components/section-header/section-header";
import {PreviewSection} from "@/features/design-system/preview-section";

const TABS = ["Phones", "Homes", "Cars"].map((label) => ({
  value: label.toLowerCase(),
  label,
  panel: <p className="type-body">Sample panel for {label}.</p>,
}));

export function Controls() {
  return (
    <>
      <PreviewSection title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#buttons">Primary</Button>
          <Button href="#buttons" variant="secondary">
            Secondary
          </Button>
          <Button href="#buttons" variant="link">
            Link with arrow
          </Button>
          <Button onClick={() => {}} disabled>
            Disabled
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg bg-brand-navy p-8">
          <Button href="#buttons" variant="on-dark">
            On dark
          </Button>
        </div>
      </PreviewSection>
      <PreviewSection title="Section header">
        <div className="grid gap-16">
          <SectionHeader
            eyebrow="Eyebrow"
            heading="Centred section heading"
            description="A supporting line that says what the section shows."
            action={{href: "#section-header", label: "Onward link"}}
          />
          <SectionHeader
            align="start"
            eyebrow="Eyebrow"
            heading="Left-aligned section heading"
            description="Used when the content below starts at the left edge."
          />
          <div data-division="autos">
            <SectionHeader eyebrow="Inside an Autos section" heading="The eyebrow takes the division accent" />
          </div>
        </div>
      </PreviewSection>
      <PreviewSection title="Pill tabs">
        <PillTabs label="Sample tabs on a light surface" tabs={TABS} />
        <div className="mt-8 rounded-lg bg-brand-navy p-8 text-on-dark">
          <PillTabs label="Sample tabs on a dark surface" tabs={TABS} surface="dark" />
        </div>
      </PreviewSection>
    </>
  );
}
