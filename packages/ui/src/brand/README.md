# Brand

The canonical favicon used by every app in this monorepo.

## favicon.ico

A multi-resolution Windows .ico (16×16 and 32×32 frames, 32-bit). Browsers
pick the right size automatically.

## Mirroring

Next.js's file-based metadata requires `app/favicon.ico` to live inside
each app's `app/` directory. The same file is mirrored to:

- `apps/library/app/favicon.ico`
- `apps/site/app/favicon.ico`
- `apps/hub/app/favicon.ico`
- `apps/notes/app/favicon.ico`

When updating the mark, replace this file and copy it to all four.
