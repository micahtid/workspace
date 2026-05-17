import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
};

export function Card({
  padded = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-[12px] border border-border bg-surface ${
        padded ? "p-5" : ""
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`px-5 py-3 border-b border-border ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`px-5 py-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <div className="text-sm font-medium">{children}</div>;
}
