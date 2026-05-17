import type { ReactNode } from "react";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
};

export function Divider({
  orientation = "horizontal",
  label,
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-px self-stretch bg-border ${className}`.trim()}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={`flex items-center gap-3 ${className}`.trim()}
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted font-medium">{label}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={`h-px w-full bg-border ${className}`.trim()}
    />
  );
}
