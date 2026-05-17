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

export const actions: RegistryEntry[] = [
  {
    slug: "button",
    name: "Button",
    href: "/components/button",
    summary: "Primary, ghost, and danger variants in three sizes.",
  },
  {
    slug: "icon-button",
    name: "Icon Button",
    href: "/components/icon-button",
    summary: "Square icon-only button for toolbars and tight spaces.",
  },
];

export const inputs: RegistryEntry[] = [
  {
    slug: "input",
    name: "Input",
    href: "/components/input",
    summary: "Single-line text field with hover and focus rings.",
  },
  {
    slug: "textarea",
    name: "Textarea",
    href: "/components/textarea",
    summary: "Multi-line text field; shares the input visual style.",
  },
  {
    slug: "label",
    name: "Label & Eyebrow",
    href: "/components/label",
    summary: "Form labels and small muted eyebrows.",
  },
  {
    slug: "segmented",
    name: "Segmented Control",
    href: "/components/segmented",
    summary: "iOS-style pill switcher for small option groups.",
  },
];

export const layout: RegistryEntry[] = [
  {
    slug: "card",
    name: "Card",
    href: "/components/card",
    summary: "Bordered surface containers with header / body slots.",
  },
  {
    slug: "divider",
    name: "Divider",
    href: "/components/divider",
    summary: "Section rules: horizontal, inline with label, vertical.",
  },
  {
    slug: "page-header",
    name: "Page Header",
    href: "/components/page-header",
    summary: "Title, optional subtitle, back-link, and action slot.",
  },
];

export const feedback: RegistryEntry[] = [
  {
    slug: "badge",
    name: "Badge / Chip",
    href: "/components/badge",
    summary: "Pill labels for tags, status, and filters.",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    href: "/components/skeleton",
    summary: "Loading placeholders sized to real content.",
  },
];

export const patterns: RegistryEntry[] = [
  {
    slug: "command-palette",
    name: "Command Palette",
    href: "/patterns/command-palette",
    summary: "⌘K modal navigator—the one you're using right now.",
  },
  {
    slug: "theme-toggle",
    name: "Theme Toggle",
    href: "/patterns/theme-toggle",
    summary: "Light / dark mode switcher with localStorage persistence.",
  },
];

export const sections: RegistrySection[] = [
  { title: "Foundations", entries: foundations },
  { title: "Actions", entries: actions },
  { title: "Inputs", entries: inputs },
  { title: "Layout", entries: layout },
  { title: "Feedback", entries: feedback },
  { title: "Patterns", entries: patterns },
];

export const allEntries: RegistryEntry[] = sections.flatMap((s) => s.entries);
