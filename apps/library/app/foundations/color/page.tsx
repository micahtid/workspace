import { PageHero, SectionHeading } from "../../components/_demo";

const INK = [
  { name: "ink-0", className: "bg-ink-0", value: "#ffffff" },
  { name: "ink-50", className: "bg-ink-50", value: "#fafafa" },
  { name: "ink-100", className: "bg-ink-100", value: "#f4f4f5" },
  { name: "ink-200", className: "bg-ink-200", value: "#e4e4e7" },
  { name: "ink-300", className: "bg-ink-300", value: "#d4d4d8" },
  { name: "ink-400", className: "bg-ink-400", value: "#a1a1aa" },
  { name: "ink-500", className: "bg-ink-500", value: "#71717a" },
  { name: "ink-600", className: "bg-ink-600", value: "#52525b" },
  { name: "ink-700", className: "bg-ink-700", value: "#3f3f46" },
  { name: "ink-800", className: "bg-ink-800", value: "#27272a" },
  { name: "ink-900", className: "bg-ink-900", value: "#18181b" },
  { name: "ink-1000", className: "bg-ink-1000", value: "#09090b" },
];

const SEMANTIC = [
  { name: "background", token: "var(--background)", className: "bg-background" },
  { name: "foreground", token: "var(--foreground)", className: "bg-foreground" },
  { name: "surface", token: "var(--surface)", className: "bg-surface" },
  { name: "surface-muted", token: "var(--surface-muted)", className: "bg-surface-muted" },
  { name: "border", token: "var(--border)", className: "bg-border" },
  { name: "border-strong", token: "var(--border-strong)", className: "bg-border-strong" },
  { name: "muted", token: "var(--muted)", className: "bg-muted" },
];

export default function ColorPage() {
  return (
    <div>
      <PageHero
        title="Color"
        description="A single neutral ramp does the heavy lifting. Semantic tokens flip in dark mode—swap the theme toggle to see them shift."
      />

      <SectionHeading>Ink Scale</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {INK.map((c) => (
          <div
            key={c.name}
            className="border border-border rounded-[10px] overflow-hidden bg-surface"
          >
            <div className={`h-20 ${c.className}`} />
            <div className="px-3 py-2.5">
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-muted font-mono">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>Semantic Tokens</SectionHeading>
      <div className="border border-border rounded-[12px] bg-surface divide-y divide-border">
        {SEMANTIC.map((s) => (
          <div key={s.name} className="px-6 py-4 flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-md border border-border ${s.className}`}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{s.name}</div>
              <div className="text-xs text-muted font-mono">{s.token}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
