"use client";

import { Segmented } from "@micahtid/ui";
import { useState } from "react";
import { Demo, PageHero } from "../_demo";

export default function SegmentedShowcase() {
  const [view, setView] = useState<"list" | "grid" | "table">("list");
  const [tone, setTone] = useState<"day" | "week" | "month">("week");

  return (
    <div>
      <PageHero
        title="Segmented control"
        description="A track with a selected pill—small option groups where a dropdown would be overkill."
      />

      <Demo
        title="Three Options"
        code={`<Segmented
  options={[{value:"list",label:"List"}, …]}
  value={view}
  onChange={setView}
/>`}
      >
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
            { value: "table", label: "Table" },
          ]}
        />
      </Demo>

      <Demo
        title="Date Scope"
        code={`<Segmented value={tone} onChange={setTone} options={…} />`}
      >
        <Segmented
          value={tone}
          onChange={setTone}
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
          ]}
        />
      </Demo>
    </div>
  );
}
