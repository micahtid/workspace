"use client";

import { PageHeader } from "../components/PageHeader";
import { CanvasSurface } from "./CanvasSurface";

export default function SpacePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/", label: "Hub" }}
          title="Space"
          subtitle="Double-click anywhere to write. Drag to move, drag a corner to resize."
        />
        <CanvasSurface />
      </main>
    </div>
  );
}
