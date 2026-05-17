import type { LabelHTMLAttributes, HTMLAttributes } from "react";

export function Label({
  className = "",
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`block text-xs font-medium text-muted mb-1.5 ${className}`.trim()}
    >
      {children}
    </label>
  );
}

export function Eyebrow({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`text-xs font-medium text-muted ${className}`.trim()}
    >
      {children}
    </span>
  );
}
