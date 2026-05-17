import { Button, Card, CardBody, CardHeader, CardTitle } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function CardShowcase() {
  return (
    <div>
      <PageHero
        title="Card"
        description="A bordered surface container. Padded by default; opt out to use the header / body slots for split layouts."
      />

      <Demo
        title="Simple"
        code={`<Card>
  Card content goes here.
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <div className="text-sm">A simple bordered surface, padded.</div>
        </Card>
      </Demo>

      <Demo
        title="Header + Body"
        code={`<Card padded={false}>
  <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
  <CardBody>Body content…</CardBody>
</Card>`}
      >
        <Card padded={false} className="w-full max-w-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Profile</CardTitle>
            <Button size="sm" variant="ghost">
              Edit
            </Button>
          </CardHeader>
          <CardBody>
            <div className="text-sm">
              Two slots split by a hairline border. Good for tabular detail
              screens.
            </div>
          </CardBody>
        </Card>
      </Demo>

      <Demo
        title="Grid"
        code={`<Card>…</Card>`}
        background="surface"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
          {["Habits", "Workouts", "Notes", "Mira"].map((title) => (
            <Card key={title}>
              <div className="text-sm font-medium mb-1">{title}</div>
              <div className="text-xs text-muted">
                Identical surface, same border, same radius.
              </div>
            </Card>
          ))}
        </div>
      </Demo>
    </div>
  );
}
