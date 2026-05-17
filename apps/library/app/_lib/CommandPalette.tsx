"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sections } from "./registry";

type Item = {
  slug: string;
  name: string;
  href: string;
  group: string;
  summary: string;
};

const ITEMS: Item[] = sections.flatMap((section) =>
  section.entries.map((entry) => ({
    slug: entry.slug,
    name: entry.name,
    href: entry.href,
    summary: entry.summary,
    group: section.title,
  })),
);

function filter(query: string): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return ITEMS;
  return ITEMS.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.summary.toLowerCase().includes(q) ||
      i.group.toLowerCase().includes(q),
  );
}

function useIsMac() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.platform));
  }, []);
  return isMac;
}

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => filter(query), [query]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (active >= results.length) setActive(Math.max(0, results.length - 1));
  }, [results.length, active]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = results[active];
        if (target) router.push(target.href);
      }
    },
    [active, results, router],
  );

  if (!open) return null;

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal
        aria-label="Jump to"
        className="relative w-full max-w-[520px] rounded-[12px] border border-border bg-surface overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted shrink-0"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a component, foundation, or topic…"
            className="flex-1 bg-transparent text-base py-4 outline-none placeholder:text-muted"
          />
          <kbd className="text-[11px] text-muted border border-border rounded px-1.5 py-0.5 font-medium">
            esc
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted text-center">
              Nothing matches &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item, i) => {
              const isActive = i === active;
              const showGroup = item.group !== lastGroup;
              lastGroup = item.group;
              return (
                <div key={item.slug}>
                  {showGroup && (
                    <div className="px-4 pt-3 pb-1 text-xs text-muted font-medium">
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => router.push(item.href)}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors ${
                      isActive
                        ? "bg-surface-muted text-foreground"
                        : "text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-muted truncate">
                        {item.summary}
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-muted shrink-0">
                        <EnterIcon />
                      </span>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-border text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Kbd>
                <ArrowUpIcon />
              </Kbd>
              <Kbd>
                <ArrowDownIcon />
              </Kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>
                <EnterIcon />
              </Kbd>
              Select
            </span>
          </div>
          <span>{results.length} Results</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteTrigger() {
  const isMac = useIsMac();
  function open() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: !isMac,
        metaKey: isMac,
        bubbles: true,
      }),
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      className="w-full flex items-center justify-between gap-3 border-y border-border bg-surface px-6 py-3 text-sm text-muted hover:text-foreground hover:bg-surface-muted transition-colors"
    >
      <span className="inline-flex items-center gap-2 min-w-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="truncate">Jump to…</span>
      </span>
      <kbd className="text-[11px] border border-border rounded px-1.5 py-0.5 font-medium">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center h-[18px] min-w-[18px] px-1 border border-border rounded text-muted">
      {children}
    </kbd>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function EnterIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 10 4 15l5 5" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}
