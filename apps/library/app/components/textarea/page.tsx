import { Label, Textarea } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function TextareaShowcase() {
  return (
    <div>
      <PageHero
        title="Textarea"
        description="Multi-line text input. Same rounded surface as Input, with resize on the vertical axis only—no surprise horizontal scroll."
      />

      <Demo
        title="Default"
        code={`<Textarea rows={4} placeholder="Write something…" />`}
      >
        <div className="w-full max-w-sm">
          <Textarea rows={4} placeholder="Write something…" />
        </div>
      </Demo>

      <Demo
        title="With Label"
        code={`<Label htmlFor="notes">Notes</Label>
<Textarea id="notes" rows={5} />`}
      >
        <div className="w-full max-w-sm">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={5} placeholder="What did you work on?" />
        </div>
      </Demo>

      <Demo
        title="Disabled"
        code={`<Textarea disabled defaultValue="…" />`}
      >
        <div className="w-full max-w-sm">
          <Textarea
            disabled
            rows={3}
            defaultValue="A pre-filled value that you can't edit right now."
          />
        </div>
      </Demo>
    </div>
  );
}
