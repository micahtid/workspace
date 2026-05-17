import type { HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={`rounded-md bg-ink-100 dark:bg-ink-800 ${className}`.trim()}
    />
  );
}
