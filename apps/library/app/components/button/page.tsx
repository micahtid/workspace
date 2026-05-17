"use client";

import { Button, IconButton } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default function ButtonShowcase() {
  return (
    <div>
      <PageHero
        title="Button"
        description="Flat. Bordered. No shadows. Primary for the one important action on a page, ghost for everything else."
      />

      <Demo
        title="Variants"
        description="primary / ghost / danger"
        code={`<Button variant="primary">Save</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">Delete</Button>`}
      >
        <Button variant="primary">Save</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </Demo>

      <Demo
        title="Sizes"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Demo>

      <Demo
        title="With Icons"
        code={`<Button leadingIcon={<Plus />}>New</Button>
<Button variant="ghost" trailingIcon={<Chevron />}>Back</Button>`}
      >
        <Button leadingIcon={<PlusIcon />}>New</Button>
        <Button variant="ghost" leadingIcon={<ChevronIcon />}>
          Back
        </Button>
      </Demo>

      <Demo
        title="Icon-Only"
        code={`<IconButton label="Add"><Plus /></IconButton>`}
      >
        <IconButton label="Add">
          <PlusIcon />
        </IconButton>
        <IconButton label="Back">
          <ChevronIcon />
        </IconButton>
      </Demo>

      <Demo
        title="Disabled"
        code={`<Button disabled>Can't click</Button>
<Button variant="ghost" disabled>Can't click</Button>`}
      >
        <Button disabled>Can&apos;t click</Button>
        <Button variant="ghost" disabled>
          Can&apos;t click
        </Button>
      </Demo>

      <Demo
        title="Interactive"
        code={`<Button onClick={() => alert("hi")}>Say hi</Button>`}
      >
        <Button onClick={() => alert("hi")}>Say hi</Button>
      </Demo>
    </div>
  );
}
