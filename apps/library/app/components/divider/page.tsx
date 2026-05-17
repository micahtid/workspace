import { Divider } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function DividerShowcase() {
  return (
    <div>
      <PageHero
        title="Divider"
        description="A 1px hairline that lives between sections. The labeled variant doubles as a section header on long pages."
      />

      <Demo title="Horizontal" code={`<Divider />`}>
        <div className="w-full max-w-md">
          <Divider />
        </div>
      </Demo>

      <Demo
        title="With Label"
        code={`<Divider label="More" />`}
      >
        <div className="w-full max-w-md">
          <Divider label="More" />
        </div>
      </Demo>

      <Demo
        title="Vertical"
        code={`<Divider orientation="vertical" />`}
      >
        <div className="flex items-center gap-4 h-12 text-sm">
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Middle</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </Demo>
    </div>
  );
}
