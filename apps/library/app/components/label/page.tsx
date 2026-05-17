import { Eyebrow, Input, Label } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function LabelShowcase() {
  return (
    <div>
      <PageHero
        title="Label & Eyebrow"
        description="Two tiny pieces of typography that get reused everywhere—form labels above fields, and small muted eyebrows beside grouped controls."
      />

      <Demo
        title="Label"
        code={`<Label htmlFor="name">Name</Label>
<Input id="name" />`}
      >
        <div className="w-full max-w-sm">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Micah" />
        </div>
      </Demo>

      <Demo
        title="Eyebrow"
        description="Used inline next to filter rows and grouped controls"
        code={`<Eyebrow>Group</Eyebrow>
<Segmented … />`}
      >
        <div className="flex items-center gap-3">
          <Eyebrow>Group</Eyebrow>
          <span className="text-sm">By Difficulty</span>
        </div>
      </Demo>
    </div>
  );
}
