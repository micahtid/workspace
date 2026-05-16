"use client";

import { Button } from "@micahtid/ui";
import { Demo } from "../_demo";

export default function ButtonShowcase() {
  return (
    <div>
      <header className="mb-10">
        <div className="text-sm uppercase tracking-widest text-muted mb-2">
          Component
        </div>
        <h1 className="text-4xl font-semibold mb-3">Button</h1>
        <p className="text-muted">
          A clickable button. Currently renders a native &lt;button&gt; — extend
          with variants as the design system grows.
        </p>
      </header>

      <Demo title="Default" code={`<Button>Click me</Button>`}>
        <Button>Click me</Button>
      </Demo>

      <Demo
        title="With onClick"
        code={`<Button onClick={() => alert("hi")}>Say hi</Button>`}
      >
        <Button onClick={() => alert("hi")}>Say hi</Button>
      </Demo>

      <Demo title="Disabled" code={`<Button disabled>Can't click</Button>`}>
        <Button disabled>Can&apos;t click</Button>
      </Demo>
    </div>
  );
}
