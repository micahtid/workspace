"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { TextItem } from "./TextItem";

const DEFAULT_FONT_SIZE = 16;

export function CanvasSurface() {
  const texts = useQuery(api.space.list);
  const create = useMutation(api.space.create);

  const surfaceRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<Id<"spaceTexts"> | null>(null);
  // The text that was just created by a double-click, so it can auto-focus
  // into edit mode the moment it renders.
  const [autoEditId, setAutoEditId] = useState<Id<"spaceTexts"> | null>(null);

  async function handleDoubleClick(e: React.MouseEvent) {
    // Only react to double-clicks on the empty surface, not on a text.
    if (e.target !== surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = await create({ x, y, text: "", fontSize: DEFAULT_FONT_SIZE });
    setSelectedId(id);
    setAutoEditId(id);
  }

  function handlePointerDown(e: React.PointerEvent) {
    // Clicking empty space clears the selection (and commits any open edit
    // via the TextItem's own blur handler).
    if (e.target === surfaceRef.current) setSelectedId(null);
  }

  return (
    <div
      ref={surfaceRef}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      className="relative w-full h-[70vh] rounded-2xl border border-ink-200 bg-ink-0 overflow-hidden select-none"
    >
      {texts?.map((t) => (
        <TextItem
          key={t._id}
          item={t}
          surfaceRef={surfaceRef}
          selected={selectedId === t._id}
          autoEdit={autoEditId === t._id}
          onSelect={() => setSelectedId(t._id)}
          onAutoEditConsumed={() => setAutoEditId(null)}
        />
      ))}
    </div>
  );
}
