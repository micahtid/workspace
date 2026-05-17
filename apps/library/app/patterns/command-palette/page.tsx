"use client";

import { Button } from "@micahtid/ui";
import { Demo, PageHero } from "../../components/_demo";

function openPalette() {
  const isMac = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: !isMac,
      metaKey: isMac,
      bubbles: true,
    }),
  );
}

export default function CommandPaletteShowcase() {
  return (
    <div>
      <PageHero
        title="Command Palette"
        description="A keyboard-first navigator that lives at ⌘K (Ctrl+K on Windows / Linux). Filters across every foundation, component, and pattern as you type. Arrow keys move; Enter routes; Esc closes."
      />

      <Demo
        title="Open It"
        description="⌘K · Ctrl+K · click below"
        code={`window.dispatchEvent(
  new KeyboardEvent("keydown", { key: "k", metaKey: true }),
);`}
        background="surface"
      >
        <Button onClick={openPalette}>Open Command Palette</Button>
      </Demo>
    </div>
  );
}
