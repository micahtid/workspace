import type { HTMLAttributes } from "react";

type Tone = "neutral" | "solid";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
};

const tones: Record<Tone, string> = {
  neutral:
    "border-border bg-surface text-ink-700 dark:text-ink-300",
  solid:
    "border-ink-900 bg-ink-900 text-ink-0 dark:border-ink-100 dark:bg-ink-100 dark:text-ink-900",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
