import { Button, PageHeader } from "@micahtid/ui";
import { Demo, PageHero } from "../_demo";

export default function PageHeaderShowcase() {
  return (
    <div>
      <PageHero
        title="Page Header"
        description="The opening of every screen. Title plus optional subtitle, back-link, and right-side action slot."
      />

      <Demo
        title="Title Only"
        code={`<PageHeader title="Habits" />`}
        background="surface"
      >
        <div className="w-full">
          <PageHeader title="Habits" />
        </div>
      </Demo>

      <Demo
        title="With Subtitle + Action"
        code={`<PageHeader
  title="Habits"
  subtitle="Track the daily ones."
  action={<Button>New Habit</Button>}
/>`}
        background="surface"
      >
        <div className="w-full">
          <PageHeader
            title="Habits"
            subtitle="Track the daily ones."
            action={<Button>New Habit</Button>}
          />
        </div>
      </Demo>

      <Demo
        title="With Back Link"
        code={`<PageHeader
  title="Upper Body—Tuesday"
  back={{ href: "/workouts", label: "All workouts" }}
/>`}
        background="surface"
      >
        <div className="w-full">
          <PageHeader
            title="Upper Body—Tuesday"
            back={{ href: "#", label: "All workouts" }}
          />
        </div>
      </Demo>
    </div>
  );
}
