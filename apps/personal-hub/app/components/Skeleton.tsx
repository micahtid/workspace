import { ReactNode } from "react";

export function SkeletonBar({ className }: { className?: string }) {
  return <div aria-hidden className={"skeleton " + (className ?? "")} />;
}

export function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div aria-hidden className={"card p-4 sm:p-5 " + (className ?? "")}>
      {children ?? (
        <>
          <SkeletonBar className="h-5 w-2/5" />
          <SkeletonBar className="mt-3 h-4 w-3/5" />
        </>
      )}
    </div>
  );
}

export function SkeletonList({
  count = 3,
  itemClassName,
}: {
  count?: number;
  itemClassName?: string;
}) {
  return (
    <ul className="space-y-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <SkeletonCard className={itemClassName} />
        </li>
      ))}
    </ul>
  );
}
