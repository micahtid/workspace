import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
};

export function IconButton({
  children,
  label,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      className={`inline-flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface text-ink-700 dark:text-ink-300 hover:bg-surface-muted hover:border-border-strong hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`.trim()}
    >
      {children}
    </button>
  );
}
