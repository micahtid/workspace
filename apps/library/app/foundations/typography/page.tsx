import { PageHero, SectionHeading } from "../../components/_demo";

const SIZES = [
  { name: "text-3xl", className: "text-3xl", note: "Page Title (Desktop)" },
  { name: "text-2xl", className: "text-2xl", note: "Page Title (Mobile)" },
  { name: "text-xl", className: "text-xl", note: "Lead / Hero Copy" },
  { name: "text-lg", className: "text-lg", note: "Section Heading" },
  { name: "text-base", className: "text-base", note: "Body (Default)" },
  { name: "text-sm", className: "text-sm", note: "Secondary Body" },
  { name: "text-xs", className: "text-xs", note: "Caption / Metadata" },
];

const WEIGHTS = [
  { name: "medium", className: "font-medium", note: "Labels, List Items, Page Headers" },
  { name: "semibold", className: "font-semibold", note: "Occasional Emphasis" },
  { name: "bold", className: "font-bold", note: "Section Headings, Hero Name" },
];

export default function TypographyPage() {
  return (
    <div>
      <PageHero
        title="Typography"
        description="Manrope, used everywhere. Numerals are tabular by default. These are the sizes and weights the real apps actually reach for — anything else is out of scope."
      />

      <SectionHeading>Family</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface px-6 py-8">
        <div className="text-3xl font-medium tracking-tight mb-3">
          The quick brown fox jumps over the lazy dog.
        </div>
        <div className="text-sm text-muted font-mono">
          Manrope · var(--font-primary) · 300 – 800
        </div>
      </div>

      <SectionHeading>Sizes</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface divide-y divide-border">
        {SIZES.map((s) => (
          <div
            key={s.name}
            className="px-6 py-5 flex items-baseline gap-6"
          >
            <div className="w-24 shrink-0 text-xs text-muted font-mono">
              {s.name}
            </div>
            <div className={`${s.className} flex-1 truncate`}>
              The quick brown fox.
            </div>
            <div className="text-xs text-muted shrink-0 hidden sm:block">
              {s.note}
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>Weights</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface divide-y divide-border">
        {WEIGHTS.map((w) => (
          <div key={w.name} className="px-6 py-5 flex items-baseline gap-6">
            <div className="w-24 shrink-0 text-xs text-muted font-mono">
              {w.name}
            </div>
            <div className={`${w.className} text-xl flex-1`}>
              Manrope at {w.name}.
            </div>
            <div className="text-xs text-muted shrink-0 hidden sm:block">
              {w.note}
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>In Context</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface px-7 py-10 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">A Real Page Title.</h1>
        <p className="text-base text-muted leading-relaxed">
          Body copy sits comfortably at 16px. The hierarchy comes from size and
          weight, not from color or decoration.
        </p>
        <div className="flex items-center pt-2">
          <h2 className="text-lg font-bold shrink-0">A Section Heading</h2>
          <div className="h-px bg-border grow ml-4" />
        </div>
        <p className="text-sm text-muted">
          Secondary text at <code className="font-mono text-xs">text-sm</code>{" "}
          for metadata and supporting copy.
        </p>
      </div>
    </div>
  );
}
