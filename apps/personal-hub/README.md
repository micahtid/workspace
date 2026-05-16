# Personal Hub

A minimal monochrome dashboard with two trackers:

- **Workout Tracker** — create workouts, assign them to days, add/edit/delete exercises, toggle each one active, and weights auto-save while you edit (refresh-safe).
- **Habit Tracker** — create habits with a daily target and a schedule (specific weekdays *or* every N days). Heat-map of completions over the last 6 months.

Stack: **Next.js 15+** (App Router) · **React 19** · **Tailwind v4** · **Convex**.

---

## Local setup

```bash
npm install

# One-time: signs you in to Convex, attaches this folder to your deployment
# (https://colorful-oriole-914.convex.cloud), generates `convex/_generated/*`,
# and keeps a watcher pushing schema/function changes.
npx convex dev
```

Leave `npx convex dev` running in one terminal and start Next in another:

```bash
npm run dev
# → http://localhost:3000
```

Or run both at once:

```bash
npm run dev:all
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Import Project" → pick this repo. **Do not change the build command.**
   It is already `convex deploy --cmd "next build" …`, which:
   - pushes the latest schema + functions to Convex,
   - injects `NEXT_PUBLIC_CONVEX_URL` automatically,
   - then runs `next build`.
3. In **Vercel → Project → Settings → Environment Variables**, add:
   - `CONVEX_DEPLOY_KEY` — get it from
     `https://dashboard.convex.dev` → your project → Settings → "Generate
     Production Deploy Key".
4. Deploy. That's it.

Local `.env.local` is already set to the dev deployment; Vercel uses the
production deploy key instead and ignores `.env.local`.

---

## What's where

```
app/
  page.tsx              — landing page with two tiles
  workouts/             — list + detail (auto-save weights/sets)
  habits/               — list + heat-map
  components/           — Nav, Modal, PageHeader, DayPicker
convex/
  schema.ts             — workouts, exercises, habits, habitEntries
  workouts.ts           — queries + mutations
  habits.ts             — queries + mutations
lib/
  hooks.ts              — useAutosaved (debounced auto-save)
  date.ts               — local date + schedule helpers
```
