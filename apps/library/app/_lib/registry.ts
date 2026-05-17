export type RegistryEntry = {
  slug: string;
  name: string;
  href: string;
  summary: string;
};

export type RegistrySection = {
  title: string;
  entries: RegistryEntry[];
};

export const foundations: RegistryEntry[] = [
  {
    slug: "typography",
    name: "Typography",
    href: "/foundations/typography",
    summary: "Font family, sizes, and weights actually used by the apps.",
  },
  {
    slug: "color",
    name: "Color",
    href: "/foundations/color",
    summary: "The ink palette + semantic surface, border, and muted tokens.",
  },
  {
    slug: "spacing",
    name: "Spacing & Radii",
    href: "/foundations/spacing",
    summary: "Radius scale and spacing rhythm.",
  },
];

export const components: RegistryEntry[] = [
  {
    slug: "button",
    name: "Button",
    href: "/components/button",
    summary: "Primary, ghost, danger, and icon-only variants.",
  },
  {
    slug: "card",
    name: "Card",
    href: "/components/card",
    summary: "Bordered surface containers with header/body slots.",
  },
  {
    slug: "divider",
    name: "Divider",
    href: "/components/divider",
    summary: "Section rules: horizontal, inline with label, vertical.",
  },
  {
    slug: "badge",
    name: "Badge / Chip",
    href: "/components/badge",
    summary: "Pill labels for tags, status, and filters.",
  },
  {
    slug: "input",
    name: "Input",
    href: "/components/input",
    summary: "Text input with hover and focus rings, plus textarea.",
  },
  {
    slug: "label",
    name: "Label & Eyebrow",
    href: "/components/label",
    summary: "Form labels and small muted eyebrows.",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    href: "/components/skeleton",
    summary: "Loading placeholders sized to real content.",
  },
  {
    slug: "segmented",
    name: "Segmented Control",
    href: "/components/segmented",
    summary: "iOS-style pill switcher for small option groups.",
  },
  {
    slug: "page-header",
    name: "PageHeader",
    href: "/components/page-header",
    summary: "Title, optional subtitle, back-link, and action slot.",
  },
];

export const sections: RegistrySection[] = [
  { title: "Foundations", entries: foundations },
  { title: "Components", entries: components },
];

export const allEntries: RegistryEntry[] = sections.flatMap((s) => s.entries);
