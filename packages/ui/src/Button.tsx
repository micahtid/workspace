import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] border whitespace-nowrap font-medium leading-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "min-h-[30px] px-3 text-xs",
  md: "min-h-[38px] px-3.5 text-sm",
  lg: "min-h-[44px] px-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 dark:bg-ink-100 text-ink-0 dark:text-ink-900 border-ink-900 dark:border-ink-100 hover:bg-ink-700 dark:hover:bg-ink-300 hover:border-ink-700 dark:hover:border-ink-300",
  ghost:
    "bg-transparent text-foreground border-border hover:bg-surface-muted hover:border-border-strong",
  danger:
    "bg-transparent text-foreground border-border hover:bg-ink-900 hover:text-ink-0 hover:border-ink-900",
};

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
