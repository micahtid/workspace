import { Input, Label, Textarea } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function InputShowcase() {
  return (
    <div>
      <PageHero
        title="Input"
        description="Single-line and multi-line text fields. The same rounded, bordered surface — hover thickens the border, focus turns it ink-900."
      />

      <Demo
        title="Default"
        code={`<Input placeholder="Search…" />`}
      >
        <div className="w-full max-w-sm">
          <Input placeholder="Search…" />
        </div>
      </Demo>

      <Demo
        title="With Label"
        code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`}
      >
        <div className="w-full max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Demo>

      <Demo
        title="Disabled"
        code={`<Input disabled value="Read-only" />`}
      >
        <div className="w-full max-w-sm">
          <Input disabled defaultValue="Read-only value" />
        </div>
      </Demo>

      <Demo
        title="Textarea"
        code={`<Textarea rows={4} placeholder="Write something…" />`}
      >
        <div className="w-full max-w-sm">
          <Textarea rows={4} placeholder="Write something…" />
        </div>
      </Demo>
    </div>
  );
}
