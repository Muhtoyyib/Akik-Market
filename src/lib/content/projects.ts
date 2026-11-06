// Akik's finished projects: one collection, read by the Projects index, each project's page and its related cards
// (site content-source spec, "Shared collections"). Every project is a stand-in until the owner supplies real work.
// Photos are CC0 building photos, not Akik's, so their alt text stays empty (see docs/placeholder-media.md).
import {placeholder} from "@/lib/content-facts";
import {business} from "@/lib/content/business";
import {projectSummaries, type ProjectSlug} from "@/lib/content/project-summaries";
import {photo, SIZES} from "@/lib/responsive-image";
import {whatsappHref} from "@/lib/whatsapp";

// Tab order on the index. A type only gets a tab once a project has it.
export const PROJECT_TYPES = {homes: "Homes", estates: "Estates"} as const;
export type ProjectType = keyof typeof PROJECT_TYPES;

type ProjectInput = {
  /** Its name and description come from project-summaries.ts, which the page list and page heads read. */
  slug: ProjectSlug;
  type: ProjectType;
  area: string;
  /** When it was handed over, YYYY-MM; the index lists the newest first. */
  completed: string;
  figure: {value: string; label: string};
  size?: string;
  story: string[];
  /** Photo files in public/placeholders/projects and their widths; all are cropped to 3:2. */
  photos: [name: string, width: number][];
};

const engineering = business("engineering");

/** Spec (projects enquiry): the message names the project, so Engineering knows which one the visitor saw. */
export function enquiryMessage(name: string): string {
  return `Hello Akik, I saw ${name} and I'd like to ask about`;
}

function project({photos, ...input}: ProjectInput) {
  // Every slug is a ProjectSlug, so its summary is always there.
  const {name, description} = projectSummaries.value.find((summary) => summary.slug === input.slug)!;
  return placeholder({
    ...input,
    name,
    description,
    city: "Ibadan",
    year: input.completed.slice(0, 4),
    typeLabel: PROJECT_TYPES[input.type],
    href: `/projects/${input.slug}`,
    enquiryHref: whatsappHref(engineering.number.value, enquiryMessage(name)),
    photos: photos.map(([name, width]) =>
      photo(`/placeholders/projects/project-${name}.jpg`, {alt: "", width, height: Math.floor((width * 2) / 3)}, SIZES.fullWidth)
    ),
  });
}

export type Project = ReturnType<typeof project>["value"];

// Stryker disable StringLiteral,ObjectLiteral,ArrayDeclaration : stand-in projects the owner will replace; tests pin the rules.
const items: ProjectInput[] = [
  {
    slug: "bodija-duplex",
    type: "homes",
    area: "Bodija",
    completed: "2025-08",
    figure: {value: "4", label: "Bedrooms"},
    size: "4 bedrooms, 2 living rooms",
    story: [
      "The family came to us with a plot in Bodija and a drawing on paper. They wanted room for three children and a parent who visits often.",
      "We checked the land papers first, then built in stages they could visit every week. Each stage was paid for only after they had seen it.",
      "The house was handed over in August with the survey, the building approval and the receipts in one folder.",
    ],
    photos: [
      ["bodija-duplex-1", 1024],
      ["bodija-duplex-2", 960],
      ["bodija-duplex-3", 1024],
      ["bodija-duplex-4", 1024],
    ],
  },
  {
    slug: "oluyole-court",
    type: "estates",
    area: "Oluyole",
    completed: "2025-03",
    figure: {value: "8", label: "Homes"},
    size: "8 homes",
    story: [
      "Oluyole Court is eight homes around one shared road. We laid the road, drainage and power lines before any house went up.",
      "Buyers chose their home from the plans and visited the site as it rose. Each home was handed over with its own title documents.",
    ],
    photos: [
      ["oluyole-court-1", 1024],
      ["oluyole-court-2", 1024],
      ["oluyole-court-3", 1024],
    ],
  },
  {
    slug: "akobo-bungalow",
    type: "homes",
    area: "Akobo",
    completed: "2024-11",
    figure: {value: "3", label: "Bedrooms"},
    size: "3 bedrooms",
    story: [
      "The owners were working abroad and could not visit often. We sent photos and short videos from the site every week on WhatsApp.",
      "They chose the finishes from samples we sent, and the house was ready the month they moved home.",
    ],
    photos: [
      ["akobo-bungalow-1", 1024],
      ["akobo-bungalow-2", 960],
      ["akobo-bungalow-3", 1024],
    ],
  },
  {
    slug: "ring-road-apartments",
    type: "estates",
    area: "Ring Road",
    completed: "2024-06",
    figure: {value: "12", label: "Flats"},
    size: "12 flats",
    story: [
      "Twelve flats over three floors, each with its own meter. The service charge was agreed and written down before the first flat was sold.",
      "Buyers inspected their flat before the final payment, and every snag was fixed before handover.",
    ],
    photos: [
      ["ring-road-apartments-1", 960],
      ["ring-road-apartments-2", 1024],
    ],
  },
  {
    slug: "alakia-family-home",
    type: "homes",
    area: "Alakia",
    completed: "2024-02",
    figure: {value: "7", label: "Months to build"},
    story: [
      "The owner already had the land and wanted a builder they could trust. We supervised every trade and bought the materials ourselves.",
      "The work took seven months from the foundation to the keys.",
    ],
    photos: [["alakia-build-1", 1024]],
  },
  {
    slug: "jericho-villa",
    type: "homes",
    area: "Jericho",
    completed: "2023-10",
    figure: {value: "5", label: "Bedrooms"},
    size: "5 bedrooms",
    story: [
      "A five-bedroom home with a terrace looking over the garden. The pool was built and tested before the rest of the finishing started.",
      "It was one of our first large homes, and the owner still calls us for repairs.",
    ],
    photos: [["jericho-villa-1", 960]],
  },
];
// Stryker restore StringLiteral,ObjectLiteral,ArrayDeclaration

export const projects = items.map(project);
