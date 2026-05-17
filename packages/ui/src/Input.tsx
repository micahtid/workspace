import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-[10px] border border-border bg-surface text-foreground placeholder:text-muted px-3 py-2.5 text-sm leading-snug transition-colors hover:border-border-strong focus:border-ink-900 dark:focus:border-ink-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return <input {...props} className={`${fieldBase} ${className}`.trim()} />;
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={`${fieldBase} resize-y ${className}`.trim()}
    />
  );
}
