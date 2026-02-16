#!/usr/bin/env tsx
/**
 * Sync types from bind-standard into this SDK.
 *
 * Usage:
 *   pnpm run sync:types
 *   pnpm run sync:types -- --standard-path ../bind-standard
 *
 * This script copies the canonical type definitions from the bind-standard
 * repository into src/types/. Run this whenever the standard is updated.
 */

import { cpSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
let standardPath = resolve(import.meta.dirname, "../../bind-standard");

const pathArgIndex = args.indexOf("--standard-path");
if (pathArgIndex !== -1 && args[pathArgIndex + 1]) {
  standardPath = resolve(args[pathArgIndex + 1]);
}

const sourceDir = resolve(standardPath, "src/types");
const targetDir = resolve(import.meta.dirname, "../src/types");

if (!existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  console.error("Pass --standard-path <path> to specify the bind-standard location.");
  process.exit(1);
}

if (!existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

const files = readdirSync(sourceDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");

console.log(`Syncing ${files.length} type files from ${sourceDir}`);

for (const file of files) {
  cpSync(resolve(sourceDir, file), resolve(targetDir, file));
  console.log(`  copied ${file}`);
}

console.log("Done. Remember to update src/types/index.ts if new types were added.");
