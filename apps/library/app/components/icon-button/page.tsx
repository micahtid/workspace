import { IconButton } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export default function IconButtonShowcase() {
  return (
    <div>
      <PageHero
        title="Icon Button"
        description="A square 38px button for toolbars, pagination controls, and tight spaces where a label would be redundant. Always provide an accessible label."
      />

      <Demo
        title="Default"
        code={`<IconButton label="Add"><Plus /></IconButton>`}
      >
        <IconButton label="Add">
          <PlusIcon />
        </IconButton>
      </Demo>

      <Demo
        title="Pagination Pair"
        code={`<IconButton label="Previous"><ChevronLeft /></IconButton>
<IconButton label="Next"><ChevronRight /></IconButton>`}
      >
        <IconButton label="Previous">
          <ChevronLeftIcon />
        </IconButton>
        <IconButton label="Next">
          <ChevronRightIcon />
        </IconButton>
      </Demo>

      <Demo
        title="Disabled"
        code={`<IconButton label="More" disabled><MoreIcon /></IconButton>`}
      >
        <IconButton label="More" disabled>
          <MoreIcon />
        </IconButton>
      </Demo>
    </div>
  );
}
