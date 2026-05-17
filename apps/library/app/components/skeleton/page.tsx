import { Card, Skeleton } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function SkeletonShowcase() {
  return (
    <div>
      <PageHero
        title="Skeleton"
        description="A muted placeholder that holds space until real content arrives. Static—no pulse. Pulse cycles look broken when data resolves in &lt;100ms."
      />

      <Demo
        title="Sizes"
        code={`<Skeleton className="h-3 w-24" />`}
        background="surface"
      >
        <div className="space-y-2 w-64">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </Demo>

      <Demo
        title="In a Card"
        code={`<Card>
  <Skeleton className="h-4 w-32" />
  <Skeleton className="h-3 w-full" />
</Card>`}
        background="surface"
      >
        <Card className="w-full max-w-sm space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </Card>
      </Demo>

      <Demo
        title="List Rows"
        code={`<Skeleton className="h-10 w-full" />`}
        background="surface"
      >
        <div className="w-full max-w-md space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Demo>
    </div>
  );
}
