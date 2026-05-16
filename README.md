# workspace

Monorepo for micahtid's web projects.

## Structure

```
apps/
  portfolio/        — personal portfolio site
  personal-hub/     — personal hub
  leetcode-notes/   — leetcode notes / SRS
packages/
  ui/               — shared React components
```

## Getting started

```sh
pnpm install
pnpm dev                # run all apps
pnpm dev:portfolio      # run a single app
pnpm build              # build all apps
```

## Adding a shared component

Drop it in `packages/ui/src/`, export it from `packages/ui/src/index.ts`, then import in any app:

```tsx
import { Button } from "@micahtid/ui";
```

No build step — Next.js transpiles `@micahtid/ui` directly via `transpilePackages`.
