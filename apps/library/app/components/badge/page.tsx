import { Badge } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function BadgeShowcase() {
  return (
    <div>
      <PageHero
        title="Badge / Chip"
        description="A pill for tags, statuses, and filter toggles. Two tones—neutral by default, solid for the 'on' state."
      />

      <Demo
        title="Tones"
        code={`<Badge>Draft</Badge>
<Badge tone="solid">Active</Badge>`}
      >
        <Badge>Draft</Badge>
        <Badge tone="solid">Active</Badge>
      </Demo>

      <Demo
        title="As Tag List"
        code={`{tags.map((t) => <Badge key={t}>{t}</Badge>)}`}
      >
        <div className="flex flex-wrap items-center gap-2 max-w-md">
          {[
            "react",
            "typescript",
            "next.js",
            "convex",
            "tailwind",
            "design",
          ].map((t) => (
            <Badge key={t}>#{t}</Badge>
          ))}
        </div>
      </Demo>

      <Demo
        title="Filter Pills"
        code={`<Badge tone={active ? "solid" : "neutral"}>All</Badge>`}
      >
        <Badge tone="solid">All</Badge>
        <Badge>Easy</Badge>
        <Badge>Medium</Badge>
        <Badge>Hard</Badge>
      </Demo>
    </div>
  );
}
