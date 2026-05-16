# workspace

Monorepo for micahtid's web projects.

## Structure

```
apps/
  site/        — personal portfolio site
  hub/         — personal hub (habits, workouts) — Convex
  notes/       — leetcode notes / SRS — Convex
  showcase/    — @micahtid/ui component showcase
packages/
  ui/          — shared React components (@micahtid/ui)
```

## Getting started

```sh
pnpm install
pnpm dev              # run all apps via Turbo
pnpm dev:site         # run a single app
pnpm dev:hub
pnpm dev:notes
pnpm dev:showcase     # http://localhost:3100
pnpm build            # build all apps
```

## Adding a shared component

1. Create the component in `packages/ui/src/`
2. Export it from `packages/ui/src/index.ts`
3. Register it in `apps/showcase/app/_lib/registry.ts` and add a demo page at `apps/showcase/app/components/<slug>/page.tsx`
4. Import in any app:

```tsx
import { Button } from "@micahtid/ui";
```

No build step — Next.js transpiles `@micahtid/ui` directly via `transpilePackages`.
