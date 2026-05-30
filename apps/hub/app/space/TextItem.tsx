"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

const MIN_FONT = 8;
const MAX_FONT = 200;

type Props = {
  item: Doc<"spaceTexts">;
  selected: boolean;
  autoEdit: boolean;
  onSelect: () => void;
  onAutoEditConsumed: () => void;
};

export function TextItem({
  item,
  selected,
  autoEdit,
  onSelect,
  onAutoEditConsumed,
}: Props) {
  // Optimistic update: patch the local query cache synchronously when the
  // mutation fires, so releasing a drag never flickers back to the old value
  // before the server round-trip completes.
  const update = useMutation(api.space.update).withOptimisticUpdate(
    (localStore, args) => {
      const existing = localStore.getQuery(api.space.list, {});
      if (existing === undefined) return;
      const { id, ...patch } = args;
      localStore.setQuery(
        api.space.list,
        {},
        existing.map((t) => (t._id === id ? { ...t, ...patch } : t)),
      );
    },
  );
  const remove = useMutation(api.space.remove);

  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  // A freshly created (empty) text jumps straight into edit mode.
  useEffect(() => {
    if (autoEdit) {
      setEditing(true);
      onAutoEditConsumed();
    }
  }, [autoEdit, onAutoEditConsumed]);

  // Place the caret into the contentEditable when entering edit mode.
  useEffect(() => {
    if (!editing) return;
    const el = editRef.current;
    if (!el) return;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [editing]);

  // --- Move (drag the body) ---
  // Writes transform straight to the DOM (no React re-render), coalesced to one
  // write per animation frame, and commits a single mutation on release.
  function handlePointerDown(e: React.PointerEvent) {
    if (editing) return; // let the caret/selection work while editing
    e.stopPropagation();
    onSelect();

    const el = containerRef.current;
    if (!el) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = item.x;
    const originY = item.y;
    el.setPointerCapture(e.pointerId);
    el.style.willChange = "transform";

    let nextX = originX;
    let nextY = originY;
    let raf = 0;

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };
    const onMove = (ev: PointerEvent) => {
      nextX = originX + (ev.clientX - startX);
      nextY = originY + (ev.clientY - startY);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onUp = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.willChange = "auto";
      el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      if (nextX !== originX || nextY !== originY) {
        void update({ id: item._id, x: nextX, y: nextY });
      }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  }

  // --- Resize (drag a corner handle) → scale the font ---
  function handleResizePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    e.preventDefault();

    const textEl = editRef.current;
    const handle = e.currentTarget as HTMLElement;
    if (!textEl) return;
    const startFont = item.fontSize;
    // Anchor = the text's fixed top-left corner. Scale the font by how far the
    // cursor is from that anchor relative to the start, so the bottom-right
    // corner tracks the cursor along the diagonal instead of running ahead.
    const rect = textEl.getBoundingClientRect();
    const anchorX = rect.left;
    const anchorY = rect.top;
    const startDist = Math.max(1, Math.hypot(rect.width, rect.height));
    handle.setPointerCapture(e.pointerId);

    let next = startFont;
    let raf = 0;

    const apply = () => {
      raf = 0;
      textEl.style.fontSize = `${next}px`;
    };
    const onMove = (ev: PointerEvent) => {
      const dist = Math.hypot(ev.clientX - anchorX, ev.clientY - anchorY);
      next = Math.min(
        MAX_FONT,
        Math.max(MIN_FONT, startFont * (dist / startDist)),
      );
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onUp = () => {
      if (raf) cancelAnimationFrame(raf);
      handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      if (next !== startFont) void update({ id: item._id, fontSize: next });
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
  }

  function commitEdit() {
    setEditing(false);
    // innerText only — strips any pasted formatting, keeps it plain text.
    const value = (editRef.current?.innerText ?? "").replace(/\n$/, "");
    if (value.trim() === "") {
      void remove({ id: item._id });
      return;
    }
    if (value !== item.text) void update({ id: item._id, text: value });
  }

  return (
    <div
      ref={containerRef}
      className="absolute left-0 top-0"
      style={{
        transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
    >
      <div
        ref={editRef}
        contentEditable={editing}
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={commitEdit}
        onKeyDown={(e) => {
          // Enter commits; Shift+Enter inserts a newline.
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            editRef.current?.blur();
          }
        }}
        className="outline-none whitespace-pre leading-tight text-ink-900"
        style={{
          fontSize: item.fontSize,
          cursor: editing ? "text" : "move",
          minWidth: "1ch",
          minHeight: "1em",
          userSelect: editing ? "text" : "none",
          WebkitUserSelect: editing ? "text" : "none",
        }}
      >
        {item.text}
      </div>

      {selected && !editing ? (
        <>
          <span className="pointer-events-none absolute -inset-1 border border-ink-400" />
          {/* Bottom-right resize handle scales the font. */}
          <span
            onPointerDown={handleResizePointerDown}
            className="absolute -bottom-2.5 -right-2.5 h-3 w-3 rounded-sm bg-ink-0 border border-ink-400 cursor-nwse-resize"
          />
        </>
      ) : null}
    </div>
  );
}
