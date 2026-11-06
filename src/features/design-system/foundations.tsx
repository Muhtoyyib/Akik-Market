import {PreviewSection} from "@/features/design-system/preview-section";

// Class names are written out in full so Tailwind finds them.
const COLOURS = [
  {name: "page", className: "bg-page"},
  {name: "card", className: "bg-card"},
  {name: "ink", className: "bg-ink"},
  {name: "ink-muted", className: "bg-ink-muted"},
  {name: "line", className: "bg-line"},
  {name: "brand-navy", className: "bg-brand-navy"},
  {name: "brand-red", className: "bg-brand-red"},
  {name: "phones", className: "bg-phones"},
  {name: "engineering", className: "bg-engineering"},
  {name: "autos", className: "bg-autos"},
];

const TYPE_STYLES = [
  {name: "display", className: "type-display"},
  {name: "h2", className: "type-h2"},
  {name: "h3", className: "type-h3"},
  {name: "quote", className: "type-quote"},
  {name: "body-lg", className: "type-body-lg"},
  {name: "body", className: "type-body"},
  {name: "small", className: "type-small"},
  {name: "label", className: "type-label"},
  {name: "figure", className: "type-figure"},
];

const RADII = [
  {name: "radius-sm · 12px", className: "rounded-sm"},
  {name: "radius-md · 24px", className: "rounded-md"},
  {name: "radius-lg · 32px", className: "rounded-lg"},
  {name: "radius-full", className: "rounded-full"},
];

export function Foundations() {
  return (
    <>
      <PreviewSection title="Colour">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {COLOURS.map((colour) => (
            <li key={colour.name}>
              <div className={`h-20 rounded-sm border border-line ${colour.className}`} />
              <p className="mt-2 type-label text-ink-muted">{colour.name}</p>
            </li>
          ))}
        </ul>
      </PreviewSection>
      <PreviewSection title="Type">
        <ul className="grid gap-6">
          {TYPE_STYLES.map((style) => (
            <li key={style.name} className="grid gap-1 md:grid-cols-12 md:items-baseline md:gap-6">
              <span className="type-label text-ink-muted md:col-span-2">{style.name}</span>
              <span className={`md:col-span-10 ${style.className}`}>
                {style.name === "figure" ? "₦12,500,000" : "Built to last, sold with care"}
              </span>
            </li>
          ))}
        </ul>
      </PreviewSection>
      <PreviewSection title="Shape">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {RADII.map((radius) => (
            <li key={radius.name}>
              <div className={`h-24 bg-brand-navy ${radius.className}`} />
              <p className="mt-2 type-label text-ink-muted">{radius.name}</p>
            </li>
          ))}
        </ul>
      </PreviewSection>
    </>
  );
}
