// Friendly reminder: if convex/_generated is missing, the dev server will fail.
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const generated = resolve(process.cwd(), "convex", "_generated");
if (!existsSync(generated)) {
  console.warn(
    "\n[personal-hub] convex/_generated is missing.\n" +
      "Run `npx convex dev` in another terminal once to sign in and generate types,\n" +
      "then `npm run dev` will work normally.\n",
  );
}
