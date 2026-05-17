import { PageHero, SectionHeading } from "../../components/_demo";

const RADII = [
  { name: "radius-md", className: "rounded-[6px]", value: "6px" },
  { name: "radius-lg", className: "rounded-[8px]", value: "8px" },
  { name: "radius-xl", className: "rounded-[10px]", value: "10px" },
  { name: "radius-card", className: "rounded-[12px]", value: "12px" },
  { name: "radius-pill", className: "rounded-full", value: "999px" },
];

const SPACES = [
  { name: "1—4px", className: "w-1" },
  { name: "2—8px", className: "w-2" },
  { name: "3—12px", className: "w-3" },
  { name: "4—16px", className: "w-4" },
  { name: "6—24px", className: "w-6" },
  { name: "8—32px", className: "w-8" },
  { name: "10—40px", className: "w-10" },
  { name: "12—48px", className: "w-12" },
  { name: "16—64px", className: "w-16" },
];

export default function SpacingPage() {
  return (
    <div>
      <PageHero
        title="Spacing & radii"
        description="Soft, consistent corners and Tailwind's default 4px-grid spacing scale."
      />

      <SectionHeading>Radius</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {RADII.map((r) => (
          <div
            key={r.name}
            className="border border-border bg-surface p-6 flex flex-col items-center gap-3 rounded-[12px]"
          >
            <div
              className={`h-16 w-16 bg-ink-900 dark:bg-ink-100 ${r.className}`}
            />
            <div className="text-center">
              <div className="text-sm font-medium">{r.name}</div>
              <div className="text-xs text-muted font-mono">{r.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>Spacing Rhythm</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface divide-y divide-border">
        {SPACES.map((s) => (
          <div key={s.name} className="px-6 py-3.5 flex items-center gap-6">
            <div className="w-28 shrink-0 text-xs text-muted font-mono">
              {s.name}
            </div>
            <div className={`h-3 bg-ink-900 dark:bg-ink-100 ${s.className}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
