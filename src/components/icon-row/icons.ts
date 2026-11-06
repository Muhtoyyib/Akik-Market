import {
  BadgeCheck,
  Car,
  ClipboardCheck,
  Cog,
  FileCheck,
  Gauge,
  Hammer,
  Handshake,
  HardHat,
  Key,
  LandPlot,
  MessageCircle,
  PaintRoller,
  RefreshCw,
  Shield,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Content names an icon by key; this maps each key to its Lucide icon (icons.md: Lucide only, imported by name).
export const ROW_ICONS = {
  shield: Shield,
  "clipboard-check": ClipboardCheck,
  "file-check": FileCheck,
  key: Key,
  message: MessageCircle,
  store: Store,
  handshake: Handshake,
  "badge-check": BadgeCheck,
  refresh: RefreshCw,
  wrench: Wrench,
  hammer: Hammer,
  "paint-roller": PaintRoller,
  "land-plot": LandPlot,
  "hard-hat": HardHat,
  cog: Cog,
  car: Car,
  gauge: Gauge,
} satisfies Record<string, LucideIcon>;

export type RowIcon = keyof typeof ROW_ICONS;
