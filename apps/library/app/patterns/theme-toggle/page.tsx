import { Demo, PageHero } from "../../components/_demo";
import { ThemeToggle } from "../../_lib/ThemeToggle";

export default function ThemeTogglePage() {
  return (
    <div>
      <PageHero
        title="Theme Toggle"
        description="A single icon button that flips between light and dark, persists the choice in localStorage, and respects the OS preference on first load. A blocking inline script applies the saved theme before paint, so the page never flashes."
      />

      <Demo
        title="The Toggle"
        description="Click to flip the entire library"
        code={`<ThemeToggle />`}
        background="surface"
      >
        <ThemeToggle />
      </Demo>
    </div>
  );
}
