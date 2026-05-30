"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

const MIN_FONT = 8;
const MAX_FONT = 200;

type Props = {
  item: Doc<"spaceTexts">;
  surfaceRef: RefObject<HTMLDivElement | null>;
  selected: boolean;
  autoEdit: boolean;
  onSelect: () => void;
  onAutoEditConsumed: () => void;
};

export function TextItem({
  item,
  surfaceRef,
  selected,
  autoEdit,
  onSelect,
  onAutoEditConsumed,
}: Props) {
  const update = useMutation(api.space.update);
  const remove = useMutation(api.space.remove);

  const editRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  // Optimistic position/size during a drag; null means "use the stored value".
  const [localPos, setLocalPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [localFont, setLocalFont] = useState<number | null>(null);

  const x = localPos?.x ?? item.x;
  const y = localPos?.y ?? item.y;
  const fontSize = localFont ?? item.fontSize;

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
  function handlePointerDown(e: React.PointerEvent) {
    if (editing) return; // let the caret/selection work while editing
    e.stopPropagation();
    onSelect();
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = item.x;
    const originY = item.y;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    let next = { x: originX, y: originY };

    function onMove(ev: PointerEvent) {
      next = {
        x: originX + (ev.clientX - startX),
        y: originY + (ev.clientY - startY),
      };
      setLocalPos(next);
    }
    function onUp() {
      el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      void update({ id: item._id, x: next.x, y: next.y }).then(() =>
        setLocalPos(null),
      );
    }
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  }

  // --- Resize (drag a corner handle) → scale the font ---
  function handleResizePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    e.preventDefault();
    const startY = e.clientY;
    const startFont = item.fontSize;
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);
    let next = startFont;

    function onMove(ev: PointerEvent) {
      // Dragging down grows the text, up shrinks it.
      next = Math.min(
        MAX_FONT,
        Math.max(MIN_FONT, startFont + (ev.clientY - startY)),
      );
      setLocalFont(next);
    }
    function onUp() {
      handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      void update({ id: item._id, fontSize: next }).then(() =>
        setLocalFont(null),
      );
    }
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
      className="absolute"
      style={{ left: x, top: y }}
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
          fontSize,
          cursor: editing ? "text" : "move",
          minWidth: "1ch",
          minHeight: "1em",
        }}
      >
        {item.text}
      </div>

      {selected && !editing ? (
        <>
          <span className="pointer-events-none absolute -inset-1 rounded-md ring-1 ring-ink-300" />
          {/* Bottom-right resize handle scales the font. */}
          <span
            onPointerDown={handleResizePointerDown}
            className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-sm bg-ink-0 border border-ink-400 cursor-nwse-resize"
          />
        </>
      ) : null}
    </div>
  );
}
